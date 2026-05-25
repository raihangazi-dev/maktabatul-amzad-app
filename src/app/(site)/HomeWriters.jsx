"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import WriterCard from "@/components/cards/WriterCard";

export default function HomeWriters({ writers = [] }) {
  return (
    <section className="bg-[#fbfcf8] py-12 md:py-14">
      <div className="container">
        <div className="mb-7 border-b border-gray-950/70 pb-5">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[0.28em] text-primary">
                Selected Voices
              </p>
              <h3 className="font-serif text-3xl leading-tight text-gray-950 md:text-4xl">
                Writers & Scholars
              </h3>
            </div>
            <Link
              href="/writers"
              className="hidden items-center gap-2 pb-1 text-xs font-black uppercase tracking-[0.22em] text-gray-950 transition-colors hover:text-primary sm:flex"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <Link
            href="/writers"
            className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-gray-950 transition-colors hover:text-primary sm:hidden"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {writers.slice(0, 8).map((writer) => (
            <WriterCard key={writer._id} writer={writer} />
          ))}
        </div>
      </div>
    </section>
  );
}
