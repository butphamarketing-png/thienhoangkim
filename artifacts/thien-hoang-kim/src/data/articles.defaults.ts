import { DEFAULT_ARTICLE_SEO } from "@/lib/seo";
import { NANG_MUI_HOANG_KIM_BODY } from "@/data/articles/nang-mui-hoang-kim.body";
import { CAT_MI_PHUONG_HOANG_BODY } from "@/data/articles/cat-mi-phuong-hoang.body";
import { CAY_TOC_TU_THAN_BODY } from "@/data/articles/cay-toc-tu-than.body";
import { CANG_NOI_SOI_BODY } from "@/data/articles/cang-noi-soi.body";
import { CANG_CHI_TRE_HOA_BODY } from "@/data/articles/cang-chi-tre-hoa.body";
import { HUT_MO_CAY_MO_MA_BODY } from "@/data/articles/hut-mo-cay-mo-ma.body";
import { FILLER_TAO_HINH_BODY } from "@/data/articles/filler-tao-hinh.body";
import { BOTOX_XOA_NHAN_GON_HAM_BODY } from "@/data/articles/botox-xoa-nhan-gon-ham.body";
import { U_DA_MUOI_HIMALAYA_BODY } from "@/data/articles/u-da-muoi-himalaya.body";
import { PHUN_XAM_THAM_MY_BODY } from "@/data/articles/phun-xam-tham-my.body";
import { MASSAGE_BODY_THU_GIAN_BODY } from "@/data/articles/massage-body-thu-gian.body";
import { MASSAGE_FACIAL_BODY } from "@/data/articles/massage-facial.body";
import { CHAM_SOC_DA_TOAN_DIEN_BODY } from "@/data/articles/cham-soc-da-toan-dien.body";
import {
  FILLER_VA_BOTOX_KHAC_NHAU_BODY,
  NANG_MUI_CO_DAU_KHONG_BODY,
  CAT_MI_BAO_LAU_HOI_PHUC_BODY,
  PHUN_MOI_CO_DAU_KHONG_BODY,
  CHAM_SOC_DA_MAT_DUNG_CACH_BODY,
  PHONG_KHAM_THAM_MY_AN_DONG_BODY,
  BOTOX_GON_HAM_BAO_LAU_BODY,
  CAY_TOC_FUE_LA_GI_BODY,
  CHON_PHONG_KHAM_THAM_MY_AN_TOAN_BODY,
  XU_HUONG_THAM_MY_2026_BODY,
} from "@/data/articles/news-priority.body";
import {
  DAU_HIEU_THAM_KHAM_DA_LIEU_BODY,
  CHAM_SOC_SAU_PHAU_THUAT_THAM_MY_BODY,
} from "@/data/articles/news-general.body";
import type { ArticleSeo, SiteArticle } from "@/types/site-content";

const publicAsset = (file: string) =>
  `${import.meta.env.BASE_URL}${file}`.replace(/([^:]\/)\/+/g, "$1");

const slide = publicAsset("slideshow.1.png");
const intro = publicAsset("gioithieu.1.png");

function svcSeo(
  metaTitle: string,
  metaDescription: string,
  focusKeyphrase: string,
  keywords?: string,
): ArticleSeo {
  return {
    ...DEFAULT_ARTICLE_SEO,
    metaTitle,
    metaDescription,
    focusKeyphrase,
    keywords: keywords ?? focusKeyphrase,
  };
}

function newsSeo(
  slug: string,
  metaTitle: string,
  metaDescription: string,
  focusKeyphrase: string,
  keywords?: string,
  ogImage = slide,
): ArticleSeo {
  return {
    ...DEFAULT_ARTICLE_SEO,
    metaTitle: `${metaTitle} | Thiên Hoàng Kim`,
    metaDescription,
    focusKeyphrase,
    keywords: keywords ?? focusKeyphrase,
    canonicalUrl: `https://thienhoangkim.vercel.app/tin-tuc/${slug}`,
    ogTitle: metaTitle,
    ogDescription: metaDescription,
    ogImage,
  };
}

function article(
  id: string,
  slug: string,
  title: string,
  date: string,
  description: string,
  body: string,
  image = slide,
  category = "Kiến thức",
  seo: ArticleSeo = { ...DEFAULT_ARTICLE_SEO },
): SiteArticle {
  return {
    id,
    slug,
    category,
    image,
    title,
    date,
    description,
    body,
    published: true,
    seo,
  };
}

