/**
 * Sinh robots.txt + sitemap.xml vào public/ trước khi Vite build.
 * Tránh phụ thuộc Vercel serverless (đang lỗi FUNCTION_INVOCATION_FAILED).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildSeoPaths } from "./seo-paths.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(path.resolve(__dirname, ".."), "public");

const BASE_URL = (process.env.SITE_URL ?? "https://www.thammythienhoangkim.com").replace(/\/$/, "");

function escapeXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
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
const paths = buildSeoPaths();
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), buildSitemapXml(paths), "utf8");
fs.writeFileSync(path.join(publicDir, "robots.txt"), buildRobotsTxt(), "utf8");
console.log(`[seo-static] Wrote robots.txt + sitemap.xml (${paths.length} URLs) → public/`);
