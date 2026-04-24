"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Grid2X2, List, SlidersHorizontal, Star, X } from "lucide-react";
import BookCard from "@/components/cards/BookCard";
import { useLanguage } from "@/context/LanguageContext";

const priceRanges = [
  { label: "TK 50 - 100", gte: 50, lte: 100 },
  { label: "TK 101 - 300", gte: 101, lte: 300 },
  { label: "TK 301 - 500", gte: 301, lte: 500 },
  { label: "TK 501 - 1000", gte: 501, lte: 1000 },
  { label: "TK 1001 - 2000", gte: 1001, lte: 2000 },
  { label: "TK 3000+", gte: 3001, lte: 50000 },
];

const labels = {
  heading: ["All Books", "Curated Collections", "All Books"],
  intro: [
    "Explore selected books from Maktabatul Amzad.",
    "Explore selected titles from our growing collection of classical and modern literature.",
    "Explore selected books from Maktabatul Amzad.",
  ],
  activeFilters: ["Active Filters", "Active Filters", "Active Filters"],
  categories: ["Categories", "Categories", "Categories"],
  priceRange: ["Price Range", "Price Range", "Price Range"],
  writers: ["Popular Writers", "Popular Writers", "Popular Writers"],
  rating: ["Customer Rating", "Customer Rating", "Customer Rating"],
  sort: ["Sort By", "Sort By", "Sort By"],
  showing: ["Showing", "Showing", "Showing"],
  clear: ["Clear All", "Clear All", "Clear All"],
};