/** —— Cấp 1: Danh mục dịch vụ —— */
const CATEGORY_ARTICLES: SiteArticle[] = [
  article(
    "cat-tham-my",
    "dich-vu-tham-my-y-khoa",
    "Dịch vụ Thẩm Mỹ y khoa tại Thiên Hoàng Kim",
    "01/06/2024",
    "Tổng quan các dịch vụ thẩm mỹ phẫu thuật và không phẫu thuật — chuẩn y khoa, an toàn, tự nhiên.",
    `Thẩm Mỹ y khoa tại Thiên Hoàng Kim gồm các giải pháp can thiệp sâu để cải thiện khuôn mặt và cơ thể: từ phẫu thuật nâng mũi, cắt mí, cấy tóc đến căng da nội soi, căng chỉ, hút mỡ – cấy mỡ má, filler và botox.

Mỗi khách hàng được thăm khám trực tiếp, phân tích tỉ lệ khuôn mặt và lên phác đồ riêng. Quy trình tuân thủ vô trùng, gây mê an toàn và theo dõi sau điều trị — đảm bảo kết quả hài hòa, không lộ dấu vết thẩm mỹ.

Danh mục Thẩm Mỹ gồm 8 dịch vụ chính: Nâng mũi hoàng kim, Cắt mí phượng hoàng, Cấy tóc tự thân, Căng nội soi, Căng chỉ trẻ hóa, Hút mỡ – cấy mỡ má, Filler tạo hình và Botox xóa nhăn, gọn hàm. Chọn dịch vụ bên dưới để tìm hiểu chi tiết.`,
    slide,
    "Thẩm mỹ",
    svcSeo(
      "Dịch vụ Thẩm Mỹ y khoa TP.HCM",
      "8 dịch vụ thẩm mỹ chuẩn y khoa tại Thiên Hoàng Kim: nâng mũi hoàng kim, cắt mí phượng hoàng, cấy tóc, căng nội soi, filler, botox…",
      "dịch vụ thẩm mỹ y khoa",
      "thẩm mỹ y khoa, phòng khám thẩm mỹ TP.HCM, nâng mũi, cắt mí, filler, botox",
    ),
  ),
  article(
    "cat-spa",
    "dich-vu-spa-cham-soc",
    "Dịch vụ Spa & chăm sóc toàn diện",
    "01/06/2024",
    "Không gian spa cao cấp — thư giãn, chăm sóc da và làm đẹp không xâm lấn.",
    `Spa tại Thiên Hoàng Kim tập trung vào chăm sóc da, thư giãn cơ thể và làm đẹp không phẫu thuật trong không gian riêng tư, sạch sẽ và cao cấp.

Các liệu trình được thiết kế bởi chuyên viên có chứng chỉ, sử dụng sản phẩm và thiết bị chuẩn spa – y khoa. Khách hàng được tư vấn tình trạng da trước khi chọn gói phù hợp.

Danh mục Spa gồm: Ủ đá muối Himalaya, Phun xăm thẩm mỹ, Massage body thư giãn, Massage facial và Chăm sóc da toàn diện. Mỗi dịch vụ có bài viết riêng giải thích quy trình, lợi ích và lưu ý sau liệu trình.`,
    intro,
    "Spa",
    svcSeo(
      "Dịch vụ Spa & chăm sóc da TP.HCM",
      "Spa cao cấp tại Thiên Hoàng Kim: ủ đá muối Himalaya, phun xăm thẩm mỹ, massage body, facial và chăm sóc da toàn diện.",
      "spa chăm sóc da",
      "spa TP.HCM, chăm sóc da, massage thư giãn, phun xăm thẩm mỹ",
    ),
  ),
];

