/**
 * Kế hoạch 500 từ khóa NGẮN (1–4 từ) — Batch Short-KW.
 * Chạy: node scripts/build-keyword-plan-short-500.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "../src/data");

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

function loadReservedSlugs() {
  const reserved = new Set();
  const txt = path.join(dataDir, "existing-slugs.txt");
  if (fs.existsSync(txt)) {
    for (const line of fs.readFileSync(txt, "utf8").trim().split("\n")) {
      if (line.trim()) reserved.add(line.trim());
    }
  }
  for (const name of ["keyword-plan.merged.json", "keyword-plan-proposed-500.json", "keyword-plan-plan1.json", "keyword-plan-plan2.json"]) {
    const p = path.join(dataDir, name);
    if (!fs.existsSync(p)) continue;
    for (const e of JSON.parse(fs.readFileSync(p, "utf8"))) {
      if (e.slug) reserved.add(e.slug);
    }
  }
  return reserved;
}

const PILLAR_BY_PREFIX = [
  [/^(nang-mui|mui-|song-mui|kieu-mui)/, "/tham-my/nang-mui-hoang-kim"],
  [/^(cat-mi|nhan-mi|bam-mi|mi-|mat-|mo-goc)/, "/tham-my/cat-mi-phuong-hoang"],
  [/^(cay-toc|hoi-dau|rung-toc|toc-)/, "/tham-my/cay-toc-tu-than"],
  [/^(cang-chi|cang-noi|tre-hoa|hifu|nang-co)/, "/tham-my/cang-chi-tre-hoa"],
  [/^(filler|tiem-filler|tiem-moi|moi-|cam-|song-mui-filler)/, "/tham-my/filler-tao-hinh"],
  [/^(botox|tiem-botox|xoa-nhan|thon-ham|gon-ham)/, "/tham-my/botox-xoa-nhan-gon-ham"],
  [/^(tri-mun|tri-nam|tri-tan|mun-|nam-|tan-nhang|melasma|da-|peel|laser|skincare|retinol)/, "/spa/cham-soc-da-toan-dien"],
  [/^(phun-|xam-|xoa-xam|eyeliner)/, "/spa/phun-xam-tham-my"],
  [/^(massage|spa-|goi-|tam-|u-da|himalaya)/, "/spa/massage-body-thu-gian"],
  [/^(gia-|chi-phi|bang-gia|bao-gia|combo-|goi-)/, "/bang-gia"],
  [/^(tham-my|phong-kham|clinic|spa-|lam-dep|an-dong|quan-|tphcm|cho-lon|thien-hoang)/, "/lien-he"],
];

function inferPillar(slug, fallback = "/tin-tuc") {
  for (const [re, pillar] of PILLAR_BY_PREFIX) {
    if (re.test(slug)) return pillar;
  }
  return fallback;
}

/** 20 nhóm chính × 25 + 8 nhóm dự phòng — ưu tiên theo thứ tự, dừng ở 500 */
const TARGET = 500;
const GROUPS = [
  {
    id: "SK1",
    name: "Head term — Nâng mũi (25)",
    pillar: "/tham-my/nang-mui-hoang-kim",
    items: [
      "nâng mũi", "nâng mũi tphcm", "nâng mũi giá", "nâng mũi uy tín", "nâng mũi đẹp",
      "nâng mũi tự nhiên", "nâng mũi cấu trúc", "nâng mũi sụn", "nâng mũi hàn", "nâng mũi s line",
      "phẫu thuật mũi", "mũi đẹp", "sửa mũi", "mũi hỏng", "thu gọn cánh mũi",
      "nâng sống mũi", "đầu mũi", "nâng mũi nam", "nâng mũi nữ", "nâng mũi an đông",
      "nâng mũi q5", "nâng mũi q6", "nâng mũi chợ lớn", "clinic nâng mũi", "bác sĩ nâng mũi",
    ],
  },
  {
    id: "SK2",
    name: "Head term — Mắt & mí (25)",
    pillar: "/tham-my/cat-mi-phuong-hoang",
    items: [
      "cắt mí", "cắt mí tphcm", "cắt mí giá", "cắt mí đẹp", "cắt mí tự nhiên",
      "nhấn mí", "bấm mí", "mí mắt", "mắt to", "mở góc mắt",
      "lấy mỡ mí", "cắt mí nam", "cắt mí nữ", "cắt mí an đông", "cắt mí q5",
      "phẫu thuật mí", "sửa mí", "mí lót", "mí một bầu", "mắt sụp",
      "thâm mắt", "bọng mắt", "cắt mí laser", "cắt mí hàn", "cắt mí uy tín",
    ],
  },
  {
    id: "SK3",
    name: "Head term — Filler (25)",
    pillar: "/tham-my/filler-tao-hinh",
    items: [
      "filler", "filler tphcm", "filler giá", "tiêm filler", "filler môi",
      "filler mũi", "filler cằm", "filler má", "filler trán", "filler mắt",
      "filler nam", "filler nữ", "filler uy tín", "filler đẹp", "filler tự nhiên",
      "filler an đông", "filler q5", "juvederm", "restylane", "filler hàn",
      "tiêm môi", "tiêm cằm", "môi đẹp", "vline filler", "full face filler",
    ],
  },
  {
    id: "SK4",
    name: "Head term — Botox (25)",
    pillar: "/tham-my/botox-xoa-nhan-gon-ham",
    items: [
      "botox", "botox tphcm", "botox giá", "tiêm botox", "botox trán",
      "botox mắt", "botox hàm", "botox cằm", "botox môi", "botox cổ",
      "botox nam", "botox nữ", "botox uy tín", "botox đẹp", "botox an đông",
      "botox q5", "botox allergan", "botox dysport", "xóa nhăn", "gọn hàm",
      "thon hàm", "vline botox", "botox masseter", "tiêm hàm", "nếp nhăn",
    ],
  },
  {
    id: "SK5",
    name: "Head term — Cấy tóc (25)",
    pillar: "/tham-my/cay-toc-tu-than",
    items: [
      "cấy tóc", "cấy tóc tphcm", "cấy tóc giá", "cấy tóc fue", "cấy tóc fut",
      "hói đầu", "rụng tóc", "trị hói", "cấy tóc nam", "cấy tóc nữ",
      "cấy tóc uy tín", "cấy tóc an đông", "cấy tóc q5", "ghép tóc", "mọc tóc",
      "đường chữ m", "hói đỉnh", "hói trán", "prp tóc", "meso tóc",
      "cấy tóc đẹp", "bác sĩ cấy tóc", "clinic cấy tóc", "cấy tóc hàn", "cấy tóc tự thân",
    ],
  },
  {
    id: "SK6",
    name: "Head term — Trẻ hóa & căng (25)",
    pillar: "/tham-my/cang-chi-tre-hoa",
    items: [
      "căng chỉ", "căng chỉ tphcm", "căng chỉ giá", "căng da", "trẻ hóa da",
      "căng nội soi", "hifu", "thermage", "ultherapy", "nâng cơ mặt",
      "pdo thread", "căng mặt", "trẻ hóa mặt", "xóa nhăn mặt", "săn chắc da",
      "căng chỉ pdo", "căng chỉ uy tín", "căng chỉ an đông", "căng chỉ q5", "facelift",
      "mini facelift", "tre hóa tphcm", "chống lão hóa", "nếp nhăn mặt", "da chảy xệ",
    ],
  },
  {
    id: "SK7",
    name: "Head term — Da & spa (25)",
    pillar: "/spa/cham-soc-da-toan-dien",
    items: [
      "trị mụn", "trị nám", "trị tàn nhang", "trị thâm", "trị sẹo",
      "chăm sóc da", "peel da", "laser da", "facial", "hydrafacial",
      "soi da", "da đẹp", "trắng da", "sáng da", "mụn ẩn",
      "nám da", "melasma", "tàn nhang", "lỗ chân lông", "da dầu",
      "da khô", "da nhạy cảm", "spa da", "điều trị da", "skincare tphcm",
    ],
  },
  {
    id: "SK8",
    name: "Head term — Phun xăm & spa body (25)",
    pillar: "/spa/phun-xam-tham-my",
    items: [
      "phun mày", "phun môi", "phun mí", "xăm mày", "xăm môi",
      "phun xăm", "phun xăm tphcm", "phun xăm giá", "điêu khắc mày", "điêu khắc môi",
      "xóa xăm", "xóa phun", "eyeliner phun", "phun mày nam", "phun môi nam",
      "massage body", "massage mặt", "spa tphcm", "spa q5", "spa an đông",
      "ủ đá muối", "himalaya spa", "gội đầu dưỡng", "body spa", "thư giãn spa",
    ],
  },
  {
    id: "SK9",
    name: "Giá ngắn — Thẩm mỹ (25)",
    pillar: "/bang-gia",
    items: [
      "giá nâng mũi", "giá cắt mí", "giá filler", "giá botox", "giá cấy tóc",
      "giá căng chỉ", "giá hifu", "giá phun mày", "giá phun môi", "giá trị mụn",
      "giá trị nám", "giá peel", "giá laser", "giá massage", "giá spa",
      "bảng giá thẩm mỹ", "báo giá nâng mũi", "báo giá filler", "báo giá botox", "chi phí nâng mũi",
      "chi phí cắt mí", "chi phí filler", "chi phí botox", "giá thẩm mỹ", "giá làm đẹp",
    ],
  },
  {
    id: "SK10",
    name: "Local ngắn — Quận TP.HCM (25)",
    pillar: "/lien-he",
    items: [
      "thẩm mỹ q1", "thẩm mỹ q3", "thẩm mỹ q5", "thẩm mỹ q6", "thẩm mỹ q7",
      "thẩm mỹ q8", "thẩm mỹ q10", "thẩm mỹ q11", "thẩm mỹ tân bình", "thẩm mỹ tân phú",
      "thẩm mỹ bình tân", "thẩm mỹ phú nhuận", "thẩm mỹ gò vấp", "spa q5", "spa q6",
      "spa q10", "spa an đông", "spa chợ lớn", "nâng mũi q5", "cắt mí q5",
      "filler q5", "botox q5", "clinic q5", "clinic q6", "phòng khám q5",
    ],
  },
  {
    id: "SK11",
    name: "Local ngắn — An Đông & lân cận (25)",
    pillar: "/lien-he",
    items: [
      "thẩm mỹ an đông", "spa an đông", "nâng mũi an đông", "cắt mí an đông", "filler an đông",
      "botox an đông", "cấy tóc an đông", "phun xăm an đông", "clinic an đông", "làm đẹp an đông",
      "phòng khám an đông", "thẩm mỹ chợ lớn", "spa chợ lớn", "nâng mũi chợ lớn", "cắt mí chợ lớn",
      "thẩm mỹ hùng vương", "spa hùng vương", "clinic hùng vương", "thẩm mỹ q4", "spa q4",
      "làm đẹp q5", "làm đẹp q6", "thẩm mỹ gần đây", "spa gần đây", "clinic tphcm",
    ],
  },
  {
    id: "SK12",
    name: "Thẩm mỹ nam ngắn (25)",
    pillar: "/tham-my/nang-mui-hoang-kim",
    items: [
      "thẩm mỹ nam", "làm đẹp nam", "nâng mũi nam", "cắt mí nam", "botox nam",
      "filler nam", "cấy tóc nam", "hói đầu nam", "trị mụn nam", "spa nam",
      "gọn hàm nam", "vline nam", "skincare nam", "phun mày nam", "grooming nam",
      "chú rể đẹp", "nam tphcm", "thẩm mỹ nam tphcm", "làm đẹp nam tphcm", "botox hàm nam",
      "filler hàm nam", "trị sẹo nam", "laser nam", "massage nam", "thẩm mỹ nam q5",
    ],
  },
  {
    id: "SK13",
    name: "Thương hiệu & uy tín ngắn (25)",
    pillar: "/lien-he",
    items: [
      "thiên hoàng kim", "thk clinic", "thk spa", "thk thẩm mỹ", "phòng khám thiên hoàng kim",
      "clinic thiên hoàng kim", "spa thiên hoàng kim", "thẩm mỹ uy tín", "spa uy tín", "clinic uy tín",
      "phòng khám uy tín", "bác sĩ thẩm mỹ", "bác sĩ thiên hoàng kim", "thẩm mỹ tphcm", "spa tphcm",
      "clinic tphcm", "phòng khám tphcm", "làm đẹp tphcm", "thẩm mỹ việt nam", "aesthetic clinic",
      "medical spa", "beauty clinic", "phòng khám đẹp", "spa đẹp", "đặt lịch thẩm mỹ",
    ],
  },
  {
    id: "SK14",
    name: "Intent mua — ngắn (25)",
    pillar: "/lien-he",
    items: [
      "tư vấn miễn phí", "đặt lịch spa", "đặt lịch thẩm mỹ", "hotline spa", "liên hệ spa",
      "báo giá nhanh", "khuyến mãi spa", "ưu đãi thẩm mỹ", "combo spa", "combo thẩm mỹ",
      "voucher spa", "trả góp thẩm mỹ", "thanh toán spa", "zalo spa", "inbox spa",
      "đặt lịch hôm nay", "tư vấn nâng mũi", "tư vấn filler", "tư vấn botox", "tư vấn cắt mí",
      "khám miễn phí", "soi da miễn phí", "báo giá filler", "báo giá botox", "đặt lịch tphcm",
    ],
  },
  {
    id: "SK15",
    name: "So sánh ngắn (25)",
    pillar: "/tin-tuc",
    items: [
      "filler botox", "nâng mũi filler", "cắt mí nhấn", "hifu căng chỉ", "peel laser",
      "filler môi", "botox filler", "nâng mũi cắt", "spa clinic", "bác sĩ spa",
      "giá rẻ uy", "nước ngoài việt", "tiêm phẫu", "một lần nhiều", "online trực",
      "nâng mũi hàn", "cắt mí hàn", "filler hàn", "botox mỹ", "spa thẩm",
      "trị nám laser", "mụn peel", "cấy prp", "massage facial", "phun tiêm",
    ],
  },
  {
    id: "SK16",
    name: "Mụn & da trẻ ngắn (25)",
    pillar: "/spa/cham-soc-da-toan-dien",
    items: [
      "mụn viêm", "mụn mủ", "mụn đầu", "mụn ẩn", "mụn nội",
      "mụn hormonal", "mụn nam", "mụn nữ", "trị mụn tphcm", "spa trị mụn",
      "mụn q5", "mụn an đông", "điều trị mụn", "xử lý mụn", "lấy mụn",
      "mụn lưng", "mụn cằm", "mụn trán", "mụn miệng", "sẹo mụn",
      "thâm mụn", "mụn tái", "accutane", "tretinoin", "niacinamide",
    ],
  },
  {
    id: "SK17",
    name: "Nám & sắc tố ngắn (25)",
    pillar: "/spa/cham-soc-da-toan-dien",
    items: [
      "trị nám", "nám da", "nám mảng", "nám đốm", "nám sâu",
      "nám tphcm", "nám q5", "nám an đông", "tàn nhang", "đồi mồi",
      "thâm nám", "melasma", "sạm da", "vết thâm", "tăng sắc",
      "laser nám", "peel nám", "trị nám laser", "trị tàn", "trị đồi",
      "nám nam", "nám nữ", "nám mặt", "nám tay", "nám nách",
    ],
  },
  {
    id: "SK18",
    name: "Xu hướng & công nghệ ngắn (25)",
    pillar: "/tin-tuc",
    items: [
      "glass skin", "dolphin skin", "skin booster", "rejuran", "profhilo",
      "exosome", "pdrn", "stem cell", "picosure", "pico laser",
      "morpheus8", "potenza", "bbl laser", "rf microneedling", "aquapeel",
      "dermapen", "oxygen facial", "led therapy", "3d scan", "ai da",
      "xu hướng 2026", "làm đẹp 2026", "thẩm mỹ 2026", "spa 2026", "công nghệ mới",
    ],
  },
  {
    id: "SK19",
    name: "Thời điểm & đối tượng ngắn (25)",
    pillar: "/tin-tuc",
    items: [
      "làm đẹp tết", "thẩm mỹ tết", "spa tết", "cưới đẹp", "cô dâu",
      "chú rể", "kỳ yếu", "dự tiệc", "phỏng vấn", "đi làm",
      "tuổi 20", "tuổi 30", "tuổi 40", "tuổi 50", "sau sinh",
      "cho con bú", "mang thai", "mùa hè", "mùa đông", "mùa mưa",
      "trước tết", "sau tết", "cuối tuần", "nghỉ lễ", "nghỉ phép",
    ],
  },
  {
    id: "SK20",
    name: "Câu hỏi ngắn — high intent (25)",
    pillar: "/tin-tuc",
    items: [
      "có đau không", "bao lâu đẹp", "bao nhiêu tiền", "có an toàn", "có nên không",
      "bao lâu hồi", "mất bao lâu", "có sưng không", "có để sẹo", "có uy tín",
      "ở đâu đẹp", "ở đâu tốt", "chỗ nào uy", "nên làm gì", "làm gì đầu",
      "có tốt không", "có hiệu quả", "có phụ phí", "giá bao nhiêu", "đau không",
      "sưng bao lâu", "ăn gì được", "kiêng gì", "tái khám khi", "bảo hành không",
    ],
  },
  {
    id: "SK21",
    name: "Bổ sung head — dịch vụ mở rộng (25)",
    pillar: "/tham-my",
    items: [
      "hút mỡ", "hút mỡ bụng", "hút mỡ mặt", "hút mỡ tay", "hút mỡ đùi",
      "cấy mỡ", "cấy mỡ mông", "cấy mỡ má", "tiêm meso", "tiêm vitamin",
      "tiêm trắng", "mesotherapy", "prp da", "prp mặt", "laser co2",
      "laser fractional", "ipl trị", "rf trị", "microblading", "ombre brows",
      "lip blush", "lip tint", "scalp spa", "gội cỏ", "detox body",
    ],
  },
  {
    id: "SK22",
    name: "Bổ sung local — đường & landmark (25)",
    pillar: "/lien-he",
    items: [
      "thẩm mỹ bình phú", "spa bình phú", "thẩm mỹ hưng vương", "spa hưng vương", "clinic hưng vương",
      "thẩm mỹ châu văn", "spa châu văn", "thẩm mỹ nguyễn", "spa nguyễn trãi", "clinic nguyễn trãi",
      "thẩm mỹ lê văn", "spa lê văn", "thẩm mỹ võ văn", "spa võ văn", "clinic võ văn",
      "thẩm mỹ miền tây", "spa miền tây", "thẩm mỹ sài gòn", "spa sài gòn", "clinic sài gòn",
      "thẩm mỹ hcm", "spa hcm", "clinic hcm", "làm đẹp hcm", "beauty hcm",
    ],
  },
  {
    id: "SK23",
    name: "Bổ sung giá & combo (25)",
    pillar: "/bang-gia",
    items: [
      "giá hút mỡ", "giá meso", "giá prp", "giá hifu", "giá thermage",
      "giá ultherapy", "giá picosure", "giá morpheus", "giá hydrafacial", "giá facial",
      "giá gội đầu", "giá ủ đá", "giá massage", "giá combo", "giá gói",
      "combo nâng mũi", "combo filler", "combo trị mụn", "combo trị nám", "combo trẻ hóa",
      "giá rẻ tphcm", "giá tốt tphcm", "giá sinh viên", "giá học sinh", "giá khuyến mãi",
    ],
  },
  {
    id: "SK24",
    name: "Bổ sung da — ingredient (25)",
    pillar: "/spa/cham-soc-da-toan-dien",
    items: [
      "aha bha", "pha peel", "vitamin c", "hyaluronic acid", "ceramide",
      "centella", "snail mucin", "azelaic acid", "salicylic acid", "glycolic acid",
      "kojic acid", "arbutin", "tranexamic", "sunscreen spf", "kem chống",
      "toner da", "serum da", "kem dưỡng", "sữa rửa", "tẩy trang",
      "mặt nạ", "đắp mask", "đắp nạ", "xịt khoáng", "essence da",
    ],
  },
  {
    id: "SK25",
    name: "Bổ sung câu hỏi 2 từ (25)",
    pillar: "/tin-tuc",
    items: [
      "nâng mũi đau", "cắt mí sưng", "filler sưng", "botox cứng", "cấy tóc đau",
      "hifu đau", "peel bong", "laser đau", "phun đau", "massage đau",
      "nâng mũi giá", "cắt mí giá", "filler giá", "botox giá", "spa giá",
      "nâng mũi tphcm", "cắt mí tphcm", "filler tphcm", "botox tphcm", "spa tphcm",
      "trị mụn tphcm", "trị nám tphcm", "hói đầu tphcm", "phun mày tphcm", "phun môi tphcm",
    ],
  },
  {
    id: "SK26",
    name: "Bổ sung brand & review (25)",
    pillar: "/lien-he",
    items: [
      "review nâng mũi", "review cắt mí", "review filler", "review botox", "review spa",
      "đánh giá clinic", "đánh giá spa", "uy tín tphcm", "tốt nhất tphcm", "rẻ tphcm",
      "nổi tiếng tphcm", "nhiều người", "bạn bè", "người quen", "tiktok spa",
      "facebook spa", "zalo clinic", "map clinic", "google review", "before after",
      "hình thật", "feedback khách", "kinh nghiệm thật", "cảm nhận khách", "video review",
    ],
  },
  {
    id: "SK27",
    name: "Bổ sung thẩm mỹ nữ (25)",
    pillar: "/tham-my/filler-tao-hinh",
    items: [
      "làm đẹp nữ", "thẩm mỹ nữ", "filler nữ", "botox nữ", "nâng mũi nữ",
      "cắt mí nữ", "spa nữ", "trị mụn nữ", "trị nám nữ", "trẻ hóa nữ",
      "vline nữ", "môi đẹp nữ", "da đẹp nữ", "mặt vline", "mặt thon",
      "cằm nhọn", "mũi cao", "mắt to nữ", "mi cong", "tóc đẹp",
      "body đẹp", "eo thon", "vai thon", "cổ đẹp", "tay đẹp",
    ],
  },
  {
    id: "SK28",
    name: "Bổ sung spa wellness (25)",
    pillar: "/spa/massage-body-thu-gian",
    items: [
      "xông hơi", "xông ướt", "xông khô", "tắm thảo", "tắm trắng",
      "tắm bùn", "tắm khoáng", "ngâm chân", "ấn huyệt", "bấm huyệt",
      "giác hơi", "cứu ngải", "chườm ấm", "chườm lạnh", "đá nóng",
      "đá lạnh", "muối biển", "tinh dầu", "aromatherapy", "sound bath",
      "yoga spa", "pilates spa", "stretching", "thư giãn", "giảm stress",
    ],
  },
];

