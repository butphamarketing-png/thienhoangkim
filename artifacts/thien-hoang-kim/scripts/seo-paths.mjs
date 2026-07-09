/**
 * Danh sách URL công khai dùng chung cho sitemap + prerender SEO.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, "..");

export const STATIC_PATHS = [
  "/",
  "/gioi-thieu",
  "/dich-vu",
  "/tham-my",
  "/spa",
  "/khach-hang",
  "/bang-gia",
  "/tin-tuc",
  "/tin-tuc/kien-thuc",
  "/tin-tuc/tin-tuc",
  "/lien-he",
  "/gioi-thieu/doi-ngu-bac-si",
  "/gioi-thieu/cau-chuyen-thuong-hieu",
  "/gioi-thieu/cong-nghe-tham-my",
  "/gioi-thieu/co-so-vat-chat",
];

export const SERVICE_PATHS = [
  "/tham-my/nang-mui-hoang-kim",
  "/tham-my/cat-mi-phuong-hoang",
  "/tham-my/cay-toc-tu-than",
  "/tham-my/cang-noi-soi",
  "/tham-my/cang-chi-tre-hoa",
  "/tham-my/filler-tao-hinh",
  "/tham-my/botox-xoa-nhan-gon-ham",
  "/spa/u-da-muoi-himalaya",
  "/spa/phun-xam-tham-my",
  "/spa/massage-body-thu-gian",
  "/spa/massage-facial",
  "/spa/cham-soc-da-toan-dien",
];

const SERVICE_LINKED_SLUGS = new Set([
  "dich-vu-tham-my-y-khoa",
  "dich-vu-spa-cham-soc",
  "nang-mui-hoang-kim",
  "cat-mi-phuong-hoang",
  "cay-toc-tu-than",
  "cang-noi-soi",
  "cang-chi-tre-hoa",
  "filler-tao-hinh",
  "botox-xoa-nhan-gon-ham",
  "u-da-muoi-himalaya",
  "phun-xam-tham-my",
  "massage-body-thu-gian",
  "massage-facial",
  "cham-soc-da-toan-dien",
]);

function extractSlugsFromTs(text) {
  const slugs = new Set();
  for (const m of text.matchAll(/newsSeo\(\s*\n?\s*"([^"]+)"/g)) {
    slugs.add(m[1]);
  }
  for (const m of text.matchAll(/slug:\s*"([^"]+)"/g)) {
    slugs.add(m[1]);
  }
  return slugs;
}

function collectNewsSlugs() {
  const slugs = new Set();
  const dataDir = path.join(appRoot, "src/data");
  const defaultsPath = path.join(dataDir, "articles.defaults.ts");
  for (const s of extractSlugsFromTs(fs.readFileSync(defaultsPath, "utf8"))) {
    slugs.add(s);
  }
  for (const name of fs.readdirSync(dataDir)) {
    if (/^news-batch-.*\.entries\.ts$/.test(name)) {
      const filePath = path.join(dataDir, name);
      for (const s of extractSlugsFromTs(fs.readFileSync(filePath, "utf8"))) {
        slugs.add(s);
      }
    }
  }
  const mergedPath = path.join(dataDir, "keyword-plan.merged.json");
  if (fs.existsSync(mergedPath)) {
    const merged = JSON.parse(fs.readFileSync(mergedPath, "utf8"));
    for (const e of merged) {
      if (e.slug) slugs.add(e.slug);
    }
  }
  return [...slugs];
}

/** Tất cả path công khai cần sitemap + prerender */
export function buildSeoPaths() {
  const paths = new Set([...STATIC_PATHS, ...SERVICE_PATHS]);
  for (const slug of collectNewsSlugs()) {
    if (!SERVICE_LINKED_SLUGS.has(slug)) paths.add(`/tin-tuc/${slug}`);
  }
  return [...paths];
}
