import { mergeSiteContent } from "@/lib/normalize-content";
import { resolveRouteSeo, type PageSeoMeta } from "@/lib/seo";
import { buildSeoPaths } from "./seo-paths.mjs";

export type PrerenderPage = {
  path: string;
  meta: PageSeoMeta;
};

/** Thu thập meta SEO cho mọi URL công khai (dùng default content lúc build). */
export function collectPrerenderPages(): PrerenderPage[] {
  const content = mergeSiteContent({});
  return buildSeoPaths().map((routePath) => ({
    path: routePath,
    meta: resolveRouteSeo(routePath, content),
  }));
}
