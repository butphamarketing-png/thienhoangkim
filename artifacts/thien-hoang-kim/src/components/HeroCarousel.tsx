import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDE_HEIGHT, HERO_SLIDE_WIDTH } from "@/config/hero-slideshow";

export type HeroSlide = {
  id: string;
  src: string;
  alt: string;
};

type HeroCarouselProps = {
  slides: HeroSlide[];
};

const AUTOPLAY_MS = 3000;

/** Banner hero slideshow — trượt ngang trái → phải mỗi 3 giây */
export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (count <= 1) return;
    const timer = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [count, next]);

  if (count === 0) return null;

  const showControls = count > 1;

  return (
    <section className="relative w-full overflow-hidden bg-white" aria-label="Banner slideshow">
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => {
            const isVideo = /\.(mp4|webm|mov|ogg)(\?|$)/i.test(slide.src);
            return (
              <div
                key={slide.id}
                className="relative w-full shrink-0 overflow-hidden bg-neutral-100"
                style={{ aspectRatio: `${HERO_SLIDE_WIDTH} / ${HERO_SLIDE_HEIGHT}` }}
              >
                {isVideo ? (
                  <video
                    src={slide.src}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    fetchPriority={i === 0 ? "high" : "low"}
                    draggable={false}
                  />
                )}
              </div>
            );
          })}
        </div>

        {showControls && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/95 text-primary shadow-md transition hover:bg-white md:left-6 md:h-11 md:w-11"
              aria-label="Slide trước"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/95 text-primary shadow-md transition hover:bg-white md:right-6 md:h-11 md:w-11"
              aria-label="Slide tiếp theo"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
            </button>

            <div
              className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 md:bottom-5"
              role="tablist"
              aria-label="Chọn slide"
            >
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all ${
                    i === index
                      ? "h-2.5 w-8 bg-primary"
                      : "h-2.5 w-2.5 bg-white shadow-sm ring-1 ring-primary/20 hover:bg-white/90"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                  aria-selected={i === index}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
