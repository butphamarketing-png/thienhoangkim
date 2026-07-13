import { buildAttractiveMetaDescription } from "@/lib/meta-description";
import { detectMetaIntent } from "@/lib/meta-title";
import { clusterHubPath, matchClusterBySlug } from "@/lib/topic-clusters";

export type KeywordPlanEntry = {
  focus: string;
  slug: string;
  pillar: string;
  title: string;
  source?: string;
  intent?: string;
  wordCount?: number;
  group?: string;
};

const ADDRESS = "323–325 Hùng Vương, An Đông, TP.HCM";
const PHONE = "0896 673 320";
const HOURS = "08:00–20:00";

const PILLAR_LABELS: Record<string, string> = {
  "/tham-my/nang-mui-hoang-kim": "nâng mũi hoàng kim",
  "/tham-my/cat-mi-phuong-hoang": "cắt mí phượng hoàng",
  "/tham-my/cay-toc-tu-than": "cấy tóc tự thân",
  "/tham-my/cang-noi-soi": "căng nội soi",
  "/tham-my/cang-chi-tre-hoa": "căng chỉ trẻ hóa",
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

const PILLAR_EXPERTISE: Record<string, string> = {
  "/tham-my/nang-mui-hoang-kim":
    "Nâng mũi hoàng kim tại Thiên Hoàng Kim theo cấu trúc tỉ lệ vàng — sống thẳng, đầu mũi mềm, hài hòa khuôn mặt người Việt. Bác sĩ đánh giá sụn, da đầu mũi và kỳ vọng trước khi phẫu thuật.",
  "/tham-my/cat-mi-phuong-hoang":
    "Cắt mí phượng hoàng tạo nếp mí cong dài, mắt to và tự nhiên — phù hợp mí lót, mí một bầu hoặc mí chùng. Thiết kế theo tỉ lệ mắt–mày–mũi từng khách.",
  "/tham-my/cay-toc-tu-than":
    "Cấy tóc tự thân FUE/FUT — lấy nang từ vùng cho, cấy theo hướng mọc tự nhiên. Phù hợp hói đỉnh, hói chữ M, rụng tóc sau stress hoặc hậu Covid.",
  "/tham-my/cang-noi-soi":
    "Căng nội soi nâng cơ vùng trán, mặt — trẻ hóa sâu với đường rạch nhỏ, ít sẹo lộ. Kết hợp đánh giá độ chùng da và vùng cần nâng.",
  "/tham-my/cang-chi-tre-hoa":
    "Căng chỉ PDO nâng cơ, săn chắc da — không mổ rộng, hồi phục nhanh. Phù hợp da chảy xệ nhẹ đến trung bình, muốn trẻ hóa tự nhiên.",
  "/tham-my/filler-tao-hinh":
    "Filler chính hãng tạo hình mũi, môi, cằm, thái dương — bổ sung thể tích, hài hòa khuôn mặt. Tiêm đúng tầng, liều vừa đủ, tránh overfill.",
  "/tham-my/botox-xoa-nhan-gon-ham":
    "Botox giảm nếp nhăn động (trán, đuôi mắt), thon gọn hàm V-line — khuôn mặt trẻ trung, gọn hơn. Liều lượng cá nhân hóa theo cơ mặt.",
  "/spa/cham-soc-da-toan-dien":
    "Phác đồ chăm sóc da cá nhân — làm sạch, peel nhẹ, dưỡng ẩm, phục hồi hàng rào da. Phù hợp da dầu, khô, nám, mụn hoặc lão hóa sớm.",
  "/spa/phun-xam-tham-my":
    "Phun mày, môi, eyeliner tự nhiên — tiết kiệm thời gian trang điểm, màu bền hài hòa tông da. Tư vấn form trước khi phun.",
  "/spa/massage-body-thu-gian":
    "Massage body giảm căng cơ, cải thiện tuần hoàn, thư giãn sâu — kết hợp tinh dầu và kỹ thuật chuyên nghiệp.",
  "/spa/massage-facial":
    "Massage facial ấn huyệt — da sáng khỏe, giảm phù mặt, thư giãn. Phù hợp làm việc văn phòng, stress cao.",
  "/spa/u-da-muoi-himalaya":
    "Ủ đá muối Himalaya thải độc, thư giãn, cân bằng cơ thể — liệu trình spa đặc trưng tại Thiên Hoàng Kim.",
};

type RelatedLink = { label: string; href: string };

const RELATED_BY_TOPIC: Array<{ test: RegExp; links: RelatedLink[] }> = [
  {
    test: /^nang-mui/,
    links: [
      { label: "chăm sóc sau nâng mũi", href: "/tin-tuc/cham-soc-sau-nang-mui" },
      { label: "nâng mũi hoàng kim", href: "/tham-my/nang-mui-hoang-kim" },
      { label: "chọn phòng khám an toàn", href: "/tin-tuc/chon-phong-kham-tham-my-an-toan" },
    ],
  },
  {
    test: /^cat-mi|^nhan-mi|^bam-mi|^mi-/,
    links: [
      { label: "chăm sóc sau cắt mí", href: "/tin-tuc/cham-soc-sau-cat-mi" },
      { label: "cắt mí phượng hoàng", href: "/tham-my/cat-mi-phuong-hoang" },
      { label: "sưng sau cắt mí", href: "/tin-tuc/sung-sau-cat-mi" },
    ],
  },
  {
    test: /^filler|^botox|^tiem-/,
    links: [
      { label: "filler tạo hình", href: "/tham-my/filler-tao-hinh" },
      { label: "botox xóa nhăn", href: "/tham-my/botox-xoa-nhan-gon-ham" },
      { label: "filler và botox khác nhau", href: "/tin-tuc/filler-va-botox-khac-nhau" },
    ],
  },
  {
    test: /^cay-toc|^rung-toc|^toc-/,
    links: [
      { label: "cấy tóc tự thân", href: "/tham-my/cay-toc-tu-than" },
      { label: "cấy tóc FUE là gì", href: "/tin-tuc/cay-toc-fue-la-gi" },
    ],
  },
  {
    test: /^tri-nam|^nam-|^mun-|^peel|^laser/,
    links: [
      { label: "chăm sóc da mặt đúng cách", href: "/tin-tuc/cham-soc-da-mat-dung-cach" },
      { label: "chăm sóc da toàn diện", href: "/spa/cham-soc-da-toan-dien" },
    ],
  },
  {
    test: /^spa-|^massage|^cham-soc-da/,
    links: [
      { label: "spa chăm sóc da", href: "/spa" },
      { label: "chăm sóc da toàn diện", href: "/spa/cham-soc-da-toan-dien" },
    ],
  },
  {
    test: /phong-kham|an-dong|tphcm|quan-/,
    links: [
      { label: "địa chỉ thẩm mỹ Quận 5 An Đông", href: "/tin-tuc/dia-chi-tham-my-quan-5-an-dong" },
      { label: "phòng khám thẩm mỹ An Đông", href: "/tin-tuc/phong-kham-tham-my-an-dong" },
      { label: "liên hệ đặt lịch", href: "/lien-he" },
    ],
  },
];

const DEFAULT_RELATED: RelatedLink[] = [
  { label: "địa chỉ thẩm mỹ Quận 5 An Đông", href: "/tin-tuc/dia-chi-tham-my-quan-5-an-dong" },
  { label: "chọn phòng khám thẩm mỹ an toàn", href: "/tin-tuc/chon-phong-kham-tham-my-an-toan" },
  { label: "phòng khám An Đông", href: "/tin-tuc/phong-kham-tham-my-an-dong" },
  { label: "bảng giá tham khảo", href: "/bang-gia" },
];

function pillarLabel(pillar: string): string {
  return PILLAR_LABELS[pillar] ?? "dịch vụ thẩm mỹ Thiên Hoàng Kim";
}

function pillarExpertise(pillar: string): string {
  return (
    PILLAR_EXPERTISE[pillar] ??
    "Thiên Hoàng Kim kết hợp thẩm mỹ y khoa và spa chăm sóc da — tư vấn cá nhân hóa, báo giá minh bạch, tái khám theo dõi."
  );
}

function slugHash(slug: string): number {
  let h = 0;
  for (const c of slug) h = (Math.imul(31, h) + c.charCodeAt(0)) >>> 0;
  return h;
}

function pickVariant<T>(slug: string, variants: T[]): T {
  return variants[slugHash(slug) % variants.length]!;
}

function capitalizeFirst(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function relatedLinksBlock(slug: string): string {
  const group = RELATED_BY_TOPIC.find((g) => g.test.test(slug));
  const links = [...(group?.links ?? DEFAULT_RELATED)];
  const cluster = matchClusterBySlug(slug);
  if (cluster) {
    links.unshift({ label: `tất cả bài về ${cluster.label.toLowerCase()}`, href: clusterHubPath(cluster.id) });
  }
  const md = links.map((l) => `[${l.label}](${l.href})`).join(", ");
  return `**Đọc thêm:** ${md}.`;
}

function resolveIntent(slug: string, entry?: KeywordPlanEntry): ReturnType<typeof detectMetaIntent> {
  if (entry?.intent === "price" || entry?.intent === "local") {
    if (entry.intent === "price") return "price";
    if (entry.intent === "local") return "location";
  }
  if (entry?.intent === "head" && entry.wordCount && entry.wordCount <= 2) return "default";
  return detectMetaIntent(slug);
}

function introParagraph(focus: string, pillar: string, slug: string, entry?: KeywordPlanEntry): string {
  const service = pillarLabel(pillar);
  const focusTitle = capitalizeFirst(focus);
  const intent = resolveIntent(slug, entry);

  const headIntros = [
    `${focusTitle} là từ khóa được tìm kiếm nhiều tại TP.HCM — Thiên Hoàng Kim giải thích dịch vụ, quy trình và cách đặt lịch tư vấn miễn phí tại ${ADDRESS}.`,
    `Tìm hiểu ${focus} uy tín, an toàn? Bài viết tóm tắt điểm cần biết trước khi đến [${service}](${pillar}) — hotline ${PHONE}.`,
    `${focusTitle} tại Thiên Hoàng Kim: bác sĩ đánh giá trực tiếp, báo giá minh bạch, không ép đóng tiền ngay.`,
  ];

  const questionIntros = [
    `${focusTitle} là câu hỏi Thiên Hoàng Kim nhận rất nhiều trước khi khách đặt lịch. Bài viết tổng hợp góc nhìn bác sĩ — dễ hiểu, thực tế, không cam kết mơ hồ.`,
    `Bạn đang tìm câu trả lời cho "${focus}"? Đội ngũ y khoa tại ${ADDRESS} giải thích rõ quy trình, thời gian và khi nào nên khám trực tiếp.`,
    `${focusTitle} — bài viết dưới đây giúp bạn ra quyết định sáng suốt hơn trước khi liên hệ [${service}](${pillar}).`,
  ];

  const priceIntros = [
    `${focusTitle} phụ thuộc phác đồ cá nhân — không có một con số cố định cho mọi khách. Thiên Hoàng Kim báo giá minh bạch sau khám, không phụ phí ẩn.`,
    `Nhiều khách hỏi về ${focus} trước khi đến tư vấn. Bài viết giải thích yếu tố ảnh hưởng giá và cách nhận báo giá chính xác tại phòng khám.`,
    `Tìm hiểu ${focus} tại TP.HCM? Xem [bảng giá](/bang-gia) tham khảo và đặt lịch khám miễn phí để nhận phác đồ & chi phí cụ thể.`,
  ];

  const defaultIntros = [
    `${focusTitle} là chủ đề nhiều khách quan tâm khi muốn cải thiện ngoại hình an toàn. Tại Thiên Hoàng Kim, mỗi phác đồ được cá nhân hóa — không áp dụng một công thức cho tất cả.`,
    `${focusTitle} — bài viết giải thích khái niệm, đối tượng phù hợp và bước tiếp theo khi bạn quan tâm [${service}](${pillar}).`,
    `Bạn muốn hiểu rõ hơn về ${focus}? Thiên Hoàng Kim (${ADDRESS}) tư vấn miễn phí — hotline ${PHONE}.`,
  ];

  if (entry?.intent === "head" || (entry?.wordCount === 1)) return pickVariant(slug, headIntros);
  if (intent === "question") return pickVariant(slug, questionIntros);
  if (intent === "price") return pickVariant(slug, priceIntros);
  return pickVariant(slug, defaultIntros);
}

function intentSection(focus: string, slug: string, pillar: string, entry?: KeywordPlanEntry): string {
  const focusTitle = capitalizeFirst(focus);
  const service = pillarLabel(pillar);
  const intent = resolveIntent(slug, entry);
  const expertise = pillarExpertise(pillar);

  switch (intent) {
    case "price":
      return `## Giá ${focusTitle.replace(/^Giá\s+/i, "")} — minh bạch & báo giá

Giá phụ thuộc: tình trạng ban đầu, kỹ thuật, số buổi/liều, bác sĩ thực hiện và gói chăm sóc sau điều trị. Thiên Hoàng Kim **không chào giá rẻ ẩn phí** — báo giá sau khám, ghi rõ bao gồm gì.

${expertise}

Xem [bảng giá tham khảo](/bang-gia) hoặc gọi ${PHONE} để đặt lịch tư vấn miễn phí về [${service}](${pillar}).`;

    case "question":
      return `## ${focusTitle} — bác sĩ giải đáp

Câu trả lời phụ thuộc cơ địa, tình trạng hiện tại và phác đồ bạn chọn. Không nên tự kết luận từ một trường hợp trên mạng — khám trực tiếp giúp đánh giá chính xác hơn.

${expertise}

Nếu còn thắc mắc về ${focus}, đặt lịch tư vấn miễn phí: ${PHONE}. Địa chỉ: ${ADDRESS}.`;

    case "location":
      return `## ${focusTitle} tại An Đông TP.HCM

Thiên Hoàng Kim tọa lạc ${ADDRESS} — thuận tiện từ Quận 5, Quận 6, Quận 10 và khu Chợ Lớn. Phòng khám vô trùng, riêng tư, bác sĩ/chuyên viên công bố rõ.

${expertise}

Tư vấn miễn phí về [${service}](${pillar}): ${PHONE}, mở ${HOURS}.`;

    case "comparison":
      return `## So sánh & lựa chọn phù hợp

${focusTitle} — mỗi phương án có ưu nhược riêng. Bác sĩ Thiên Hoàng Kim giúp bạn so sánh theo: độ an toàn, thời gian hồi phục, chi phí dài hạn và kỳ vọng thực tế.

${expertise}

Đặt lịch tư vấn để được gợi ý phác đồ phù hợp nhất: [${service}](${pillar}).`;

    default:
      if (entry?.intent === "head" || entry?.wordCount === 1) {
        return `## ${focusTitle} — dịch vụ tại Thiên Hoàng Kim

${expertise}

${focusTitle} là dịch vụ được nhiều khách tìm kiếm — Thiên Hoàng Kim tư vấn miễn phí, giải thích quy trình, chi phí và thời gian hồi phục trước khi bạn quyết định. Xem chi tiết [${service}](${pillar}) hoặc gọi ${PHONE}.`;
      }
      return `## ${focusTitle} — lợi ích & đối tượng phù hợp

${expertise}

Bạn nên tìm hiểu ${focus} khi có nhu cầu rõ ràng, đã thử chăm sóc tại nhà chưa đủ, hoặc muốn được giải thích quy trình – chi phí – hồi phục trước khi quyết định. Mang thai, cho con bú, bệnh nền hoặc dị ứng thuốc cần khai báo đầy đủ khi tư vấn.`;
  }
}

function processSection(focus: string, pillar: string, slug: string): string {
  const service = pillarLabel(pillar);
  return `## Quy trình tư vấn tại Thiên Hoàng Kim

1. **Đặt lịch** — gọi ${PHONE} hoặc nhắn nhu cầu liên quan ${focus}.
2. **Khám & đánh giá** — soi da / chụp ảnh / thăm khám tùy dịch vụ.
3. **Phác đồ cá nhân** — báo giá minh bạch, hướng dẫn chuẩn bị và chăm sóc sau điều trị.

Chi tiết dịch vụ: [${service}](${pillar}). ${relatedLinksBlock(slug)}`;
}

function safetySection(focus: string, slug: string): string {
  const variants = [
    `Tránh tin quảng cáo cam kết "tuyệt đối" hoặc giá quá thấp không rõ bao gồm gì. Ưu tiên cơ sở có bác sĩ công bố rõ, phòng vô trùng, tái khám sau điều trị. Kết quả ${focus} phụ thuộc cơ địa — bác sĩ giải thích kỳ vọng thực tế khi bạn đến trực tiếp.`,
    `Khi tìm hiểu ${focus}, hãy hỏi rõ: ai thực hiện, quy trình vô trùng, chế độ tái khám và chi phí bao gồm những gì. Thiên Hoàng Kim minh bạch từng bước — không ép buộc quyết định ngay.`,
    `Lựa chọn phòng khám uy tín quan trọng hơn giá rẻ khi liên quan ${focus}. Xem thêm hướng dẫn [chọn phòng khám thẩm mỹ an toàn](/tin-tuc/chon-phong-kham-tham-my-an-toan).`,
  ];
  return `## Lưu ý quan trọng\n\n${pickVariant(slug, variants)}`;
}

function faqSection(focus: string, slug: string): string {
  const focusTitle = capitalizeFirst(focus);
  const sets = [
    `**${focusTitle} có tư vấn miễn phí không?** Có — ${PHONE}, ${ADDRESS}, ${HOURS}.

**Mất bao lâu / có đau không?** Tùy dịch vụ: vài phút (tiêm) đến vài tuần hồi phục (phẫu thuật). Bác sĩ giải thích sau khám.

**Giá bao nhiêu?** Theo phác đồ cá nhân — [bảng giá](/bang-gia) hoặc báo giá trực tiếp.

**Có cần tái khám?** Có lịch theo dõi — tuân thủ giúp kết quả ổn định.`,

    `**Ai phù hợp ${focus}?** Khám trực tiếp để đánh giá — phụ thuộc tình trạng da/mô và sức khỏe.

**Bao lâu thấy kết quả?** Tiêm: vài ngày đến 2 tuần; phẫu thuật: vài tuần đến vài tháng.

**Đặt lịch thế nào?** Gọi ${PHONE} — tư vấn miễn phí, không ép đóng tiền ngay.

**Thiên Hoàng Kim ở đâu?** ${ADDRESS}.`,

    `**${focusTitle} an toàn không?** An toàn khi đúng chỉ định, bác sĩ có kinh nghiệm và chăm sóc đúng hướng dẫn.

**Chuẩn bị trước khi đến?** Mang danh sách thuốc đang dùng; tránh rượu trước tiêm/phẫu thuật theo chỉ dẫn bác sĩ.

**Thanh toán & báo giá?** Minh bạch sau khám — hỏi rõ gói bao gồm gì.

**Liên hệ:** ${PHONE} — Thiên Hoàng Kim, An Đông TP.HCM.`,
  ];

  return `## Câu hỏi thường gặp về ${focus}\n\n${pickVariant(slug, sets)}`;
}

function ctaSection(focus: string): string {
  return `---

**Đặt lịch tư vấn miễn phí** về ${focus}: **${PHONE}** — Thiên Hoàng Kim, ${ADDRESS}. Mở cửa ${HOURS}.`;
}

export function buildGeneratedArticleBody(
  entry: KeywordPlanEntry,
  imgSlide: string,
  imgIntro: string,
): string {
  const { focus, slug, pillar } = entry;
  const focusTitle = capitalizeFirst(focus);
  const img = imgIntro;
  const imgAlt = `${focusTitle} — tư vấn tại Thiên Hoàng Kim An Đông`;

  const process = processSection(focus, pillar, slug);

  return `${introParagraph(focus, pillar, slug, entry)}

${intentSection(focus, slug, pillar, entry)}

![${imgAlt}](${img})

${process}

${safetySection(focus, slug)}

${faqSection(focus, slug)}

${ctaSection(focus)}`;
}

export function buildGeneratedArticleTitle(entry: KeywordPlanEntry): string {
  if (entry.title?.trim()) return entry.title.trim();
  const focusTitle = capitalizeFirst(entry.focus);
  const intent = resolveIntent(entry.slug, entry);
  const priceTopic = focusTitle.replace(/^Giá\s+/i, "");

  switch (intent) {
    case "price":
      return `Giá ${priceTopic} — Bảng giá & tư vấn tại THK`;
    case "question":
      return `${focusTitle}? — Giải đáp từ bác sĩ`;
    case "location":
      return `${focusTitle} — Thiên Hoàng Kim An Đông`;
    case "comparison":
      return `${focusTitle} — So sánh & tư vấn`;
    default:
      if (entry.intent === "head" || entry.wordCount === 1) {
        return `${focusTitle} — Uy tín An Đông TP.HCM`;
      }
      return `${focusTitle} — Hướng dẫn từ Thiên Hoàng Kim`;
  }
}

export function buildGeneratedDescription(focus: string, slug?: string): string {
  return buildAttractiveMetaDescription({
    slug,
    focusKeyphrase: focus,
    displayTitle: capitalizeFirst(focus),
  });
}

export function buildGeneratedMetaDescription(focus: string, slug?: string): string {
  return buildAttractiveMetaDescription({
    slug,
    focusKeyphrase: focus,
    displayTitle: capitalizeFirst(focus),
  });
}

/** Ngày đăng trải đều — batch cũ từ 01/2025; short-KW mới từ 07/2026 */
const LEGACY_PLAN_COUNT = 778;

export function publishDateForIndex(index: number): string {
  if (index >= LEGACY_PLAN_COUNT) {
    const start = new Date(2026, 6, 1);
    const d = new Date(start);
    d.setDate(d.getDate() + (index - LEGACY_PLAN_COUNT));
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    return `${day}/${month}/${d.getFullYear()}`;
  }
  const start = new Date(2025, 0, 15);
  const d = new Date(start);
  d.setDate(d.getDate() + index);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}/${d.getFullYear()}`;
}
