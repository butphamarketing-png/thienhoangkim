import { SEO_DESCRIPTION_MAX, SEO_TITLE_MAX } from "@/lib/seo";

export type SeoCheckStatus = "good" | "ok" | "bad";

export type SeoCheck = {
  id: string;
  status: SeoCheckStatus;
  label: string;
  hint?: string;
};

export type SeoAnalysisInput = {
  focusKeyphrase: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  h1: string;
  bodyText: string;
  hasImage: boolean;
  canonicalUrl?: string;
  /** Tiêu đề H2 trích từ body (## ...) */
  h2Headings?: string[];
  /** Alt ảnh đại diện + ảnh trong body */
  imageAlts?: string[];
};

export type SeoAnalysisResult = {
  score: number;
  checks: SeoCheck[];
};

function normalizeText(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .trim();
}

export function containsKeyphrase(text: string, keyphrase: string) {
  const k = normalizeText(keyphrase);
  if (!k || k.length < 2) return false;
  return normalizeText(text).includes(k);
}

function countKeyphrase(text: string, keyphrase: string) {
  const k = normalizeText(keyphrase);
  if (!k) return 0;
  const t = normalizeText(text);
  let count = 0;
  let pos = 0;
  while ((pos = t.indexOf(k, pos)) !== -1) {
    count += 1;
    pos += k.length;
  }
  return count;
}

