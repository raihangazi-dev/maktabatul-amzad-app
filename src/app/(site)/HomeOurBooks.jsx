"use client";

import Link from "next/link";
import HorizontalSlider from "@/app/components/HorizontalSlider";
import BookCard from "@/components/cards/BookCard";

export default function HomeOurBooks({ books = [] }) {
  const maktabatulBooks = books.filter(
    (book) => book.publisherDetails?.[0]?.name?.[1]?.toLowerCase() === "maktabatul amzad"
  );
  const displayBooks = maktabatulBooks.length > 0 ? maktabatulBooks : books;

  return (
    <section className="mb-12">
      <div className="container section-panel">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="section-heading">Maktabatul Amzad Books</h3>
          <Link href="/books" className="text-sm font-semibold text-primary hover:text-red transition-colors">
            See All
          </Link>
        </div>
        <HorizontalSlider autoplay>
          {displayBooks.map((book) => (
            <div key={book._id} className="flex-none w-48">
              <BookCard book={book} />
            </div>
          ))}
        </HorizontalSlider>
      </div>
    </section>
  );
}
