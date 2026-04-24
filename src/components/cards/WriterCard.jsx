"use client";
import Link from "next/link";
import { User } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function WriterCard({ writer }) {
  const { language } = useLanguage();
  return (
    <Link
      href={`/writers/${writer.writerId}`}
      className="flex flex-col items-center justify-center p-4 hover:-translate-y-1 transition-transform duration-200"
    >
      <div className="mx-auto h-28 w-28 rounded-full overflow-hidden flex justify-center items-center border-2 border-gray-200">
        {writer.image ? (
          <img src={writer.image} className="h-full w-full object-cover" alt={writer.name?.[1]} />
        ) : (
          <User className="h-16 w-16 text-primary" />
        )}
      </div>
      <p className="text-sm font-medium mt-2 w-48 text-center line-clamp-2">
        {writer.name?.[language] || writer.name?.[1] || "Unknown"}
      </p>
    </Link>
  );
}
