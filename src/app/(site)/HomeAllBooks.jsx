"use client";

import Link from "next/link";
import BookCard from "@/components/cards/BookCard";
import SideNav from "@/app/components/SideNav";

export default function HomeAllBooks({ books = [] }) {
  return (
    <section className="container mb-12">
      <div className="grid grid-cols-12 gap-6">
        <div className="hidden md:block md:col-span-4 xl:col-span-3">
          <SideNav showBrowseTitle />
        </div>
        <div className="col-span-12 md:col-span-8 xl:col-span-9">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="section-heading">Our Books</h2>
            <Link href="/books" className="text-sm font-semibold text-primary hover:text-red transition-colors">
              See All
            </Link>
          </div>
          <div className="flex flex-wrap justify-center">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
