"use client";
import Link from "next/link";
import BookCard from "@/components/cards/BookCard";
import SideNav from "@/app/components/SideNav";
import { useLanguage } from "@/context/LanguageContext";

export default function HomeAllBooks({ books = [] }) {
  const { language } = useLanguage();
  return (
    <div className="container">
      <div className="grid grid-cols-12">
        <div className="hidden md:block md:col-span-4 xl:col-span-3">
          <SideNav showBrowseTitle />
        </div>
        <div className="col-span-12 md:col-span-8 xl:col-span-9">
          <div className="flex justify-between items-center mb-3">
            <h2 className="ml-5 text-xl font-bold">
              {language === 0 ? "আমাদের বই" : language === 2 ? "كتبنا" : "Our Books"}
            </h2>
            <Link href="/books" className="hover:text-primary">See All</Link>
          </div>
          <div className="flex justify-center flex-wrap">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
