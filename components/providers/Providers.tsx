"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import { AudioProvider } from "@/lib/audio/AudioProvider";
import { MiniPlayer } from "@/components/audio/MiniPlayer";
import { SmoothScroll } from "./SmoothScroll";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <AudioProvider>
          <SmoothScroll />
          {children}
          <MiniPlayer />
        </AudioProvider>
      </LanguageProvider>
    </MotionConfig>
  );
}
