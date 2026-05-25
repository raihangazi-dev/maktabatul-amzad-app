/**
 * Applies pre-translated English names for categories, subcategories, and publishers.
 * Uses exact Bangla/Arabic text matching to identify documents, then sets the missing [1] (English) slot.
 * Safe to re-run: only writes when current [1] is empty.
 */
import mongoose from "mongoose";

const URI =
  "mongodb+srv://raihangazi1024_db_user:OeE2lMaw9i5af34S@cluster0.1xk3oxu.mongodb.net/maktabatul-amzad?retryWrites=true&w=majority&appName=Cluster0";

// Match by Arabic text (index 2) which is always present and more unique
const CATEGORY_TRANSLATIONS = [
  { ar: "العقيدة وأصول الدين ",            en: "Aqeedah & Tawheed" },
  { ar: "القراءات والتجويد",               en: "Qira'at & Tajweed" },
  { ar: "القرآن الكريم و علومه",            en: "Quran & Quran Sciences" },
  { ar: "الفقه الإسلامي وأصوله ",           en: "Fiqh & Usool al-Fiqh" },
  { ar: "السيرة النبوية ، والصحابة والتابعين", en: "Seerah, Sahabah & Tabi'een" },
  { ar: "الخطبات و المواعيظ ",              en: "Sermons & Advice" },
  { ar: "الزهد والرقائق",                  en: "Tasawwuf & Tazkiyah" },
  { ar: "السياسة والاقتصاد",               en: "Politics & Economics" },
  { ar: "التربية والتعليم ",               en: "Education & Training" },
  { ar: "الأسرة و المجتمع",               en: "Family & Society" },
  { ar: "الأطفال ",                        en: "Children's Books" },
  { ar: "التاريخ والجفرافيا",              en: "History & Geography" },
  { ar: "اللغة  العربية وعلومها ",          en: "Arabic Language & Literature" },
  { ar: "المعاجم والقواميس ",              en: "Dictionary & Lexicon" },
  { ar: "الموسوعات ",                      en: "Encyclopedia" },
  { ar: "الرحلات ",                        en: "Travel & Journey" },
];

