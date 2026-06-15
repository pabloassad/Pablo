"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import { SmoothScroll } from "./SmoothScroll";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <SmoothScroll />
        {children}
      </LanguageProvider>
    </MotionConfig>
  );
}
