import { motion } from "framer-motion";
import { Gift } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";

type Props = { onLuckyWheelClick: () => void; onPromotionClick: () => void };

export function LuckyWheelFloatingIcon({ onLuckyWheelClick, onPromotionClick }: Props) {
  const { content } = useSiteContent();
  const wheelCfg = content.luckyWheel;
  const promoCfg = content.promotion;

  if (!wheelCfg?.enabled && !promoCfg?.enabled) return null;

  return (
    <div className="fixed bottom-28 left-4 z-[9998] flex flex-col gap-3 sm:bottom-8 sm:left-6 md:bottom-10 md:left-8">
      {promoCfg?.enabled && (
        <motion.button
          type="button"
          onClick={onPromotionClick}
          className="flex h-14 w-14 flex-col items-center justify-center rounded-full border-2 border-[#c9a227] bg-gradient-to-br from-[#c9a227] to-[#e8d48b] shadow-[0_12px_32px_rgba(26,80,60,0.2)] focus:outline-none"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          aria-label="Chương trình khuyến mãi"
          title="Chương trình khuyến mãi"
        >
          <Gift className="h-8 w-8 text-primary" />
          <span className="mt-0.5 rounded-full bg-white px-1.5 py-0.5 text-[9px] font-extrabold leading-[1.15] text-primary shadow-sm">
            Khuyến mãi
          </span>
        </motion.button>
      )}

      {wheelCfg?.enabled && (
        <motion.button
          type="button"
          onClick={onLuckyWheelClick}
          className="flex h-14 w-14 flex-col items-center justify-center rounded-full border-2 border-[#c9a227] bg-gradient-to-br from-[#d4efe6] to-[#b8e4d4] shadow-[0_12px_32px_rgba(26,80,60,0.2)] focus:outline-none"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          aria-label="Vòng quay may mắn"
          title="Vòng quay may mắn"
        >
          {/* Mini wheel SVG */}
          <svg viewBox="0 0 40 40" className="h-8 w-8" aria-hidden="true">
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const colors = ["#1a3328", "#2d6b4f", "#1a3328", "#4a9c6f", "#1a3328", "#2d6b4f"];
              const angle = (i * 60 * Math.PI) / 180;
              const nextAngle = ((i + 1) * 60 * Math.PI) / 180;
              const x1 = 20 + 18 * Math.cos(angle);
              const y1 = 20 + 18 * Math.sin(angle);
              const x2 = 20 + 18 * Math.cos(nextAngle);
              const y2 = 20 + 18 * Math.sin(nextAngle);
              return (
                <path
                  key={i}
                  d={`M20,20 L${x1},${y1} A18,18 0 0,1 ${x2},${y2} Z`}
                  fill={colors[i]}
                  stroke="#c8a96e"
                  strokeWidth="0.5"
                />
              );
            })}
            <circle cx="20" cy="20" r="5" fill="#e8d48b" />
            <text x="20" y="24" textAnchor="middle" fontSize="6" fill="#1a3328" fontWeight="bold">★</text>
          </svg>
          <span className="mt-0.5 rounded-full bg-[#c9a227] px-1.5 py-0.5 text-[9px] font-extrabold leading-[1.15] text-primary shadow-sm">
            Vòng quay
          </span>
        </motion.button>
      )}
    </div>
  );
}
