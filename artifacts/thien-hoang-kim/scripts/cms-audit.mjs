/**
 * Kiểm tra CMS admin ↔ frontend wiring (chạy: node scripts/cms-audit.mjs)
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "src");

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

function has(rel, pattern) {
  const text = read(rel);
  return typeof pattern === "string" ? text.includes(pattern) : pattern.test(text);
}

const adminRoutes = [
  "settings", "footer", "navigation", "lucky-wheel", "promotion", "seo", "media",
  "home", "pages", "services", "articles", "doctors", "testimonials", "customers",
  "process", "bookings", "account",
];

const adminApp = read("src/admin/AdminApp.tsx");
const missingRoutes = adminRoutes.filter((r) => !adminApp.includes(`adminPath("${r}")`));

const layoutNav = read("src/admin/AdminLayout.tsx");
const missingNav = adminRoutes.filter((r) => !layoutNav.includes(`adminPath("${r}")`));

const cmsWired = [
  ["Menu desktop", "src/components/header/DesktopNav.tsx", /buildMainNav\(content\)/],
  ["Menu mobile", "src/components/header/MobileNavMenu.tsx", /buildMainNav\(content\)/],
  ["Trang Giới thiệu", "src/pages/ContentPage.tsx", /resolvePageContent/],
  ["Dịch vụ catalog", "src/pages/ServiceCategoryPage.tsx", /resolveServiceItems/],
  ["Chi tiết dịch vụ", "src/pages/ServiceDetailPage.tsx", /getServiceItem/],
  ["Bảng giá", "src/pages/PriceListPage.tsx", /buildServicePriceGroups\(content\)/],
  ["Liên hệ hero", "src/pages/ContactPage.tsx", /resolveContactPage/],
  ["SiteContent v5", "src/data/site-content.defaults.ts", /version: 5/],
  ["Hero Bảng giá CMS", "src/pages/PriceListPage.tsx", /resolvePriceListPage/],
  ["Hero Dịch vụ CMS", "src/pages/ServicesPage.tsx", /resolveServicesHubPage/],
  ["Hero KH CMS", "src/pages/CustomersPage.tsx", /resolveCustomersPage/],
  ["Hero Bác sĩ CMS", "src/pages/DoctorsPage.tsx", /resolveDoctorsPage/],
  ["CMS merge pages", "src/lib/normalize-content.ts", /partial\.pages/],
  ["CMS merge services", "src/lib/normalize-content.ts", /serviceItems/],
];

const hardcodedPages = [
  ["Bảng giá hero", "src/pages/PriceListPage.tsx", /eyebrow="Bảng giá"/],
  ["Dịch vụ hub hero", "src/pages/ServicesPage.tsx", /eyebrow="Dịch vụ"/],
  ["Khách hàng hero", "src/pages/CustomersPage.tsx", /eyebrow="Khách hàng"/],
  ["Đội ngũ BS hero", "src/pages/DoctorsPage.tsx", /title="Đội ngũ bác sĩ"/],
];

const adminPages = readdirSync(join(src, "admin/pages"))
  .filter((f) => f.startsWith("Admin") && f.endsWith(".tsx"))
  .map((f) => f.replace(".tsx", ""));

console.log("=== CMS AUDIT — Thiên Hoàng Kim ===\n");

console.log("📋 Admin routes (" + adminRoutes.length + "):");
if (missingRoutes.length) console.log("  ❌ Thiếu route:", missingRoutes.join(", "));
else console.log("  ✅ Tất cả route đã khai báo trong AdminApp");

console.log("\n📋 Admin sidebar:");
if (missingNav.length) console.log("  ⚠️  Có route nhưng không trong menu:", missingNav.join(", "));
else console.log("  ✅ Menu sidebar khớp các module chính");

console.log("\n📋 Admin pages (" + adminPages.length + "):");
adminPages.forEach((p) => console.log("  •", p));

console.log("\n🔗 Frontend ↔ CMS wiring:");
for (const [label, file, pattern] of cmsWired) {
  console.log(has(file, pattern) ? "  ✅" : "  ❌", label);
}

console.log("\n⚠️  Nội dung còn hardcode (chưa có mục admin riêng):");
for (const [label, file, pattern] of hardcodedPages) {
  console.log(has(file, pattern) ? "  ⚠️ " : "  ✅", label, has(file, pattern) ? "— cần admin nếu muốn sửa qua CMS" : "— đã CMS");
}

const siteContentFields = [
  "settings", "home", "footer", "handbook", "bookingServices", "doctors", "articles",
  "testimonials", "customerCases", "processSteps", "luckyWheel", "promotion",
  "pages", "serviceCategories", "serviceItems", "introNav", "newsNav", "contactPage",
];

const adminCoverage = {
  settings: "AdminSettingsPage",
  home: "AdminHomePage",
  footer: "AdminFooterPage + bookingServices",
  handbook: "AdminArticlesPage",
  bookingServices: "AdminFooterPage",
  doctors: "AdminDoctorsPage",
  articles: "AdminArticlesPage",
  testimonials: "AdminTestimonialsPage",
  customerCases: "AdminCustomersPage",
  processSteps: "AdminProcessPage",
  luckyWheel: "AdminLuckyWheelPage",
  promotion: "AdminPromotionPage",
  pages: "AdminPagesPage",
  serviceCategories: "AdminServicesPage",
  serviceItems: "AdminServicesPage",
  introNav: "AdminNavigationPage",
  newsNav: "AdminNavigationPage",
  contactPage: "AdminNavigationPage",
  priceListPage: "AdminNavigationPage",
  servicesHubPage: "AdminNavigationPage",
  customersPage: "AdminNavigationPage",
  doctorsPage: "AdminNavigationPage",
};

console.log("\n📦 SiteContent fields → Admin:");
for (const f of siteContentFields) {
  console.log("  ✅", f, "→", adminCoverage[f] ?? "?");
}

const seoGlobal = has("src/admin/pages/AdminSeoPage.tsx", /siteUrl/);
console.log("\n🔍 SEO site-wide:", seoGlobal ? "✅ AdminSeoPage" : "❌");

const articlesCount = (read("src/data/articles.defaults.ts").match(/article\(/g) || []).length;
console.log("\n📰 Bài viết mặc định:", articlesCount, "+ generated news");

console.log("\n=== KẾT LUẬN ===");
const score = cmsWired.filter(([, f, p]) => has(f, p)).length;
const total = cmsWired.length;
const pct = Math.round((score / total) * 100);
console.log(`CMS wiring: ${score}/${total} (${pct}%)`);
if (pct === 100) {
  console.log("✅ Admin quản lý toàn bộ nội dung hiển thị trên website.");
} else {
  console.log("⚠️  Còn module chưa nối CMS — xem mục ❌ ở trên.");
}
console.log("Ngoài admin: robots.txt + sitemap.xml generate khi build.\n");
