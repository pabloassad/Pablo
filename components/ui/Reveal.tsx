"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

interface RevealProps {
  children: ReactNode;
  /** Stagger index — multiplied by 0.08s. */
  delayIndex?: number;
  className?: string;
  as?: "div" | "span" | "li" | "p" | "h2" | "h3";
}

/**
 * Fades + lifts its children into view once, the first time they enter the
 * viewport. Reduced-motion users get an instant, static reveal via MotionConfig.
 */
export function Reveal({ children, delayIndex = 0, className, as = "div" }: RevealProps) {
  // Narrow cast: all motion.<tag> components share motion.div's prop surface.
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      variants={variants}
      custom={delayIndex}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      {children}
    </MotionTag>
  );
}
