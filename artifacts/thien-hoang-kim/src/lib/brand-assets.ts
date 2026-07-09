import type { SiteSettings } from "@/types/site-content";

export const publicAsset = (file: string) =>
  `${import.meta.env.BASE_URL}${file}`.replace(/([^:]\/)\/+/g, "$1");

export const LOGO_ICON_SRC = publicAsset("logo.tachnen.png");

export function resolveLogoUrl(settings: Pick<SiteSettings, "logoUrl">): string {
  return settings.logoUrl?.trim() || LOGO_ICON_SRC;
}
