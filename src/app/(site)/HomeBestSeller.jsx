"use client";

import Link from "next/link";
import HorizontalSlider from "@/app/components/HorizontalSlider";
import BookCard from "@/components/cards/BookCard";

export default function HomeBestSeller({ books = [] }) {
  const bestSellers = [...books].sort((a, b) => (b.sold || 0) - (a.sold || 0)).slice(0, 12);

  return (
    <section className="mb-12">
      <div className="container section-panel">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="section-heading">Best Sellers</h3>
          <Link href="/books" className="text-sm font-semibold text-primary hover:text-red transition-colors">
            See All
          </Link>
        </div>
        <HorizontalSlider>
          {bestSellers.map((book) => (
            <div key={book._id} className="flex-none w-48">
              <BookCard book={book} />
            </div>
          ))}
        </HorizontalSlider>
      </div>
    </section>
  );
}
