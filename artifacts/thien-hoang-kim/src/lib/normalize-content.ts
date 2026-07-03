import { DEFAULT_ARTICLES } from "@/data/articles.defaults";
import { DEFAULT_SITE_CONTENT } from "@/data/site-content.defaults";
import { isSpaTopicArticle, isThamMyTopicArticle } from "@/lib/article-thumbnail";
import { normalizeArticleSeo, normalizeSiteSeo } from "@/lib/seo";
import { slugify } from "@/lib/slug";
import type { SiteArticle, SiteContent, SiteHeroSlide, SiteTestimonial } from "@/types/site-content";

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
    if (src.includes("nang-mui-hoang-kim") || src.includes("cat-mi-phuong-hoang") || src.includes("cay-toc-tu-than") || src.includes("cang-chi-tre-hoa") || src.includes("cang-noi-soi")) return src;
    return thamMyImage;
  }
  if (category === "Spa") return spaImage;

  if (src.includes("gioithieu.1") || src.includes("slideshow.1")) {
    if (slug && title && isThamMyTopicArticle(slug, title, body)) return thamMyImage;
    if (slug && title && isSpaTopicArticle(slug, title, body)) return spaImage;
  }

  return src;
}

export function normalizeArticles(articles?: SiteArticle[]): SiteArticle[] {
  const list = articles?.length ? articles : DEFAULT_ARTICLES;
  const defaultById = new Map(DEFAULT_ARTICLES.map((a) => [a.id, a]));

  return list.map((a) => {
    const fallback = defaultById.get(a.id);
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
      id: a.id,
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
