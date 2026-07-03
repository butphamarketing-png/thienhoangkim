import { ALL_PAGES } from "@/data/pages.defaults";
import { SERVICE_CATEGORIES, SERVICE_ITEMS } from "@/data/services-catalog";
import type {
  ServiceCategoryId,
  SiteContactPage,
  SiteLink,
  SitePage,
  SiteServiceCategory,
  SiteServiceItem,
} from "@/types/site-content";

const MANAGED_PAGE_PREFIX = "/gioi-thieu";

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
