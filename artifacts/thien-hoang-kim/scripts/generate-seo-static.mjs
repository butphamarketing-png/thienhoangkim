/**
 * Sinh robots.txt + sitemap.xml vào public/ trước khi Vite build.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildSeoPaths } from "./seo-paths.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(path.resolve(__dirname, ".."), "public");
const dataDir = path.join(path.resolve(__dirname, ".."), "src/data");

const BASE_URL = (process.env.SITE_URL ?? "https://www.thammythienhoangkim.com").replace(/\/$/, "");

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function parseViDateToIso(dateStr) {
  const m = dateStr?.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (!m) return null;
  const [, d, mo, y] = m;
  return `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

function loadArticleDates() {
  const dates = new Map();
  const defaultsPath = path.join(dataDir, "articles.defaults.ts");
  if (fs.existsSync(defaultsPath)) {
    const text = fs.readFileSync(defaultsPath, "utf8");
    for (const m of text.matchAll(/slug:\s*"([^"]+)"[\s\S]*?date:\s*"([^"]+)"/g)) {
      const iso = parseViDateToIso(m[2]);
      if (iso) dates.set(m[1], iso);
    }
  }
  return dates;
}

function sitemapPriority(routePath) {
  if (routePath === "/") return "1.0";
  if (routePath.startsWith("/tham-my/") || routePath.startsWith("/spa/")) return "0.9";
  if (routePath.startsWith("/tin-tuc/chu-de/")) return "0.85";
  if (routePath === "/tham-my" || routePath === "/spa" || routePath === "/dich-vu" || routePath === "/bang-gia")
    return "0.85";
  if (routePath.startsWith("/tin-tuc/")) return "0.7";
  return "0.75";
}

function sitemapChangefreq(routePath) {
  if (routePath === "/") return "daily";
  if (routePath.startsWith("/tin-tuc/")) return "monthly";
  return "weekly";
}

function buildSitemapXml(paths, articleDates) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = paths
    .map((p) => {
      const slug = p.match(/^\/tin-tuc\/([^/]+)$/)?.[1];
      const lastmod = (slug && articleDates.get(slug)) || today;
      return `  <url>
    <loc>${escapeXml(`${BASE_URL}${p}`)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${sitemapChangefreq(p)}</changefreq>
    <priority>${sitemapPriority(p)}</priority>
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
const paths = buildSeoPaths();
const articleDates = loadArticleDates();
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), buildSitemapXml(paths, articleDates), "utf8");
fs.writeFileSync(path.join(publicDir, "robots.txt"), buildRobotsTxt(), "utf8");
console.log(`[seo-static] Wrote robots.txt + sitemap.xml (${paths.length} URLs) → public/`);
