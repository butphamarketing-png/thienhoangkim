import { mergeSiteContent } from "@/lib/normalize-content";
import { resolveRouteSeoContext } from "@/lib/seo";
import { buildJsonLdGraph, jsonLdScript } from "@/lib/seo-schema";
import { buildSeoPaths } from "./seo-paths.mjs";
import type { PageSeoMeta } from "@/lib/seo";

export type PrerenderPage = {
  path: string;
  meta: PageSeoMeta;
  jsonLd: string;
};

/** Thu thập meta SEO + JSON-LD cho mọi URL công khai (dùng default content lúc build). */
export function collectPrerenderPages(): PrerenderPage[] {
  const content = mergeSiteContent({});
  return buildSeoPaths().map((routePath) => {
    const ctx = resolveRouteSeoContext(routePath, content);
    const graphs = buildJsonLdGraph(ctx, content);
    return {
      path: routePath,
      meta: ctx.meta,
      jsonLd: jsonLdScript(graphs),
    };
  });
}
