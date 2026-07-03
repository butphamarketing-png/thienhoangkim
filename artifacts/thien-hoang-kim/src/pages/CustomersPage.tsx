import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { CustomerGalleryGrid } from "@/components/CustomerGalleryGrid";
import { useSiteContent } from "@/context/SiteContentContext";

export default function CustomersPage() {
  const { content } = useSiteContent();

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Khách hàng"
        title="Khách hàng thực tế"
        description="Hình ảnh trước – sau từ khách hàng đã trải nghiệm dịch vụ tại Thiên Hoàng Kim."
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Khách hàng" }]}
      />
      <CustomerGalleryGrid cases={content.customerCases} />
    </SiteLayout>
  );
}
