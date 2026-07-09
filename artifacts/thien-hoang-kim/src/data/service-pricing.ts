import type { SiteContent } from "@/types/site-content";
import type { ServiceCategoryId } from "@/types/site-content";
import { buildServicePriceGroups as buildFromCms } from "@/lib/site-cms";

export type ServicePriceItem = {
  slug: string;
  label: string;
  description?: string;
  priceText?: string;
  href: string;
};

export type ServicePriceGroup = {
  categoryId: ServiceCategoryId;
  eyebrow: string;
  title: string;
  items: ServicePriceItem[];
};

export function buildServicePriceGroups(content?: SiteContent): ServicePriceGroup[] {
  return buildFromCms(content ?? ({} as SiteContent));
}
