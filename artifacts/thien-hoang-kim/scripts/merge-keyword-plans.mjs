/**
 * Gộp kế hoạch 500+500 từ khóa, loại trùng slug và slug đã có trên site.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "../src/data");

const plan1 = JSON.parse(fs.readFileSync(path.join(dataDir, "keyword-plan-plan1.json"), "utf8"));
const plan2 = JSON.parse(fs.readFileSync(path.join(dataDir, "keyword-plan-plan2.json"), "utf8"));

const defaultsText = fs.readFileSync(path.join(dataDir, "articles.defaults.ts"), "utf8");
const existingSlugs = new Set();
for (const m of defaultsText.matchAll(/article\(\s*\n?\s*"[^"]+",\s*\n?\s*"([a-z0-9-]+)"/g)) {
  existingSlugs.add(m[1]);
}

/** Slug redirect hoặc trùng trang dịch vụ — không tạo bài /tin-tuc */
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
  "hut-mo-cay-mo-ma",
  "filler-tao-hinh",
  "botox-xoa-nhan-gon-ham",
  "u-da-muoi-himalaya",
  "phun-xam-tham-my",
  "massage-body-thu-gian",
  "massage-facial",
  "cham-soc-da-toan-dien",
]);

const PILLAR_BY_PREFIX = [
  [/^(nang-mui|mui-|song-mui|phau-thuat-mui|chinh-dau|thu-gon-canh|tai-nang-mui|cham-soc-sau-nang|chi-phi-nang|gia-nang|kieu-mui)/, "/tham-my/nang-mui-hoang-kim"],
  [/^(cat-mi|nhan-mi|bam-mi|mi-|mat-|mo-goc|lay-mo-mi|lay-mo-bong|bong-mat|tham-my-mat|sung-sau-cat|cham-soc-sau-cat|makeup-sau-cat|kieng-gi-sau-cat|gia-cat)/, "/tham-my/cat-mi-phuong-hoang"],
  [/^(cay-toc|hoi-dau|rung-toc|tri-hoi|ghep-toc|prp-toc|fue-|toc-)/, "/tham-my/cay-toc-tu-than"],
  [/^(cang-chi|cang-da|cang-noi|tre-hoa|hifu|meso-tre|nang-co-mat|san-chac|da-chay|nep-nhan|ranh-cuoi|nong-cam|co-ga|lao-hoa|thread-lift|rf-tre|ultrasound-cang)/, "/tham-my/cang-chi-tre-hoa"],
  [/^(hut-mo|cay-mo|ma-baby|ma-hop|gon-ham|ham-|thon-mat|tao-hinh-mat|got-ham|vline-|mo-nong|go-ma)/, "/tham-my/hut-mo-cay-mo-ma"],
  [/^(filler|tiem-filler|tiem-moi|tiem-cam|moi-mong|cam-lem|tan-filler|sua-filler|goc-ham-filler|hoi-phuc-sau-filler|di-lam-sau-filler|lam-gi-truoc-tiem-filler|chi-phi-filler)/, "/tham-my/filler-tao-hinh"],
  [/^(botox|tiem-botox|xoa-nhan|nhan-|thon-ham|uong-ruou-sau-botox|hoi-phuc-sau-botox|chi-phi-botox)/, "/tham-my/botox-xoa-nhan-gon-ham"],
  [/^(tri-mun|tri-nam|tri-tan|tri-seo|tri-tham|mun-|nam-|tan-nhang|melasma|da-|lam-trang|sang-da|lo-chan|peel|laser-tri|laser-co|laser-fra|ipl-|picosure|hydrafacial|facial|skincare|kem-chong|retinol|vitamin-c|bha-|chong-nang|tham-mun|phuc-hoi-da)/, "/spa/cham-soc-da-toan-dien"],
  [/^(phun-|xoa-xam|khu-xam|dieu-khac|eyeliner|makeup-sau-phun|may-khong)/, "/spa/phun-xam-tham-my"],
  [/^(massage|spa-|u-trang|u-da-muoi|thai-doc|detox|goi-duong|tam-trang|goi-spa|gia-massage|himalaya|muoi-himalaya|lieu-trinh-spa|uu-dai-spa)/, "/spa/massage-body-thu-gian"],
];

function inferPillar(slug, planPillar) {
  if (planPillar) return planPillar;
  for (const [re, pillar] of PILLAR_BY_PREFIX) {
    if (re.test(slug)) return pillar;
  }
  if (/tphcm|quan-|an-dong|hung-vuong|cho-lon|gan-day|clinic-|phong-kham|lien-he|dat-lich|tu-van/.test(slug)) {
    return "/lien-he";
  }
  if (/gia-|chi-phi|bang-gia|khuyen-mai|review|kinh-nghiem|before-after|bao-gia|hoi-gia|tra-gop/.test(slug)) {
    return "/bang-gia";
  }
  return "/tham-my/nang-mui-hoang-kim";
}

function titleCaseFocus(focus) {
  if (!focus) return "";
  return focus.charAt(0).toUpperCase() + focus.slice(1);
}

const merged = new Map();

for (const e of plan1) {
  if (!e.slug) continue;
  merged.set(e.slug, {
    focus: e.focus,
    slug: e.slug,
    pillar: inferPillar(e.slug, e.pillar),
    source: "plan1",
  });
}

for (const e of plan2) {
  if (!e.slug) continue;
  const prev = merged.get(e.slug);
  merged.set(e.slug, {
    focus: e.focus,
    slug: e.slug,
    pillar: inferPillar(e.slug, prev?.pillar),
    source: prev ? "both" : "plan2",
  });
}

const toGenerate = [];
let skippedExisting = 0;
let skippedReserved = 0;

for (const e of merged.values()) {
  if (existingSlugs.has(e.slug)) {
    skippedExisting++;
    continue;
  }
  if (SKIP_SLUGS.has(e.slug)) {
    skippedReserved++;
    continue;
  }
  toGenerate.push({
    ...e,
    title: `${titleCaseFocus(e.focus)} — Tư vấn tại Thiên Hoàng Kim`,
  });
}

toGenerate.sort((a, b) => a.slug.localeCompare(b.slug));

const out = path.join(dataDir, "keyword-plan.merged.json");
fs.writeFileSync(out, JSON.stringify(toGenerate));
console.log(`Merged unique slugs: ${merged.size}`);
console.log(`Skip existing: ${skippedExisting}, skip reserved: ${skippedReserved}`);
console.log(`To generate: ${toGenerate.length} → ${out}`);
