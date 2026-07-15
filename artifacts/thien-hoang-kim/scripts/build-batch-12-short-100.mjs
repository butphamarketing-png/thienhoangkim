/**
 * Sinh Batch 12: 100 bài SEO từ khóa ngắn (tiêu đề hút nhắn tin).
 * Chạy: node scripts/build-batch-12-short-100.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dataDir = path.join(root, "src/data");
const articlesDir = path.join(dataDir, "articles");

const KEYWORDS = [
  ["nâng mũi", "/tham-my/nang-mui-hoang-kim"],
  ["cắt mí", "/tham-my/cat-mi-phuong-hoang"],
  ["filler", "/tham-my/filler-tao-hinh"],
  ["botox", "/tham-my/botox-xoa-nhan-gon-ham"],
  ["căng chỉ", "/tham-my/cang-chi-tre-hoa"],
  ["phun xăm", "/spa/phun-xam-tham-my"],
  ["chăm sóc da", "/spa/cham-soc-da-toan-dien"],
  ["thẩm mỹ", "/tin-tuc/dia-chi-tham-my-quan-5-an-dong"],
  ["spa", "/spa/massage-body-thu-gian"],
  ["độn cằm", "/tham-my/filler-tao-hinh"],
  ["gọt hàm", "/tham-my/botox-xoa-nhan-gon-ham"],
  ["hút mỡ", "/tham-my/filler-tao-hinh"],
  ["nâng ngực", "/tham-my/filler-tao-hinh"],
  ["cấy tóc", "/tham-my/cay-toc-tu-than"],
  ["nâng cơ", "/tham-my/cang-chi-tre-hoa"],
  ["trẻ hóa", "/tham-my/cang-chi-tre-hoa"],
  ["nhấn mí", "/tham-my/cat-mi-phuong-hoang"],
  ["bấm mí", "/tham-my/cat-mi-phuong-hoang"],
  ["sửa mũi", "/tham-my/nang-mui-hoang-kim"],
  ["tiêm môi", "/tham-my/filler-tao-hinh"],
  ["gọn hàm", "/tham-my/botox-xoa-nhan-gon-ham"],
  ["xóa nhăn", "/tham-my/botox-xoa-nhan-gon-ham"],
  ["HIFU", "/tham-my/cang-chi-tre-hoa"],
  ["meso", "/spa/cham-soc-da-toan-dien"],
  ["facial", "/spa/massage-facial"],
  ["massage", "/spa/massage-body-thu-gian"],
  ["phun mày", "/spa/phun-xam-tham-my"],
  ["phun môi", "/spa/phun-xam-tham-my"],
  ["căng da", "/tham-my/cang-noi-soi"],
  ["nội soi", "/tham-my/cang-noi-soi"],
  ["sụp mí", "/tham-my/cat-mi-phuong-hoang"],
  ["lấy mỡ mí", "/tham-my/cat-mi-phuong-hoang"],
  ["thu cánh mũi", "/tham-my/nang-mui-hoang-kim"],
  ["sống mũi", "/tham-my/nang-mui-hoang-kim"],
  ["đầu mũi", "/tham-my/nang-mui-hoang-kim"],
  ["filler cằm", "/tham-my/filler-tao-hinh"],
  ["filler má", "/tham-my/filler-tao-hinh"],
  ["Thermage", "/tham-my/cang-chi-tre-hoa"],
  ["Ultherapy", "/tham-my/cang-chi-tre-hoa"],
  ["RF", "/tham-my/cang-chi-tre-hoa"],
  ["Baby Face", "/tham-my/filler-tao-hinh"],
  ["cấy mỡ", "/tham-my/filler-tao-hinh"],
  ["Contoura", "/tham-my/cang-chi-tre-hoa"],
  ["Ignite RF", "/tham-my/cang-chi-tre-hoa"],
  ["peel da", "/spa/cham-soc-da-toan-dien"],
  ["trị nám", "/spa/cham-soc-da-toan-dien"],
  ["trị mụn", "/spa/cham-soc-da-toan-dien"],
  ["lỗ chân lông", "/spa/cham-soc-da-toan-dien"],
  ["da xỉn", "/spa/cham-soc-da-toan-dien"],
  ["detox da", "/spa/u-da-muoi-himalaya"],
  ["ủ muối", "/spa/u-da-muoi-himalaya"],
  ["bảng giá", "/bang-gia"],
  ["đặt lịch", "/lien-he"],
  ["tư vấn thẩm mỹ", "/lien-he"],
  ["bác sĩ thẩm mỹ", "/gioi-thieu"],
  ["phòng khám thẩm mỹ", "/tin-tuc/dia-chi-tham-my-quan-5-an-dong"],
  ["thẩm mỹ viện", "/tin-tuc/dia-chi-tham-my-quan-5-an-dong"],
  ["trước sau", "/tin-tuc"],
  ["thẩm mỹ mắt", "/tham-my/cat-mi-phuong-hoang"],
  ["thẩm mỹ mũi", "/tham-my/nang-mui-hoang-kim"],
  ["tạo hình mặt", "/tham-my/filler-tao-hinh"],
  ["điêu khắc mặt", "/tham-my/filler-tao-hinh"],
  ["V-line", "/tham-my/botox-xoa-nhan-gon-ham"],
  ["mặt thon", "/tham-my/botox-xoa-nhan-gon-ham"],
  ["da chảy xệ", "/tham-my/cang-chi-tre-hoa"],
  ["nọng cằm", "/tham-my/cang-chi-tre-hoa"],
  ["đường hàm", "/tham-my/botox-xoa-nhan-gon-ham"],
  ["collagen", "/spa/cham-soc-da-toan-dien"],
  ["phục hồi da", "/spa/cham-soc-da-toan-dien"],
  ["hậu phẫu", "/tin-tuc/cham-soc-da-sau-phau-thuat"],
  ["kiêng cữ", "/tin-tuc/cham-soc-da-sau-phau-thuat"],
  ["giảm sưng", "/tin-tuc/cham-soc-da-sau-phau-thuat"],
  ["tái khám", "/lien-he"],
  ["giấy phép", "/gioi-thieu"],
  ["an toàn thẩm mỹ", "/tin-tuc/chon-phong-kham-tham-my-an-toan"],
  ["Quận 5", "/tin-tuc/tham-my-quan-5"],
  ["An Đông", "/tin-tuc/dia-chi-tham-my-quan-5-an-dong"],
  ["Hùng Vương", "/tin-tuc/tham-my-hung-vuong"],
  ["TP.HCM", "/tin-tuc/tham-my-uy-tin-tphcm"],
  ["Chợ Lớn", "/tin-tuc/tham-my-cho-lon"],
  ["Tân Bình", "/tin-tuc/nang-mui-tphcm"],
  ["Phú Nhuận", "/tin-tuc/nang-mui-tphcm"],
  ["Quận 6", "/tin-tuc/tham-my-quan-5"],
  ["Quận 10", "/tin-tuc/tham-my-quan-5"],
  ["Thiên Hoàng Kim", "/"],
  ["nâng mũi cấu trúc", "/tham-my/nang-mui-hoang-kim"],
  ["cắt mí phượng hoàng", "/tham-my/cat-mi-phuong-hoang"],
  ["filler tạo hình", "/tham-my/filler-tao-hinh"],
  ["botox hàm", "/tham-my/botox-xoa-nhan-gon-ham"],
  ["căng chỉ trẻ hóa", "/tham-my/cang-chi-tre-hoa"],
  ["cấy tóc FUE", "/tham-my/cay-toc-tu-than"],
  ["spa Quận 5", "/tin-tuc/spa-quan-5"],
  ["thẩm mỹ Quận 5", "/tin-tuc/tham-my-quan-5"],
  ["nâng mũi TP.HCM", "/tin-tuc/nang-mui-tphcm"],
  ["cắt mí TP.HCM", "/tin-tuc/cat-mi-tphcm"],
  ["filler TP.HCM", "/tin-tuc/filler-tphcm"],
  ["botox TP.HCM", "/tin-tuc/botox-tphcm"],
  ["phun xăm Quận 5", "/tin-tuc/phun-may-quan-5"],
  ["hotline thẩm mỹ", "/lien-he"],
  ["ưu đãi thẩm mỹ", "/bang-gia"],
];

function slugify(focus) {
  return focus
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const TITLE_PATTERNS = [
  (f) => `${cap(f)}: 4 điều nên hỏi trước khi nhắn đặt lịch`,
  (f) => `${cap(f)} thế nào cho đúng? Gợi ý trước buổi tư vấn`,
  (f) => `Quan tâm ${f}? Đừng quyết nếu chưa rõ 3 điểm này`,
  (f) => `${cap(f)}: checklist nhanh để tránh chọn sai`,
  (f) => `Muốn ${f}? Nhắn mục tiêu để nhận khung giờ tư vấn`,
];

function cap(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function titleFor(focus, i) {
  return TITLE_PATTERNS[i % TITLE_PATTERNS.length](focus);
}

function descFor(focus) {
  return `${cap(focus)} tại Thiên Hoàng Kim An Đông Quận 5: hiểu chỉ định, rủi ro và cách chuẩn bị trước khi nhắn lịch tư vấn. Hotline 0896 673 320.`;
}

function bodyFor(focus, pillar, constName) {
  const label = cap(focus);
  const pillarLabel = pillar.replace(/^\//, "");
  const lines = [
    `export const ${constName} = \`Bạn đang tìm hiểu **${focus}** và muốn biết bước nào hợp trước khi quyết định? Bài viết tóm tắt điều cần làm rõ để buổi tư vấn đi vào trọng tâm, hạn chế kỳ vọng lệch.`,
    ``,
    `## ${label} phù hợp khi nào?`,
    ``,
    `Mỗi người có nền tảng da, cấu trúc mặt và tiền sử can thiệp khác nhau. Vì vậy cùng một từ khóa **${focus}** vẫn có thể dẫn tới phương án khác nhau sau khi khám. Hãy mô tả mục tiêu bằng lời của bạn (ví dụ: tự nhiên hơn, gọn hơn, sáng hơn) thay vì chỉ gửi ảnh mẫu.`,
    ``,
    `Tham khảo dịch vụ liên quan tại [${pillarLabel}](${pillar}) và [địa chỉ thẩm mỹ Quận 5 An Đông](/tin-tuc/dia-chi-tham-my-quan-5-an-dong).`,
    ``,
    `![Tư vấn ${focus} tại Thiên Hoàng Kim](\${NEWS_IMG_INTRO})`,
    ``,
    `## 4 câu hỏi nên chuẩn bị`,
    ``,
    `1. Kết quả kỳ vọng trong bao lâu và mức độ thay đổi bao nhiêu là hợp lý?`,
    `2. Có cần xét nghiệm, kiêng thuốc hoặc dừng mỹ phẩm nào không?`,
    `3. Chi phí gồm những hạng mục gì, phần nào có thể phát sinh?`,
    `4. Lịch tái khám và dấu hiệu cần liên hệ sớm là gì?`,
    ``,
    `## Khi nào nên nhắn tin ngay?`,
    ``,
    `Nhắn khi bạn đã có mục tiêu rõ hoặc ảnh tham khảo, cần sắp khung giờ, hoặc đang phân vân giữa hai hướng điều trị. Ghi rõ từ khóa **${focus}** trong tin nhắn để được hỗ trợ đúng luồng.`,
    ``,
    `## Câu hỏi thường gặp`,
    ``,
    `**Có tư vấn qua ảnh không?** Ảnh hỗ trợ định hướng sơ bộ. Chỉ định chính xác cần thăm khám trực tiếp.`,
    ``,
    `**Có bắt buộc làm ngay trong lần đầu không?** Không. Bạn có thể về cân nhắc rồi mới đặt lịch thực hiện.`,
    ``,
    `\${CLINIC_FOOTER}\`;`,
    ``,
  ];
  return lines.join("\n");
}

const entries = [];
const constNames = [];
const bodyChunks = [];

KEYWORDS.forEach(([focus, pillar], i) => {
  const base = slugify(focus);
  const slug = `${base}-goi-y`;
  const id = `tn-${336 + i}`;
  const constName = `SK12_${String(i + 1).padStart(3, "0")}_${base.replace(/-/g, "_").toUpperCase()}_BODY`;
  constNames.push(constName);
  bodyChunks.push(bodyFor(focus, pillar, constName));
  entries.push({
    id,
    slug,
    title: titleFor(focus, i),
    description: descFor(focus),
    focus,
    keywords: `${focus}, tư vấn ${focus}, Thiên Hoàng Kim, thẩm mỹ An Đông`,
    bodyConst: constName,
  });
});

const header = [
  "/** Batch 12: 100 bài từ khóa ngắn (auto) */",
  "",
  'import { NEWS_IMG_INTRO } from "@/data/articles/news-assets";',
  "",
  "const CLINIC_FOOTER = `## Nhắn tin tư vấn tại Thiên Hoàng Kim",
  "",
  "Mỗi tình trạng khác nhau. Bài viết giúp bạn chuẩn bị câu hỏi, không thay thế chỉ định bác sĩ.",
  "",
  "**Muốn nhận gợi ý nhanh?** Nhắn mục tiêu hoặc ảnh (không bắt buộc). Đội ngũ sẽ phản hồi khung giờ phù hợp.",
  "",
  "Xem [bảng giá](/bang-gia), [liên hệ](/lien-he) hoặc [địa chỉ thẩm mỹ Quận 5 An Đông](/tin-tuc/dia-chi-tham-my-quan-5-an-dong).",
  "",
  "Thiên Hoàng Kim mở cửa **08:00-20:00** mỗi ngày. Hotline **0896 673 320**. Địa chỉ **323-325 Hùng Vương, An Đông, Quận 5, TP.HCM**.`;",
  "",
].join("\n");

