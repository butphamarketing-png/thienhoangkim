export type CommitmentIconKey =
  | "Shield"
  | "Stethoscope"
  | "TestTube"
  | "Heart"
  | "Sparkles"
  | "FileText";

export type SiteCommitment = {
  id: string;
  icon: CommitmentIconKey;
  title: string;
  desc: string;
};

export type SiteStat = {
  value: string;
  title: string;
  sub: string;
};

/** Tiêu đề section trên trang chủ */
export type SiteSectionHeading = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export type SiteHeroSlide = {
  id: string;
  src: string;
  alt: string;
};

export type SiteDoctor = {
  id: string;
  img: string;
  name: string;
  spec: string;
  exp: string;
  bio: string;
};

export type ArticleSeo = {
  /** Tiêu đề SEO (tab trình duyệt / Google). Để trống = dùng tiêu đề bài viết */
  metaTitle: string;
  /** Mô tả meta. Để trống = dùng mô tả ngắn bài viết */
  metaDescription: string;
  /** Từ khóa chính — phân tích SEO (giống Yoast focus keyphrase) */
  focusKeyphrase: string;
  keywords: string;
  /** URL canonical tùy chỉnh (để trống = URL bài viết) */
  canonicalUrl: string;
  ogImage: string;
  ogTitle: string;
  ogDescription: string;
  robots: string;
  noindex: boolean;
  nofollow: boolean;
};

export type SiteArticle = {
  id: string;
  slug: string;
  category: string;
  image: string;
  title: string;
  date: string;
  description: string;
  body: string;
  published: boolean;
  seo: ArticleSeo;
};

export type SiteLink = {
  label: string;
  href: string;
};

export type SiteBookingService = {
  value: string;
  label: string;
};

export type SiteFooter = {
  featuredTitle: string;
  featuredServices: SiteLink[];
  quickLinksTitle: string;
  quickLinks: SiteLink[];
  copyright: string;
  designCreditLabel: string;
  designCreditUrl: string;
};

export type SiteHandbook = {
  title: string;
  subtitle?: string;
  viewAllLabel: string;
  viewAllHref: string;
  listEyebrow: string;
  listDescription: string;
  articleDetailLabel: string;
};

export type SiteTestimonial = {
  id: string;
  name: string;
  initials: string;
  avatar: string;
  text: string;
  phoneImage: string;
};

export type SiteCustomerCase = {
  id: string;
  label: string;
  before: string;
  after: string;
};

export type SiteProcessStep = {
  id: string;
  title: string;
  desc: string;
  image: string;
};

/** Khối nội dung trong trang tĩnh (Giới thiệu, …) */
export type SitePageBlock = {
  title?: string;
  paragraphs: string[];
  image?: string;
};

/** Trang nội dung quản lý qua admin */
export type SitePage = {
  id: string;
  path: string;
  title: string;
  eyebrow?: string;
  description: string;
  heroImage?: string;
  blocks: SitePageBlock[];
};

export type ServiceCategoryId = "tham-my" | "spa";

/** Danh mục dịch vụ (Thẩm mỹ / Spa) */
export type SiteServiceCategory = {
  id: ServiceCategoryId;
  path: string;
  title: string;
  eyebrow: string;
  description: string;
  articleSlug?: string;
  published: boolean;
};

/** Dịch vụ cấp 2 — CRUD qua admin */
export type SiteServiceItem = {
  id: string;
  categoryId: ServiceCategoryId;
  slug: string;
  label: string;
  description?: string;
  priceText?: string;
  articleSlug?: string;
  image?: string;
  published: boolean;
  sortOrder: number;
};

/** Mục menu chính (cấp 1) */
export type SiteMainNavItem = {
  id: string;
  label: string;
  href: string;
  enabled: boolean;
};

/** Hero trang (eyebrow + tiêu đề + mô tả) */
export type SitePageHero = {
  eyebrow: string;
  title: string;
  description: string;
};

/** Hero trang liên hệ */
export type SiteContactPage = SitePageHero;

