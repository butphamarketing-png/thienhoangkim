import mergedPlan from "@/data/keyword-plan.merged.json";
import {
  buildGeneratedArticleBody,
  buildGeneratedArticleTitle,
  buildGeneratedDescription,
  buildGeneratedMetaDescription,
  publishDateForIndex,
  type KeywordPlanEntry,
} from "@/lib/generated-article-body";
import { imageForKeywordPillar } from "@/lib/article-thumbnail";
import { buildNewsArticleSeo } from "@/lib/article-seo";
import { DEFAULT_ARTICLE_SEO } from "@/lib/seo";
import {
  getThinArticleCanonicalPath,
  isThinHeadEntry,
  PRIORITY_LOCAL_SLUGS,
} from "@/lib/seo-canonical";
import { MANUAL_OVERRIDE_SLUGS } from "@/data/manual-override-slugs";
import type { ArticleSeo, SiteArticle } from "@/types/site-content";

const publicAsset = (file: string) =>
  `${import.meta.env.BASE_URL}${file}`.replace(/([^:]\/)\/+/g, "$1");

const intro = publicAsset("gioithieu.1.png");
const thamMyImage = publicAsset("thẩm mỹ.png");
const spaImage = publicAsset("uploads/Spa.jpg");

function thumbnailForEntry(entry: KeywordPlanEntry): string {
  return imageForKeywordPillar(entry.pillar, thamMyImage, spaImage, intro);
}

function newsSeo(
  slug: string,
  metaDescription: string,
  focusKeyphrase: string,
  keywords?: string,
  ogImage = intro,
): ArticleSeo {
  return buildNewsArticleSeo(slug, metaDescription, focusKeyphrase, keywords, ogImage);
}

function article(
  id: string,
  slug: string,
  title: string,
  date: string,
  description: string,
  body: string,
  image = intro,
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

const REMOVED_ARTICLE_SLUGS = new Set(["hut-mo-cay-mo-ma", "hut-mo-ma"]);
const MANUAL_PRIORITY_SLUGS = new Set<string>(PRIORITY_LOCAL_SLUGS);

const entries = (mergedPlan as KeywordPlanEntry[]).filter(
  (entry) =>
    !REMOVED_ARTICLE_SLUGS.has(entry.slug) &&
    !MANUAL_PRIORITY_SLUGS.has(entry.slug) &&
    !MANUAL_OVERRIDE_SLUGS.has(entry.slug),
);

export const GENERATED_NEWS_ARTICLES: SiteArticle[] = entries.map((entry, index) => {
  const image = thumbnailForEntry(entry);
  const body = buildGeneratedArticleBody(entry, image, image);
  const title = buildGeneratedArticleTitle(entry);
  const secondary = `${entry.focus}, ${entry.focus} TP.HCM, Thiên Hoàng Kim, An Đông`;
  const thinCanonical = getThinArticleCanonicalPath(entry.slug);
  const seo = newsSeo(
    entry.slug,
    buildGeneratedMetaDescription(entry.focus, entry.slug),
    entry.focus.toLowerCase(),
    secondary,
    image,
  );
  if (thinCanonical) {
    seo.canonicalUrl = thinCanonical;
    seo.noindex = true;
    seo.robots = "noindex,follow";
  } else if (isThinHeadEntry(entry)) {
    seo.noindex = true;
    seo.robots = "noindex,follow";
  }

  return article(
    `gen-${String(index + 1).padStart(4, "0")}`,
    entry.slug,
    title,
    publishDateForIndex(index),
    buildGeneratedDescription(entry.focus, entry.slug),
    body,
    image,
    categoryForSlug(entry.slug),
    seo,
  );
});

export const GENERATED_NEWS_COUNT = GENERATED_NEWS_ARTICLES.length;
