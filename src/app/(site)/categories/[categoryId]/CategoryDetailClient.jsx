"use client";
import { useEffect } from "react";
import Link from "next/link";
import PageTitle from "@/app/components/PageTitle";
import BookCard from "@/components/cards/BookCard";
import { useLanguage } from "@/context/LanguageContext";
import { useBreadcrumb } from "@/context/BreadcrumbContext";

export default function CategoryDetailClient({ category, subCategories = [], books = [] }) {
  const { language } = useLanguage();
  const { setExtra } = useBreadcrumb();
  const catName = Array.isArray(category.name)
    ? (category.name[language] || category.name[1] || category.name.find(s => s && s.trim()))
    : category.name;

  useEffect(() => {
    setExtra([{ label: catName }]);
    return () => setExtra([]);
  }, [catName]);

  return (
    <section className="container">
      <PageTitle title={[category.name?.[0], category.name?.[1], category.name?.[2]]} />

      {subCategories.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-8">
          {subCategories.map((sub) => (
            <span key={sub._id} className="py-1.5 px-4 border border-primary rounded-md text-sm">
              {sub.name?.[language] || sub.name?.[1]}
            </span>
          ))}
        </div>
      )}

      <p className="text-xl font-semibold mb-5">
        Books in {category.name?.[language] || category.name?.[1]}
      </p>
      {books.length > 0 ? (
        <div className="flex flex-wrap">
          {books.map((book) => <BookCard key={book._id} book={book} />)}
        </div>
      ) : (
        <p className="text-gray-500">No books found in this category</p>
      )}
    </section>
  );
}
