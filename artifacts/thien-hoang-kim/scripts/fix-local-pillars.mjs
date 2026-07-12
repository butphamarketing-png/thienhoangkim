/**
 * Sửa pillar /lien-he → dịch vụ đúng cho từ khóa local theo dịch vụ.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mergedPath = path.join(__dirname, "../src/data/keyword-plan.merged.json");

const LOCAL_SERVICE_PILLAR = [
  [/^(nang-mui|mui-|song-mui|sua-mui)/, "/tham-my/nang-mui-hoang-kim"],
  [/^(filler|tiem-filler|tiem-moi)/, "/tham-my/filler-tao-hinh"],
  [/^(cat-mi|nhan-mi|bam-mi|mi-)/, "/tham-my/cat-mi-phuong-hoang"],
  [/^(botox|tiem-botox|thon-ham)/, "/tham-my/botox-xoa-nhan-gon-ham"],
  [/^(cay-toc|toc-|rung-toc)/, "/tham-my/cay-toc-tu-than"],
  [/^(cang-chi|cang-noi|tre-hoa|hifu)/, "/tham-my/cang-chi-tre-hoa"],
  [/^(tri-mun|tri-nam|mun-|peel|laser|skincare|da-)/, "/spa/cham-soc-da-toan-dien"],
  [/^(phun-|xam-|microblading)/, "/spa/phun-xam-tham-my"],
  [/^(spa-|massage|facial)/, "/spa/massage-body-thu-gian"],
];

const LOCAL_RE = /tphcm|tp-hcm|quan-|an-dong|hung-vuong|cho-lon|q5|phong-kham|clinic-|gan-day|tham-my-q/;

function inferLocalPillar(slug) {
  for (const [re, pillar] of LOCAL_SERVICE_PILLAR) {
    if (re.test(slug)) return pillar;
  }
  return null;
}

const merged = JSON.parse(fs.readFileSync(mergedPath, "utf8"));
let fixed = 0;

for (const e of merged) {
  if (!e.slug || !LOCAL_RE.test(e.slug)) continue;
  if (e.pillar !== "/lien-he" && e.pillar !== "/tin-tuc") continue;
  const next = inferLocalPillar(e.slug);
  if (next && next !== e.pillar) {
    e.pillar = next;
    fixed++;
  }
}

fs.writeFileSync(mergedPath, `${JSON.stringify(merged, null, 2)}\n`, "utf8");
console.log(`[fix-local-pillars] Updated ${fixed} entries`);
