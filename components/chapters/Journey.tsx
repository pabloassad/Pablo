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

        {/* Timeline */}
        <ol ref={listRef} className="relative mt-16 sm:mt-20">
          {/* Rail + scroll-progress fill */}
          <span
            className="bg-line absolute left-0 top-2 h-full w-px sm:left-[8.5rem]"
            aria-hidden
          />
          <motion.span
            className="bg-ink absolute left-0 top-2 h-full w-px origin-top sm:left-[8.5rem]"
            style={{ scaleY: reduced ? 1 : scaleY }}
            aria-hidden
          />

          {journey.map((m, i) => {
            const headline = m.emphasis === 3;
            return (
              <li key={m.id} className="relative pl-6 sm:pl-0">
                <Reveal
                  delayIndex={i % 3}
                  className={`grid grid-cols-1 gap-1 py-6 sm:grid-cols-[8.5rem_1fr] sm:gap-8 sm:py-7 ${
                    headline ? "sm:py-9" : ""
                  }`}
                >
                  {/* Year + node */}
                  <div className="relative sm:text-right">
                    <span
                      className={`absolute -left-6 top-1.5 h-2 w-2 rounded-full sm:left-auto sm:right-[-1.19rem] ${
                        headline ? "bg-ink ring-paper ring-4" : "bg-ink/40"
                      }`}
                      aria-hidden
                    />
                    <span className="font-display text-mute text-sm tracking-tight">{m.year}</span>
                  </div>

                  {/* Content */}
                  <div className="sm:pl-8">
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
