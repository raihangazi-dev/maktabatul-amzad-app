import BookDetailClient from "./BookDetailClient";
import { getBaseUrl } from "@/lib/baseUrl";

export async function generateMetadata({ params }) {
  try {
    const { id } = await params;
    const BASE = await getBaseUrl();
    const res = await fetch(`${BASE}/api/books/${id}`, { cache: "no-store" });
    const book = await res.json();
    return { title: `Maktabatul Amzad - ${book?.title?.[1] || "Book"}` };
  } catch {
    return { title: "Maktabatul Amzad - Book" };
  }
}

export default async function BookDetailPage({ params }) {
  const { id } = await params;
  const BASE = await getBaseUrl();
  const res = await fetch(`${BASE}/api/books/${id}`, { cache: "no-store" });
  const book = res.ok ? await res.json() : null;

  if (!book) {
    return <div className="container mt-20 text-center"><p>Book not found</p></div>;
  }

  return <BookDetailClient book={book} />;
}
