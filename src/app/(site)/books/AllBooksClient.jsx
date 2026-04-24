"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import BookCard from "@/components/cards/BookCard";
import SideNav from "@/app/components/SideNav";
import PageTitle from "@/app/components/PageTitle";
import { useLanguage } from "@/context/LanguageContext";

export default function AllBooksClient() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalBooks, setTotalBooks] = useState(0);
  const [sort, setSort] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const titleQuery = searchParams.get("title") || "";
  const gte = searchParams.get("gte") || 0;
  const lte = searchParams.get("lte") || 50000;

  const numberOfPages = Math.ceil(totalBooks / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  useEffect(() => {
    fetch("/api/books/length")
      .then((r) => r.json())
      .then((d) => setTotalBooks(d.totalBooks || 0));
  }, []);

  useEffect(() => {
    const query = titleQuery
      ? `/api/books?title=${titleQuery}`
      : `/api/books?page=${currentPage}&size=${itemsPerPage}&gte=${gte}&lte=${lte}&sort=${sort}`;

    let ignore = false;
    fetch(query)
      .then((r) => r.json())
      .then((data) => {
        if (!ignore) setBooks(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!ignore) setBooks([]);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [titleQuery, itemsPerPage, currentPage, sort, gte, lte]);

  return (
    <section className="container">
      <PageTitle title={["সকল বই", "All Books", "جميع الكتب"]} />

      {/* Filter bar */}
      <div className="flex flex-wrap gap-4 items-center mb-5 py-3 border-b">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Sort by Price:</label>
          <select
            value={sort}
            onChange={(e) => setSort(parseInt(e.target.value))}
            className="border p-1 text-sm focus:outline-none focus:border-primary"
          >
            <option value={1}>Low to High</option>
            <option value={-1}>High to Low</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Per page:</label>
          <select
            value={itemsPerPage}
            onChange={(e) => { setItemsPerPage(parseInt(e.target.value)); setCurrentPage(0); }}
            className="border p-1 text-sm focus:outline-none focus:border-primary"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      <div className="md:flex">
        <SideNav />
        <div className="flex-1">
          <div className="flex flex-wrap justify-center">
            {loading ? (
              <div className="min-h-96 flex items-center justify-center w-full">
                <p className="text-gray-500">Loading books...</p>
              </div>
            ) : books.length > 0 ? (
              books.map((book) => <BookCard key={book._id} book={book} />)
            ) : (
              <p className="mt-20 text-gray-500">No books found</p>
            )}
          </div>

          {books.length > 0 && pages.length > 1 && (
            <div className="flex justify-center items-center my-10 flex-wrap gap-2">
              {pages.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`py-1 px-3 border transition-all hover:border-primary hover:bg-primary hover:text-white ${
                    currentPage === page ? "pagination-active" : ""
                  }`}
                >
                  {page + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
