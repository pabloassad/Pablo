"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { journey } from "@/data/journey";
import type { JourneyMilestone } from "@/lib/content/types";

/**
 * The markers — Formation and Expériences as two registers of one block,
 * same typographic grammar, same weight, each readable in three seconds.
 * Rails and dots share one axis variable; the dot is centred on the year's
 * own text line, so alignment holds at every breakpoint.
 */
export function Journey() {
  const { t } = useLanguage();
  const j = t.journey;

  const formation = journey.filter((m) => m.kind === "school" || m.kind === "goal");
  const experiences = journey.filter((m) => m.kind !== "school" && m.kind !== "goal");

  return (
    <section id="parcours" className="bg-paper px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="02" label={j.label} />
        </Reveal>

        <RevealText
          as="h2"
          text={j.title}
          className="font-display mt-8 uppercase"
          style={{ fontSize: "var(--text-h3)", lineHeight: 1, fontWeight: 800 }}
        />

        <div className="mt-12 grid gap-x-12 gap-y-14 md:grid-cols-2">
          <Register label={j.educationLabel} items={formation} />
          <Register label={j.experienceLabel} items={experiences} />
        </div>
      </div>
    </section>
  );
}

function Register({ label, items }: { label: string; items: JourneyMilestone[] }) {
  const { locale } = useLanguage();
  const listRef = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 80%", "end 70%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div>
      <Reveal>
        <span className="text-faint text-[0.65rem] font-medium uppercase tracking-[0.2em]">
          {label}
        </span>
      </Reveal>

      <ol
        ref={listRef}
        className="relative mt-5 [--axis:0.25rem] sm:[--axis:7rem]"
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

        {items.map((m, i) => (
          <li key={m.id} className="relative">
            <Reveal
              delayIndex={i % 3}
              className="grid grid-cols-1 gap-0.5 py-3 pl-6 sm:grid-cols-[6rem_2rem_1fr] sm:gap-0 sm:pl-0"
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
                  fontSize: "clamp(1rem,1.6vw,1.3rem)",
                  lineHeight: 1.2,
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
  );
}
