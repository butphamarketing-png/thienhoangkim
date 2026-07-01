export type ServiceCategoryId = "tham-my" | "spa";

export type ServiceCatalogItem = {
  slug: string;
  label: string;
  /** Slug bài viết tin tức để hiển thị nội dung chi tiết */
  articleSlug?: string;
  description?: string;
};

export type ServiceCategory = {
  id: ServiceCategoryId;
  path: string;
  title: string;
  eyebrow: string;
  description: string;
  /** Bài viết giới thiệu cấp 1 (danh mục) */
  articleSlug?: string;
};

const THAM_MY_ITEMS: ServiceCatalogItem[] = [
  {
    slug: "nang-mui-hoang-kim",
    label: "Nâng mũi hoàng kim",
    articleSlug: "nang-mui-hoang-kim",
    description: "Nâng mũi cấu trúc chuẩn tỉ lệ vàng — sống thẳng, đầu mũi mềm tự nhiên.",
  },
  {
    slug: "cat-mi-phuong-hoang",
    label: "Cắt mí phượng hoàng",
    articleSlug: "cat-mi-phuong-hoang",
    description: "Cắt mí tạo đường cong phượng hoàng — mắt to, sắc nét và hài hòa khuôn mặt.",
  },
  {
    slug: "cay-toc-tu-than",
    label: "Cấy tóc tự thân",
    articleSlug: "cay-toc-tu-than",
    description: "Cấy tóc FUE/FUT từ nang tóc tự thân — mật độ cao, hướng mọc tự nhiên.",
  },
  {
    slug: "cang-noi-soi",
    label: "Căng nội soi",
    articleSlug: "cang-noi-soi",
    description: "Căng da nội soi nâng cơ vùng trán, mặt — trẻ hóa sâu, ít sẹo.",
  },
  {
    slug: "cang-chi-tre-hoa",
    label: "Căng chỉ trẻ hóa",
    articleSlug: "cang-chi-tre-hoa",
    description: "Nâng cơ, săn chắc da bằng chỉ sinh học — không phẫu thuật, hồi phục nhanh.",
  },
  {
    slug: "hut-mo-cay-mo-ma",
    label: "Hút mỡ – cấy mỡ má",
    articleSlug: "hut-mo-cay-mo-ma",
    description: "Tạo hình mặt V-line: hút mỡ vùng thừa, cấy mỡ tự thân làm đầy má.",
  },
  {
    slug: "filler-tao-hinh",
    label: "Filler tạo hình",
    articleSlug: "filler-tao-hinh",
    description: "Tiêm filler chính hãng tạo hình mũi, môi, cằm, thái dương tự nhiên.",
  },
  {
    slug: "botox-xoa-nhan-gon-ham",
    label: "Botox xóa nhăn, gọn hàm",
    articleSlug: "botox-xoa-nhan-gon-ham",
    description: "Giảm nếp nhăn động, thon gọn hàm và cằm — khuôn mặt trẻ trung hơn.",
  },
];

const SPA_ITEMS: ServiceCatalogItem[] = [
  {
    slug: "u-da-muoi-himalaya",
    label: "Ủ đá muối Himalaya",
    articleSlug: "u-da-muoi-himalaya",
    description: "Liệu trình ủ đá muối Himalaya thải độc, thư giãn và cân bằng cơ thể.",
  },
  {
    slug: "phun-xam-tham-my",
    label: "Phun xăm thẩm mỹ",
    articleSlug: "phun-xam-tham-my",
    description: "Phun mày, môi, eyeliner tự nhiên — tiết kiệm thời gian trang điểm mỗi ngày.",
  },
  {
    slug: "massage-body-thu-gian",
    label: "Massage body thư giãn",
    articleSlug: "massage-body-thu-gian",
    description: "Massage toàn thân giảm căng cơ, cải thiện tuần hoàn và giảm stress.",
  },
  {
    slug: "massage-facial",
    label: "Massage facial",
    articleSlug: "massage-facial",
    description: "Massage mặt kết hợp ấn huyệt — da sáng khỏe, thư giãn sâu.",
  },
  {
    slug: "cham-soc-da-toan-dien",
    label: "Chăm sóc da toàn diện",
    articleSlug: "cham-soc-da-toan-dien",
    description: "Phác đồ chăm sóc da cá nhân hóa — làm sạch, dưỡng ẩm và phục hồi.",
  },
];

