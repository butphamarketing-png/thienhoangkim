import slugTitlesData from "@/data/slug-titles.generated.json";

const articleTitles = slugTitlesData.articles as Record<string, string>;

export const META_TITLE_MAX = 60;
const BRAND = "Thiên Hoàng Kim";
const BRAND_SHORT = "THK";

/** Tiêu đề dịch vụ — thu hút + đúng thương hiệu */
const SERVICE_META: Record<string, string> = {
  "nang-mui-hoang-kim": "Nâng mũi Hoàng Kim TP.HCM | Tư vấn miễn phí",
  "cat-mi-phuong-hoang": "Cắt mí Phượng Hoàng | Tự nhiên, an toàn | THK",
  "cay-toc-tu-than": "Cấy tóc tự thân FUE | Bác sĩ chuyên khoa | THK",
  "cang-noi-soi": "Căng nội soi trẻ hóa da | Hiệu quả nhanh | THK",
  "cang-chi-tre-hoa": "Căng chỉ trẻ hóa | Trẻ trung tự nhiên | THK",
  "filler-tao-hinh": "Filler tạo hình mặt | Chuẩn y khoa | THK",
  "botox-xoa-nhan-gon-ham": "Botox xóa nhăn, gọn hàm | Uy tín TP.HCM",
  "u-da-muoi-himalaya": "Ủ đá muối Himalaya | Thư giãn & detox | THK",
  "phun-xam-tham-my": "Phun xăm thẩm mỹ | Tự nhiên, bền màu | THK",
  "massage-body-thu-gian": "Massage body thư giãn | Giảm stress | THK",
  "massage-facial": "Massage facial | Da sáng khỏe | THK",
  "cham-soc-da-toan-dien": "Chăm sóc da toàn diện | Spa cao cấp | THK",
};

/** Trang chính — meta title thu hút click */
const ROUTE_META: Record<string, string> = {
  "": "Thiên Hoàng Kim | Thẩm mỹ uy tín TP.HCM — Tư vấn miễn phí",
  "gioi-thieu": "Giới thiệu Thiên Hoàng Kim | Phòng khám uy tín",
  "dich-vu": "Dịch vụ thẩm mỹ & spa | Giải pháp toàn diện | THK",
  "tham-my": "Thẩm mỹ y khoa TP.HCM | Bác sĩ chuyên khoa | THK",
  spa: "Spa chăm sóc da | Thư giãn & làm đẹp | THK",
  "khach-hang": "Khách hàng thực tế | Before & After | THK",
  "bang-gia": "Bảng giá thẩm mỹ | Minh bạch, báo giá nhanh",
  "tin-tuc": "Tin tức & kiến thức làm đẹp | Cẩm nang THK",
  "lien-he": "Đặt lịch tư vấn miễn phí | Liên hệ THK",
  "doi-ngu-bac-si": "Đội ngũ bác sĩ | Kinh nghiệm & tận tâm | THK",
  "cau-chuyen-thuong-hieu": "Câu chuyện Thiên Hoàng Kim | Thương hiệu",
  "cong-nghe-tham-my": "Công nghệ thẩm mỹ hiện đại | THK",
  "co-so-vat-chat": "Cơ sở vật chất cao cấp | Thiên Hoàng Kim",
  "kien-thuc": "Kiến thức làm đẹp | Cẩm nang từ bác sĩ",
  "tin-tuc-tin-tuc": "Tin tức thẩm mỹ mới nhất | THK",
};

