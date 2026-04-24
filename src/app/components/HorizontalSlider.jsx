"use client";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HorizontalSlider({ children, autoplay = false }) {
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
        className="absolute left-0 top-1/3 z-10 flex h-14 w-8 items-center justify-center bg-white text-black shadow-xl hover:bg-primary hover:text-white md:-left-4 transition-colors"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-0 top-1/3 z-10 flex h-14 w-8 items-center justify-center bg-white text-black shadow-xl hover:bg-primary hover:text-white md:-right-4 transition-colors"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
