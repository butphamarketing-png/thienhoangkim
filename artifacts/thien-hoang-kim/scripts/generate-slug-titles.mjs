/**
 * Sinh slug → tiêu đề hiển thị (khớp slug) cho SEO meta title.
 * Chạy trước build: node scripts/generate-slug-titles.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, "..");
const dataDir = path.join(appRoot, "src/data");
const outPath = path.join(dataDir, "slug-titles.generated.json");

function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function capitalizeVi(text) {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** Từ điển đoạn slug → tiếng Việt (bổ sung dần từ keyword plan) */
const SEGMENT_VI = {
  "5": "5",
  tp: "TP",
  hcm: "HCM",
  tphcm: "TP.HCM",
  va: "và",
  la: "là",
  gi: "gì",
  co: "có",
  khong: "không",
  nen: "nên",
  sau: "sau",
  truoc: "trước",
  tai: "tại",
  o: "ở",
  cho: "cho",
  nam: "nam",
  nu: "nữ",
  gia: "giá",
  bao: "bao",
  nhieu: "nhiều",
  lau: "lâu",
  het: "hết",
  sung: "sưng",
  dau: "đau",
  an: "ăn",
  uong: "uống",
  tap: "tập",
  deo: "đeo",
  mua: "mùa",
  dong: "đông",
  tet: "tết",
  ngay: "ngày",
  thang: "tháng",
  nam: "năm",
  tuan: "tuần",
  thu: "thu",
  goi: "gọn",
  xoa: "xóa",
  nhan: "nhăn",
  ham: "hàm",
  mi: "mí",
  mat: "mắt",
  mui: "mũi",
  moi: "môi",
  may: "mày",
  cam: "cằm",
  da: "da",
  toc: "tóc",
  spa: "spa",
  botox: "botox",
  filler: "filler",
  laser: "laser",
  peel: "peel",
  massage: "massage",
  facial: "facial",
  body: "body",
  phun: "phun",
  xam: "xăm",
  cham: "chăm",
  soc: "sóc",
  toan: "toàn",
  dien: "diện",
  nang: "nâng",
  cat: "cắt",
  cay: "cấy",
  cang: "căng",
  chi: "chỉ",
  tre: "trẻ",
  hoa: "hóa",
  noi: "nội",
  soi: "soi",
  tu: "tự",
  than: "thân",
  hoang: "hoàng",
  kim: "kim",
  phuong: "phượng",
  himalaya: "Himalaya",
  muoi: "muối",
  u: "ủ",
  tham: "thẩm",
  my: "mỹ",
  y: "y",
  khoa: "khoa",
  dich: "dịch",
  vu: "vụ",
  an: "an",
  dong: "Đông",
  quan: "quận",
  phong: "phòng",
  kham: "khám",
  chon: "chọn",
  uy: "uy",
  tin: "tín",
  xu: "xu",
  huong: "hướng",
  2026: "2026",
  retinol: "retinol",
  melasma: "melasma",
  glass: "glass",
  skin: "skin",
  viet: "Việt",
  filler: "filler",
  botox: "botox",
  ranh: "rãnh",
  cuoi: "cười",
  tay: "tẩy",
  trang: "trang",
  tri: "trị",
  nam: "nám",
  mun: "mụn",
  rung: "rụng",
  sua: "sửa",
  hong: "hỏng",
  thon: "thon",
  tham: "thăm",
  lieu: "liễu",
  nha: "nhà",
  quan: "quần",
  dau: "dấu",
  hieu: "hiệu",
  lieu: "liễu",
  phau: "phẫu",
  thuat: "thuật",
  revision: "revision",
  fue: "FUE",
  fut: "FUT",
  pdo: "PDO",
  s: "S",
  line: "line",
  han: "hàn",
  quoc: "quốc",
  cau: "cấu",
  truc: "trúc",
  sun: "sụn",
  boc: "bọc",
  canh: "cánh",
  goc: "góc",
  mo: "mở",
  lay: "lấy",
  bam: "bấm",
  an: "ẩn",
  mot: "một",
  ptosis: "ptosis",
  lom: "lõm",
  tron: "tròn",
  seo: "sẹo",
  loi: "lỗi",
  tro: "trở",
  lai: "lại",
  sup: "sụp",
  duoi: "dưới",
  tren: "trên",
  khong: "không",
  deu: "đều",
  hai: "hai",
  ben: "bên",
  tuoi: "tuổi",
  vung: "vùng",
  trang: "trắng",
  dieu: "điều",
  bong: "bọng",
  kieng: "kiêng",
  ruou: "rượu",
  the: "thể",
  duc: "dục",
  kinh: "kính",
  nhiem: "nhiễm",
  trung: "trùng",
  lech: "lệch",
  song: "sống",
  cung: "cứng",
  ket: "kết",
  hop: "hợp",
  chin: "chỉnh",
  bang: "bằng",
  chi: "chỉ",
  duoc: "được",
  mini: "mini",
  sline: "S-line",
  aquapeel: "aquapeel",
  aromatherapy: "aromatherapy",
  aesthetic: "aesthetic",
  clinic: "clinic",
};