function slugToDisplayTitle(slug: string): string {
  const key = slug.trim().toLowerCase();
  if (articleTitles[key]) return articleTitles[key];
  return key
    .split("-")
    .filter(Boolean)
    .join(" ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bTp Hcm\b/g, "TP.HCM")
    .replace(/\bTphcm\b/g, "TP.HCM");
}

type TitleIntent = "price" | "location" | "question" | "comparison" | "default";

export function detectMetaIntent(slug: string): TitleIntent {
  const s = slug.toLowerCase();
  if (/(^|-)(gia|chi-phi|bao-nhieu|bang-gia)(-|$)/.test(s)) return "price";
  if (/(^|-)(tp-hcm|tphcm|quan-|o-|tai-)(-|$)/.test(s) || s.includes("an-dong")) return "location";
  if (/(^|-)(co-dau|bao-lau|co-nen|nen-|khong-nen|co-an|co-uong|co-tap)(-|$)/.test(s) || s.includes("hay-"))
    return "question";
  if (s.includes("-vs-") || s.includes("-va-") || s.includes("hay-")) return "comparison";
  return "default";
}

function truncateTitle(title: string, max = META_TITLE_MAX): string {
  const t = title.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const lastSep = Math.max(cut.lastIndexOf(" | "), cut.lastIndexOf(" — "), cut.lastIndexOf(" "));
  if (lastSep > max * 0.55) return `${cut.slice(0, lastSep).trim()}…`;
  return `${cut.trim()}…`;
}

function withBrand(pageTitle: string, brand = BRAND_SHORT): string {
  if (pageTitle.includes(BRAND) || pageTitle.includes(BRAND_SHORT)) return pageTitle;
  const candidate = `${pageTitle} | ${brand}`;
  return truncateTitle(candidate);
}

function capitalizeFirst(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function buildArticleMetaTitle(slug: string, displayTitle: string): string {
  if (SERVICE_META[slug]) return truncateTitle(SERVICE_META[slug]);

  const topic = capitalizeFirst(displayTitle);
  const intent = detectMetaIntent(slug);

  switch (intent) {
    case "price": {
      const priceTopic = topic.replace(/^Giá\s+/i, "");
      return truncateTitle(withBrand(`Giá ${priceTopic} TP.HCM — Báo giá minh bạch`));
    }
    case "location":
      return truncateTitle(withBrand(`${topic} — Uy tín, an toàn`));
    case "question":
      return truncateTitle(withBrand(`${topic}? Bác sĩ giải đáp`));
    case "comparison":
      return truncateTitle(withBrand(`${topic} — So sánh & tư vấn`));
    default:
      return truncateTitle(withBrand(`${topic} — Tư vấn miễn phí`));
  }
}

export function isLegacyAutoMetaTitle(metaTitle: string, slug: string): boolean {
  const t = metaTitle.trim();
  if (!t) return true;
  if (t === ROUTE_META[""]) return true;
  const display = slugToDisplayTitle(slug);
  return (
    t === `${display} | ${BRAND}` ||
    t === `${display} | ${BRAND_SHORT}` ||
    t === `${display} — Tư vấn miễn phí | ${BRAND_SHORT}`
  );
}

/** Meta title thu hút khách — ưu tiên template theo slug/path */
export function buildAttractiveMetaTitle(opts: {
  slug?: string;
  displayTitle?: string;
  path?: string;
  brand?: string;
}): string {
  const hasPath = opts.path !== undefined;
  const path = hasPath ? (opts.path!.split("#")[0].replace(/\/$/, "") || "/") : "";
  const slug =
    opts.slug?.trim().toLowerCase() ??
    (hasPath && path !== "/" ? (path.split("/").pop() ?? "") : "");
  const displayTitle = opts.displayTitle?.trim() || (slug ? slugToDisplayTitle(slug) : "");

  if (hasPath) {
    if (path === "/" || path === "") {
      return truncateTitle(ROUTE_META[""] ?? `${BRAND} | Tư vấn miễn phí`);
    }

    if (path === "/tin-tuc/kien-thuc") return truncateTitle(ROUTE_META["kien-thuc"] ?? withBrand("Kiến thức làm đẹp"));
    if (path === "/tin-tuc/tin-tuc") return truncateTitle(ROUTE_META["tin-tuc-tin-tuc"] ?? withBrand("Tin tức thẩm mỹ"));
    const routeKey = path.slice(1).replace(/\//g, "-");
    if (ROUTE_META[routeKey]) return truncateTitle(ROUTE_META[routeKey]);
    if (ROUTE_META[slug]) return truncateTitle(ROUTE_META[slug]);
  }

  if (SERVICE_META[slug]) return truncateTitle(SERVICE_META[slug]);

  if (slug) return buildArticleMetaTitle(slug, displayTitle);

  return truncateTitle(withBrand(displayTitle || BRAND, opts.brand ?? BRAND_SHORT));
}

/** Thay thế buildMetaTitleFromSlug — giữ export cũ */
export function buildMetaTitleFromSlug(slug: string, brand = BRAND): string {
  const title = buildAttractiveMetaTitle({ slug });
  if (title.includes(brand)) return title;
  return truncateTitle(`${slugToDisplayTitle(slug)} | ${brand}`);
}

export function routeMetaTitle(path: string): string | null {
  const clean = path.replace(/^\//, "").replace(/\/$/, "");
  if (clean === "") return ROUTE_META[""] ?? null;
  if (clean === "tin-tuc/kien-thuc") return ROUTE_META["kien-thuc"] ?? null;
  if (clean === "tin-tuc/tin-tuc") return ROUTE_META["tin-tuc-tin-tuc"] ?? null;
  const last = clean.split("/").pop() ?? "";
  return ROUTE_META[last] ?? ROUTE_META[clean.replace(/\//g, "-")] ?? null;
}
