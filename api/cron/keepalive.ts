import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getAdminClient } from "../lib/supabase-admin";

function isCronAuthorized(req: VercelRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;

  const bearer = req.headers.authorization?.replace(/^Bearer\s+/i, "").trim();
  if (bearer === secret) return true;

  const q = req.query.secret;
  return typeof q === "string" && q === secret;
}

/** Ping nhẹ Supabase để tránh pause project Free (inactivity ~7 ngày). */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!isCronAuthorized(req)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const supabase = getAdminClient();
    const { error } = await supabase.from("site_content").select("id").eq("id", 1).limit(1);

    if (error) {
      res.status(500).json({ ok: false, error: error.message });
      return;
    }

    res.status(200).json({
      ok: true,
      at: new Date().toISOString(),
      message: "Supabase keepalive OK",
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err) });
  }
}
