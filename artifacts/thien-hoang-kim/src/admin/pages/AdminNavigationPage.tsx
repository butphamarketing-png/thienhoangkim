import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AdminField } from "@/admin/components/AdminField";
import { AdminSaveBar } from "@/admin/components/AdminSaveBar";
import { useSiteContent } from "@/context/SiteContentContext";
import type { SiteLink, SiteMainNavItem, SitePageHero } from "@/types/site-content";

function LinkListEditor({
  title,
  links,
  onChange,
}: {
  title: string;
  links: SiteLink[];
  onChange: (links: SiteLink[]) => void;
}) {
  return (
    <section className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => onChange([...links, { label: "Liên kết mới", href: "/" }])}
        >
          + Thêm
        </Button>
      </div>
      <div className="space-y-3">
        {links.map((link, i) => (
          <div key={i} className="grid gap-2 rounded-lg border p-3 md:grid-cols-[1fr_1fr_auto]">
            <AdminField
              label="Nhãn"
              value={link.label}
              onChange={(v) => {
                const next = [...links];
                next[i] = { ...next[i], label: v };
                onChange(next);
              }}
            />
            <AdminField
              label="URL"
              value={link.href}
              onChange={(v) => {
                const next = [...links];
                next[i] = { ...next[i], href: v };
                onChange(next);
              }}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="self-end text-destructive"
              onClick={() => onChange(links.filter((_, j) => j !== i))}
            >
              Xóa
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}

function MainNavEditor({
  items,
  onChange,
}: {
  items: SiteMainNavItem[];
  onChange: (items: SiteMainNavItem[]) => void;
}) {
  return (
    <section className="rounded-xl border bg-white p-5 shadow-sm">
      <h3 className="mb-1 font-semibold">Menu chính (cấp 1)</h3>
      <p className="mb-4 text-xs text-muted-foreground">
        Bật/tắt và đổi nhãn hoặc đường dẫn các mục trên thanh menu. Menu con Giới thiệu, Dịch vụ, Tin tức vẫn chỉnh ở các
        phần bên dưới.
      </p>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={item.id} className="grid gap-2 rounded-lg border p-3 md:grid-cols-[auto_1fr_1fr_auto] md:items-end">
            <div className="flex items-center gap-2 pb-1">
              <Checkbox
                id={`main-nav-${item.id}`}
                checked={item.enabled}
                onCheckedChange={(v) => {
                  const next = [...items];
                  next[i] = { ...next[i], enabled: v === true };
                  onChange(next);
                }}
              />
              <Label htmlFor={`main-nav-${item.id}`} className="text-xs text-muted-foreground">
                Hiện
              </Label>
            </div>
            <AdminField
              label="Nhãn"
              value={item.label}
              onChange={(v) => {
                const next = [...items];
                next[i] = { ...next[i], label: v };
                onChange(next);
              }}
            />
            <AdminField
              label="URL"
              value={item.href}
              onChange={(v) => {
                const next = [...items];
                next[i] = { ...next[i], href: v };
                onChange(next);
              }}
            />
            <span className="pb-2 text-xs text-muted-foreground md:text-right">{item.id}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function PageHeroEditor({
  title,
  pathHint,
  hero,
  onChange,
}: {
  title: string;
  pathHint: string;
  hero: SitePageHero;
  onChange: (hero: SitePageHero) => void;
}) {
  return (
    <section className="rounded-xl border bg-white p-5 shadow-sm">
      <h3 className="mb-1 font-semibold">{title}</h3>
      <p className="mb-4 text-xs text-muted-foreground">{pathHint}</p>
      <div className="grid gap-3 md:grid-cols-2">
        <AdminField label="Eyebrow" value={hero.eyebrow} onChange={(v) => onChange({ ...hero, eyebrow: v })} />
        <AdminField label="Tiêu đề" value={hero.title} onChange={(v) => onChange({ ...hero, title: v })} />
        <div className="md:col-span-2">
          <AdminField
            label="Mô tả"
            value={hero.description}
            multiline
            onChange={(v) => onChange({ ...hero, description: v })}
          />
        </div>
      </div>
    </section>
  );
}

export function AdminNavigationPage() {
  const { content, updateContent } = useSiteContent();

  return (
    <div className="space-y-6">
      <AdminSaveBar />
      <h2 className="font-serif text-2xl font-semibold text-primary">Menu & Hero trang</h2>
      <p className="text-sm text-muted-foreground">
        Chỉnh menu chính, menu con và banner (eyebrow, tiêu đề, mô tả) các trang chính trên website.
      </p>

      <MainNavEditor
        items={content.mainNav}
        onChange={(mainNav) => updateContent((p) => ({ ...p, mainNav }))}
      />

      <LinkListEditor
        title="Menu Giới thiệu"
        links={content.introNav}
        onChange={(introNav) => updateContent((p) => ({ ...p, introNav }))}
      />

      <LinkListEditor
        title="Menu Tin tức"
        links={content.newsNav}
        onChange={(newsNav) => updateContent((p) => ({ ...p, newsNav }))}
      />

      <PageHeroEditor
        title="Trang Dịch vụ"
        pathHint="/dich-vu"
        hero={content.servicesHubPage}
        onChange={(servicesHubPage) => updateContent((p) => ({ ...p, servicesHubPage }))}
      />

      <PageHeroEditor
        title="Trang Bảng giá"
        pathHint="/bang-gia"
        hero={content.priceListPage}
        onChange={(priceListPage) => updateContent((p) => ({ ...p, priceListPage }))}
      />

      <PageHeroEditor
        title="Trang Khách hàng"
        pathHint="/khach-hang"
        hero={content.customersPage}
        onChange={(customersPage) => updateContent((p) => ({ ...p, customersPage }))}
      />

      <PageHeroEditor
        title="Trang Đội ngũ bác sĩ"
        pathHint="/gioi-thieu/doi-ngu-bac-si"
        hero={content.doctorsPage}
        onChange={(doctorsPage) => updateContent((p) => ({ ...p, doctorsPage }))}
      />

      <PageHeroEditor
        title="Trang Liên hệ"
        pathHint="/lien-he"
        hero={content.contactPage}
        onChange={(contactPage) => updateContent((p) => ({ ...p, contactPage }))}
      />
    </div>
  );
}
