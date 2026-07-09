import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AdminField } from "@/admin/components/AdminField";
import { AdminImageField } from "@/admin/components/AdminImageField";
import { AdminSaveBar } from "@/admin/components/AdminSaveBar";
import { useSiteContent } from "@/context/SiteContentContext";
import { slugify } from "@/lib/slug";
import type { ServiceCategoryId, SiteServiceItem } from "@/types/site-content";

const CATEGORY_LABELS: Record<ServiceCategoryId, string> = {
  "tham-my": "Thẩm mỹ y khoa",
  spa: "Spa & chăm sóc da",
};

function newServiceItem(categoryId: ServiceCategoryId): SiteServiceItem {
  const label = "Dịch vụ mới";
  const slug = slugify(label);
  return {
    id: crypto.randomUUID(),
    categoryId,
    slug,
    label,
    description: "",
    priceText: "",
    articleSlug: "",
    image: "",
    published: true,
    sortOrder: 999,
  };
}

export function AdminServicesPage() {
  const { content, updateContent } = useSiteContent();
  const [tab, setTab] = useState<ServiceCategoryId>("tham-my");
  const [expanded, setExpanded] = useState<string | null>(null);

  const category = content.serviceCategories.find((c) => c.id === tab);
  const items = content.serviceItems
    .filter((i) => i.categoryId === tab)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const updateCategory = (patch: Partial<(typeof content.serviceCategories)[0]>) => {
    updateContent((p) => ({
      ...p,
      serviceCategories: p.serviceCategories.map((c) => (c.id === tab ? { ...c, ...patch } : c)),
    }));
  };

  const updateItem = (id: string, patch: Partial<SiteServiceItem>) => {
    updateContent((p) => ({
      ...p,
      serviceItems: p.serviceItems.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));
  };

  const moveItem = (id: string, dir: -1 | 1) => {
    const list = [...items];
    const idx = list.findIndex((i) => i.id === id);
    const swap = idx + dir;
    if (swap < 0 || swap >= list.length) return;
    const reordered = [...list];
    [reordered[idx], reordered[swap]] = [reordered[swap], reordered[idx]];
    updateContent((p) => ({
      ...p,
      serviceItems: p.serviceItems.map((item) => {
        if (item.categoryId !== tab) return item;
        const newIdx = reordered.findIndex((r) => r.id === item.id);
        return newIdx >= 0 ? { ...item, sortOrder: newIdx } : item;
      }),
    }));
  };

  const syncBookingServices = () => {
    const services = content.serviceItems
      .filter((i) => i.published)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((i) => ({ value: i.slug, label: i.label }));
    updateContent((p) => ({
      ...p,
      bookingServices: [...services, { value: "khac", label: "Khác" }],
    }));
  };

  return (
    <div className="space-y-6">
      <AdminSaveBar />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-primary">Dịch vụ & Bảng giá</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Quản lý danh mục Thẩm mỹ / Spa và từng dịch vụ con. Đồng bộ form đặt lịch khi thêm dịch vụ mới.
          </p>
        </div>
        <Button type="button" variant="outline" onClick={syncBookingServices}>
          Đồng bộ form đặt lịch
        </Button>
      </div>

      <div className="flex gap-2">
        {(Object.keys(CATEGORY_LABELS) as ServiceCategoryId[]).map((id) => (
          <Button key={id} type="button" variant={tab === id ? "default" : "outline"} onClick={() => setTab(id)}>
            {CATEGORY_LABELS[id]}
          </Button>
        ))}
      </div>

      {category && (
        <section className="rounded-xl border bg-white p-5 shadow-sm">
          <h3 className="mb-4 font-semibold">Danh mục — {CATEGORY_LABELS[tab]}</h3>
          <div className="grid gap-3 md:grid-cols-2">
            <AdminField label="Tiêu đề" value={category.title} onChange={(v) => updateCategory({ title: v })} />
            <AdminField label="Đường dẫn" value={category.path} onChange={(v) => updateCategory({ path: v })} />
            <AdminField label="Eyebrow" value={category.eyebrow} onChange={(v) => updateCategory({ eyebrow: v })} />
            <AdminField
              label="Slug bài viết tổng quan"
              value={category.articleSlug ?? ""}
              onChange={(v) => updateCategory({ articleSlug: v || undefined })}
            />
            <div className="md:col-span-2">
              <AdminField
                label="Mô tả"
                value={category.description}
                multiline
                onChange={(v) => updateCategory({ description: v })}
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id={`cat-pub-${tab}`}
                checked={category.published}
                onCheckedChange={(v) => updateCategory({ published: v === true })}
              />
              <Label htmlFor={`cat-pub-${tab}`}>Hiển thị danh mục</Label>
            </div>
          </div>
        </section>
      )}

      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Dịch vụ ({items.length})</h3>
        <Button
          type="button"
          size="sm"
          onClick={() => {
            const item = newServiceItem(tab);
            updateContent((p) => ({ ...p, serviceItems: [...p.serviceItems, item] }));
            setExpanded(item.id);
          }}
        >
          + Thêm dịch vụ
        </Button>
      </div>

      <div className="space-y-3">
        {items.map((item) => {
          const open = expanded === item.id;
          return (
            <div key={item.id} className="overflow-hidden rounded-xl border bg-white shadow-sm">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left hover:bg-muted/40"
                onClick={() => setExpanded(open ? null : item.id)}
              >
                <div>
                  <p className="font-semibold">{item.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {category?.path}/{item.slug} · {item.published ? "Hiện" : "Ẩn"}
                  </p>
                </div>
                <span className="text-sm text-primary">{open ? "Thu gọn" : "Sửa"}</span>
              </button>
              {open && (
                <div className="space-y-3 border-t px-5 pb-5 pt-4">
                  <div className="flex flex-wrap gap-2">
                    <Button type="button" size="sm" variant="outline" onClick={() => moveItem(item.id, -1)}>
                      ↑ Lên
                    </Button>
                    <Button type="button" size="sm" variant="outline" onClick={() => moveItem(item.id, 1)}>
                      ↓ Xuống
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="ml-auto text-destructive"
                      onClick={() => {
                        if (confirm("Xóa dịch vụ này?")) {
                          updateContent((p) => ({
                            ...p,
                            serviceItems: p.serviceItems.filter((x) => x.id !== item.id),
                          }));
                        }
                      }}
                    >
                      Xóa
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`pub-${item.id}`}
                      checked={item.published}
                      onCheckedChange={(v) => updateItem(item.id, { published: v === true })}
                    />
                    <Label htmlFor={`pub-${item.id}`}>Hiển thị</Label>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <AdminField label="Tên dịch vụ" value={item.label} onChange={(v) => updateItem(item.id, { label: v })} />
                    <AdminField label="Slug URL" value={item.slug} onChange={(v) => updateItem(item.id, { slug: slugify(v) })} />
                    <AdminField
                      label="Slug bài viết liên kết"
                      value={item.articleSlug ?? ""}
                      onChange={(v) => updateItem(item.id, { articleSlug: v || undefined })}
                    />
                    <AdminField
                      label="Giá (bảng giá)"
                      value={item.priceText ?? ""}
                      onChange={(v) => updateItem(item.id, { priceText: v })}
                    />
                    <div className="md:col-span-2">
                      <AdminImageField
                        label="Ảnh thẻ dịch vụ"
                        value={item.image ?? ""}
                        onChange={(v) => updateItem(item.id, { image: v })}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <AdminField
                        label="Mô tả ngắn"
                        value={item.description ?? ""}
                        multiline
                        onChange={(v) => updateItem(item.id, { description: v })}
                      />
                    </div>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={() => updateItem(item.id, { slug: slugify(item.label) })}>
                    Tạo slug từ tên
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
