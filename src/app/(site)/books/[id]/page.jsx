import BookDetailClient from "./BookDetailClient";

export async function generateMetadata({ params }) {
  const BASE = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  try {
    const res = await fetch(`${BASE}/api/books/${params.id}`, { cache: "no-store" });
    const book = await res.json();
    return { title: `Maktabatul Amzad - ${book?.title?.[1] || "Book"}` };
  } catch {
    return { title: "Maktabatul Amzad - Book" };
  }
}

export default async function BookDetailPage({ params }) {
  const BASE = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const res = await fetch(`${BASE}/api/books/${params.id}`, { cache: "no-store" });
  const book = res.ok ? await res.json() : null;

  if (!book) {
    return <div className="container mt-20 text-center"><p>Book not found</p></div>;
  }

  return <BookDetailClient book={book} />;
}
