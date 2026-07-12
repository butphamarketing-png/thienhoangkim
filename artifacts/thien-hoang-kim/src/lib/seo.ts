import { getPageContent } from "@/data/pages.defaults";
import {
  SERVICE_CATEGORIES,
  getPreferredArticlePath,
  getServiceItem,
  resolveLegacyServicePath,
} from "@/data/services-catalog";
import { buildBreadcrumbs, buildJsonLdGraph, jsonLdScript, type SchemaContext } from "@/lib/seo-schema";
import { extractFaqFromBody } from "@/lib/faq-schema";
import { getSiteBaseUrl } from "@/lib/seo-sitemap";
import { getClusterById } from "@/lib/topic-clusters";
import {
  buildAttractiveMetaDescription,
  isLegacyAutoMetaDescription,
  routeMetaDescription,
} from "@/lib/meta-description";
import { buildAttractiveMetaTitle, isLegacyAutoMetaTitle, routeMetaTitle } from "@/lib/meta-title";
import { routePathToDisplayTitle } from "@/lib/slug";
import type { ArticleSeo, SiteArticle, SiteContent, SiteSeo } from "@/types/site-content";

export type { SchemaContext } from "@/lib/seo-schema";

export type PageSeoMeta = {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType: string;
  twitterCard: string;
  robots: string;
  canonical: string;
};

export const SEO_TITLE_MAX = 60;
export const SEO_DESCRIPTION_MAX = 160;

export const DEFAULT_ARTICLE_SEO: ArticleSeo = {
  metaTitle: "",
  metaDescription: "",
  focusKeyphrase: "",
  keywords: "",
  canonicalUrl: "",
  ogImage: "",
  ogTitle: "",
  ogDescription: "",
  robots: "index,follow",
  noindex: false,
  nofollow: false,
};

export function buildRobotsDirective(seo: Pick<ArticleSeo, "noindex" | "nofollow" | "robots">, fallback: string) {
  if (seo.noindex && seo.nofollow) return "noindex,nofollow";
  if (seo.noindex) return "noindex,follow";
  if (seo.nofollow) return "index,nofollow";
  return seo.robots?.trim() || fallback || "index,follow";
}

function toAbsoluteUrl(path: string, siteUrl?: string): string {
  const origin = getSiteBaseUrl(siteUrl);
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const withBase = basePath ? `${basePath}${normalized}` : normalized;
  return `${origin}${withBase}`;
}

/** Chuẩn hoá canonical cũ (domain vercel) sang path tương đối */
function normalizeCanonicalInput(url: string, siteUrl: string): string {
  const trimmed = url.trim();
  if (!trimmed) return trimmed;
  if (/thienhoangkim\.vercel\.app/i.test(trimmed)) {
    try {
      const { pathname } = new URL(trimmed);
      return pathname;
    } catch {
      return trimmed;
    }
  }
  if (trimmed.startsWith("http")) return trimmed;
  return toAbsoluteUrl(trimmed, siteUrl);
}

function pick(...values: (string | undefined)[]): string {
  for (const v of values) {
    if (v?.trim()) return v.trim();
  }
  return "";
}

function buildTitle(pageTitle: string, siteName: string, separator = " | "): string {
  const name = siteName || "Thiên Hoàng Kim";
  if (!pageTitle) return name;
  if (pageTitle.includes(name)) return pageTitle;
  return `${pageTitle}${separator}${name}`;
}

function resolveStaticRouteTitle(path: string, fallback: string, global: SiteSeo): string {
  return routeMetaTitle(path) ?? buildTitle(fallback, global.siteName, global.titleSeparator || " | ");
}

function absolutizeOgImage(image: string, siteUrl?: string): string {
  const trimmed = image?.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("http")) return trimmed;
  return toAbsoluteUrl(trimmed, siteUrl);
}

function finalizePageSeoMeta(meta: PageSeoMeta, global: SiteSeo): PageSeoMeta {
  return {
    ...meta,
    ogImage: absolutizeOgImage(meta.ogImage, global.siteUrl),
  };
}

function resolveStaticRouteDescription(path: string, fallback: string, global: SiteSeo): string {
  return (
    routeMetaDescription(path) ??
    (buildAttractiveMetaDescription({ path, summary: fallback }) || pick(fallback, global.description))
  );
}

