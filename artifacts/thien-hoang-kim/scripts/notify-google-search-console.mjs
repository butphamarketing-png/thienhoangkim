/**
 * Submit sitemap.xml to Google Search Console after production deploy.
 *
 * Google does not support IndexNow for normal websites, and the Google
 * Indexing API is only intended for JobPosting/BroadcastEvent pages.
 * For this site, the correct automated path is Search Console sitemap submit.
 *
 * Setup:
 * 1. Create a Google Cloud service account and enable "Google Search Console API".
 * 2. Add the service account email as a user/owner in Google Search Console.
 * 3. Add one of these environment variables in Vercel:
 *    - GSC_SERVICE_ACCOUNT_JSON: full service account JSON
 *    - GOOGLE_APPLICATION_CREDENTIALS: path to the JSON file (local/CI)
 * 4. Optional:
 *    - NOTIFY_GOOGLE_GSC=1 to force a local/manual run
 *    - GOOGLE_SEARCH_CONSOLE_SITE_URL=https://www.thammythienhoangkim.com/
 *    - GOOGLE_SITEMAP_URL=https://www.thammythienhoangkim.com/sitemap.xml
 */
import crypto from "node:crypto";
import fs from "node:fs";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SCOPE = "https://www.googleapis.com/auth/webmasters";

const BASE_URL = (process.env.SITE_URL ?? "https://www.thammythienhoangkim.com").replace(/\/$/, "");
const SITE_URL = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL ?? `${BASE_URL}/`;
const SITEMAP_URL = process.env.GOOGLE_SITEMAP_URL ?? `${BASE_URL}/sitemap.xml`;

function shouldRun() {
  if (process.env.NOTIFY_GOOGLE_GSC === "1") return true;
  if (process.env.VERCEL === "1" && process.env.VERCEL_ENV === "production") return true;
  return false;
}

function base64Url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function loadServiceAccount() {
  if (process.env.GSC_SERVICE_ACCOUNT_JSON) {
    return JSON.parse(process.env.GSC_SERVICE_ACCOUNT_JSON);
  }

  const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (credentialsPath && fs.existsSync(credentialsPath)) {
    return JSON.parse(fs.readFileSync(credentialsPath, "utf8"));
  }

  return null;
}

function createJwt(serviceAccount) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: serviceAccount.client_email,
    scope: SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  };

  const unsigned = `${base64Url(JSON.stringify(header))}.${base64Url(JSON.stringify(payload))}`;
  const signature = crypto
    .createSign("RSA-SHA256")
    .update(unsigned)
    .sign(serviceAccount.private_key, "base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${unsigned}.${signature}`;
}

async function getAccessToken(serviceAccount) {
  const assertion = createJwt(serviceAccount);
  const body = new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion,
  });

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`OAuth token failed HTTP ${res.status}: ${JSON.stringify(data)}`);
  }

  return data.access_token;
}

async function submitSitemap(accessToken) {
  const endpoint = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
    SITE_URL,
  )}/sitemaps/${encodeURIComponent(SITEMAP_URL)}`;

  const res = await fetch(endpoint, {
    method: "PUT",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Submit sitemap failed HTTP ${res.status}: ${text}`);
  }

  return { status: res.status, text };
}

async function main() {
  if (!shouldRun()) {
    console.log("[google-gsc] Skipped (chỉ chạy trên Vercel production hoặc NOTIFY_GOOGLE_GSC=1)");
    return;
  }

  const serviceAccount = loadServiceAccount();
  if (!serviceAccount) {
    console.log("[google-gsc] Skipped (thiếu GSC_SERVICE_ACCOUNT_JSON hoặc GOOGLE_APPLICATION_CREDENTIALS)");
    return;
  }

  if (!serviceAccount.client_email || !serviceAccount.private_key) {
    throw new Error("Service account JSON thiếu client_email/private_key");
  }

  console.log(`[google-gsc] Submitting sitemap → ${SITEMAP_URL}`);
  const token = await getAccessToken(serviceAccount);
  const result = await submitSitemap(token);
  console.log(`[google-gsc] OK sitemap submitted → HTTP ${result.status}`);
}

main().catch((err) => {
  console.error("[google-gsc] Failed:", err);
  process.exit(1);
});
