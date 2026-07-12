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
    label: "Thẩm mỹ TP.HCM",
    pillar: "/lien-he",
    pillarLabel: "Liên hệ đặt lịch",
    slugTest: /(tphcm|tp-hcm|an-dong|quan-|phong-kham|clinic-|cho-lon|hung-vuong|gan-day)/,
  },
];

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

export function articleHref(content: SiteContent, slug: string): string {
  return getArticlePublicPath(content, slug);
}
