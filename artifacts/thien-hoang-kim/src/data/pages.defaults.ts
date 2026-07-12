import { MAIN_NAV } from "@/config/navigation";
import {
  INTRO_BRAND_STORY_BLOCKS,
  INTRO_DOCTORS_BLOCKS,
  INTRO_FACILITIES_BLOCKS,
  INTRO_MAIN_BLOCKS,
  INTRO_TECHNOLOGY_BLOCKS,
} from "@/data/intro-pages.content";
import {
  SERVICE_CATEGORIES,
  getServiceItem,
  type ServiceCategoryId,
} from "@/data/services-catalog";

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

const PHONE = "0938 673 996";
const ADDRESS = "323–325 Hùng Vương, An Đông, TP.HCM";

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
      p(
        "Giá trên mang tính tham khảo — báo giá chính xác sau khám và phác đồ cá nhân.",
        `Đặt lịch tư vấn miễn phí: **${PHONE}** — ${ADDRESS}.`,
      ),
    ],
  },
};

function categoryIdFromColumnTitle(title: string): ServiceCategoryId {
  return /spa/i.test(title) ? "spa" : "tham-my";
}

function buildServicePages(): Record<string, SitePageContent> {
  const pages: Record<string, SitePageContent> = {};
  const servicesNav = MAIN_NAV.find((n) => n.href === "/dich-vu");
  if (!servicesNav?.columns) return pages;

  pages["/dich-vu"] = {
    eyebrow: "Dịch vụ",
    title: "Dịch vụ thẩm mỹ",
    description:
      "Thẩm mỹ y khoa & spa chăm sóc da toàn diện — nâng mũi, cắt mí, filler, botox, massage. Tư vấn miễn phí tại An Đông TP.HCM.",
    blocks: [
      p(
        "Thiên Hoàng Kim cung cấp hai nhóm dịch vụ chính: **thẩm mỹ y khoa** (phẫu thuật, tiêm, trẻ hóa) và **spa chăm sóc da** (điều trị da, massage, phun xăm).",
        "Mỗi khách được thăm khám, phác đồ cá nhân và báo giá minh bạch trước khi điều trị.",
        `Đặt lịch: **${PHONE}** — ${ADDRESS}.`,
      ),
      {
        title: "Thẩm mỹ y khoa",
        paragraphs: SERVICE_CATEGORIES["tham-my"].description
          ? [SERVICE_CATEGORIES["tham-my"].description, `[Xem tất cả dịch vụ thẩm mỹ](/tham-my).`]
          : ["Giải pháp thẩm mỹ chuẩn y khoa — an toàn và hiệu quả lâu dài."],
      },
      {
        title: "Spa & chăm sóc da",
        paragraphs: SERVICE_CATEGORIES.spa.description
          ? [SERVICE_CATEGORIES.spa.description, `[Xem tất cả dịch vụ spa](/spa).`]
          : ["Chăm sóc da và thư giãn toàn diện trong không gian cao cấp."],
      },
    ],
  };

  for (const col of servicesNav.columns) {
    const categoryId = categoryIdFromColumnTitle(col.title);
    for (const item of col.items) {
      const slug = item.href.split("/").pop() ?? "";
      const svc = getServiceItem(categoryId, slug);
      const summary =
        svc?.description ??
        `Tư vấn và điều trị ${item.label.toLowerCase()} an toàn, hiệu quả tại Thiên Hoàng Kim.`;

      pages[item.href] = {
        eyebrow: col.title,
        title: item.label,
        description: summary,
        blocks: [
          p(
            summary,
            `Quy trình: thăm khám → phác đồ cá nhân → điều trị → tái khám theo dõi. Bác sĩ/chuyên viên có chứng chỉ, phòng vô trùng.`,
            `Xem chi tiết [${item.label}](${item.href}) hoặc đọc thêm tại [/tin-tuc](/tin-tuc). Đặt lịch miễn phí: **${PHONE}**.`,
          ),
          {
            title: "Tại sao chọn Thiên Hoàng Kim?",
            paragraphs: [
              "Báo giá minh bạch — không phụ phí ẩn sau khi khách đồng ý.",
              `${ADDRESS} — mở cửa 08:00–20:00, thuận tiện khu An Đông & Chợ Lớn.`,
              "Tư vấn miễn phí — không ép đóng tiền ngay trong buổi đầu.",
            ],
          },
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