/** —— Cấp 2: Thẩm Mỹ —— */
const THAM_MY_ARTICLES: SiteArticle[] = [
  article(
    "tm-1",
    "nang-mui-hoang-kim",
    "Nâng mũi hoàng kim — Chuẩn tỉ lệ vàng, tự nhiên",
    "01/07/2026",
    "Nâng mũi hoàng kim cấu trúc theo tỉ lệ vàng — sống mũi thẳng, đầu mũi mềm, hài hòa khuôn mặt. Tư vấn miễn phí tại An Đông, TP.HCM.",
    NANG_MUI_HOANG_KIM_BODY,
    slide,
    "Thẩm mỹ",
    {
      ...DEFAULT_ARTICLE_SEO,
      metaTitle: "Nâng mũi hoàng kim TP.HCM | Thiên Hoàng Kim",
      metaDescription:
        "Nâng mũi hoàng kim cấu trúc chuẩn tỉ lệ vàng tại An Đông TP.HCM — sống thẳng, đầu mũi mềm tự nhiên. Tư vấn miễn phí với bác sĩ tại Thiên Hoàng Kim.",
      focusKeyphrase: "nâng mũi hoàng kim",
      keywords:
        "nâng mũi hoàng kim, nâng mũi cấu trúc, nâng mũi TP.HCM, thẩm mỹ mũi, nâng mũi An Đông, phòng khám nâng mũi",
      canonicalUrl: "https://thienhoangkim.vercel.app/tham-my/nang-mui-hoang-kim",
      ogTitle: "Nâng mũi hoàng kim — Chuẩn tỉ lệ vàng | Thiên Hoàng Kim",
      ogDescription:
        "Nâng mũi hoàng kim cấu trúc chuẩn tỉ lệ vàng — sống thẳng, đầu mũi mềm, tự nhiên. Tư vấn miễn phí tại 323–325 Hùng Vương, An Đông TP.HCM.",
      ogImage: slide,
    },
  ),
  article(
    "tm-2",
    "cat-mi-phuong-hoang",
    "Cắt mí phượng hoàng — Mắt sắc nét, cuốn hút",
    "01/07/2026",
    "Cắt mí phượng hoàng tạo nếp mí cong dài, mắt to tròn và tự nhiên — tư vấn miễn phí tại An Đông, TP.HCM.",
    CAT_MI_PHUONG_HOANG_BODY,
    intro,
    "Thẩm mỹ",
    {
      ...DEFAULT_ARTICLE_SEO,
      metaTitle: "Cắt mí phượng hoàng TP.HCM | Thiên Hoàng Kim",
      metaDescription:
        "Cắt mí phượng hoàng — mắt to sắc nét, nếp mí cong tự nhiên tại An Đông TP.HCM. Tư vấn miễn phí với bác sĩ tại Thiên Hoàng Kim.",
      focusKeyphrase: "cắt mí phượng hoàng",
      keywords:
        "cắt mí phượng hoàng, cắt mí, thẩm mỹ mắt, cắt mí TP.HCM, cắt mí An Đông, phòng khám cắt mí",
      canonicalUrl: "https://thienhoangkim.vercel.app/tham-my/cat-mi-phuong-hoang",
      ogTitle: "Cắt mí phượng hoàng — Mắt sắc nét | Thiên Hoàng Kim",
      ogDescription:
        "Cắt mí phượng hoàng tạo nếp mí cong dài, mắt to tự nhiên. Tư vấn miễn phí tại 323–325 Hùng Vương, An Đông TP.HCM.",
      ogImage: intro,
    },
  ),
  article(
    "tm-3",
    "cay-toc-tu-than",
    "Cấy tóc tự thân — Mật độ cao, mọc tự nhiên",
    "01/07/2026",
    "Cấy tóc FUE/FUT từ nang tóc tự thân — phục hồi hói đầu, đường viền trán tự nhiên. Tư vấn miễn phí tại An Đông, TP.HCM.",
    CAY_TOC_TU_THAN_BODY,
    slide,
    "Thẩm mỹ",
    {
      ...DEFAULT_ARTICLE_SEO,
      metaTitle: "Cấy tóc tự thân TP.HCM | Thiên Hoàng Kim",
      metaDescription:
        "Cấy tóc tự thân FUE/FUT — mật độ cao, hướng mọc tự nhiên tại An Đông TP.HCM. Tư vấn miễn phí điều trị hói đầu tại Thiên Hoàng Kim.",
      focusKeyphrase: "cấy tóc tự thân",
      keywords:
        "cấy tóc tự thân, cấy tóc FUE, cấy tóc FUT, cấy tóc TP.HCM, điều trị hói đầu, cấy tóc An Đông",
      canonicalUrl: "https://thienhoangkim.vercel.app/tham-my/cay-toc-tu-than",
      ogTitle: "Cấy tóc tự thân FUE/FUT | Thiên Hoàng Kim",
      ogDescription:
        "Cấy tóc tự thân mật độ cao, mọc tự nhiên bền lâu. Tư vấn miễn phí tại 323–325 Hùng Vương, An Đông TP.HCM.",
      ogImage: slide,
    },
  ),
  article(
    "tm-4",
    "cang-noi-soi",
    "Căng nội soi — Trẻ hóa sâu, ít sẹo",
    "01/07/2026",
    "Căng nội soi nâng cơ vùng trán, má — trẻ hóa sâu, sẹo ẩn trong tóc. Tư vấn miễn phí tại An Đông, TP.HCM.",
    CANG_NOI_SOI_BODY,
    intro,
    "Thẩm mỹ",
    {
      ...DEFAULT_ARTICLE_SEO,
      metaTitle: "Căng nội soi trẻ hóa mặt TP.HCM | Thiên Hoàng Kim",
      metaDescription:
        "Căng nội soi nâng cơ trán, má — trẻ hóa sâu, sẹo ẩn trong tóc tại An Đông TP.HCM. Tư vấn miễn phí tại Thiên Hoàng Kim.",
      focusKeyphrase: "căng nội soi",
      keywords:
        "căng nội soi, căng da mặt, trẻ hóa da, căng nội soi TP.HCM, thẩm mỹ không phẫu thuật, căng trán nội soi",
      canonicalUrl: "https://thienhoangkim.vercel.app/tham-my/cang-noi-soi",
      ogTitle: "Căng nội soi — Trẻ hóa sâu, ít sẹo | Thiên Hoàng Kim",
      ogDescription:
        "Căng nội soi nâng cơ mặt, sẹo ẩn trong tóc — trẻ hóa tự nhiên. Tư vấn miễn phí tại 323–325 Hùng Vương, An Đông TP.HCM.",
      ogImage: intro,
    },
  ),
  article(
    "tm-5",
    "cang-chi-tre-hoa",
    "Căng chỉ trẻ hóa — Săn chắc không phẫu thuật",
    "01/07/2026",
    "Căng chỉ PDO/PLLA nâng cơ, kích thích collagen — trẻ hóa má, hàm, cổ. Hồi phục nhanh. Tư vấn miễn phí tại An Đông, TP.HCM.",
    CANG_CHI_TRE_HOA_BODY,
    slide,
    "Thẩm mỹ",
    {
      ...DEFAULT_ARTICLE_SEO,
      metaTitle: "Căng chỉ trẻ hóa PDO TP.HCM | Thiên Hoàng Kim",
      metaDescription:
        "Căng chỉ trẻ hóa PDO/PLLA — nâng cơ, săn chắc da không phẫu thuật tại An Đông TP.HCM. Tư vấn miễn phí tại Thiên Hoàng Kim.",
      focusKeyphrase: "căng chỉ trẻ hóa",
      keywords:
        "căng chỉ trẻ hóa, căng chỉ PDO, căng chỉ PLLA, nâng cơ mặt, trẻ hóa da TP.HCM, căng chỉ An Đông",
      canonicalUrl: "https://thienhoangkim.vercel.app/tham-my/cang-chi-tre-hoa",
      ogTitle: "Căng chỉ trẻ hóa — Săn chắc không mổ | Thiên Hoàng Kim",
      ogDescription:
        "Căng chỉ sinh học nâng cơ, kích thích collagen — hồi phục nhanh. Tư vấn miễn phí tại 323–325 Hùng Vương, An Đông TP.HCM.",
      ogImage: slide,
    },
  ),
  article(
    "tm-6",
    "hut-mo-cay-mo-ma",
    "Hút mỡ – cấy mỡ má — Gương mặt V-line",
    "01/07/2026",
    "Combo hút mỡ mặt gọn hàm V-line và cấy mỡ tự thân làm đầy má — tư vấn miễn phí tại An Đông, TP.HCM.",
    HUT_MO_CAY_MO_MA_BODY,
    intro,
    "Thẩm mỹ",
    {
      ...DEFAULT_ARTICLE_SEO,
      metaTitle: "Hút mỡ cấy mỡ má V-line TP.HCM | Thiên Hoàng Kim",
      metaDescription:
        "Hút mỡ cấy mỡ má tạo hình V-line — gọn hàm, má đầy tự nhiên tại An Đông TP.HCM. Tư vấn miễn phí tại Thiên Hoàng Kim.",
      focusKeyphrase: "hút mỡ cấy mỡ má",
      keywords:
        "hút mỡ cấy mỡ má, hút mỡ mặt, cấy mỡ má, V-line, tạo hình mặt TP.HCM, hút mỡ An Đông",
      canonicalUrl: "https://thienhoangkim.vercel.app/tham-my/hut-mo-cay-mo-ma",
      ogTitle: "Hút mỡ – cấy mỡ má V-line | Thiên Hoàng Kim",
      ogDescription:
        "Combo hút mỡ gọn hàm và cấy mỡ tự thân làm đầy má — khuôn mặt trẻ trung. Tư vấn miễn phí tại 323–325 Hùng Vương, An Đông TP.HCM.",
      ogImage: intro,
    },
  ),
  article(
    "tm-7",
    "filler-tao-hinh",
    "Filler tạo hình — Đường nét hài hòa tức thì",
    "01/07/2026",
    "Tiêm filler HA chính hãng tạo hình mũi, môi, cằm, thái dương — kết quả tự nhiên ngay. Tư vấn miễn phí tại An Đông, TP.HCM.",
    FILLER_TAO_HINH_BODY,
    slide,
    "Thẩm mỹ",
    {
      ...DEFAULT_ARTICLE_SEO,
      metaTitle: "Filler tạo hình mũi môi cằm TP.HCM | Thiên Hoàng Kim",
      metaDescription:
        "Filler tạo hình HA chính hãng — mũi, môi, cằm, thái dương tự nhiên tại An Đông TP.HCM. Tư vấn miễn phí tại Thiên Hoàng Kim.",
      focusKeyphrase: "filler tạo hình",
      keywords:
        "filler tạo hình, tiêm filler, filler mũi, filler môi, filler cằm TP.HCM, filler An Đông",
      canonicalUrl: "https://thienhoangkim.vercel.app/tham-my/filler-tao-hinh",
      ogTitle: "Filler tạo hình — Đường nét hài hòa | Thiên Hoàng Kim",
      ogDescription:
        "Tiêm filler HA tạo hình mũi, môi, cằm, thái dương — kết quả ngay, tự nhiên. Tư vấn miễn phí tại 323–325 Hùng Vương, An Đông TP.HCM.",
      ogImage: slide,
    },
  ),
  article(
    "tm-8",
    "botox-xoa-nhan-gon-ham",
    "Botox xóa nhăn, gọn hàm — Khuôn mặt trẻ trung",
    "01/07/2026",
    "Botox giảm nhăn trán, đuôi mắt và thon gọn hàm masseter — tự nhiên, không phẫu thuật. Tư vấn miễn phí tại An Đông, TP.HCM.",
    BOTOX_XOA_NHAN_GON_HAM_BODY,
    intro,
    "Thẩm mỹ",
    {
      ...DEFAULT_ARTICLE_SEO,
      metaTitle: "Botox xóa nhăn gọn hàm TP.HCM | Thiên Hoàng Kim",
      metaDescription:
        "Botox xóa nhăn trán, đuôi mắt và gọn hàm masseter tại An Đông TP.HCM — khuôn mặt trẻ trung tự nhiên. Tư vấn miễn phí tại Thiên Hoàng Kim.",
      focusKeyphrase: "botox xóa nhăn gọn hàm",
      keywords:
        "botox xóa nhăn gọn hàm, tiêm botox, gọn hàm, xóa nhăn trán, botox TP.HCM, botox An Đông",
      canonicalUrl: "https://thienhoangkim.vercel.app/tham-my/botox-xoa-nhan-gon-ham",
      ogTitle: "Botox xóa nhăn, gọn hàm | Thiên Hoàng Kim",
      ogDescription:
        "Botox giảm nhăn động và thon hàm masseter — không mổ, hồi phục nhanh. Tư vấn miễn phí tại 323–325 Hùng Vương, An Đông TP.HCM.",
      ogImage: intro,
    },
  ),
];

