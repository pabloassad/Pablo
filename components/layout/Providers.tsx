"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import { PlayerProvider } from "@/lib/player/PlayerProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <PlayerProvider>{children}</PlayerProvider>
      </LanguageProvider>
    </MotionConfig>
  );
}
