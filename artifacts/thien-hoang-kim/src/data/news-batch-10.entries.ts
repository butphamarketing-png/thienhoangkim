/** Wire tn-291 → tn-315 — Batch 10 cạnh tranh địa phương */

import {
  THAM_MY_QUAN_5_BODY,
  NANG_MUI_TPHCM_BODY,
  FILLER_TPHCM_BODY,
  CAT_MI_TPHCM_BODY,
  BOTOX_TPHCM_BODY,
  PHONG_KHAM_THAM_MY_QUAN_5_BODY,
  CHI_PHI_NANG_MUI_QUAN_5_BODY,
  CHI_PHI_CAT_MI_QUAN_5_BODY,
  CHI_PHI_FILLER_QUAN_5_BODY,
  SPA_QUAN_5_BODY,
  TRI_NAM_QUAN_5_BODY,
  PHUN_MAY_QUAN_5_BODY,
  THAM_MY_HUNG_VUONG_BODY,
  LAM_DEP_AN_DONG_BODY,
  THAM_MY_CHO_LON_BODY,
  CLINIC_QUAN_5_UY_TIN_BODY,
  FILLER_HAY_BOTOX_BODY,
  CAT_MI_HAY_NHAN_MI_BODY,
  NANG_MUI_SUN_HAY_BOC_SUN_BODY,
  THAM_MY_UY_TIN_TPHCM_BODY,
  BOTOX_QUAN_5_BODY,
  PHONG_KHAM_LAM_DEP_QUAN_5_BODY,
  DICH_VU_THAM_MY_AN_DONG_BODY,
  SPA_AN_DONG_HUNG_VUONG_BODY,
  TOP_PHONG_KHAM_QUAN_5_BODY,
} from "@/data/articles/news-batch-10-competitive.body";
import { buildNewsArticleSeo } from "@/lib/article-seo";
import { DEFAULT_ARTICLE_SEO } from "@/lib/seo";
import type { ArticleSeo, SiteArticle } from "@/types/site-content";

const publicAsset = (file: string) =>
  `${import.meta.env.BASE_URL}${file}`.replace(/([^:]\/)\/+/g, "$1");

const intro = publicAsset("gioithieu.1.png");
const spaImage = publicAsset("uploads/Spa.jpg");
const nangMuiImage = publicAsset("uploads/nang-mui-hoang-kim.png");
const catMiImage = publicAsset("uploads/cat-mi-phuong-hoang.png");
const fillerImage = publicAsset("uploads/filler-tao-hinh.png");
const botoxImage = publicAsset("uploads/botox-xoa-nhan-gon-ham.png");
const phunMayImage = publicAsset("uploads/phun-xam-tham-my.png");
const chamSocDaImage = publicAsset("uploads/cham-soc-da-toan-dien.png");

function newsSeo(
  slug: string,
  metaDescription: string,
  focusKeyphrase: string,
  keywords?: string,
  ogImage = intro,
): ArticleSeo {
  return buildNewsArticleSeo(slug, metaDescription, focusKeyphrase, keywords, ogImage);
}

