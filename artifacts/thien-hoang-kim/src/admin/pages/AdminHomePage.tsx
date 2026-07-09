import { Button } from "@/components/ui/button";
import { AdminField } from "@/admin/components/AdminField";
import { AdminImageField } from "@/admin/components/AdminImageField";
import { AdminSaveBar } from "@/admin/components/AdminSaveBar";
import { HERO_SLIDE_HEIGHT, HERO_SLIDE_SIZE_LABEL, HERO_SLIDE_WIDTH } from "@/config/hero-slideshow";
import { useSiteContent } from "@/context/SiteContentContext";
import type { CommitmentIconKey, SiteSectionHeading } from "@/types/site-content";

function SectionHeadingEditor({
  title,
  value,
  onChange,
}: {
  title: string;
  value: SiteSectionHeading;
  onChange: (value: SiteSectionHeading) => void;
}) {
  return (
    <div className="rounded-lg border p-4">
      <p className="mb-3 text-sm font-bold">{title}</p>
      <div className="grid gap-3 md:grid-cols-2">
        <AdminField
          label="Eyebrow"
          value={value.eyebrow ?? ""}
          onChange={(v) => onChange({ ...value, eyebrow: v || undefined })}
        />
        <AdminField label="Tiêu đề" value={value.title} onChange={(v) => onChange({ ...value, title: v })} />
        <div className="md:col-span-2">
          <AdminField
            label="Phụ đề"
            value={value.subtitle ?? ""}
            multiline
            onChange={(v) => onChange({ ...value, subtitle: v || undefined })}
          />
        </div>
      </div>
    </div>
  );
}

const ICON_OPTIONS: CommitmentIconKey[] = [
  "Shield",
  "Stethoscope",
  "TestTube",
  "Heart",
  "Sparkles",
  "FileText",
];

