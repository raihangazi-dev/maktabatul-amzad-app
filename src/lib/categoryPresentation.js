const categoryImages = [
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=900&q=80",
];

const descriptions = [
  {
    keys: ["aqeedah", "tawheed", "creed"],
    text: "Belief, creed, and foundations.",
  },
  {
    keys: ["qira", "tajweed", "recitation"],
    text: "Recitation and pronunciation.",
  },
  {
    keys: ["quran", "tafsir"],
    text: "Quranic sciences and tafsir.",
  },
  {
    keys: ["hadith"],
    text: "Texts, methods, and commentary.",
  },
  {
    keys: ["fiqh", "usool", "law", "inheritance"],
    text: "Rulings, usool, and practice.",
  },
  {
    keys: ["seerah", "sahabah", "biography"],
    text: "Lives and early Islamic history.",
  },
  {
    keys: ["sermon", "advice", "tazkiyah", "tasawwuf"],
    text: "Character and purification.",
  },
  {
    keys: ["history", "geography", "politics", "economics"],
    text: "History, society, and ideas.",
  },
  {
    keys: ["education", "training", "children", "family", "society"],
    text: "Learning and family guidance.",
  },
  {
    keys: ["arabic", "dictionary", "lexicon", "language"],
    text: "Language and reference works.",
  },
  {
    keys: ["travel", "journey", "encyclopedia"],
    text: "Reference and discovery.",
  },
];

export function getCategoryPresentation(name = "", index = 0) {
  const normalized = name.toLowerCase();
  const match = descriptions.find((item) =>
    item.keys.some((key) => normalized.includes(key))
  );

  return {
    description:
      match?.text || "Focused books by subject.",
    image: categoryImages[index % categoryImages.length],
  };
}
