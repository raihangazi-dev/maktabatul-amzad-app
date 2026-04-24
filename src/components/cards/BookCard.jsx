"use client";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

export default function BookCard({ book }) {
  const { handleAddtoCart } = useCart();
  const { language } = useLanguage();
  const { title, thumb, price, writerDetails, status, stock, showWriters, showPrice, showStatus } = book;

  return (
    <div className="book-card w-40 h-[320px] overflow-hidden duration-300 m-2">
      <Link href={`/books/${book._id}`}>
        <img
          src={thumb || "/placeholder-book.jpg"}
          className="h-40 md:h-56 bg-slate-200 mb-1.5 duration-300 mx-auto object-cover w-full"
          alt={title?.[1] || "Book"}
        />
      </Link>
      <div className="bg-white">
        <h4 className="text-base text-black truncate">
          {title?.[language]?.length > 0 ? title[language] : "Not Available"}
        </h4>

        {showWriters ? (
          <p className="truncate text-sm text-gray-600">
            {writerDetails?.length > 0
              ? writerDetails.map((item) => item?.name?.[language] || item?.name || "").join(", ")
              : "Not Available"}
          </p>
        ) : (
          <p className="text-sm text-gray-400">Writers Hidden</p>
        )}

        <div className="flex my-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3 w-3 text-gray-300" />
          ))}
        </div>

        {showPrice ? (
          <p className="text-sm text-red font-medium">BDT {price} TK</p>
        ) : (
          <p className="text-sm text-gray-400">Price Hidden</p>
        )}

        {showStatus ? (
          <div>
            {status === "upcoming" ? (
              <button className="bg-slate-700 text-xs text-white font-semibold w-full text-center py-2">
                Upcoming
              </button>
            ) : stock === 0 ? (
              <button className="bg-red text-xs text-white font-semibold w-full text-center py-2">
                Stock Out
              </button>
            ) : (
              <button
                onClick={() => handleAddtoCart(book)}
                className="bg-primary text-xs text-white font-semibold w-full text-center py-2 flex items-center justify-center gap-1 hover:bg-green-700 transition-colors"
              >
                <ShoppingCart className="h-3 w-3" /> Add to cart
              </button>
            )}
          </div>
        ) : (
          <button className="bg-slate-700 text-xs text-white font-semibold w-full text-center py-2">
            Not Available
          </button>
        )}
      </div>
    </div>
  );
}
