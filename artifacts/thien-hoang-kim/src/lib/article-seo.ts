import { containsKeyphrase } from "@/lib/seo-analysis";

/** Alt ảnh đại diện — ưu tiên chứa focus keyphrase */
export function buildHeroImageAlt(focusKeyphrase: string, title: string): string {
  const kp = focusKeyphrase.trim();
  const t = title.trim();
  if (!kp) return t || "Thiên Hoàng Kim Aesthetic Clinic";
  if (t && containsKeyphrase(t, kp)) return t;
  if (t) return `${kp} — ${t}`;
  return kp;
}

export function extractH2FromBody(body: string): string[] {
  return body
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => line.slice(3).trim());
}

export function extractImageAltsFromBody(body: string): string[] {
  const alts: string[] = [];
  for (const m of body.matchAll(/!\[([^\]]*)\]\(/g)) {
    alts.push(m[1] ?? "");
  }
  return alts;
}

export function collectArticleImageAlts(body: string, heroImageAlt: string): string[] {
  return [heroImageAlt, ...extractImageAltsFromBody(body)].filter(Boolean);
}
