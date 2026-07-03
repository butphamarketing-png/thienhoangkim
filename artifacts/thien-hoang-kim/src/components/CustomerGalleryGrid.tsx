import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { cn } from "@/lib/utils";

export type CustomerGalleryCase = {
  id: string;
  label: string;
  before: string;
  after: string;
};

type CustomerGalleryGridProps = {
  cases: CustomerGalleryCase[];
};

export function CustomerGalleryGrid({ cases }: CustomerGalleryGridProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = cases.find((c) => c.id === activeId) ?? null;

  useEffect(() => {
    if (!activeId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeId]);

  return (
    <>
      <section className="customer-results-bg relative scroll-mt-24 overflow-hidden border-t border-primary/[0.08] py-16 md:py-20">
        <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Thực tế"
            title="KHÁCH HÀNG THỰC TẾ"
            subtitle="Bấm vào hình đại diện để xem so sánh trước – sau từng dịch vụ."
            className="mb-10 md:mb-12"
          />

          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 md:gap-8">
            {cases.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                className="group flex flex-col items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2"
              >
                <div
                  className={cn(
                    "relative aspect-square w-full max-w-[220px] overflow-hidden rounded-full",
                    "ring-2 ring-primary/10 transition duration-300",
                    "group-hover:ring-gold/50 group-hover:shadow-[0_16px_40px_-12px_rgba(15,48,36,0.25)]",
                  )}
                >
                  <img
                    src={item.after}
                    alt={item.label}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/55 via-transparent to-transparent pb-3 opacity-0 transition group-hover:opacity-100">
                    <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
                      Xem trước – sau
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-center font-serif text-base font-semibold text-primary md:text-lg">
                  {item.label}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Kết quả ${active.label}`}
          onClick={() => setActiveId(null)}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveId(null)}
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
              aria-label="Đóng"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="aspect-[3/4] w-full sm:aspect-[4/5]">
              <BeforeAfterSlider beforeSrc={active.before} afterSrc={active.after} />
            </div>

            <div className="border-t border-primary/10 px-5 py-4 text-center">
              <p className="font-serif text-lg font-semibold text-primary">{active.label}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                Trượt ngang để so sánh trước – sau
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
