"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Building2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePublishers({ publishers = [] }) {
  const { language } = useLanguage();
  const featured = publishers[0];
  const visiblePublishers = publishers.slice(1, 10);
  const featuredName = Array.isArray(featured?.name)
    ? featured.name[language] || featured.name[1] || featured.name[0]
    : featured?.name;
  const featuredInitial = featuredName?.trim()?.charAt(0) || "P";

  const publisherName = (publisher) =>
    Array.isArray(publisher?.name)
      ? publisher.name[language] || publisher.name[1] || publisher.name[0]
      : publisher?.name;

  return (
    <section className="bg-[#f7faf3] py-12 md:py-16">
      <div className="container">
        <div className="mb-7 border-b border-gray-950/70 pb-5">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[0.35em] text-red">
                Publisher Shelf
              </p>
              <h3 className="max-w-[19rem] break-words font-serif text-2xl leading-tight text-gray-950 sm:max-w-none sm:text-3xl md:text-4xl">
                Publishing Houses
              </h3>
            </div>
            <Link
              href="/publishers"
              className="hidden items-center gap-2 pb-1 text-xs font-black uppercase tracking-[0.28em] text-gray-950 transition-colors hover:text-primary sm:flex"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <Link
            href="/publishers"
            className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-gray-950 transition-colors hover:text-primary sm:hidden"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
          {featured && (
            <Link
              href={`/publishers/${featured.publisherId}`}
              className="group flex min-h-[430px] flex-col justify-between overflow-hidden border border-gray-950/70 bg-[#10281f] p-5 text-white transition-transform duration-200 hover:-translate-y-1 lg:min-h-full"
            >
              <div className="flex min-h-64 flex-1 items-center justify-center bg-white p-8">
                {featured.image ? (
                  <img src={featured.image} className="max-h-44 max-w-full object-contain" alt={featuredName} />
                ) : (
                  <div className="grid h-28 w-28 place-items-center border border-primary/30 bg-[#f7faf3] text-4xl font-black uppercase text-primary">
                    {featuredInitial}
                  </div>
                )}
              </div>
              <div className="pt-6">
                <p className="mb-3 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/60">
                  <Building2 className="h-3.5 w-3.5" /> Featured Publisher
                </p>
                <div className="flex items-end justify-between gap-4">
                  <h4 className="min-w-0 truncate whitespace-nowrap font-serif text-2xl leading-tight">
                    {featuredName || "Publisher"}
                  </h4>
                  <ArrowUpRight className="h-5 w-5 flex-none transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          )}

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visiblePublishers.map((publisher) => {
              const name = publisherName(publisher);
              const initial = name?.trim()?.charAt(0) || "P";

              return (
                <Link
                  key={publisher._id}
                  href={`/publishers/${publisher.publisherId}`}
                  className="group flex min-h-36 min-w-0 flex-col justify-between overflow-hidden border border-gray-950/40 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-primary"
                >
                  <div className="flex flex-1 items-center justify-center bg-[#fbfcf8] p-4">
                    {publisher.image ? (
                      <img src={publisher.image} className="max-h-16 max-w-full object-contain" alt={name} />
                    ) : (
                      <div className="grid h-16 w-16 place-items-center border border-primary/25 bg-white text-2xl font-black uppercase text-primary">
                        {initial}
                      </div>
                    )}
                  </div>
                  <div className="flex min-w-0 items-center justify-between gap-3 border-t border-gray-200 px-4 py-3">
                    <p className="min-w-0 truncate whitespace-nowrap text-sm font-black text-gray-950 transition-colors group-hover:text-primary">
                      {name || "Publisher"}
                    </p>
                    <ArrowUpRight className="h-4 w-4 flex-none text-gray-400 transition-colors group-hover:text-primary" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
