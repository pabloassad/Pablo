"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  /** Total vertical travel in px across the scroll range. Keep it small. */
  distance?: number;
  className?: string;
}

/**
 * Subtle scroll-driven parallax. As the element travels through the viewport,
 * its content drifts by ±distance/2, lending depth without distraction.
 * Reduced-motion users get a static element.
 */
export function Parallax({ children, distance = 80, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-distance / 2, distance / 2]);

  return (
    <motion.div ref={ref} style={reduced ? undefined : { y }} className={className}>
      {children}
    </motion.div>
  );
}
