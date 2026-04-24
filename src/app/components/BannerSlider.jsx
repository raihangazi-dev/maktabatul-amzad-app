"use client";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function BannerSlider({ banners = [] }) {
  const { language } = useLanguage();
  const activeBanners = banners.filter((b) => b.isActive);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (activeBanners.length === 0) {
    return (
      <div className="relative flex min-h-[320px] items-center justify-center border border-gray-200 bg-white px-10 py-10 shadow-sm">
        <p className="text-sm font-medium text-gray-400">No active banners</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden border border-gray-200 bg-[linear-gradient(135deg,#ffffff_0%,#f0fdf4_55%,#fff5f5_100%)] px-8 py-8 shadow-sm md:px-12 lg:px-20">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {activeBanners.map((banner) => (
            <div key={banner._id} className="flex-none w-full">
              <div className="grid min-h-[280px] items-center gap-8 md:grid-cols-[1.4fr_0.8fr]">
                <div className="animate-slideUp">
                  <p className="mb-3 inline-flex bg-primary px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
                    Featured Collection
                  </p>
                  <h3 className="max-w-2xl text-2xl font-black leading-tight text-black line-clamp-2 md:text-4xl xl:text-5xl">
                    {banner.title?.[language] || banner.title?.[1] || ""}
                  </h3>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600 line-clamp-2 lg:text-lg">
                    {banner.text?.[language] || banner.text?.[1] || ""}
                  </p>
                </div>
                <div className="flex justify-center md:justify-end">
                  {banner.thumb && (
                    <img src={banner.thumb} className="max-h-[260px] w-auto object-contain drop-shadow-xl transition-transform duration-300 hover:scale-105" alt="" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeBanners.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/45 px-2 py-5 text-white hover:bg-red transition-colors"
          >
            <ChevronLeft className="text-white h-5 w-5" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/45 px-2 py-5 text-white hover:bg-red transition-colors"
          >
            <ChevronRight className="text-white h-5 w-5" />
          </button>
        </>
      )}
    </div>
  );
}