const reserved = loadReservedSlugs();
const usedSlugs = new Set();
const usedFocus = new Set();
const plan = [];
let skipped = 0;

for (const group of GROUPS) {
  if (plan.length >= TARGET) break;
  for (const focus of group.items) {
    if (plan.length >= TARGET) break;
    const words = focus.trim().split(/\s+/).length;
    if (words > 4) {
      console.warn(`[skip] >4 words: ${focus}`);
      skipped++;
      continue;
    }
    let slug = slugify(focus);
    const focusKey = focus.trim().toLowerCase();
    if (usedFocus.has(focusKey)) {
      skipped++;
      continue;
    }
    if (reserved.has(slug) || usedSlugs.has(slug)) {
      const suffixes = ["-sk", "-kw", "-2", "-tp-hcm", "-q5", "-ad"];
      let resolved = false;
      for (const suf of suffixes) {
        const alt = `${slug}${suf}`.slice(0, 80);
        if (!reserved.has(alt) && !usedSlugs.has(alt)) {
          slug = alt;
          resolved = true;
          break;
        }
      }
      if (!resolved) {
        skipped++;
        continue;
      }
    }
    usedSlugs.add(slug);
    usedFocus.add(focusKey);
    plan.push({
      id: plan.length + 1,
      group: group.id,
      groupName: group.name,
      focus,
      slug,
      pillar: inferPillar(slug, group.pillar),
      priority: "cao",
      wordCount: words,
      intent: words === 1 ? "head" : focus.includes("giá") || focus.includes("báo") ? "price" : focus.includes("q") || focus.includes("an đông") || focus.includes("tphcm") ? "local" : "short",
    });
  }
}

