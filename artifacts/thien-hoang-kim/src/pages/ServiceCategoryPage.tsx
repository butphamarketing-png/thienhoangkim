import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { useSiteContent } from "@/context/SiteContentContext";
import { DEFAULT_HERO_IMAGE } from "@/data/pages.defaults";
import { SERVICE_CATEGORIES } from "@/data/services-catalog";
import { LAZY_IMG } from "@/lib/image-loading";
import {
  getServiceHref,
  resolveServiceCategories,
  resolveServiceItems,
} from "@/lib/site-cms";
import type { ServiceCategoryId } from "@/types/site-content";

type ServiceCategoryPageProps = {
  categoryId: ServiceCategoryId;
};

export default function ServiceCategoryPage({ categoryId }: ServiceCategoryPageProps) {
  const { content } = useSiteContent();
  const categories = resolveServiceCategories(content);
  const category = categories[categoryId];
  if (!category) return null;

  const items = resolveServiceItems(content, categoryId);
  const categoryArticle = category.articleSlug
    ? content.articles.find((a) => a.slug === category.articleSlug && a.published)
    : undefined;

  return (
    <SiteLayout>
      <PageHero
        eyebrow={category.eyebrow}
        title={category.title}
        description={category.description}
        crumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Dịch vụ", href: "/dich-vu" },
          { label: category.title },
        ]}
      />
      {categoryArticle && (
        <div className="container mx-auto max-w-3xl px-4 pt-8 md:px-8">
          <p className="text-base leading-relaxed text-muted-foreground">{categoryArticle.description}</p>
          <Link
            href={SERVICE_CATEGORIES[categoryId].path}
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Đọc thêm về {category.eyebrow}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
      <div className="section-surface-alt container mx-auto px-4 py-12 md:px-8 md:py-16">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-5 lg:gap-6">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={getServiceHref(categoryId, item.slug, content)}
              className="service-card-luxury group block"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-primary/5">
                <img
                  src={item.image || DEFAULT_HERO_IMAGE}
                  alt={item.label}
                  className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                  {...LAZY_IMG}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a261c]/80 via-[#0a261c]/10 to-transparent" />
              </div>
              <div className="bg-gradient-to-r from-primary to-[#124830] px-3 py-3.5 text-center sm:px-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white sm:text-xs md:text-sm">
                  {item.label}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
