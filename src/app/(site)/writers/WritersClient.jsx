"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import WriterCard from "@/components/cards/WriterCard";
import PageTitle from "@/app/components/PageTitle";
import { useLanguage } from "@/context/LanguageContext";

export default function WritersClient({ writers = [] }) {
  const { language } = useLanguage();
  const [search, setSearch] = useState("");

  const filtered = writers.filter((w) => {
    const name = Array.isArray(w.name) ? w.name.join(" ") : w.name || "";
    return name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <section className="container">
      <PageTitle title={["সকল লেখক", "All Writers", "جميع الكتاب"]} />

      <div className="flex items-center gap-2 mb-6 border border-gray-300 px-3 py-2 w-full md:w-80">
        <Search className="h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search writers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 focus:outline-none text-sm"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((writer) => (
          <WriterCard key={writer._id} writer={writer} />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full mt-10 text-gray-500">No writers found</p>
        )}
      </div>
    </section>
  );
}