const bodyFile = header + bodyChunks.join("\n");

const importList = constNames.join(",\n  ");
const entryObjects = entries
  .map(
    (e) => `  {
    id: "${e.id}",
    slug: "${e.slug}",
    title: ${JSON.stringify(e.title)},
    description: ${JSON.stringify(e.description)},
    focus: ${JSON.stringify(e.focus)},
    keywords: ${JSON.stringify(e.keywords)},
    body: ${e.bodyConst},
    category: "Tin tức" as const,
  }`,
  )
  .join(",\n");

const entriesFile = [
  "/** Wire tn-336 → tn-435. Batch 12: 100 từ khóa ngắn */",
  "",
  "import {",
  `  ${importList},`,
  '} from "@/data/articles/news-batch-12-short.body";',
  'import { buildNewsArticleSeo } from "@/lib/article-seo";',
  'import { DEFAULT_ARTICLE_SEO } from "@/lib/seo";',
  'import type { ArticleSeo, SiteArticle } from "@/types/site-content";',
  "",
  "const publicAsset = (file: string) =>",
  '  `${import.meta.env.BASE_URL}${file}`.replace(/([^:]\\/)\\/+/g, "$1");',
  "",
  'const intro = publicAsset("gioithieu.1.png");',
  "",
  "function newsSeo(",
  "  slug: string,",
  "  metaDescription: string,",
  "  focusKeyphrase: string,",
  "  keywords?: string,",
  "  ogImage = intro,",
  "): ArticleSeo {",
  "  return buildNewsArticleSeo(slug, metaDescription, focusKeyphrase, keywords, ogImage);",
  "}",
  "",
  "function article(",
  "  id: string,",
  "  slug: string,",
  "  title: string,",
  "  date: string,",
  "  description: string,",
  "  body: string,",
  "  image = intro,",
  '  category = "Kiến thức",',
  "  seo: ArticleSeo = { ...DEFAULT_ARTICLE_SEO },",
  "): SiteArticle {",
  "  return { id, slug, category, image, title, date, description, body, published: true, seo };",
  "}",
  "",
  "type Batch12Entry = {",
  "  id: string;",
  "  slug: string;",
  "  title: string;",
  "  description: string;",
  "  focus: string;",
  "  keywords: string;",
  "  body: string;",
  '  category: "Tin tức" | "Kiến thức";',
  "};",
  "",
  "const BATCH_12_ENTRIES: Batch12Entry[] = [",
  entryObjects + ",",
  "];",
  "",
  "export const MANUAL_BATCH_12_ARTICLES: SiteArticle[] = BATCH_12_ENTRIES.map((e) =>",
  "  article(",
  "    e.id,",
  "    e.slug,",
  "    e.title,",
  '    "15/07/2026",',
  "    e.description,",
  "    e.body,",
  "    intro,",
  "    e.category,",
  "    newsSeo(e.slug, e.description, e.focus, e.keywords, intro),",
  "  ),",
  ");",
  "",
  "export const BATCH_12_SLUGS = BATCH_12_ENTRIES.map((e) => e.slug);",
  "",
].join("\n");

fs.writeFileSync(path.join(articlesDir, "news-batch-12-short.body.ts"), bodyFile);
fs.writeFileSync(path.join(dataDir, "news-batch-12.entries.ts"), entriesFile);

fs.writeFileSync(
  path.join(dataDir, "keyword-plan-short-100-batch12.json"),
  `${JSON.stringify(
    KEYWORDS.map(([focus, pillar], i) => ({
      id: i + 1,
      focus,
      slug: entries[i].slug,
      pillar,
      title: entries[i].title,
      source: "short-100-batch12",
      intent: "short",
      wordCount: focus.split(/\s+/).length,
    })),
    null,
    2,
  )}\n`,
);

console.log(`[batch-12] Wrote ${entries.length} articles`);
console.log(`[batch-12] ${entries[0].slug} .. ${entries[entries.length - 1].slug}`);
