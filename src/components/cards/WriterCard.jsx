"use client";
import Link from "next/link";
import { User } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function WriterCard({ writer }) {
  const { language } = useLanguage();
  return (
    <Link
      href={`/writers/${writer.writerId}`}
      className="group flex flex-col items-center justify-center border border-transparent bg-white p-4 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md transition-all duration-200"
    >
      <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden border-2 border-gray-200 bg-gray-50 group-hover:border-primary transition-colors">
        {writer.image ? (
          <img src={writer.image} className="h-full w-full object-cover" alt={writer.name?.[1]} />
        ) : (
          <User className="h-16 w-16 text-primary" />
        )}
      </div>
      <p className="mt-3 w-48 text-center text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors">
        {writer.name?.[language] || writer.name?.[1] || "Unknown"}
      </p>
    </Link>
  );
}
