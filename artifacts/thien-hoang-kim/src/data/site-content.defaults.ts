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
import { LOGO_ICON_SRC } from "@/lib/brand-assets";
import type { SiteContent } from "@/types/site-content";

const publicAsset = (file: string) => {
  const encoded = file.split("/").map((part) => encodeURIComponent(part)).join("/");
  return `${import.meta.env.BASE_URL}${encoded}`.replace(/([^:]\/)\/+/g, "$1");
};

const slide = publicAsset("slideshow.1.png");
const slide2 = publicAsset("slideshow.2.png");
const intro = publicAsset("gioithieu.1.png");
const thamMyImage = publicAsset("thẩm mỹ.png");
const spaImage = publicAsset("uploads/Spa.jpg");
const customerCaseImages = {
  nangMui: {
    before: publicAsset("Ảnh khách hàng/Trước nâng mũi.png"),
    after: publicAsset("Ảnh khách hàng/sau nâng mũi.png"),
  },
  catMi: {
    before: publicAsset("Ảnh khách hàng/trước cắt mí.png"),
    after: publicAsset("Ảnh khách hàng/sau cắt mí.png"),
  },
  botox: {
    before: publicAsset("Ảnh khách hàng/Trước botox.png"),
    after: publicAsset("Ảnh khách hàng/sau botox.png"),
  },
} as const;
const doctorHoThanhHai = publicAsset("uploads/Ho-Thanh-Hai.png");
const ctaNangMuiImage = publicAsset("uploads/nang-mui-hoang-kim-cta.png");
const processStepImages = [
  publicAsset("uploads/Tiếp nhận & Tư vấn.png"),
  publicAsset("uploads/THĂM KHÁM & SOI DA.png"),
  publicAsset("uploads/LÊN PHÁC ĐỒ CÁ NHÂN.png"),
  publicAsset("uploads/TIẾN HÀNH ĐIỀU TRỊ.png"),
  publicAsset("uploads/HƯỚNG DẪN CHĂM SÓC.png"),
  publicAsset("uploads/TÁI KHÁM & THEO DÕI.png"),
] as const;

