import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Lock, Mail, Shield, Sparkles } from "lucide-react";
import { Redirect, useLocation } from "wouter";
import { adminPath } from "@/config/admin";
import { AdminLoginBrandingPanel, BpmLogo } from "@/admin/login/AdminLoginBrandingPanel";
import { BP_LOGIN, cmsEmailPlaceholder } from "@/admin/login/bp-login-data";
import { isAdminLoggedIn, loginAdmin } from "@/lib/admin-auth";
import { toast } from "@/hooks/use-toast";

function tryLogin(emailOrUser: string, password: string): boolean {
  const value = emailOrUser.trim();
  if (loginAdmin(value, password)) return true;
  if (value.includes("@")) {
    const local = value.split("@")[0]?.trim();
    if (local && loginAdmin(local, password)) return true;
  }
  return false;
}

export function AdminLoginPage() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (isAdminLoggedIn()) {
    return <Redirect to={adminPath()} />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const ok = tryLogin(email, password);
    setSubmitting(false);
    if (ok) {
      setLocation(adminPath());
      return;
    }
    toast({ title: "Sai tài khoản hoặc mật khẩu", variant: "destructive" });
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Cột trái — form */}
      <div className="flex min-h-screen w-full flex-col bg-white lg:w-[42%]">
        <div className="flex flex-1 flex-col px-6 py-8 sm:px-10 sm:py-10 lg:px-12 xl:px-16">
          <header className="flex items-center gap-3">
            <BpmLogo />
            <div>
              <p className="text-sm font-extrabold tracking-tight text-[#1e1b4b] sm:text-base">
                BỨT PHÁ MARKETING
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#7c3aed]">
                CMS Khách hàng
              </p>
            </div>
          </header>

          <div className="mt-10 flex flex-1 flex-col">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#7c3aed]" aria-hidden />
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7c3aed]">
                Khu vực quản trị hệ thống
              </p>
            </div>

            <h1 className="mt-4 text-3xl font-extrabold text-[#0f172a] sm:text-4xl">Đăng nhập CMS</h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">
              Quản lý website{" "}
              <span className="font-semibold text-slate-700">{BP_LOGIN.clientName}</span> — nội dung,
              marketing và dịch vụ Bứt Phá.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 w-full max-w-md space-y-5">
              <div className="space-y-2">
                <label htmlFor="admin-email" className="text-sm font-semibold text-slate-700">
                  Email quản trị
                </label>
                <div className="relative">
                  <Mail
                    className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                    aria-hidden
                  />
                  <input
                    id="admin-email"
                    type="email"
                    autoComplete="username"
                    autoFocus
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={cmsEmailPlaceholder()}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[#7c3aed] focus:ring-2 focus:ring-violet-100"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="admin-password" className="text-sm font-semibold text-slate-700">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock
                    className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                    aria-hidden
                  />
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-12 text-sm text-slate-900 outline-none transition-colors focus:border-[#7c3aed] focus:ring-2 focus:ring-violet-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition-colors hover:text-slate-600"
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition-all hover:from-[#6d28d9] hover:to-[#5b21b6] disabled:opacity-70"
              >
                Đăng nhập CMS
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <footer className="mt-auto hidden items-center gap-2 pt-10 text-xs text-slate-400 lg:flex">
              <Shield className="h-3.5 w-3.5" aria-hidden />
              © {BP_LOGIN.agencyName} · {BP_LOGIN.clientName}
            </footer>
          </div>
        </div>
      </div>

      {/* Cột phải desktop */}
      <AdminLoginBrandingPanel />

      {/* Panel compact mobile */}
      <AdminLoginBrandingPanel compact />
    </div>
  );
}