export default function AllBooksClient() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalBooks, setTotalBooks] = useState(0);
  const [sort, setSort] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(0);
  const [categories, setCategories] = useState([]);
  const [writers, setWriters] = useState([]);

  const titleQuery = searchParams.get("title") || "";
  const gte = Number(searchParams.get("gte") || 0);
  const lte = Number(searchParams.get("lte") || 50000);

  const numberOfPages = Math.ceil(totalBooks / itemsPerPage);
  const pages = useMemo(() => [...Array(numberOfPages).keys()], [numberOfPages]);
  const visiblePages = useMemo(
    () => pages.slice(Math.max(0, currentPage - 2), currentPage + 3),
    [pages, currentPage]
  );
  const activePrice = priceRanges.find((range) => range.gte === gte && range.lte === lte);
  const resultStart = totalBooks === 0 ? 0 : currentPage * itemsPerPage + 1;
  const resultEnd = Math.min((currentPage + 1) * itemsPerPage, totalBooks);

  useEffect(() => {
    let ignore = false;

    fetch("/api/books/length")
      .then((r) => r.json())
      .then((data) => {
        if (!ignore) setTotalBooks(data.totalBooks || 0);
      })
      .catch(() => {
        if (!ignore) setTotalBooks(0);
      });

    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => {
        if (!ignore) setCategories(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!ignore) setCategories([]);
      });

    fetch("/api/writers")
      .then((r) => r.json())
      .then((data) => {
        if (!ignore) setWriters(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!ignore) setWriters([]);
      });

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    const query = titleQuery
      ? `/api/books?title=${encodeURIComponent(titleQuery)}`
      : `/api/books?page=${currentPage}&size=${itemsPerPage}&gte=${gte}&lte=${lte}&sort=${sort}`;

    let ignore = false;
    fetch(query)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch books");
        return r.json();
      })
      .then((data) => {
        if (!ignore) {
          const nextBooks = Array.isArray(data) ? data : [];
          setBooks(nextBooks);
          if (titleQuery) setTotalBooks(nextBooks.length);
        }
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

  const setPriceRange = (range) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("gte", range.gte);
    params.set("lte", range.lte);
    params.delete("title");
    setLoading(true);
    setCurrentPage(0);
    router.push(`/books?${params.toString()}`);
  };

  const clearFilters = () => {
    setLoading(true);
    setCurrentPage(0);
    router.push("/books");
  };

  return (
    <section className="bg-[#f7f8f7] pb-20">
      <div className="container py-10 md:py-14">
        <div className="flex flex-col gap-5 border-b border-gray-200 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-black leading-tight text-gray-950 md:text-5xl">
              {labels.heading[language]}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-gray-600">
              {labels.intro[language]}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-500">{labels.sort[language]}:</label>
            <select
              value={sort}
              onChange={(e) => {
                setLoading(true);
                setSort(parseInt(e.target.value));
                setCurrentPage(0);
              }}
              className="h-10 border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-primary"
            >
              <option value={1}>Price: Low to High</option>
              <option value={-1}>Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[270px_minmax(0,1fr)]">
          <aside className="books-filter-panel h-fit border border-gray-200 bg-white p-5">
            <div className="mb-7 bg-gray-50 p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-gray-500">
                  {labels.activeFilters[language]}
                </p>
                <SlidersHorizontal className="h-4 w-4 text-primary" />
              </div>
              <div className="flex flex-wrap gap-2">
                {titleQuery && (
                  <span className="inline-flex items-center gap-1 bg-primary/10 px-2.5 py-1 text-xs text-primary">
                    {titleQuery}
                    <X className="h-3 w-3" />
                  </span>
                )}
                {activePrice && (
                  <span className="inline-flex items-center gap-1 bg-primary/10 px-2.5 py-1 text-xs text-primary">
                    {activePrice.label}
                    <X className="h-3 w-3" />
                  </span>
                )}
                {!titleQuery && !activePrice && <span className="text-xs text-gray-400">No active filters</span>}
              </div>
              {(titleQuery || activePrice) && (
                <button onClick={clearFilters} className="mt-4 text-xs font-semibold text-red underline">
                  {labels.clear[language]}
                </button>
              )}
            </div>

            <div className="books-filter-group">
              <p>{labels.categories[language]}</p>
              <ul>
                {categories.slice(0, 7).map((category, index) => (
                  <li key={category._id}>
                    <Link href={`/categories/${category.categoryId}`}>
                      <span>{category.name?.[language] || category.name?.[1] || "Category"}</span>
                      <span>{Math.max(8, totalBooks - index * 7)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="books-filter-group">
              <p>{labels.priceRange[language]}</p>
              <ul>
                {priceRanges.map((range) => (
                  <li key={range.label}>
                    <button
                      onClick={() => setPriceRange(range)}
                      className={activePrice?.label === range.label ? "active" : ""}
                    >
                      {range.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="books-filter-group">
              <p>{labels.writers[language]}</p>
              <ul>
                {writers.slice(0, 5).map((writer) => (
                  <li key={writer._id}>
                    <Link href={`/writers/${writer.writerId}`}>
                      <span>{writer.name?.[language] || writer.name?.[1] || writer.name || "Writer"}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="books-filter-group mb-0">
              <p>{labels.rating[language]}</p>
              <button className="items-center gap-1 text-sm text-gray-600">
                <span className="inline-flex text-gold">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="h-3.5 w-3.5 fill-gold text-gold" />
                  ))}
                </span>
                <span>& Up</span>
              </button>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-7 flex flex-col gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-500">
                {labels.showing[language]} <span className="font-semibold text-gray-900">{resultStart} - {resultEnd}</span>{" "}
                of <span className="font-semibold text-gray-900">{totalBooks.toLocaleString()}</span> results
              </p>

              <div className="flex items-center gap-3">
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setLoading(true);
                    setItemsPerPage(parseInt(e.target.value));
                    setCurrentPage(0);
                  }}
                  className="h-9 border border-gray-200 bg-white px-2 text-sm outline-none focus:border-primary"
                >
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                  <option value={48}>48</option>
                </select>
                <button className="grid h-9 w-9 place-items-center bg-primary/10 text-primary" aria-label="Grid view">
                  <Grid2X2 className="h-4 w-4" />
                </button>
                <button className="grid h-9 w-9 place-items-center text-gray-500 hover:bg-white" aria-label="List view">
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
              {loading ? (
                <div className="col-span-full flex min-h-96 items-center justify-center">
                  <p className="text-gray-500">Loading books...</p>
                </div>
              ) : books.length > 0 ? (
                books.map((book) => <BookCard key={book._id} book={book} />)
              ) : (
                <p className="col-span-full mt-20 text-center text-gray-500">No books found</p>
              )}
            </div>

            {books.length > 0 && pages.length > 1 && (
              <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => {
                    setLoading(true);
                    setCurrentPage(Math.max(0, currentPage - 1));
                  }}
                  disabled={currentPage === 0}
                  className="grid h-10 w-10 place-items-center border border-gray-200 bg-white text-gray-500 disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {visiblePages.map((page) => (
                  <button
                    key={page}
                    onClick={() => {
                      setLoading(true);
                      setCurrentPage(page);
                    }}
                    className={`h-10 min-w-10 border px-3 text-sm font-semibold transition-all hover:border-primary hover:bg-primary hover:text-white ${
                      currentPage === page ? "pagination-active" : "border-gray-200 bg-white text-gray-700"
                    }`}
                  >
                    {page + 1}
                  </button>
                ))}
                {currentPage + 3 < pages.length && <span className="px-2 text-gray-400">...</span>}
                {pages.length > 5 && currentPage + 3 < pages.length && (
                  <button
                    onClick={() => {
                      setLoading(true);
                      setCurrentPage(pages.length - 1);
                    }}
                    className="h-10 min-w-10 border border-gray-200 bg-white px-3 text-sm text-gray-700"
                  >
                    {pages.length}
                  </button>
                )}
                <button
                  onClick={() => {
                    setLoading(true);
                    setCurrentPage(Math.min(pages.length - 1, currentPage + 1));
                  }}
                  disabled={currentPage >= pages.length - 1}
                  className="grid h-10 w-10 place-items-center border border-gray-200 bg-white text-gray-500 disabled:opacity-40"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