/** —— Cấp 2: Spa —— */
const SPA_ARTICLES: SiteArticle[] = [
  article(
    "sp-1",
    "u-da-muoi-himalaya",
    "Ủ đá muối Himalaya — Thải độc, thư giãn sâu",
    "01/07/2026",
    "Ủ đá muối Himalaya ấm — giãn cơ, thư giãn sâu, hỗ trợ lưu thông. Phòng spa riêng 60–90 phút tại An Đông, TP.HCM.",
    U_DA_MUOI_HIMALAYA_BODY,
    slide,
    "Spa",
    {
      ...DEFAULT_ARTICLE_SEO,
      metaTitle: "Ủ đá muối Himalaya TP.HCM | Thiên Hoàng Kim Spa",
      metaDescription:
        "Liệu trình ủ đá muối Himalaya ấm — thư giãn sâu, giãn cơ vai gáy, hỗ trợ tuần hoàn tại spa Thiên Hoàng Kim An Đông TP.HCM.",
      focusKeyphrase: "ủ đá muối Himalaya",
      keywords:
        "ủ đá muối Himalaya, ủ đá muối, spa thải độc, Himalaya salt, massage thư giãn TP.HCM, spa An Đông",
      canonicalUrl: "https://thienhoangkim.vercel.app/spa/u-da-muoi-himalaya",
      ogTitle: "Ủ đá muối Himalaya — Thải độc, thư giãn | Thiên Hoàng Kim",
      ogDescription:
        "Đá muối Himalaya làm ấm kết hợp massage — giảm căng cơ, thư giãn trong phòng spa riêng. Đặt lịch 0938 673 996.",
      ogImage: slide,
    },
  ),
  article(
    "sp-2",
    "phun-xam-tham-my",
    "Phun xăm thẩm mỹ — Mày, môi, eyeliner tự nhiên",
    "01/07/2026",
    "Phun mày, môi, eyeliner bán vĩnh viễn — tự nhiên, tiết kiệm makeup. Phác thảo trước khi phun tại An Đông, TP.HCM.",
    PHUN_XAM_THAM_MY_BODY,
    intro,
    "Spa",
    {
      ...DEFAULT_ARTICLE_SEO,
      metaTitle: "Phun xăm thẩm mỹ mày môi TP.HCM | Thiên Hoàng Kim",
      metaDescription:
        "Phun xăm thẩm mỹ mày, môi, eyeliner tự nhiên — microblading, phun môi organic. Tư vấn phác thảo miễn phí tại spa Thiên Hoàng Kim An Đông TP.HCM.",
      focusKeyphrase: "phun xăm thẩm mỹ",
      keywords:
        "phun xăm thẩm mỹ, phun xăm mày, phun môi, microblading, eyeliner phun, phun xăm TP.HCM",
      canonicalUrl: "https://thienhoangkim.vercel.app/spa/phun-xam-tham-my",
      ogTitle: "Phun xăm thẩm mỹ — Mày, môi tự nhiên | Thiên Hoàng Kim",
      ogDescription:
        "Phun mày, môi, eyeliner bán vĩnh viễn — chuyên viên phác thảo theo khuôn mặt, mực organic. Đặt lịch 0938 673 996.",
      ogImage: intro,
    },
  ),
  article(
    "sp-3",
    "massage-body-thu-gian",
    "Massage body thư giãn — Giải tỏa căng thẳng",
    "01/07/2026",
    "Massage toàn thân Swedish/Thái — giảm căng cơ vai gáy, stress, cải thiện giấc ngủ. Phòng riêng 60–90 phút tại An Đông, TP.HCM.",
    MASSAGE_BODY_THU_GIAN_BODY,
    slide,
    "Spa",
    {
      ...DEFAULT_ARTICLE_SEO,
      metaTitle: "Massage body thư giãn TP.HCM | Thiên Hoàng Kim Spa",
      metaDescription:
        "Massage body thư giãn toàn thân kỹ thuật Swedish/Thái — giảm mỏi cơ, căng thẳng, cải thiện giấc ngủ tại spa Thiên Hoàng Kim An Đông TP.HCM.",
      focusKeyphrase: "massage body thư giãn",
      keywords:
        "massage body thư giãn, massage body, massage toàn thân, spa massage TP.HCM, massage An Đông",
      canonicalUrl: "https://thienhoangkim.vercel.app/spa/massage-body-thu-gian",
      ogTitle: "Massage body thư giãn | Thiên Hoàng Kim Spa",
      ogDescription:
        "Massage toàn thân trong phòng riêng — chọn lực nhẹ hoặc sâu, tinh dầu thảo dược. Đặt lịch 0938 673 996.",
      ogImage: slide,
    },
  ),
  article(
    "sp-4",
    "massage-facial",
    "Massage facial — Da sáng, thư giãn",
    "01/07/2026",
    "Massage mặt, cổ, vai kết hợp ấn huyệt — da hồng hào, giảm phù, thư giãn sâu. Gói 45–75 phút tại An Đông, TP.HCM.",
    MASSAGE_FACIAL_BODY,
    intro,
    "Spa",
    {
      ...DEFAULT_ARTICLE_SEO,
      metaTitle: "Massage facial TP.HCM | Thiên Hoàng Kim Spa",
      metaDescription:
        "Massage facial mặt cổ vai — lưu thông lymph, da căng mịn, thư giãn sâu. Chăm sóc da nhẹ nhàng tại spa Thiên Hoàng Kim An Đông TP.HCM.",
      focusKeyphrase: "massage facial",
      keywords:
        "massage facial, massage mặt, facial spa, chăm sóc da mặt TP.HCM, massage facial An Đông",
      canonicalUrl: "https://thienhoangkim.vercel.app/spa/massage-facial",
      ogTitle: "Massage facial — Da sáng, thư giãn | Thiên Hoàng Kim",
      ogDescription:
        "Massage mặt kết hợp ấn huyệt và dưỡng ẩm — phù hợp trước sự kiện hoặc sau ngày căng thẳng. Đặt lịch 0938 673 996.",
      ogImage: intro,
    },
  ),
  article(
    "sp-5",
    "cham-soc-da-toan-dien",
    "Chăm sóc da toàn diện — Phác đồ cá nhân hóa",
    "01/07/2026",
    "Facial 75–90 phút: soi da, làm sạch sâu, hút bã, massage, mask — phác đồ theo từng loại da tại An Đông, TP.HCM.",
    CHAM_SOC_DA_TOAN_DIEN_BODY,
    slide,
    "Spa",
    {
      ...DEFAULT_ARTICLE_SEO,
      metaTitle: "Chăm sóc da toàn diện TP.HCM | Thiên Hoàng Kim Spa",
      metaDescription:
        "Chăm sóc da toàn diện cá nhân hóa — soi da, làm sạch sâu, hút bã, dưỡng ẩm. Phác đồ facial 75–90 phút tại spa Thiên Hoàng Kim An Đông TP.HCM.",
      focusKeyphrase: "chăm sóc da toàn diện",
      keywords:
        "chăm sóc da toàn diện, facial spa, chăm sóc da mặt, spa da TP.HCM, hút bã nhờn, phác đồ da",
      canonicalUrl: "https://thienhoangkim.vercel.app/spa/cham-soc-da-toan-dien",
      ogTitle: "Chăm sóc da toàn diện — Phác đồ cá nhân | Thiên Hoàng Kim",
      ogDescription:
        "Soi da, làm sạch sâu, massage và mask theo loại da — da sáng mịn sau một buổi. Đặt lịch 0938 673 996.",
      ogImage: slide,
    },
  ),
];

