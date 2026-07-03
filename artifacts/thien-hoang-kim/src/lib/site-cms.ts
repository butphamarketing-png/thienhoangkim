import type { NavItem } from "@/config/navigation";
import {
  buildDefaultServiceCategories,
  buildDefaultServiceItems,
  buildDefaultSitePages,
  DEFAULT_CONTACT_PAGE,
  DEFAULT_INTRO_NAV,
  DEFAULT_NEWS_NAV,
} from "@/data/cms-defaults";
import type { ServiceCategoryId } from "@/types/site-content";
import type { SiteContent, SitePage, SitePageBlock, SiteServiceItem } from "@/types/site-content";

export type ResolvedPageContent = {
  title: string;
  eyebrow?: string;
  description: string;
  blocks: SitePageBlock[];
};

export type ResolvedServiceCatalogItem = {
  slug: string;
  label: string;
  articleSlug?: string;
  description?: string;
  image?: string;
};

const LEGACY_SLUG_REDIRECT: Record<string, { category: ServiceCategoryId; slug: string }> = {
  "nang-mui": { category: "tham-my", slug: "nang-mui-hoang-kim" },
  "cat-mi": { category: "tham-my", slug: "cat-mi-phuong-hoang" },
  filler: { category: "tham-my", slug: "filler-tao-hinh" },
  botox: { category: "tham-my", slug: "botox-xoa-nhan-gon-ham" },
  "cang-chi": { category: "tham-my", slug: "cang-chi-tre-hoa" },
  "cham-soc-da": { category: "spa", slug: "cham-soc-da-toan-dien" },
  facial: { category: "spa", slug: "massage-facial" },
  massage: { category: "spa", slug: "massage-body-thu-gian" },
};

function pagesFromContent(content: SiteContent): SitePage[] {
  return content.pages?.length ? content.pages : buildDefaultSitePages();
}

function categoriesFromContent(content: SiteContent) {
  return content.serviceCategories?.length ? content.serviceCategories : buildDefaultServiceCategories();
}

function itemsFromContent(content: SiteContent): SiteServiceItem[] {
  return content.serviceItems?.length ? content.serviceItems : buildDefaultServiceItems();
}

export function resolvePageContent(content: SiteContent, path: string): ResolvedPageContent | null {
  const normalized = path.replace(/\/$/, "") || "/";
  const page = pagesFromContent(content).find((p) => p.path === normalized);
  if (!page) return null;
  return {
    title: page.title,
    eyebrow: page.eyebrow,
    description: page.description,
    blocks: page.blocks,
  };
}

export function resolvePagePaths(content: SiteContent): string[] {
  return pagesFromContent(content).map((p) => p.path);
}

export function resolveServiceCategories(content: SiteContent) {
  const map = {} as Record<
    ServiceCategoryId,
    {
      id: ServiceCategoryId;
      path: string;
      title: string;
      eyebrow: string;
      description: string;
      articleSlug?: string;
    }
  >;
  for (const cat of categoriesFromContent(content)) {
    if (!cat.published) continue;
    map[cat.id] = {
      id: cat.id,
      path: cat.path,
      title: cat.title,
      eyebrow: cat.eyebrow,
      description: cat.description,
      articleSlug: cat.articleSlug,
    };
  }
  return map;
}

export function resolveServiceItems(
  content: SiteContent,
  categoryId: ServiceCategoryId,
): ResolvedServiceCatalogItem[] {
  return itemsFromContent(content)
    .filter((i) => i.categoryId === categoryId && i.published)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((i) => ({
      slug: i.slug,
      label: i.label,
      articleSlug: i.articleSlug,
      description: i.description,
      image: i.image,
    }));
}

export function getServiceHref(categoryId: ServiceCategoryId, slug: string, content?: SiteContent) {
  const categories = content ? resolveServiceCategories(content) : resolveServiceCategories({} as SiteContent);
  const base = categories[categoryId]?.path ?? (categoryId === "tham-my" ? "/tham-my" : "/spa");
  return `${base}/${slug}`;
}

