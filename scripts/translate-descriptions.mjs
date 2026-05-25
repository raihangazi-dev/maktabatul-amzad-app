/**
 * Translates missing description fields using MyMemory free translation API.
 * Handles books.desc and writers.desc which have missing language slots.
 * Rate limit: ~5 req/s, adds delay between calls.
 */
import mongoose from "mongoose";

const URI =
  "mongodb+srv://raihangazi1024_db_user:OeE2lMaw9i5af34S@cluster0.1xk3oxu.mongodb.net/maktabatul-amzad?retryWrites=true&w=majority&appName=Cluster0";

const LANG_MAP = { 0: "bn", 1: "en", 2: "ar" };
const LANG_NAMES = ["Bangla", "English", "Arabic"];

async function translate(text, fromIdx, toIdx) {
  if (!text || !text.trim()) return "";
  const from = LANG_MAP[fromIdx];
  const to = LANG_MAP[toIdx];
  // MyMemory handles up to 500 chars per request; split if longer
  const chunks = splitText(text, 450);
  const translated = [];
  for (const chunk of chunks) {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(chunk)}&langpair=${from}|${to}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`MyMemory HTTP ${res.status}`);
    const data = await res.json();
    if (data.responseStatus !== 200) throw new Error(`MyMemory error: ${data.responseDetails}`);
    translated.push(data.responseData.translatedText);
    await sleep(300); // respect rate limit
  }
  return translated.join(" ");
}

function splitText(text, maxLen) {
  if (text.length <= maxLen) return [text];
  const parts = [];
  const sentences = text.split(/(?<=[।.!?\n])\s+/);
  let current = "";
  for (const s of sentences) {
    if ((current + " " + s).trim().length > maxLen) {
      if (current) parts.push(current.trim());
      current = s;
    } else {
      current = current ? current + " " + s : s;
    }
  }
  if (current.trim()) parts.push(current.trim());
  return parts.length > 0 ? parts : [text.slice(0, maxLen)];
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function pickSource(arr) {
  for (const i of [0, 2, 1]) {
    if (arr[i] && arr[i].trim()) return i;
  }
  return -1;
}

await mongoose.connect(URI, { bufferCommands: false });
const db = mongoose.connection;
console.log("Connected.\n");

let total = { calls: 0, docs: 0 };

for (const { col, fields } of [
  { col: "books",   fields: ["desc"] },
  { col: "writers", fields: ["desc"] },
]) {
  const docs = await db.collection(col).find({}).toArray();
  for (const doc of docs) {
    const update = {};
    for (const field of fields) {
      const arr = doc[field];
      if (!Array.isArray(arr) || arr.length < 3) continue;
      const missing = arr.map((s, i) => i).filter(i => !arr[i] || !arr[i].trim());
      if (missing.length === 0 || missing.length === 3) continue;

      const srcIdx = pickSource(arr);
      if (srcIdx === -1) continue;

      const newArr = [...arr];
      for (const i of missing) {
        if (i === srcIdx) continue;
        try {
          console.log(`Translating ${col}.${field} [${srcIdx}→${i}] (${LANG_NAMES[srcIdx]}→${LANG_NAMES[i]}) for doc ${doc._id}...`);
          const result = await translate(arr[srcIdx], srcIdx, i);
          newArr[i] = result;
          total.calls++;
          console.log(`  Done: "${result.slice(0, 80)}..."`);
        } catch (err) {
          console.error(`  Error: ${err.message}`);
        }
      }
      if (JSON.stringify(newArr) !== JSON.stringify(arr)) {
        update[field] = newArr;
      }
    }
    if (Object.keys(update).length > 0) {
      await db.collection(col).updateOne({ _id: doc._id }, { $set: update });
      total.docs++;
    }
  }
}

console.log(`\n── Summary ──────────────────────────────`);
console.log(`Docs updated      : ${total.docs}`);
console.log(`Translation calls : ${total.calls}`);

await mongoose.disconnect();
