import { DEFAULT_ARTICLE_SEO } from "@/lib/seo";
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
    "05/06/2024",
    "Nâng mũi cấu trúc theo tỉ lệ vàng giúp sống mũi thẳng, đầu mũi mềm và hài hòa khuôn mặt.",
    `Nâng mũi hoàng kim là phương pháp nâng mũi cấu trúc tại Thiên Hoàng Kim, thiết kế theo tỉ lệ vàng trên khuôn mặt: chiều dài sống mũi, độ cao đầu mũi và góc mũi – môi cân đối với trán và cằm.

Bác sĩ thăm khám, chụp ảnh mô phỏng và tư vấn chất liệu sụn (sụn tự thân/sụn nhân tạo) phù hợp. Phẫu thuật trong phòng vô trùng, gây mê an toàn. Thời gian hồi phục thường 7–14 ngày sưng nhẹ; 3–6 tháng mũi ổn định và đẹp tự nhiên nhất.

Lưu ý: tuân thủ chăm sóc vết mổ, tái khám định kỳ, tránh va chạm mũi trong giai đoạn đầu. Đặt lịch tư vấn miễn phí để bác sĩ đánh giá cấu trúc mũi và báo giá chi tiết.`,
    slide,
    "Thẩm mỹ",
    svcSeo(
      "Nâng mũi hoàng kim TP.HCM | Tỉ lệ vàng",
      "Nâng mũi cấu trúc chuẩn tỉ lệ vàng — sống thẳng, đầu mũi mềm tự nhiên. Tư vấn miễn phí tại Thiên Hoàng Kim, An Đông TP.HCM.",
      "nâng mũi hoàng kim",
      "nâng mũi, nâng mũi cấu trúc, nâng mũi TP.HCM, thẩm mỹ mũi",
    ),
  ),
  article(
    "tm-2",
    "cat-mi-phuong-hoang",
    "Cắt mí phượng hoàng — Mắt sắc nét, cuốn hút",
    "05/06/2024",
    "Kỹ thuật cắt mí tạo đường cong phượng hoàng — mắt to tròn, nếp mí rõ và tự nhiên.",
    `Cắt mí phượng hoàng là kỹ thuật tạo nếp mí với đường cong dài, nhẹ nhàng như cánh phượng — phù hợp người muốn mắt to, sắc nét mà vẫn hài hòa với gương mặt Á Đông.

Bác sĩ đánh giá mí ẩn, mỡ thừa, da chùng và đề xuất cắt mí, lấy mỡ hoặc mở góc trong/ngoài nếu cần. Vết mổ đặt tại nếp mí tự nhiên nên rất khó nhận ra khi lành. Hồi phục 7–10 ngày; mí vào form sau 1–3 tháng.

Chăm sóc: chườm lạnh ngày đầu, vệ sinh vết theo hướng dẫn, chống nắng kỹ, hạn chế makeup vùng mắt theo từng giai đoạn.`,
    intro,
    "Thẩm mỹ",
    svcSeo(
      "Cắt mí phượng hoàng TP.HCM",
      "Cắt mí tạo đường cong phượng hoàng — mắt to sắc nét, nếp mí tự nhiên. Bác sĩ chuyên khoa tại Thiên Hoàng Kim.",
      "cắt mí phượng hoàng",
      "cắt mí, cắt mí phượng hoàng, thẩm mỹ mắt, cắt mí TP.HCM",
    ),
  ),
  article(
    "tm-3",
    "cay-toc-tu-than",
    "Cấy tóc tự thân — Mật độ cao, mọc tự nhiên",
    "04/06/2024",
    "Cấy tóc FUE/FUT lấy nang tóc từ vùng cho — phục hồi đường viền và mật độ tóc hói.",
    `Cấy tóc tự thân là giải pháp lấy nang tóc khỏe từ vùng sau gáy (vùng cho), cấy vào vùng hói hoặc thưa tóc. Tóc mọc tự nhiên, bền lâu vì là tóc của chính bạn.

Thiên Hoàng Kim áp dụng kỹ thuật FUE/FUT tuỳ mức độ hói và số nang cần cấy. Bác sĩ thiết kế đường viền trán, hướng mọc tóc phù hợp khuôn mặt. Thời gian phẫu thuật vài giờ; nghỉ ngơi ngắn, tránh vận động mạnh vài ngày đầu.

Kết quả: tóc cấy rụng nhẹ giai đoạn shock loss (bình thường), mọc lại sau 3–6 tháng. Kiên trì tái khám và chăm sóc theo hướng dẫn để đạt mật độ tối ưu.`,
    slide,
    "Thẩm mỹ",
    svcSeo(
      "Cấy tóc tự thân FUE/FUT TP.HCM",
      "Cấy tóc tự thân mật độ cao, hướng mọc tự nhiên. Kỹ thuật FUE/FUT tại Thiên Hoàng Kim — phục hồi tóc hói bền lâu.",
      "cấy tóc tự thân",
      "cấy tóc, cấy tóc FUE, cấy tóc TP.HCM, điều trị hói đầu",
    ),
  ),
  article(
    "tm-4",
    "cang-noi-soi",
    "Căng nội soi — Trẻ hóa sâu, ít sẹo",
    "04/06/2024",
    "Căng da nội soi nâng cơ vùng trán, thái dương và má — giảm chảy xệ mà không phẫu thuật mở lớn.",
    `Căng nội soi sử dụng camera nội soi và dụng cụ chuyên dụng luồn qua đường rạch nhỏ ở da đầu, nâng và cố định lớp cơ mặt bị chảy xệ. Phù hợp người lão hóa vừa đến trung bình: trán nhăn, má chùng, đường viền mặt mờ.

Ưu điểm: sẹo ẩn trong tóc, thời gian nghỉ ngắn hơn mổ mở. Bác sĩ đánh giá độ dày da, mức chảy xệ và sức khỏe trước khi chỉ định. Kết quả thường rõ sau 2–4 tuần sưng xuống; duy trì nhiều năm tuỳ cơ địa.

Kết hợp skincare y khoa và chống nắng giúp duy trì làn da săn chắc lâu hơn sau căng nội soi.`,
    intro,
    "Thẩm mỹ",
    svcSeo(
      "Căng nội soi trẻ hóa mặt TP.HCM",
      "Căng da nội soi nâng cơ vùng trán, má — trẻ hóa sâu, sẹo ẩn trong tóc. Thiên Hoàng Kim, phòng khám chuẩn y khoa.",
      "căng nội soi",
      "căng nội soi, trẻ hóa da, căng da mặt, thẩm mỹ không phẫu thuật",
    ),
  ),
  article(
    "tm-5",
    "cang-chi-tre-hoa",
    "Căng chỉ trẻ hóa — Săn chắc không phẫu thuật",
    "03/06/2024",
    "Nâng cơ bằng chỉ sinh học PDO/PLLA — trẻ hóa vùng má, hàm và cổ.",
    `Căng chỉ trẻ hóa đưa chỉ sinh học (PDO, PLLA…) vào lớp sâu dưới da để nâng cơ, kích thích collagen. Phù hợp người bắt đầu chảy xệ nhẹ, muốn cải thiện mà không mổ.

Quy trình: gây tê tại chỗ, tiêm chỉ theo vector nâng đã thiết kế. Thời gian 45–90 phút; sưng nhẹ 2–5 ngày. Hiệu quả căng rõ ngay; collagen tái tạo dần trong 2–3 tháng giúp da săn hơn.

Chỉ định và chống chỉ định cần được bác sĩ đánh giá (viêm da cấp, nhiễm trùng, một số bệnh nền). Tái khám theo lịch để theo dõi kết quả.`,
    slide,
    "Thẩm mỹ",
    svcSeo(
      "Căng chỉ trẻ hóa PDO TP.HCM",
      "Căng chỉ sinh học nâng cơ, săn chắc da — không phẫu thuật, hồi phục nhanh. Liệu trình tại Thiên Hoàng Kim.",
      "căng chỉ trẻ hóa",
      "căng chỉ, căng chỉ PDO, trẻ hóa da, nâng cơ mặt",
    ),
  ),
  article(
    "tm-6",
    "hut-mo-cay-mo-ma",
    "Hút mỡ – cấy mỡ má — Gương mặt V-line",
    "03/06/2024",
    "Tạo hình mặt gọn: hút mỡ vùng thừa kết hợp cấy mỡ tự thân làm đầy má tươi trẻ.",
    `Hút mỡ – cấy mỡ má là combo tạo hình mặt: hút mỡ ở hàm, cằm hoặc má thừa để gọn đường viền; đồng thời cấy mỡ tự thân (thường lấy từ bụng, đùi) vào vùng má lõm để khuôn mặt trẻ trung, đầy đặn hơn.

Bác sĩ đánh giá lượng mỡ, độ lỏng da và mong muốn của khách. Phẫu thuật gây mê/tê tuỳ vùng. Đeo ép hỗ trợ theo chỉ định; sưng bầm 1–2 tuần là bình thường.

Kết quả ổn định khi duy trì cân nặng ổn định. Tư vấn trực tiếp giúp xác định bạn phù hợp chỉ hút mỡ, chỉ cấy mỡ hay combo.`,
    intro,
    "Thẩm mỹ",
    svcSeo(
      "Hút mỡ cấy mỡ má V-line TP.HCM",
      "Tạo hình mặt V-line: hút mỡ vùng thừa, cấy mỡ tự thân làm đầy má. Combo tại Thiên Hoàng Kim — tư vấn miễn phí.",
      "hút mỡ cấy mỡ má",
      "hút mỡ mặt, cấy mỡ má, V-line, tạo hình mặt",
    ),
  ),
  article(
    "tm-7",
    "filler-tao-hinh",
    "Filler tạo hình — Đường nét hài hòa tức thì",
    "02/06/2024",
    "Tiêm filler HA chính hãng tạo hình mũi, môi, cằm, thái dương — mềm, tự nhiên.",
    `Filler tạo hình dùng axit hyaluronic (HA) hoặc filler sinh học được phép lưu hành để bổ sung thể tích: nâng sống mũi, làm đầy môi, định hình cằm, thái dương, rãnh cười.

Thiên Hoàng Kim chỉ dùng filler có mã truy xuất, tiêm đúng tầng bởi bác sĩ có chứng chỉ. Kết quả thấy ngay; duy trì 6–18 tháng tuỳ vùng và loại filler.

Sau tiêm: tránh massage vùng tiêm 24–48h, hạn chế rượu bia, sauna nóng vài ngày. Tái khám nếu cần chỉnh hoặc bổ sung.`,
    slide,
    "Thẩm mỹ",
    svcSeo(
      "Filler tạo hình mũi môi cằm TP.HCM",
      "Tiêm filler HA chính hãng tạo hình mũi, môi, cằm, thái dương — kết quả tự nhiên ngay. Thiên Hoàng Kim.",
      "filler tạo hình",
      "filler, tiêm filler, filler mũi, filler môi TP.HCM",
    ),
  ),
  article(
    "tm-8",
    "botox-xoa-nhan-gon-ham",
    "Botox xóa nhăn, gọn hàm — Khuôn mặt trẻ trung",
    "02/06/2024",
    "Giảm nếp nhăn trán, đuôi mắt; thon gọn hàm (masseter) — không phẫu thuật.",
    `Botox tạm thời giảm hoạt động cơ gây nhăn (trán, đuôi mắt, cẳm) hoặc thon gọn hàm khi tiêm vào cơ masseter do nhai nhiều. Hiệu quả sau 3–7 ngày, duy trì 4–6 tháng.

Bác sĩ xác định liều và điểm tiêm chuẩn y khoa để khuôn mặt vẫn tự nhiên, không “đơ”. Không chỉ định khi mang thai, cho con bú hoặc một số bệnh thần kinh cơ — cần khai báo sức khỏe đầy đủ.

Tái tiêm định kỳ khi botox hết tác dụng. Kết hợp skincare và chống nắng bảo vệ da.`,
    intro,
    "Thẩm mỹ",
    svcSeo(
      "Botox xóa nhăn gọn hàm TP.HCM",
      "Botox giảm nếp nhăn trán, đuôi mắt và thon gọn hàm masseter — khuôn mặt trẻ trung, tự nhiên.",
      "botox xóa nhăn gọn hàm",
      "botox, tiêm botox, gọn hàm, xóa nhăn TP.HCM",
    ),
  ),
];

