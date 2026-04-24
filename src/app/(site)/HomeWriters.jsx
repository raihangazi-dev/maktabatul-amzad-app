"use client";

import Link from "next/link";
import HorizontalSlider from "@/app/components/HorizontalSlider";
import WriterCard from "@/components/cards/WriterCard";

export default function HomeWriters({ writers = [] }) {
  return (
    <section className="mb-12">
      <div className="container section-panel">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="section-heading">Writers</h3>
          <Link href="/writers" className="text-sm font-semibold text-primary hover:text-red transition-colors">
            See All
          </Link>
        </div>
        <HorizontalSlider>
          {writers.map((writer) => (
            <div key={writer._id} className="flex-none w-44">
              <WriterCard writer={writer} />
            </div>
          ))}
        </HorizontalSlider>
      </div>
    </section>
  );
}
