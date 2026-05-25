"use client";
import CategoryCard from "@/components/cards/CategoryCard";
import PageTitle from "@/app/components/PageTitle";

export default function CategoriesClient({ categories = [] }) {
  return (
    <section className="container">
      <PageTitle title={["সকল বিষয়", "All Categories", "جميع الفئات"]} />
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((cat, index) => (
          <CategoryCard key={cat._id} category={cat} index={index} featured={index % 7 === 0} />
        ))}
        {categories.length === 0 && <p className="col-span-full text-gray-500">No categories found</p>}
      </div>
    </section>
  );
}
