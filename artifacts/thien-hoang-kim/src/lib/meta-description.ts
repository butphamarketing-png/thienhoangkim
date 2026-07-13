import slugTitlesData from "@/data/slug-titles.generated.json";
import { detectMetaIntent } from "@/lib/meta-title";

const articleTitles = slugTitlesData.articles as Record<string, string>;

export const META_DESCRIPTION_MAX = 160;
const BRAND = "Thiên Hoàng Kim";
const ADDRESS = "323–325 Hùng Vương, An Đông, TP.HCM";
const PHONE = "0896 673 320";

const SERVICE_DESC: Record<string, string> = {
  "nang-mui-hoang-kim":
    "Nâng mũi hoàng kim cấu trúc chuẩn tỉ lệ vàng — sống thẳng, đầu mũi mềm, tự nhiên. Tư vấn miễn phí với bác sĩ tại An Đông TP.HCM.",
  "cat-mi-phuong-hoang":
    "Cắt mí phượng hoàng — mắt to sắc nét, nếp mí cong tự nhiên tại An Đông TP.HCM. Tư vấn miễn phí với bác sĩ Thiên Hoàng Kim.",
  "cay-toc-tu-than":
    "Cấy tóc tự thân FUE — mật độ dày, hướng mọc tự nhiên. Bác sĩ chuyên khoa, tư vấn miễn phí tại Thiên Hoàng Kim TP.HCM.",
  "cang-noi-soi":
    "Căng nội soi trẻ hóa da — nâng cơ, giảm chảy xệ hiệu quả. Quy trình an toàn, tái khám theo dõi tại An Đông TP.HCM.",
  "cang-chi-tre-hoa":
    "Căng chỉ trẻ hóa — da căng mịn, gương mặt trẻ trung tự nhiên. Tư vấn miễn phí, bác sĩ Thiên Hoàng Kim TP.HCM.",
  "filler-tao-hinh":
    "Filler tạo hình mặt chuẩn y khoa — hài hòa, không cứng. Báo giá minh bạch, tư vấn miễn phí tại An Đông TP.HCM.",
  "botox-xoa-nhan-gon-ham":
    "Botox xóa nhăn, gọn hàm V-line — nhanh, ít xâm lấn. Bác sĩ uy tín TP.HCM. Đặt lịch Thiên Hoàng Kim: 0896 673 320.",
  "u-da-muoi-himalaya":
    "Ủ đá muối Himalaya — thư giãn sâu, detox và phục hồi da. Spa cao cấp Thiên Hoàng Kim An Đông. Đặt lịch ngay.",
  "phun-xam-tham-my":
    "Phun xăm thẩm mỹ — mày, môi tự nhiên, bền màu. Kỹ thuật chuẩn y khoa tại Thiên Hoàng Kim. Tư vấn miễn phí.",
  "massage-body-thu-gian":
    "Massage body thư giãn — giảm căng cứng, tái tạo năng lượng. Spa Thiên Hoàng Kim An Đông TP.HCM. Đặt lịch 0896 673 320.",
  "massage-facial":
    "Massage facial — da sáng khỏe, thư giãn chuyên sâu. Liệu trình cá nhân hóa tại spa Thiên Hoàng Kim TP.HCM.",
  "cham-soc-da-toan-dien":
    "Chăm sóc da toàn diện — làm sạch, dưỡng ẩm, phục hồi chuyên sâu. Spa cao cấp Thiên Hoàng Kim An Đông.",
};

