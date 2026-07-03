import { Button } from "@/components/ui/button";
import { AdminField } from "@/admin/components/AdminField";
import { AdminSaveBar } from "@/admin/components/AdminSaveBar";
import { useSiteContent } from "@/context/SiteContentContext";
import type { SiteLink } from "@/types/site-content";

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

export function AdminNavigationPage() {
  const { content, updateContent } = useSiteContent();

  return (
    <div className="space-y-6">
      <AdminSaveBar />
      <h2 className="font-serif text-2xl font-semibold text-primary">Menu & Liên hệ</h2>
      <p className="text-sm text-muted-foreground">
        Chỉnh menu con Giới thiệu, Tin tức và nội dung hero trang Liên hệ.
      </p>

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

      <section className="rounded-xl border bg-white p-5 shadow-sm">
        <h3 className="mb-4 font-semibold">Trang Liên hệ — Hero</h3>
        <div className="grid gap-3 md:grid-cols-2">
          <AdminField
            label="Eyebrow"
            value={content.contactPage.eyebrow}
            onChange={(v) => updateContent((p) => ({ ...p, contactPage: { ...p.contactPage, eyebrow: v } }))}
          />
          <AdminField
            label="Tiêu đề"
            value={content.contactPage.title}
            onChange={(v) => updateContent((p) => ({ ...p, contactPage: { ...p.contactPage, title: v } }))}
          />
          <div className="md:col-span-2">
            <AdminField
              label="Mô tả"
              value={content.contactPage.description}
              multiline
              onChange={(v) => updateContent((p) => ({ ...p, contactPage: { ...p.contactPage, description: v } }))}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
