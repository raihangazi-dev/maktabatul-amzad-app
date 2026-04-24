"use client";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function CategoryCard({ category }) {
  const { language } = useLanguage();
  return (
    <Link
      href={`/categories/${category.categoryId}`}
      className="border border-primary/30 bg-white px-4 py-2 text-sm font-semibold text-gray-800 hover:border-primary hover:bg-primary hover:text-white md:px-7 md:py-3 md:text-base transition-all duration-150 hover:-translate-y-0.5"
    >
      {category.name?.[language] || category.name?.[1] || "Category"}
    </Link>
  );
}
