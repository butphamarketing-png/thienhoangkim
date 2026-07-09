import { formatPhoneDisplay } from "@/lib/format-phone";

export function buildTelUrl(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits ? `tel:${digits}` : "tel:";
}

export function buildZaloUrl(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits ? `https://zalo.me/${digits}` : "https://zalo.me/";
}

export function buildMapsUrl(address: string): string {
  const q = address.trim();
  return q
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`
    : "https://www.google.com/maps";
}

export function buildMessengerUrl(slug: string): string {
  const s = slug.trim().replace(/^@/, "");
  return s ? `https://m.me/${s}` : "https://m.me/";
}

export function phoneDisplay(phone: string): string {
  return formatPhoneDisplay(phone);
}
