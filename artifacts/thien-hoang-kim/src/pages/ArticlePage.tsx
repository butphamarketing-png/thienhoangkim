import { Link, Redirect, useRoute } from "wouter";
import { Calendar } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { RelatedArticlesBlock } from "@/components/RelatedArticlesBlock";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/context/SiteContentContext";
import { ArticleBodyContent } from "@/components/ArticleBodyContent";
import { getPreferredArticlePath } from "@/data/services-catalog";
import { buildHeroImageAlt } from "@/lib/article-seo";
import { EAGER_IMG } from "@/lib/image-loading";
import { getRelatedArticles, matchClusterBySlug } from "@/lib/topic-clusters";
import NotFound from "@/pages/not-found";

export default function ArticlePage() {
  const { content } = useSiteContent();
  const [, params] = useRoute("/tin-tuc/:slug");
  const slug = params?.slug;

  const article = content.articles.find((a) => a.slug === slug && a.published);

  if (!article) {
    return <NotFound />;
  }

  const preferredPath = getPreferredArticlePath(slug!);
  if (preferredPath) {
    return <Redirect to={preferredPath} />;
  }

  const focusKeyphrase = article.seo?.focusKeyphrase ?? "";
  const heroAlt = buildHeroImageAlt(focusKeyphrase, article.title);
  const cluster = matchClusterBySlug(slug!);
  const { articles: related } = getRelatedArticles(content, slug!, 6);

  return (
    <SiteLayout>
      <article className="container mx-auto max-w-3xl px-4 py-10 md:px-8 md:py-14">
        <BreadcrumbNav
          crumbs={[
            { label: "Trang chủ", href: "/" },
            { label: "Tin tức", href: "/tin-tuc" },
            ...(cluster ? [{ label: cluster.label, href: `/tin-tuc/chu-de/${cluster.id}` }] : []),
            { label: article.title },
          ]}
          className="mb-6"
        />
        <p className="text-xs font-bold uppercase tracking-widest text-primary">{article.category}</p>
        <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-primary md:text-4xl">{article.title}</h1>
        <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 text-primary" />
          {article.date}
        </p>
        {article.image && (
          <img src={article.image} alt={heroAlt} className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover shadow-lg" {...EAGER_IMG} />
        )}
        <p className="mt-8 text-lg font-medium leading-relaxed text-foreground/90">{article.description}</p>
        <ArticleBodyContent body={article.body} imageAlt={heroAlt} />
        <RelatedArticlesBlock content={content} cluster={cluster} articles={related} />
        <div className="mt-12 flex flex-wrap gap-3">
          {cluster && (
            <Link href={cluster.pillar}>
              <Button type="button" variant="outline" className="rounded-full">
                {cluster.pillarLabel}
              </Button>
            </Link>
          )}
          <Link href="/lien-he#dat-lich">
            <Button className="rounded-full bg-primary font-bold">Đặt lịch tư vấn</Button>
          </Link>
          <Link href="/tin-tuc">
            <Button type="button" variant="outline" className="rounded-full">
              Xem bài viết khác
            </Button>
          </Link>
        </div>
      </article>
    </SiteLayout>
  );
}