const ROUTE_DESC: Record<string, string> = {
  "":
    "Phòng khám thẩm mỹ chuẩn y khoa tại An Đông TP.HCM — nâng mũi, cắt mí, filler, botox, spa. Tư vấn miễn phí. Gọi 0896 673 320.",
  "gioi-thieu":
    "Thiên Hoàng Kim — phòng khám thẩm mỹ uy tín An Đông TP.HCM. Bác sĩ chuyên khoa, quy trình an toàn, tư vấn miễn phí.",
  "dich-vu":
    "Dịch vụ thẩm mỹ y khoa & spa chăm sóc da toàn diện — nâng mũi, cắt mí, filler, botox. Thiên Hoàng Kim TP.HCM.",
  "tham-my":
    "Thẩm mỹ y khoa TP.HCM — nâng mũi, cắt mí, căng chỉ, filler, botox. Bác sĩ chuyên khoa, tư vấn miễn phí tại THK.",
  spa: "Spa chăm sóc da cao cấp — massage, phun xăm, ủ đá muối Himalaya. Thư giãn & làm đẹp tại Thiên Hoàng Kim An Đông.",
  "khach-hang":
    "Khách hàng thực tế Thiên Hoàng Kim — hình ảnh before & after, feedback chân thực. Xem kết quả trước khi đặt lịch.",
  "bang-gia":
    "Bảng giá thẩm mỹ minh bạch — báo giá sau khám, không phụ phí ẩn. Thiên Hoàng Kim An Đông TP.HCM. Gọi 0896 673 320.",
  "tin-tuc":
    "Cẩm nang làm đẹp & tin tức thẩm mỹ từ bác sĩ Thiên Hoàng Kim — kiến thức dễ hiểu, tư vấn miễn phí TP.HCM.",
  "lien-he":
    "Đặt lịch tư vấn miễn phí — hotline 0896 673 320. 323–325 Hùng Vương, An Đông TP.HCM. Mở 08:00–20:00 hàng ngày.",
  "doi-ngu-bac-si":
    "Đội ngũ bác sĩ Thiên Hoàng Kim — kinh nghiệm, tận tâm, chuyên sâu thẩm mỹ y khoa. Tư vấn miễn phí tại An Đông TP.HCM.",
  "cau-chuyen-thuong-hieu":
    "Câu chuyện Thiên Hoàng Kim — hành trình xây dựng niềm tin và chất lượng dịch vụ thẩm mỹ uy tín TP.HCM.",
  "cong-nghe-tham-my":
    "Công nghệ thẩm mỹ hiện đại tại Thiên Hoàng Kim — thiết bị chuẩn y khoa, quy trình an toàn, hiệu quả cao.",
  "co-so-vat-chat":
    "Cơ sở vật chất cao cấp — phòng vô trùng, riêng tư, sang trọng. Thiên Hoàng Kim Aesthetic Clinic An Đông TP.HCM.",
  "kien-thuc":
    "Kiến thức làm đẹp từ bác sĩ — giải thích dễ hiểu, lời khuyên thực tế. Cẩm nang Thiên Hoàng Kim TP.HCM.",
  "tin-tuc-tin-tuc": "Tin tức thẩm mỹ mới nhất — xu hướng, công nghệ, khuyến mãi từ Thiên Hoàng Kim An Đông TP.HCM.",
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

function capitalizeFirst(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function truncateMetaDescription(text: string, max = META_DESCRIPTION_MAX): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const lastSep = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf(" — "), cut.lastIndexOf(", "), cut.lastIndexOf(" "));
  if (lastSep > max * 0.6) return `${cut.slice(0, lastSep).trim()}…`;
  return `${cut.trim()}…`;
}

const LEGACY_META_PATTERNS = [
  /thông tin y khoa – thẩm mỹ/i,
  /— giải thích, đối tượng phù hợp và tư vấn miễn phí tại Thiên Hoàng Kim/i,
  /quy trình tư vấn và đặt lịch tại Thiên Hoàng Kim 323/i,
];

export function isLegacyAutoMetaDescription(text: string, slug?: string, focusKeyphrase?: string): boolean {
  const t = text.trim();
  if (!t) return true;
  if (LEGACY_META_PATTERNS.some((re) => re.test(t))) return true;
  const focus = focusKeyphrase?.trim();
  if (focus && t === buildGeneratedMetaDescriptionTemplate(focus)) return true;
  if (slug && t === buildGeneratedDescriptionTemplate(slugToDisplayTitle(slug))) return true;
  return false;
}

function buildGeneratedMetaDescriptionTemplate(focus: string): string {
  const t = focus.charAt(0).toUpperCase() + focus.slice(1);
  return `${t}: thông tin y khoa – thẩm mỹ, quy trình tư vấn và đặt lịch tại Thiên Hoàng Kim ${ADDRESS}. Gọi ${PHONE}.`;
}

function buildGeneratedDescriptionTemplate(topic: string): string {
  const t = capitalizeFirst(topic);
  return `${t} — giải thích, đối tượng phù hợp và tư vấn miễn phí tại Thiên Hoàng Kim An Đông TP.HCM. Hotline ${PHONE}.`;
}

function topicLabel(slug: string, displayTitle: string, focusKeyphrase?: string): string {
  const focus = focusKeyphrase?.trim();
  if (focus) return capitalizeFirst(focus);
  return capitalizeFirst(displayTitle || slugToDisplayTitle(slug));
}

