"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const priceRanges = [
  { label: "TK 50 - 100", gte: 50, lte: 100 },
  { label: "TK 101 - 300", gte: 101, lte: 300 },
  { label: "TK 301 - 500", gte: 301, lte: 500 },
  { label: "TK 501 - 1000", gte: 501, lte: 1000 },
  { label: "TK 1001 - 2000", gte: 1001, lte: 2000 },
  { label: "TK 2001 - 3000", gte: 2001, lte: 3000 },
  { label: "TK 3000+", gte: 3001, lte: 50000 },
];

export default function SideNav({ categories = [], showBrowseTitle = false }) {
  const { language } = useLanguage();
  const router = useRouter();

  const handleRange = (gte, lte) => {
    router.push(`/books?gte=${gte}&lte=${lte}`);
  };

  return (
    <div className="md:w-[250px] pr-5 border-r min-h-screen">
      {showBrowseTitle && (
        <p className="font-bold pb-2 mb-5 border-b">
          {language === 0 ? "বই দেখুন" : language === 2 ? "انظر الكتاب" : "BROWSE BOOKS"}
        </p>
      )}

      {categories.length > 0 && (
        <div className="my-2 hidden md:block">
          <p className="font-semibold text-sm mb-2">
            {language === 0 ? "বিষয়" : language === 2 ? "موضوع" : "SUBJECT"}
          </p>
          <ul className="space-y-1">
            {categories.map((cat) => (
              <li key={cat._id} className="hover:text-red truncate ml-2 text-sm">
                <Link href={`/categories/${cat.categoryId}`}>
                  {cat.name?.[language] || cat.name?.[1]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="my-4">
        <p className="font-semibold text-sm mb-2">
          {language === 0 ? "দাম" : language === 2 ? "سعر" : "PRICE"}
        </p>
        <ul className="space-y-1 ml-2">
          {priceRanges.map((range) => (
            <li key={range.label}>
              <button
                onClick={() => handleRange(range.gte, range.lte)}
                className="hover:text-red cursor-pointer text-sm text-left"
              >
                {range.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