// Bổ sung nếu thiếu do trùng slug
const FILLERS = [
  { focus: "nâng mũi mini", pillar: "/tham-my/nang-mui-hoang-kim" },
  { focus: "cắt mí mini", pillar: "/tham-my/cat-mi-phuong-hoang" },
  { focus: "filler mini", pillar: "/tham-my/filler-tao-hinh" },
  { focus: "botox mini", pillar: "/tham-my/botox-xoa-nhan-gon-ham" },
  { focus: "spa mini", pillar: "/spa/massage-body-thu-gian" },
  { focus: "trị mụn mini", pillar: "/spa/cham-soc-da-toan-dien" },
  { focus: "nâng mũi plus", pillar: "/tham-my/nang-mui-hoang-kim" },
  { focus: "filler plus", pillar: "/tham-my/filler-tao-hinh" },
  { focus: "botox plus", pillar: "/tham-my/botox-xoa-nhan-gon-ham" },
  { focus: "spa plus", pillar: "/spa/massage-body-thu-gian" },
  { focus: "thẩm mỹ plus", pillar: "/lien-he" },
  { focus: "clinic plus", pillar: "/lien-he" },
  { focus: "làm đẹp plus", pillar: "/lien-he" },
  { focus: "nâng mũi pro", pillar: "/tham-my/nang-mui-hoang-kim" },
  { focus: "spa pro", pillar: "/spa/massage-body-thu-gian" },
  { focus: "thẩm mỹ pro", pillar: "/lien-he" },
  { focus: "nâng mũi vip", pillar: "/tham-my/nang-mui-hoang-kim" },
  { focus: "spa vip", pillar: "/spa/massage-body-thu-gian" },
  { focus: "filler vip", pillar: "/tham-my/filler-tao-hinh" },
  { focus: "botox vip", pillar: "/tham-my/botox-xoa-nhan-gon-ham" },
];