export const DEFAULT_SITE_CONTENT: SiteContent = {
  version: 5,
  settings: {
    clinicName: "THIÊN HOÀNG KIM",
    clinicSubtitle: "Aesthetic Clinic",
    slogan: "Nâng Tầm Nhan Sắc",
    logoUrl: LOGO_ICON_SRC,
    address: "323-325 Hùng Vương, Phường An Đông, TP Hồ Chí Minh",
    phone: "0896673320",
    email: "contact@thienhoangkim.vn",
    hours: "08:00 - 20:00 (Thứ 2 - Chủ Nhật)",
    messengerSlug: "thienhoangkim",
    topbarAddress: "323-325 Hùng Vương, Phường An Đông, TP. Hồ Chí Minh",
    topbarHours: "Thứ 2 - Chủ nhật: 08:00 - 20:00",
    websiteUrl: "/",
    websiteLabel: "thienhoangkim.vn",
    facebookUrl: "#",
    tiktokUrl: "#",
    youtubeUrl: "#",
    bookingButtonLabel: "ĐẶT LỊCH NGAY",
    contactInfoTitle: "THÔNG TIN LIÊN HỆ",
    seo: {
      siteName: "Thiên Hoàng Kim Aesthetic Clinic",
      siteUrl: "https://www.thammythienhoangkim.com",
      title: "Thiên Hoàng Kim Aesthetic Clinic | Nâng Tầm Nhan Sắc",
      titleSeparator: " | ",
      description:
        "Phòng khám thẩm mỹ chuẩn y khoa tại An Đông Quận 5 TP.HCM: nâng mũi hoàng kim, cắt mí phượng hoàng, filler, botox, spa. Hotline 0896 673 320.",
      keywords:
        "thẩm mỹ Quận 5, thẩm mỹ An Đông, nâng mũi hoàng kim, cắt mí phượng hoàng, filler, botox, spa Hùng Vương, Thiên Hoàng Kim",
      ogImage: slide,
      ogTitle: "Thiên Hoàng Kim Aesthetic Clinic | Nâng Tầm Nhan Sắc",
      ogDescription:
        "Thẩm mỹ y khoa và spa tại 323-325 Hùng Vương, An Đông TP.HCM. Tư vấn miễn phí, bác sĩ chuyên môn. Nhắn tin đặt lịch: 0896 673 320.",
      twitterCard: "summary_large_image",
      robots: "index,follow",
      locale: "vi_VN",
      googleSiteVerification: "sAL8GAWPCJ9v21TlzI8UVIWGQoyaY6jzOgRxJHtwxXA",
      bingSiteVerification: "",
      facebookAppId: "",
      schemaEnabled: true,
      breadcrumbsEnabled: true,
      organizationType: "MedicalBusiness",
      organizationLogo: slide,
      priceRange: "$$",
      robotsTxtExtra: "",
    },
  },
  home: {
    heroSlides: [
      {
        id: "slideshow-1",
        src: slide,
        alt: "Thiên Hoàng Kim Aesthetic Clinic — Nâng Tầm Nhan Sắc",
      },
      {
        id: "slideshow-2",
        src: slide2,
        alt: "Phòng khám chuyên khoa thẩm mỹ Thiên Hoàng Kim — Đẹp tự nhiên, an toàn y khoa",
      },
    ],
    commitmentsTitle: "CAM KẾT TỪ THIÊN HOÀNG KIM",
    commitmentsSubtitle:
      "Chúng tôi cam kết mang đến dịch vụ thẩm mỹ an toàn – chất lượng – tận tâm nhất",
    commitments: [
      {
        id: "c1",
        icon: "Shield",
        title: "AN TOÀN LÀ ƯU TIÊN",
        desc: "Quy trình chuẩn y khoa, đảm bảo an toàn tuyệt đối cho khách hàng",
      },
      {
        id: "c2",
        icon: "Stethoscope",
        title: "BÁC SĨ CHUYÊN MÔN CAO",
        desc: "Đội ngũ bác sĩ giàu kinh nghiệm, chuyên môn sâu và tận tâm",
      },
      {
        id: "c3",
        icon: "TestTube",
        title: "CÔNG NGHỆ HIỆN ĐẠI",
        desc: "Ứng dụng công nghệ tiên tiến, thiết bị nhập khẩu chính hãng",
      },
      {
        id: "c4",
        icon: "Heart",
        title: "DỊCH VỤ TẬN TÂM",
        desc: "Chăm sóc khách hàng chu đáo, trước, trong và sau khi làm đẹp",
      },
      {
        id: "c5",
        icon: "Sparkles",
        title: "KẾT QUẢ TỰ NHIÊN",
        desc: "Mang đến vẻ đẹp hài hòa, tự nhiên và bền vững theo thời gian",
      },
      {
        id: "c6",
        icon: "FileText",
        title: "BẢO HÀNH RÕ RÀNG",
        desc: "Chính sách bảo hành minh bạch, đảm bảo quyền lợi khách hàng",
      },
    ],
    aboutEyebrow: "GIỚI THIỆU",
    aboutTitle: "THIÊN HOÀNG KIM",
    aboutSubtitle: "Aesthetic Clinic",
    aboutParagraphs: [
      "Thiên Hoàng Kim Aesthetic Clinic là phòng khám thẩm mỹ chuẩn y khoa, tiên phong ứng dụng công nghệ hiện đại và quy tụ đội ngũ bác sĩ chuyên môn cao, giàu kinh nghiệm.",
      "Chúng tôi cam kết mang đến những giải pháp làm đẹp an toàn, hiệu quả và phù hợp với từng cá nhân, kiến tạo vẻ đẹp tự nhiên, hài hòa và bền vững theo thời gian.",
    ],
    aboutStats: [
      { value: "15+", title: "Năm kinh nghiệm", sub: "Trong lĩnh vực thẩm mỹ" },
      { value: "5000+", title: "Khách hàng", sub: "Đã tin tưởng lựa chọn" },
      { value: "98%", title: "Khách hàng hài lòng", sub: "Về chất lượng dịch vụ" },
    ],
    aboutImage: intro,
    aboutImageAlt: "Thiên Hoàng Kim Aesthetic Clinic",
    aboutCtaLabel: "TÌM HIỂU THÊM",
    featuredServiceImages: [thamMyImage, spaImage],
    featuredServicesHeading: {
      eyebrow: "Dịch vụ",
      title: "DỊCH VỤ NỔI BẬT",
      subtitle: "Giải pháp làm đẹp toàn diện chuẩn y khoa",
    },
    featuredServicesExploreLabel: "KHÁM PHÁ NGAY",
    featuredServicesMobileLabel: "XEM DỊCH VỤ",
    customersHeading: {
      eyebrow: "Thực tế",
      title: "KHÁCH HÀNG THỰC TẾ",
      subtitle: "Hàng nghìn khách hàng đã thay đổi diện mạo và tự tin hơn cùng Thiên Hoàng Kim.",
    },
    doctorsHeading: {
      eyebrow: "Đội ngũ",
      title: "ĐỘI NGŨ BÁC SĨ",
      subtitle: "Đội ngũ bác sĩ giàu kinh nghiệm, chuyên môn cao và tận tâm với khách hàng.",
    },
    processHeading: {
      eyebrow: "Quy trình",
      title: "QUY TRÌNH THĂM KHÁM",
      subtitle: "Chuẩn Y Khoa – An Toàn – Cá Nhân Hóa – Hiệu Quả",
    },
    processCtaLabel: "ĐẶT LỊCH THĂM KHÁM NGAY",
    testimonialsHeading: {
      title: "KHÁCH HÀNG NÓI GÌ VỀ THIÊN HOÀNG KIM",
      subtitle: "Hơn 10.000 khách hàng đã tin tưởng và lựa chọn",
    },
    bookingImage: intro,
    bookingTitle: "THÔNG TIN ĐẶT LỊCH",
    testimonialsBackground: slide,
    ctaTitle: "SẴN SÀNG NÂNG TẦM NHAN SẮC?",
    ctaDescription:
      "Liên hệ ngay để được đội ngũ chuyên gia tư vấn miễn phí và đặt lịch nhanh chóng.",
    ctaImage: ctaNangMuiImage,
    footerDescription:
      "Phòng khám chuyên khoa thẩm mỹ uy tín, chất lượng với đội ngũ bác sĩ chuyên gia hàng đầu. Kiến tạo vẻ đẹp tự nhiên, an toàn và bền vững.",
  },
  footer: {
    featuredTitle: "DỊCH VỤ NỔI BẬT",
    featuredServices: [
      { label: "Nâng mũi cấu trúc", href: "/tham-my/nang-mui" },
      { label: "Cắt mí tự nhiên", href: "/tham-my/cat-mi" },
      { label: "Tiêm filler - Botox", href: "/tham-my/filler" },
      { label: "Điều trị da chuyên sâu", href: "/tham-my/dieu-tri-mun" },
      { label: "Trẻ hóa công nghệ cao", href: "/tham-my/tre-hoa-da" },
    ],
    quickLinksTitle: "LIÊN KẾT NHANH",
    quickLinks: [
      { label: "Trang chủ", href: "/" },
      { label: "Giới thiệu", href: "/gioi-thieu" },
      { label: "Dịch vụ", href: "/dich-vu" },
      { label: "Khách hàng thực tế", href: "/khach-hang" },
      { label: "Bảng giá", href: "/bang-gia" },
      { label: "Tin tức", href: "/tin-tuc" },
      { label: "Liên hệ", href: "/lien-he" },
    ],
    copyright: "© 2026 Thiên Hoàng Kim Aesthetic Clinic. All Rights Reserved.",
    designCreditLabel: "Butphamarketing.com",
    designCreditUrl: "https://butphamarketing.com",
  },
  handbook: {
    title: "CẨM NANG LÀM ĐẸP",
    viewAllLabel: "XEM TẤT CẢ BÀI VIẾT",
    viewAllHref: "/tin-tuc",
    listEyebrow: "Tin tức",
    listDescription: "Kiến thức thẩm mỹ, tin tức và mẹo chăm sóc da từ đội ngũ Thiên Hoàng Kim.",
    articleDetailLabel: "XEM CHI TIẾT",
  },
  bookingServices: [
    { value: "nang-mui-hoang-kim", label: "Nâng mũi hoàng kim" },
    { value: "cat-mi-phuong-hoang", label: "Cắt mí phượng hoàng" },
    { value: "cay-toc-tu-than", label: "Cấy tóc tự thân" },
    { value: "cang-noi-soi", label: "Căng nội soi" },
    { value: "cang-chi-tre-hoa", label: "Căng chỉ trẻ hóa" },
    { value: "filler-tao-hinh", label: "Filler tạo hình" },
    { value: "botox-xoa-nhan-gon-ham", label: "Botox xóa nhăn, gọn hàm" },
    { value: "u-da-muoi-himalaya", label: "Ủ đá muối Himalaya" },
    { value: "phun-xam-tham-my", label: "Phun xăm thẩm mỹ" },
    { value: "massage-body", label: "Massage body thư giãn" },
    { value: "massage-facial", label: "Massage facial" },
    { value: "cham-soc-da-toan-dien", label: "Chăm sóc da toàn diện" },
    { value: "khac", label: "Khác" },
  ],
  doctors: [
    {
      id: "d1",
      img: doctorHoThanhHai,
      name: "BS. HỒ THÀNH HẢI",
      spec: "Chuyên khoa Thẩm mỹ",
      exp: "NHIỀU NĂM KINH NGHIỆM",
      bio: "Bác sĩ tận tâm, giàu kinh nghiệm trong lĩnh vực thẩm mỹ — cam kết mang đến kết quả an toàn và tự nhiên cho khách hàng.",
    },
  ],
  articles: DEFAULT_ARTICLES,
  testimonials: [
    {
      id: "t1",
      name: "Lan Anh",
      initials: "LA",
      avatar: customerCaseImages.nangMui.after,
      phoneImage: customerCaseImages.nangMui.after,
      text: "Nâng mũi xong gương mặt hài hòa hơn hẳn, bác sĩ tư vấn kỹ và theo dõi sau điều trị chu đáo.",
    },
    {
      id: "t2",
      name: "Thủy Dung",
      initials: "TD",
      avatar: customerCaseImages.catMi.after,
      phoneImage: customerCaseImages.catMi.after,
      text: "Cắt mí tự nhiên, mắt to và sáng hơn — đúng như mong muốn, hồi phục nhanh.",
    },
    {
      id: "t3",
      name: "Kim Ngân",
      initials: "KN",
      avatar: customerCaseImages.botox.after,
      phoneImage: customerCaseImages.botox.after,
      text: "Botox xóa nhăn hiệu quả, da mịn màng và trẻ trung hơn rõ rệt.",
    },
  ],
  customerCases: [
    {
      id: "cr1",
      label: "Nâng Mũi Cấu Trúc",
      before: customerCaseImages.nangMui.before,
      after: customerCaseImages.nangMui.after,
    },
    {
      id: "cr2",
      label: "Cắt Mí Tự Nhiên",
      before: customerCaseImages.catMi.before,
      after: customerCaseImages.catMi.after,
    },
    {
      id: "cr3",
      label: "Botox Xóa Nhăn",
      before: customerCaseImages.botox.before,
      after: customerCaseImages.botox.after,
    },
  ],
  luckyWheel: {
    enabled: true,
    title: "Vòng Quay May Mắn",
    subtitle: "Quay để nhận ưu đãi đặc biệt hôm nay!",
    autoShowDelay: 5,
    spinButtonLabel: "QUAY NGAY",
    resultHeading: "Chúc mừng! Bạn đã trúng:",
    resultDescription: "Điền thông tin để nhận ưu đãi và đặt lịch tư vấn miễn phí.",
    segments: [
      { id: "w1", label: "Giảm 20%", color: "#c8a96e", weight: 20 },
      { id: "w2", label: "Tư vấn miễn phí", color: "#1a3328", weight: 25 },
      { id: "w3", label: "Giảm 10%", color: "#e8d48b", weight: 25 },
      { id: "w4", label: "Quà tặng bí ẩn", color: "#2d6b4f", weight: 15 },
      { id: "w5", label: "Giảm 30%", color: "#a67c52", weight: 10 },
      { id: "w6", label: "Combo chăm sóc da", color: "#4a9c6f", weight: 5 },
    ],
  },
  processSteps: [
    {
      id: "s1",
      title: "TIẾP NHẬN & TƯ VẤN",
      desc: "Đội ngũ tiếp nhận thông tin và tư vấn sơ bộ",
      image: processStepImages[0],
    },
    {
      id: "s2",
      title: "THĂM KHÁM & SOI DA",
      desc: "Bác sĩ trực tiếp thăm khám và phân tích tình trạng",
      image: processStepImages[1],
    },
    {
      id: "s3",
      title: "LÊN PHÁC ĐỒ CÁ NHÂN",
      desc: "Đề xuất liệu trình phù hợp với nhu cầu",
      image: processStepImages[2],
    },
    {
      id: "s4",
      title: "TIẾN HÀNH ĐIỀU TRỊ",
      desc: "Thực hiện theo đúng quy trình chuẩn Y khoa",
      image: processStepImages[3],
    },
    {
      id: "s5",
      title: "HƯỚNG DẪN CHĂM SÓC",
      desc: "Hướng dẫn chăm sóc tại nhà để duy trì kết quả",
      image: processStepImages[4],
    },
    {
      id: "s6",
      title: "TÁI KHÁM & THEO DÕI",
      desc: "Theo dõi tiến trình để đạt kết quả tối ưu nhất",
      image: processStepImages[5],
    },
  ],
  promotion: {
    enabled: true,
    title: "Chương Trình Khuyến Mãi",
    description: "Khuyến mãi đặc biệt dành cho khách hàng mới! Giảm giá lên đến 30% cho tất cả các dịch vụ thẩm mỹ.",
    image: slide,
    imageUrl: "/dich-vu",
    buttonLabel: "Xem chi tiết",
    buttonUrl: "/dich-vu",
  },
  pages: buildDefaultSitePages(),
  serviceCategories: buildDefaultServiceCategories(),
  serviceItems: buildDefaultServiceItems(),
  introNav: DEFAULT_INTRO_NAV,
  newsNav: DEFAULT_NEWS_NAV,
  mainNav: DEFAULT_MAIN_NAV,
  contactPage: DEFAULT_CONTACT_PAGE,
  priceListPage: DEFAULT_PRICE_LIST_PAGE,
  servicesHubPage: DEFAULT_SERVICES_HUB_PAGE,
  customersPage: DEFAULT_CUSTOMERS_PAGE,
  doctorsPage: DEFAULT_DOCTORS_PAGE,
};
