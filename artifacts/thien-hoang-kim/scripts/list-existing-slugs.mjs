import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "../src/data");

const merged = JSON.parse(fs.readFileSync(path.join(dataDir, "keyword-plan.merged.json"), "utf8"));
const defaults = fs.readFileSync(path.join(dataDir, "articles.defaults.ts"), "utf8");
const slugs = new Set(merged.map((e) => e.slug));
for (const m of defaults.matchAll(/article\(\s*\n?\s*"[^"]+",\s*\n?\s*"([a-z0-9-]+)"/g)) {
  slugs.add(m[1]);
}
const sorted = [...slugs].sort();
console.log("total", sorted.length);
fs.writeFileSync(path.join(dataDir, "existing-slugs.txt"), sorted.join("\n"));