function baseFromGlobal(global: SiteSeo, path: string): PageSeoMeta {
  const siteName = global.siteName || "Thiên Hoàng Kim Aesthetic Clinic";
  const title = global.title || siteName;
  const description = global.description || "";
  const ogTitle = pick(global.ogTitle, title);
  const ogDescription = pick(global.ogDescription, description);
  const ogImage = global.ogImage || "";
  const canonical = toAbsoluteUrl(path || "/", global.siteUrl);

  return {
    title,
    description,
    keywords: global.keywords || "",
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl: canonical,
    ogType: "website",
    twitterCard: global.twitterCard || "summary_large_image",
    robots: global.robots || "index,follow",
    canonical,
  };
}

export function resolveArticleSeo(
  article: SiteArticle,
  global: SiteSeo,
  path: string,
): PageSeoMeta {
  const siteName = global.siteName || "Thiên Hoàng Kim Aesthetic Clinic";
  const seo = article.seo ?? DEFAULT_ARTICLE_SEO;
  const sep = global.titleSeparator || " | ";
  const customMeta = pick(seo.metaTitle);
  const title =
    customMeta && !isLegacyAutoMetaTitle(customMeta, article.slug)
      ? customMeta
      : buildAttractiveMetaTitle({ slug: article.slug, displayTitle: article.title, path });
  const customDesc = pick(seo.metaDescription);
  const description =
    customDesc && !isLegacyAutoMetaDescription(customDesc, article.slug, seo.focusKeyphrase)
      ? customDesc
      : buildAttractiveMetaDescription({
          slug: article.slug,
          displayTitle: article.title,
          path,
          focusKeyphrase: seo.focusKeyphrase,
          summary: article.description,
        });
  const keywords = pick(seo.keywords, seo.focusKeyphrase, global.keywords);
  const ogImage = pick(seo.ogImage, article.image, global.ogImage);
  const ogTitle = pick(seo.ogTitle, seo.metaTitle, article.title, global.ogTitle, title);
  const ogDescription = pick(seo.ogDescription, seo.metaDescription, article.description, global.ogDescription, description);
  const preferredPath = getPreferredArticlePath(article.slug);
  const canonicalPath =
    seo.canonicalUrl?.trim()
      ? (() => {
          const normalized = normalizeCanonicalInput(seo.canonicalUrl, global.siteUrl);
          return normalized.startsWith("http")
            ? normalized
            : toAbsoluteUrl(normalized, global.siteUrl);
        })()
      : preferredPath && path.startsWith("/tin-tuc/")
        ? toAbsoluteUrl(preferredPath, global.siteUrl)
        : toAbsoluteUrl(path, global.siteUrl);

  const isDuplicateTinTuc = Boolean(preferredPath && path.startsWith("/tin-tuc/"));

  return {
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl: canonicalPath,
    ogType: "article",
    twitterCard: global.twitterCard || "summary_large_image",
    robots: isDuplicateTinTuc ? "noindex,follow" : buildRobotsDirective(seo, global.robots || "index,follow"),
    canonical: canonicalPath,
  };
}

export function resolveServiceSeo(
  opts: {
    serviceLabel: string;
    description: string;
    image: string;
    path: string;
    global: SiteSeo;
    article?: SiteArticle;
    categoryLabel?: string;
  },
): PageSeoMeta {
  if (opts.article) {
    return resolveArticleSeo(opts.article, opts.global, opts.path);
  }

  const slug = opts.path.split("/").pop() ?? "";
  const siteName = opts.global.siteName || "Thiên Hoàng Kim Aesthetic Clinic";
  const title = slug
    ? buildAttractiveMetaTitle({ slug, displayTitle: opts.serviceLabel, path: opts.path })
    : buildTitle(`${opts.serviceLabel} — ${opts.categoryLabel ?? "Dịch vụ thẩm mỹ"}`, siteName, opts.global.titleSeparator);
  const description = slug
    ? buildAttractiveMetaDescription({
        slug,
        displayTitle: opts.serviceLabel,
        path: opts.path,
        summary: opts.description,
      })
    : pick(opts.description, opts.global.description);
  const canonical = toAbsoluteUrl(opts.path, opts.global.siteUrl);

  return {
    title,
    description,
    keywords: opts.global.keywords || "",
    ogTitle: title,
    ogDescription: description,
    ogImage: pick(opts.image, opts.global.ogImage),
    ogUrl: canonical,
    ogType: "website",
    twitterCard: opts.global.twitterCard || "summary_large_image",
    robots: opts.global.robots || "index,follow",
    canonical,
  };
}