let fi = 0;
while (plan.length < TARGET && fi < FILLERS.length) {
  const { focus, pillar } = FILLERS[fi++];
  const slug = slugify(focus);
  if (!slug || usedSlugs.has(slug) || reserved.has(slug)) continue;
  usedSlugs.add(slug);
  plan.push({
    id: plan.length + 1,
    group: "SK+",
    groupName: "Bổ sung head term",
    focus,
    slug,
    pillar,
    priority: "trung bình",
    wordCount: focus.split(/\s+/).length,
    intent: "head",
  });
}

const finalPlan = plan.slice(0, TARGET).map((e, i) => ({ ...e, id: i + 1 }));

const jsonPath = path.join(dataDir, "keyword-plan-short-500.json");
fs.writeFileSync(jsonPath, `${JSON.stringify(finalPlan, null, 2)}\n`, "utf8");

const md = buildMarkdown(finalPlan, skipped, reserved.size);
const mdPath = path.join(dataDir, "keyword-plan-short-500.md");
fs.writeFileSync(mdPath, md, "utf8");

console.log(`[short-500] Generated ${finalPlan.length} keywords → ${jsonPath}`);
console.log(`[short-500] Skipped duplicates/reserved: ${skipped}`);
console.log(`[short-500] Reserved slugs on site: ${reserved.size}`);
if (finalPlan.length < TARGET) console.warn(`[short-500] WARNING: only ${finalPlan.length}/${TARGET} — cần bổ sung thêm nhóm`);

