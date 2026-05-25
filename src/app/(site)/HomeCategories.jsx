"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CategoryCard from "@/components/cards/CategoryCard";

export default function HomeCategories({ categories = [] }) {
  const [primaryCategory, ...secondaryCategories] = categories.slice(0, 8);

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container">
        <div className="mb-7 border-b border-gray-950/70 pb-5">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[0.35em] text-red">
                Library Index
              </p>
              <h3 className="max-w-[19rem] break-words font-serif text-2xl leading-tight text-gray-950 sm:max-w-none sm:text-3xl md:text-4xl">
                Explore By Category
              </h3>
            </div>
            <Link
              href="/categories"
              className="hidden items-center gap-2 pb-1 text-xs font-black uppercase tracking-[0.28em] text-gray-950 transition-colors hover:text-primary sm:flex"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <Link
            href="/categories"
            className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-gray-950 transition-colors hover:text-primary sm:hidden"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {primaryCategory ? (
          <div className="grid min-w-0 gap-5 lg:grid-cols-[360px_minmax(0,1fr)]">
            <CategoryCard
              category={primaryCategory}
              index={0}
              variant="hero"
            />

            <div className="grid min-w-0 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {secondaryCategories.map((category, index) => (
                <CategoryCard
                  key={category._id}
                  category={category}
                  index={index + 1}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No categories found</p>
        )}
      </div>
    </section>
  );
}