function findArticleForPath(path: string, content: SiteContent): SiteArticle | undefined {
  const clean = path.split("#")[0] || "/";
  const articleMatch = clean.match(/^\/tin-tuc\/([^/]+)$/);
  if (articleMatch) {
    return content.articles.find((a) => a.slug === articleMatch[1] && a.published);
  }
  return undefined;
}

function isPublicRoute(path: string, content: SiteContent): boolean {
  const clean = path.split("#")[0] || "/";
  if (clean === "/") return true;

  const staticRoutes = new Set([
    "/lien-he",
    "/khach-hang",
    "/dich-vu",
    "/tham-my",
    "/spa",
    "/bang-gia",
    "/tin-tuc",
    "/tin-tuc/kien-thuc",
    "/tin-tuc/tin-tuc",
    "/gioi-thieu",
    "/gioi-thieu/doi-ngu-bac-si",
  ]);
  if (staticRoutes.has(clean)) return true;
  if (getPageContent(clean)) return true;

  const thamMyMatch = clean.match(/^\/tham-my\/([^/]+)$/);
  if (thamMyMatch) return Boolean(getServiceItem("tham-my", thamMyMatch[1]));

  const spaMatch = clean.match(/^\/spa\/([^/]+)$/);
  if (spaMatch) return Boolean(getServiceItem("spa", spaMatch[1]));

  const articleMatch = clean.match(/^\/tin-tuc\/([^/]+)$/);
  if (articleMatch) {
    return Boolean(content.articles.find((a) => a.slug === articleMatch[1] && a.published));
  }

  const clusterMatch = clean.match(/^\/tin-tuc\/chu-de\/([^/]+)$/);
  if (clusterMatch) return Boolean(getClusterById(clusterMatch[1]));

  if (clean.startsWith("/dich-vu/")) return Boolean(resolveLegacyServicePath(clean));

  return false;
}

export function resolveRouteSeoContext(path: string, content: SiteContent): SchemaContext {
  const clean = path.split("#")[0] || "/";
  const global = content.settings.seo;
  const meta = finalizePageSeoMeta(resolveRouteSeo(clean, content), global);
  let article = findArticleForPath(clean, content);
  let service: SchemaContext["service"];

  const thamMyMatch = clean.match(/^\/tham-my\/([^/]+)$/);
  if (thamMyMatch) {
    const svc = getServiceItem("tham-my", thamMyMatch[1]);
    if (svc) {
      service = { label: svc.label, categoryLabel: SERVICE_CATEGORIES["tham-my"].eyebrow };
      if (!article && svc.articleSlug) {
        article = content.articles.find((a) => a.slug === svc.articleSlug && a.published);
      }
    }
  }

  const spaMatch = clean.match(/^\/spa\/([^/]+)$/);
  if (spaMatch) {
    const svc = getServiceItem("spa", spaMatch[1]);
    if (svc) {
      service = { label: svc.label, categoryLabel: SERVICE_CATEGORIES.spa.eyebrow };
      if (!article && svc.articleSlug) {
        article = content.articles.find((a) => a.slug === svc.articleSlug && a.published);
      }
    }
  }

  if (!article && clean === "/tham-my") {
    const slug = SERVICE_CATEGORIES["tham-my"].articleSlug;
    if (slug) article = content.articles.find((a) => a.slug === slug && a.published);
  }
  if (!article && clean === "/spa") {
    const slug = SERVICE_CATEGORIES.spa.articleSlug;
    if (slug) article = content.articles.find((a) => a.slug === slug && a.published);
  }

  const siteName = content.settings.seo.siteName || content.settings.clinicName;
  const siteUrl = getSiteBaseUrl(global.siteUrl);
  const breadcrumbs = buildBreadcrumbs(clean, siteName, article, siteUrl);
  const faq = article?.body ? extractFaqFromBody(article.body) : undefined;
  return { path: clean, meta, breadcrumbs, article, service, faq };
}