const SUBCATEGORY_TRANSLATIONS = [
  { bn: "তাওহীদ",               ar: "التوحيد ",                            en: "Tawheed (Monotheism)" },
  { bn: "",                     ar: "توحيد الأسماء والصفات ",               en: "Divine Names & Attributes", fixBn: "আসমা ও সিফাত" },
  { bn: "মাযাহেব, ফিরাক, ধর্ম", ar: "الأديان والفرق والمذاهب ",             en: "Sects & Religions" },
  { bn: "তাজভিদ",               ar: "التجويد ",                            en: "Tajweed" },
  { bn: "কিরাত",                ar: "القراءات",                            en: "Qira'at (Recitations)" },
  { bn: "আল কুরআনুল কারীম",     ar: "القرآن والمصاحف",                     en: "The Holy Quran" },
  { bn: "তাফসীর ও আসবাবে নযূল", ar: "التفاسير وأسباب النزول",              en: "Tafseer & Reasons of Revelation" },
  { bn: "ঊলুমুল কোরআন",         ar: "علوم القرآن الكريم ",                  en: "Sciences of Quran" },
  { bn: "হাদীসের মতন",          ar: "متون الحديث ",                         en: "Hadith Texts" },
  { bn: "হাদীসের ব্যাখ্যা গ্রন্থ", ar: "شروحات الحديث ",                    en: "Hadith Commentaries" },
  { bn: "ঊলুমুল হাদীস",         ar: "علوم الحديث ومصطلحاتها ",              en: "Hadith Sciences" },
  { bn: "আসমা ও রিজাল",         ar: " الأسماء والرجال ",                    en: "Asma' wa Rijal" },
  { bn: "জারহ ও ত্বাদীল",       ar: "الجرح والتعديل والنقد ",               en: "Jarh wa Ta'deel" },
  { bn: "জীবনী, তবাকাত ও আনসাব", ar: "التراجم والطبقات والأنساب ",           en: "Biographies & Tabaqat" },
  { bn: "ফতোয়া",               ar: "الفتاوى ",                            en: "Fatwa" },
  { bn: "ফিকহী মাসআলাহ",        ar: "المسائل الفقهية ",                     en: "Fiqh Issues" },
  { bn: "ফিকহে হানাফী",         ar: "الفقه الحنفي ",                        en: "Hanafi Fiqh" },
  { bn: "ফিকহে শাফেয়ী",        ar: "الفقه الشافعي ",                       en: "Shafi'i Fiqh" },
  { bn: "ফিকহে মালেকী",         ar: "الفقه المالكي ",                       en: "Maliki Fiqh" },
  { bn: "ফিকহে হাম্বলী",        ar: "الفقه الحنبلي",                        en: "Hanbali Fiqh" },
  { bn: "ঊসূলুল ফিকহ",          ar: "أصول الفقه  ",                         en: "Usool al-Fiqh" },
  { bn: "ফিকহী রিচার্জ ও গভেষণা", ar: "دراسات فقهية ",                      en: "Fiqh Research & Studies" },
  { bn: "মাযাহেব ও দ্বীন",      ar: "فقه المذاهب والأديان ",                en: "Madhhabs & Religions" },
  { bn: "সিরাতে রাসূল (সা:)",   ar: "السيرة النبوية والشمائل ",             en: "Seerah of the Prophet (SAW)" },
  { bn: "সাহাবা জিবনী",         ar: "حياة الصحابة",                        en: "Lives of the Sahabah" },
  { bn: "তাবেয়ীদের জিবনী",     ar: "حياة التابعين",                        en: "Lives of the Tabi'een" },
  { bn: "মহিলা সাহাবী",         ar: "حياة الصحابيات",                       en: "Female Companions" },
  { bn: "বয়ান ও খুতবা",         ar: "الخطبات ",                            en: "Sermons & Speeches" },
  { bn: "ওয়াজ নসীহত",          ar: "الدروس والمواعيظ",                     en: "Lessons & Advice" },
  { bn: "তাসাউউফ , তাযকিয়াহ",  ar: "التصوف والتزكية",                      en: "Tasawwuf & Purification" },
  { bn: "আদব, আখলাক, পরহেযগারী", ar: "الأداب والزهد والرقائق ",             en: "Manners, Ethics & Piety" },
  { bn: "রাজনীতি",              ar: "السياسة ",                            en: "Politics" },
  { bn: "অর্থনিতী",             ar: "الاقتصاد ",                           en: "Economics" },
  { bn: "ধর্মীয় রাজনীতি",      ar: "السياسة الشرعية ",                     en: "Islamic Governance" },
  { bn: "আইন ও সংবিধাণ",        ar: "السياسة والقانون",                     en: "Law & Constitution" },
  { bn: "তালীম ও তারবিয়াত",    ar: "التعليم والتربية ",                    en: "Education & Upbringing" },
  { bn: "ইসলামী শিক্ষা",        ar: "دراسات إسلامية ",                      en: "Islamic Studies" },
  { bn: "পরিবার ও সমাজ",        ar: "الأسرة والمجتمع",                      en: "Family & Society" },
  { bn: "শিশুতোষ",              ar: "كتب الأطفال",                         en: "Children's Books" },
  { bn: "ইসলামী ইতিহাস",        ar: "التاريخ الإسلامي ",                    en: "Islamic History" },
  { bn: "আরবী সাহিত্য",         ar: "اللغة العربية",                        en: "Arabic Literature" },
  { bn: "নাহু-সরফ",             ar: "النحو والصرف",                         en: "Arabic Grammar (Nahw & Sarf)" },
  { bn: "কবিতা",                ar: "النظم والأشعار ",                       en: "Poetry" },
  { bn: "বালাগাত",              ar: "علم البلاغة ",                          en: "Arabic Rhetoric (Balaghat)" },
  { bn: "অভিধান গ্রন্থ",        ar: "المعاجم والقواميس والموسوعات",          en: "Dictionaries & Encyclopedias" },
  { bn: "অভিধান গ্রন্থ",        ar: "الموسوعات ",                           en: "Encyclopedias" },
  { bn: "ভ্রমন ও সফর",          ar: "الرحلات ",                             en: "Travel & Journey" },
];

