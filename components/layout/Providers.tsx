"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import { PlayerProvider } from "@/lib/player/PlayerProvider";
import type { Locale } from "@/lib/i18n/translations";

export function Providers({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale: Locale;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider initialLocale={initialLocale}>
        <PlayerProvider>{children}</PlayerProvider>
      </LanguageProvider>
    </MotionConfig>
  );
}
