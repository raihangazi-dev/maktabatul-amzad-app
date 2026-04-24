"use client";
import { User } from "lucide-react";
import PageTitle from "@/app/components/PageTitle";
import BookCard from "@/components/cards/BookCard";
import { useLanguage } from "@/context/LanguageContext";

export default function WriterDetailClient({ writer, books = [] }) {
  const { language } = useLanguage();
  const name = writer.name?.[language] || writer.name?.[1] || "Writer";
  const desc = writer.desc?.[language] || writer.desc?.[1] || "";

  return (
    <section className="container">
      <PageTitle title={[writer.name?.[0], writer.name?.[1], writer.name?.[2]]} />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-5">
        <div className="md:col-span-1">
          <div className="h-48 w-48 rounded-full overflow-hidden flex justify-center items-center border-2 border-gray-200 mx-auto">
            {writer.image ? (
              <img src={writer.image} className="h-full w-full object-cover" alt={name} />
            ) : (
              <User className="h-24 w-24 text-primary" />
            )}
          </div>
          <h2 className={`text-xl font-semibold text-center mt-4 ${language === 2 ? "text-right" : ""}`}>{name}</h2>
          {desc && <p className={`text-gray-600 mt-4 text-sm leading-relaxed ${language === 2 ? "text-right" : ""}`}>{desc}</p>}
        </div>
        <div className="md:col-span-3">
          <p className="text-xl font-semibold mb-5">Books by {name}</p>
          {books.length > 0 ? (
            <div className="flex flex-wrap">
              {books.map((book) => <BookCard key={book._id} book={book} />)}
            </div>
          ) : (
            <p className="text-gray-500">No books found for this writer</p>
          )}
        </div>
      </div>
    </section>
  );
}
