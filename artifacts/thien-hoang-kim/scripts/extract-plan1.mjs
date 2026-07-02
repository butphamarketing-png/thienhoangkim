import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const transcript =
  "C:/Users/Admin/.cursor/projects/c-Users-Admin-Downloads-Thien-Hoang-Kim/agent-transcripts/b0908aee-fa36-4bb9-b6f8-4d9a80072e92/b0908aee-fa36-4bb9-b6f8-4d9a80072e92.jsonl";

const PILLARS = {
  A: "/tham-my/nang-mui-hoang-kim",
  B: "/tham-my/cat-mi-phuong-hoang",
  C: "/tham-my/cay-toc-tu-than",
  D: "/tham-my/cang-noi-soi",
  E: "/tham-my/hut-mo-cay-mo-ma",
  F: "/tham-my/filler-tao-hinh",
  G: "/tham-my/botox-xoa-nhan-gon-ham",
  H: "/spa/cham-soc-da-toan-dien",
  I: "/spa/phun-xam-tham-my",
  J: "/spa/massage-body-thu-gian",
  K: "/tham-my/nang-mui-hoang-kim",
  L: "/lien-he",
  M: "/bang-gia",
  N: "/spa/cham-soc-da-toan-dien",
  O: "/tin-tuc",
};

function toSlug(kw) {
  return kw
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

const line = fs.readFileSync(transcript, "utf8").split("\n")[229];
const obj = JSON.parse(line);
const text = obj.message.content[0].text;

const groupRe = /### ([A-O]) —[^\n]+\n\n([\s\S]*?)(?=\n### |\n---|\n## 4\.)/g;
const entries = [];
let gm;
while ((gm = groupRe.exec(text))) {
  const group = gm[1];
  const pillar = PILLARS[group] ?? "/tin-tuc";
  const keywords = gm[2]
    .split("·")
    .map((s) => s.trim())
    .filter(Boolean);
  for (const focus of keywords) {
    entries.push({ focus, slug: toSlug(focus), pillar, group });
  }
}

const out = path.join(__dirname, "../src/data/keyword-plan-plan1.json");
fs.writeFileSync(out, JSON.stringify(entries));
console.log(`Wrote ${entries.length} entries → ${out}`);
