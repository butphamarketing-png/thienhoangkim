import { cn } from "@/lib/utils";
import { useDelayedClass } from "@/hooks/useDelayedClass";
import { resolveLogoUrl } from "@/lib/brand-assets";
import { useSiteContent } from "@/context/SiteContentContext";

type HeaderBrandProps = {
  /** Header trắng = dark text; footer xanh = light text */
  variant?: "header" | "footer";
  className?: string;
};

/** Logo design: icon tách nền + chữ bên cạnh */
export function HeaderBrand({ variant = "header", className = "" }: HeaderBrandProps) {
  const { content } = useSiteContent();
  const { settings } = content;
  const isFooter = variant === "footer";
  const shine = useDelayedClass(5000, 12000);
  const logoSrc = resolveLogoUrl(settings);

  return (
    <div className={cn("flex items-center gap-3 md:gap-3.5", className)}>
      <img
        src={logoSrc}
        alt=""
        className={cn(
          "shrink-0 object-contain object-center transition-[filter] duration-300",
          isFooter ? "h-11 w-auto md:h-12" : "h-12 w-auto md:h-14",
          !isFooter && shine && "logo-shine",
        )}
        aria-hidden
      />
      <div className="flex min-w-0 flex-col justify-center leading-none">
        <span
          className={cn(
            "whitespace-nowrap font-serif font-bold uppercase tracking-wide",
            isFooter ? "text-base md:text-lg" : "text-sm md:text-base",
            isFooter ? "text-[#e8d48b]" : "text-gold-gradient",
          )}
        >
          {settings.clinicName}
        </span>
        <span
          className={cn(
            "mt-0.5 whitespace-nowrap font-serif font-semibold uppercase tracking-[0.16em] text-[9px] md:text-[10px]",
            isFooter ? "text-white/65" : "text-primary",
          )}
        >
          {settings.clinicSubtitle}
        </span>
      </div>
    </div>
  );
}
