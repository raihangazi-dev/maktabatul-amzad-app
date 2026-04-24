import CategoryDetailClient from "./CategoryDetailClient";

const BASE = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export default async function CategoryDetailPage({ params }) {
  const [catRes, subCatRes, booksRes] = await Promise.all([
    fetch(`${BASE}/api/categories/${params.categoryId}`, { cache: "no-store" }),
    fetch(`${BASE}/api/subcategories?mainCategory=${params.categoryId}`, { cache: "no-store" }),
    fetch(`${BASE}/api/books?size=50`, { cache: "no-store" }),
  ]);
  const category = catRes.ok ? await catRes.json() : null;
  const subCategories = subCatRes.ok ? await subCatRes.json() : [];
  const allBooks = booksRes.ok ? await booksRes.json() : [];
  const catBooks = allBooks.filter((b) => b.category === params.categoryId);

  if (!category) return <div className="container mt-20 text-center"><p>Category not found</p></div>;
  return <CategoryDetailClient category={category} subCategories={subCategories} books={catBooks} />;
}
