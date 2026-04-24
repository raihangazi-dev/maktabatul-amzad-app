import { Suspense } from "react";
import AllBooksClient from "./AllBooksClient";

export const metadata = { title: "Maktabatul Amzad - Books" };

export default function BooksPage() {
  return (
    <Suspense fallback={<div className="container py-20 text-center text-gray-500">Loading books...</div>}>
      <AllBooksClient />
    </Suspense>
  );
}
