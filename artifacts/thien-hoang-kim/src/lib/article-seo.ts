import { containsKeyphrase } from "@/lib/seo-analysis";
import { getThinArticleCanonicalPath, isBulkTemplateSlug } from "@/lib/seo-canonical";
import { DEFAULT_ARTICLE_SEO } from "@/lib/seo";
import { buildMetaTitleFromSlug, slugToDisplayTitle } from "@/lib/slug";
import type { ArticleSeo } from "@/types/site-content";

/** Canonical path: resolve absolute URL via siteUrl at runtime */
export function newsArticleCanonicalPath(slug: string): string {
  return `/tin-tuc/${slug}`;
}

export function buildNewsArticleSeo(
  slug: string,
  metaDescription: string,
  focusKeyphrase: string,
  keywords?: string,
  ogImage = "",
): ArticleSeo {
  const displayTitle = slugToDisplayTitle(slug);
  const seo: ArticleSeo = {
    ...DEFAULT_ARTICLE_SEO,
    metaTitle: buildMetaTitleFromSlug(slug),
    metaDescription,
    focusKeyphrase,
    keywords: keywords ?? focusKeyphrase,
    canonicalUrl: newsArticleCanonicalPath(slug),
    ogTitle: displayTitle,
    ogDescription: metaDescription,
    ogImage,
  };
  return applyThinNewsSeo(slug, seo);
}

/** Noindex bài short template, canonical về pillar dịch vụ */
export function applyThinNewsSeo(slug: string, seo: ArticleSeo): ArticleSeo {
  const thinCanonical = getThinArticleCanonicalPath(slug);
  if (!thinCanonical && !isBulkTemplateSlug(slug)) return seo;
  const target = thinCanonical || "/tin-tuc/dia-chi-tham-my-quan-5-an-dong";
  return {
    ...seo,
    canonicalUrl: target,
    noindex: true,
    nofollow: false,
    robots: "noindex,follow",
  };
}


/** Alt ảnh đại diện — ưu tiên chứa focus keyphrase */
export function buildHeroImageAlt(focusKeyphrase: string, title: string): string {
  const kp = focusKeyphrase.trim();
  const t = title.trim();
  if (!kp) return t || "Thiên Hoàng Kim Aesthetic Clinic";
  if (t && containsKeyphrase(t, kp)) return t;
  if (t) return `${kp}: ${t}`;
  return kp;
}

export function extractH2FromBody(body: string): string[] {
  return body
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => line.slice(3).trim());
}

export function extractImageAltsFromBody(body: string): string[] {
  const alts: string[] = [];
  for (const m of body.matchAll(/!\[([^\]]*)\]\(/g)) {
    alts.push(m[1] ?? "");
  }
  return alts;
}

export function collectArticleImageAlts(body: string, heroImageAlt: string): string[] {
  return [heroImageAlt, ...extractImageAltsFromBody(body)].filter(Boolean);
}
