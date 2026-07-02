import {
  Globe,
  Headphones,
  Mail,
  MessageCircle,
  Phone,
  Shield,
  Tags,
} from "lucide-react";
import { BP_LOGIN } from "@/admin/login/bp-login-data";

const CONTACT_ICONS = {
  HOTLINE: Phone,
  WEBSITE: Globe,
  EMAIL: Mail,
  ZALO: MessageCircle,
} as const;

function BpmLogo({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <img
      src={BP_LOGIN.logoSrc}
      alt={BP_LOGIN.agencyName}
      className={`${className} rounded-xl object-cover shadow-lg shadow-violet-500/30`}
      width={44}
      height={44}
    />
  );
}

function ContactCard({
  label,
  value,
  href,
  external,
}: {
  label: keyof typeof CONTACT_ICONS;
  value: string;
  href: string;
  external: boolean;
}) {
  const Icon = CONTACT_ICONS[label];
  const linkProps = external
    ? { target: "_blank" as const, rel: "noopener noreferrer" as const }
    : {};

  return (
    <a
      href={href}
      {...linkProps}
      className="group flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-[10px] transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/30 hover:shadow-lg hover:shadow-violet-500/20"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-violet-500 group-hover:to-purple-600 group-hover:shadow-[0_0_12px_rgba(139,92,246,0.4)]">
        <Icon className="h-4 w-4 text-violet-300 transition-colors duration-300 group-hover:text-white" />
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-violet-400">{label}</p>
        <p className="mt-0.5 truncate text-sm font-medium text-white/90 transition-colors duration-300 group-hover:text-violet-100">
          {value}
        </p>
      </div>
    </a>
  );
}

function ServiceCard({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: "tags" | "headphones";
}) {
  const Icon = icon === "tags" ? Tags : Headphones;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-[10px] transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:shadow-lg hover:shadow-violet-500/20"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-violet-500 group-hover:to-purple-600 group-hover:shadow-[0_0_12px_rgba(139,92,246,0.4)]">
        <Icon className="h-5 w-5 text-violet-300 transition-colors duration-300 group-hover:text-white" />
      </div>
      <div>
        <p className="font-semibold text-white transition-colors duration-300 group-hover:text-violet-100">
          {title}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-white/40 transition-colors duration-300 group-hover:text-white/55">
          {description}
        </p>
      </div>
    </a>
  );
}

function PanelBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage:
            "linear-gradient(rgba(124,58,237,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-indigo-600/15 blur-3xl" />
    </div>
  );
}

/** Panel phải desktop + compact mobile */
export function AdminLoginBrandingPanel({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <section className="relative bg-[#0f0a1f] px-4 py-8 lg:hidden">
        <PanelBackground />
        <div className="relative z-10 mx-auto max-w-lg">
          <p className="text-center text-sm font-bold uppercase tracking-wider text-violet-300">
            Dịch vụ Bứt Phá Marketing
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {BP_LOGIN.contacts.map((c) => (
              <ContactCard
                key={c.label}
                label={c.label as keyof typeof CONTACT_ICONS}
                value={c.value}
                href={c.href}
                external={c.external}
              />
            ))}
          </div>
          <p className="mt-6 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-violet-400">
            Dịch vụ của chúng tôi
          </p>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {BP_LOGIN.services.map((s) => (
              <ServiceCard
                key={s.title}
                title={s.title}
                description={s.description}
                href={s.href}
                icon={s.icon}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative hidden h-full min-h-screen flex-col bg-[#0f0a1f] px-8 py-10 xl:px-12 lg:flex lg:w-[58%]">
      <PanelBackground />
      <div className="relative z-10 flex h-full min-h-0 flex-col">
        <header className="flex items-center gap-3">
          <BpmLogo />
          <div>
            <p className="text-sm font-extrabold uppercase tracking-wide text-white">
              {BP_LOGIN.agencyName}
            </p>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-violet-400">
              Dành cho khách hàng
            </p>
          </div>
        </header>

        <div className="mt-10">
          <h2 className="text-3xl font-extrabold leading-tight text-white xl:text-4xl">
            QUẢN LÝ
            <br />
            MARKETING &amp; WEBSITE
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-violet-200/80">
            Dành riêng cho khách hàng {BP_LOGIN.agencyName} —{" "}
            <span className="font-semibold text-violet-100">{BP_LOGIN.clientName}</span>.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 xl:grid-cols-4">
          {BP_LOGIN.contacts.map((c) => (
            <ContactCard
              key={c.label}
              label={c.label as keyof typeof CONTACT_ICONS}
              value={c.value}
              href={c.href}
              external={c.external}
            />
          ))}
        </div>

        <div className="mt-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-400">
            Dịch vụ của chúng tôi
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {BP_LOGIN.services.map((s) => (
              <ServiceCard
                key={s.title}
                title={s.title}
                description={s.description}
                href={s.href}
                icon={s.icon}
              />
            ))}
          </div>
        </div>

        <footer className="mt-auto flex items-center justify-between border-t border-white/10 pt-6">
          <p className="flex items-center gap-2 text-xs text-violet-300/90">
            <Shield className="h-3.5 w-3.5" />
            Powered by {BP_LOGIN.agencyName}
          </p>
          <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-300">
            Phiên bản {BP_LOGIN.version}
          </span>
        </footer>
      </div>
    </section>
  );
}

export { BpmLogo };