/** —— Tin tức / Kiến thức (ưu tiên 10 bài) —— */
const NEWS_ARTICLES: SiteArticle[] = [
  article(
    "tn-1",
    "filler-va-botox-khac-nhau",
    "Filler và botox khác nhau thế nào?",
    "01/07/2026",
    "Filler bổ sung thể tích, botox giảm co cơ — so sánh cơ chế, vùng tiêm và khi nào nên dùng từng loại.",
    FILLER_VA_BOTOX_KHAC_NHAU_BODY,
    intro,
    "Kiến thức",
    newsSeo(
      "filler-va-botox-khac-nhau",
      "Filler và botox khác nhau thế nào",
      "So sánh filler và botox khác nhau: cơ chế, vùng tiêm, độ bền và phác đồ kết hợp an toàn. Tư vấn tiêm thẩm mỹ miễn phí tại Thiên Hoàng Kim An Đông TP.HCM.",
      "filler và botox khác nhau",
      "filler botox khác nhau, tiêm filler, tiêm botox, so sánh filler botox",
    ),
  ),
  article(
    "tn-2",
    "nang-mui-co-dau-khong",
    "Nâng mũi có đau không? Mức đau thực tế sau phẫu thuật",
    "01/07/2026",
    "Trong mổ không đau nhờ gây mê; sau mổ đau nhẹ đến vừa 3–7 ngày — kiểm soát bằng thuốc và chăm sóc đúng.",
    NANG_MUI_CO_DAU_KHONG_BODY,
    slide,
    "Kiến thức",
    newsSeo(
      "nang-mui-co-dau-khong",
      "Nâng mũi có đau không",
      "Nâng mũi có đau không? Giải thích mức đau trong và sau mổ, timeline hồi phục và cách giảm đau. Tư vấn nâng mũi tại Thiên Hoàng Kim An Đông TP.HCM.",
      "nâng mũi có đau không",
      "nâng mũi đau không, đau sau nâng mũi, nâng mũi TP.HCM",
    ),
  ),
  article(
    "tn-3",
    "cat-mi-bao-lau-hoi-phuc",
    "Cắt mí bao lâu hồi phục? Timeline từng giai đoạn",
    "01/07/2026",
    "Sưng bầm 7–10 ngày; mí ổn định 1–3 tháng — timeline hồi phục cắt mí và khi nào đi làm lại.",
    CAT_MI_BAO_LAU_HOI_PHUC_BODY,
    intro,
    "Kiến thức",
    newsSeo(
      "cat-mi-bao-lau-hoi-phuc",
      "Cắt mí bao lâu hồi phục",
      "Cắt mí bao lâu hết sưng? Timeline hồi phục từng tuần và chăm sóc sau mổ. Tư vấn cắt mí tại Thiên Hoàng Kim.",
      "cắt mí bao lâu hồi phục",
      "cắt mí hồi phục, cắt mí bao lâu hết sưng, cắt mí TP.HCM",
    ),
  ),
  article(
    "tn-4",
    "phun-moi-co-dau-khong",
    "Phun môi có đau không? Cảm giác thực tế khi phun",
    "01/07/2026",
    "Có tê trước khi phun; cảm giác rung nhẹ 1–2 giờ — môi sưng vài ngày sau, màu ổn định sau 4–6 tuần.",
    PHUN_MOI_CO_DAU_KHONG_BODY,
    intro,
    "Spa",
    newsSeo(
      "phun-moi-co-dau-khong",
      "Phun môi có đau không",
      "Phun môi có đau không? Quy trình tê, mức đau và chăm sóc sau phun môi thẩm mỹ tại spa Thiên Hoàng Kim.",
      "phun môi có đau không",
      "phun môi đau không, phun môi thẩm mỹ, phun xăm môi TP.HCM",
    ),
  ),
  article(
    "tn-5",
    "cham-soc-da-mat-dung-cach",
    "Chăm sóc da mặt đúng cách — 3 trụ cột skincare",
    "01/07/2026",
    "Làm sạch, dưỡng và chống nắng — routine theo loại da và sai lầm thường gặp khi skincare tại nhà.",
    CHAM_SOC_DA_MAT_DUNG_CACH_BODY,
    slide,
    "Kiến thức",
    newsSeo(
      "cham-soc-da-mat-dung-cach",
      "Chăm sóc da mặt đúng cách",
      "Hướng dẫn chăm sóc da mặt đúng cách: làm sạch, dưỡng ẩm, chống nắng theo loại da. Facial tại Thiên Hoàng Kim Spa.",
      "chăm sóc da mặt đúng cách",
      "skincare đúng cách, chăm sóc da mặt, routine da mặt",
    ),
  ),
  article(
    "tn-6",
    "phong-kham-tham-my-an-dong",
    "Phòng khám thẩm mỹ An Đông — Thiên Hoàng Kim",
    "01/07/2026",
    "323–325 Hùng Vương, An Đông — thẩm mỹ y khoa và spa; mở 08:00–20:00, tư vấn miễn phí.",
    PHONG_KHAM_THAM_MY_AN_DONG_BODY,
    intro,
    "Tin tức",
    newsSeo(
      "phong-kham-tham-my-an-dong",
      "Phòng khám thẩm mỹ An Đông",
      "Phòng khám thẩm mỹ An Đông Quận 5 — Thiên Hoàng Kim 323–325 Hùng Vương. Nâng mũi, filler, botox, spa. Mở 08:00–20:00. Gọi 0938 673 996.",
      "phòng khám thẩm mỹ An Đông",
      "thẩm mỹ An Đông, phòng khám Quận 5, Thiên Hoàng Kim Hùng Vương",
    ),
  ),
  article(
    "tn-7",
    "botox-gon-ham-bao-lau",
    "Botox gọn hàm bao lâu thấy kết quả?",
    "01/07/2026",
    "Bắt đầu 2–4 tuần, rõ nhất 6–8 tuần — timeline botox masseter và khi nào tái tiêm.",
    BOTOX_GON_HAM_BAO_LAU_BODY,
    slide,
    "Kiến thức",
    newsSeo(
      "botox-gon-ham-bao-lau",
      "Botox gọn hàm bao lâu thấy kết quả",
      "Botox gọn hàm bao lâu hiệu quả? Timeline 2–8 tuần và duy trì 4–6 tháng. Tư vấn botox tại Thiên Hoàng Kim.",
      "botox gọn hàm bao lâu thấy kết quả",
      "botox gọn hàm, thon hàm botox, botox masseter TP.HCM",
    ),
  ),
  article(
    "tn-8",
    "cay-toc-fue-la-gi",
    "Cấy tóc FUE là gì? Ưu nhược điểm và quy trình",
    "01/07/2026",
    "FUE lấy từng nang tóc tự thân — ít sẹo dải, hồi phục nhanh; so sánh FUE và FUT.",
    CAY_TOC_FUE_LA_GI_BODY,
    intro,
    "Kiến thức",
    newsSeo(
      "cay-toc-fue-la-gi",
      "Cấy tóc FUE là gì",
      "Cấy tóc FUE là gì? Quy trình, ưu nhược điểm so với FUT và thời gian tóc mọc. Tư vấn cấy tóc Thiên Hoàng Kim.",
      "cấy tóc FUE là gì",
      "cấy tóc FUE, FUE FUT, cấy tóc tự thân TP.HCM",
    ),
  ),
  article(
    "tn-9",
    "chon-phong-kham-tham-my-an-toan",
    "Chọn phòng khám thẩm mỹ an toàn — Checklist 10 điểm",
    "01/07/2026",
    "Bác sĩ có chứng chỉ, sản phẩm rõ nguồn, tư vấn trung thực — checklist trước khi làm đẹp.",
    CHON_PHONG_KHAM_THAM_MY_AN_TOAN_BODY,
    slide,
    "Kiến thức",
    newsSeo(
      "chon-phong-kham-tham-my-an-toan",
      "Chọn phòng khám thẩm mỹ an toàn",
      "Checklist chọn phòng khám thẩm mỹ uy tín, an toàn tại TP.HCM — 10 tiêu chí và dấu hiệu nên tránh.",
      "chọn phòng khám thẩm mỹ an toàn",
      "phòng khám thẩm mỹ uy tín, thẩm mỹ an toàn TP.HCM",
    ),
  ),
  article(
    "tn-10",
    "xu-huong-tham-my-2026",
    "Xu hướng thẩm mỹ 2026 — Tự nhiên và cá nhân hóa",
    "01/07/2026",
    "Đẹp tinh tế, thẩm mỹ nam tăng, kết hợp skincare và công nghệ ít xâm lấn — xu hướng làm đẹp năm 2026.",
    XU_HUONG_THAM_MY_2026_BODY,
    intro,
    "Tin tức",
    newsSeo(
      "xu-huong-tham-my-2026",
      "Xu hướng thẩm mỹ 2026",
      "Xu hướng thẩm mỹ 2026: tự nhiên, filler botox nhẹ, thẩm mỹ nam, HIFU và chăm sóc da kết hợp. Tư vấn tại Thiên Hoàng Kim.",
      "xu hướng thẩm mỹ 2026",
      "xu hướng làm đẹp 2026, thẩm mỹ tự nhiên, trend thẩm mỹ",
    ),
  ),
];

