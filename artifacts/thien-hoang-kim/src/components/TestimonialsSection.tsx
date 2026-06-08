import { useState, useCallback, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
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

function PhoneMockup({ testimonial, isActive }: { testimonial: Testimonial; isActive: boolean }) {
  return (
    <div className="relative">
      <div className={cn(
        "relative mx-auto transition-all duration-500",
        isActive ? "w-72 md:w-80 lg:w-96" : "w-52 md:w-60 lg:w-64 opacity-50"
      )}>
        <div className={cn(
          "relative z-10 overflow-hidden rounded-[2.5rem] border-[12px] border-[#1a1a1a] bg-[#1a1a1a] transition-all duration-500",
          isActive ? "shadow-[0_30px_80px_rgba(0,0,0,0.4)]" : "shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
        )}>
          <div className="relative h-80 md:h-96 lg:h-[420px] w-full overflow-hidden rounded-[1.5rem] bg-[#f5f0e8]">
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
  const containerRef = useRef<HTMLDivElement>(null);
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

  return (
    <section 
      className="relative overflow-hidden bg-gradient-to-b from-[#e6f4f1] to-white py-20 md:py-24"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      ref={containerRef}
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

        <div className="relative">
          {/* Desktop arrows */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full border-[#c9a227]/30 bg-white shadow-lg hover:bg-[#c9a227] hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="flex items-center justify-center overflow-hidden">
            <div 
              className="flex items-center gap-4 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                width: `${items.length * 100}%`
              }}
            >
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: index === currentIndex ? 1 : 0.4,
                    scale: index === currentIndex ? 1 : 0.75,
                    x: index === currentIndex ? 0 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "flex-shrink-0 flex flex-col items-center cursor-pointer transition-all px-2 md:px-4",
                    index === currentIndex ? "z-10" : "z-0"
                  )}
                  style={{ width: "100%" }}
                >
                  <PhoneMockup testimonial={item} isActive={index === currentIndex} />
                  <div className={cn(
                    "mt-6 text-center transition-all duration-500",
                    index === currentIndex ? "opacity-100" : "opacity-0 md:opacity-50"
                  )}>
                    <p className="text-[11px] text-muted-foreground mb-1">Xem album khách hàng →</p>
                    <h4 className="text-lg md:text-xl font-semibold text-foreground">{item.name}</h4>
                    <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-[280px]">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full border-[#c9a227]/30 bg-white shadow-lg hover:bg-[#c9a227] hover:text-white"
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile navigation dots */}
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
