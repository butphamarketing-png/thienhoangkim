/** Ảnh dưới fold — trì hoãn tải để cải thiện LCP */
export const LAZY_IMG = {
  loading: "lazy" as const,
  decoding: "async" as const,
};

/** Ảnh hero / above-the-fold */
export const EAGER_IMG = {
  loading: "eager" as const,
  decoding: "async" as const,
  fetchPriority: "high" as const,
};
