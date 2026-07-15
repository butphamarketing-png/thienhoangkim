import { Link } from "wouter";
import type { ReactNode } from "react";
import { Facebook } from "lucide-react";
import { FACEBOOK_URL } from "@/config/contact";
import { LAZY_IMG } from "@/lib/image-loading";

const H2_LINE = /^##\s+(.+)$/;
const IMG_LINE = /^!\[([^\]]*)\]\(([^)]+)\)\s*$/;
const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

type ArticleBodyContentProps = {
  body: string;
  imageAlt?: string;
  /** Ẩn CTA fanpage nếu trang cha tự hiển thị */
  hideFacebookCta?: boolean;
  facebookUrl?: string;
};

/** Bỏ markdown **bold** — hiển thị chữ thường, không còn dấu * */
export function stripMarkdownBold(text: string): string {
  return text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*\*/g, "");
}

function renderInline(text: string, blockKey: string) {
  const clean = stripMarkdownBold(text);
  const parts: ReactNode[] = [];
  let last = 0;
  let linkIdx = 0;
  for (const m of clean.matchAll(LINK_RE)) {
    const start = m.index ?? 0;
    if (start > last) parts.push(clean.slice(last, start));
    const href = m[2];
    const label = m[1];
    if (href.startsWith("/")) {
      parts.push(
        <Link
          key={`${blockKey}-lnk-${linkIdx++}`}
          href={href}
          className="font-medium text-primary underline-offset-2 hover:underline"
        >
          {label}
        </Link>,
      );
    } else {
      parts.push(
        <a
          key={`${blockKey}-lnk-${linkIdx++}`}
          href={href}
          className="font-medium text-primary underline-offset-2 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>,
      );
    }
    last = start + m[0].length;
  }
  if (last < clean.length) parts.push(clean.slice(last));
  if (parts.length === 0) return clean;
  return parts;
}

export function ArticleBodyContent({
  body,
  imageAlt = "",
  hideFacebookCta = false,
  facebookUrl = FACEBOOK_URL,
}: ArticleBodyContentProps) {
  const blocks = body.split(/\n\n+/).filter(Boolean);
  const fbUrl = facebookUrl.trim() || FACEBOOK_URL;

  return (
    <div className="mt-8 space-y-4 text-base leading-relaxed text-foreground/85">
      {blocks.map((block, idx) => {
        const h2 = block.match(H2_LINE);
        if (h2) {
          return (
            <h2
              key={`h2-${idx}-${h2[1].slice(0, 24)}`}
              className="!mt-10 font-serif text-xl font-semibold leading-snug text-primary first:!mt-0 md:text-2xl"
            >
              {stripMarkdownBold(h2[1])}
            </h2>
          );
        }

        const img = block.match(IMG_LINE);
        if (img) {
          return (
            <figure key={`img-${idx}`} className="my-6">
              <img
                src={img[2]}
                alt={stripMarkdownBold(img[1] || imageAlt)}
                className="w-full rounded-2xl object-cover shadow-md"
                {...LAZY_IMG}
              />
            </figure>
          );
        }

        return (
          <p key={`p-${idx}-${block.slice(0, 24)}`}>{renderInline(block, `p-${idx}`)}</p>
        );
      })}

      {!hideFacebookCta && fbUrl && fbUrl !== "#" ? (
        <aside className="mt-10 rounded-2xl border border-primary/15 bg-primary/[0.04] p-5 md:p-6">
          <p className="text-base leading-relaxed text-foreground/90">
            Theo dõi fanpage{" "}
            <a
              href={fbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline-offset-2 hover:underline"
            >
              Thiên Hoàng Kim Aesthetic Clinic
            </a>{" "}
            để cập nhật kiến thức làm đẹp, case thực tế và nhận tư vấn nhanh qua Messenger.
          </p>
          <a
            href={fbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
          >
            <Facebook className="h-4 w-4" aria-hidden />
            facebook.com/chuyenkhoathammy.thienhoangkim
          </a>
        </aside>
      ) : null}
    </div>
  );
}
