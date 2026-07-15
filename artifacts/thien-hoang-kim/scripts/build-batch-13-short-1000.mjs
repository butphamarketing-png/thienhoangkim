/**
 * Sinh Batch 13: 1000 bài từ keyword-plan-short-1000.json
 * Chạy: node scripts/build-batch-13-short-1000.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dataDir = path.join(root, "src/data");
const articlesDir = path.join(dataDir, "articles");

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

function titleFor(focus, i, preset) {
  if (preset?.trim()) return preset.trim();
  return TITLE_PATTERNS[i % TITLE_PATTERNS.length](focus);
}

function descFor(focus) {
  return `${cap(focus)} tại Thiên Hoàng Kim An Đông Quận 5: hiểu chỉ định, cách chuẩn bị và khi nào nên nhắn lịch tư vấn. Hotline 0896 673 320.`;
}

function bodyExport(focus, pillar, constName, tipIndex) {
  const label = cap(focus);
  const tips = [
    "Mô tả mục tiêu bằng lời của bạn thay vì chỉ gửi ảnh mẫu mạng.",
    "Hỏi rõ ai thực hiện, vật liệu/công nghệ và lịch tái khám trước khi đặt cọc.",
    "So sánh phạm vi dịch vụ, không chỉ so một con số giá.",
    "Khai báo tiền sử tiêm/phẫu thuật và thuốc đang dùng để tránh rủi ro.",
    "Ưu tiên cơ sở gần để tái khám thuận, đặc biệt với thủ thuật cần theo dõi.",
  ];
  const tip = tips[tipIndex % tips.length];
  const pillarPath = pillar.startsWith("/") ? pillar : `/${pillar}`;
  const pillarLabel = pillarPath.replace(/^\//, "");

  return [
    `export const ${constName} = \`Bạn đang tìm hiểu **${focus}** và muốn biết bước nào hợp trước khi quyết định? Bài viết tóm tắt điều cần làm rõ để buổi tư vấn đi vào trọng tâm.`,
    ``,
    `## ${label}: nên bắt đầu từ đâu?`,
    ``,
    `Mỗi người có nền tảng da, cấu trúc mặt và tiền sử can thiệp khác nhau. Cùng từ khóa **${focus}** vẫn có thể dẫn tới phương án khác nhau sau khám. ${tip}`,
    ``,
    `Tham khảo: [${pillarLabel}](${pillarPath}), [bảng giá](/bang-gia), [địa chỉ thẩm mỹ Quận 5 An Đông](/tin-tuc/dia-chi-tham-my-quan-5-an-dong).`,
    ``,
    `![Tư vấn ${focus} tại Thiên Hoàng Kim](\${NEWS_IMG_INTRO})`,
    ``,
    `## Checklist trước khi nhắn đặt lịch`,
    ``,
    `1. Mục tiêu cụ thể trong 1 câu (ví dụ: tự nhiên hơn, gọn hơn, sáng hơn).`,
    `2. Thời gian có thể nghỉ dưỡng hoặc tái khám.`,
    `3. Ngân sách tham khảo và hạng mục cần hỏi rõ.`,
    `4. Ảnh thẳng/nghiêng nếu muốn định hướng sơ bộ (không bắt buộc).`,
    ``,
    `## Khi nào nên nhắn tin ngay?`,
    ``,
    `Nhắn khi bạn đã có mục tiêu, cần khung giờ, hoặc đang phân vân giữa hai hướng. Ghi rõ **${focus}** trong tin nhắn để được hỗ trợ đúng luồng.`,
    ``,
    `## Câu hỏi thường gặp`,
    ``,
    `**Có tư vấn qua ảnh không?** Ảnh hỗ trợ sơ bộ. Chỉ định chính xác cần thăm khám trực tiếp.`,
    ``,
    `**Có làm ngay trong lần đầu không?** Không bắt buộc. Bạn có thể về cân nhắc rồi mới đặt lịch thực hiện.`,
    ``,
    `\${CLINIC_FOOTER}\`;`,
    ``,
  ].join("\n");
}

const plan = JSON.parse(fs.readFileSync(path.join(dataDir, "keyword-plan-short-1000.json"), "utf8"));
if (plan.length !== 1000) {
  console.warn(`[batch-13] Expected 1000, got ${plan.length}`);
}

const entries = [];
const constNames = [];
const bodyChunks = [];

plan.forEach((e, i) => {
  const focus = e.focus;
  const pillar = e.pillar || "/tin-tuc";
  const slug = e.slug;
  const id = `tn-${436 + i}`;
  const base = slug.replace(/-sk1k\d*$/, "").replace(/-/g, "_").toUpperCase().slice(0, 40);
  const constName = `SK13_${String(i + 1).padStart(4, "0")}_${base}_BODY`;
  constNames.push(constName);
  bodyChunks.push(bodyExport(focus, pillar, constName, i));
  entries.push({
    id,
    slug,
    title: titleFor(focus, i, e.title),
    description: descFor(focus),
    focus,
    keywords: `${focus}, tư vấn ${focus}, Thiên Hoàng Kim, thẩm mỹ An Đông`,
    bodyConst: constName,
  });
});

const header = [
  "/** Batch 13: 1000 bài từ khóa ngắn short-1000 (auto) */",
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

fs.writeFileSync(path.join(articlesDir, "news-batch-13-short.body.ts"), header + bodyChunks.join("\n"));

// Split imports into chunks to avoid huge single import line issues - still one import block is fine
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
  "/** Wire tn-436 → tn-1435. Batch 13: 1000 từ khóa ngắn */",
  "",
  "import {",
  `  ${importList},`,
  '} from "@/data/articles/news-batch-13-short.body";',
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
  "type Batch13Entry = {",
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
  "const BATCH_13_ENTRIES: Batch13Entry[] = [",
  entryObjects + ",",
  "];",
  "",
  "export const MANUAL_BATCH_13_ARTICLES: SiteArticle[] = BATCH_13_ENTRIES.map((e) =>",
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
  "export const BATCH_13_SLUGS = BATCH_13_ENTRIES.map((e) => e.slug);",
  "",
].join("\n");

fs.writeFileSync(path.join(dataDir, "news-batch-13.entries.ts"), entriesFile);

// append overrides
let override = fs.readFileSync(path.join(dataDir, "manual-override-slugs.ts"), "utf8");
const add = entries.map((e) => e.slug).filter((slug) => !override.includes(`"${slug}"`));
if (add.length) {
  const insert = add.map((s) => `  "${s}",`).join("\n");
  override = override.replace(/\n\]\);\s*$/, `\n${insert}\n]);\n`);
  fs.writeFileSync(path.join(dataDir, "manual-override-slugs.ts"), override);
}

console.log(`[batch-13] Wrote ${entries.length} articles`);
console.log(`[batch-13] ${entries[0].slug} .. ${entries[entries.length - 1].slug}`);
console.log(`[batch-13] override +${add.length}`);
