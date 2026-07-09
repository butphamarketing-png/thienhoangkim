import slugTitlesData from "@/data/slug-titles.generated.json";

const BRAND_SUFFIX = "Thiên Hoàng Kim";
const articleTitles = slugTitlesData.articles as Record<string, string>;
const routeTitles = slugTitlesData.routes as Record<string, string>;

export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Tiêu đề đọc được từ slug — khớp URL (VD: tay-trang → Tẩy trang) */
export function slugToDisplayTitle(slug: string): string {
  const key = slug.trim().toLowerCase();
  if (articleTitles[key]) return articleTitles[key];
  return key
    .split("-")
    .filter(Boolean)
    .map((part) => (/^\d+$/.test(part) ? part : part))
    .join(" ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bTp Hcm\b/g, "TP.HCM")
    .replace(/\bTphcm\b/g, "TP.HCM");
}

/** Meta title chuẩn: tiêu đề slug + thương hiệu */
export function buildMetaTitleFromSlug(slug: string, brand = BRAND_SUFFIX): string {
  const title = slugToDisplayTitle(slug);
  if (title.includes(brand)) return title;
  return `${title} | ${brand}`;
}

/** Tiêu đề trang tĩnh từ path (VD: /gioi-thieu → Giới thiệu) */
export function routePathToDisplayTitle(path: string): string | null {
  const clean = path.replace(/^\//, "").replace(/\/$/, "");
  if (clean === "") return routeTitles[""] ?? null;
  if (clean === "tin-tuc/kien-thuc") return routeTitles["kien-thuc"] ?? null;
  if (clean === "tin-tuc/tin-tuc") return routeTitles["tin-tuc-tin-tuc"] ?? null;
  if (clean === "tin-tuc") return routeTitles["tin-tuc"] ?? null;
  const segments = clean.split("/");
  const last = segments[segments.length - 1];
  return routeTitles[last] ?? routeTitles[clean.replace(/\//g, "-")] ?? null;
}
