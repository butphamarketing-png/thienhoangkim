/** Wire tn-316 → tn-335. Batch 11 SEO cạnh tranh, tiêu đề hút nhắn tin */

import {
  NANG_MUI_LAN_DAU_TREND_BODY,
  NANG_MUI_CAU_TRUC_HAY_FILLER_BODY,
  MUI_LO_SONG_TUT_SUN_BODY,
  SAU_NANG_MUI_KIENG_14_NGAY_BODY,
  NANG_MUI_AN_DONG_HOI_GI_BODY,
  GIA_NANG_MUI_RE_AN_PHI_BODY,
  CAT_MI_HAY_BAM_MI_BODY,
  SUP_MI_NHE_CO_CAN_CAT_BODY,
  SUNG_SAU_CAT_MI_1_DEN_7_BODY,
  CAT_MI_QUAN_5_DO_TY_LE_BODY,
  MAT_HONG_SAU_THAM_MY_BODY,
  FILLER_MOI_KHONG_MO_VIT_BODY,
  BOTOX_GON_HAM_LO_NET_BODY,
  FILLER_BOTOX_60_GIAY_BODY,
  CANG_CHI_HOP_KHI_NAO_BODY,
  HIFU_CHI_HAY_FILLER_BODY,
  DA_XIN_LO_CHAN_LONG_BODY,
  PHUN_XAM_MAY_2026_BODY,
  DIA_CHI_THAM_MY_7_TIEU_CHI_BODY,
  FACIAL_HAY_PEEL_SU_KIEN_BODY,
} from "@/data/articles/news-batch-11-competitive.body";
import {
  DEPTH_NANG_MUI_TREND,
  DEPTH_NANG_MUI_CAU_TRUC_FILLER,
  DEPTH_MUI_LO_SONG,
  DEPTH_SAU_NANG_MUI_14,
  DEPTH_NANG_MUI_HOI_GI,
  DEPTH_GIA_NANG_MUI,
  DEPTH_CAT_MI_BAM_MI,
  DEPTH_SUP_MI,
  DEPTH_SUNG_CAT_MI,
  DEPTH_CAT_MI_DO_TY_LE,
  DEPTH_FILLER_MOI,
  DEPTH_BOTOX_HAM,
  DEPTH_FILLER_BOTOX_60,
  DEPTH_CHECKLIST_7,
} from "@/data/articles/news-depth-boost";
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
const cangChiImage = publicAsset("uploads/cang-chi-tre-hoa.png");

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

