"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { tools } from "@/data/tools";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * "À propos" — the portrait, beautifully brought in: the photograph unveils
 * from the bottom behind a clip mask as it enters the viewport, with a slow
 * settle of scale (a whisper of Ken Burns), against an asymmetric editorial
 * text block. Reduced-motion users get the image plainly, instantly.
 */
export function About() {
  const { t } = useLanguage();
  const a = t.about;
  const figRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: figRef,
    offset: ["start 92%", "start 35%"],
  });
  const clip = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
  );
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const drift = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <section id="apropos" className="bg-paper-2 px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="01" label={a.label} />
        </Reveal>

        <div className="mt-12 grid grid-cols-12 gap-x-8 gap-y-12 md:items-start">
          {/* The photograph — mask reveal on scroll */}
          <div className="col-span-12 md:col-span-5" ref={figRef}>
            <figure className="relative">
              <motion.div
                style={reduced ? undefined : { clipPath: clip }}
                className="relative aspect-[4/5] w-full overflow-hidden"
              >
                <motion.div
                  style={reduced ? undefined : { scale }}
                  className="absolute inset-0"
                >
                  <Image
                    src="/portrait/studio-02.webp"
                    alt="Pablo Assad"
                    fill
                    sizes="(max-width: 768px) 100vw, 42vw"
                    className="object-cover"
                  />
                </motion.div>
                <span className="border-ink/40 absolute left-0 top-0 z-10 h-3 w-3 border-l border-t" aria-hidden />
                <span className="border-ink/40 absolute right-0 top-0 z-10 h-3 w-3 border-r border-t" aria-hidden />
                <span className="border-ink/40 absolute bottom-0 left-0 z-10 h-3 w-3 border-b border-l" aria-hidden />
                <span className="border-ink/40 absolute bottom-0 right-0 z-10 h-3 w-3 border-b border-r" aria-hidden />
              </motion.div>
              <figcaption className="mt-3 flex items-center justify-between">
                <span className="kicker">Pablo Assad</span>
                <span className="text-faint text-[0.65rem] uppercase tracking-[0.15em]">
                  {a.photoCaption}
                </span>
              </figcaption>
            </figure>
          </div>

          {/* The words — offset downward, editorial */}
          <motion.div
            style={reduced ? undefined : { y: drift }}
            className="col-span-12 md:col-span-6 md:col-start-7 md:pt-16"
          >
            <RevealText
              as="h2"
              text={a.title}
              className="font-display uppercase"
              style={{ fontSize: "var(--text-h3)", lineHeight: 1, fontWeight: 800 }}
            />
            <div className="mt-8 max-w-md space-y-5">
              {a.body.map((p, i) => (
                <Reveal
                  key={i}
                  delayIndex={i + 1}
                  as="p"
                  className={
                    i === a.body.length - 1
                      ? "font-display text-ink text-xl leading-snug text-pretty"
                      : "text-mute text-lg leading-relaxed text-pretty"
                  }
                >
                  {p}
                </Reveal>
              ))}
            </div>

            {/* Toolkit — one quiet line */}
            <Reveal delayIndex={4}>
              <div className="border-line mt-12 border-t pt-5">
                <span className="text-faint text-[0.65rem] font-medium uppercase tracking-[0.18em]">
                  {a.toolsLabel}
                </span>
                <p className="text-mute mt-2 text-sm leading-relaxed">
                  {tools.map((tool) => tool.name).join(" · ")}
                </p>
              </div>
            </Reveal>

            {/* Signature tick */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.3 }}
              className="mt-10 flex items-center gap-3"
              aria-hidden
            >
              <span className="hairline w-8" />
              <span className="font-display text-ink text-sm" style={{ fontWeight: 700 }}>
                P.A.
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