function buildMarkdown(plan, skipped, reservedCount) {
  const byIntent = {};
  for (const e of plan) byIntent[e.intent] = (byIntent[e.intent] || 0) + 1;
  const byWords = {};
  for (const e of plan) byWords[e.wordCount] = (byWords[e.wordCount] || 0) + 1;

  let out = `# Kế hoạch 500 từ khóa NGẮN — Thiên Hoàng Kim

**Ngày lập:** 13/07/2026 · **Batch:** Short-KW (Plan D)

## 1. Mục tiêu

| Chỉ số | Giá trị |
|--------|---------|
| Số từ khóa | **${plan.length}** |
| Độ dài | **1–4 từ** (head + short-tail) |
| Slug đã có trên site | ${reservedCount} |
| File JSON | \`keyword-plan-short-500.json\` |

**Khác batch 3 (long-tail 4–8 từ):** Tập trung **volume cao**, **brand discovery**, **local pack**, chuyển đổi nhanh (giá, đặt lịch).

## 2. Phân bổ intent

| Intent | Số KW | Mô tả |
|--------|-------|-------|
${Object.entries(byIntent).map(([k, v]) => `| ${k} | ${v} | |`).join("\n")}

## 3. Phân bổ độ dài

| Số từ | Số KW |
|-------|-------|
${Object.entries(byWords).sort((a, b) => a[0] - b[0]).map(([k, v]) => `| ${k} từ | ${v} |`).join("\n")}

## 4. Chiến lược trang đích

| Loại KW | Trang đích | Ví dụ |
|---------|------------|-------|
| Head 1 từ (nâng mũi, botox) | **Trang dịch vụ** + bài pillar | \`/tham-my/nang-mui-hoang-kim\` |
| Head + địa phương (nâng mũi q5) | **Bài tin** + CTA đặt lịch | \`/tin-tuc/nang-mui-q5\` |
| Giá ngắn (giá filler) | **Bảng giá** + bài giá | \`/bang-gia\` + \`/tin-tuc/gia-filler\` |
| Brand (thiên hoàng kim) | **Trang chủ / giới thiệu** | \`/\`, \`/gioi-thieu\` |
| So sánh ngắn | **Bài kiến thức** | \`/tin-tuc/filler-botox\` |

**Quy tắc chống cannibalization:**
- Slug trùng dịch vụ chính → **không** tạo \`/tin-tuc/\` (đã có SKIP_SLUGS)
- Head term → internal link về pillar trong 300 từ đầu
- Title: dùng \`buildAttractiveMetaTitle\` (intent price/local/head)

## 5. Lộ trình triển khai (10 tuần × 50 KW)

| Tuần | Nhóm | Số bài | Ưu tiên |
|------|------|--------|---------|
| 1 | SK1 + SK2 | 50 | Nâng mũi + Mí head |
| 2 | SK3 + SK4 | 50 | Filler + Botox head |
| 3 | SK5 + SK6 | 50 | Cấy tóc + Trẻ hóa |
| 4 | SK7 + SK8 | 50 | Da + Phun xăm/spa |
| 5 | SK9 + SK10 | 50 | Giá + Quận |
| 6 | SK11 + SK12 | 50 | An Đông + Nam |
| 7 | SK13 + SK14 | 50 | Brand + Mua |
| 8 | SK15 + SK16 | 50 | So sánh + Mụn |
| 9 | SK17 + SK18 | 50 | Nám + Xu hướng |
| 10 | SK19 + SK20 | 50 | Thời điểm + Câu hỏi |

## 6. KPI theo dõi (Search Console)

- Impression tăng trên head term (nâng mũi, filler, botox tphcm)
- CTR meta title ≥ 3% trên nhóm giá & local
- Top 10 trong 90 ngày: 30% nhóm local (q5, an đông)
- Top 20 trong 90 ngày: 50% nhóm giá ngắn

## 7. Cách triển khai kỹ thuật

\`\`\`bash
# 1. Validate plan
node scripts/build-keyword-plan-short-500.mjs

# 2. Merge vào site (sau khi review)
# Thêm plan-short vào merge-keyword-plans.mjs hoặc plan4

# 3. Build → sinh bài + prerender + IndexNow
npm run build
\`\`\`

## 8. Danh sách theo nhóm

`;

  let currentGroup = "";
  for (const e of plan) {
    if (e.group !== currentGroup) {
      currentGroup = e.group;
      out += `\n### ${e.group} — ${e.groupName}\n\n`;
      out += `| # | Từ khóa | Slug | Pillar |\n|---|---------|------|--------|\n`;
    }
    out += `| ${e.id} | ${e.focus} | \`${e.slug}\` | ${e.pillar} |\n`;
  }

  out += `\n---\n*Skipped ${skipped} entries (trùng slug/focus hoặc đã có trên site).*\n`;
  return out;
}
