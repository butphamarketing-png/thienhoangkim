export type KeywordPlanEntry = {
  focus: string;
  slug: string;
  pillar: string;
  title: string;
  source?: string;
};

const PILLAR_LABELS: Record<string, string> = {
  "/tham-my/nang-mui-hoang-kim": "nâng mũi hoàng kim",
  "/tham-my/cat-mi-phuong-hoang": "cắt mí phượng hoàng",
  "/tham-my/cay-toc-tu-than": "cấy tóc tự thân",
  "/tham-my/cang-noi-soi": "căng nội soi",
  "/tham-my/cang-chi-tre-hoa": "căng chỉ trẻ hóa",
  "/tham-my/hut-mo-cay-mo-ma": "hút mỡ – cấy mỡ má",
  "/tham-my/filler-tao-hinh": "filler tạo hình",
  "/tham-my/botox-xoa-nhan-gon-ham": "botox xóa nhăn, gọn hàm",
  "/spa/cham-soc-da-toan-dien": "chăm sóc da toàn diện",
  "/spa/phun-xam-tham-my": "phun xăm thẩm mỹ",
  "/spa/massage-body-thu-gian": "massage body thư giãn",
  "/spa/massage-facial": "massage facial",
  "/spa/u-da-muoi-himalaya": "ủ đá muối Himalaya",
  "/lien-he": "phòng khám Thiên Hoàng Kim An Đông",
  "/bang-gia": "bảng giá thẩm mỹ",
  "/tin-tuc": "tin tức thẩm mỹ",
};

function pillarLabel(pillar: string): string {
  return PILLAR_LABELS[pillar] ?? "dịch vụ thẩm mỹ Thiên Hoàng Kim";
}

function isQuestionFocus(focus: string): boolean {
  return /(\?|bao lâu|bao nhiêu|có đau|có an toàn|là gì|khác nhau|hay |nên chọn|khi nào|tuổi nào|mất bao lâu)/i.test(
    focus,
  );
}

function introParagraph(focus: string, pillar: string): string {
  const service = pillarLabel(pillar);
  if (isQuestionFocus(focus)) {
    return `${focus.charAt(0).toUpperCase() + focus.slice(1)} là câu hỏi nhiều khách đặt trước khi đến Thiên Hoàng Kim — 323–325 Hùng Vương, An Đông, TP.HCM. Bài viết tổng hợp thông tin y khoa – thẩm mỹ dễ hiểu, gợi ý khi nào nên khám trực tiếp và liên hệ dịch vụ [${service}](${pillar}) phù hợp.`;
  }
  return `${focus.charAt(0).toUpperCase() + focus.slice(1)} là chủ đề nhiều người tìm hiểu khi muốn cải thiện ngoại hình an toàn, tự nhiên. Tại Thiên Hoàng Kim (An Đông, TP.HCM), bác sĩ và chuyên viên tư vấn cá nhân hóa — không áp dụng một phác đồ cho mọi khách. Bài viết giải thích khái niệm, đối tượng phù hợp và bước tiếp theo khi quan tâm [${service}](${pillar}).`;
}

export function buildGeneratedArticleBody(
  entry: KeywordPlanEntry,
  imgSlide: string,
  imgIntro: string,
): string {
  const focus = entry.focus;
  const focusTitle = focus.charAt(0).toUpperCase() + focus.slice(1);
  const pillar = entry.pillar;
  const service = pillarLabel(pillar);
  const img = entry.slug.length % 2 === 0 ? imgIntro : imgSlide;
  const imgAlt = `${focusTitle} — tư vấn tại spa và phòng khám Thiên Hoàng Kim`;

  return `${introParagraph(focus, pillar)}

## ${focusTitle} là gì?

Trong thẩm mỹ y khoa và spa, **${focus}** được hiểu theo ngữ cảnh cụ thể từng khách — không có một định nghĩa cố định cho mọi trường hợp. Đội ngũ Thiên Hoàng Kim đánh giá tình trạng thực tế (da, mô, cấu trúc, mong muốn) trước khi gợi ý phương án. Mục tiêu là kết quả hài hòa, an toàn và phù hợp khuôn mặt hoặc cơ địa người Việt.

## Ai nên quan tâm ${focus}?

Bạn có thể cân nhắc tìm hiểu **${focus}** khi thấy nhu cầu thay đổi ngoại hình hoặc điều trị da rõ ràng, đã thử chăm sóc tại nhà chưa đủ hiệu quả, hoặc muốn được giải thích rõ quy trình – chi phí – thời gian hồi phục trước khi quyết định. Nếu đang mang thai, cho con bú, có bệnh nền hoặc dị ứng thuốc, cần khai báo đầy đủ khi tư vấn.

![${imgAlt}](${img})

## Quy trình tư vấn tại Thiên Hoàng Kim

**Bước 1:** Đặt lịch hoặc gọi **0938 673 996** — mô tả ngắn nhu cầu liên quan ${focus}. **Bước 2:** Khám / soi da / chụp ảnh tư vấn (tùy dịch vụ). **Bước 3:** Nhận phác đồ cá nhân, báo giá minh bạch, hướng dẫn chuẩn bị và chăm sóc sau điều trị. Chi tiết dịch vụ liên quan: [${service}](${pillar}). Tham khảo thêm [chọn phòng khám thẩm mỹ an toàn](/tin-tuc/chon-phong-kham-tham-my-an-toan) và [phòng khám thẩm mỹ An Đông](/tin-tuc/phong-kham-tham-my-an-dong).

## Lưu ý khi tìm hiểu ${focus}

Tránh tin quảng cáo cam kết "tuyệt đối" hoặc giá quá thấp không rõ bao gồm gì. Ưu tiên cơ sở có bác sĩ / chuyên viên công bố rõ, phòng vô trùng, tái khám sau điều trị. Kết quả phụ thuộc cơ địa — bác sĩ sẽ giải thích kỳ vọng thực tế khi bạn đến trực tiếp.

## Câu hỏi thường gặp về ${focus}

**${focusTitle} tại Thiên Hoàng Kim có tư vấn miễn phí không?** Có — hotline **0938 673 996**, địa chỉ **323–325 Hùng Vương, An Đông, TP.HCM**, mở **08:00–20:00**.

**${focusTitle} mất bao lâu / có đau không?** Tùy dịch vụ — từ vài phút (tiêm) đến vài tuần hồi phục (phẫu thuật). Bác sĩ giải thích cụ thể sau khám.

**Giá ${focus} bao nhiêu?** Phụ thuộc phác đồ cá nhân — xem [bảng giá](/bang-gia) hoặc báo giá sau tư vấn trực tiếp.

**Có cần tái khám?** Hầu hết dịch vụ có lịch tái khám theo dõi — tuân thủ giúp kết quả ổn định và an toàn.

Đặt lịch ${focus}: **0938 673 996** — Thiên Hoàng Kim, An Đông, TP.HCM.`;
}

export function buildGeneratedDescription(focus: string): string {
  const t = focus.charAt(0).toUpperCase() + focus.slice(1);
  return `${t} — giải thích, đối tượng phù hợp và tư vấn miễn phí tại Thiên Hoàng Kim An Đông TP.HCM. Hotline 0938 673 996.`;
}

export function buildGeneratedMetaDescription(focus: string): string {
  const t = focus.charAt(0).toUpperCase() + focus.slice(1);
  return `${t}: thông tin y khoa – thẩm mỹ, quy trình tư vấn và đặt lịch tại Thiên Hoàng Kim 323–325 Hùng Vương, An Đông, TP.HCM. Gọi 0938 673 996.`;
}
