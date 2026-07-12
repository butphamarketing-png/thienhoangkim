import mergedPlan from "@/data/keyword-plan.merged.json";
import type { KeywordPlanEntry } from "@/lib/generated-article-body";

/** Slug head-term mỏng → canonical dịch vụ pillar (tránh cạnh tranh /tin-tuc vs /tham-my) */
const HEAD_EXACT_CANONICAL: Record<string, string> = {
  "nang-mui": "/tham-my/nang-mui-hoang-kim",
  "nang-mui-sk": "/tham-my/nang-mui-hoang-kim",
  "mui-sk": "/tham-my/nang-mui-hoang-kim",
  filler: "/tham-my/filler-tao-hinh",
  "filler-sk": "/tham-my/filler-tao-hinh",
  "cat-mi": "/tham-my/cat-mi-phuong-hoang",
  "cat-mi-sk": "/tham-my/cat-mi-phuong-hoang",
  botox: "/tham-my/botox-xoa-nhan-gon-ham",
  "botox-sk": "/tham-my/botox-xoa-nhan-gon-ham",
  "cay-toc-sk": "/tham-my/cay-toc-tu-than",
  "phun-xam-sk": "/tham-my/phun-xam-tham-my",
  "spa-sk": "/spa/massage-body-thu-gian",
};

const SERVICE_PREFIX_CANONICAL: Array<[RegExp, string]> = [
  [/^(nang-mui|mui-)(-sk|-kw)?$/, "/tham-my/nang-mui-hoang-kim"],
  [/^filler(-sk|-kw)?$/, "/tham-my/filler-tao-hinh"],
  [/^(cat-mi|bam-mi|nhan-mi)(-sk|-kw)?$/, "/tham-my/cat-mi-phuong-hoang"],
  [/^botox(-sk|-kw)?$/, "/tham-my/botox-xoa-nhan-gon-ham"],
];

/** Bài local owned — ưu tiên sitemap & internal link */
export const PRIORITY_LOCAL_SLUGS = [
  "dia-chi-tham-my-quan-5-an-dong",
  "phong-kham-tham-my-an-dong",
  "nang-mui-quan-5-an-dong",
  "filler-quan-5-an-dong",
  "cat-mi-quan-5-an-dong",
  "chon-phong-kham-tham-my-an-toan",
] as const;

const planBySlug = new Map((mergedPlan as KeywordPlanEntry[]).map((e) => [e.slug, e]));

export function isThinHeadEntry(entry: KeywordPlanEntry): boolean {
  if (HEAD_EXACT_CANONICAL[entry.slug]) return true;
  if (entry.intent === "head") return true;
  if (entry.wordCount === 1) return true;
  if (
    (entry.slug.endsWith("-sk") || entry.slug.endsWith("-kw")) &&
    (entry.wordCount ?? 3) <= 2
  ) {
    return true;
  }
  return false;
}

export function isThinHeadSlug(slug: string): boolean {
  if (HEAD_EXACT_CANONICAL[slug]) return true;
  const entry = planBySlug.get(slug);
  return entry ? isThinHeadEntry(entry) : false;
}

function matchPrefixCanonical(slug: string): string | null {
  for (const [re, path] of SERVICE_PREFIX_CANONICAL) {
    if (re.test(slug)) return path;
  }
  return null;
}

/** Path canonical cho bài head mỏng — null nếu giữ index bình thường */
export function getThinArticleCanonicalPath(slug: string): string | null {
  if (HEAD_EXACT_CANONICAL[slug]) return HEAD_EXACT_CANONICAL[slug];

  const entry = planBySlug.get(slug);
  if (!entry || !isThinHeadEntry(entry)) return null;

  const pillar = entry.pillar?.trim();
  if (pillar?.startsWith("/tham-my/") || pillar?.startsWith("/spa/")) return pillar;

  return matchPrefixCanonical(slug);
}

export function shouldExcludeFromSitemap(slug: string): boolean {
  return getThinArticleCanonicalPath(slug) !== null;
}

export function isPriorityLocalSlug(slug: string): boolean {
  return (PRIORITY_LOCAL_SLUGS as readonly string[]).includes(slug);
}
