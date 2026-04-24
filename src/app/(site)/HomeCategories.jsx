"use client";

import CategoryCard from "@/components/cards/CategoryCard";

export default function HomeCategories({ categories = [] }) {
  return (
    <section className="my-12">
      <div className="container">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="section-heading">Shop By Category</h3>
        </div>
        <div className="flex flex-wrap gap-2 md:gap-5">
          {categories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
