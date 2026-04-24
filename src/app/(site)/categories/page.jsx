import CategoriesClient from "./CategoriesClient";

export const metadata = { title: "Maktabatul Amzad - Categories" };

const BASE = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export default async function CategoriesPage() {
  const res = await fetch(`${BASE}/api/categories`, { cache: "no-store" });
  const categories = res.ok ? await res.json() : [];
  return <CategoriesClient categories={categories} />;
}
