"use client";
import Link from "next/link";
import HorizontalSlider from "@/app/components/HorizontalSlider";
import WriterCard from "@/components/cards/WriterCard";
import { useLanguage } from "@/context/LanguageContext";

export default function HomeWriters({ writers = [] }) {
  const { language } = useLanguage();
  return (
    <section className="mb-12">
      <div className="container p-2 md:p-5 box-shadow rounded-sm bg-gray-100">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-medium">
            {language === 0 ? "লেখক" : language === 2 ? "الكاتب" : "Writers"}
          </h3>
          <Link href="/writers" className="text-lg hover:text-primary hover:border-b border-primary">
            See All
          </Link>
        </div>
        <HorizontalSlider>
          {writers.map((writer) => (
            <div key={writer._id} className="flex-none w-40">
              <WriterCard writer={writer} />
            </div>
          ))}
        </HorizontalSlider>
      </div>
    </section>
  );
}