export function getServiceItem(content: SiteContent, categoryId: ServiceCategoryId, slug: string) {
  const item = itemsFromContent(content).find((i) => i.categoryId === categoryId && i.slug === slug && i.published);
  if (!item) return null;
  return {
    slug: item.slug,
    label: item.label,
    articleSlug: item.articleSlug,
    description: item.description,
    image: item.image,
  };
}

export function findServiceByArticleSlug(content: SiteContent, articleSlug: string) {
  const item = itemsFromContent(content).find((i) => i.articleSlug === articleSlug && i.published);
  if (!item) return null;
  return { category: item.categoryId, item: getServiceItem(content, item.categoryId, item.slug)! };
}

const CATEGORY_ARTICLE_PATH: Record<string, string> = {
  "dich-vu-tham-my-y-khoa": "/tham-my",
  "dich-vu-spa-cham-soc": "/spa",
};

export function getCategoryPathForArticle(articleSlug: string): string | null {
  return CATEGORY_ARTICLE_PATH[articleSlug] ?? null;
}

export function getPreferredArticlePath(content: SiteContent, articleSlug: string): string | null {
  const service = findServiceByArticleSlug(content, articleSlug);
  if (service) return getServiceHref(service.category, service.item.slug, content);
  return getCategoryPathForArticle(articleSlug);
}

export function getArticlePublicPath(content: SiteContent, articleSlug: string): string {
  return getPreferredArticlePath(content, articleSlug) ?? `/tin-tuc/${articleSlug}`;
}

export function isServiceLinkedArticle(content: SiteContent, articleSlug: string): boolean {
  return Boolean(findServiceByArticleSlug(content, articleSlug) || getCategoryPathForArticle(articleSlug));
}

export function resolveLegacyServicePath(content: SiteContent, path: string): string | null {
  const match = path.match(/^\/dich-vu\/([^/]+)$/);
  if (!match) return null;
  const slug = match[1];

  const legacy = LEGACY_SLUG_REDIRECT[slug];
  if (legacy) return getServiceHref(legacy.category, legacy.slug, content);

  const categories = resolveServiceCategories(content);
  for (const categoryId of Object.keys(categories) as ServiceCategoryId[]) {
    if (getServiceItem(content, categoryId, slug)) return getServiceHref(categoryId, slug, content);
  }
  return null;
}

export function buildMainNav(content: SiteContent): NavItem[] {
  const categories = resolveServiceCategories(content);
  const introNav = content.introNav?.length ? content.introNav : DEFAULT_INTRO_NAV;
  const newsNav = content.newsNav?.length ? content.newsNav : DEFAULT_NEWS_NAV;

  const serviceColumns = (["tham-my", "spa"] as ServiceCategoryId[])
    .filter((id) => categories[id])
    .map((id) => ({
      title: categories[id].title,
      items: resolveServiceItems(content, id).map((item) => ({
        label: item.label,
        href: getServiceHref(id, item.slug, content),
      })),
    }));

  return [
    { label: "TRANG CHỦ", href: "/" },
    { label: "GIỚI THIỆU", href: "/gioi-thieu", children: introNav },
    { label: "DỊCH VỤ", href: "/dich-vu", columns: serviceColumns },
    { label: "KHÁCH HÀNG", href: "/khach-hang" },
    { label: "BẢNG GIÁ", href: "/bang-gia" },
    { label: "TIN TỨC", href: "/tin-tuc", children: newsNav },
    { label: "LIÊN HỆ", href: "/lien-he" },
  ];
}

export function resolveContactPage(content: SiteContent) {
  return content.contactPage ?? DEFAULT_CONTACT_PAGE;
}

export function buildServicePriceGroups(content: SiteContent) {
  const categories = resolveServiceCategories(content);
  return (Object.keys(categories) as ServiceCategoryId[]).map((categoryId) => {
    const category = categories[categoryId];
    return {
      categoryId,
      eyebrow: category.eyebrow,
      title: category.title,
      items: resolveServiceItems(content, categoryId).map((item) => ({
        slug: item.slug,
        label: item.label,
        description: item.description,
        href: getServiceHref(categoryId, item.slug, content),
      })),
    };
  });
}
