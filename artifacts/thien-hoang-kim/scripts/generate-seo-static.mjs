/**
 * Sinh robots.txt + sitemap.xml vào public/ trước khi Vite build.
 * Tránh phụ thuộc Vercel serverless (đang lỗi FUNCTION_INVOCATION_FAILED).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, "..");
const publicDir = path.join(appRoot, "public");

const BASE_URL = (process.env.SITE_URL ?? "https://thienhoangkim.vercel.app").replace(/\/$/, "");

const STATIC_PATHS = [
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

const SERVICE_PATHS = [
  "/tham-my/nang-mui-hoang-kim",
  "/tham-my/cat-mi-phuong-hoang",
  "/tham-my/cay-toc-tu-than",
  "/tham-my/cang-noi-soi",
  "/tham-my/cang-chi-tre-hoa",
  "/tham-my/hut-mo-cay-mo-ma",
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
  "hut-mo-cay-mo-ma",
  "filler-tao-hinh",
  "botox-xoa-nhan-gon-ham",
  "u-da-muoi-himalaya",
  "phun-xam-tham-my",
  "massage-body-thu-gian",
  "massage-facial",
  "cham-soc-da-toan-dien",
]);

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function collectNewsSlugs() {
  const defaultsPath = path.join(appRoot, "src/data/articles.defaults.ts");
  const text = fs.readFileSync(defaultsPath, "utf8");
  const slugs = [];
  for (const m of text.matchAll(/newsSeo\(\s*\n?\s*"([^"]+)"/g)) {
    slugs.push(m[1]);
  }
  return slugs;
}

function buildPaths() {
  const paths = new Set([...STATIC_PATHS, ...SERVICE_PATHS]);
  for (const slug of collectNewsSlugs()) {
    if (!SERVICE_LINKED_SLUGS.has(slug)) paths.add(`/tin-tuc/${slug}`);
  }
  return [...paths];
}

function buildSitemapXml(paths) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = paths
    .map((p) => {
      const priority =
        p === "/" ? "1.0" : p.startsWith("/tham-my/") || p.startsWith("/spa/") ? "0.8" : "0.75";
      const changefreq = p === "/" ? "daily" : p.startsWith("/tin-tuc/") ? "monthly" : "weekly";
      return `  <url>
    <loc>${escapeXml(`${BASE_URL}${p}`)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function buildRobotsTxt() {
  return `User-agent: *
Allow: /
Disallow: /adminbp
Disallow: /adminbp/

Sitemap: ${BASE_URL}/sitemap.xml
`;
}

fs.mkdirSync(publicDir, { recursive: true });
const paths = buildPaths();
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), buildSitemapXml(paths), "utf8");
fs.writeFileSync(path.join(publicDir, "robots.txt"), buildRobotsTxt(), "utf8");
console.log(`[seo-static] Wrote robots.txt + sitemap.xml (${paths.length} URLs) → public/`);
