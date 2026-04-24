"use client";
import Link from "next/link";
import HorizontalSlider from "@/app/components/HorizontalSlider";
import BookCard from "@/components/cards/BookCard";
import { useLanguage } from "@/context/LanguageContext";

export default function HomeOurBooks({ books = [] }) {
  const { language } = useLanguage();
  const maktabatulBooks = books.filter(
    (b) => b.publisherDetails?.[0]?.name?.[1]?.toLowerCase() === "maktabatul amzad"
  );
  const displayBooks = maktabatulBooks.length > 0 ? maktabatulBooks : books;

  return (
    <section className="mb-12">
      <div className="container p-5 bg-gray-100 relative box-shadow">
        <h3 className="text-xl font-medium mb-3">
          {language === 0 ? "মাকতাবাতুল আমজাদ" : language === 2 ? "مكتبة الامجد" : "Maktabatul Amzad"}
        </h3>
        <HorizontalSlider autoplay>
          {displayBooks.map((book) => (
            <div key={book._id} className="flex-none w-40">
              <BookCard book={book} />
            </div>
          ))}
        </HorizontalSlider>
      </div>
    </section>
  );
}
