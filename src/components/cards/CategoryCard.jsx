"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getCategoryPresentation } from "@/lib/categoryPresentation";

export default function CategoryCard({ category, index = 0, featured = false, variant = "default" }) {
  const { language } = useLanguage();
  const name = (Array.isArray(category.name)
    ? (category.name[language] || category.name[1] || category.name.find((s) => s && s.trim()))
    : category.name) || "Category";
  const number = String(index + 1).padStart(2, "0");
  const { description, image } = getCategoryPresentation(name, index);
  const isHero = variant === "hero";

  return (
    <Link
      href={`/categories/${category.categoryId}`}
      className={[
        "group flex w-full max-w-full min-w-0 flex-col overflow-hidden border bg-white transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-[0_18px_34px_rgba(15,23,42,0.08)]",
        isHero ? "min-h-[31rem] border-primary/50 sm:col-span-2 lg:col-span-1" : "",
        !isHero && featured ? "min-h-80 border-primary/50 sm:col-span-2" : "",
        !isHero && !featured ? "min-h-72 border-gray-200" : "",
      ].join(" ")}
    >
      <div className={["relative overflow-hidden", isHero ? "h-72" : "h-40"].join(" ")}>
        <img
          src={image}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          alt={name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <span className="absolute left-4 top-4 bg-white px-2 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-primary">
          {number}
        </span>
      </div>

      <div className={["flex w-full min-w-0 flex-1 flex-col justify-between overflow-hidden", isHero ? "p-6" : "p-4"].join(" ")}>
        <div className="min-w-0 max-w-full overflow-hidden">
          <h4 className={["category-card-title font-serif leading-tight text-gray-950 transition-colors group-hover:text-primary", isHero ? "text-3xl" : "text-2xl"].join(" ")}>
            {name}
          </h4>
          <p className="category-card-desc mt-3 text-sm leading-6 text-gray-600">
            {description}
          </p>
        </div>

        <span className="mt-6 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-gray-950">
          Explore <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
