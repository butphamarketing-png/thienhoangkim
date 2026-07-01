import { Link } from "wouter";
import type { ReactNode } from "react";

const H2_LINE = /^##\s+(.+)$/;
const IMG_LINE = /^!\[([^\]]*)\]\(([^)]+)\)\s*$/;
const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

type ArticleBodyContentProps = {
  body: string;
  imageAlt?: string;
};

function renderInline(text: string, blockKey: string) {
  const parts: ReactNode[] = [];
  let last = 0;
  let linkIdx = 0;
  for (const m of text.matchAll(LINK_RE)) {
    const start = m.index ?? 0;
    if (start > last) parts.push(text.slice(last, start));
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
  if (last < text.length) parts.push(text.slice(last));
  if (parts.length === 0) return text;
  return parts;
}

export function ArticleBodyContent({ body, imageAlt = "" }: ArticleBodyContentProps) {
  const blocks = body.split(/\n\n+/).filter(Boolean);

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
              {h2[1]}
            </h2>
          );
        }

        const img = block.match(IMG_LINE);
        if (img) {
          return (
            <figure key={`img-${idx}`} className="my-6">
              <img
                src={img[2]}
                alt={img[1] || imageAlt}
                className="w-full rounded-2xl object-cover shadow-md"
              />
            </figure>
          );
        }

        return (
          <p key={`p-${idx}-${block.slice(0, 24)}`}>{renderInline(block, `p-${idx}`)}</p>
        );
      })}
    </div>
  );
}
