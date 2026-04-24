"use client";
import Link from "next/link";
import HorizontalSlider from "@/app/components/HorizontalSlider";
import BookCard from "@/components/cards/BookCard";
import { useLanguage } from "@/context/LanguageContext";

export default function HomeBestSeller({ books = [] }) {
  const { language } = useLanguage();
  const bestSellers = [...books].sort((a, b) => (b.sold || 0) - (a.sold || 0)).slice(0, 12);

  return (
    <section className="mb-12">
      <div className="container p-5 bg-gray-100 relative box-shadow">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-medium">
            {language === 0 ? "বেস্ট সেলার" : language === 2 ? "الأكثر مبيعا" : "Best Sellers"}
          </h3>
          <Link href="/books" className="text-lg hover:text-primary">See All</Link>
        </div>
        <HorizontalSlider>
          {bestSellers.map((book) => (
            <div key={book._id} className="flex-none w-40">
              <BookCard book={book} />
            </div>
          ))}
        </HorizontalSlider>
      </div>
    </section>
  );
}
