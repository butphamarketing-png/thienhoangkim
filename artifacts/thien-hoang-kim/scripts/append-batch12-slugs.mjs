import fs from "node:fs";

const plan = JSON.parse(fs.readFileSync("src/data/keyword-plan-short-100-batch12.json", "utf8"));
const slugs = plan.map((e) => e.slug);
let file = fs.readFileSync("src/data/manual-override-slugs.ts", "utf8");
const add = slugs.filter((slug) => !file.includes(`"${slug}"`));
if (!add.length) {
  console.log("no new slugs");
  process.exit(0);
}
const insert = add.map((s) => `  "${s}",`).join("\n");
file = file.replace(/\n\]\);\s*$/, `\n${insert}\n]);\n`);
fs.writeFileSync("src/data/manual-override-slugs.ts", file);
console.log("added", add.length);