function article(
  id: string,
  slug: string,
  title: string,
  date: string,
  description: string,
  body: string,
  image = intro,
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

type Batch10Entry = {
  id: string;
  slug: string;
  title: string;
  description: string;
  focus: string;
  keywords: string;
  body: string;
  image?: string;
  category: "Tin tức" | "Kiến thức";
};

const BATCH_10_ENTRIES: Batch10Entry[] = [
  {
    id: "tn-291",
    slug: "tham-my-quan-5",
    title: "Thẩm mỹ Quận 5: Tiêu chí chọn địa chỉ phù hợp",
    description: "Kinh nghiệm chọn thẩm mỹ Quận 5 dựa trên tư vấn, chuyên môn, chi phí và quy trình theo dõi thay vì chỉ nhìn quảng cáo.",
    focus: "thẩm mỹ quận 5",
    keywords: "thẩm mỹ quận 5, địa chỉ thẩm mỹ quận 5, thẩm mỹ An Đông",
    body: THAM_MY_QUAN_5_BODY,
    category: "Tin tức",
  },
  {
    id: "tn-292",
    slug: "nang-mui-tphcm",
    title: "Nâng mũi TP.HCM: Chọn dáng và phương pháp thế nào?",
    description: "Tìm hiểu nâng mũi TP.HCM: cách đánh giá cấu trúc, chọn vật liệu, chuẩn bị hồi phục và nhận báo giá phù hợp.",
    focus: "nâng mũi tphcm",
    keywords: "nâng mũi tphcm, nâng mũi đẹp tphcm, nâng mũi an toàn",
    body: NANG_MUI_TPHCM_BODY,
    image: nangMuiImage,
    category: "Tin tức",
  },
  {
    id: "tn-293",
    slug: "filler-tphcm",
    title: "Filler TP.HCM: Điều cần kiểm tra trước khi tiêm",
    description: "Hướng dẫn chọn filler TP.HCM an toàn hơn: hiểu chỉ định, kiểm tra sản phẩm, lượng tiêm và dấu hiệu cần theo dõi.",
    focus: "filler tphcm",
    keywords: "filler tphcm, tiêm filler tphcm, filler chính hãng",
    body: FILLER_TPHCM_BODY,
    image: fillerImage,
    category: "Tin tức",
  },
  {
    id: "tn-294",
    slug: "cat-mi-tphcm",
    title: "Cắt mí TP.HCM: Thiết kế nếp mí và chăm sóc hồi phục",
    description: "Cắt mí TP.HCM cần đánh giá nền mí, thiết kế hài hòa và theo dõi đúng. Xem tiêu chí lựa chọn và chăm sóc sau thực hiện.",
    focus: "cắt mí tphcm",
    keywords: "cắt mí tphcm, cắt mí đẹp tphcm, phẫu thuật mí mắt",
    body: CAT_MI_TPHCM_BODY,
    image: catMiImage,
    category: "Tin tức",
  },
  {
    id: "tn-295",
    slug: "botox-tphcm",
    title: "Botox TP.HCM: Hiểu đúng chỉ định, liều và theo dõi",
    description: "Botox TP.HCM không chỉ là giá theo điểm. Tìm hiểu cơ chế, cách cá nhân hóa liều và những dấu hiệu cần lưu ý sau tiêm.",
    focus: "botox tphcm",
    keywords: "botox tphcm, tiêm botox tphcm, botox xóa nhăn",
    body: BOTOX_TPHCM_BODY,
    image: botoxImage,
    category: "Tin tức",
  },
  {
    id: "tn-296",
    slug: "phong-kham-tham-my-quan-5",
    title: "Phòng khám thẩm mỹ Quận 5: Cách kiểm tra trước khi chọn",
    description: "Tiêu chí đánh giá phòng khám thẩm mỹ Quận 5 qua tính minh bạch, chuyên môn, quy trình tư vấn và hậu chăm sóc.",
    focus: "phòng khám thẩm mỹ quận 5",
    keywords: "phòng khám thẩm mỹ quận 5, thẩm mỹ an đông, clinic quận 5",
    body: PHONG_KHAM_THAM_MY_QUAN_5_BODY,
    category: "Tin tức",
  },
  {
    id: "tn-297",
    slug: "chi-phi-nang-mui-quan-5",
    title: "Chi phí nâng mũi Quận 5 gồm những khoản nào?",
    description: "Chi phí nâng mũi Quận 5 phụ thuộc cấu trúc, vật liệu và độ phức tạp. Cách đọc báo giá và tránh khoản phát sinh.",
    focus: "chi phí nâng mũi quận 5",
    keywords: "chi phí nâng mũi quận 5, giá nâng mũi quận 5, nâng mũi an đông",
    body: CHI_PHI_NANG_MUI_QUAN_5_BODY,
    image: nangMuiImage,
    category: "Tin tức",
  },
  {
    id: "tn-298",
    slug: "chi-phi-cat-mi-quan-5",
    title: "Chi phí cắt mí Quận 5 và cách so sánh báo giá",
    description: "Tìm hiểu chi phí cắt mí Quận 5, các khoản thường bao gồm và lý do không nên chọn dịch vụ chỉ vì giá thấp.",
    focus: "chi phí cắt mí quận 5",
    keywords: "chi phí cắt mí quận 5, giá cắt mí quận 5, cắt mí an đông",
    body: CHI_PHI_CAT_MI_QUAN_5_BODY,
    image: catMiImage,
    category: "Tin tức",
  },
  {
    id: "tn-299",
    slug: "chi-phi-filler-quan-5",
    title: "Chi phí filler Quận 5: Đừng chỉ so giá mỗi ml",
    description: "Chi phí filler Quận 5 cần xét sản phẩm, vùng tiêm, lượng dùng và người thực hiện. Các câu hỏi nên đặt trước thanh toán.",
    focus: "chi phí filler quận 5",
    keywords: "chi phí filler quận 5, giá filler quận 5, tiêm filler an đông",
    body: CHI_PHI_FILLER_QUAN_5_BODY,
    image: fillerImage,
    category: "Tin tức",
  },
  {
    id: "tn-300",
    slug: "spa-quan-5",
    title: "Spa Quận 5: Chọn liệu trình đúng với nhu cầu",
    description: "Cách chọn spa Quận 5 minh bạch, phân biệt chăm sóc spa với thủ thuật thẩm mỹ và tránh mua liệu trình không cần thiết.",
    focus: "spa quận 5",
    keywords: "spa quận 5, spa an đông, chăm sóc da quận 5",
    body: SPA_QUAN_5_BODY,
    image: spaImage,
    category: "Tin tức",
  },
  {
    id: "tn-301",
    slug: "tri-nam-quan-5",
    title: "Trị nám Quận 5: Vì sao cần kế hoạch dài hạn?",
    description: "Trị nám Quận 5 cần phân loại sắc tố, chống nắng và điều trị thận trọng. Nhận biết cam kết thiếu thực tế trước khi chọn.",
    focus: "trị nám quận 5",
    keywords: "trị nám quận 5, điều trị nám an đông, chăm sóc nám quận 5",
    body: TRI_NAM_QUAN_5_BODY,
    image: chamSocDaImage,
    category: "Tin tức",
  },
  {
    id: "tn-302",
    slug: "phun-may-quan-5",
    title: "Phun mày Quận 5: Chọn dáng, màu và kỹ thuật",
    description: "Phun mày Quận 5 tự nhiên cần thiết kế theo gương mặt, chọn kỹ thuật theo loại da và chăm sóc đúng trong giai đoạn bong.",
    focus: "phun mày quận 5",
    keywords: "phun mày quận 5, phun mày an đông, hairstroke quận 5",
    body: PHUN_MAY_QUAN_5_BODY,
    image: phunMayImage,
    category: "Tin tức",
  },
  {
    id: "tn-303",
    slug: "tham-my-hung-vuong",
    title: "Thẩm mỹ Hùng Vương: Thuận tiện tư vấn và tái khám",
    description: "Tìm hiểu địa chỉ thẩm mỹ Hùng Vương tại khu An Đông, cách chọn nhóm dịch vụ và chuẩn bị cho buổi tư vấn đầu tiên.",
    focus: "thẩm mỹ hùng vương",
    keywords: "thẩm mỹ hùng vương, thẩm mỹ an đông, thiên hoàng kim hùng vương",
    body: THAM_MY_HUNG_VUONG_BODY,
    category: "Tin tức",
  },
  {
    id: "tn-304",
    slug: "lam-dep-an-dong",
    title: "Làm đẹp An Đông: Lập kế hoạch theo đúng nhu cầu",
    description: "Làm đẹp An Đông nên bắt đầu từ mục tiêu cụ thể, sắp xếp dịch vụ an toàn và chuẩn bị ngân sách cùng lịch hồi phục.",
    focus: "làm đẹp an đông",
    keywords: "làm đẹp an đông, spa an đông, thẩm mỹ an đông",
    body: LAM_DEP_AN_DONG_BODY,
    image: spaImage,
    category: "Tin tức",
  },
  {
    id: "tn-305",
    slug: "tham-my-cho-lon",
    title: "Thẩm mỹ Chợ Lớn: Tiêu chí chọn nơi phù hợp",
    description: "Kinh nghiệm tìm thẩm mỹ Chợ Lớn qua tư vấn, quy trình, sản phẩm và hỗ trợ sau dịch vụ thay vì chỉ xem video quảng cáo.",
    focus: "thẩm mỹ chợ lớn",
    keywords: "thẩm mỹ chợ lớn, thẩm mỹ quận 5, thẩm mỹ an đông",
    body: THAM_MY_CHO_LON_BODY,
    category: "Tin tức",
  },
  {
    id: "tn-306",
    slug: "clinic-quan-5-uy-tin",
    title: "Clinic Quận 5 uy tín: 6 câu hỏi để tự kiểm tra",
    description: "Clinic Quận 5 uy tín cần minh bạch, chỉ định có trách nhiệm và theo dõi rõ. Sáu câu hỏi hữu ích trước khi đồng ý.",
    focus: "clinic quận 5 uy tín",
    keywords: "clinic quận 5 uy tín, clinic an đông, phòng khám làm đẹp quận 5",
    body: CLINIC_QUAN_5_UY_TIN_BODY,
    category: "Tin tức",
  },
  {
    id: "tn-307",
    slug: "filler-hay-botox",
    title: "Filler hay botox: Chọn theo thể tích hay hoạt động cơ?",
    description: "Filler hay botox phụ thuộc nguyên nhân: filler bổ sung thể tích, botox giảm hoạt động cơ. Xem khi nào dùng và có nên kết hợp.",
    focus: "filler hay botox",
    keywords: "filler hay botox, filler và botox khác nhau, nên tiêm filler hay botox",
    body: FILLER_HAY_BOTOX_BODY,
    image: fillerImage,
    category: "Kiến thức",
  },
  {
    id: "tn-308",
    slug: "cat-mi-hay-nhan-mi",
    title: "Cắt mí hay nhấn mí: Phương pháp nào phù hợp?",
    description: "So sánh cắt mí hay nhấn mí theo nền mí, mức da dư, khả năng hồi phục và độ bền để chuẩn bị cho buổi thăm khám.",
    focus: "cắt mí hay nhấn mí",
    keywords: "cắt mí hay nhấn mí, nên cắt mí hay bấm mí, so sánh cắt mí nhấn mí",
    body: CAT_MI_HAY_NHAN_MI_BODY,
    image: catMiImage,
    category: "Kiến thức",
  },
  {
    id: "tn-309",
    slug: "nang-mui-sun-hay-boc-sun",
    title: "Nâng mũi sụn hay bọc sụn: Hiểu đúng trước khi chọn",
    description: "Nâng mũi sụn hay bọc sụn không hẳn là hai lựa chọn đối lập. Tìm hiểu vai trò vật liệu và cách chọn theo cấu trúc.",
    focus: "nâng mũi sụn hay bọc sụn",
    keywords: "nâng mũi sụn hay bọc sụn, nâng mũi bọc sụn, sụn nâng mũi",
    body: NANG_MUI_SUN_HAY_BOC_SUN_BODY,
    image: nangMuiImage,
    category: "Kiến thức",
  },
  {
    id: "tn-310",
    slug: "tham-my-uy-tin-tphcm",
    title: "Thẩm mỹ uy tín TP.HCM: Bộ tiêu chí có thể kiểm chứng",
    description: "Cách tìm thẩm mỹ uy tín TP.HCM bằng tiêu chí minh bạch, chỉ định, vật liệu và hậu chăm sóc thay cho xếp hạng cảm tính.",
    focus: "thẩm mỹ uy tín tphcm",
    keywords: "thẩm mỹ uy tín tphcm, địa chỉ thẩm mỹ tphcm, clinic uy tín tphcm",
    body: THAM_MY_UY_TIN_TPHCM_BODY,
    category: "Tin tức",
  },
  {
    id: "tn-311",
    slug: "botox-quan-5",
    title: "Botox Quận 5: Đánh giá cơ, sản phẩm và thời điểm",
    description: "Botox Quận 5 cần đánh giá biểu cảm, chọn liều theo sức cơ, kiểm tra sản phẩm và theo dõi đúng thời điểm sau tiêm.",
    focus: "botox quận 5",
    keywords: "botox quận 5, tiêm botox quận 5, botox an đông",
    body: BOTOX_QUAN_5_BODY,
    image: botoxImage,
    category: "Tin tức",
  },
  {
    id: "tn-312",
    slug: "phong-kham-lam-dep-quan-5",
    title: "Phòng khám làm đẹp Quận 5: Chọn dịch vụ theo ưu tiên",
    description: "Phòng khám làm đẹp Quận 5 cần phân luồng đúng chăm sóc, tiêm và phẫu thuật, đồng thời có hướng dẫn hậu chăm sóc rõ.",
    focus: "phòng khám làm đẹp quận 5",
    keywords: "phòng khám làm đẹp quận 5, clinic làm đẹp quận 5, làm đẹp an đông",
    body: PHONG_KHAM_LAM_DEP_QUAN_5_BODY,
    category: "Tin tức",
  },
  {
    id: "tn-313",
    slug: "dich-vu-tham-my-an-dong",
    title: "Dịch vụ thẩm mỹ An Đông: Hiểu ba nhóm can thiệp",
    description: "Dịch vụ thẩm mỹ An Đông gồm chăm sóc, tiêm và phẫu thuật. Phân biệt mục tiêu, mức hồi phục và cách sắp xếp an toàn.",
    focus: "dịch vụ thẩm mỹ an đông",
    keywords: "dịch vụ thẩm mỹ an đông, thẩm mỹ an đông, làm đẹp quận 5",
    body: DICH_VU_THAM_MY_AN_DONG_BODY,
    category: "Tin tức",
  },
  {
    id: "tn-314",
    slug: "spa-an-dong-hung-vuong",
    title: "Spa An Đông Hùng Vương: Chọn buổi chăm sóc phù hợp",
    description: "Spa An Đông Hùng Vương thuận tiện cho chăm sóc định kỳ. Cách chọn gói, tránh chồng chéo sau thủ thuật và đặt lịch.",
    focus: "spa an đông hùng vương",
    keywords: "spa an đông hùng vương, spa hùng vương, spa quận 5",
    body: SPA_AN_DONG_HUNG_VUONG_BODY,
    image: spaImage,
    category: "Tin tức",
  },
  {
    id: "tn-315",
    slug: "top-phong-kham-quan-5",
    title: "Top phòng khám Quận 5: Xếp hạng bằng tiêu chí nào?",
    description: "Top phòng khám Quận 5 nên dựa trên minh bạch, chỉ định và hậu chăm sóc. Danh sách tiêu chí để bạn tự khảo sát khách quan.",
    focus: "top phòng khám quận 5",
    keywords: "top phòng khám quận 5, phòng khám thẩm mỹ quận 5, clinic quận 5",
    body: TOP_PHONG_KHAM_QUAN_5_BODY,
    category: "Tin tức",
  },
];

export const MANUAL_BATCH_10_ARTICLES: SiteArticle[] = BATCH_10_ENTRIES.map((e) =>
  article(
    e.id,
    e.slug,
    e.title,
    "14/07/2026",
    e.description,
    e.body,
    e.image ?? intro,
    e.category,
    newsSeo(e.slug, e.description, e.focus, e.keywords, e.image ?? intro),
  ),
);
