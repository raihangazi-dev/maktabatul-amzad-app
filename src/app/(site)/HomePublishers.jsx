"use client";

import Link from "next/link";
import HorizontalSlider from "@/app/components/HorizontalSlider";
import PublisherCard from "@/components/cards/PublisherCard";

export default function HomePublishers({ publishers = [] }) {
  return (
    <section className="mb-12">
      <div className="container section-panel">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="section-heading">Publishers</h3>
          <Link href="/publishers" className="text-sm font-semibold text-primary hover:text-red transition-colors">
            See All
          </Link>
        </div>
        <HorizontalSlider>
          {publishers.map((publisher) => (
            <div key={publisher._id} className="flex-none w-44">
              <PublisherCard publisher={publisher} />
            </div>
          ))}
        </HorizontalSlider>
      </div>
    </section>
  );
}
