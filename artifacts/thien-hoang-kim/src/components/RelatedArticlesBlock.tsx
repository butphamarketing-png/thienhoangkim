import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { articleHref, clusterHubPath, type TopicCluster } from "@/lib/topic-clusters";
import type { SiteArticle, SiteContent } from "@/types/site-content";

type RelatedArticlesBlockProps = {
  content: SiteContent;
  cluster?: TopicCluster;
  articles: SiteArticle[];
  title?: string;
};

export function RelatedArticlesBlock({
  content,
  cluster,
  articles,
  title = "Bài viết liên quan",
}: RelatedArticlesBlockProps) {
  if (!articles.length && !cluster) return null;

  return (
    <aside className="mt-12 rounded-2xl border border-border bg-muted/30 p-6 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="font-serif text-xl font-semibold text-primary md:text-2xl">{title}</h2>
        {cluster && (
          <Link
            href={clusterHubPath(cluster.id)}
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Xem tất cả — {cluster.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      {cluster && (
        <p className="mt-2 text-sm text-muted-foreground">
          Dịch vụ chính:{" "}
          <Link href={cluster.pillar} className="font-semibold text-primary hover:underline">
            {cluster.pillarLabel}
          </Link>
        </p>
      )}

      {articles.length > 0 && (
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {articles.map((a) => (
            <li key={a.id}>
              <Link
                href={articleHref(content, a.slug)}
                className="group flex items-start gap-2 rounded-lg px-2 py-2 text-sm transition hover:bg-white"
              >
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary opacity-60 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                <span className="font-medium text-foreground group-hover:text-primary">{a.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
