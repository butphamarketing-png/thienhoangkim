/**
 * Kế hoạch +1000 từ khóa NGẮN (1–4 từ) — Short-KW-1000.
 * Chạy: node scripts/build-keyword-plan-short-1000.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "../src/data");
const TARGET = 1000;

function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

function loadReserved() {
  const slugs = new Set();
  const focuses = new Set();
  const files = [
    "keyword-plan.merged.json",
    "keyword-plan-short-500.json",
    "keyword-plan-short-100-batch12.json",
    "keyword-plan-proposed-500.json",
    "keyword-plan-plan1.json",
    "keyword-plan-plan2.json",
  ];
  for (const name of files) {
    const p = path.join(dataDir, name);
    if (!fs.existsSync(p)) continue;
    for (const e of JSON.parse(fs.readFileSync(p, "utf8"))) {
      if (e.slug) slugs.add(e.slug);
      if (e.focus) focuses.add(e.focus.toLowerCase().trim());
    }
  }
  return { slugs, focuses };
}

const PILLAR_BY_PREFIX = [
  [/^(nang-mui|mui-|song-mui|sua-mui|thu-gon|dau-mui|kieu-mui)/, "/tham-my/nang-mui-hoang-kim"],
  [/^(cat-mi|nhan-mi|bam-mi|mi-|mat-|mo-goc|lay-mo|sup-mi)/, "/tham-my/cat-mi-phuong-hoang"],
  [/^(cay-toc|hoi-|rung-toc|toc-|fue|fut|prp-toc)/, "/tham-my/cay-toc-tu-than"],
  [/^(cang-chi|cang-noi|cang-da|tre-hoa|hifu|thermage|ultherapy|nang-co|rf-|ignite|contoura|pdo)/, "/tham-my/cang-chi-tre-hoa"],
  [/^(filler|tiem-filler|tiem-moi|tiem-cam|moi-|cam-|baby-face|cay-mo|full-face)/, "/tham-my/filler-tao-hinh"],
  [/^(botox|tiem-botox|xoa-nhan|thon-ham|gon-ham|vline|masseter)/, "/tham-my/botox-xoa-nhan-gon-ham"],
  [/^(tri-mun|tri-nam|tri-tan|tri-tham|tri-seo|mun-|nam-|peel|laser|facial|skincare|retinol|meso|da-|lo-chan|detox)/, "/spa/cham-soc-da-toan-dien"],
  [/^(phun-|xam-|dieu-khac-may|eyeliner|xoa-xam)/, "/spa/phun-xam-tham-my"],
  [/^(massage|spa-|goi-|u-da|u-muoi|himalaya|body-|facial-massage)/, "/spa/massage-body-thu-gian"],
  [/^(gia-|chi-phi|bang-gia|bao-gia|uu-dai|combo|goi-)/, "/bang-gia"],
  [/^(tham-my|phong-kham|clinic|lam-dep|an-dong|quan-|tphcm|cho-lon|hung-vuong|thien-hoang|dat-lich|tu-van|hotline)/, "/lien-he"],
];

function inferPillar(slug, fallback = "/tin-tuc") {
  for (const [re, pillar] of PILLAR_BY_PREFIX) {
    if (re.test(slug)) return pillar;
  }
  return fallback;
}

const BASES = {
  nangMui: [
    "nâng mũi", "sửa mũi", "thu gọn cánh mũi", "nâng sống mũi", "chỉnh đầu mũi",
    "nâng mũi cấu trúc", "nâng mũi sụn", "nâng mũi s line", "nâng mũi plasma", "nâng mũi lần 2",
  ],
  mat: [
    "cắt mí", "nhấn mí", "bấm mí", "lấy mỡ mí", "mở góc mắt",
    "sụp mí", "sửa mí", "cắt mí phượng hoàng", "thẩm mỹ mắt", "treo chân mày",
  ],
  filler: [
    "filler", "tiêm filler", "filler môi", "filler cằm", "filler má",
    "filler thái dương", "filler mũi", "full face filler", "tiêm môi", "Baby Face",
  ],
  botox: [
    "botox", "tiêm botox", "botox hàm", "botox trán", "botox đuôi mắt",
    "gọn hàm", "thon hàm", "xóa nhăn", "botox cổ", "V-line",
  ],
  treHoa: [
    "căng chỉ", "căng da", "căng nội soi", "HIFU", "Thermage",
    "Ultherapy", "nâng cơ mặt", "trẻ hóa da", "RF trẻ hóa", "căng chỉ PDO",
  ],
  toc: [
    "cấy tóc", "cấy tóc FUE", "hói đầu", "rụng tóc", "cấy tóc tự thân",
    "PRP tóc", "meso tóc", "hói chữ M", "hói đỉnh", "ghép tóc",
  ],
  da: [
    "chăm sóc da", "trị mụn", "trị nám", "peel da", "laser da",
    "facial", "lỗ chân lông", "da dầu", "da khô", "meso da",
  ],
  phun: [
    "phun mày", "phun môi", "phun xăm", "điêu khắc mày", "xóa xăm",
    "phun mí", "xăm mày", "phun môi ombre", "phun mày hairstroke", "phun xăm thẩm mỹ",
  ],
  spa: [
    "spa", "massage body", "massage facial", "ủ đá muối", "detox body",
    "gội đầu dưỡng sinh", "body whitening", "spa thư giãn", "ủ muối Himalaya", "spa chăm sóc",
  ],
  brandLocal: [
    "thẩm mỹ", "phòng khám thẩm mỹ", "thẩm mỹ viện", "spa thẩm mỹ", "tư vấn thẩm mỹ",
    "đặt lịch thẩm mỹ", "bác sĩ thẩm mỹ", "clinic thẩm mỹ", "làm đẹp", "địa chỉ thẩm mỹ",
  ],
};

const MODS = [
  "giá", "chi phí", "uy tín", "an toàn", "đẹp", "tự nhiên", "nhanh", "tốt",
  "bao nhiêu", "ở đâu", "gần đây", "review", "trước sau", "cần biết",
  "nam", "nữ", "sau sinh", "tuổi 30", "tuổi 40", "lần đầu",
];

const LOCS = [
  "tphcm", "tp hcm", "sài gòn", "quận 5", "q5", "an đông", "hùng vương",
  "chợ lớn", "quận 6", "q6", "quận 10", "q10", "quận 1", "quận 3",
  "quận 8", "quận 11", "tân bình", "phú nhuận", "bình thạnh", "gò vấp",
  "tân phú", "thủ đức", "bình chánh", "nhà bè", "cần giờ",
  "gần sân bay", "gần chợ lớn", "gần quận 5", "miền tây", "đồng nai",
];

const PRICE_HEADS = [
  "giá", "bảng giá", "báo giá", "chi phí", "ưu đãi", "khuyến mãi", "combo", "trả góp",
];

const INTENT_SHORT = [
  "là gì", "như thế nào", "ra sao", "có đau không", "bao lâu", "kiêng gì",
  "ăn gì", "chăm sóc", "hồi phục", "biến chứng", "rủi ro", "nên không",
];

function wordCount(s) {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

function* candidates() {
  for (const [group, bases] of Object.entries(BASES)) {
    for (const b of bases) {
      yield { focus: b, group };
      for (const m of MODS) yield { focus: `${b} ${m}`, group };
      for (const l of LOCS) yield { focus: `${b} ${l}`, group };
      for (const p of PRICE_HEADS) yield { focus: `${p} ${b}`, group };
      for (const i of INTENT_SHORT) yield { focus: `${b} ${i}`, group };
    }
  }

  // Thêm cụm 2–3 từ độc lập
  const extras = [
    "nâng mũi hoàng kim", "cắt mí phượng hoàng", "filler tạo hình", "botox xóa nhăn",
    "căng chỉ trẻ hóa", "cấy tóc FUE", "phun xăm mày", "massage facial tphcm",
    "ủ muối himalaya", "soi da miễn phí", "tư vấn 1 1", "bác sĩ ckii",
    "giấy phép byt", "thẩm mỹ chuẩn y khoa", "vật liệu chính hãng", "theo dõi hậu phẫu",
    "đặt lịch zalo", "nhắn tin tư vấn", "hotline thẩm mỹ", "xem bảng giá",
    "thẩm mỹ an toàn", "phẫu thuật thẩm mỹ", "không phẫu thuật", "tiêm thẩm mỹ",
    "tạo hình khuôn mặt", "điêu khắc gương mặt", "nâng ngực thẩm mỹ", "hút mỡ bụng",
    "độn cằm", "gọt hàm", "hạ gò má", "căng da mặt",
    "trẻ hóa toàn diện", "liệu trình da", "điều trị nám", "điều trị mụn",
    "sẹo rỗ", "da nhờn", "da hỗn hợp", "da nhạy cảm",
    "collagen tiêm", "skin booster", "profhilo", "sculptra",
    "radiesse", "juvederm", "restylane", "botox allergan",
    "dysport", "xeomin", "hifu 7d", "ultherapy prime",
    "thermage flx", "olypure", "exosome da", "prp da",
    "blackhead", "whitehead", "mụn đầu đen", "mụn viêm",
    "nám chân dung", "nám mảng", "tàn nhang mặt", "đồi mồi",
    "quầng thâm mắt", "bọng mắt dưới", "mí mắt chùng", "đuôi mắt sệ",
    "sống mũi thấp", "đầu mũi to", "cánh mũi rộng", "mũi lệch",
    "mũi lộ sóng", "tụt sụn mũi", "mũi bóng đỏ", "mũi nhiễm trùng",
    "hàm vuông", "cơ nhai to", "rán cười", "rán mã lệnh",
    "trán cao", "thái dương lõm", "má hóp", "cằm lẹm",
    "cằm ngắn", "môi mỏng", "môi lệch", "môi thâm",
    "tóc thưa", "trán hói", "đỉnh đầu thưa", "toc xoăn",
    "phun mày ombre", "phun mày powder", "phun môi baby", "xóa nền mày cũ",
    "spa đôi", "spa nhóm", "gói làm đẹp", "liệu trình tháng",
    "ngày quốc tế phụ nữ", "ưu đãi 8 3", "ưu đãi 20 10", "ưu đãi tết",
    "thẩm mỹ cưới", "làm đẹp trước cưới", "makeup thẩm mỹ", "skin prep cưới",
  ];
  for (const focus of extras) yield { focus, group: "extras" };

  // Local × service nhanh
  const localServices = [
    "nâng mũi", "cắt mí", "filler", "botox", "căng chỉ", "cấy tóc", "phun mày", "spa", "trị nám", "facial",
  ];
  const localAreas = [
    "quận 5", "an đông", "hùng vương", "chợ lớn", "quận 6", "quận 10",
    "tân bình", "phú nhuận", "bình thạnh", "gò vấp", "thủ đức", "sài gòn",
  ];
  for (const s of localServices) {
    for (const a of localAreas) {
      yield { focus: `${s} ${a}`, group: "localX" };
      yield { focus: `${a} ${s}`, group: "localX" };
    }
  }
}

function main() {
  const { slugs, focuses } = loadReserved();
  const out = [];
  const usedFocus = new Set(focuses);
  const usedSlug = new Set(slugs);

  for (const { focus: raw, group } of candidates()) {
    if (out.length >= TARGET) break;
    const focus = raw.replace(/\s+/g, " ").trim();
    if (!focus) continue;
    const wc = wordCount(focus);
    if (wc < 1 || wc > 4) continue;
    const key = focus.toLowerCase();
    if (usedFocus.has(key)) continue;

    let slug = `${slugify(focus)}-sk1k`;
    if (!slug || slug === "-sk1k") continue;
    let n = 2;
    while (usedSlug.has(slug)) {
      slug = `${slugify(focus)}-sk1k${n}`;
      n++;
      if (n > 20) break;
    }
    if (usedSlug.has(slug)) continue;

    usedFocus.add(key);
    usedSlug.add(slug);
    out.push({
      id: out.length + 1,
      group: group.toUpperCase().slice(0, 12),
      groupName: `Short-1000 / ${group}`,
      focus,
      slug,
      pillar: inferPillar(slugify(focus)),
      priority: wc <= 2 ? "cao" : "trung",
      wordCount: wc,
      intent: "short",
    });
  }

  if (out.length < TARGET) {
    console.warn(`[short-1000] Only generated ${out.length}/${TARGET}. Expand bases if needed.`);
  }

  const jsonPath = path.join(dataDir, "keyword-plan-short-1000.json");
  const mdPath = path.join(dataDir, "keyword-plan-short-1000.md");
  fs.writeFileSync(jsonPath, `${JSON.stringify(out, null, 2)}\n`, "utf8");

  const byPillar = {};
  for (const e of out) {
    byPillar[e.pillar] = (byPillar[e.pillar] || 0) + 1;
  }
  const md = [
    `# 1000 từ khóa ngắn (Short-KW-1000)`,
    ``,
    `Tạo: ${new Date().toISOString().slice(0, 10)}`,
    `Số lượng: **${out.length}**`,
    ``,
    `## Phân bố pillar`,
    ``,
    ...Object.entries(byPillar)
      .sort((a, b) => b[1] - a[1])
      .map(([p, c]) => `- \`${p}\`: ${c}`),
    ``,
    `## Danh sách`,
    ``,
    ...out.map((e) => `${e.id}. **${e.focus}** (\`${e.slug}\`)`),
    ``,
  ].join("\n");
  fs.writeFileSync(mdPath, md, "utf8");

  console.log(`[short-1000] Wrote ${out.length} keywords`);
  console.log(`[short-1000] JSON: ${jsonPath}`);
  console.log(`[short-1000] MD:   ${mdPath}`);
  console.log("[short-1000] Sample:", out.slice(0, 8).map((e) => e.focus).join(" | "));
}

main();
