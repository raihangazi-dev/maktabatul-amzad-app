import CategoryDetailClient from "./CategoryDetailClient";
import { getBaseUrl } from "@/lib/baseUrl";

export default async function CategoryDetailPage({ params }) {
  const { categoryId } = await params;
  const BASE = await getBaseUrl();
  const [catRes, subCatRes, booksRes] = await Promise.all([
    fetch(`${BASE}/api/categories/${categoryId}`, { cache: "no-store" }),
    fetch(`${BASE}/api/subcategories?mainCategory=${categoryId}`, { cache: "no-store" }),
    fetch(`${BASE}/api/books?category=${categoryId}&size=50`, { cache: "no-store" }),
  ]);
  const category = catRes.ok ? await catRes.json() : null;
  const subCategories = subCatRes.ok ? await subCatRes.json() : [];
  const catBooks = booksRes.ok ? await booksRes.json() : [];

  if (!category) return <div className="container mt-20 text-center"><p>Category not found</p></div>;
  return <CategoryDetailClient category={category} subCategories={subCategories} books={catBooks} />;
}
