"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function WriterCard({ writer }) {
  const { language } = useLanguage();
  const n = writer.name;
  const d = writer.desc;
  const name = Array.isArray(n) ? (n[language] || n[1] || n.find(s => s && s.trim()) || "Unknown") : (n || "Unknown");
  const desc = Array.isArray(d) ? (d[language] || d[1] || d.find(s => s && s.trim()) || "") : (d || "");
  const initial = name?.trim()?.charAt(0)?.toUpperCase() || "A";

  return (
    <Link
      href={`/writers/${writer.writerId}`}
      className="group flex min-w-0 flex-col overflow-hidden border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_34px_rgba(15,23,42,0.08)]"
    >
      {/* Portrait image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#eff5ed]">
        {writer.image ? (
          <img
            src={writer.image}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            alt={name}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_35%_20%,rgba(255,255,255,0.25),transparent_50%),linear-gradient(135deg,#1a4d2e,#0d2b18)]">
            <span className="font-serif text-6xl font-black text-white/80">{initial}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h4 className="truncate whitespace-nowrap font-serif text-lg leading-tight text-gray-950 transition-colors group-hover:text-primary">
          {name}
        </h4>
        {desc && (
          <p className="mt-2 line-clamp-3 text-sm leading-5 text-gray-500">
            {desc}
          </p>
        )}
        <span className="mt-4 inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.18em] text-gray-900 transition-colors group-hover:text-primary">
          Profile <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