const PUBLISHER_TRANSLATIONS = [
  { ar: "دار إبن كثير", en: "Dar Ibn Katheer" },
];

await mongoose.connect(URI, { bufferCommands: false });
const db = mongoose.connection;
console.log("Connected.\n");

let total = { updated: 0 };

// ── categories ────────────────────────────────────────────────
{
  const docs = await db.collection("categories").find({}).toArray();
  for (const doc of docs) {
    if (!Array.isArray(doc.name) || (doc.name[1] && doc.name[1].trim())) continue;
    const arText = doc.name[2]?.trim() ?? "";
    const match = CATEGORY_TRANSLATIONS.find(t => t.ar.trim() === arText || doc.name[2]?.trim().startsWith(t.ar.trim()) || arText.startsWith(t.ar.trim()));
    if (!match) { console.log(`  ⚠️  No match for category: ${JSON.stringify(doc.name)}`); continue; }
    await db.collection("categories").updateOne({ _id: doc._id }, { $set: { "name.1": match.en } });
    console.log(`  categories [en] → "${match.en}" (was: "${doc.name[0]}")`);
    total.updated++;
  }
}

// ── subcategories ─────────────────────────────────────────────
{
  const docs = await db.collection("subcategories").find({}).toArray();
  for (const doc of docs) {
    if (!Array.isArray(doc.name)) continue;
    const needsEn = !doc.name[1] || !doc.name[1].trim();
    const needsBn = !doc.name[0] || !doc.name[0].trim();
    if (!needsEn && !needsBn) continue;

    const arText = doc.name[2]?.trim() ?? "";
    const bnText = doc.name[0]?.trim() ?? "";

    const match = SUBCATEGORY_TRANSLATIONS.find(t => {
      const arMatch = t.ar.trim() && (t.ar.trim() === arText || arText.startsWith(t.ar.trim()) || t.ar.trim().startsWith(arText));
      const bnMatch = t.bn && bnText && t.bn.trim() === bnText;
      return arMatch || bnMatch;
    });

    if (!match) { console.log(`  ⚠️  No match for subcategory: ${JSON.stringify(doc.name)}`); continue; }

    const update = {};
    if (needsEn && match.en) { update["name.1"] = match.en; }
    if (needsBn && match.fixBn) { update["name.0"] = match.fixBn; }

    if (Object.keys(update).length > 0) {
      await db.collection("subcategories").updateOne({ _id: doc._id }, { $set: update });
      console.log(`  subcategories update: ${JSON.stringify(update)} (ar: "${arText.slice(0, 40)}")`);
      total.updated++;
    }
  }
}

// ── publishers ────────────────────────────────────────────────
{
  const docs = await db.collection("publishers").find({}).toArray();
  for (const doc of docs) {
    if (!Array.isArray(doc.name) || (doc.name[1] && doc.name[1].trim())) continue;
    const arText = doc.name[2]?.trim() ?? "";
    const match = PUBLISHER_TRANSLATIONS.find(t => t.ar.trim() === arText);
    if (!match) { console.log(`  ⚠️  No match for publisher: ${JSON.stringify(doc.name)}`); continue; }
    await db.collection("publishers").updateOne({ _id: doc._id }, { $set: { "name.1": match.en } });
    console.log(`  publishers [en] → "${match.en}"`);
    total.updated++;
  }
}

console.log(`\n── Summary ──────────────────────────────`);
console.log(`Total updated: ${total.updated}`);
await mongoose.disconnect();
