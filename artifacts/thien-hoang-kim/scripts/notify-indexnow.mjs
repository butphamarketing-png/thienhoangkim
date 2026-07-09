/**
 * Gửi URL mới/cập nhật tới Bing & Yandex qua IndexNow sau deploy production.
 * Google không hỗ trợ IndexNow — vẫn dựa vào sitemap + crawl tự nhiên.
 *
 * Key file: public/{INDEXNOW_KEY}.txt (phải truy cập được trên domain).
 * Chạy thủ công: NOTIFY_INDEXNOW=1 node scripts/notify-indexnow.mjs
 */
import { buildSeoPaths } from "./seo-paths.mjs";

const SITE_HOST = (process.env.SITE_HOST ?? "www.thammythienhoangkim.com").replace(/^https?:\/\//, "").replace(/\/$/, "");
const BASE_URL = (process.env.SITE_URL ?? `https://${SITE_HOST}`).replace(/\/$/, "");
const INDEXNOW_KEY = process.env.INDEXNOW_KEY ?? "thk2026indexnow";
const BATCH_SIZE = 10_000;

const INDEXNOW_ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
];

function shouldRun() {
  if (process.env.NOTIFY_INDEXNOW === "1") return true;
  if (process.env.VERCEL === "1" && process.env.VERCEL_ENV === "production") return true;
  return false;
}

async function submitBatch(urlList) {
  const body = {
    host: SITE_HOST,
    key: INDEXNOW_KEY,
    keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
    urlList,
  };

  const results = [];
  for (const endpoint of INDEXNOW_ENDPOINTS) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(body),
      });
      results.push({ endpoint, status: res.status, ok: res.ok });
    } catch (err) {
      results.push({ endpoint, status: 0, ok: false, error: String(err) });
    }
  }
  return results;
}

async function main() {
  if (!shouldRun()) {
    console.log("[indexnow] Skipped (chỉ chạy trên Vercel production hoặc NOTIFY_INDEXNOW=1)");
    return;
  }

  const paths = buildSeoPaths();
  const urlList = paths.map((p) => (p === "/" ? BASE_URL : `${BASE_URL}${p}`));

  console.log(`[indexnow] Submitting ${urlList.length} URLs → ${SITE_HOST}`);

  let submitted = 0;
  for (let i = 0; i < urlList.length; i += BATCH_SIZE) {
    const batch = urlList.slice(i, i + BATCH_SIZE);
    const results = await submitBatch(batch);
    submitted += batch.length;
    for (const r of results) {
      const label = r.ok ? "OK" : "WARN";
      console.log(`[indexnow] ${label} ${r.endpoint} → HTTP ${r.status}${r.error ? ` (${r.error})` : ""}`);
    }
  }

  console.log(`[indexnow] Done — ${submitted} URLs notified (Bing/Yandex)`);
}

main().catch((err) => {
  console.error("[indexnow] Failed:", err);
  process.exit(1);
});
