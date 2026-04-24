import PublisherDetailClient from "./PublisherDetailClient";

const BASE = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export default async function PublisherDetailPage({ params }) {
  const [pubRes, booksRes] = await Promise.all([
    fetch(`${BASE}/api/publishers/${params.publisherId}`, { cache: "no-store" }),
    fetch(`${BASE}/api/books?size=50`, { cache: "no-store" }),
  ]);
  const publisher = pubRes.ok ? await pubRes.json() : null;
  const allBooks = booksRes.ok ? await booksRes.json() : [];
  const pubBooks = allBooks.filter((b) => b.publisher === params.publisherId);

  if (!publisher) return <div className="container mt-20 text-center"><p>Publisher not found</p></div>;
  return <PublisherDetailClient publisher={publisher} books={pubBooks} />;
}
