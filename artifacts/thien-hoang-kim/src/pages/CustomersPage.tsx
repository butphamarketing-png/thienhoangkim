import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { CustomerGalleryGrid } from "@/components/CustomerGalleryGrid";
import { useSiteContent } from "@/context/SiteContentContext";
import { resolveCustomersPage } from "@/lib/site-cms";

export default function CustomersPage() {
  const { content } = useSiteContent();
  const hero = resolveCustomersPage(content);

  return (
    <SiteLayout>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Khách hàng" }]}
      />
      <CustomerGalleryGrid cases={content.customerCases} />
    </SiteLayout>
  );
}
