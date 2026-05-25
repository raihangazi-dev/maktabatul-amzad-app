import PublisherDetailClient from "./PublisherDetailClient";
import { getBaseUrl } from "@/lib/baseUrl";

export default async function PublisherDetailPage({ params }) {
  const { publisherId } = await params;
  const BASE = await getBaseUrl();
  const [pubRes, booksRes] = await Promise.all([
    fetch(`${BASE}/api/publishers/${publisherId}`, { cache: "no-store" }),
    fetch(`${BASE}/api/books?size=50`, { cache: "no-store" }),
  ]);
  const publisher = pubRes.ok ? await pubRes.json() : null;
  const allBooks = booksRes.ok ? await booksRes.json() : [];
  const pubBooks = allBooks.filter((b) => b.publisher === publisherId);

  if (!publisher) return <div className="container mt-20 text-center"><p>Publisher not found</p></div>;
  return <PublisherDetailClient publisher={publisher} books={pubBooks} />;
}
