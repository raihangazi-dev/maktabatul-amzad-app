"use client";
import { BookOpen } from "lucide-react";
import PageTitle from "@/app/components/PageTitle";
import BookCard from "@/components/cards/BookCard";
import { useLanguage } from "@/context/LanguageContext";

export default function PublisherDetailClient({ publisher, books = [] }) {
  const { language } = useLanguage();
  const name = Array.isArray(publisher.name)
    ? publisher.name[language] || publisher.name[1]
    : publisher.name;

  return (
    <section className="container">
      <PageTitle title={[name, name, name]} />
      <div className="flex flex-col items-center mt-5 mb-10">
        <div className="h-36 w-36 rounded-full overflow-hidden flex justify-center items-center border-2 border-gray-200">
          {publisher.image ? (
            <img src={publisher.image} className="h-full w-full object-cover" alt={name} />
          ) : (
            <BookOpen className="h-20 w-20 text-primary" />
          )}
        </div>
        <h2 className="text-2xl font-semibold mt-4">{name}</h2>
      </div>
      <p className="text-xl font-semibold mb-5">Books by {name}</p>
      {books.length > 0 ? (
        <div className="flex flex-wrap">
          {books.map((book) => <BookCard key={book._id} book={book} />)}
        </div>
      ) : (
        <p className="text-gray-500">No books found for this publisher</p>
      )}
    </section>
  );
}
