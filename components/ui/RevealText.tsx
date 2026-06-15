"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { CSSProperties, ElementType } from "react";

const container: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  }),
};

const word: Variants = {
  hidden: { y: "115%" },
  visible: { y: "0%", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

interface RevealTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  style?: CSSProperties;
  /** Per-word stagger in seconds. */
  stagger?: number;
}

/**
 * Editorial headline reveal: each word rises from behind a clipping mask,
 * lightly staggered, the first time the line enters the viewport.
 * Reduced-motion users get the text rendered flat and instantly.
 */
export function RevealText({
  text,
  as = "h2",
  className,
  style,
  stagger = 0.055,
}: RevealTextProps) {
  const reduced = useReducedMotion();
  const Tag = (reduced ? as : motion[as]) as ElementType;

  if (reduced) {
    return (
      <Tag className={className} style={style}>
        {text}
      </Tag>
    );
  }

  const words = text.split(" ");

  return (
    <Tag
      className={className}
      style={style}
      variants={container}
      custom={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden align-top"
          style={{
            paddingBottom: "0.14em",
            marginBottom: "-0.14em",
            marginRight: i < words.length - 1 ? "0.27em" : undefined,
          }}
        >
          <motion.span className="inline-block will-change-transform" variants={word}>
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
