import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getAdminClient } from "./lib/supabase-admin";
import { buildSitemapXml, collectSitemapPaths, type SitemapArticle } from "./lib/sitemap-build";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const base =
      process.env.SITE_URL?.replace(/\/$/, "") ?? "https://thienhoangkim.vercel.app";

    let articles: SitemapArticle[] = [];
    try {
      const supabase = getAdminClient();
      const { data } = await supabase.from("site_content").select("payload").eq("id", 1).maybeSingle();
      articles =
        (data?.payload as { articles?: SitemapArticle[] } | null)?.articles ?? [];
    } catch {
      /* static paths only */
    }

    const paths = collectSitemapPaths(articles);
    const xml = buildSitemapXml(base, paths);

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
    res.status(200).send(xml);
  } catch (err) {
    res.status(500).send(`<?xml version="1.0"?><error>${String(err)}</error>`);
  }
}
