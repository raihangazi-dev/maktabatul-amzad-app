import mongoose from "mongoose";

const URI =
  "mongodb+srv://raihangazi1024_db_user:OeE2lMaw9i5af34S@cluster0.1xk3oxu.mongodb.net/maktabatul-amzad?retryWrites=true&w=majority&appName=Cluster0";

function hasBangla(t) { return /[ঀ-৿]/.test(t); }
function hasArabic(t) { return /[؀-ۿ]/.test(t); }
function hasLatin(t)  { return /[A-Za-z]/.test(t); }
function detectLang(t) {
  if (!t || !t.trim()) return "empty";
  if (hasBangla(t)) return "bn 🇧🇩";
  if (hasArabic(t)) return "ar 🇸🇦";
  if (hasLatin(t))  return "en 🇬🇧";
  return "unknown";
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

let issues = 0;

for (const { name, fields } of COLLECTIONS) {
  const docs = await db.collection(name).find({}).toArray();
  for (const doc of docs) {
    for (const field of fields) {
      const arr = doc[field];
      if (!Array.isArray(arr) || arr.length === 0) continue;
      const langs = arr.map(detectLang);
      const bad =
        (arr[0] && !hasBangla(arr[0]) && arr[0].trim()) ||
        (arr[1] && !hasLatin(arr[1])  && !hasBangla(arr[1]) && arr[1].trim()) ||
        (arr[2] && !hasArabic(arr[2]) && arr[2].trim());
      if (bad) {
        console.log(`❌ ${name} (${doc._id}) → ${field}:`);
        arr.forEach((v, i) => console.log(`   [${i}] ${detectLang(v)}: ${v?.slice(0, 60)}`));
        issues++;
      }
    }
  }
}

if (issues === 0) {
  console.log("✅ All language arrays are correctly ordered across all collections.");
} else {
  console.log(`\n⚠️  Found ${issues} remaining issue(s).`);
}

await mongoose.disconnect();
