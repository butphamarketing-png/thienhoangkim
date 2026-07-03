import { DEFAULT_ARTICLES } from "@/data/articles.defaults";
import { DEFAULT_SITE_CONTENT } from "@/data/site-content.defaults";
import { normalizeArticleSeo, normalizeSiteSeo } from "@/lib/seo";
import { slugify } from "@/lib/slug";
import type { SiteArticle, SiteContent, SiteHeroSlide, SiteTestimonial } from "@/types/site-content";

/** Banner 2 cột Thẩm mỹ/Spa đã thay bằng slideshow full-width `slideshow.1.png`. */
function normalizeHeroSlides(slides?: SiteHeroSlide[]): SiteHeroSlide[] {
  const fallback = DEFAULT_SITE_CONTENT.home.heroSlides;
  if (!slides?.length) return fallback;

  const isLegacyDualHero =
    slides.length === 2 &&
    slides.some((s) => s.id === "hero-tham-my") &&
    slides.some((s) => s.id === "hero-spa");

  return isLegacyDualHero ? fallback : slides;
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

export function normalizeArticles(articles?: SiteArticle[]): SiteArticle[] {
  if (!articles?.length) return DEFAULT_ARTICLES;

  const defaultById = new Map(DEFAULT_ARTICLES.map((a) => [a.id, a]));

  return articles.map((a) => {
    const fallback = defaultById.get(a.id);
    const title = a.title || fallback?.title || "Bài viết";
    return {
      id: a.id,
      slug: a.slug || fallback?.slug || slugify(title),
      category: a.category || fallback?.category || "Kiến thức",
      image: a.image || fallback?.image || DEFAULT_SITE_CONTENT.home.heroSlides[0]?.src || "",
      title,
      date: a.date || fallback?.date || new Date().toLocaleDateString("vi-VN"),
      description: a.description || fallback?.description || "",
      body: a.body || fallback?.body || a.description || "",
      published: a.published ?? fallback?.published ?? true,
      seo: normalizeArticleSeo(a.seo ?? fallback?.seo),
    };
  });
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
  };
}
