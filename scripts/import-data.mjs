import { readFileSync } from "fs";
import { join } from "path";
import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://raihangazi1024_db_user:OeE2lMaw9i5af34S@cluster0.1xk3oxu.mongodb.net/maktabatul-amzad?retryWrites=true&w=majority&appName=Cluster0";

const DATA_DIR = "C:\\Projects\\migrate\\mongodb collections";

// upsertKey: if set, uses replaceOne({upsertKey: val}, doc, {upsert:true}) instead of insertMany
const COLLECTIONS = [
  { file: "maktabatul-amzad.books.json",             name: "books"             },
  { file: "maktabatul-amzad.carts.json",             name: "carts"             },
  { file: "maktabatul-amzad.categories.json",        name: "categories",        upsertKey: "categoryId"    },
  { file: "maktabatul-amzad.editors.json",           name: "editors",           upsertKey: "editorId"      },
  { file: "maktabatul-amzad.importedCountries.json", name: "importedCountries", upsertKey: "countryId"     },
  { file: "maktabatul-amzad.publishers.json",        name: "publishers",        upsertKey: "publisherId"   },
  { file: "maktabatul-amzad.subcategories.json",     name: "subcategories",     upsertKey: "subCategoryId" },
  { file: "maktabatul-amzad.translators.json",       name: "translators"                                   },
  { file: "maktabatul-amzad.users.json",             name: "users",             upsertKey: "email"         },
  { file: "maktabatul-amzad.writers.json",           name: "writers",           upsertKey: "writerId"      },
];

function parseEJSON(val) {
  if (Array.isArray(val)) return val.map(parseEJSON);
  if (val && typeof val === "object") {
    if ("$oid" in val)  return new mongoose.Types.ObjectId(val.$oid);
    if ("$date" in val) return new Date(val.$date);
    const out = {};
    for (const k of Object.keys(val)) out[k] = parseEJSON(val[k]);
    return out;
  }
  return val;
}

async function run() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI, { bufferCommands: false });
  console.log("Connected.\n");

  for (const { file, name, upsertKey } of COLLECTIONS) {
    const col  = mongoose.connection.collection(name);
    const raw  = readFileSync(join(DATA_DIR, file), "utf-8");
    const docs = parseEJSON(JSON.parse(raw));

    if (docs.length === 0) {
      console.log(`⏭  ${name}: source file is empty — skipping`);
      continue;
    }

    if (upsertKey) {
      // Use bulkWrite upsert — safe for re-runs and partial states
      const ops = docs.map((doc) => {
        const { _id, ...fields } = doc;
        return {
          updateOne: {
            filter: { [upsertKey]: doc[upsertKey] },
            update: { $set: fields, $setOnInsert: { _id } },
            upsert: true,
          },
        };
      });
      const result = await col.bulkWrite(ops, { ordered: false });
      const total = result.upsertedCount + result.modifiedCount + result.matchedCount;
      console.log(`✅ ${name}: ${result.upsertedCount} inserted, ${result.modifiedCount} updated (${total} total)`);
    } else {
      // Plain insertMany with duplicate skip
      const existing = await col.countDocuments();
      if (existing >= docs.length) {
        console.log(`⏭  ${name}: already has ${existing} docs — skipping`);
        continue;
      }
      try {
        const result = await col.insertMany(docs, { ordered: false });
        console.log(`✅ ${name}: inserted ${result.insertedCount} documents`);
      } catch (err) {
        if (err.code === 11000 || err.writeErrors?.length > 0) {
          console.log(`⚠️  ${name}: partial insert (duplicates skipped)`);
        } else {
          throw err;
        }
      }
    }
  }

  await mongoose.disconnect();
  console.log("\nDone! All collections imported.");
}

run().catch((err) => {
  console.error("Import failed:", err.message);
  process.exit(1);
});
