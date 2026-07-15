import fs from "node:fs";

const p = "src/data/articles.defaults.ts";
let s = fs.readFileSync(p, "utf8");
const pairs = [
  ["    PHONG_KHAM_THAM_MY_AN_DONG_BODY,\n", "    PHONG_KHAM_THAM_MY_AN_DONG_BODY + DEPTH_PHONG_KHAM_AN_DONG,\n"],
  ["    CHON_PHONG_KHAM_THAM_MY_AN_TOAN_BODY,\n", "    CHON_PHONG_KHAM_THAM_MY_AN_TOAN_BODY + DEPTH_CHON_PHONG_KHAM_AN_TOAN,\n"],
  ["    DIA_CHI_THAM_MY_QUAN_5_AN_DONG_BODY,\n", "    DIA_CHI_THAM_MY_QUAN_5_AN_DONG_BODY + DEPTH_DIA_CHI_Q5,\n"],
  ["    NANG_MUI_QUAN_5_AN_DONG_BODY,\n", "    NANG_MUI_QUAN_5_AN_DONG_BODY + DEPTH_NANG_MUI_Q5,\n"],
  ["    FILLER_QUAN_5_AN_DONG_BODY,\n", "    FILLER_QUAN_5_AN_DONG_BODY + DEPTH_FILLER_Q5,\n"],
  ["    CAT_MI_QUAN_5_AN_DONG_BODY,\n", "    CAT_MI_QUAN_5_AN_DONG_BODY + DEPTH_CAT_MI_Q5,\n"],
];
for (const [a, b] of pairs) {
  if (!s.includes(a)) console.log("missing", JSON.stringify(a));
  else s = s.replace(a, b);
}
fs.writeFileSync(p, s);
console.log("defaults wired");
