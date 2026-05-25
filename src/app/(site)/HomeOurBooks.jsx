"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BookCard from "@/components/cards/BookCard";

export default function HomeOurBooks({ books = [] }) {
  const maktabatulBooks = books.filter(
    (book) => book.publisherDetails?.[0]?.name?.[1]?.toLowerCase() === "maktabatul amzad"
  );
  const displayBooks = maktabatulBooks.length > 0 ? maktabatulBooks : books;

  return (
    <section className="bg-[#f7faf3] py-12 md:py-16">
      <div className="container">
        <div className="mb-7 border-b border-gray-950/70 pb-5">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[0.35em] text-red">
                Featured Partner
              </p>
              <h2 className="max-w-[19rem] break-words font-serif text-2xl leading-tight text-gray-950 sm:max-w-none sm:text-3xl md:text-4xl">
                Maktabatul Amzad Publishers
              </h2>
            </div>
            <Link
              href="/books"
              className="hidden items-center gap-2 pb-1 text-xs font-black uppercase tracking-[0.28em] text-gray-950 transition-colors hover:text-primary sm:flex"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <Link
            href="/books"
            className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-gray-950 transition-colors hover:text-primary sm:hidden"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {displayBooks.slice(0, 6).map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}
