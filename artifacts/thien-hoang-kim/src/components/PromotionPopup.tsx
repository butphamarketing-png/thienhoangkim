import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/context/SiteContentContext";
import { useLocation } from "wouter";

type Props = {
  externalOpen?: boolean;
  onExternalClose?: () => void;
};

export function PromotionPopup({ externalOpen, onExternalClose }: Props) {
  const { content } = useSiteContent();
  const cfg = content.promotion;
  const [, navigate] = useLocation();

  const handleClose = () => {
    onExternalClose?.();
  };

  const handleButtonClick = () => {
    navigate(cfg.buttonUrl);
    handleClose();
  };

  if (!cfg?.enabled) return null;

  return (
    <AnimatePresence>
      {externalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-primary/25 backdrop-blur-[4px]"
            onClick={handleClose}
          />

          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-[28px] border border-white/60 bg-gradient-to-br from-[#e8f7f0] via-[#d4efe6] to-[#b8e4d4] shadow-[0_24px_60px_rgba(26,80,60,0.22)]"
          >
            <div className="pointer-events-none absolute -top-20 right-0 h-40 w-40 rounded-full bg-white/50 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-16 left-0 h-44 w-44 rounded-full bg-[#c9a227]/15 blur-3xl" />

            <div className="sticky top-0 z-20 flex items-center justify-between gap-2 border-b border-primary/10 bg-white/50 px-3 py-2.5 backdrop-blur-sm">
              <div className="min-w-0">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#9a7b2e]">
                  <Sparkles className="mb-0.5 mr-1 inline h-3 w-3 text-[#c9a227]" />
                  Khuyến mãi đặc biệt
                </span>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="inline-flex shrink-0 items-center justify-center rounded-full border border-primary/15 bg-white/90 p-2 text-primary shadow-sm transition hover:bg-white"
                aria-label="Đóng"
                title="Đóng"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative max-h-[86vh] overflow-y-auto p-5">
              <div className="flex flex-col gap-4">
                <div className="relative rounded-[22px] border border-white/80 bg-white/70 overflow-hidden shadow-[0_12px_40px_rgba(26,80,60,0.12)]">
                  <img
                    src={cfg.image}
                    alt={cfg.title}
                    className="w-full h-48 object-cover"
                  />
                </div>

                <div className="text-center">
                  <h2 className="font-serif text-[22px] font-semibold tracking-tight text-primary">
                    {cfg.title}
                  </h2>
                  <p className="mt-2 text-[12px] text-primary/70">
                    {cfg.description}
                  </p>
                </div>

                <Button
                  onClick={handleButtonClick}
                  className="h-12 w-full rounded-full bg-gradient-to-r from-[#c9a227] via-[#e8d48b] to-[#c9a227] font-bold text-primary shadow-[0_12px_32px_rgba(201,162,39,0.35)] hover:brightness-[1.03]"
                >
                  {cfg.buttonLabel}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
