import { DEFAULT_ARTICLES } from "@/data/articles.defaults";
import {
  buildDefaultServiceCategories,
  buildDefaultServiceItems,
  buildDefaultSitePages,
  DEFAULT_CONTACT_PAGE,
  DEFAULT_CUSTOMERS_PAGE,
  DEFAULT_DOCTORS_PAGE,
  DEFAULT_INTRO_NAV,
  DEFAULT_MAIN_NAV,
  DEFAULT_NEWS_NAV,
  DEFAULT_PRICE_LIST_PAGE,
  DEFAULT_SERVICES_HUB_PAGE,
} from "@/data/cms-defaults";
import { DEFAULT_SITE_CONTENT } from "@/data/site-content.defaults";
import { isSpaTopicArticle, isThamMyTopicArticle } from "@/lib/article-thumbnail";
import { normalizeArticleSeo, normalizeSiteSeo } from "@/lib/seo";
import { slugify } from "@/lib/slug";
import type { SiteArticle, SiteContent, SiteHeroSlide, SiteServiceItem, SiteTestimonial } from "@/types/site-content";

/** Hero slideshow — 2 banner full-width, trượt ngang. */
function normalizeHeroSlides(slides?: SiteHeroSlide[]): SiteHeroSlide[] {
  const fallback = DEFAULT_SITE_CONTENT.home.heroSlides;
  if (!slides?.length) return fallback;

  const isLegacyDualHero =
    slides.length === 2 &&
    slides.some((s) => s.id === "hero-tham-my") &&
    slides.some((s) => s.id === "hero-spa");

  const isLegacySingleBanner =
    slides.length === 1 &&
    (slides[0]?.id === "slideshow-1" || slides[0]?.src?.includes("slideshow.1"));

  return isLegacyDualHero || isLegacySingleBanner ? fallback : slides;
}

function usesLegacyTestimonialMedia(testimonials: SiteTestimonial[]): boolean {
  return testimonials.every((t) => {
    const src = t.phoneImage || t.avatar || "";
    return (
      src.includes("slideshow.1") ||
      src.includes("gioithieu.1") ||
      /nail|uống mỹ|khoá nail/i.test(t.text)
    );
  });
}

function normalizeTestimonials(testimonials?: SiteTestimonial[]): SiteTestimonial[] {
  const defaults = DEFAULT_SITE_CONTENT.testimonials;
  const list =
    testimonials?.length && usesLegacyTestimonialMedia(testimonials)
      ? defaults
      : testimonials?.length
        ? testimonials
        : defaults;

  return list.map((t) => ({
    ...t,
    phoneImage: t.phoneImage || t.avatar || "",
  }));
}

function normalizeCtaImage(image?: string): string {
  const fallback = DEFAULT_SITE_CONTENT.home.ctaImage;
  if (!image || image.includes("gioithieu.1")) return fallback;
  return image;
}

function stripMarkdownBold(text: string): string {
  return text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*\*/g, "");
}

function normalizeArticleImage(
  image?: string,
  fallback?: string,
  category?: string,
  slug?: string,
  title?: string,
  body?: string,
): string {
  const portrait = DEFAULT_SITE_CONTENT.home.aboutImage;
  const [thamMyImage, spaImage] = DEFAULT_SITE_CONTENT.home.featuredServiceImages;
  let src = image || fallback || portrait;

  if (src.includes("slideshow.1")) return portrait;

  if (category === "Thẩm mỹ") {
    if (src.includes("nang-mui-hoang-kim") || src.includes("cat-mi-phuong-hoang") || src.includes("cay-toc-tu-than") || src.includes("cang-chi-tre-hoa") || src.includes("cang-noi-soi") || src.includes("filler-tao-hinh") || src.includes("botox-xoa-nhan-gon-ham")) return src;
    return thamMyImage;
  }
  if (category === "Spa") {
    if (src.includes("uploads/") && !src.includes("Spa.jpg")) return src;
    return spaImage;
  }

  if (src.includes("gioithieu.1") || src.includes("slideshow.1")) {
    if (slug && title && isThamMyTopicArticle(slug, title, body)) return thamMyImage;
    if (slug && title && isSpaTopicArticle(slug, title, body)) return spaImage;
  }

  return src;
}

function normalizeSingleArticle(a: SiteArticle, fallback?: SiteArticle): SiteArticle {
  const title = a.title || fallback?.title || "Bài viết";
  const category = a.category || fallback?.category || "Kiến thức";
  const slug = a.slug || fallback?.slug || slugify(title);
  const rawBody = a.body || fallback?.body || a.description || "";
  const image = normalizeArticleImage(a.image, fallback?.image, category, slug, title, rawBody);
  const seo = normalizeArticleSeo(a.seo ?? fallback?.seo);
  if (seo.ogImage?.includes("slideshow.1") || seo.ogImage?.includes("gioithieu.1")) {
    if (category === "Thẩm mỹ" && !image.includes("uploads/")) {
      seo.ogImage = DEFAULT_SITE_CONTENT.home.featuredServiceImages[0];
    } else if (category === "Spa") {
      seo.ogImage = DEFAULT_SITE_CONTENT.home.featuredServiceImages[1];
    } else if (image.includes("thẩm mỹ") || image.includes("tham-my")) {
      seo.ogImage = DEFAULT_SITE_CONTENT.home.featuredServiceImages[0];
    } else if (image.includes("Spa")) {
      seo.ogImage = DEFAULT_SITE_CONTENT.home.featuredServiceImages[1];
    } else {
      seo.ogImage = image;
    }
  }
  return {
    id: a.id || fallback?.id || slug,
    slug,
    category,
    image,
    title,
    date: a.date || fallback?.date || new Date().toLocaleDateString("vi-VN"),
    description: stripMarkdownBold(a.description || fallback?.description || ""),
    body: stripMarkdownBold(rawBody),
    published: a.published ?? fallback?.published ?? true,
    seo,
  };
}

