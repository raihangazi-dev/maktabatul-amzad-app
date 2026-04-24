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
      <div className="border relative py-10 px-10 lg:px-20 flex items-center justify-center bg-gray-50 min-h-[300px]">
        <p className="text-gray-400">No active banners</p>
      </div>
    );
  }

  return (
    <div className="border relative py-5 px-10 lg:px-20">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {activeBanners.map((banner) => (
            <div key={banner._id} className="flex-none w-full">
              <div className="flex items-center justify-center gap-8">
                <div className="w-8/12">
                  <h3 className="text-lg md:text-xl lg:text-2xl xl:text-4xl font-bold line-clamp-2">
                    {banner.title?.[language] || banner.title?.[1] || ""}
                  </h3>
                  <p className="text-base lg:text-lg mt-2 mb-4 line-clamp-2 text-gray-600">
                    {banner.text?.[language] || banner.text?.[1] || ""}
                  </p>
                </div>
                <div className="w-4/12">
                  {banner.thumb && (
                    <img src={banner.thumb} className="w-full lg:w-9/12 xl:w-7/12 ml-auto" alt="" />
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
            className="absolute top-1/2 left-0 -translate-y-1/2 py-4 px-1 bg-gray-400 hover:bg-red"
          >
            <ChevronLeft className="text-white h-5 w-5" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute top-1/2 right-0 -translate-y-1/2 py-4 px-1 bg-gray-400 hover:bg-red"
          >
            <ChevronRight className="text-white h-5 w-5" />
          </button>
        </>
      )}
    </div>
  );
}
