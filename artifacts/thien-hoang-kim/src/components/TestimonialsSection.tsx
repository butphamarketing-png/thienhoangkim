import { useState, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/layout/SectionHeading";
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

function TestimonialCard({ testimonial, isActive, onClick }: { 
  testimonial: Testimonial; 
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isActive ? 1 : 0.6,
        scale: isActive ? 1 : 0.9,
        y: isActive ? 0 : 10,
      }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className={cn(
        "flex flex-col rounded-2xl border border-border/50 bg-white p-6 shadow-lg transition-all cursor-pointer hover:shadow-xl",
        isActive ? "shadow-xl ring-2 ring-[#c9a227]/30" : ""
      )}
    >
      <div className="mb-4 flex items-center gap-4">
        <Avatar className="h-14 w-14 ring-2 ring-[#c9a227]/20 ring-offset-2">
          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
          <AvatarFallback className="bg-gradient-to-br from-[#c9a227] to-[#e8d48b] text-white font-bold">
            {testimonial.initials}
          </AvatarFallback>
        </Avatar>
        <div className="text-left">
          <h4 className="text-lg font-bold text-foreground">{testimonial.name}</h4>
          <p className="text-sm text-muted-foreground">Khách hàng VIP</p>
          <div className="mt-1 text-amber-500">★★★★★</div>
        </div>
      </div>
      <p className="text-base leading-relaxed text-foreground/80 italic">
        &ldquo;{testimonial.text}&rdquo;
      </p>
    </motion.div>
  );
}

export function TestimonialsSection({ items, backgroundImage }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
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

        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full border-primary/20 bg-white text-primary hover:bg-primary hover:text-white shadow-lg"
            aria-label="Đánh giá trước"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div ref={trackRef} className="flex items-center justify-center">
            {/* Mobile: 1 item */}
            <div className="md:hidden w-full max-w-md">
              <TestimonialCard 
                testimonial={items[currentIndex]} 
                isActive={true} 
                onClick={() => {}} 
              />
            </div>

            {/* Desktop: 3 items */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8 w-full max-w-6xl">
              {visibleItems.map(({ item, index, offset }) => (
                <div
                  key={`${item.id}-${currentIndex}`}
                  className={cn(
                    "flex-shrink-0 transition-all duration-500",
                    offset === 0 ? "w-full md:w-[45%] lg:w-[40%]" : "w-0 md:w-[27.5%] lg:w-[30%] overflow-hidden"
                  )}
                >
                  <TestimonialCard
                    testimonial={item}
                    isActive={offset === 0}
                    onClick={() => goToSlide(index)}
                  />
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full border-primary/20 bg-white text-primary hover:bg-primary hover:text-white shadow-lg"
            aria-label="Đánh giá tiếp theo"
          >
            <ChevronRight className="h-5 w-5" />
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
                  ? "h-2.5 w-8 bg-[#c9a227]"
                  : "h-2 w-2 bg-gray-300 hover:bg-[#c9a227]/50"
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
