import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { ArticleBodyContent } from "@/components/ArticleBodyContent";
import { useSiteContent } from "@/context/SiteContentContext";
import { DEFAULT_HERO_IMAGE } from "@/data/pages.defaults";
import { SERVICE_CATEGORIES } from "@/data/services-catalog";
import { LAZY_IMG } from "@/lib/image-loading";
import {
  getServiceHref,
  resolveServiceCategories,
  resolveServiceItems,
} from "@/lib/site-cms";
import { TOPIC_CLUSTERS, clusterHubPath } from "@/lib/topic-clusters";
import type { ServiceCategoryId } from "@/types/site-content";

type ServiceCategoryPageProps = {
  categoryId: ServiceCategoryId;
};

const CATEGORY_CLUSTERS: Record<ServiceCategoryId, string[]> = {
  "tham-my": ["nang-mui", "cat-mi", "cay-toc", "tre-hoa", "filler", "botox"],
  spa: ["tri-da", "phun-xam", "spa"],
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

  const clusterLinks = CATEGORY_CLUSTERS[categoryId]
    .map((id) => TOPIC_CLUSTERS.find((c) => c.id === id))
    .filter(Boolean);

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
        <div id="noi-dung" className="container mx-auto max-w-3xl scroll-mt-24 px-4 pt-8 md:px-8">
          <p className="text-base leading-relaxed text-muted-foreground">{categoryArticle.description}</p>
          <ArticleBodyContent body={categoryArticle.body} imageAlt={categoryArticle.title} />
        </div>
      )}
      <div className="section-surface-alt container mx-auto px-4 py-12 md:px-8 md:py-16">
        <h2 className="mb-6 font-serif text-2xl font-semibold text-primary">Dịch vụ nổi bật</h2>
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

        {clusterLinks.length > 0 && (
          <div className="mt-14 rounded-2xl border border-border bg-white p-6 md:p-8">
            <h2 className="font-serif text-xl font-semibold text-primary md:text-2xl">
              Kiến thức theo chủ đề — {SERVICE_CATEGORIES[categoryId].eyebrow}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Cụm bài viết SEO theo dịch vụ, liên kết về trang pillar và đặt lịch tư vấn.
            </p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {clusterLinks.map((c) => (
                <li key={c!.id}>
                  <Link
                    href={clusterHubPath(c!.id)}
                    className="group flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
                  >
                    {c!.label}
                    <ArrowRight className="h-4 w-4 opacity-50 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