/** —— Cấp 2: Spa —— */
const SPA_ARTICLES: SiteArticle[] = [
  article(
    "sp-1",
    "u-da-muoi-himalaya",
    "Ủ đá muối Himalaya — Thải độc, thư giãn sâu",
    "01/06/2024",
    "Liệu trình ủ đá muối Himalaya ấm — giảm mỏi cơ, hỗ trợ tuần hoàn và cân bằng cơ thể.",
    `Ủ đá muối Himalaya sử dụng đá muối khoáng Himalaya được làm ấm, đặt lên các vùng cơ thể hoặc toàn thân tuỳ gói liệu trình. Nhiệt ấm giúp giãn cơ, kích thích lưu thông máu và mang lại cảm giác thư giãn sâu.

Phù hợp người mệt mỏi, căng cơ vai gáy, làm việc văn phòng nhiều. Liệu trình thường 60–90 phút trong phòng spa riêng, kết hợp tinh dầu và nhạc nhẹ.

Lưu ý: không ủ khi sốt, viêm cấp, vết thương hở hoặc phụ nữ mang thai (cần hỏi bác sĩ). Uống đủ nước sau liệu trình.`,
    slide,
    "Spa",
    svcSeo(
      "Ủ đá muối Himalaya thải độc TP.HCM",
      "Liệu trình ủ đá muối Himalaya ấm — thải độc, thư giãn sâu, cân bằng cơ thể tại spa Thiên Hoàng Kim.",
      "ủ đá muối Himalaya",
      "ủ đá muối, spa thải độc, Himalaya salt, massage thư giãn",
    ),
  ),
  article(
    "sp-2",
    "phun-xam-tham-my",
    "Phun xăm thẩm mỹ — Mày, môi, eyeliner tự nhiên",
    "01/06/2024",
    "Phun xăm thẩm mỹ giúp hình dáng mày, môi đẹp cố định — tiết kiệm thời gian trang điểm.",
    `Phun xăm thẩm mỹ (microblading, phun mày, phun môi, eyeliner) tạo sắc tố bán vĩnh viễn trên da, mô phỏng lông mày hoặc màu môi tự nhiên.

Chuyên viên thăm khám, phác thảo dáng trước khi thực hiện. Màu mực organic, giảm dần sau 1–3 năm tuỳ vùng và chăm sóc. Sưng nhẹ 3–7 ngày; lên màu ổn định sau khoảng 1 tháng.

Chăm sóc: giữ khô vùng phun 24h đầu, tránh bóc vảy, chống nắng kỹ. Tái khám chỉnh sửa theo lịch.`,
    intro,
    "Spa",
    svcSeo(
      "Phun xăm thẩm mỹ mày môi TP.HCM",
      "Phun xăm mày, môi, eyeliner tự nhiên — tiết kiệm thời gian trang điểm. Chuyên viên có chứng chỉ tại Thiên Hoàng Kim.",
      "phun xăm thẩm mỹ",
      "phun xăm mày, phun môi, microblading, phun xăm TP.HCM",
    ),
  ),
  article(
    "sp-3",
    "massage-body-thu-gian",
    "Massage body thư giãn — Giải tỏa căng thẳng",
    "31/05/2024",
    "Massage toàn thân kỹ thuật Thái/Swedish — giảm mỏi cơ, cải thiện giấc ngủ.",
    `Massage body thư giãn tại Thiên Hoàng Kim kết hợp kỹ thuật xoa, bóp, day và ấn huyệt trên toàn thân. Giúp giảm căng cơ, đau nhức nhẹ do ngồi lâu hoặc stress.

Liệu trình 60–90 phút trong phòng riêng, dùng tinh dầu thảo dược. Khách có thể chọn mức lực nhẹ, vừa hoặc sâu tuỳ sở thích.

Không massage vùng đang viêm, sốt hoặc vết thương hở. Uống nước sau massage và nghỉ ngơi ngắn để cơ thể hấp thụ tốt nhất.`,
    slide,
    "Spa",
    svcSeo(
      "Massage body thư giãn TP.HCM",
      "Massage toàn thân kỹ thuật Thái/Swedish — giảm mỏi cơ, căng thẳng, cải thiện giấc ngủ tại Thiên Hoàng Kim Spa.",
      "massage body thư giãn",
      "massage body, massage thư giãn, spa massage TP.HCM",
    ),
  ),
  article(
    "sp-4",
    "massage-facial",
    "Massage facial — Da sáng, thư giãn",
    "31/05/2024",
    "Massage mặt kết hợp ấn huyệt — lưu thông lymph, da căng mịn hơn.",
    `Massage facial là liệu trình massage vùng mặt, cổ và vai với động tác nhẹ nhàng, kết hợp ấn huyệt và lưu thông bạch huyết. Giúp da hồng hào, giảm phù nề và thư giãn sâu.

Thích hợp trước sự kiện quan trọng hoặc sau ngày làm việc căng thẳng. Thường kết hợp làm sạch nhẹ và dưỡng ẩm sau massage.

Tránh massage mạnh khi da đang viêm, mụn viêm nặng hoặc vừa peel/laser. Chuyên viên sẽ điều chỉnh kỹ thuật phù hợp từng loại da.`,
    intro,
    "Spa",
    svcSeo(
      "Massage facial da sáng khỏe TP.HCM",
      "Massage mặt kết hợp ấn huyệt — lưu thông lymph, da căng mịn, thư giãn sâu tại Thiên Hoàng Kim.",
      "massage facial",
      "massage mặt, facial spa, chăm sóc da mặt TP.HCM",
    ),
  ),
  article(
    "sp-5",
    "cham-soc-da-toan-dien",
    "Chăm sóc da toàn diện — Phác đồ cá nhân hóa",
    "30/05/2024",
    "Làm sạch, tẩy tế bào chết, hút bã nhờn, dưỡng ẩm và mask — theo từng loại da.",
    `Chăm sóc da toàn diện là gói spa chuẩn y khoa: soi da, làm sạch sâu, tẩy tế bào chết, hút bã nhờn (nếu cần), massage mặt, serum và mask dưỡng.

Mỗi khách được phân loại da (khô, dầu, hỗn hợp, nhạy cảm) và chọn sản phẩm phù hợp. Thời gian 75–90 phút; da thường sáng, mịn và thoáng ngay sau liệu trình.

Nên duy trì 2–4 tuần/lần tuỳ tình trạng da. Kết hợp chống nắng và skincare tại nhà theo hướng dẫn chuyên viên để duy trì kết quả lâu dài.`,
    slide,
    "Spa",
    svcSeo(
      "Chăm sóc da toàn diện theo phác đồ",
      "Phác đồ chăm sóc da cá nhân hóa — làm sạch, dưỡng ẩm, phục hồi. Soi da và tư vấn tại Thiên Hoàng Kim Spa.",
      "chăm sóc da toàn diện",
      "chăm sóc da, facial, spa da, điều trị da TP.HCM",
    ),
  ),
];

