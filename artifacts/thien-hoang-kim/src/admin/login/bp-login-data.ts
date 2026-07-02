/** Cấu hình trang đăng nhập CMS — đổi khi adapt khách hàng mới. */
export const BP_LOGIN = {
  agencyName: "Bứt Phá Marketing",
  clientName: "Thiên Hoàng Kim",
  clientDomain: "thammythienhoangkim.com",
  logoSrc: "/bpm-logo.png",
  version: "v2",

  contacts: [
    {
      label: "HOTLINE",
      value: "093.741.7982",
      href: "tel:0937417982",
      external: false,
    },
    {
      label: "WEBSITE",
      value: "butphamarketing.com",
      href: "https://butphamarketing.com",
      external: true,
    },
    {
      label: "EMAIL",
      value: "butphamarketing@gmail.com",
      href: "mailto:butphamarketing@gmail.com",
      external: false,
    },
    {
      label: "ZALO",
      value: "093.741.7982",
      href: "https://zalo.me/0937417982",
      external: true,
    },
  ] as const,

  services: [
    {
      title: "Bảng giá dịch vụ",
      description: "Website, Facebook, Google Maps — giá minh bạch.",
      href: "https://www.butphamarketing.com/banggia",
      icon: "tags" as const,
    },
    {
      title: "Liên Hệ Kỹ Thuật",
      description: "Hỗ trợ kỹ thuật chuyên nghiệp, tận tâm.",
      href: "https://zalo.me/0937417982",
      icon: "headphones" as const,
    },
  ] as const,
};

export function cmsEmailPlaceholder(domain = BP_LOGIN.clientDomain): string {
  return `admin@${domain}`;
}
