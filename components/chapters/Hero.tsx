"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { RevealText } from "@/components/ui/RevealText";
import { PortraitPlate } from "@/components/ui/PortraitPlate";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { t } = useLanguage();
  const h = t.hero;

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center px-6 pt-28 pb-16 sm:px-10 lg:px-16"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-12 items-center gap-x-8 gap-y-12">
        {/* Type block */}
        <div className="col-span-12 lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="flex items-center gap-3"
          >
            <span className="hairline w-10" aria-hidden />
            <span className="kicker">{h.eyebrow}</span>
          </motion.div>

          <RevealText
            as="h1"
            text={h.name}
            className="font-display mt-6 uppercase"
            style={{
              fontSize: "var(--text-hero)",
              lineHeight: "var(--text-hero--line-height)",
            }}
          />

          <div className="mt-8 grid gap-6 sm:grid-cols-2 sm:items-end">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.35 }}
              className="font-display text-ink max-w-md text-balance"
              style={{ fontSize: "var(--text-h3)", lineHeight: "var(--text-h3--line-height)", fontWeight: 500, letterSpacing: "-0.02em" }}
            >
              {h.statement}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.45 }}
              className="sm:pb-1"
            >
              <p className="text-mute max-w-xs text-base leading-relaxed">{h.intro}</p>
              <span className="border-ink/30 text-ink mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium">
                <span className="bg-ink h-1.5 w-1.5 rounded-full" aria-hidden />
                {h.availability}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Portrait — becomes the particle canvas once the photo lands */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, ease, delay: 0.5 }}
          className="col-span-12 lg:col-span-4"
        >
          <PortraitPlate />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#parcours"
        aria-label={h.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease, delay: 0.8 }}
        className="text-faint hover:text-ink absolute inset-x-0 bottom-7 mx-auto flex w-fit items-center gap-2 transition-colors"
      >
        <span className="kicker">{h.scroll}</span>
        <motion.span
          aria-hidden
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
      </motion.a>
    </section>
  );
}
