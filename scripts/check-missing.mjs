import mongoose from "mongoose";

const URI = "mongodb+srv://raihangazi1024_db_user:OeE2lMaw9i5af34S@cluster0.1xk3oxu.mongodb.net/maktabatul-amzad?retryWrites=true&w=majority&appName=Cluster0";

const COLLECTIONS = [
  { name: "books",             fields: ["title", "desc"]  },
  { name: "writers",           fields: ["name", "desc"]   },
  { name: "publishers",        fields: ["name"]            },
  { name: "categories",        fields: ["name"]            },
  { name: "subcategories",     fields: ["name"]            },
  { name: "importedCountries", fields: ["name"]            },
];

await mongoose.connect(URI, { bufferCommands: false });
const db = mongoose.connection;

for (const { name, fields } of COLLECTIONS) {
  const docs = await db.collection(name).find({}).toArray();
  const missing = [];
  for (const doc of docs) {
    for (const field of fields) {
      const arr = doc[field];
      if (!Array.isArray(arr) || arr.length < 3) continue;
      const slots = arr.map((s, i) => ({ i, val: s || "" })).filter(s => !s.val.trim());
      const hasAny = arr.some(s => s && s.trim());
      if (hasAny && slots.length > 0) {
        missing.push({
          id: doc._id.toString(),
          field,
          arr: arr.map(s => s ? s.slice(0, 50) : ""),
          missing: slots.map(s => ["bn","en","ar"][s.i]),
        });
      }
    }
  }
  if (missing.length > 0) {
    console.log(`\n=== ${name} (${missing.length} missing) ===`);
    for (const m of missing) {
      console.log(`  [${m.missing.join(",")}] ${m.field}: ${JSON.stringify(m.arr)}`);
    }
  } else {
    console.log(`${name}: ✅ all complete`);
  }
}

await mongoose.disconnect();
