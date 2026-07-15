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
];

export function isBulkTemplateSlug(slug) {
  return slug.includes("-sk1k") || slug.endsWith("-goi-y");
}

function inferPillarFromSlug(slug) {
  const base = slug.replace(/-sk1k\d*$/, "").replace(/-goi-y$/, "").replace(/-sk\d*$/, "").replace(/-kw$/, "");
  for (const [re, canonicalPath] of SERVICE_PREFIX_CANONICAL) {
    if (re.test(base) || re.test(slug)) return canonicalPath;
  }
  return null;
}

function loadPlan() {
  const p = path.join(dataDir, "keyword-plan.merged.json");
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function isThinHeadEntry(entry) {
  if (HEAD_EXACT_CANONICAL[entry.slug]) return true;
  if (isBulkTemplateSlug(entry.slug)) return true;
  if (entry.source === "short-1000") return true;
  if (entry.intent === "head") return true;
  if (entry.wordCount === 1) return true;
  if ((entry.slug.endsWith("-sk") || entry.slug.endsWith("-kw")) && (entry.wordCount ?? 3) <= 2) {
    return true;
  }
  return false;
}

export function getThinCanonicalForSlug(slug, planBySlug) {
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
  return inferPillarFromSlug(slug);
}

export function buildThinCanonicalSet() {
  const plan = loadPlan();
  const excluded = new Set();
  const planBySlug = new Map(plan.map((e) => [e.slug, e]));
  for (const { slug } of plan) {
    if (getThinCanonicalForSlug(slug, planBySlug)) excluded.add(slug);
  }
  // Batch 12 goi-y có thể không nằm trong merged plan
  for (const name of fs.readdirSync(dataDir)) {
    if (!/^news-batch-.*\.entries\.ts$/.test(name)) continue;
    const text = fs.readFileSync(path.join(dataDir, name), "utf8");
    for (const m of text.matchAll(/slug:\s*"([^"]+)"/g)) {
      const slug = m[1];
      if (isBulkTemplateSlug(slug) || getThinCanonicalForSlug(slug, planBySlug)) {
        excluded.add(slug);
      }
    }
  }
  return excluded;
}
