"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function PublisherCard({ publisher }) {
  const { language } = useLanguage();
  const name = Array.isArray(publisher.name)
    ? publisher.name[language] || publisher.name[1] || publisher.name[0]
    : publisher.name;
  const initial = name?.trim()?.charAt(0) || "P";

  return (
    <Link
      href={`/publishers/${publisher.publisherId}`}
      className="group flex min-w-0 flex-col overflow-hidden border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_34px_rgba(15,23,42,0.08)]"
    >
      <div className="flex h-32 items-center justify-center bg-[#f7faf3] p-5">
        {publisher.image ? (
          <img src={publisher.image} className="max-h-full max-w-full object-contain" alt={name} />
        ) : (
          <div className="grid h-20 w-20 place-items-center border border-primary/25 bg-white text-3xl font-black uppercase text-primary">
            {initial}
          </div>
        )}
      </div>
      <div className="flex min-w-0 items-center justify-between gap-3 border-t border-gray-200 p-4">
        <p className="min-w-0 truncate whitespace-nowrap text-sm font-black text-gray-950 transition-colors group-hover:text-primary">
          {name || "Publisher"}
        </p>
        <ArrowUpRight className="h-4 w-4 flex-none text-gray-400 transition-colors group-hover:text-primary" />
      </div>
    </Link>
  );
}
