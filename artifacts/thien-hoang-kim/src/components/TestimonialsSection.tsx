import { useState, useCallback, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type Testimonial = {
  id: string;
  name: string;
  initials: string;
  avatar: string;
  text: string;
  phoneImage: string;
  viewAllLabel?: string;
};

type TestimonialsSectionProps = {
  items: Testimonial[];
  backgroundImage?: string;
};

function PhoneMockup({ testimonial, isActive, isSide }: { testimonial: Testimonial; isActive: boolean; isSide: boolean }) {
  return (
    <div className="relative">
      <div className={cn(
        "relative mx-auto transition-all duration-500",
        isActive ? "w-64 md:w-72 lg:w-80 z-20" : "w-48 md:w-56 lg:w-64 z-10"
      )}>
        <div className={cn(
          "relative z-10 overflow-hidden rounded-[2.5rem] border-[12px] border-[#1a1a1a] bg-[#1a1a1a] transition-all duration-500",
          isActive ? "shadow-[0_35px_90px_rgba(0,0,0,0.45)]" : "shadow-[0_15px_40px_rgba(0,0,0,0.25)]",
          isSide ? "opacity-60 scale-90" : ""
        )}>
          <div className="relative h-72 md:h-80 lg:h-96 w-full overflow-hidden rounded-[1.5rem] bg-[#f5f0e8]">
            <img 
              src={testimonial.phoneImage} 
              alt={testimonial.name} 
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="absolute inset-x-8 top-0 z-20 h-6 rounded-b-[1.25rem] bg-[#1a1a1a]" />
      </div>
    </div>
  );
}

export function TestimonialsSection({ items, backgroundImage }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (diff > swipeThreshold) {
      nextSlide();
    } else if (diff < -swipeThreshold) {
      prevSlide();
    }
  };

  const getVisibleItems = () => {
    const visible = [];
    for (let i = -1; i <= 1; i++) {
      let idx = (currentIndex + i + items.length) % items.length;
      visible.push({ item: items[idx], index: idx, offset: i });
    }
    return visible;
  };

  const visibleItems = getVisibleItems();

  return (
    <section 
      className="relative overflow-hidden bg-gradient-to-b from-[#e6f4f1] to-white py-20 md:py-24"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {backgroundImage && (
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
          <img src={backgroundImage} className="h-full w-full object-cover" alt="" />
        </div>
      )}

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <SectionHeading
          title="KHÁCH HÀNG NÓI GÌ VỀ THIÊN HOÀNG KIM"
          subtitle="Hơn 10.000 khách hàng đã tin tưởng và lựa chọn"
          className="mb-12 md:mb-16"
        />

        {/* Mobile: Single item carousel */}
        <div className="md:hidden relative">
          <div className="flex items-center justify-center overflow-hidden">
            <div 
              className="flex items-center gap-0 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                width: `${items.length * 100}%`
              }}
            >
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 flex flex-col items-center px-4"
                  style={{ width: "100%" }}
                >
                  <PhoneMockup testimonial={item} isActive={true} isSide={false} />
                  <div className="mt-6 text-center">
                    <p className="text-[11px] text-muted-foreground mb-1">Xem album khách hàng →</p>
                    <h4 className="text-lg font-semibold text-foreground">{item.name}</h4>
                    <p className="text-sm text-muted-foreground mt-2 max-w-[280px]">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: 3 items visible */}
        <div className="hidden md:block relative">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute left-2 lg:left-8 top-1/2 -translate-y-1/2 z-30 h-14 w-14 rounded-full border-[#c9a227]/30 bg-white shadow-xl hover:bg-[#c9a227] hover:text-white transition-all"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>

          <div className="flex items-center justify-center gap-4 lg:gap-8 relative min-h-[500px]">
            {visibleItems.map(({ item, index, offset }) => (
              <motion.div
                key={`${item.id}-${currentIndex}`}
                initial={{ opacity: 0, x: offset * 100 }}
                animate={{
                  opacity: offset === 0 ? 1 : 0.7,
                  x: offset * 80,
                  scale: offset === 0 ? 1 : 0.85,
                  zIndex: offset === 0 ? 20 : 10,
                }}
                transition={{ duration: 0.5, type: "spring" }}
                onClick={() => offset !== 0 && goToSlide(index)}
                className={cn(
                  "flex flex-col items-center cursor-pointer transition-all",
                  offset === 0 ? "pointer-events-none" : "pointer-events-auto"
                )}
              >
                <PhoneMockup 
                  testimonial={item} 
                  isActive={offset === 0} 
                  isSide={offset !== 0} 
                />
                <div className={cn(
                  "mt-6 text-center transition-all duration-500",
                  offset === 0 ? "opacity-100" : "opacity-60"
                )}>
                  <p className="text-[11px] text-muted-foreground mb-1">Xem album khách hàng →</p>
                  <h4 className={cn(
                    "font-semibold text-foreground",
                    offset === 0 ? "text-xl" : "text-base"
                  )}>{item.name}</h4>
                  <p className="text-sm text-muted-foreground mt-2 max-w-[240px]">
                    {offset === 0 ? item.text : ""}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute right-2 lg:right-8 top-1/2 -translate-y-1/2 z-30 h-14 w-14 rounded-full border-[#c9a227]/30 bg-white shadow-xl hover:bg-[#c9a227] hover:text-white transition-all"
          >
            <ArrowRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mt-10">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToSlide(i)}
              className={cn(
                "rounded-full transition-all duration-300",
                i === currentIndex
                  ? "h-3 w-10 bg-[#c9a227] shadow-md"
                  : "h-2.5 w-2.5 bg-gray-300 hover:bg-[#c9a227]/50"
              )}
              aria-label={`Đánh giá ${i + 1}`}
            />
          ))}
        </div>

        {/* Mobile hint */}
        <div className="text-center mt-4 text-xs text-muted-foreground md:hidden">
          ← Lướt trái hoặc phải để xem tiếp →
        </div>
      </div>
    </section>
  );
}
