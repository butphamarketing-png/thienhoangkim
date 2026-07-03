import {
  SERVICE_CATEGORIES,
  SERVICE_ITEMS,
  getServiceHref,
  type ServiceCategoryId,
} from "@/data/services-catalog";

export type ServicePriceItem = {
  slug: string;
  label: string;
  description?: string;
  price: string;
  href: string;
};

/** Giá tham khảo theo từng dịch vụ — cập nhật sau tư vấn trực tiếp */
const PRICE_BY_SLUG: Record<string, string> = {
  "nang-mui-hoang-kim": "từ 45.000.000đ",
  "cat-mi-phuong-hoang": "từ 8.000.000đ",
  "cay-toc-tu-than": "từ 25.000.000đ",
  "cang-noi-soi": "từ 35.000.000đ",
  "cang-chi-tre-hoa": "từ 8.000.000đ",
  "filler-tao-hinh": "từ 3.000.000đ / vùng",
  "botox-xoa-nhan-gon-ham": "từ 3.000.000đ / vùng",
  "u-da-muoi-himalaya": "từ 800.000đ",
  "phun-xam-tham-my": "từ 2.500.000đ",
  "massage-body-thu-gian": "từ 600.000đ",
  "massage-facial": "từ 500.000đ",
  "cham-soc-da-toan-dien": "từ 500.000đ",
};

export type ServicePriceGroup = {
  categoryId: ServiceCategoryId;
  eyebrow: string;
  title: string;
  items: ServicePriceItem[];
};

export function buildServicePriceGroups(): ServicePriceGroup[] {
  return (Object.keys(SERVICE_ITEMS) as ServiceCategoryId[]).map((categoryId) => {
    const category = SERVICE_CATEGORIES[categoryId];
    return {
      categoryId,
      eyebrow: category.eyebrow,
      title: category.title,
      items: SERVICE_ITEMS[categoryId].map((item) => ({
        slug: item.slug,
        label: item.label,
        description: item.description,
        price: PRICE_BY_SLUG[item.slug] ?? "Liên hệ báo giá",
        href: getServiceHref(categoryId, item.slug),
      })),
    };
  });
}
