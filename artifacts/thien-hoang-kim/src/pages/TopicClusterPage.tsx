import { Link, useRoute } from "wouter";
import { ArrowRight, Calendar } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { useSiteContent } from "@/context/SiteContentContext";
import {
  articleHref,
  getClusterArticles,
  getClusterById,
} from "@/lib/topic-clusters";
import { LAZY_IMG } from "@/lib/image-loading";
import NotFound from "@/pages/not-found";

export default function TopicClusterPage() {
  const { content } = useSiteContent();
  const [, params] = useRoute("/tin-tuc/chu-de/:clusterId");
  const clusterId = params?.clusterId ?? "";

  const cluster = getClusterById(clusterId);
  if (!cluster) return <NotFound />;

  const articles = getClusterArticles(content, cluster.id, { limit: 120 });

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Chủ đề làm đẹp"
        title={`${cluster.label} — Kiến thức & tư vấn`}
        description={`Tổng hợp ${articles.length}+ bài viết về ${cluster.label.toLowerCase()} tại Thiên Hoàng Kim An Đông TP.HCM — liên kết về dịch vụ chính và đặt lịch tư vấn miễn phí.`}
        crumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Tin tức", href: "/tin-tuc" },
          { label: cluster.label },
        ]}
      />

      <div className="container mx-auto px-4 py-10 md:px-8 md:py-14">
        <div className="mb-10 flex flex-wrap gap-3">
          <Link href={cluster.pillar}>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-sm transition hover:opacity-90">
              Dịch vụ: {cluster.pillarLabel}
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
          <Link href="/lien-he#dat-lich">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary px-5 py-2.5 text-sm font-bold text-primary transition hover:bg-primary/5">
              Đặt lịch tư vấn
            </span>
          </Link>
          <Link href="/bang-gia">
            <span className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted">
              Bảng giá tham khảo
            </span>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={articleHref(content, article.slug)}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  {...LAZY_IMG}
                />
                <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[10px] font-bold text-primary-foreground">
                  {article.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  {article.date}
                </p>
                <h2 className="mt-2 font-serif text-lg font-bold leading-snug text-primary group-hover:underline">
                  {article.title}
                </h2>
                <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">{article.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
