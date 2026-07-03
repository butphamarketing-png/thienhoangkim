import { MAIN_NAV } from "@/config/navigation";
import {
  INTRO_BRAND_STORY_BLOCKS,
  INTRO_DOCTORS_BLOCKS,
  INTRO_FACILITIES_BLOCKS,
  INTRO_MAIN_BLOCKS,
  INTRO_TECHNOLOGY_BLOCKS,
} from "@/data/intro-pages.content";

export type PageBlock = {
  title?: string;
  paragraphs: string[];
};

export type SitePageContent = {
  title: string;
  eyebrow?: string;
  description: string;
  blocks: PageBlock[];
};

const intro =
  `${import.meta.env.BASE_URL}gioithieu.1.png`.replace(/([^:]\/)\/+/g, "$1");

function p(...text: string[]): PageBlock {
  return { paragraphs: text };
}

const STATIC_PAGES: Record<string, SitePageContent> = {
  "/gioi-thieu": {
    eyebrow: "Giới thiệu",
    title: "Thiên Hoàng Kim Aesthetic Clinic",
    description:
      "Phòng khám thẩm mỹ chuẩn y khoa — nơi kiến tạo vẻ đẹp tự nhiên, an toàn và bền vững.",
    blocks: INTRO_MAIN_BLOCKS,
  },
  "/gioi-thieu/cau-chuyen-thuong-hieu": {
    eyebrow: "Giới thiệu",
    title: "Câu chuyện thương hiệu",
    description: "Hành trình xây dựng niềm tin và chất lượng dịch vụ thẩm mỹ.",
    blocks: INTRO_BRAND_STORY_BLOCKS,
  },
  "/gioi-thieu/doi-ngu-bac-si": {
    eyebrow: "Giới thiệu",
    title: "Đội ngũ bác sĩ",
    description: "Bác sĩ và chuyên viên giàu kinh nghiệm — tận tâm với từng khách hàng.",
    blocks: INTRO_DOCTORS_BLOCKS,
  },
  "/gioi-thieu/cong-nghe-tham-my": {
    eyebrow: "Giới thiệu",
    title: "Công nghệ thẩm mỹ",
    description: "Ứng dụng thiết bị và kỹ thuật tiên tiến trong điều trị.",
    blocks: INTRO_TECHNOLOGY_BLOCKS,
  },
  "/gioi-thieu/co-so-vat-chat": {
    eyebrow: "Giới thiệu",
    title: "Cơ sở vật chất",
    description: "Không gian sang trọng, vô trùng và riêng tư.",
    blocks: INTRO_FACILITIES_BLOCKS,
  },
  "/bang-gia": {
    eyebrow: "Bảng giá",
    title: "Bảng giá tham khảo",
    description: "Giá dịch vụ có thể thay đổi theo tình trạng và phác đồ cá nhân. Liên hệ để được báo giá chính xác.",
    blocks: [
      {
        title: "Thẩm mỹ y khoa",
        paragraphs: [
          "Nâng mũi cấu trúc: từ 45.000.000đ",
          "Cắt mí / nhấn mí: từ 8.000.000đ",
          "Filler / Botox: từ 3.000.000đ / vùng",
          "Trẻ hóa da công nghệ cao: từ 5.000.000đ / buổi",
        ],
      },
      {
        title: "Spa & chăm sóc da",
        paragraphs: [
          "Chăm sóc da cơ bản: từ 500.000đ",
          "Peel da y khoa: từ 1.200.000đ",
          "Gội đầu dưỡng sinh: từ 350.000đ",
        ],
      },
    ],
  },
};

function buildServicePages(): Record<string, SitePageContent> {
  const pages: Record<string, SitePageContent> = {};
  const servicesNav = MAIN_NAV.find((n) => n.href === "/dich-vu");
  if (!servicesNav?.columns) return pages;

  pages["/dich-vu"] = {
    eyebrow: "Dịch vụ",
    title: "Dịch vụ thẩm mỹ",
    description: "Giải pháp thẩm mỹ y khoa và spa chăm sóc da chuyên sâu tại Thiên Hoàng Kim.",
    blocks: [],
  };

  for (const col of servicesNav.columns) {
    for (const item of col.items) {
      pages[item.href] = {
        eyebrow: col.title,
        title: item.label,
        description: `Tư vấn và điều trị ${item.label.toLowerCase()} an toàn, hiệu quả tại Thiên Hoàng Kim.`,
        blocks: [
          p(
            `Dịch vụ ${item.label} được thực hiện bởi bác sĩ có chứng chỉ hành nghề, quy trình vô trùng và theo dõi sau điều trị.`,
            "Khách hàng được thăm khám, phân tích và lên phác đồ cá nhân trước khi tiến hành.",
            "Đặt lịch tư vấn miễn phí để được bác sĩ đánh giá tình trạng và báo giá chi tiết.",
          ),
        ],
      };
    }
  }
  return pages;
}

export const ALL_PAGES: Record<string, SitePageContent> = {
  ...STATIC_PAGES,
  ...buildServicePages(),
};

export function getPageContent(path: string): SitePageContent | null {
  const normalized = path.replace(/\/$/, "") || "/";
  return ALL_PAGES[normalized] ?? null;
}

export const DEFAULT_HERO_IMAGE = intro;
