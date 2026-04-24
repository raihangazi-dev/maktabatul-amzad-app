"use client";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function CategoryCard({ category }) {
  const { language } = useLanguage();
  return (
    <Link
      href={`/categories/${category.categoryId}`}
      className="py-1.5 md:py-3 px-4 md:px-8 border border-primary rounded-md hover:bg-primary hover:text-white text-sm md:text-base transition-colors"
    >
      {category.name?.[language] || category.name?.[1] || "Category"}
    </Link>
  );
}
