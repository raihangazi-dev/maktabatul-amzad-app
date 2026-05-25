"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BookCard from "@/components/cards/BookCard";

export default function HomeBestSeller({ books = [] }) {
  const bestSellers = [...books].sort((a, b) => (b.sold || 0) - (a.sold || 0)).slice(0, 12);

  return (
    <section className="mb-12">
      <div className="container">
        <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
          <h3 className="section-heading">Best Sellers</h3>
          <Link href="/books" className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-gray-950 transition-colors hover:text-primary">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {bestSellers.slice(0, 6).map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}