/** Bài kiến thức chung (không gắn dịch vụ cụ thể) */
const GENERAL_ARTICLES: SiteArticle[] = [
  article(
    "kn-1",
    "5-dau-hieu-nen-tham-kham-da-lieu",
    "5 dấu hiệu bạn nên thăm khám da liễu thẩm mỹ",
    "01/07/2026",
    "Mụn tái phát, nám lan, da nhạy cảm kéo dài — 5 dấu hiệu cần gặp bác sĩ thay vì tự trị tại nhà bằng mỹ phẩm.",
    DAU_HIEU_THAM_KHAM_DA_LIEU_BODY,
    slide,
    "Kiến thức",
    newsSeo(
      "5-dau-hieu-nen-tham-kham-da-lieu",
      "5 dấu hiệu thăm khám da liễu thẩm mỹ",
      "Thăm khám da liễu thẩm mỹ khi nào? 5 dấu hiệu mụn nặng, nám, da nhạy cảm — nên gặp bác sĩ thay vì tự điều trị. Tư vấn tại Thiên Hoàng Kim An Đông TP.HCM.",
      "thăm khám da liễu thẩm mỹ",
      "thăm khám da liễu, dấu hiệu da liễu, mụn nám, tư vấn da TP.HCM",
    ),
  ),
  article(
    "kn-2",
    "cham-soc-da-sau-phau-thuat",
    "Chăm sóc sau phẫu thuật thẩm mỹ — Hướng dẫn chi tiết",
    "01/07/2026",
    "Chăm sóc sau phẫu thuật thẩm mỹ đúng cách quyết định kết quả lâu dài — vết mổ, chống nắng, tái khám và dấu hiệu cần gọi bác sĩ.",
    CHAM_SOC_SAU_PHAU_THUAT_THAM_MY_BODY,
    intro,
    "Kiến thức",
    newsSeo(
      "cham-soc-da-sau-phau-thuat",
      "Chăm sóc sau phẫu thuật thẩm mỹ",
      "Chăm sóc sau phẫu thuật thẩm mỹ: chườm lạnh, thuốc, chống nắng SPF50+, tái khám và dấu hiệu bất thường. Hướng dẫn tại Thiên Hoàng Kim TP.HCM.",
      "chăm sóc sau phẫu thuật thẩm mỹ",
      "chăm sóc sau mổ, hồi phục thẩm mỹ, chăm sóc vết mổ, sau nâng mũi cắt mí",
    ),
  ),
];

export const DEFAULT_ARTICLES: SiteArticle[] = [
  ...CATEGORY_ARTICLES,
  ...THAM_MY_ARTICLES,
  ...SPA_ARTICLES,
  ...NEWS_ARTICLES,
  ...GENERAL_ARTICLES,
];
