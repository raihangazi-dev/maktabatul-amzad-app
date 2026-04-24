"use client";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function PublisherCard({ publisher }) {
  const { language } = useLanguage();
  return (
    <Link
      href={`/publishers/${publisher.publisherId}`}
      className="group flex flex-col items-center justify-center border border-transparent bg-white p-4 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md transition-all duration-200"
    >
      <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden border-2 border-gray-200 bg-gray-50 group-hover:border-primary transition-colors">
        {publisher.image ? (
          <img src={publisher.image} className="h-full w-full object-cover" alt={publisher.name?.[1]} />
        ) : (
          <BookOpen className="h-16 w-16 text-primary" />
        )}
      </div>
      <p className="mt-3 w-48 text-center text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors">
        {Array.isArray(publisher.name) ? (publisher.name[language] || publisher.name[1]) : publisher.name}
      </p>
    </Link>
  );
}
