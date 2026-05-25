import mongoose from "mongoose";

const URI =
  "mongodb+srv://raihangazi1024_db_user:OeE2lMaw9i5af34S@cluster0.1xk3oxu.mongodb.net/maktabatul-amzad?retryWrites=true&w=majority&appName=Cluster0";

function hasBangla(t) { return /[ঀ-৿]/.test(t ?? ""); }
function hasArabic(t) { return /[؀-ۿ]/.test(t ?? ""); }
function hasLatin(t)  { return /[A-Za-z]/.test(t ?? ""); }

function detectLang(text) {
  if (!text || !text.trim()) return "empty";
  if (hasBangla(text)) return "bn";
  if (hasArabic(text)) return "ar";
  if (hasLatin(text))  return "en";
  return "unknown";
}

/**
 * Reorder [bn, en, ar] correctly.
 * - Deduplicate: if the same string appears at multiple indices keep it only once
 *   in the correct slot and replace the duplicate with ""
 * - If a language is missing entirely, its slot becomes ""
 */
function reorder(arr) {
  if (!Array.isArray(arr)) return arr;

  // Classify each entry
  const tagged = arr.map(t => ({ text: t ?? "", lang: detectLang(t) }));

  // Collect unique texts per language (first occurrence wins)
  const seen = new Set();
  const byLang = { bn: null, en: null, ar: null };

  for (const { text, lang } of tagged) {
    if (!text.trim() || seen.has(text)) continue;
    seen.add(text);
    if (lang === "bn" && !byLang.bn) byLang.bn = text;
    if (lang === "en" && !byLang.en) byLang.en = text;
    if (lang === "ar" && !byLang.ar) byLang.ar = text;
  }

  return [byLang.bn ?? "", byLang.en ?? "", byLang.ar ?? ""];
}

function needsFix(arr) {
  if (!Array.isArray(arr) || arr.length < 3) return false;
  const fixed = reorder(arr);
  return JSON.stringify(fixed) !== JSON.stringify(arr.map(x => x ?? ""));
}

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
console.log("Connected.\n");

let total = { checked: 0, fixed: 0 };

for (const { name, fields } of COLLECTIONS) {
  const docs = await db.collection(name).find({}).toArray();
  let colFixed = 0;

  for (const doc of docs) {
    const update = {};
    let changed = false;

    for (const field of fields) {
      const arr = doc[field];
      if (!Array.isArray(arr)) continue;
      if (needsFix(arr)) {
        update[field] = reorder(arr);
        changed = true;
      }
    }

    total.checked++;
    if (changed) {
      await db.collection(name).updateOne({ _id: doc._id }, { $set: update });
      colFixed++;
      total.fixed++;
    }
  }

  console.log(`${name}: checked ${docs.length}, fixed ${colFixed}`);
}

console.log(`\n── Summary ─────────────────────────────`);
console.log(`Total checked : ${total.checked}`);
console.log(`Total fixed   : ${total.fixed}`);

await mongoose.disconnect();