function segmentsToTitle(slug) {
  return slug
    .split("-")
    .map((part) => {
      if (/^\d+$/.test(part)) return part;
      if (SEGMENT_VI[part]) return SEGMENT_VI[part];
      return part;
    })
    .join(" ")
    .replace(/\bTP HCM\b/g, "TP.HCM")
    .replace(/\bTPHCM\b/g, "TP.HCM")
    .replace(/\s+/g, " ")
    .trim();
}

function titleFromSlug(slug) {
  return capitalizeVi(segmentsToTitle(slug));
}

/** Ưu tiên nhãn dịch vụ — khớp slug chính xác */
const SERVICE_TITLES = {
  "nang-mui-hoang-kim": "Nâng mũi hoàng kim",
  "cat-mi-phuong-hoang": "Cắt mí phượng hoàng",
  "cay-toc-tu-than": "Cấy tóc tự thân",
  "cang-noi-soi": "Căng nội soi",
  "cang-chi-tre-hoa": "Căng chỉ trẻ hóa",
  "filler-tao-hinh": "Filler tạo hình",
  "botox-xoa-nhan-gon-ham": "Botox xóa nhăn gọn hàm",
  "u-da-muoi-himalaya": "Ủ đá muối Himalaya",
  "phun-xam-tham-my": "Phun xăm thẩm mỹ",
  "massage-body-thu-gian": "Massage body thư giãn",
  "massage-facial": "Massage facial",
  "cham-soc-da-toan-dien": "Chăm sóc da toàn diện",
  "dich-vu-tham-my-y-khoa": "Dịch vụ thẩm mỹ y khoa",
  "dich-vu-spa-cham-soc": "Dịch vụ spa chăm sóc",
};

/** Trang tĩnh — slug từ path */
const ROUTE_TITLES = {
  "": "Thiên Hoàng Kim Aesthetic Clinic | Nâng Tầm Nhan Sắc",
  "gioi-thieu": "Giới thiệu",
  "dich-vu": "Dịch vụ thẩm mỹ",
  "tham-my": "Dịch vụ thẩm mỹ y khoa",
  spa: "Dịch vụ spa",
  "khach-hang": "Khách hàng thực tế",
  "bang-gia": "Bảng giá tham khảo",
  "tin-tuc": "Tin tức & kiến thức làm đẹp",
  "lien-he": "Liên hệ & đặt lịch",
  "doi-ngu-bac-si": "Đội ngũ bác sĩ",
  "cau-chuyen-thuong-hieu": "Câu chuyện thương hiệu",
  "cong-nghe-tham-my": "Công nghệ thẩm mỹ",
  "co-so-vat-chat": "Cơ sở vật chất",
  "kien-thuc": "Kiến thức làm đẹp",
  "tin-tuc-tin-tuc": "Tin tức thẩm mỹ",
};

function collectFromArticlesDefaults() {
  const titles = {};
  const text = fs.readFileSync(path.join(dataDir, "articles.defaults.ts"), "utf8");
  for (const m of text.matchAll(/newsSeo\("([^"]+)",\s*"[^"]*?",\s*"([^"]+)"/g)) {
    titles[m[1]] = m[2];
  }
  return titles;
}

function collectFromBatchFilesEntries() {
  const entries = [];
  for (const name of fs.readdirSync(dataDir)) {
    if (!/^news-batch-.*\.entries\.ts$/.test(name)) continue;
    const text = fs.readFileSync(path.join(dataDir, name), "utf8");
    for (const m of text.matchAll(/slug:\s*"([^"]+)"[\s\S]*?focus:\s*"([^"]+)"/g)) {
      entries.push({ slug: m[1], focus: m[2] });
    }
  }
  return entries;
}

const titles = { ...SERVICE_TITLES };

const allSlugs = new Set(Object.keys(SERVICE_TITLES));
const planPath = path.join(dataDir, "keyword-plan.merged.json");
const plan = fs.existsSync(planPath) ? JSON.parse(fs.readFileSync(planPath, "utf8")) : [];
for (const e of plan) {
  if (e.slug) allSlugs.add(e.slug);
}
for (const { slug } of collectFromBatchFilesEntries()) allSlugs.add(slug);
for (const slug of Object.keys(collectFromArticlesDefaults())) allSlugs.add(slug);

for (const slug of allSlugs) {
  titles[slug] = titleFromSlug(slug);
}

for (const entry of plan) {
  if (!entry.slug || !entry.focus) continue;
  if (slugify(entry.focus) === entry.slug) {
    titles[entry.slug] = capitalizeVi(entry.focus);
  }
}

for (const { slug, focus } of collectFromBatchFilesEntries()) {
  if (slugify(focus) === slug) titles[slug] = capitalizeVi(focus);
}

for (const [slug, focus] of Object.entries(collectFromArticlesDefaults())) {
  if (slugify(focus) === slug) titles[slug] = capitalizeVi(focus);
}

// Phân biệt slug trùng title
const byTitle = new Map();
for (const [slug, title] of Object.entries(titles)) {
  const key = title.toLowerCase();
  const list = byTitle.get(key) ?? [];
  list.push(slug);
  byTitle.set(key, list);
}
for (const [, slugs] of byTitle) {
  if (slugs.length <= 1) continue;
  for (const slug of slugs) {
    titles[slug] = titleFromSlug(slug);
  }
}

const output = { articles: titles, routes: ROUTE_TITLES };
fs.writeFileSync(outPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`[slug-titles] Wrote ${Object.keys(titles).length} article titles → slug-titles.generated.json`);
