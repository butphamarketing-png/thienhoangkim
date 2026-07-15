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
  [/^(nang-mui|mui-|sua-mui|song-mui|dau-mui|thu-gon)/, "/tham-my/nang-mui-hoang-kim"],
  [/^(filler|tiem-moi|tiem-cam|baby-face|cay-mo)/, "/tham-my/filler-tao-hinh"],
  [/^(cat-mi|bam-mi|nhan-mi|mat-|sup-mi|lay-mo)/, "/tham-my/cat-mi-phuong-hoang"],
  [/^(botox|xoa-nhan|gon-ham|thon-ham|vline)/, "/tham-my/botox-xoa-nhan-gon-ham"],
  [/^(cay-toc|hoi-|rung-toc|fue)/, "/tham-my/cay-toc-tu-than"],
  [/^(cang-chi|cang-noi|cang-da|tre-hoa|hifu|thermage|ultherapy|nang-co|rf-)/, "/tham-my/cang-chi-tre-hoa"],
  [/^(phun-|xam-|dieu-khac-may)/, "/spa/phun-xam-tham-my"],
  [/^(tri-mun|tri-nam|peel|laser|facial|cham-soc-da|da-|meso|lo-chan)/, "/spa/cham-soc-da-toan-dien"],
  [/^(massage|spa-|u-da|u-muoi|himalaya|detox)/, "/spa/massage-body-thu-gian"],
  [/^(gia-|chi-phi|bang-gia|bao-gia|uu-dai)/, "/bang-gia"],
];

/** Bài local / cạnh tranh chất lượng: ưu tiên sitemap & internal link */
export const PRIORITY_LOCAL_SLUGS = [
  "dia-chi-tham-my-quan-5-an-dong",
  "phong-kham-tham-my-an-dong",
  "nang-mui-quan-5-an-dong",
  "filler-quan-5-an-dong",
  "cat-mi-quan-5-an-dong",
  "chon-phong-kham-tham-my-an-toan",
  "top-phong-kham-quan-5",
  "tham-my-quan-5",
  "nang-mui-tphcm",
  "filler-tphcm",
  "phong-kham-tham-my-quan-5",
  "chi-phi-nang-mui-quan-5",
  "dich-vu-tham-my-an-dong",
  "nang-mui-lan-dau-dung-chon-dang-trend",
  "nang-mui-cau-truc-hay-filler-song-mui",
  "mui-lo-song-tut-sun-bao-gio-can-sua",
  "sau-nang-mui-kieng-gi-14-ngay",
  "nang-mui-an-dong-quan-5-hoi-bac-si-gi",
  "gia-nang-mui-re-bat-ngo-an-phi-gi",
  "cat-mi-phuong-hoang-hay-bam-mi",
  "sup-mi-nhe-co-can-cat-khong",
  "sung-sau-cat-mi-ngay-1-den-7",
  "cat-mi-quan-5-do-ty-le-mat",
  "mat-hong-sau-tham-my-dau-hieu-chinh-sua",
  "filler-moi-tu-nhien-khong-mo-vit",
  "botox-gon-ham-bao-lau-lo-net",
  "filler-va-botox-khac-nhau-60-giay",
  "cang-chi-tre-hoa-hop-khi-nao",
  "hifu-chi-hay-filler-combo-tre-hoa",
  "da-xin-lo-chan-long-to-1-buoi-cham-soc",
  "phun-xam-may-tu-nhien-2026",
  "dia-chi-tham-my-quan-5-checklist-7-tieu-chi",
  "massage-facial-hay-peel-truoc-su-kien",
] as const;

const planBySlug = new Map((mergedPlan as KeywordPlanEntry[]).map((e) => [e.slug, e]));

/** Bài short template hàng loạt: noindex + khỏi sitemap, tránh làm loãng site */
export function isBulkTemplateSlug(slug: string): boolean {
  return slug.includes("-sk1k") || slug.endsWith("-goi-y");
}

function inferPillarFromSlug(slug: string): string | null {
  const base = slug.replace(/-sk1k\d*$/, "").replace(/-goi-y$/, "").replace(/-sk\d*$/, "").replace(/-kw$/, "");
  for (const [re, path] of SERVICE_PREFIX_CANONICAL) {
    if (re.test(base) || re.test(slug)) return path;
  }
  return null;
}

export function isThinHeadEntry(entry: KeywordPlanEntry): boolean {
  if (HEAD_EXACT_CANONICAL[entry.slug]) return true;
  if (isBulkTemplateSlug(entry.slug)) return true;
  if (entry.source === "short-1000") return true;
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
  if (isBulkTemplateSlug(slug)) return true;
  const entry = planBySlug.get(slug);
  return entry ? isThinHeadEntry(entry) : false;
}

function matchPrefixCanonical(slug: string): string | null {
  return inferPillarFromSlug(slug);
}

/** Path canonical cho bài head mỏng: null nếu giữ index bình thường */
export function getThinArticleCanonicalPath(slug: string): string | null {
  if (HEAD_EXACT_CANONICAL[slug]) return HEAD_EXACT_CANONICAL[slug];

  if (isBulkTemplateSlug(slug)) {
    const entry = planBySlug.get(slug);
    const pillar = entry?.pillar?.trim();
    if (pillar?.startsWith("/tham-my/") || pillar?.startsWith("/spa/") || pillar === "/bang-gia" || pillar === "/lien-he") {
      return pillar;
    }
    return inferPillarFromSlug(slug) || "/tin-tuc/dia-chi-tham-my-quan-5-an-dong";
  }

  const entry = planBySlug.get(slug);
  if (!entry || !isThinHeadEntry(entry)) return null;

  const pillar = entry.pillar?.trim();
  if (pillar?.startsWith("/tham-my/") || pillar?.startsWith("/spa/")) return pillar;
  if (pillar === "/bang-gia" || pillar === "/lien-he") return pillar;

  return matchPrefixCanonical(slug);
}

export function shouldExcludeFromSitemap(slug: string): boolean {
  return getThinArticleCanonicalPath(slug) !== null || isBulkTemplateSlug(slug);
}

export function isPriorityLocalSlug(slug: string): boolean {
  return (PRIORITY_LOCAL_SLUGS as readonly string[]).includes(slug);
}

export function isIndexableNewsSlug(slug: string): boolean {
  return !shouldExcludeFromSitemap(slug);
}
