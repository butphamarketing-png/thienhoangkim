import mergedPlan from "@/data/keyword-plan.merged.json";
import {
  buildGeneratedArticleBody,
  buildGeneratedDescription,
  buildGeneratedMetaDescription,
  type KeywordPlanEntry,
} from "@/lib/generated-article-body";
import { buildNewsArticleSeo } from "@/lib/article-seo";
import { DEFAULT_ARTICLE_SEO } from "@/lib/seo";
import type { ArticleSeo, SiteArticle } from "@/types/site-content";

const publicAsset = (file: string) =>
  `${import.meta.env.BASE_URL}${file}`.replace(/([^:]\/)\/+/g, "$1");

const slide = publicAsset("slideshow.1.png");
const intro = publicAsset("gioithieu.1.png");

function newsSeo(
  slug: string,
  metaTitle: string,
  metaDescription: string,
  focusKeyphrase: string,
  keywords?: string,
  ogImage = slide,
): ArticleSeo {
  return buildNewsArticleSeo(slug, metaTitle, metaDescription, focusKeyphrase, keywords, ogImage);
}

function article(
  id: string,
  slug: string,
  title: string,
  date: string,
  description: string,
  body: string,
  image = slide,
  category = "Kiến thức",
  seo: ArticleSeo = { ...DEFAULT_ARTICLE_SEO },
): SiteArticle {
  return {
    id,
    slug,
    category,
    image,
    title,
    date,
    description,
    body,
    published: true,
    seo,
  };
}

const LOCAL_SLUG_RE =
  /tphcm|quan-|an-dong|hung-vuong|cho-lon|gan-day|phong-kham|clinic-|spa-an-dong|lam-dep-an-dong/;

function categoryForSlug(slug: string): string {
  if (LOCAL_SLUG_RE.test(slug)) return "Tin tức";
  if (/xu-huong|tin-tuc-tham-my|kien-thuc-tham-my/.test(slug)) return "Tin tức";
  return "Kiến thức";
}

const entries = mergedPlan as KeywordPlanEntry[];

export const GENERATED_NEWS_ARTICLES: SiteArticle[] = entries.map((entry, index) => {
  const focusTitle = entry.focus.charAt(0).toUpperCase() + entry.focus.slice(1);
  const title = entry.title ?? `${focusTitle} — Tư vấn tại Thiên Hoàng Kim`;
  const image = index % 2 === 0 ? slide : intro;
  const body = buildGeneratedArticleBody(entry, slide, intro);
  const secondary = `${entry.focus}, ${entry.focus} TP.HCM, Thiên Hoàng Kim, An Đông`;

  return article(
    `gen-${String(index + 1).padStart(4, "0")}`,
    entry.slug,
    title,
    "03/07/2026",
    buildGeneratedDescription(entry.focus),
    body,
    image,
    categoryForSlug(entry.slug),
    newsSeo(
      entry.slug,
      focusTitle,
      buildGeneratedMetaDescription(entry.focus),
      entry.focus.toLowerCase(),
      secondary,
      image,
    ),
  );
});

export const GENERATED_NEWS_COUNT = GENERATED_NEWS_ARTICLES.length;
