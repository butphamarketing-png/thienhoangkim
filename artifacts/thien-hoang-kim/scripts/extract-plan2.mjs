import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const transcript =
  "C:/Users/Admin/.cursor/projects/c-Users-Admin-Downloads-Thien-Hoang-Kim/agent-transcripts/b0908aee-fa36-4bb9-b6f8-4d9a80072e92/b0908aee-fa36-4bb9-b6f8-4d9a80072e92.jsonl";

const line = fs.readFileSync(transcript, "utf8").split("\n")[260];
const obj = JSON.parse(line);
const text = obj.message.content[0].text;
const re = /\|\s*\d+\s*\|\s*([^|]+)\|\s*`([a-z0-9-]+)`\s*\|/g;
const entries = [];
let m;
while ((m = re.exec(text))) {
  entries.push({ focus: m[1].trim(), slug: m[2].trim() });
}
const out = path.join(__dirname, "../src/data/keyword-plan-plan2.json");
fs.writeFileSync(out, JSON.stringify(entries));
console.log(`Wrote ${entries.length} entries → ${out}`);
