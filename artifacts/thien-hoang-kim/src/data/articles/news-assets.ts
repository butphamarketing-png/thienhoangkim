/** Ảnh dùng trong body bài tin tức — cùng pattern publicAsset */
const base = `${import.meta.env.BASE_URL}`.replace(/([^:]\/)\/+/g, "$1");

export const NEWS_IMG_INTRO = `${base}gioithieu.1.png`;
/** Dùng chung ảnh portrait — không dùng banner slideshow trong tin tức */
export const NEWS_IMG_SLIDE = NEWS_IMG_INTRO;