export function analyzeSeo(input: SeoAnalysisInput): SeoAnalysisResult {
  const checks: SeoCheck[] = [];
  const title = input.metaTitle.trim();
  const desc = input.metaDescription.trim();
  const keyphrase = input.focusKeyphrase.trim();
  const titleLen = title.length;
  const descLen = desc.length;

  if (!title) {
    checks.push({ id: "title-missing", status: "bad", label: "Chưa có tiêu đề SEO" });
  } else if (titleLen < 30) {
    checks.push({
      id: "title-short",
      status: "ok",
      label: "Tiêu đề SEO hơi ngắn",
      hint: `Hiện ${titleLen} ký tự — nên 30–60 ký tự`,
    });
  } else if (titleLen > SEO_TITLE_MAX) {
    checks.push({
      id: "title-long",
      status: "bad",
      label: "Tiêu đề SEO quá dài",
      hint: `Google có thể cắt bớt (${titleLen}/${SEO_TITLE_MAX})`,
    });
  } else {
    checks.push({ id: "title-ok", status: "good", label: "Độ dài tiêu đề SEO tốt" });
  }

  if (!desc) {
    checks.push({ id: "desc-missing", status: "bad", label: "Chưa có mô tả meta" });
  } else if (descLen < 70) {
    checks.push({
      id: "desc-short",
      status: "ok",
      label: "Mô tả meta hơi ngắn",
      hint: `Nên 120–160 ký tự (hiện ${descLen})`,
    });
  } else if (descLen > SEO_DESCRIPTION_MAX) {
    checks.push({
      id: "desc-long",
      status: "bad",
      label: "Mô tả meta quá dài",
      hint: `${descLen}/${SEO_DESCRIPTION_MAX} ký tự`,
    });
  } else {
    checks.push({ id: "desc-ok", status: "good", label: "Độ dài mô tả meta tốt" });
  }

  if (!keyphrase) {
    checks.push({
      id: "keyphrase-missing",
      status: "ok",
      label: "Chưa đặt từ khóa chính (focus keyphrase)",
      hint: "Thêm từ khóa mục tiêu để phân tích như Yoast",
    });
  } else {
    if (containsKeyphrase(title, keyphrase)) {
      checks.push({ id: "kp-title", status: "good", label: "Từ khóa có trong tiêu đề SEO" });
    } else {
      checks.push({
        id: "kp-title",
        status: "bad",
        label: "Từ khóa chưa có trong tiêu đề SEO",
        hint: `Thêm "${keyphrase}" vào title`,
      });
    }

    if (containsKeyphrase(desc, keyphrase)) {
      checks.push({ id: "kp-desc", status: "good", label: "Từ khóa có trong mô tả meta" });
    } else {
      checks.push({
        id: "kp-desc",
        status: "ok",
        label: "Từ khóa chưa có trong mô tả meta",
      });
    }

    if (containsKeyphrase(input.h1, keyphrase)) {
      checks.push({ id: "kp-h1", status: "good", label: "Từ khóa có trong tiêu đề H1" });
    } else {
      checks.push({
        id: "kp-h1",
        status: "bad",
        label: "Từ khóa chưa có trong H1",
        hint: `Thêm "${keyphrase}" vào tiêu đề bài`,
      });
    }

    if (containsKeyphrase(input.slug, keyphrase)) {
      checks.push({ id: "kp-slug", status: "good", label: "Từ khóa có trong URL (slug)" });
    } else {
      checks.push({
        id: "kp-slug",
        status: "bad",
        label: "Từ khóa chưa có trong slug URL",
        hint: `Slug nên chứa "${keyphrase}" (không dấu)`,
      });
    }

    const h2s = input.h2Headings ?? [];
    if (h2s.some((h) => containsKeyphrase(h, keyphrase))) {
      checks.push({ id: "kp-h2", status: "good", label: "Từ khóa có trong ít nhất một H2" });
    } else if (h2s.length === 0) {
      checks.push({ id: "kp-h2", status: "ok", label: "Chưa có tiêu đề H2 (##) trong nội dung" });
    } else {
      checks.push({
        id: "kp-h2",
        status: "bad",
        label: "Từ khóa chưa có trong bất kỳ H2 nào",
        hint: `Thêm ## tiêu đề chứa "${keyphrase}"`,
      });
    }

    const alts = input.imageAlts ?? [];
    if (alts.some((a) => containsKeyphrase(a, keyphrase))) {
      checks.push({ id: "kp-alt", status: "good", label: "Từ khóa có trong alt ảnh" });
    } else if (alts.length === 0) {
      checks.push({ id: "kp-alt", status: "ok", label: "Chưa có ảnh để kiểm tra alt" });
    } else {
      checks.push({
        id: "kp-alt",
        status: "bad",
        label: "Từ khóa chưa có trong alt ảnh",
        hint: `Alt ảnh nên chứa "${keyphrase}"`,
      });
    }

    const bodyCount = countKeyphrase(input.bodyText, keyphrase);
    if (bodyCount === 0) {
      checks.push({ id: "kp-body", status: "bad", label: "Từ khóa chưa xuất hiện trong nội dung" });
    } else if (bodyCount > 8) {
      checks.push({
        id: "kp-density",
        status: "ok",
        label: "Từ khóa lặp nhiều trong bài",
        hint: `${bodyCount} lần — tránh nhồi từ khóa`,
      });
    } else {
      checks.push({
        id: "kp-body",
        status: "good",
        label: "Từ khóa xuất hiện trong nội dung",
        hint: `${bodyCount} lần`,
      });
    }
  }

  if (input.hasImage) {
    checks.push({ id: "image", status: "good", label: "Có ảnh đại diện / OG" });
  } else {
    checks.push({
      id: "image",
      status: "ok",
      label: "Chưa có ảnh — nên thêm ảnh chia sẻ",
    });
  }

  if (input.slug.length > 3 && input.slug.length < 80) {
    checks.push({ id: "slug-ok", status: "good", label: "URL (slug) gọn, thân thiện SEO" });
  } else {
    checks.push({ id: "slug", status: "ok", label: "Kiểm tra lại slug URL" });
  }

  const good = checks.filter((c) => c.status === "good").length;
  const ok = checks.filter((c) => c.status === "ok").length;
  const bad = checks.filter((c) => c.status === "bad").length;
  const total = checks.length || 1;
  const score = Math.round(((good * 1 + ok * 0.5) / total) * 100 - bad * 8);
  const clamped = Math.max(0, Math.min(100, score));

  return { score: clamped, checks };
}

export function scoreColor(score: number) {
  if (score >= 80) return "text-emerald-600";
  if (score >= 50) return "text-amber-600";
  return "text-red-600";
}

export function scoreLabel(score: number) {
  if (score >= 80) return "Tốt";
  if (score >= 50) return "Cần cải thiện";
  return "Yếu";
}
