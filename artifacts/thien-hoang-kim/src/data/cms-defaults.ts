import { ALL_PAGES } from "@/data/pages.defaults";
import { SERVICE_CATEGORIES, SERVICE_ITEMS } from "@/data/services-catalog";
import type {
  ServiceCategoryId,
  SiteContactPage,
  SiteLink,
  SiteMainNavItem,
  SitePage,
  SitePageHero,
  SiteServiceCategory,
  SiteServiceItem,
} from "@/types/site-content";

const MANAGED_PAGE_PREFIX = "/gioi-thieu";

const DEFAULT_SERVICE_PRICE_TEXT: Record<string, string> = {
  "nang-mui-hoang-kim": "từ 45.000.000đ",
  "cat-mi-phuong-hoang": "từ 8.000.000đ",
  "cay-toc-tu-than": "Liên hệ báo giá",
  "cang-noi-soi": "từ 5.000.000đ / buổi",
  "cang-chi-tre-hoa": "từ 5.000.000đ / buổi",
  "filler-tao-hinh": "từ 3.000.000đ / vùng",
  "botox-xoa-nhan-gon-ham": "từ 3.000.000đ / vùng",
  "u-da-muoi-himalaya": "từ 500.000đ",
  "phun-xam-tham-my": "từ 1.500.000đ",
  "massage-body-thu-gian": "từ 350.000đ",
  "massage-facial": "từ 500.000đ",
  "cham-soc-da-toan-dien": "từ 500.000đ",
};

export const DEFAULT_MAIN_NAV: SiteMainNavItem[] = [
  { id: "home", label: "TRANG CHỦ", href: "/", enabled: true },
  { id: "intro", label: "GIỚI THIỆU", href: "/gioi-thieu", enabled: true },
  { id: "services", label: "DỊCH VỤ", href: "/dich-vu", enabled: true },
  { id: "customers", label: "KHÁCH HÀNG", href: "/khach-hang", enabled: true },
  { id: "pricing", label: "BẢNG GIÁ", href: "/bang-gia", enabled: true },
  { id: "news", label: "TIN TỨC", href: "/tin-tuc", enabled: true },
  { id: "contact", label: "LIÊN HỆ", href: "/lien-he", enabled: true },
];

export function buildDefaultSitePages(): SitePage[] {
  return Object.entries(ALL_PAGES)
    .filter(([path]) => path === MANAGED_PAGE_PREFIX || path.startsWith(`${MANAGED_PAGE_PREFIX}/`))
    .map(([path, page]) => ({
      id: path.slice(1).replace(/\//g, "-") || "root",
      path,
      title: page.title,
      eyebrow: page.eyebrow,
      description: page.description,
      blocks: page.blocks.map((b) => ({
        title: b.title,
        paragraphs: [...b.paragraphs],
      })),
    }));
}

export function buildDefaultServiceCategories(): SiteServiceCategory[] {
  return (Object.keys(SERVICE_CATEGORIES) as ServiceCategoryId[]).map((id) => ({
    ...SERVICE_CATEGORIES[id],
    published: true,
  }));
}

export function buildDefaultServiceItems(): SiteServiceItem[] {
  const items: SiteServiceItem[] = [];
  for (const categoryId of Object.keys(SERVICE_ITEMS) as ServiceCategoryId[]) {
    SERVICE_ITEMS[categoryId].forEach((item, sortOrder) => {
      items.push({
        id: `${categoryId}-${item.slug}`,
        categoryId,
        slug: item.slug,
        label: item.label,
        description: item.description,
        articleSlug: item.articleSlug,
        image: "",
        priceText: DEFAULT_SERVICE_PRICE_TEXT[item.slug] ?? "",
        published: true,
        sortOrder,
      });
    });
  }
  return items;
}

export const DEFAULT_INTRO_NAV: SiteLink[] = [
  { label: "Câu Chuyện Thương Hiệu", href: "/gioi-thieu/cau-chuyen-thuong-hieu" },
  { label: "Đội Ngũ Bác Sĩ", href: "/gioi-thieu/doi-ngu-bac-si" },
  { label: "Công Nghệ Thẩm Mỹ", href: "/gioi-thieu/cong-nghe-tham-my" },
  { label: "Cơ Sở Vật Chất", href: "/gioi-thieu/co-so-vat-chat" },
];

export const DEFAULT_NEWS_NAV: SiteLink[] = [
  { label: "Kiến Thức", href: "/tin-tuc/kien-thuc" },
  { label: "Tin Tức", href: "/tin-tuc/tin-tuc" },
];

export const DEFAULT_CONTACT_PAGE: SiteContactPage = {
  eyebrow: "Liên hệ",
  title: "Liên hệ Thiên Hoàng Kim",
  description: "Đặt lịch tư vấn miễn phí hoặc liên hệ qua các kênh bên dưới.",
};

export const DEFAULT_PRICE_LIST_PAGE: SitePageHero = {
  eyebrow: "Bảng giá",
  title: "Bảng giá tham khảo",
  description:
    "Danh sách dịch vụ Thiên Hoàng Kim. Liên hệ hotline hoặc Zalo để được báo giá chi tiết theo phác đồ cá nhân.",
};

export const DEFAULT_SERVICES_HUB_PAGE: SitePageHero = {
  eyebrow: "Dịch vụ",
  title: "Dịch vụ thẩm mỹ",
  description: "Giải pháp thẩm mỹ y khoa và spa chăm sóc da chuyên sâu.",
};

export const DEFAULT_CUSTOMERS_PAGE: SitePageHero = {
  eyebrow: "Khách hàng",
  title: "Khách hàng thực tế",
  description: "Hình ảnh trước – sau từ khách hàng đã trải nghiệm dịch vụ tại Thiên Hoàng Kim.",
};

export const DEFAULT_DOCTORS_PAGE: SitePageHero = {
  eyebrow: "Giới thiệu",
  title: "Đội ngũ bác sĩ",
  description: "Bác sĩ chuyên môn cao, tận tâm và giàu kinh nghiệm trong lĩnh vực thẩm mỹ.",
};
