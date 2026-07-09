/**
 * Sau Vite build: sinh index.html riêng cho từng URL với title/meta đúng.
 * Google và scraper đọc được SEO mà không cần chạy JavaScript.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, "..");
const distDir = path.join(appRoot, "dist/public");
const indexPath = path.join(distDir, "index.html");

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function upsertMeta(html, attr, key, content) {
  if (!content) return html;
  const escaped = escapeHtml(content);
  const re = new RegExp(`<meta ${attr}="${key}" content="[^"]*"\\s*/?>`);
  const tag = `<meta ${attr}="${key}" content="${escaped}" />`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function upsertCanonical(html, href) {
  if (!href) return html;
  const escaped = escapeHtml(href);
  const re = /<link rel="canonical" href="[^"]*"\s*\/?>/;
  const tag = `<link rel="canonical" href="${escaped}" />`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function injectMeta(html, meta) {
  let out = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(meta.title)}</title>`);
  out = upsertMeta(out, "name", "description", meta.description);
  out = upsertMeta(out, "name", "keywords", meta.keywords);
  out = upsertMeta(out, "name", "robots", meta.robots);
  out = upsertMeta(out, "property", "og:title", meta.ogTitle);
  out = upsertMeta(out, "property", "og:description", meta.ogDescription);
  out = upsertMeta(out, "property", "og:image", meta.ogImage);
  out = upsertMeta(out, "property", "og:url", meta.ogUrl);
  out = upsertMeta(out, "property", "og:type", meta.ogType);
  out = upsertMeta(out, "name", "twitter:title", meta.ogTitle);
  out = upsertMeta(out, "name", "twitter:description", meta.ogDescription);
  if (meta.ogImage) out = upsertMeta(out, "name", "twitter:image", meta.ogImage);
  out = upsertCanonical(out, meta.canonical);
  return out;
}

function outputPathForRoute(routePath) {
  if (routePath === "/") return indexPath;
  const segments = routePath.replace(/^\//, "").split("/");
  return path.join(distDir, ...segments, "index.html");
}

async function main() {
  if (!fs.existsSync(indexPath)) {
    console.error("[prerender-seo] Missing dist/public/index.html — run vite build first.");
    process.exit(1);
  }

  const shellHtml = fs.readFileSync(indexPath, "utf8");
  const server = await createServer({
    configFile: path.join(appRoot, "vite.config.ts"),
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "error",
  });

  try {
    const mod = await server.ssrLoadModule("/scripts/prerender-seo-lib.ts");
    const pages = mod.collectPrerenderPages();

    let wrote = 0;
    for (const { path: routePath, meta } of pages) {
      const html = injectMeta(shellHtml, meta);
      const outPath = outputPathForRoute(routePath);
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, html, "utf8");
      wrote++;
    }

    console.log(`[prerender-seo] Wrote ${wrote} HTML shells with unique meta → dist/public/`);
  } finally {
    await server.close();
  }
}

main().catch((err) => {
  console.error("[prerender-seo] Failed:", err);
  process.exit(1);
});