type Batch11Entry = {
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

const BATCH_11_ENTRIES: Batch11Entry[] = [
  {
    id: "tn-316",
    slug: "nang-mui-lan-dau-dung-chon-dang-trend",
    title: "Nâng mũi lần đầu đừng chọn dáng trend: 5 dấu hiệu bạn đang chọn sai",
    description: "Nâng mũi lần đầu dễ chọn sai dáng theo mạng. 5 dấu hiệu cần dừng lại và câu hỏi nên hỏi bác sĩ trước khi quyết định. Nhắn tin tư vấn Thiên Hoàng Kim.",
    focus: "nâng mũi lần đầu",
    keywords: "nâng mũi lần đầu, chọn dáng mũi, nâng mũi cấu trúc, nâng mũi An Đông",
    body: NANG_MUI_LAN_DAU_TREND_BODY + DEPTH_NANG_MUI_TREND,
    image: nangMuiImage,
    category: "Tin tức",
  },
  {
    id: "tn-317",
    slug: "nang-mui-cau-truc-hay-filler-song-mui",
    title: "Nâng mũi cấu trúc hay filler sống mũi? Cách chọn để khỏi hối sau 6 tháng",
    description: "So sánh nâng mũi cấu trúc và filler sống mũi: chỉ định, độ bền, rủi ro và cách hỏi trước khi làm. Nhắn ảnh nhận gợi ý tại Thiên Hoàng Kim An Đông.",
    focus: "nâng mũi cấu trúc hay filler",
    keywords: "nâng mũi cấu trúc, filler sống mũi, nâng mũi hay filler, sửa mũi",
    body: NANG_MUI_CAU_TRUC_HAY_FILLER_BODY + DEPTH_NANG_MUI_CAU_TRUC_FILLER,
    image: nangMuiImage,
    category: "Tin tức",
  },
  {
    id: "tn-318",
    slug: "mui-lo-song-tut-sun-bao-gio-can-sua",
    title: "Mũi lộ sóng, tụt sụn: bao giờ cần sửa và sửa sớm có đỡ không?",
    description: "Nhận diện mũi lộ sóng hoặc tụt sụn, dấu hiệu cần khám sớm và việc không nên tự xử lý tại nhà. Nhắn ảnh mũi để được hướng dẫn lịch khám.",
    focus: "mũi lộ sóng tụt sụn",
    keywords: "mũi lộ sóng, tụt sụn, sửa mũi, nâng mũi hỏng",
    body: MUI_LO_SONG_TUT_SUN_BODY + DEPTH_MUI_LO_SONG,
    image: nangMuiImage,
    category: "Tin tức",
  },
  {
    id: "tn-319",
    slug: "sau-nang-mui-kieng-gi-14-ngay",
    title: "Sau nâng mũi kiêng gì 14 ngày đầu? Checklist in được để treo tủ lạnh",
    description: "Checklist chăm sóc sau nâng mũi ngày 1 đến 14: ngủ, ăn uống, vệ sinh, dấu hiệu cần gọi bác sĩ. Lưu máy hoặc in để theo dõi.",
    focus: "sau nâng mũi kiêng gì",
    keywords: "sau nâng mũi kiêng gì, chăm sóc sau nâng mũi, giảm sưng sau nâng mũi",
    body: SAU_NANG_MUI_KIENG_14_NGAY_BODY + DEPTH_SAU_NANG_MUI_14,
    image: nangMuiImage,
    category: "Tin tức",
  },
  {
    id: "tn-320",
    slug: "nang-mui-an-dong-quan-5-hoi-bac-si-gi",
    title: "Nâng mũi An Đông, Quận 5: đi khám 1 buổi nên hỏi bác sĩ những gì?",
    description: "Danh sách câu hỏi tư vấn nâng mũi tại An Đông Quận 5 về dáng mũi, vật liệu, hồi phục và chi phí trước khi quyết định.",
    focus: "nâng mũi An Đông Quận 5",
    keywords: "nâng mũi An Đông, nâng mũi Quận 5, tư vấn nâng mũi, đặt lịch nâng mũi",
    body: NANG_MUI_AN_DONG_HOI_GI_BODY + DEPTH_NANG_MUI_HOI_GI,
    image: nangMuiImage,
    category: "Tin tức",
  },
  {
    id: "tn-321",
    slug: "gia-nang-mui-re-bat-ngo-an-phi-gi",
    title: "Giá nâng mũi rẻ bất ngờ thường ẩn phí gì? Câu hỏi bắt buộc trước khi đặt cọc",
    description: "5 câu hỏi bắt buộc trước khi đặt cọc nâng mũi giá rẻ. Cách tránh phụ phí và báo giá không rõ phạm vi tại TP.HCM.",
    focus: "giá nâng mũi rẻ",
    keywords: "giá nâng mũi, chi phí nâng mũi, nâng mũi bao nhiêu tiền, báo giá nâng mũi",
    body: GIA_NANG_MUI_RE_AN_PHI_BODY + DEPTH_GIA_NANG_MUI,
    image: nangMuiImage,
    category: "Tin tức",
  },
  {
    id: "tn-322",
    slug: "cat-mi-phuong-hoang-hay-bam-mi",
    title: "Cắt mí phượng hoàng hay bấm mí? Ai hợp, ai dễ mất thần sau 1 tháng",
    description: "So sánh cắt mí phượng hoàng và bấm mí: đối tượng phù hợp, rủi ro mất thần và khi nào cần đo tỷ lệ mắt trước.",
    focus: "cắt mí phượng hoàng hay bấm mí",
    keywords: "cắt mí phượng hoàng, bấm mí, cắt mí hay bấm mí, thẩm mỹ mắt",
    body: CAT_MI_HAY_BAM_MI_BODY + DEPTH_CAT_MI_BAM_MI,
    image: catMiImage,
    category: "Tin tức",
  },
  {
    id: "tn-323",
    slug: "sup-mi-nhe-co-can-cat-khong",
    title: "Sụp mí nhẹ có cần cắt không? 3 trường hợp bác sĩ khuyên chưa làm",
    description: "Sụp mí nhẹ khi nào chưa cần cắt, khi nào nên can thiệp, và cách nhắn ảnh để được hướng dẫn đặt lịch đúng.",
    focus: "sụp mí nhẹ có cần cắt",
    keywords: "sụp mí, điều trị sụp mí, cắt mí, mắt mệt",
    body: SUP_MI_NHE_CO_CAN_CAT_BODY + DEPTH_SUP_MI,
    image: catMiImage,
    category: "Tin tức",
  },
  {
    id: "tn-324",
    slug: "sung-sau-cat-mi-ngay-1-den-7",
    title: "Sưng sau cắt mí ngày 1 đến 7 trông thế nào mới bình thường?",
    description: "Mốc sưng bầm sau cắt mí ngày 1 đến 7, dấu hiệu bất thường cần báo bác sĩ và cách chăm sóc đúng phiếu hướng dẫn.",
    focus: "sưng sau cắt mí",
    keywords: "sưng sau cắt mí, chăm sóc sau cắt mí, hồi phục cắt mí",
    body: SUNG_SAU_CAT_MI_1_DEN_7_BODY + DEPTH_SUNG_CAT_MI,
    image: catMiImage,
    category: "Tin tức",
  },
  {
    id: "tn-325",
    slug: "cat-mi-quan-5-do-ty-le-mat",
    title: "Cắt mí Quận 5: vì sao nên ưu tiên bác sĩ đo tỷ lệ mắt và cung mày trước",
    description: "Cắt mí Quận 5 nên bắt đầu bằng đo tỷ lệ mắt và cung mày. Lý do tránh mất thần và cách đặt lịch tại An Đông.",
    focus: "cắt mí Quận 5",
    keywords: "cắt mí Quận 5, cắt mí An Đông, đo tỷ lệ mắt, cắt mí phượng hoàng",
    body: CAT_MI_QUAN_5_DO_TY_LE_BODY + DEPTH_CAT_MI_DO_TY_LE,
    image: catMiImage,
    category: "Tin tức",
  },
  {
    id: "tn-326",
    slug: "mat-hong-sau-tham-my-dau-hieu-chinh-sua",
    title: "Mắt hỏng sau thẩm mỹ: dấu hiệu cần chỉnh sửa sớm, đừng chờ xem",
    description: "Dấu hiệu mắt hỏng sau thẩm mỹ cần khám sớm, quy trình tiếp cận chỉnh sửa và thông tin cần gửi khi nhắn tin tư vấn.",
    focus: "mắt hỏng sau thẩm mỹ",
    keywords: "chỉnh sửa mắt hỏng, sửa mí, cắt mí lần 2, mắt lệch sau thẩm mỹ",
    body: MAT_HONG_SAU_THAM_MY_BODY,
    image: catMiImage,
    category: "Tin tức",
  },
  {
    id: "tn-327",
    slug: "filler-moi-tu-nhien-khong-mo-vit",
    title: "Filler môi tự nhiên không bị mỏ vịt: bí quyết nằm ở liều và điểm tiêm",
    description: "Cách tiêm filler môi tự nhiên, tránh mỏ vịt nhờ liều và điểm tiêm đúng. Nhắn ảnh môi để được gợi ý trước lịch hẹn.",
    focus: "filler môi tự nhiên",
    keywords: "filler môi, tiêm filler môi, filler môi tự nhiên, filler tạo hình",
    body: FILLER_MOI_KHONG_MO_VIT_BODY + DEPTH_FILLER_MOI,
    image: fillerImage,
    category: "Tin tức",
  },
  {
    id: "tn-328",
    slug: "botox-gon-ham-bao-lau-lo-net",
    title: "Botox gọn hàm bao lâu lộ nét? Ai không nên tiêm dù rất muốn mặt V-line",
    description: "Botox gọn hàm lộ nét khi nào, ai nên trì hoãn tiêm, và cách đặt lịch đánh giá cơ nhai thay vì tự chọn liều.",
    focus: "botox gọn hàm",
    keywords: "botox gọn hàm, botox thon hàm, tiêm botox hàm, mặt V-line",
    body: BOTOX_GON_HAM_LO_NET_BODY + DEPTH_BOTOX_HAM,
    image: botoxImage,
    category: "Tin tức",
  },
  {
    id: "tn-329",
    slug: "filler-va-botox-khac-nhau-60-giay",
    title: "Filler và Botox khác nhau trong 60 giây: chọn đúng để khỏi tiêm thừa",
    description: "Phân biệt filler và botox theo mục tiêu trong 60 giây. Bảng chọn nhanh và CTA nhắn mục tiêu để được hướng dẫn dịch vụ.",
    focus: "filler và botox khác nhau",
    keywords: "filler và botox, tiêm filler, tiêm botox, filler hay botox",
    body: FILLER_BOTOX_60_GIAY_BODY + DEPTH_FILLER_BOTOX_60,
    image: fillerImage,
    category: "Tin tức",
  },
  {
    id: "tn-330",
    slug: "cang-chi-tre-hoa-hop-khi-nao",
    title: "Căng chỉ trẻ hóa: hợp da bắt đầu chảy xệ, không hợp khi nào",
    description: "Căng chỉ trẻ hóa phù hợp và không phù hợp với tình trạng nào. Nhắn ảnh mặt nghiêng để được gợi ý phác đồ.",
    focus: "căng chỉ trẻ hóa",
    keywords: "căng chỉ, căng chỉ trẻ hóa, nâng cơ mặt, trẻ hóa da mặt",
    body: CANG_CHI_HOP_KHI_NAO_BODY,
    image: cangChiImage,
    category: "Tin tức",
  },
  {
    id: "tn-331",
    slug: "hifu-chi-hay-filler-combo-tre-hoa",
    title: "HIFU, chỉ hay filler: combo nào ăn gian tuổi mà vẫn tự nhiên?",
    description: "Cách chọn HIFU, căng chỉ hoặc filler theo cơ chế. Tránh xếp chồng công nghệ sai chỉ định. Nhắn phác đồ da để được tư vấn.",
    focus: "HIFU chỉ filler",
    keywords: "HIFU, căng chỉ, filler trẻ hóa, combo trẻ hóa, Ultherapy Thermage",
    body: HIFU_CHI_HAY_FILLER_BODY,
    image: cangChiImage,
    category: "Tin tức",
  },
  {
    id: "tn-332",
    slug: "da-xin-lo-chan-long-to-1-buoi-cham-soc",
    title: "Da xỉn, lỗ chân lông to: 1 buổi chăm sóc da nên kỳ vọng gì (và không kỳ vọng gì)",
    description: "Một buổi chăm sóc da giúp được gì với da xỉn và lỗ chân lông to, giới hạn thực tế và cách nhắn loại da để chọn gói.",
    focus: "chăm sóc da lỗ chân lông",
    keywords: "chăm sóc da, lỗ chân lông to, da xỉn màu, spa Quận 5",
    body: DA_XIN_LO_CHAN_LONG_BODY,
    image: chamSocDaImage,
    category: "Tin tức",
  },
  {
    id: "tn-333",
    slug: "phun-xam-may-tu-nhien-2026",
    title: "Phun xăm mày tự nhiên 2026: chọn dáng theo khuôn mặt, đừng theo mẫu TikTok",
    description: "Xu hướng phun xăm mày tự nhiên 2026: chọn dáng theo xương mày và tỷ lệ mặt. Nhắn ảnh mặt thẳng để định hướng trước lịch.",
    focus: "phun xăm mày tự nhiên",
    keywords: "phun xăm mày, phun mày tự nhiên, phun xăm thẩm mỹ, phun mày Quận 5",
    body: PHUN_XAM_MAY_2026_BODY,
    image: phunMayImage,
    category: "Tin tức",
  },
  {
    id: "tn-334",
    slug: "dia-chi-tham-my-quan-5-checklist-7-tieu-chi",
    title: "Địa chỉ thẩm mỹ Quận 5 An Đông: checklist 7 tiêu chí trước khi tin review",
    description: "Checklist 7 tiêu chí chọn địa chỉ thẩm mỹ Quận 5 An Đông trước khi tin review mạng. Nhắn chỉ đường hoặc đặt lịch tư vấn.",
    focus: "địa chỉ thẩm mỹ Quận 5 An Đông",
    keywords: "địa chỉ thẩm mỹ Quận 5, thẩm mỹ An Đông, phòng khám thẩm mỹ Hùng Vương",
    body: DIA_CHI_THAM_MY_7_TIEU_CHI_BODY + DEPTH_CHECKLIST_7,
    category: "Tin tức",
  },
  {
    id: "tn-335",
    slug: "massage-facial-hay-peel-truoc-su-kien",
    title: "Massage facial hay peel da trước sự kiện? Timeline 7 đến 14 ngày để mặt lên đúng lúc",
    description: "Timeline 7 đến 14 ngày chọn facial hoặc peel trước đám cưới và sự kiện. Nhắn ngày sự kiện để xếp lịch an toàn.",
    focus: "massage facial trước sự kiện",
    keywords: "massage facial, peel da, chăm sóc da trước sự kiện, spa An Đông",
    body: FACIAL_HAY_PEEL_SU_KIEN_BODY,
    image: spaImage,
    category: "Tin tức",
  },
];

export const MANUAL_BATCH_11_ARTICLES: SiteArticle[] = BATCH_11_ENTRIES.map((e) =>
  article(
    e.id,
    e.slug,
    e.title,
    "15/07/2026",
    e.description,
    e.body,
    e.image ?? intro,
    e.category,
    newsSeo(e.slug, e.description, e.focus, e.keywords, e.image ?? intro),
  ),
);