export function normalizeArticles(articles?: SiteArticle[]): SiteArticle[] {
  if (!articles?.length) {
    return DEFAULT_ARTICLES.map((a) => normalizeSingleArticle(a));
  }

  const cmsById = new Map(articles.map((a) => [a.id, a]));
  const cmsBySlug = new Map(articles.map((a) => [a.slug, a]));
  const merged = new Map<string, SiteArticle>();

  for (const fallback of DEFAULT_ARTICLES) {
    const cms = cmsById.get(fallback.id) ?? cmsBySlug.get(fallback.slug);
    const normalized = normalizeSingleArticle(cms ?? fallback, fallback);
    merged.set(normalized.slug, normalized);
  }

  for (const cms of articles) {
    if (DEFAULT_ARTICLES.some((d) => d.id === cms.id || d.slug === cms.slug)) continue;
    const normalized = normalizeSingleArticle(cms);
    merged.set(normalized.slug, normalized);
  }

  return [...merged.values()];
}

function normalizeServiceItems(items?: SiteServiceItem[]): SiteServiceItem[] {
  const defaults = buildDefaultServiceItems();
  if (!items?.length) return defaults;

  const defaultById = new Map(defaults.map((d) => [d.id, d]));
  return items.map((item) => ({
    ...item,
    priceText: item.priceText?.trim() || defaultById.get(item.id)?.priceText || "",
  }));
}

export function mergeSiteContent(partial: Partial<SiteContent>): SiteContent {
  const base = DEFAULT_SITE_CONTENT;
  return {
    ...base,
    ...partial,
    version: partial.version ?? base.version,
    settings: {
      ...base.settings,
      ...partial.settings,
      logoUrl: partial.settings?.logoUrl?.trim() || base.settings.logoUrl,
      seo: normalizeSiteSeo(partial.settings?.seo, base.settings.seo),
    },
    home: {
      ...base.home,
      ...partial.home,
      featuredServiceImages: partial.home?.featuredServiceImages ?? base.home.featuredServiceImages,
      heroSlides: normalizeHeroSlides(partial.home?.heroSlides),
      ctaImage: normalizeCtaImage(partial.home?.ctaImage),
    },
    footer: {
      ...base.footer,
      ...partial.footer,
      featuredServices: partial.footer?.featuredServices ?? base.footer.featuredServices,
      quickLinks: partial.footer?.quickLinks ?? base.footer.quickLinks,
      designCreditLabel: partial.footer?.designCreditLabel ?? base.footer.designCreditLabel,
      designCreditUrl: partial.footer?.designCreditUrl ?? base.footer.designCreditUrl,
      copyright: (partial.footer?.copyright ?? base.footer.copyright).replace(
        /\s*Design by Butphamarketing\.com\s*$/i,
        "",
      ),
    },
    handbook: { ...base.handbook, ...partial.handbook },
    bookingServices: partial.bookingServices ?? base.bookingServices,
    doctors: partial.doctors ?? base.doctors,
    articles: normalizeArticles(partial.articles),
    testimonials: normalizeTestimonials(partial.testimonials),
    customerCases: partial.customerCases ?? base.customerCases,
    processSteps: partial.processSteps ?? base.processSteps,
    luckyWheel: {
      ...base.luckyWheel,
      ...partial.luckyWheel,
      segments: partial.luckyWheel?.segments ?? base.luckyWheel.segments,
    },
    promotion: { ...base.promotion, ...partial.promotion },
    pages: partial.pages?.length ? partial.pages : buildDefaultSitePages(),
    serviceCategories: partial.serviceCategories?.length
      ? partial.serviceCategories
      : buildDefaultServiceCategories(),
    serviceItems: normalizeServiceItems(partial.serviceItems),
    introNav: partial.introNav?.length ? partial.introNav : DEFAULT_INTRO_NAV,
    newsNav: partial.newsNav?.length ? partial.newsNav : DEFAULT_NEWS_NAV,
    mainNav: partial.mainNav?.length ? partial.mainNav : DEFAULT_MAIN_NAV,
    contactPage: partial.contactPage ?? DEFAULT_CONTACT_PAGE,
    priceListPage: partial.priceListPage ?? DEFAULT_PRICE_LIST_PAGE,
    servicesHubPage: partial.servicesHubPage ?? DEFAULT_SERVICES_HUB_PAGE,
    customersPage: partial.customersPage ?? DEFAULT_CUSTOMERS_PAGE,
    doctorsPage: partial.doctorsPage ?? DEFAULT_DOCTORS_PAGE,
  };
}
