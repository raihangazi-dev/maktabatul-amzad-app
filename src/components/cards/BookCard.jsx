"use client";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function BookCard({ book }) {
  const { language } = useLanguage();
  const {
    title,
    thumb,
    price,
    writerDetails,
    categoryDetails,
    category,
    status,
    stock,
    showWriters = true,
    showPrice = true,
    showStatus = true,
  } = book;
  const bookTitle = title?.[language]?.length > 0 ? title[language] : title?.[1] || "Not Available";
  const writerNames = writerDetails?.length > 0
    ? writerDetails.map((item) => {
        const n = item?.name;
        return Array.isArray(n) ? (n[language] || n[1] || n.find(s => s && s.trim()) || "") : (n || "");
      }).filter(Boolean).join(", ")
    : "Not Available";
  const nameArr = categoryDetails?.[0]?.name;
  const categoryName = Array.isArray(nameArr)
    ? (nameArr[language] || nameArr[1] || nameArr.find(s => s && s.trim()) || "Book")
    : (nameArr || "Book");
  const numericPrice = Number(price);
  const formattedPrice = Number.isFinite(numericPrice)
    ? `Tk ${numericPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : `Tk ${price || "0.00"}`;
  const statusLabel = showStatus && status === "upcoming" ? "Upcoming" : showStatus && stock === 0 ? "Stock Out" : "";

  return (
    <article className="book-card group flex w-full min-w-0 flex-col bg-transparent">
      <Link
        href={`/books/${book._id}`}
        className="relative block aspect-[3/4] overflow-hidden bg-[#173729] shadow-[0_18px_32px_rgba(15,23,42,0.12)]"
      >
        {statusLabel && (
          <span className="absolute left-3 top-3 z-10 bg-red px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white">
            {statusLabel}
          </span>
        )}
        {thumb ? (
          <img
            src={thumb}
            className="book-card-img h-full bg-slate-200 object-cover"
            alt={bookTitle}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center bg-[radial-gradient(circle_at_38%_18%,rgba(255,255,255,0.22),transparent_24%),linear-gradient(135deg,#213f31,#10251d)] px-5 text-center text-white">
            <span className="mb-5 text-[10px] font-black uppercase tracking-[0.28em] text-white/70">
              Al-Maktaba
            </span>
            <span className="font-serif text-2xl italic leading-tight">{bookTitle}</span>
            <span className="mt-5 h-px w-2/3 bg-white/20" />
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col pt-5">
        {category ? (
          <Link
            href={`/categories/${category}`}
            className="mb-3 block max-w-full self-start truncate whitespace-nowrap bg-black px-2 py-1 text-[10px] font-black uppercase leading-none tracking-[0.12em] text-white transition-colors hover:bg-primary"
          >
            {categoryName}
          </Link>
        ) : (
          <span className="mb-3 block max-w-full self-start truncate whitespace-nowrap bg-black px-2 py-1 text-[10px] font-black uppercase leading-none tracking-[0.12em] text-white">
            {categoryName}
          </span>
        )}

        <Link href={`/books/${book._id}`} className="block min-w-0 max-w-full">
          <h4 className="truncate whitespace-nowrap font-serif text-[1.35rem] leading-tight text-gray-950 transition-colors group-hover:text-primary">
            {bookTitle}
          </h4>
        </Link>

        {showWriters ? (
          <p className="mt-3 max-w-full truncate whitespace-nowrap text-sm text-gray-600">{writerNames}</p>
        ) : (
          <p className="mt-3 max-w-full truncate whitespace-nowrap text-sm text-gray-400">Writers Hidden</p>
        )}

        {showPrice ? (
          <p className="mt-3 text-base font-black text-red">{formattedPrice}</p>
        ) : (
          <p className="mt-3 text-sm text-gray-400">Price Hidden</p>
        )}
      </div>
    </article>
  );
}