/** Chuyển slug dịch vụ cũ sang slug mới */
const LEGACY_SLUG_REDIRECT: Record<string, { category: ServiceCategoryId; slug: string }> = {
  "nang-mui": { category: "tham-my", slug: "nang-mui-hoang-kim" },
  "cat-mi": { category: "tham-my", slug: "cat-mi-phuong-hoang" },
  filler: { category: "tham-my", slug: "filler-tao-hinh" },
  botox: { category: "tham-my", slug: "botox-xoa-nhan-gon-ham" },
  "cang-chi": { category: "tham-my", slug: "cang-chi-tre-hoa" },
  "cham-soc-da": { category: "spa", slug: "cham-soc-da-toan-dien" },
  facial: { category: "spa", slug: "massage-facial" },
  massage: { category: "spa", slug: "massage-body-thu-gian" },
};

export const SERVICE_CATEGORIES: Record<ServiceCategoryId, ServiceCategory> = {
  "tham-my": {
    id: "tham-my",
    path: "/tham-my",
    title: "DỊCH VỤ THẨM MỸ",
    eyebrow: "Thẩm mỹ y khoa",
    description: "Giải pháp thẩm mỹ chuẩn y khoa — an toàn, tự nhiên và hiệu quả lâu dài.",
    articleSlug: "dich-vu-tham-my-y-khoa",
  },
  spa: {
    id: "spa",
    path: "/spa",
    title: "DỊCH VỤ SPA",
    eyebrow: "Spa & chăm sóc da",
    description: "Chăm sóc da và thư giãn toàn diện trong không gian cao cấp.",
    articleSlug: "dich-vu-spa-cham-soc",
  },
};

export const SERVICE_ITEMS: Record<ServiceCategoryId, ServiceCatalogItem[]> = {
  "tham-my": THAM_MY_ITEMS,
  spa: SPA_ITEMS,
};

export function getServiceItem(categoryId: ServiceCategoryId, slug: string) {
  return SERVICE_ITEMS[categoryId].find((s) => s.slug === slug) ?? null;
}

export function getServiceHref(categoryId: ServiceCategoryId, slug: string) {
  return `${SERVICE_CATEGORIES[categoryId].path}/${slug}`;
}

/** Chuyển /dich-vu/slug cũ sang /tham-my/slug hoặc /spa/slug */
export function resolveLegacyServicePath(path: string): string | null {
  const match = path.match(/^\/dich-vu\/([^/]+)$/);
  if (!match) return null;
  const slug = match[1];

  const legacy = LEGACY_SLUG_REDIRECT[slug];
  if (legacy) return getServiceHref(legacy.category, legacy.slug);

  if (getServiceItem("tham-my", slug)) return getServiceHref("tham-my", slug);
  if (getServiceItem("spa", slug)) return getServiceHref("spa", slug);
  return null;
}

export function buildNavServiceItems(categoryId: ServiceCategoryId) {
  return SERVICE_ITEMS[categoryId].map((item) => ({
    label: item.label,
    href: getServiceHref(categoryId, item.slug),
  }));
}

/** Tìm dịch vụ gắn với bài viết (articleSlug) — dùng cho canonical SEO */
export function findServiceByArticleSlug(articleSlug: string) {
  for (const categoryId of Object.keys(SERVICE_ITEMS) as ServiceCategoryId[]) {
    const item = SERVICE_ITEMS[categoryId].find((s) => s.articleSlug === articleSlug);
    if (item) return { category: categoryId, item };
  }
  return null;
}

/** Slug bài viết danh mục → URL trang dịch vụ cấp 1 */
const CATEGORY_ARTICLE_PATH: Record<string, string> = {
  "dich-vu-tham-my-y-khoa": "/tham-my",
  "dich-vu-spa-cham-soc": "/spa",
};

export function getCategoryPathForArticle(articleSlug: string): string | null {
  return CATEGORY_ARTICLE_PATH[articleSlug] ?? null;
}

export function getPreferredArticlePath(articleSlug: string): string | null {
  const service = findServiceByArticleSlug(articleSlug);
  if (service) return getServiceHref(service.category, service.item.slug);
  return getCategoryPathForArticle(articleSlug);
}

/** URL công khai ưu tiên cho bài viết (dịch vụ → /tham-my|/spa, tin → /tin-tuc) */
export function getArticlePublicPath(articleSlug: string): string {
  return getPreferredArticlePath(articleSlug) ?? `/tin-tuc/${articleSlug}`;
}

export function isServiceLinkedArticle(articleSlug: string): boolean {
  return Boolean(findServiceByArticleSlug(articleSlug) || getCategoryPathForArticle(articleSlug));
}
