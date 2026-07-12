/**
 * Gộp 500 từ khóa ngắn vào keyword-plan.merged.json để sinh bài /tin-tuc.
 * Chạy: node scripts/merge-short-500.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "../src/data");

const SKIP_SLUGS = new Set([
  "cat-mi",
  "cang-chi",
  "dich-vu-tham-my-y-khoa",
  "dich-vu-spa-cham-soc",
  "nang-mui-hoang-kim",
  "cat-mi-phuong-hoang",
  "cay-toc-tu-than",
  "cang-noi-soi",
  "cang-chi-tre-hoa",
  "filler-tao-hinh",
  "botox-xoa-nhan-gon-ham",
  "u-da-muoi-himalaya",
  "phun-xam-tham-my",
  "massage-body-thu-gian",
  "massage-facial",
  "cham-soc-da-toan-dien",
]);

function titleCaseFocus(focus) {
  if (!focus) return "";
  return focus.charAt(0).toUpperCase() + focus.slice(1);
}

const mergedPath = path.join(dataDir, "keyword-plan.merged.json");
const shortPath = path.join(dataDir, "keyword-plan-short-500.json");

const merged = JSON.parse(fs.readFileSync(mergedPath, "utf8"));
const short = JSON.parse(fs.readFileSync(shortPath, "utf8"));
const existingSlugs = new Set(merged.map((e) => e.slug));

let added = 0;
let skipped = 0;

for (const e of short) {
  if (!e.slug || !e.focus) {
    skipped++;
    continue;
  }
  if (existingSlugs.has(e.slug) || SKIP_SLUGS.has(e.slug)) {
    skipped++;
    continue;
  }
  existingSlugs.add(e.slug);
  merged.push({
    focus: e.focus,
    slug: e.slug,
    pillar: e.pillar,
    title: `${titleCaseFocus(e.focus)} — Tư vấn tại Thiên Hoàng Kim`,
    source: "short-500",
    intent: e.intent,
    wordCount: e.wordCount,
    group: e.group,
  });
  added++;
}

merged.sort((a, b) => a.slug.localeCompare(b.slug));
fs.writeFileSync(mergedPath, `${JSON.stringify(merged, null, 2)}\n`, "utf8");

console.log(`[merge-short-500] Merged total: ${merged.length} (+${added} short-KW)`);
console.log(`[merge-short-500] Skipped: ${skipped}`);
