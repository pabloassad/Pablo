"use client";

import { useEffect, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Module-scoped: false on the very first render of the JS session (initial
// load — the Intro curtain owns that moment), true for every route change
// after it. Resets naturally on full reload.
let hasNavigated = false;

/**
 * Cinematic route transition. On every navigation after the first paint, an
 * ink veil lifts off the incoming page while its content rises into place —
 * no white flash, one continuous world. Reduced-motion users get an instant
 * swap.
 */
export function PageVeil({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const animate = hasNavigated && !reduced;

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <div className="relative">
      {animate && (
        <motion.div
          aria-hidden
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="bg-ink pointer-events-none fixed inset-0 z-[80] origin-top"
        />
      )}
      <motion.div
        initial={animate ? { opacity: 0, y: 24 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
