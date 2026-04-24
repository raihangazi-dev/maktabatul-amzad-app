"use client";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

export default function BookCard({ book }) {
  const { handleAddtoCart } = useCart();
  const { language } = useLanguage();
  const {
    title,
    thumb,
    price,
    writerDetails,
    status,
    stock,
    showWriters = true,
    showPrice = true,
    showStatus = true,
  } = book;
  const rating = stock === 0 ? "4.6" : "4.9";
  const writerNames = writerDetails?.length > 0
    ? writerDetails.map((item) => item?.name?.[language] || item?.name?.[1] || item?.name || "").filter(Boolean).join(", ")
    : "Not Available";
  const actionButton = !showStatus ? (
    <button className="bg-slate-700 px-4 py-2 text-center text-[11px] font-bold uppercase text-white">
      Not Available
    </button>
  ) : status === "upcoming" ? (
    <button className="bg-slate-700 px-4 py-2 text-center text-[11px] font-bold uppercase text-white">
      Upcoming
    </button>
  ) : stock === 0 ? (
    <button className="bg-red px-4 py-2 text-center text-[11px] font-bold uppercase text-white">
      Stock Out
    </button>
  ) : (
    <button
      onClick={() => handleAddtoCart(book)}
      className="flex items-center justify-center gap-1 bg-red px-4 py-2 text-center text-[11px] font-bold uppercase text-white hover:bg-primary transition-colors active:scale-[0.98]"
    >
      <ShoppingCart className="h-3.5 w-3.5" /> Add to cart
    </button>
  );

  return (
    <div className="book-card group flex min-h-[475px] flex-col overflow-hidden bg-white">
      <Link href={`/books/${book._id}`} className="relative block h-72 overflow-hidden bg-[#eef2ef]">
        {showStatus && status === "upcoming" && (
          <span className="absolute left-4 top-4 z-10 bg-primary px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white">
            Upcoming
          </span>
        )}
        {showStatus && stock === 0 && (
          <span className="absolute left-4 top-4 z-10 bg-red px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white">
            Stock Out
          </span>
        )}
        <img
          src={thumb || "/placeholder-book.jpg"}
          className="book-card-img h-full bg-slate-200 object-cover"
          alt={title?.[1] || "Book"}
        />
      </Link>

      <div className="flex flex-1 flex-col bg-white p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <Link href={`/books/${book._id}`} className="min-w-0">
            <h4 className="line-clamp-2 text-base font-semibold leading-6 text-gray-950 group-hover:text-primary transition-colors">
              {title?.[language]?.length > 0 ? title[language] : title?.[1] || "Not Available"}
            </h4>
          </Link>
          <div className="mt-1 flex shrink-0 items-center gap-1 text-xs font-semibold text-gray-700">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            {rating}
          </div>
        </div>

        {showWriters ? (
          <p className="line-clamp-1 text-sm italic text-gray-500">{writerNames}</p>
        ) : (
          <p className="text-sm text-gray-400">Writers Hidden</p>
        )}

        <div className="mt-auto flex items-end justify-between gap-3 pt-6">
          {showPrice ? (
            <p className="text-xl font-semibold text-primary">{price} TK</p>
          ) : (
            <p className="text-sm text-gray-400">Price Hidden</p>
          )}

          {actionButton}
        </div>
      </div>
    </div>
  );
}
