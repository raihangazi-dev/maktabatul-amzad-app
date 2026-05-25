import CategoriesClient from "./CategoriesClient";
import { getBaseUrl } from "@/lib/baseUrl";

export const metadata = { title: "Maktabatul Amzad - Categories" };

export default async function CategoriesPage() {
  const BASE = await getBaseUrl();
  const res = await fetch(`${BASE}/api/categories`, { cache: "no-store" });
  const categories = res.ok ? await res.json() : [];
  return <CategoriesClient categories={categories} />;
}
