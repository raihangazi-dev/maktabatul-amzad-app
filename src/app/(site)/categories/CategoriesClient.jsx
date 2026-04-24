"use client";
import CategoryCard from "@/components/cards/CategoryCard";
import PageTitle from "@/app/components/PageTitle";

export default function CategoriesClient({ categories = [] }) {
  return (
    <section className="container">
      <PageTitle title={["সকল বিষয়", "All Categories", "جميع الفئات"]} />
      <div className="flex flex-wrap gap-3 mt-5">
        {categories.map((cat) => <CategoryCard key={cat._id} category={cat} />)}
        {categories.length === 0 && <p className="text-gray-500">No categories found</p>}
      </div>
    </section>
  );
}
