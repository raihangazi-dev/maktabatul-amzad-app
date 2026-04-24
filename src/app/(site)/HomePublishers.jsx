"use client";
import Link from "next/link";
import HorizontalSlider from "@/app/components/HorizontalSlider";
import PublisherCard from "@/components/cards/PublisherCard";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePublishers({ publishers = [] }) {
  const { language } = useLanguage();
  return (
    <section className="mb-12">
      <div className="container p-2 md:p-5 bg-gray-100 rounded-sm box-shadow">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-medium">
            {language === 0 ? "পাবলিশার্স" : language === 2 ? "الناشرين" : "Publishers"}
          </h3>
          <Link href="/publishers" className="text-lg hover:text-primary hover:border-b border-primary">
            See All
          </Link>
        </div>
        <HorizontalSlider>
          {publishers.map((pub) => (
            <div key={pub._id} className="flex-none w-40">
              <PublisherCard publisher={pub} />
            </div>
          ))}
        </HorizontalSlider>
      </div>
    </section>
  );
}