export function resolveRouteSeo(path: string, content: SiteContent): PageSeoMeta {
  const global = content.settings.seo;
  const sep = global.titleSeparator || " | ";
  const clean = path.split("#")[0] || "/";

  const articleMatch = clean.match(/^\/tin-tuc\/([^/]+)$/);
  if (articleMatch) {
    const article = content.articles.find((a) => a.slug === articleMatch[1] && a.published);
    if (article) return resolveArticleSeo(article, global, clean);
  }

  const clusterMatch = clean.match(/^\/tin-tuc\/chu-de\/([^/]+)$/);
  if (clusterMatch) {
    const cluster = getClusterById(clusterMatch[1]);
    if (cluster) {
      const base = baseFromGlobal(global, clean);
      const title = buildAttractiveMetaTitle({
        slug: cluster.id,
        displayTitle: `${cluster.label} — Kiến thức & tư vấn`,
        path: clean,
      });
      const description = buildAttractiveMetaDescription({
        slug: cluster.id,
        displayTitle: cluster.label,
        path: clean,
        summary: `Tổng hợp bài viết về ${cluster.label.toLowerCase()} tại Thiên Hoàng Kim An Đông TP.HCM. Tư vấn miễn phí, liên kết dịch vụ ${cluster.pillarLabel}.`,
      });
      return {
        ...base,
        title,
        description,
        ogTitle: title,
        ogDescription: description,
        keywords: `${cluster.label}, ${cluster.label} TP.HCM, Thiên Hoàng Kim`,
      };
    }
  }

  const thamMyMatch = clean.match(/^\/tham-my\/([^/]+)$/);
  if (thamMyMatch) {
    const service = getServiceItem("tham-my", thamMyMatch[1]);
    if (service) {
      const linked = service.articleSlug
        ? content.articles.find((a) => a.slug === service.articleSlug && a.published)
        : undefined;
      return resolveServiceSeo({
        serviceLabel: service.label,
        description: service.description || linked?.description || "",
        image: linked?.image || global.ogImage,
        path: clean,
        global,
        article: linked,
        categoryLabel: SERVICE_CATEGORIES["tham-my"].eyebrow,
      });
    }
  }

  const spaMatch = clean.match(/^\/spa\/([^/]+)$/);
  if (spaMatch) {
    const service = getServiceItem("spa", spaMatch[1]);
    if (service) {
      const linked = service.articleSlug
        ? content.articles.find((a) => a.slug === service.articleSlug && a.published)
        : undefined;
      return resolveServiceSeo({
        serviceLabel: service.label,
        description: service.description || linked?.description || "",
        image: linked?.image || global.ogImage,
        path: clean,
        global,
        article: linked,
        categoryLabel: SERVICE_CATEGORIES.spa.eyebrow,
      });
    }
  }

  if (clean === "/tham-my") {
    const cat = SERVICE_CATEGORIES["tham-my"];
    const base = baseFromGlobal(global, clean);
    const linked = content.articles.find((a) => a.slug === cat.articleSlug && a.published);
    const pageTitle = routePathToDisplayTitle(clean) ?? cat.title;
    const title = resolveStaticRouteTitle(clean, pageTitle, global);
    const desc = resolveStaticRouteDescription(clean, pick(linked?.description, cat.description), global);
    return {
      ...base,
      title,
      description: desc,
      ogTitle: title,
      ogDescription: desc,
      keywords: pick(linked?.seo?.keywords, global.keywords),
    };
  }

  if (clean === "/spa") {
    const cat = SERVICE_CATEGORIES.spa;
    const base = baseFromGlobal(global, clean);
    const linked = content.articles.find((a) => a.slug === cat.articleSlug && a.published);
    const pageTitle = routePathToDisplayTitle(clean) ?? cat.title;
    const title = resolveStaticRouteTitle(clean, pageTitle, global);
    const desc = resolveStaticRouteDescription(clean, pick(linked?.description, cat.description), global);
    return {
      ...base,
      title,
      description: desc,
      ogTitle: title,
      ogDescription: desc,
      keywords: pick(linked?.seo?.keywords, global.keywords),
    };
  }

  const staticPage = getPageContent(clean);
  if (staticPage) {
    const base = baseFromGlobal(global, clean);
    const routeTitle = routePathToDisplayTitle(clean);
    const pageTitle = routeTitle ?? staticPage.title;
    const title = resolveStaticRouteTitle(clean, pageTitle, global);
    const desc = resolveStaticRouteDescription(clean, staticPage.description, global);
    return {
      ...base,
      title,
      description: desc,
      ogTitle: title,
      ogDescription: desc,
    };
  }

  if (clean === "/dich-vu") {
    const base = baseFromGlobal(global, clean);
    const pageTitle = routePathToDisplayTitle(clean) ?? "Dịch vụ thẩm mỹ";
    const title = resolveStaticRouteTitle(clean, pageTitle, global);
    const desc = resolveStaticRouteDescription(
      clean,
      "Giải pháp thẩm mỹ y khoa và spa chăm sóc da chuyên sâu.",
      global,
    );
    return {
      ...base,
      title,
      description: desc,
      ogTitle: title,
      ogDescription: desc,
    };
  }

  if (clean === "/tin-tuc" || clean === "/tin-tuc/kien-thuc" || clean === "/tin-tuc/tin-tuc") {
    const base = baseFromGlobal(global, clean);
    const pageTitle = routePathToDisplayTitle(clean) ?? "Tin tức & kiến thức làm đẹp";
    const title = resolveStaticRouteTitle(clean, pageTitle, global);
    const desc = resolveStaticRouteDescription(
      clean,
      "Cẩm nang làm đẹp, tin tức thẩm mỹ và spa từ Thiên Hoàng Kim.",
      global,
    );
    return {
      ...base,
      title,
      description: desc,
      ogTitle: title,
      ogDescription: desc,
    };
  }

  if (clean === "/lien-he") {
    const base = baseFromGlobal(global, clean);
    const pageTitle = routePathToDisplayTitle(clean) ?? "Liên hệ & đặt lịch";
    const title = resolveStaticRouteTitle(clean, pageTitle, global);
    const desc = resolveStaticRouteDescription(clean, pageTitle, global);
    return {
      ...base,
      title,
      description: desc,
      ogTitle: title,
      ogDescription: desc,
    };
  }

  if (clean === "/khach-hang") {
    const base = baseFromGlobal(global, clean);
    const pageTitle = routePathToDisplayTitle(clean) ?? "Khách hàng thực tế";
    const title = resolveStaticRouteTitle(clean, pageTitle, global);
    const desc = resolveStaticRouteDescription(clean, pageTitle, global);
    return {
      ...base,
      title,
      description: desc,
      ogTitle: title,
      ogDescription: desc,
    };
  }

  if (clean === "/bang-gia") {
    const base = baseFromGlobal(global, clean);
    const pageTitle = routePathToDisplayTitle(clean) ?? "Bảng giá tham khảo";
    const title = resolveStaticRouteTitle(clean, pageTitle, global);
    const desc = resolveStaticRouteDescription(clean, pageTitle, global);
    return {
      ...base,
      title,
      description: desc,
      ogTitle: title,
      ogDescription: desc,
    };
  }

  if (clean === "/gioi-thieu/doi-ngu-bac-si") {
    const base = baseFromGlobal(global, clean);
    const pageTitle = routePathToDisplayTitle(clean) ?? "Đội ngũ bác sĩ";
    const title = resolveStaticRouteTitle(clean, pageTitle, global);
    const desc = resolveStaticRouteDescription(clean, pageTitle, global);
    return {
      ...base,
      title,
      description: desc,
      ogTitle: title,
      ogDescription: desc,
    };
  }

  if (!isPublicRoute(clean, content)) {
    const base = baseFromGlobal(global, clean);
    return {
      ...base,
      title: buildTitle("Không tìm thấy trang", global.siteName, sep),
      description: "Trang bạn truy cập không tồn tại hoặc đã được di chuyển.",
      robots: "noindex,nofollow",
    };
  }

  if (clean === "/") {
    const base = baseFromGlobal(global, "/");
    const title = routeMetaTitle("/") ?? buildAttractiveMetaTitle({ path: "/" });
    const desc = routeMetaDescription("/") ?? buildAttractiveMetaDescription({ path: "/" });
    return {
      ...base,
      title,
      description: desc,
      ogTitle: title,
      ogDescription: desc,
    };
  }

  return baseFromGlobal(global, clean);
}

