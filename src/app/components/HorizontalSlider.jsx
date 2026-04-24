"use client";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HorizontalSlider({ children, autoplay = false, slidesToShow = 6 }) {
  const plugins = autoplay ? [Autoplay({ delay: 2500 })] : [];
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    plugins
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {children}
        </div>
      </div>
      <button
        onClick={scrollPrev}
        className="absolute top-1/3 left-0 md:-left-4 h-16 w-7 bg-white shadow-xl flex justify-center items-center z-10"
      >
        <ChevronLeft className="text-black h-5 w-5" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute top-1/3 right-0 md:-right-4 h-16 w-7 bg-white shadow-xl flex justify-center items-center z-10"
      >
        <ChevronRight className="text-black h-5 w-5" />
      </button>
    </div>
  );
}
