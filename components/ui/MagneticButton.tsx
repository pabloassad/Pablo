"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "solid" | "outline" | "invert";
  external?: boolean;
}

/**
 * A link that leans toward the cursor — a restrained "magnetic" micro-interaction.
 * The pull is small and spring-damped; on touch / reduced-motion it simply
 * behaves like a normal button.
 */
export function MagneticButton({
  href,
  children,
  className,
  variant = "solid",
  external,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.25);
    y.set(relY * 0.35);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-medium transition-colors duration-300",
        variant === "solid" && "bg-ink text-paper hover:bg-accent",
        variant === "invert" && "bg-accent text-ink hover:bg-paper",
        variant === "outline" && "border border-ink/25 text-ink hover:border-accent hover:text-accent-deep",
        className,
      )}
    >
      {children}
    </motion.a>
  );
}
