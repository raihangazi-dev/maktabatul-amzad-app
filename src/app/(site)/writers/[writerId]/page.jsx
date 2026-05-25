import WriterDetailClient from "./WriterDetailClient";
import { getBaseUrl } from "@/lib/baseUrl";

export async function generateMetadata({ params }) {
  try {
    const { writerId } = await params;
    const BASE = await getBaseUrl();
    const res = await fetch(`${BASE}/api/writers/${writerId}`, { cache: "no-store" });
    const writer = await res.json();
    const name = Array.isArray(writer?.name) ? writer.name[1] : writer?.name;
    return { title: `Maktabatul Amzad - ${name || "Writer"}` };
  } catch {
    return { title: "Maktabatul Amzad - Writer" };
  }
}

export default async function WriterDetailPage({ params }) {
  const { writerId } = await params;
  const BASE = await getBaseUrl();
  const [writerRes, booksRes] = await Promise.all([
    fetch(`${BASE}/api/writers/${writerId}`, { cache: "no-store" }),
    fetch(`${BASE}/api/books?size=50`, { cache: "no-store" }),
  ]);
  const writer = writerRes.ok ? await writerRes.json() : null;
  const allBooks = booksRes.ok ? await booksRes.json() : [];
  const writerBooks = allBooks.filter((b) => b.writer?.includes(writerId));

  if (!writer) return <div className="container mt-20 text-center"><p>Writer not found</p></div>;
  return <WriterDetailClient writer={writer} books={writerBooks} />;
}
