import { useEffect } from "react";
import { useLocation } from "wouter";
import { isAdminLocation } from "@/config/admin";
import { useSiteContent } from "@/context/SiteContentContext";
import { applyPageSeo, resolveRouteSeoContext } from "@/lib/seo";

/** Cập nhật title, meta description, OG… theo từng trang */
export function RouteSeo() {
  const [location] = useLocation();
  const { content } = useSiteContent();

  useEffect(() => {
    if (isAdminLocation(location)) return;
    const path = location.split("#")[0] || "/";
    const ctx = resolveRouteSeoContext(path, content);
    applyPageSeo(ctx, content);
  }, [location, content]);

  return null;
}
