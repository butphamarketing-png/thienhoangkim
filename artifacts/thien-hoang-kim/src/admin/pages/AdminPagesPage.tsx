import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminField } from "@/admin/components/AdminField";
import { AdminSaveBar } from "@/admin/components/AdminSaveBar";
import { useSiteContent } from "@/context/SiteContentContext";
import type { SitePage, SitePageBlock } from "@/types/site-content";

function BlockEditor({
  block,
  onChange,
  onRemove,
}: {
  block: SitePageBlock;
  onChange: (block: SitePageBlock) => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-bold">Khối nội dung</span>
        <Button type="button" variant="ghost" size="sm" className="text-destructive" onClick={onRemove}>
          Xóa khối
        </Button>
      </div>
      <AdminField
        label="Tiêu đề H2 (tùy chọn)"
        value={block.title ?? ""}
        onChange={(v) => onChange({ ...block, title: v || undefined })}
      />
      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground">Đoạn văn</span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => onChange({ ...block, paragraphs: [...block.paragraphs, ""] })}
          >
            + Đoạn
          </Button>
        </div>
        {block.paragraphs.map((para, i) => (
          <div key={i} className="flex gap-2">
            <AdminField
              label={`Đoạn ${i + 1}`}
              value={para}
              multiline
              onChange={(v) => {
                const paragraphs = [...block.paragraphs];
                paragraphs[i] = v;
                onChange({ ...block, paragraphs });
              }}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="mt-6 shrink-0 text-destructive"
              onClick={() => onChange({ ...block, paragraphs: block.paragraphs.filter((_, j) => j !== i) })}
            >
              Xóa
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminPagesPage() {
  const { content, updateContent } = useSiteContent();
  const [expanded, setExpanded] = useState<string | null>(content.pages[0]?.id ?? null);

  const updatePage = (index: number, patch: Partial<SitePage>) => {
    updateContent((p) => {
      const pages = [...p.pages];
      pages[index] = { ...pages[index], ...patch };
      return { ...p, pages };
    });
  };

  return (
    <div className="space-y-6">
      <AdminSaveBar />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-primary">Trang Giới thiệu</h2>
          <p className="mt-1 text-sm text-muted-foreground">Chỉnh sửa nội dung các trang trong mục Giới thiệu.</p>
        </div>
        <Button
          type="button"
          onClick={() => {
            const id = crypto.randomUUID();
            const page: SitePage = {
              id,
              path: "/gioi-thieu/trang-moi",
              title: "Trang mới",
              eyebrow: "Giới thiệu",
              description: "",
              blocks: [{ paragraphs: [""] }],
            };
            updateContent((p) => ({ ...p, pages: [...p.pages, page] }));
            setExpanded(id);
          }}
        >
          + Thêm trang
        </Button>
      </div>

      <div className="space-y-3">
        {content.pages.map((page, i) => {
          const open = expanded === page.id;
          return (
            <div key={page.id} className="overflow-hidden rounded-xl border bg-white shadow-sm">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left hover:bg-muted/40"
                onClick={() => setExpanded(open ? null : page.id)}
              >
                <div className="min-w-0">
                  <p className="truncate font-semibold">{page.title}</p>
                  <p className="text-xs text-muted-foreground">{page.path}</p>
                </div>
                <span className="text-sm text-primary">{open ? "Thu gọn" : "Chỉnh sửa"}</span>
              </button>
              {open && (
                <div className="space-y-4 border-t px-5 pb-5 pt-4">
                  <a
                    href={page.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    <ExternalLink className="mr-1 h-4 w-4" />
                    Xem trên web
                  </a>
                  <div className="grid gap-3 md:grid-cols-2">
                    <AdminField label="Tiêu đề" value={page.title} onChange={(v) => updatePage(i, { title: v })} />
                    <AdminField label="Đường dẫn (path)" value={page.path} onChange={(v) => updatePage(i, { path: v })} />
                    <AdminField label="Eyebrow" value={page.eyebrow ?? ""} onChange={(v) => updatePage(i, { eyebrow: v })} />
                    <div className="md:col-span-2">
                      <AdminField
                        label="Mô tả hero"
                        value={page.description}
                        multiline
                        onChange={(v) => updatePage(i, { description: v })}
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Khối nội dung</h4>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updatePage(i, { blocks: [...page.blocks, { paragraphs: [""] }] })
                        }
                      >
                        + Thêm khối
                      </Button>
                    </div>
                    {page.blocks.map((block, bi) => (
                      <BlockEditor
                        key={bi}
                        block={block}
                        onChange={(b) => {
                          const blocks = [...page.blocks];
                          blocks[bi] = b;
                          updatePage(i, { blocks });
                        }}
                        onRemove={() => updatePage(i, { blocks: page.blocks.filter((_, j) => j !== bi) })}
                      />
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                    onClick={() => {
                      if (confirm(`Xóa trang "${page.title}"?`)) {
                        updateContent((p) => ({ ...p, pages: p.pages.filter((x) => x.id !== page.id) }));
                      }
                    }}
                  >
                    Xóa trang
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