function buildArticleMetaDescription(
  slug: string,
  displayTitle: string,
  focusKeyphrase?: string,
  summary?: string,
): string {
  if (SERVICE_DESC[slug]) return truncateMetaDescription(SERVICE_DESC[slug]);

  const cleanSummary = summary?.trim();
  if (cleanSummary && !isLegacyAutoMetaDescription(cleanSummary, slug, focusKeyphrase) && cleanSummary.length >= 55) {
    return truncateMetaDescription(cleanSummary);
  }

  const topic = topicLabel(slug, displayTitle, focusKeyphrase);
  const priceTopic = topic.replace(/^Giá\s+/i, "");
  const intent = detectMetaIntent(slug);

  switch (intent) {
    case "price":
      return truncateMetaDescription(
        `Giá ${priceTopic} TP.HCM — báo giá minh bạch sau tư vấn, không phụ phí. ${BRAND} An Đông. ☎ ${PHONE}.`,
      );
    case "location":
      return truncateMetaDescription(
        `${topic} tại ${BRAND} — bác sĩ uy tín, quy trình an toàn. ${ADDRESS}. Tư vấn miễn phí.`,
      );
    case "question":
      return truncateMetaDescription(
        `${topic}? Bác sĩ ${BRAND} giải đáp rõ ràng — an toàn, phác đồ cá nhân. Đặt lịch miễn phí TP.HCM.`,
      );
    case "comparison":
      return truncateMetaDescription(
        `${topic} — so sánh ưu nhược & gợi ý phác đồ phù hợp. Tư vấn miễn phí tại ${BRAND} An Đông.`,
      );
    default:
      return truncateMetaDescription(
        `${topic}: giải thích dễ hiểu, đối tượng phù hợp & bước tiếp theo. Tư vấn miễn phí — ${BRAND} TP.HCM.`,
      );
  }
}

/** Meta description thu hút khách — ưu tiên template theo slug/path */
export function buildAttractiveMetaDescription(opts: {
  slug?: string;
  displayTitle?: string;
  path?: string;
  focusKeyphrase?: string;
  summary?: string;
}): string {
  const hasPath = opts.path !== undefined;
  const path = hasPath ? (opts.path!.split("#")[0].replace(/\/$/, "") || "/") : "";
  const slug =
    opts.slug?.trim().toLowerCase() ??
    (hasPath && path !== "/" ? (path.split("/").pop() ?? "") : "");
  const displayTitle = opts.displayTitle?.trim() || (slug ? slugToDisplayTitle(slug) : "");

  if (hasPath) {
    if (path === "/" || path === "") {
      return truncateMetaDescription(ROUTE_DESC[""] ?? `${BRAND} — tư vấn miễn phí TP.HCM`);
    }
    if (path === "/tin-tuc/kien-thuc") return truncateMetaDescription(ROUTE_DESC["kien-thuc"] ?? ROUTE_DESC["tin-tuc"]);
    if (path === "/tin-tuc/tin-tuc") return truncateMetaDescription(ROUTE_DESC["tin-tuc-tin-tuc"] ?? ROUTE_DESC["tin-tuc"]);
    const routeKey = path.slice(1).replace(/\//g, "-");
    if (ROUTE_DESC[routeKey]) return truncateMetaDescription(ROUTE_DESC[routeKey]);
    if (ROUTE_DESC[slug]) return truncateMetaDescription(ROUTE_DESC[slug]);
  }

  if (SERVICE_DESC[slug]) return truncateMetaDescription(SERVICE_DESC[slug]);
  if (slug) return buildArticleMetaDescription(slug, displayTitle, opts.focusKeyphrase, opts.summary);

  const fallback = opts.summary?.trim() || displayTitle || BRAND;
  return truncateMetaDescription(`${fallback} — tư vấn miễn phí tại ${BRAND} An Đông TP.HCM.`);
}

export function routeMetaDescription(path: string): string | null {
  const clean = path.replace(/^\//, "").replace(/\/$/, "");
  if (clean === "") return ROUTE_DESC[""] ?? null;
  if (clean === "tin-tuc/kien-thuc") return ROUTE_DESC["kien-thuc"] ?? null;
  if (clean === "tin-tuc/tin-tuc") return ROUTE_DESC["tin-tuc-tin-tuc"] ?? null;
  const last = clean.split("/").pop() ?? "";
  return ROUTE_DESC[last] ?? ROUTE_DESC[clean.replace(/\//g, "-")] ?? null;
}

/** Dùng khi sinh bài từ keyword plan */
export function buildGeneratedMetaDescription(focus: string, slug?: string): string {
  return buildAttractiveMetaDescription({
    slug,
    focusKeyphrase: focus,
    displayTitle: capitalizeFirst(focus),
  });
}