export function AdminHomePage() {
  const { content, updateContent } = useSiteContent();
  const h = content.home;

  return (
    <div className="space-y-8">
      <AdminSaveBar />
      <h2 className="font-serif text-2xl font-semibold text-primary">Nội dung trang chủ</h2>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-semibold">Banner (Hero)</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() =>
                updateContent((prev) => ({
                  ...prev,
                  home: {
                    ...prev.home,
                    heroSlides: [
                      ...prev.home.heroSlides,
                      {
                        id: crypto.randomUUID(),
                        src: "",
                        alt: "Banner mới",
                      },
                    ],
                  },
                }))
              }
            >
              + Thêm slide
            </Button>
          </div>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">
          Khung slideshow cố định {HERO_SLIDE_SIZE_LABEL} (tỉ lệ {HERO_SLIDE_WIDTH}:{HERO_SLIDE_HEIGHT}).
          Ảnh hoặc video khác kích thước vẫn hiển thị đúng khung — tự cắt vừa (object-cover). Nên dùng ảnh ngang
          cùng tỉ lệ để không bị mất nội dung quan trọng.
        </p>
        {h.heroSlides.map((slide, i) => {
          const isVideo = /\.(mp4|webm|mov|ogg)(\?|$)/i.test(slide.src);
          return (
          <div key={slide.id} className="mb-4 grid gap-3 border-b pb-4 last:border-0">
            <AdminImageField
              label={`Slide ${i + 1} — ảnh / video banner`}
              value={slide.src}
              allowVideo
              onChange={(v) =>
                updateContent((prev) => {
                  const slides = [...prev.home.heroSlides];
                  slides[i] = { ...slides[i], src: v };
                  return { ...prev, home: { ...prev.home, heroSlides: slides } };
                })
              }
            />
            {slide.src ? (
              <div className="max-w-xl">
                <p className="mb-1.5 text-xs text-muted-foreground">Xem trước khung slideshow</p>
                <div
                  className="overflow-hidden rounded-lg border bg-neutral-100"
                  style={{ aspectRatio: `${HERO_SLIDE_WIDTH} / ${HERO_SLIDE_HEIGHT}` }}
                >
                  {isVideo ? (
                    <video src={slide.src} className="h-full w-full object-cover object-center" muted controls />
                  ) : (
                    <img src={slide.src} alt="" className="h-full w-full object-cover object-center" />
                  )}
                </div>
              </div>
            ) : null}
            <AdminField
              label="Alt text"
              value={slide.alt}
              onChange={(v) =>
                updateContent((prev) => {
                  const slides = [...prev.home.heroSlides];
                  slides[i] = { ...slides[i], alt: v };
                  return { ...prev, home: { ...prev.home, heroSlides: slides } };
                })
              }
            />
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={i === 0}
                onClick={() =>
                  updateContent((prev) => {
                    const slides = [...prev.home.heroSlides];
                    [slides[i - 1], slides[i]] = [slides[i], slides[i - 1]];
                    return { ...prev, home: { ...prev.home, heroSlides: slides } };
                  })
                }
              >
                ↑ Lên
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={i === h.heroSlides.length - 1}
                onClick={() =>
                  updateContent((prev) => {
                    const slides = [...prev.home.heroSlides];
                    [slides[i], slides[i + 1]] = [slides[i + 1], slides[i]];
                    return { ...prev, home: { ...prev.home, heroSlides: slides } };
                  })
                }
              >
                ↓ Xuống
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="text-destructive"
                disabled={h.heroSlides.length <= 1}
                onClick={() => {
                  if (confirm("Xóa slide này?")) {
                    updateContent((prev) => ({
                      ...prev,
                      home: {
                        ...prev.home,
                        heroSlides: prev.home.heroSlides.filter((_, j) => j !== i),
                      },
                    }));
                  }
                }}
              >
                Xóa slide
              </Button>
            </div>
          </div>
        );
        })}
      </section>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-semibold">Dịch vụ nổi bật (2 thẻ ảnh)</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Ảnh nền hai cột Thẩm mỹ / Spa trên trang chủ — chọn từ kho hoặc tải mới.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <AdminImageField
            label="Ảnh cột Thẩm mỹ"
            value={h.featuredServiceImages[0]}
            onChange={(v) =>
              updateContent((p) => {
                const imgs = [...p.home.featuredServiceImages] as [string, string];
                imgs[0] = v;
                return { ...p, home: { ...p.home, featuredServiceImages: imgs } };
              })
            }
          />
          <AdminImageField
            label="Ảnh cột Spa"
            value={h.featuredServiceImages[1]}
            onChange={(v) =>
              updateContent((p) => {
                const imgs = [...p.home.featuredServiceImages] as [string, string];
                imgs[1] = v;
                return { ...p, home: { ...p.home, featuredServiceImages: imgs } };
              })
            }
          />
        </div>
      </section>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-semibold">Cam kết</h3>
        <AdminField label="Tiêu đề" value={h.commitmentsTitle} onChange={(v) => updateContent((p) => ({ ...p, home: { ...p.home, commitmentsTitle: v } }))} />
        <div className="mt-3">
          <AdminField label="Mô tả" value={h.commitmentsSubtitle} onChange={(v) => updateContent((p) => ({ ...p, home: { ...p.home, commitmentsSubtitle: v } }))} multiline />
        </div>
        <div className="mt-4 space-y-4">
          {h.commitments.map((c, i) => (
            <div key={c.id} className="rounded-lg border p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-bold">Ô {i + 1}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    updateContent((p) => ({
                      ...p,
                      home: {
                        ...p.home,
                        commitments: p.home.commitments.filter((x) => x.id !== c.id),
                      },
                    }))
                  }
                >
                  Xóa
                </Button>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="text-xs font-semibold text-muted-foreground">
                  Icon
                  <select
                    className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                    value={c.icon}
                    onChange={(e) =>
                      updateContent((p) => {
                        const list = [...p.home.commitments];
                        list[i] = { ...list[i], icon: e.target.value as CommitmentIconKey };
                        return { ...p, home: { ...p.home, commitments: list } };
                      })
                    }
                  >
                    {ICON_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </label>
                <AdminField
                  label="Tiêu đề"
                  value={c.title}
                  onChange={(v) =>
                    updateContent((p) => {
                      const list = [...p.home.commitments];
                      list[i] = { ...list[i], title: v };
                      return { ...p, home: { ...p.home, commitments: list } };
                    })
                  }
                />
              </div>
              <div className="mt-3">
                <AdminField
                  label="Mô tả"
                  value={c.desc}
                  onChange={(v) =>
                    updateContent((p) => {
                      const list = [...p.home.commitments];
                      list[i] = { ...list[i], desc: v };
                      return { ...p, home: { ...p.home, commitments: list } };
                    })
                  }
                  multiline
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-semibold">Giới thiệu</h3>
        <div className="grid gap-3">
          <AdminField label="Nhãn" value={h.aboutEyebrow} onChange={(v) => updateContent((p) => ({ ...p, home: { ...p.home, aboutEyebrow: v } }))} />
          <AdminField label="Tiêu đề" value={h.aboutTitle} onChange={(v) => updateContent((p) => ({ ...p, home: { ...p.home, aboutTitle: v } }))} />
          <AdminField label="Phụ đề" value={h.aboutSubtitle} onChange={(v) => updateContent((p) => ({ ...p, home: { ...p.home, aboutSubtitle: v } }))} />
          <AdminImageField label="Ảnh giới thiệu" value={h.aboutImage} onChange={(v) => updateContent((p) => ({ ...p, home: { ...p.home, aboutImage: v } }))} />
          {h.aboutParagraphs.map((para, i) => (
            <AdminField
              key={i}
              label={`Đoạn ${i + 1}`}
              value={para}
              onChange={(v) =>
                updateContent((p) => {
                  const paragraphs = [...p.home.aboutParagraphs];
                  paragraphs[i] = v;
                  return { ...p, home: { ...p.home, aboutParagraphs: paragraphs } };
                })
              }
              multiline
            />
          ))}
          <AdminField label="Alt ảnh giới thiệu" value={h.aboutImageAlt} onChange={(v) => updateContent((p) => ({ ...p, home: { ...p.home, aboutImageAlt: v } }))} />
          <AdminField label="Nút CTA giới thiệu" value={h.aboutCtaLabel} onChange={(v) => updateContent((p) => ({ ...p, home: { ...p.home, aboutCtaLabel: v } }))} />
        </div>
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Số liệu nổi bật</h4>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() =>
                updateContent((p) => ({
                  ...p,
                  home: {
                    ...p.home,
                    aboutStats: [...p.home.aboutStats, { value: "0", title: "Tiêu đề", sub: "Mô tả ngắn" }],
                  },
                }))
              }
            >
              + Thêm số liệu
            </Button>
          </div>
          {h.aboutStats.map((stat, i) => (
            <div key={i} className="grid gap-3 rounded-lg border p-3 md:grid-cols-[1fr_1fr_1fr_auto]">
              <AdminField
                label="Giá trị"
                value={stat.value}
                onChange={(v) =>
                  updateContent((p) => {
                    const aboutStats = [...p.home.aboutStats];
                    aboutStats[i] = { ...aboutStats[i], value: v };
                    return { ...p, home: { ...p.home, aboutStats } };
                  })
                }
              />
              <AdminField
                label="Tiêu đề"
                value={stat.title}
                onChange={(v) =>
                  updateContent((p) => {
                    const aboutStats = [...p.home.aboutStats];
                    aboutStats[i] = { ...aboutStats[i], title: v };
                    return { ...p, home: { ...p.home, aboutStats } };
                  })
                }
              />
              <AdminField
                label="Mô tả phụ"
                value={stat.sub}
                onChange={(v) =>
                  updateContent((p) => {
                    const aboutStats = [...p.home.aboutStats];
                    aboutStats[i] = { ...aboutStats[i], sub: v };
                    return { ...p, home: { ...p.home, aboutStats } };
                  })
                }
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="self-end text-destructive"
                onClick={() =>
                  updateContent((p) => ({
                    ...p,
                    home: { ...p.home, aboutStats: p.home.aboutStats.filter((_, j) => j !== i) },
                  }))
                }
              >
                Xóa
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-semibold">Tiêu đề các section trang chủ</h3>
        <div className="space-y-4">
          <SectionHeadingEditor
            title="Dịch vụ nổi bật"
            value={h.featuredServicesHeading}
            onChange={(featuredServicesHeading) => updateContent((p) => ({ ...p, home: { ...p.home, featuredServicesHeading } }))}
          />
          <div className="grid gap-3 md:grid-cols-2">
            <AdminField
              label="Nút khám phá (desktop)"
              value={h.featuredServicesExploreLabel}
              onChange={(v) => updateContent((p) => ({ ...p, home: { ...p.home, featuredServicesExploreLabel: v } }))}
            />
            <AdminField
              label="Nút xem dịch vụ (mobile)"
              value={h.featuredServicesMobileLabel}
              onChange={(v) => updateContent((p) => ({ ...p, home: { ...p.home, featuredServicesMobileLabel: v } }))}
            />
          </div>
          <SectionHeadingEditor
            title="Khách hàng thực tế"
            value={h.customersHeading}
            onChange={(customersHeading) => updateContent((p) => ({ ...p, home: { ...p.home, customersHeading } }))}
          />
          <SectionHeadingEditor
            title="Đội ngũ bác sĩ"
            value={h.doctorsHeading}
            onChange={(doctorsHeading) => updateContent((p) => ({ ...p, home: { ...p.home, doctorsHeading } }))}
          />
          <SectionHeadingEditor
            title="Quy trình thăm khám"
            value={h.processHeading}
            onChange={(processHeading) => updateContent((p) => ({ ...p, home: { ...p.home, processHeading } }))}
          />
          <AdminField
            label="Nút CTA quy trình"
            value={h.processCtaLabel}
            onChange={(v) => updateContent((p) => ({ ...p, home: { ...p.home, processCtaLabel: v } }))}
          />
          <SectionHeadingEditor
            title="Đánh giá khách hàng"
            value={h.testimonialsHeading}
            onChange={(testimonialsHeading) => updateContent((p) => ({ ...p, home: { ...p.home, testimonialsHeading } }))}
          />
          <AdminField
            label="Tiêu đề form đặt lịch"
            value={h.bookingTitle}
            onChange={(v) => updateContent((p) => ({ ...p, home: { ...p.home, bookingTitle: v } }))}
          />
        </div>
      </section>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-semibold">Cẩm nang & trang tin tức</h3>
        <div className="grid gap-3 md:grid-cols-2">
          <AdminField
            label="Tiêu đề section cẩm nang"
            value={content.handbook.title}
            onChange={(v) => updateContent((p) => ({ ...p, handbook: { ...p.handbook, title: v } }))}
          />
          <AdminField
            label="Nút xem tất cả"
            value={content.handbook.viewAllLabel}
            onChange={(v) => updateContent((p) => ({ ...p, handbook: { ...p.handbook, viewAllLabel: v } }))}
          />
          <AdminField
            label="Link xem tất cả"
            value={content.handbook.viewAllHref}
            onChange={(v) => updateContent((p) => ({ ...p, handbook: { ...p.handbook, viewAllHref: v } }))}
          />
          <AdminField
            label="Nhãn đọc bài"
            value={content.handbook.articleDetailLabel}
            onChange={(v) => updateContent((p) => ({ ...p, handbook: { ...p.handbook, articleDetailLabel: v } }))}
          />
          <AdminField
            label="Eyebrow trang tin tức"
            value={content.handbook.listEyebrow}
            onChange={(v) => updateContent((p) => ({ ...p, handbook: { ...p.handbook, listEyebrow: v } }))}
          />
          <div className="md:col-span-2">
            <AdminField
              label="Mô tả trang tin tức"
              value={content.handbook.listDescription}
              multiline
              onChange={(v) => updateContent((p) => ({ ...p, handbook: { ...p.handbook, listDescription: v } }))}
            />
          </div>
        </div>
      </section>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-semibold">Đánh giá khách hàng</h3>
        <AdminImageField
          label="Ảnh nền khối đánh giá"
          value={h.testimonialsBackground}
          onChange={(v) => updateContent((p) => ({ ...p, home: { ...p.home, testimonialsBackground: v } }))}
        />
      </section>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-semibold">CTA & Footer text</h3>
        <div className="grid gap-3">
          <AdminField label="CTA tiêu đề" value={h.ctaTitle} onChange={(v) => updateContent((p) => ({ ...p, home: { ...p.home, ctaTitle: v } }))} />
          <AdminField label="CTA mô tả" value={h.ctaDescription} onChange={(v) => updateContent((p) => ({ ...p, home: { ...p.home, ctaDescription: v } }))} multiline />
          <AdminImageField label="CTA ảnh (cột trái)" value={h.ctaImage} onChange={(v) => updateContent((p) => ({ ...p, home: { ...p.home, ctaImage: v } }))} />
          <AdminField label="Footer mô tả" value={h.footerDescription} onChange={(v) => updateContent((p) => ({ ...p, home: { ...p.home, footerDescription: v } }))} multiline />
          <AdminImageField label="Ảnh đặt lịch" value={h.bookingImage} onChange={(v) => updateContent((p) => ({ ...p, home: { ...p.home, bookingImage: v } }))} />
        </div>
      </section>
    </div>
  );
}
