import { useState } from "react";
import { LuckyWheelPopup } from "@/components/LuckyWheelPopup";
import { PromotionPopup } from "@/components/PromotionPopup";
import { LuckyWheelFloatingIcon } from "@/components/LuckyWheelFloatingIcon";
import { useSiteContent } from "@/context/SiteContentContext";

export function LuckyWheelController() {
  const { content } = useSiteContent();
  const wheelCfg = content.luckyWheel;
  const promoCfg = content.promotion;
  const [wheelOpen, setWheelOpen] = useState(false);
  const [promoOpen, setPromoOpen] = useState(false);

  if (!wheelCfg?.enabled && !promoCfg?.enabled) return null;

  return (
    <>
      <LuckyWheelPopup externalOpen={wheelOpen} onExternalClose={() => setWheelOpen(false)} />
      <PromotionPopup externalOpen={promoOpen} onExternalClose={() => setPromoOpen(false)} />
      <LuckyWheelFloatingIcon
        onLuckyWheelClick={() => setWheelOpen(true)}
        onPromotionClick={() => setPromoOpen(true)}
      />
    </>
  );
}
