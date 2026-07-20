"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * The closing echo of the opening: one photograph, full viewport, drifting
 * slowly against the scroll. The boombox bag on a wall against the sky, the
 * music carried everywhere, ends the page the way the Montmartre arrival
 * opened it. Static for reduced-motion users.
 */
export function Outro() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className="relative h-[70svh] overflow-hidden sm:h-[100svh]">
      <motion.div style={reduced ? undefined : { y }} className="absolute inset-[-12%_0]">
        <Image
          src="/portrait/sac.webp"
          alt="Sac imprimé radiocassette, Paris"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 62%" }}
        />
      </motion.div>
    </div>
  );
}
