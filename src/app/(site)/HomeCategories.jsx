"use client";
import CategoryCard from "@/components/cards/CategoryCard";
import { useLanguage } from "@/context/LanguageContext";

export default function HomeCategories({ categories = [] }) {
  const { language } = useLanguage();
  return (
    <section className="my-12">
      <div className="container">
        <div className="flex flex-wrap gap-2 md:gap-5">
          {categories.map((cat) => (
            <CategoryCard key={cat._id} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
