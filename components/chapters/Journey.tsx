"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { journey } from "@/data/journey";

/**
 * The path, reduced to its markers: education titles and years, nothing else.
 * Reads in three seconds. Rail and dots share one axis variable and the dot
 * is centred on the year's own text line, so alignment holds at every
 * breakpoint and on the first/last node.
 */
export function Journey() {
  const { t, locale } = useLanguage();
  const j = t.journey;
  const listRef = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();

  const formations = journey.filter((m) => m.kind === "school" || m.kind === "goal");

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 70%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="parcours" className="bg-paper px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="02" label={j.label} />
        </Reveal>

        <div className="mt-8 grid gap-x-8 gap-y-10 md:grid-cols-12">
          <RevealText
            as="h2"
            text={j.title}
            className="font-display uppercase md:col-span-4"
            style={{ fontSize: "var(--text-h3)", lineHeight: 1, fontWeight: 800 }}
          />

          {/* Compact timeline — one shared axis */}
          <ol
            ref={listRef}
            className="relative md:col-span-7 md:col-start-6 [--axis:0.25rem] sm:[--axis:6.5rem]"
          >
            <span
              className="bg-line absolute inset-y-1.5 w-px -translate-x-1/2"
              style={{ left: "var(--axis)" }}
              aria-hidden
            />
            <motion.span
              className="bg-ink absolute inset-y-1.5 w-px origin-top -translate-x-1/2"
              style={{ left: "var(--axis)", scaleY: reduced ? 1 : scaleY }}
              aria-hidden
            />

            {formations.map((m, i) => (
              <li key={m.id} className="relative">
                <Reveal
                  delayIndex={i % 3}
                  className="grid grid-cols-1 gap-0.5 py-3.5 pl-6 sm:grid-cols-[5rem_3rem_1fr] sm:gap-0 sm:pl-0"
                >
                  <span className="font-display text-mute relative block text-sm tracking-tight sm:text-right">
                    {m.year}
                    <span
                      className={`absolute top-1/2 left-[calc(var(--axis)-1.5rem)] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full sm:left-[var(--axis)] ${
                        m.emphasis === 3 ? "bg-ink ring-paper ring-4" : "bg-ink/40"
                      }`}
                      aria-hidden
                    />
                  </span>
                  <span aria-hidden className="hidden sm:block" />
                  <h3
                    className="font-display text-ink"
                    style={{
                      fontSize: "clamp(1.05rem,1.8vw,1.45rem)",
                      lineHeight: 1.15,
                      fontWeight: m.emphasis === 3 ? 800 : 600,
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {m.title[locale]}
                    <span className="text-faint font-sans text-sm font-normal"> · {m.place[locale]}</span>
                  </h3>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
