"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Manifesto() {
  const { t } = useLanguage();
  const m = t.manifesto;

  return (
    <section id="manifeste" className="px-6 py-28 sm:px-10 sm:py-36 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel index="01" label={m.label} />
        </Reveal>

        <Reveal delayIndex={1}>
          <h2
            className="font-display mt-10 max-w-4xl font-light text-pretty"
            style={{ fontSize: "var(--text-h2)", lineHeight: "var(--text-h2--line-height)" }}
          >
            {m.lead}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <div className="space-y-6 md:col-span-7 md:col-start-1">
            {m.body.map((paragraph, i) => (
              <Reveal key={i} delayIndex={i + 2} as="p" className="text-muted text-lg leading-relaxed text-pretty">
                {paragraph}
              </Reveal>
            ))}
          </div>

          <Reveal delayIndex={3} className="md:col-span-4 md:col-start-9">
            <blockquote className="border-accent border-l-2 pl-6">
              <p className="font-display text-2xl font-light italic leading-snug text-pretty">{m.pull}</p>
            </blockquote>
          </Reveal>
        </div>

        <ul className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {m.pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delayIndex={i} as="li" className="bg-paper p-8">
              <span className="font-mono text-accent-deep text-xs">{`0${i + 1}`}</span>
              <h3 className="font-display mt-4 text-xl font-medium">{pillar.title}</h3>
              <p className="text-muted mt-3 text-sm leading-relaxed">{pillar.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
