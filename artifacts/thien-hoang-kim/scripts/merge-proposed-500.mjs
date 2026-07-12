/**
 * Gộp 500 từ khóa long-tail (keyword-plan-proposed-500.json) vào keyword-plan.merged.json.
 * Chạy: node scripts/merge-proposed-500.mjs
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
const proposedPath = path.join(dataDir, "keyword-plan-proposed-500.json");

const merged = JSON.parse(fs.readFileSync(mergedPath, "utf8"));
const proposed = JSON.parse(fs.readFileSync(proposedPath, "utf8"));
const existingSlugs = new Set(merged.map((e) => e.slug));

let added = 0;
let skipped = 0;

for (const e of proposed) {
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
    source: "long-tail-500",
    intent: e.intent,
    priority: e.priority,
    group: e.group,
    groupName: e.groupName,
  });
  added++;
}

merged.sort((a, b) => a.slug.localeCompare(b.slug));
fs.writeFileSync(mergedPath, `${JSON.stringify(merged, null, 2)}\n`, "utf8");

console.log(`[merge-proposed-500] Merged total: ${merged.length} (+${added} long-tail)`);
console.log(`[merge-proposed-500] Skipped: ${skipped}`);
