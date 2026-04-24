"use client";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function PublisherCard({ publisher }) {
  const { language } = useLanguage();
  return (
    <Link
      href={`/publishers/${publisher.publisherId}`}
      className="flex flex-col items-center justify-center p-4 hover:-translate-y-1 transition-transform duration-200"
    >
      <div className="mx-auto h-28 w-28 rounded-full overflow-hidden flex justify-center items-center border-2 border-gray-200">
        {publisher.image ? (
          <img src={publisher.image} className="h-full w-full object-cover" alt={publisher.name?.[1]} />
        ) : (
          <BookOpen className="h-16 w-16 text-primary" />
        )}
      </div>
      <p className="text-sm font-medium mt-2 w-48 text-center line-clamp-2">
        {Array.isArray(publisher.name) ? (publisher.name[language] || publisher.name[1]) : publisher.name}
      </p>
    </Link>
  );
}
