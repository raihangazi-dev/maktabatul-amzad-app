import mongoose from "mongoose";
import Anthropic from "@anthropic-ai/sdk";

const MONGO_URI =
  "mongodb+srv://raihangazi1024_db_user:OeE2lMaw9i5af34S@cluster0.1xk3oxu.mongodb.net/maktabatul-amzad?retryWrites=true&w=majority&appName=Cluster0";

const client = new Anthropic();

const COLLECTIONS = [
  { name: "books",             fields: ["title", "desc"]  },
  { name: "writers",           fields: ["name", "desc"]   },
  { name: "publishers",        fields: ["name"]            },
  { name: "categories",        fields: ["name"]            },
  { name: "subcategories",     fields: ["name"]            },
  { name: "importedCountries", fields: ["name"]            },
];

const LANG_NAMES = ["Bangla", "English", "Arabic"];
const LANG_CODES = ["bn", "en", "ar"];

async function translateText(text, fromLang, toLang) {
  if (!text || !text.trim()) return "";
  const prompt = `Translate the following ${LANG_NAMES[fromLang]} text to ${LANG_NAMES[toLang]}. Return only the translated text, nothing else, no quotes, no explanation.

Text: ${text}`;

  const msg = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 512,
    messages: [{ role: "user", content: prompt }],
  });
  return msg.content[0]?.text?.trim() ?? "";
}

function pickSource(arr) {
  // prefer Bangla > Arabic > English as translation source
  for (const i of [0, 2, 1]) {
    if (arr[i] && arr[i].trim()) return i;
  }
  return -1;
}

function needsTranslation(arr) {
  if (!Array.isArray(arr) || arr.length < 3) return false;
  const hasAny = arr.some(s => s && s.trim());
  const missingAny = arr.some(s => !s || !s.trim());
  return hasAny && missingAny;
}

await mongoose.connect(MONGO_URI, { bufferCommands: false });
const db = mongoose.connection;
console.log("Connected to MongoDB.\n");

let total = { checked: 0, translated: 0, calls: 0 };

for (const { name, fields } of COLLECTIONS) {
  const docs = await db.collection(name).find({}).toArray();
  let colTranslated = 0;

  for (const doc of docs) {
    const update = {};
    let changed = false;

    for (const field of fields) {
      const arr = doc[field];
      if (!needsTranslation(arr)) continue;

      const srcIdx = pickSource(arr);
      if (srcIdx === -1) continue;

      const newArr = [...arr];
      for (let i = 0; i < 3; i++) {
        if (newArr[i] && newArr[i].trim()) continue; // already has content
        if (i === srcIdx) continue;
        try {
          const translated = await translateText(arr[srcIdx], srcIdx, i);
          if (translated) {
            newArr[i] = translated;
            total.calls++;
            process.stdout.write(`  Translated [${srcIdx}→${i}] for ${name}.${field}: "${arr[srcIdx].slice(0, 40)}" → "${translated.slice(0, 40)}"\n`);
          }
        } catch (err) {
          console.error(`  Error translating ${name}/${doc._id}/${field}[${i}]:`, err.message);
        }
      }

      if (JSON.stringify(newArr) !== JSON.stringify(arr)) {
        update[field] = newArr;
        changed = true;
      }
    }

    total.checked++;
    if (changed) {
      await db.collection(name).updateOne({ _id: doc._id }, { $set: update });
      colTranslated++;
      total.translated++;
    }
  }

  console.log(`${name}: checked ${docs.length}, updated ${colTranslated}`);
}

console.log(`\n── Summary ─────────────────────────────`);
console.log(`Total checked    : ${total.checked}`);
console.log(`Docs updated     : ${total.translated}`);
console.log(`Translation calls: ${total.calls}`);

await mongoose.disconnect();
