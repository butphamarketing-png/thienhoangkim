/** Đường dẫn tĩnh + dịch vụ — đồng bộ với services-catalog.ts & seo-sitemap.ts */
export const SITEMAP_STATIC_PATHS = [
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

export const SITEMAP_SERVICE_PATHS = [
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

/** Bài viết gắn dịch vụ — canonical trỏ về trang dịch vụ, không thêm /tin-tuc */
export const SERVICE_LINKED_ARTICLE_SLUGS = new Set([
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

export type SitemapArticle = { slug?: string; published?: boolean; seo?: { noindex?: boolean } };

export function collectSitemapPaths(articles: SitemapArticle[] = []): string[] {
  const paths = new Set<string>([...SITEMAP_STATIC_PATHS, ...SITEMAP_SERVICE_PATHS]);

  for (const a of articles) {
    if (!a.published || !a.slug || a.seo?.noindex) continue;
    if (SERVICE_LINKED_ARTICLE_SLUGS.has(a.slug)) continue;
    paths.add(`/tin-tuc/${a.slug}`);
  }

  return [...paths];
}

export function buildSitemapXml(baseUrl: string, paths: string[]): string {
  const base = baseUrl.replace(/\/$/, "");
  const today = new Date().toISOString().slice(0, 10);

  const urls = paths
    .map((path) => {
      const priority =
        path === "/" ? "1.0" : path.startsWith("/tham-my/") || path.startsWith("/spa/") ? "0.8" : "0.75";
      const changefreq = path === "/" ? "daily" : path.startsWith("/tin-tuc/") ? "monthly" : "weekly";
      return `  <url>
    <loc>${escapeXml(`${base}${path}`)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
}

function escapeXml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