export type SiteSeo = {
  siteName: string;
  /** URL gốc website (https://domain.com) — dùng canonical & sitemap */
  siteUrl: string;
  title: string;
  description: string;
  keywords: string;
  /** Ký tự ngăn cách title | site name */
  titleSeparator: string;
  ogImage: string;
  ogTitle: string;
  ogDescription: string;
  twitterCard: "summary" | "summary_large_image";
  robots: string;
  locale: string;
  googleSiteVerification: string;
  bingSiteVerification: string;
  facebookAppId: string;
  schemaEnabled: boolean;
  breadcrumbsEnabled: boolean;
  organizationType: string;
  organizationLogo: string;
  priceRange: string;
  robotsTxtExtra: string;
};

export type SiteSettings = {
  clinicName: string;
  clinicSubtitle: string;
  slogan: string;
  logoUrl: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  messengerSlug: string;
  topbarAddress: string;
  topbarHours: string;
  websiteUrl: string;
  websiteLabel: string;
  facebookUrl: string;
  tiktokUrl: string;
  youtubeUrl: string;
  bookingButtonLabel: string;
  contactInfoTitle: string;
  seo: SiteSeo;
};

export type SiteHomeSections = {
  heroSlides: SiteHeroSlide[];
  commitmentsTitle: string;
  commitmentsSubtitle: string;
  commitments: SiteCommitment[];
  aboutEyebrow: string;
  aboutTitle: string;
  aboutSubtitle: string;
  aboutParagraphs: string[];
  aboutStats: SiteStat[];
  aboutImage: string;
  aboutImageAlt: string;
  aboutCtaLabel: string;
  featuredServiceImages: [string, string];
  featuredServicesHeading: SiteSectionHeading;
  featuredServicesExploreLabel: string;
  featuredServicesMobileLabel: string;
  customersHeading: SiteSectionHeading;
  doctorsHeading: SiteSectionHeading;
  processHeading: SiteSectionHeading;
  processCtaLabel: string;
  testimonialsHeading: SiteSectionHeading;
  bookingImage: string;
  bookingTitle: string;
  testimonialsBackground: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaImage: string;
  footerDescription: string;
};

export type SiteContent = {
  version: number;
  settings: SiteSettings;
  home: SiteHomeSections;
  footer: SiteFooter;
  handbook: SiteHandbook;
  bookingServices: SiteBookingService[];
  doctors: SiteDoctor[];
  articles: SiteArticle[];
  testimonials: SiteTestimonial[];
  customerCases: SiteCustomerCase[];
  processSteps: SiteProcessStep[];
  luckyWheel: LuckyWheelConfig;
  promotion: PromotionConfig;
  /** Trang Giới thiệu & trang tĩnh khác */
  pages: SitePage[];
  serviceCategories: SiteServiceCategory[];
  serviceItems: SiteServiceItem[];
  /** Menu con Giới thiệu */
  introNav: SiteLink[];
  /** Menu con Tin tức */
  newsNav: SiteLink[];
  /** Menu chính cấp 1 */
  mainNav: SiteMainNavItem[];
  contactPage: SiteContactPage;
  priceListPage: SitePageHero;
  servicesHubPage: SitePageHero;
  customersPage: SitePageHero;
  doctorsPage: SitePageHero;
};

export type LuckyWheelSegment = {
  id: string;
  label: string;
  color: string;
  /** Tỷ lệ trúng (0–100, tổng các segment = 100) */
  weight: number;
};

export type LuckyWheelConfig = {
  enabled: boolean;
  /** Tiêu đề hiển thị trên popup */
  title: string;
  subtitle: string;
  /** Tự động hiện popup sau X giây (0 = không tự hiện) */
  autoShowDelay: number;
  segments: LuckyWheelSegment[];
  /** Văn bản nút quay */
  spinButtonLabel: string;
  /** Văn bản sau khi quay xong trước khi hiện form */
  resultHeading: string;
  resultDescription: string;
};

export type PromotionConfig = {
  enabled: boolean;
  title: string;
  description: string;
  image: string;
  imageUrl: string;
  buttonLabel: string;
  buttonUrl: string;
};

export type BookingSubmission = {
  id: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  notes?: string;
  createdAt: string;
  status: "new" | "contacted" | "done";
};