function setMetaName(name: string, content: string) {
  if (!content) return;
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaProperty(property: string, content: string) {
  if (!content) return;
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  if (!href) return;
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

const JSON_LD_ID = "thk-json-ld";

function setJsonLd(json: string) {
  let el = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null;
  if (!json) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("script");
    el.id = JSON_LD_ID;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = json;
}

export function applyPageSeo(ctx: SchemaContext, content: SiteContent) {
  const { meta } = ctx;
  const global = content.settings.seo;

  document.title = meta.title;
  document.documentElement.lang = global.locale?.slice(0, 2) || "vi";

  setMetaName("description", meta.description);
  setMetaName("keywords", meta.keywords);
  setMetaName("robots", meta.robots);

  setMetaProperty("og:site_name", global.siteName);
  setMetaProperty("og:title", meta.ogTitle);
  setMetaProperty("og:description", meta.ogDescription);
  setMetaProperty("og:image", meta.ogImage);
  setMetaProperty("og:url", meta.ogUrl);
  setMetaProperty("og:type", meta.ogType);
  setMetaProperty("og:locale", global.locale || "vi_VN");

  if (global.facebookAppId) setMetaProperty("fb:app_id", global.facebookAppId);

  setMetaName("twitter:card", meta.twitterCard);
  setMetaName("twitter:title", meta.ogTitle);
  setMetaName("twitter:description", meta.ogDescription);
  if (meta.ogImage) setMetaName("twitter:image", meta.ogImage);

  setCanonical(meta.canonical);

  if (global.googleSiteVerification) {
    setMetaName("google-site-verification", global.googleSiteVerification);
  }
  if (global.bingSiteVerification) {
    setMetaName("msvalidate.01", global.bingSiteVerification);
  }

  const graphs = buildJsonLdGraph(ctx, content);
  setJsonLd(jsonLdScript(graphs));
}

export function normalizeArticleSeo(partial?: Partial<ArticleSeo>): ArticleSeo {
  return {
    metaTitle: partial?.metaTitle?.trim() ?? "",
    metaDescription: partial?.metaDescription?.trim() ?? "",
    focusKeyphrase: partial?.focusKeyphrase?.trim() ?? "",
    keywords: partial?.keywords?.trim() ?? "",
    canonicalUrl: partial?.canonicalUrl?.trim() ?? "",
    ogImage: partial?.ogImage?.trim() ?? "",
    ogTitle: partial?.ogTitle?.trim() ?? "",
    ogDescription: partial?.ogDescription?.trim() ?? "",
    robots: partial?.robots?.trim() || "index,follow",
    noindex: partial?.noindex ?? false,
    nofollow: partial?.nofollow ?? false,
  };
}

export function normalizeSiteSeo(partial: Partial<SiteSeo> | undefined, base: SiteSeo): SiteSeo {
  return {
    siteName: partial?.siteName?.trim() || base.siteName,
    siteUrl: partial?.siteUrl?.trim() || base.siteUrl,
    title: partial?.title?.trim() || base.title,
    description: partial?.description?.trim() || base.description,
    keywords: partial?.keywords?.trim() || base.keywords,
    titleSeparator: partial?.titleSeparator?.trim() || base.titleSeparator || " | ",
    ogImage: partial?.ogImage?.trim() || base.ogImage,
    ogTitle: partial?.ogTitle?.trim() ?? base.ogTitle ?? "",
    ogDescription: partial?.ogDescription?.trim() ?? base.ogDescription ?? "",
    twitterCard: partial?.twitterCard || base.twitterCard || "summary_large_image",
    robots: partial?.robots?.trim() || base.robots || "index,follow",
    locale: partial?.locale?.trim() || base.locale || "vi_VN",
    googleSiteVerification: partial?.googleSiteVerification?.trim() ?? base.googleSiteVerification ?? "",
    bingSiteVerification: partial?.bingSiteVerification?.trim() ?? base.bingSiteVerification ?? "",
    facebookAppId: partial?.facebookAppId?.trim() ?? base.facebookAppId ?? "",
    schemaEnabled: partial?.schemaEnabled ?? base.schemaEnabled ?? true,
    breadcrumbsEnabled: partial?.breadcrumbsEnabled ?? base.breadcrumbsEnabled ?? true,
    organizationType: partial?.organizationType?.trim() || base.organizationType || "MedicalBusiness",
    organizationLogo: partial?.organizationLogo?.trim() || base.organizationLogo || base.ogImage,
    priceRange: partial?.priceRange?.trim() || base.priceRange || "$$",
    robotsTxtExtra: partial?.robotsTxtExtra?.trim() ?? base.robotsTxtExtra ?? "",
  };
}
