import { AdminSaveBar } from "@/admin/components/AdminSaveBar";
import { AdminField } from "@/admin/components/AdminField";
import { AdminImageField } from "@/admin/components/AdminImageField";
import { Switch } from "@/components/ui/switch";
import { useSiteContent } from "@/context/SiteContentContext";

export function AdminPromotionPage() {
  const { content, updateContent } = useSiteContent();
  const p = content.promotion;

  return (
    <div className="space-y-6">
      <AdminSaveBar />
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-serif text-2xl font-semibold text-primary">Chương trình khuyến mãi</h2>
        <div className="flex items-center gap-2 rounded-full border bg-white px-3 py-2 shadow-sm">
          <span className="text-sm font-medium">Bật</span>
          <Switch
            checked={p.enabled}
            onCheckedChange={(checked) =>
              updateContent((prev) => ({ ...prev, promotion: { ...prev.promotion, enabled: checked } }))
            }
          />
        </div>
      </div>

      <section className="grid gap-4 rounded-xl border bg-white p-6 shadow-sm">
        <AdminField
          label="Tiêu đề"
          value={p.title}
          onChange={(v) => updateContent((prev) => ({ ...prev, promotion: { ...prev.promotion, title: v } }))}
        />
        <AdminField
          label="Mô tả"
          value={p.description}
          onChange={(v) => updateContent((prev) => ({ ...prev, promotion: { ...prev.promotion, description: v } }))}
        />
        <AdminImageField
          label="Hình ảnh"
          value={p.image}
          onChange={(v) => updateContent((prev) => ({ ...prev, promotion: { ...prev.promotion, image: v } }))}
        />
        <AdminField
          label="Text nút"
          value={p.buttonLabel}
          onChange={(v) => updateContent((prev) => ({ ...prev, promotion: { ...prev.promotion, buttonLabel: v } }))}
        />
        <AdminField
          label="URL nút"
          value={p.buttonUrl}
          onChange={(v) => updateContent((prev) => ({ ...prev, promotion: { ...prev.promotion, buttonUrl: v } }))}
        />
      </section>
    </div>
  );
}
