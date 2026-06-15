"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

// Client-only WebGL — never rendered on the server.
const SignatureWave = dynamic(
  () => import("@/components/webgl/SignatureWave").then((m) => m.SignatureWave),
  { ssr: false },
);

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { t } = useLanguage();
  const h = t.hero;

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pt-28 pb-20 sm:px-10 lg:px-16"
    >
      {/* Signature frequency ribbon */}
      <SignatureWave className="pointer-events-none absolute inset-x-0 top-1/2 -z-0 h-[42vh] w-full -translate-y-1/2 opacity-90" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="flex items-center gap-3"
        >
          <span className="kicker">{h.kicker}</span>
        </motion.div>

        <motion.h1
          className="font-display mt-6 max-w-5xl text-pretty"
          style={{ fontSize: "var(--text-display)", lineHeight: "var(--text-display--line-height)" }}
        >
          <motion.span
            className="block font-light"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.1 }}
          >
            {h.lineOne}
          </motion.span>
          <motion.span
            className="block font-light italic text-muted"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.22 }}
          >
            {h.lineTwo}
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.42 }}
          className="text-muted mt-10 max-w-xl text-lg leading-relaxed text-pretty"
        >
          <span className="text-ink font-medium">{h.name}.</span> {h.intro}
        </motion.p>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#manifeste"
        aria-label={h.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease, delay: 0.8 }}
        className="absolute inset-x-0 bottom-8 z-10 mx-auto flex w-fit items-center gap-2 text-faint hover:text-ink transition-colors"
      >
        <span className="kicker">{h.scroll}</span>
        <motion.span
          aria-hidden
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-base"
        >
          ↓
        </motion.span>
      </motion.a>
    </section>
  );
}
