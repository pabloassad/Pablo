"use client";

import { type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import clsx from "clsx";

/*
 * Subtle 3D tilt on hover: the card pivots toward the cursor (max ±8°)
 * while a soft light sheen follows it. Spring-smoothed, disabled when the
 * user prefers reduced motion.
 */
export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 25 });
  const sy = useSpring(y, { stiffness: 200, damping: 25 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const glareX = useTransform(sx, [-0.5, 0.5], [15, 85]);
  const glareY = useTransform(sy, [-0.5, 0.5], [15, 85]);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.08), transparent 65%)`;

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 800 }}
      className={clsx("relative will-change-transform", className)}
    >
      {children}
      {!reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-2xl"
          style={{ background: glare }}
        />
      )}
    </motion.div>
  );
}
