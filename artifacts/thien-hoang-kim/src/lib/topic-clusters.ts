import { getArticlePublicPath, isServiceLinkedArticle } from "@/lib/site-cms";
import type { SiteArticle, SiteContent } from "@/types/site-content";

export type TopicCluster = {
  id: string;
  label: string;
  pillar: string;
  pillarLabel: string;
  slugTest: RegExp;
};

export const TOPIC_CLUSTERS: TopicCluster[] = [
  {
    id: "nang-mui",
    label: "Nâng mũi",
    pillar: "/tham-my/nang-mui-hoang-kim",
    pillarLabel: "Nâng mũi hoàng kim",
    slugTest: /^(nang-mui|mui-|song-mui|phau-thuat-mui|sua-mui|thu-gon-canh|dau-mui)/,
  },
  {
    id: "cat-mi",
    label: "Cắt mí & mắt",
    pillar: "/tham-my/cat-mi-phuong-hoang",
    pillarLabel: "Cắt mí phượng hoàng",
    slugTest: /^(cat-mi|nhan-mi|bam-mi|mi-|mat-|mo-goc|lay-mo-mi)/,
  },
  {
    id: "cay-toc",
    label: "Cấy tóc",
    pillar: "/tham-my/cay-toc-tu-than",
    pillarLabel: "Cấy tóc tự thân",
    slugTest: /^(cay-toc|hoi-dau|rung-toc|toc-|fue-|prp-toc)/,
  },
  {
    id: "tre-hoa",
    label: "Trẻ hóa & căng chỉ",
    pillar: "/tham-my/cang-chi-tre-hoa",
    pillarLabel: "Căng chỉ trẻ hóa",
    slugTest: /^(cang-chi|cang-noi|tre-hoa|hifu|nang-co|thread-lift|rf-tre)/,
  },
  {
    id: "filler",
    label: "Filler",
    pillar: "/tham-my/filler-tao-hinh",
    pillarLabel: "Filler tạo hình",
    slugTest: /^(filler|tiem-filler|tiem-moi|moi-|cam-|song-mui-filler)/,
  },
  {
    id: "botox",
    label: "Botox",
    pillar: "/tham-my/botox-xoa-nhan-gon-ham",
    pillarLabel: "Botox xóa nhăn",
    slugTest: /^(botox|tiem-botox|xoa-nhan|thon-ham|gon-ham|nhan-)/,
  },
  {
    id: "tri-da",
    label: "Trị da & mụn nám",
    pillar: "/spa/cham-soc-da-toan-dien",
    pillarLabel: "Chăm sóc da toàn diện",
    slugTest: /^(tri-mun|tri-nam|tri-tan|mun-|nam-|peel|laser|melasma|skincare|retinol|da-|vitamin-c)/,
  },
  {
    id: "phun-xam",
    label: "Phun xăm",
    pillar: "/spa/phun-xam-tham-my",
    pillarLabel: "Phun xăm thẩm mỹ",
    slugTest: /^(phun-|xam-|xoa-xam|eyeliner|microblading)/,
  },
  {
    id: "spa",
    label: "Spa & massage",
    pillar: "/spa/massage-body-thu-gian",
    pillarLabel: "Massage body thư giãn",
    slugTest: /^(spa-|massage|goi-|tam-|u-da|himalaya|detox|facial)/,
  },
  {
    id: "gia",
    label: "Giá & chi phí",
    pillar: "/bang-gia",
    pillarLabel: "Bảng giá tham khảo",
    slugTest: /^(gia-|chi-phi|bang-gia|bao-gia|combo-|goi-gia)/,
  },
  {
    id: "local",
    label: "Thẩm mỹ Quận 5 & An Đông",
    pillar: "/tin-tuc/dia-chi-tham-my-quan-5-an-dong",
    pillarLabel: "Địa chỉ thẩm mỹ Q5 An Đông",
    slugTest: /(tphcm|tp-hcm|an-dong|quan-|phong-kham|clinic-|cho-lon|hung-vuong|gan-day|tham-my-q)/,
  },
];

/** Bài nổi bật trên hub — owned content ưu tiên ranking */
export const CLUSTER_FEATURED_SLUGS: Record<string, string[]> = {
  "nang-mui": [
    "nang-mui-quan-5-an-dong",
    "nang-mui-co-dau-khong",
    "cham-soc-sau-nang-mui",
    "gia-nang-mui-bao-nhieu",
  ],
  "cat-mi": ["cat-mi-quan-5-an-dong", "cat-mi-bao-lau-hoi-phuc", "cham-soc-sau-cat-mi", "sung-sau-cat-mi"],
  filler: ["filler-quan-5-an-dong", "filler-va-botox-khac-nhau", "filler-moi-tu-nhien"],
  local: [
    "dia-chi-tham-my-quan-5-an-dong",
    "top-phong-kham-quan-5",
    "phong-kham-tham-my-an-dong",
    "tham-my-quan-5",
    "phong-kham-tham-my-quan-5",
    "nang-mui-quan-5-an-dong",
    "filler-quan-5-an-dong",
    "cat-mi-quan-5-an-dong",
    "chon-phong-kham-tham-my-an-toan",
  ],
};

