"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function PageTitle({ title }) {
  const { language } = useLanguage();
  return (
    <div className="mb-6 mt-6 border-b border-gray-200 pb-3">
      <h2 className="section-heading text-2xl">
        {Array.isArray(title) ? (title[language] || title[1]) : title}
      </h2>
    </div>
  );
}
