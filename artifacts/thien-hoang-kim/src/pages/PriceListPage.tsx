import { Link } from "wouter";
import { ArrowRight, Phone } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import { buildServicePriceGroups } from "@/data/service-pricing";
import { CLINIC_PHONE_DISPLAY, TEL_URL, ZALO_URL } from "@/config/contact";
import { cn } from "@/lib/utils";

function ZaloIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} aria-hidden>
      <rect width="24" height="24" rx="6" fill="currentColor" />
      <path
        fill="#fff"
        d="M6.5 8.2c0-.66.54-1.2 1.2-1.2h8.6c.66 0 1.2.54 1.2 1.2v4.1c0 .66-.54 1.2-1.2 1.2H11.2l-2.4 1.7c-.25.18-.6 0-.38-.3l.65-1.4H7.7c-.66 0-1.2-.54-1.2-1.2V8.2z"
      />
    </svg>
  );
}

const groups = buildServicePriceGroups();

export default function PriceListPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Bảng giá"
        title="Bảng giá tham khảo"
        description="Danh sách dịch vụ Thiên Hoàng Kim. Liên hệ hotline hoặc Zalo để được báo giá chi tiết theo phác đồ cá nhân."
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Bảng giá" }]}
      />

      <section className="border-t border-primary/[0.08] bg-gradient-to-b from-white to-primary/[0.03] py-12 md:py-16">
        <div className="container mx-auto space-y-12 px-4 md:px-8">
          {groups.map((group) => (
            <div key={group.categoryId}>
              <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-primary/10 pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{group.eyebrow}</p>
                  <h2 className="mt-1 font-serif text-2xl font-semibold text-primary md:text-3xl">{group.title}</h2>
                </div>
                <Link
                  href={group.categoryId === "tham-my" ? "/tham-my" : "/spa"}
                  className="text-sm font-medium text-primary/70 transition hover:text-primary"
                >
                  Xem tất cả dịch vụ →
                </Link>
              </div>

              <div className="space-y-3">
                {group.items.map((item) => (
                  <article
                    key={item.slug}
                    className="luxury-card group flex flex-col gap-4 rounded-2xl border border-primary/[0.08] bg-white p-4 shadow-[0_8px_32px_-12px_rgba(15,48,36,0.1)] transition hover:border-gold/30 hover:shadow-[0_12px_40px_-12px_rgba(15,48,36,0.16)] sm:flex-row sm:items-center sm:justify-between sm:p-5"
                  >
                    <div className="min-w-0 flex-1">
                      <Link href={item.href}>
                        <h3 className="font-serif text-lg font-semibold text-primary transition group-hover:text-primary/90 md:text-xl">
                          {item.label}
                        </h3>
                      </Link>
                      {item.description && (
                        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div className="flex shrink-0 flex-wrap gap-2 sm:flex-col sm:items-stretch lg:flex-row">
                      <Button
                        asChild
                        size="sm"
                        className="h-10 rounded-full bg-primary px-4 font-semibold hover:bg-primary/90"
                      >
                        <a href={TEL_URL}>
                          <Phone className="mr-1.5 h-4 w-4" />
                          Hotline
                        </a>
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="h-10 rounded-full border-[#0068ff]/40 px-4 font-semibold text-[#0068ff] hover:bg-[#0068ff]/5"
                      >
                        <a href={ZALO_URL} target="_blank" rel="noopener noreferrer">
                          <ZaloIcon className="mr-1.5" />
                          Zalo
                        </a>
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}

          <div className="rounded-2xl border border-gold/25 bg-gradient-to-br from-primary/[0.04] to-gold/[0.08] p-6 text-center md:p-8">
            <p className="text-sm text-muted-foreground md:text-base">
              Bác sĩ sẽ báo giá chi tiết sau khi thăm khám và lên phác đồ cá nhân.
            </p>
            <p className="mt-2 font-semibold text-primary">Hotline tư vấn miễn phí: {CLINIC_PHONE_DISPLAY}</p>
            <Link href="/lien-he#dat-lich">
              <Button className="mt-5 rounded-full bg-primary px-8 font-bold">
                Đặt lịch tư vấn miễn phí
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
