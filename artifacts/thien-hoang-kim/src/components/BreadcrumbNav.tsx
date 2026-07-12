import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

export type BreadcrumbCrumb = { label: string; href?: string };

type BreadcrumbNavProps = {
  crumbs: BreadcrumbCrumb[];
  className?: string;
};

export function BreadcrumbNav({ crumbs, className = "" }: BreadcrumbNavProps) {
  if (!crumbs.length) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex flex-wrap items-center gap-1 text-xs text-muted-foreground md:text-sm ${className}`}
    >
      {crumbs.map((c, i) => (
        <span key={`${c.label}-${i}`} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden />}
          {c.href ? (
            <Link href={c.href} className="hover:text-primary">
              {c.label}
            </Link>
          ) : (
            <span className="font-medium text-foreground">{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
