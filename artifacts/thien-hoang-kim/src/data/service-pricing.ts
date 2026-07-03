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
  href: string;
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
        href: getServiceHref(categoryId, item.slug),
      })),
    };
  });
}
