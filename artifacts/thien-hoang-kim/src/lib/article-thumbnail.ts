const THAM_MY_TOPIC =
  /nang-mui|cat-mi|cay-toc|cang-noi|cang-chi|filler|botox|phau-thuat|sua-mui|thu-gon-canh|tai-nang|tham-my|nâng mũi|cắt mí|cấy tóc|tiêm filler|tiêm botox|gọn hàm|hút mỡ|nội soi|tre-hoa|tre hoa/i;

const SPA_TOPIC =
  /phun-moi|phun-may|phun-xam|massage|peel|cham-soc-da|facial|u-da|tri-nam|mun-an|spa|gội đầu|soi da/i;

export function isThamMyTopicArticle(slug: string, title: string, body?: string): boolean {
  if (THAM_MY_TOPIC.test(slug) || THAM_MY_TOPIC.test(title)) return true;
  if (body?.includes("/tham-my/")) return true;
  return false;
}

export function isSpaTopicArticle(slug: string, title: string, body?: string): boolean {
  if (SPA_TOPIC.test(slug) || SPA_TOPIC.test(title)) return true;
  if (body?.includes("/spa/")) return true;
  return false;
}

export function imageForKeywordPillar(pillar: string, thamMyImage: string, spaImage: string, fallback: string): string {
  if (pillar.startsWith("/tham-my") || pillar === "/bang-gia") return thamMyImage;
  if (pillar.startsWith("/spa")) return spaImage;
  if (pillar === "/tin-tuc" || pillar === "/lien-he") return thamMyImage;
  return fallback;
}
