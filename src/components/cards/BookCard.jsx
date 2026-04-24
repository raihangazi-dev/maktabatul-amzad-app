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

  return (
    <div className="book-card group m-2 flex h-[340px] w-44 flex-col overflow-hidden">
      <Link href={`/books/${book._id}`}>
        <img
          src={thumb || "/placeholder-book.jpg"}
          className="book-card-img h-52 bg-slate-200 object-cover"
          alt={title?.[1] || "Book"}
        />
      </Link>
      <div className="flex flex-1 flex-col bg-white p-3">
        <h4 className="truncate text-sm font-bold text-black group-hover:text-primary transition-colors">
          {title?.[language]?.length > 0 ? title[language] : "Not Available"}
        </h4>

        {showWriters ? (
          <p className="mt-1 truncate text-xs text-gray-600">
            {writerDetails?.length > 0
              ? writerDetails.map((item) => item?.name?.[language] || item?.name || "").join(", ")
              : "Not Available"}
          </p>
        ) : (
          <p className="text-sm text-gray-400">Writers Hidden</p>
        )}

        <div className="my-2 flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-gold text-gold" />
          ))}
        </div>

        {showPrice ? (
          <p className="text-sm font-black text-red">BDT {price} TK</p>
        ) : (
          <p className="text-sm text-gray-400">Price Hidden</p>
        )}

        {showStatus ? (
          <div className="mt-auto pt-3">
            {status === "upcoming" ? (
              <button className="w-full bg-slate-700 py-2 text-center text-xs font-semibold text-white">
                Upcoming
              </button>
            ) : stock === 0 ? (
              <button className="w-full bg-red py-2 text-center text-xs font-semibold text-white">
                Stock Out
              </button>
            ) : (
              <button
                onClick={() => handleAddtoCart(book)}
                className="flex w-full items-center justify-center gap-1 bg-primary py-2 text-center text-xs font-semibold text-white hover:bg-green-700 transition-colors active:scale-[0.98]"
              >
                <ShoppingCart className="h-3 w-3" /> Add to cart
              </button>
            )}
          </div>
        ) : (
          <button className="mt-auto bg-slate-700 py-2 text-center text-xs font-semibold text-white">
            Not Available
          </button>
        )}
      </div>
    </div>
  );
}
