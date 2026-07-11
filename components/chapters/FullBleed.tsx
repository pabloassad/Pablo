"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * A breathing chapter break: one photograph, full width, drifting slowly
 * against the scroll (the image moves slower than the page — depth without
 * spectacle). Static for reduced-motion users.
 */
export function FullBleed({
  src,
  alt,
  caption,
  focal = "50% 50%",
}: {
  src: string;
  alt: string;
  caption?: string;
  /** object-position keeping the subject (the face) in frame at every crop. */
  focal?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <div ref={ref} className="relative h-[52svh] overflow-hidden sm:h-[68svh]">
      <motion.div style={reduced ? undefined : { y }} className="absolute inset-[-14%_0]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: focal }}
        />
      </motion.div>
      {caption && (
        <span className="text-paper/85 absolute bottom-5 left-6 z-10 text-[0.65rem] font-medium uppercase tracking-[0.2em] mix-blend-difference sm:left-10 lg:left-16">
          {caption}
        </span>
      )}
    </div>
  );
}
