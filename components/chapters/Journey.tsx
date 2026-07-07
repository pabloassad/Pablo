"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { journey } from "@/data/journey";
import type { JourneyKind, Localized } from "@/lib/content/types";

const kindLabel: Record<JourneyKind, Localized> = {
  school: { fr: "École", en: "School" },
  agency: { fr: "Agence", en: "Agency" },
  venture: { fr: "Projet", en: "Venture" },
  goal: { fr: "Objectif", en: "Goal" },
};

export function Journey() {
  const { t, locale } = useLanguage();
  const j = t.journey;
  const listRef = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 65%", "end 65%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="parcours" className="bg-paper px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="01" label={j.label} />
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-12 md:items-end">
          <RevealText
            as="h2"
            text={j.title}
            className="font-display col-span-12 uppercase md:col-span-7"
            style={{ fontSize: "var(--text-h2)", lineHeight: "var(--text-h2--line-height)" }}
          />
          <Reveal delayIndex={1} as="p" className="text-mute col-span-12 max-w-sm text-base leading-relaxed md:col-span-4 md:col-start-9">
            {j.intro}
          </Reveal>
        </div>

        {/* Timeline — one shared axis; rail and dots are centred on it. */}
        <ol
          ref={listRef}
          className="relative mt-16 [--axis:0.25rem] sm:mt-20 sm:[--axis:8rem]"
        >
          {/* Rail + scroll-progress fill, centred on the axis */}
          <span
            className="bg-line absolute inset-y-2 w-px -translate-x-1/2"
            style={{ left: "var(--axis)" }}
            aria-hidden
          />
          <motion.span
            className="bg-ink absolute inset-y-2 w-px origin-top -translate-x-1/2"
            style={{ left: "var(--axis)", scaleY: reduced ? 1 : scaleY }}
            aria-hidden
          />

          {journey.map((m, i) => {
            const headline = m.emphasis === 3;
            return (
              <li key={m.id} className="relative">
                <Reveal
                  delayIndex={i % 3}
                  className={`grid grid-cols-1 gap-1 py-6 pl-6 sm:grid-cols-[6.5rem_3rem_1fr] sm:gap-0 sm:py-7 sm:pl-0 ${
                    headline ? "sm:py-9" : ""
                  }`}
                >
                  {/* Year — right-aligned against the axis; the node is centred
                      on this very line, so it stays aligned for every variant */}
                  <span className="font-display text-mute relative block text-sm tracking-tight sm:pt-0.5 sm:text-right">
                    {m.year}
                    <span
                      className={`absolute top-1/2 left-[calc(var(--axis)-1.5rem)] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full sm:left-[var(--axis)] ${
                        headline ? "bg-ink ring-paper ring-4" : "bg-ink/40"
                      }`}
                      aria-hidden
                    />
                  </span>
                  <span aria-hidden className="hidden sm:block" />

                  {/* Content */}
                  <div>
                    <span className="text-faint text-[0.65rem] font-medium uppercase tracking-[0.18em]">
                      {kindLabel[m.kind][locale]}
                    </span>
                    <h3
                      className="font-display text-ink mt-1.5"
                      style={{
                        fontSize: headline ? "var(--text-h3)" : "clamp(1.15rem,2vw,1.6rem)",
                        lineHeight: 1.05,
                        fontWeight: headline ? 800 : 600,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {m.title[locale]}
                    </h3>
                    <p className="text-mute mt-1 text-sm">{m.place[locale]}</p>
                    {m.blurb && (
                      <p className="text-ink/70 mt-3 max-w-md text-sm leading-relaxed text-pretty">
                        {m.blurb[locale]}
                      </p>
                    )}
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
