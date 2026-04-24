"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function PageTitle({ title }) {
  const { language } = useLanguage();
  return (
    <div className="border-b-2 border-primary pb-2 mb-5 mt-5">
      <h2 className="text-2xl font-bold text-primary">
        {Array.isArray(title) ? (title[language] || title[1]) : title}
      </h2>
    </div>
  );
}
