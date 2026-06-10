"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function PageHero({
  kicker,
  title,
  intro,
}: {
  kicker: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-1/3 left-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(216,200,168,0.12) 0%, rgba(216,200,168,0.03) 45%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-6 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-40 lg:px-12 lg:pt-48">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs uppercase tracking-[0.4em] text-accent"
        >
          {kicker}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl text-balance text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl"
        >
          {title}
        </motion.h1>
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl text-balance text-base text-muted sm:text-lg"
          >
            {intro}
          </motion.p>
        )}
      </div>
    </section>
  );
}
