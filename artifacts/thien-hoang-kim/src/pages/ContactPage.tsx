import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/layout/PageHero";
import { CtaContactSection } from "@/components/CtaContactSection";
import { BookingSection } from "@/components/BookingSection";
import { useSiteContent } from "@/context/SiteContentContext";
import { resolveContactPage } from "@/lib/site-cms";
import { formatPhoneDisplay } from "@/lib/format-phone";
import { buildMapsUrl } from "@/lib/contact-urls";

export default function ContactPage() {
  const { content } = useSiteContent();
  const { settings, home } = content;
  const contact = resolveContactPage(content);

  return (
    <SiteLayout>
      <PageHero
        eyebrow={contact.eyebrow}
        title={contact.title}
        description={contact.description}
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Liên hệ" }]}
      />
      <section className="border-b border-border bg-white py-10">
        <div className="container mx-auto grid gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4 md:px-8">
          {[
            { icon: MapPin, label: "Địa chỉ", value: settings.address },
            { icon: Phone, label: "Hotline", value: formatPhoneDisplay(settings.phone) },
            { icon: Mail, label: "Email", value: settings.email },
            { icon: Clock, label: "Giờ làm việc", value: settings.hours },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-xl border bg-[#fafcfb] p-5">
              <Icon className="mb-2 h-5 w-5 text-primary" />
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</p>
              <p className="mt-1 text-sm font-medium leading-relaxed">{value}</p>
            </div>
          ))}
        </div>
        <div className="container mx-auto mt-6 px-4 md:px-8">
          <a
            href={buildMapsUrl(settings.address)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex text-sm font-semibold text-primary hover:underline"
          >
            Mở Google Maps →
          </a>
        </div>
      </section>
      <CtaContactSection
        title={home.ctaTitle}
        description={home.ctaDescription}
        image={home.ctaImage}
        websiteUrl={settings.websiteUrl || "/"}
        websiteLabel={settings.websiteLabel || "thienhoangkim.vn"}
        facebookUrl={settings.facebookUrl}
        messengerSlug={settings.messengerSlug}
        phone={settings.phone}
        address={settings.address}
      />
      <BookingSection />
    </SiteLayout>
  );
}
