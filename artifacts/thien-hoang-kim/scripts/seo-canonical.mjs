/**
 * Quy tắc canonical/noindex dùng chung cho sitemap build (mirror seo-canonical.ts).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "../src/data");

const HEAD_EXACT_CANONICAL = {
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

const SERVICE_PREFIX_CANONICAL = [
  [/^(nang-mui|mui-)(-sk|-kw)?$/, "/tham-my/nang-mui-hoang-kim"],
  [/^filler(-sk|-kw)?$/, "/tham-my/filler-tao-hinh"],
  [/^(cat-mi|bam-mi|nhan-mi)(-sk|-kw)?$/, "/tham-my/cat-mi-phuong-hoang"],
  [/^botox(-sk|-kw)?$/, "/tham-my/botox-xoa-nhan-gon-ham"],
];

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
];

function loadPlan() {
  const p = path.join(dataDir, "keyword-plan.merged.json");
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function isThinHeadEntry(entry) {
  if (HEAD_EXACT_CANONICAL[entry.slug]) return true;
  if (entry.intent === "head") return true;
  if (entry.wordCount === 1) return true;
  if ((entry.slug.endsWith("-sk") || entry.slug.endsWith("-kw")) && (entry.wordCount ?? 3) <= 2) {
    return true;
  }
  return false;
}

function matchPrefixCanonical(slug) {
  for (const [re, canonicalPath] of SERVICE_PREFIX_CANONICAL) {
    if (re.test(slug)) return canonicalPath;
  }
  return null;
}

export function getThinCanonicalForSlug(slug, planBySlug) {
  if (HEAD_EXACT_CANONICAL[slug]) return HEAD_EXACT_CANONICAL[slug];
  const entry = planBySlug.get(slug);
  if (!entry || !isThinHeadEntry(entry)) return null;
  const pillar = entry.pillar?.trim();
  if (pillar?.startsWith("/tham-my/") || pillar?.startsWith("/spa/")) return pillar;
  return matchPrefixCanonical(slug);
}

export function buildThinCanonicalSet() {
  const plan = loadPlan();
  const excluded = new Set();
  const planBySlug = new Map(plan.map((e) => [e.slug, e]));
  for (const { slug } of plan) {
    if (getThinCanonicalForSlug(slug, planBySlug)) excluded.add(slug);
  }
  return excluded;
}
