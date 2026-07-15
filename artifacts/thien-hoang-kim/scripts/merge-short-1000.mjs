/**
 * Gộp 1000 từ khóa ngắn vào keyword-plan.merged.json để sinh bài /tin-tuc.
 * Chạy: node scripts/merge-short-1000.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "../src/data");

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

const mergedPath = path.join(dataDir, "keyword-plan.merged.json");
const shortPath = path.join(dataDir, "keyword-plan-short-1000.json");

const merged = JSON.parse(fs.readFileSync(mergedPath, "utf8"));
const short = JSON.parse(fs.readFileSync(shortPath, "utf8"));
const existingSlugs = new Set(merged.map((e) => e.slug));

let added = 0;
let skipped = 0;

for (let i = 0; i < short.length; i++) {
  const e = short[i];
  if (!e.slug || !e.focus) {
    skipped++;
    continue;
  }
  if (existingSlugs.has(e.slug)) {
    skipped++;
    continue;
  }
  existingSlugs.add(e.slug);
  merged.push({
    focus: e.focus,
    slug: e.slug,
    pillar: e.pillar,
    title: titleFor(e.focus, i),
    source: "short-1000",
    intent: e.intent || "short",
    wordCount: Math.max(e.wordCount || 3, 3),
    group: e.group || "SK1K",
  });
  added++;
}

merged.sort((a, b) => a.slug.localeCompare(b.slug));
fs.writeFileSync(mergedPath, `${JSON.stringify(merged, null, 2)}\n`, "utf8");

console.log(`[merge-short-1000] Merged total: ${merged.length} (+${added} short-KW)`);
console.log(`[merge-short-1000] Skipped: ${skipped}`);