/** Bài kiến thức chung (không gắn dịch vụ cụ thể) */
const GENERAL_ARTICLES: SiteArticle[] = [
  article(
    "kn-1",
    "5-dau-hieu-nen-tham-kham-da-lieu",
    "5 dấu hiệu bạn nên thăm khám da liễu thẩm mỹ",
    "15/04/2024",
    "Mụn tái đi tái lại, nám tăng sắc tố, da nhạy cảm kéo dài… đừng tự ý trị tại nhà mãi.",
    `1. Mụn viêm nặng hoặc để lại sẹo thâm lặp lại.
2. Nám, tàn nhang, melasma lan rộng.
3. Da đỏ, ngứa kéo dài sau mỹ phẩm.
4. Lão hóa rõ: chảy xệ, nếp sâu, mất săn chắc.
5. Muốn điều chỉnh nếp nhăn/môi/thái dương nhưng chưa rõ phương án.

Thăm khám giúp phân biệt điều trị y khoa và thẩm mỹ, tránh lãng phí tiền vào sản phẩm không phù hợp.`,
    slide,
    "Kiến thức",
    svcSeo(
      "5 dấu hiệu nên thăm khám da liễu",
      "Mụn tái phát, nám lan rộng, da nhạy cảm kéo dài — 5 dấu hiệu cần gặp bác sĩ thay vì tự trị tại nhà.",
      "thăm khám da liễu thẩm mỹ",
      "da liễu, thăm khám da, mụn nám, tư vấn thẩm mỹ",
    ),
  ),
  article(
    "kn-2",
    "cham-soc-da-sau-phau-thuat",
    "Chăm sóc da sau phẫu thuật thẩm mỹ",
    "22/04/2024",
    "Giai đoạn vàng sau mổ quyết định kết quả lâu dài — đừng bỏ qua các bước này.",
    `Sau phẫu thuật: chườm lạnh/sạch vết theo hướng dẫn, uống thuốc đúng giờ, ngủ cao gối (với mũi), tránh tập nặng 2–4 tuần.

Chống nắng SPF50+ khi ra ngoài; tránh bể nắng trực tiếp vài tháng đầu. Không tự ý dùng mỹ phẩm chưa được bác sĩ duyệt.

Mọi dấu hiệu sốt, chảy máu bất thường hoặc đau tăng — gọi hotline phòng khám ngay.`,
    intro,
    "Kiến thức",
    svcSeo(
      "Chăm sóc da sau phẫu thuật thẩm mỹ",
      "Hướng dẫn chăm sóc vết mổ, chống nắng và tái khám sau phẫu thuật — giai đoạn vàng quyết định kết quả lâu dài.",
      "chăm sóc sau phẫu thuật thẩm mỹ",
      "chăm sóc sau mổ, hồi phục thẩm mỹ, chăm sóc vết mổ",
    ),
  ),
];

export const DEFAULT_ARTICLES: SiteArticle[] = [
  ...CATEGORY_ARTICLES,
  ...THAM_MY_ARTICLES,
  ...SPA_ARTICLES,
  ...GENERAL_ARTICLES,
];