export const CLUSTER_HUB_INTRO: Record<string, string> = {
  "nang-mui":
    "Tổng hợp kiến thức nâng mũi tại Thiên Hoàng Kim — từ tư vấn, quy trình, hồi phục đến giá tham khảo. Phòng khám **323–325 Hùng Vương, An Đông, Quận 5** — hotline **0938 673 996**.",
  "cat-mi":
    "Cắt mí, nhấn mí và chăm sóc sau mổ — bài viết từ bác sĩ Thiên Hoàng Kim An Đông. Đặt lịch tư vấn miễn phí tại Quận 5.",
  filler:
    "Filler mũi, môi, cằm — giải thích an toàn, giá minh bạch và tiêm đúng liều tại **Thiên Hoàng Kim Hùng Vương**.",
  local:
    "Thẩm mỹ uy tín **Quận 5, An Đông, Hùng Vương** — checklist chọn phòng khám, địa chỉ và dịch vụ tại Thiên Hoàng Kim.",
};

const SERVICE_SLUG_TO_CLUSTER: Record<string, string> = {
  "nang-mui-hoang-kim": "nang-mui",
  "cat-mi-phuong-hoang": "cat-mi",
  "cay-toc-tu-than": "cay-toc",
  "cang-noi-soi": "tre-hoa",
  "cang-chi-tre-hoa": "tre-hoa",
  "filler-tao-hinh": "filler",
  "botox-xoa-nhan-gon-ham": "botox",
  "cham-soc-da-toan-dien": "tri-da",
  "phun-xam-tham-my": "phun-xam",
  "massage-body-thu-gian": "spa",
  "massage-facial": "spa",
  "u-da-muoi-himalaya": "spa",
};

export function getClusterById(id: string): TopicCluster | undefined {
  return TOPIC_CLUSTERS.find((c) => c.id === id);
}

export function matchClusterBySlug(slug: string): TopicCluster | undefined {
  const serviceCluster = SERVICE_SLUG_TO_CLUSTER[slug];
  if (serviceCluster) return getClusterById(serviceCluster);

  for (const cluster of TOPIC_CLUSTERS) {
    if (cluster.slugTest.test(slug)) return cluster;
  }
  return undefined;
}

export function clusterHubPath(clusterId: string): string {
  return `/tin-tuc/chu-de/${clusterId}`;
}

function articleMatchesCluster(article: SiteArticle, cluster: TopicCluster): boolean {
  if (cluster.slugTest.test(article.slug)) return true;
  const focus = (article.seo?.focusKeyphrase ?? article.title).toLowerCase();
  const focusSlug = focus.replace(/\s+/g, "-");
  return cluster.slugTest.test(focusSlug);
}

export function getClusterArticles(
  content: SiteContent,
  clusterId: string,
  opts?: { excludeSlugs?: string[]; limit?: number },
): SiteArticle[] {
  const cluster = getClusterById(clusterId);
  if (!cluster) return [];

  const exclude = new Set(opts?.excludeSlugs ?? []);
  const limit = opts?.limit ?? 200;

  return content.articles
    .filter(
      (a) =>
        a.published &&
        !exclude.has(a.slug) &&
        !isServiceLinkedArticle(content, a.slug) &&
        articleMatchesCluster(a, cluster),
    )
    .slice(0, limit);
}

export function getRelatedArticles(
  content: SiteContent,
  currentSlug: string,
  limit = 6,
): { cluster: TopicCluster | undefined; articles: SiteArticle[] } {
  const cluster = matchClusterBySlug(currentSlug);
  if (!cluster) {
    return { cluster: undefined, articles: [] };
  }

  const articles = getClusterArticles(content, cluster.id, {
    excludeSlugs: [currentSlug],
    limit: limit + 4,
  })
    .filter((a) => a.slug !== currentSlug)
    .slice(0, limit);

  return { cluster, articles };
}

export function getRelatedForService(
  content: SiteContent,
  serviceSlug: string,
  limit = 8,
): { cluster: TopicCluster | undefined; articles: SiteArticle[] } {
  const clusterId = SERVICE_SLUG_TO_CLUSTER[serviceSlug];
  if (!clusterId) return { cluster: undefined, articles: [] };

  const cluster = getClusterById(clusterId);
  const articles = getClusterArticles(content, clusterId, {
    excludeSlugs: [serviceSlug],
    limit,
  });

  return { cluster, articles };
}

export function getFeaturedClusterArticles(
  content: SiteContent,
  clusterId: string,
): SiteArticle[] {
  const slugs = CLUSTER_FEATURED_SLUGS[clusterId] ?? [];
  const bySlug = new Map(content.articles.map((a) => [a.slug, a]));
  return slugs.map((s) => bySlug.get(s)).filter((a): a is SiteArticle => Boolean(a?.published));
}

export function getClusterHubIntro(clusterId: string): string | undefined {
  return CLUSTER_HUB_INTRO[clusterId];
}

export function getLocalArticlesForService(
  content: SiteContent,
  serviceSlug: string,
): SiteArticle[] {
  const map: Record<string, string> = {
    "nang-mui-hoang-kim": "nang-mui-quan-5-an-dong",
    "filler-tao-hinh": "filler-quan-5-an-dong",
    "cat-mi-phuong-hoang": "cat-mi-quan-5-an-dong",
  };
  const slug = map[serviceSlug];
  if (!slug) return [];
  const article = content.articles.find((a) => a.slug === slug && a.published);
  return article ? [article] : [];
}

export function articleHref(content: SiteContent, slug: string): string {
  return getArticlePublicPath(content, slug);
}
