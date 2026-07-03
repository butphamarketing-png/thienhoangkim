import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { DoctorTeamSection } from "@/components/DoctorTeamSection";
import { useSiteContent } from "@/context/SiteContentContext";
import { resolveDoctorsPage } from "@/lib/site-cms";

export default function DoctorsPage() {
  const { content } = useSiteContent();
  const hero = resolveDoctorsPage(content);

  return (
    <SiteLayout>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        crumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Giới thiệu", href: "/gioi-thieu" },
          { label: "Đội ngũ bác sĩ" },
        ]}
      />
      <DoctorTeamSection doctors={content.doctors} />
    </SiteLayout>
  );
}
