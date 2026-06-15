"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Method() {
  const { t } = useLanguage();
  const m = t.method;

  return (
    <section id="methode" className="bg-paper-deep px-6 py-28 sm:px-10 sm:py-36 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Reveal>
              <SectionLabel index="02" label={m.label} />
            </Reveal>
            <Reveal delayIndex={1}>
              <h2
                className="font-display mt-8 font-light"
                style={{ fontSize: "var(--text-h2)", lineHeight: "var(--text-h2--line-height)" }}
              >
                {m.title}
              </h2>
            </Reveal>
          </div>
          <Reveal delayIndex={2} as="p" className="text-muted md:col-span-4 text-base leading-relaxed text-pretty">
            {m.intro}
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {m.movements.map((mv, i) => (
            <Reveal key={mv.index} delayIndex={i} as="li" className="group bg-paper-deep p-8">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-accent-deep text-sm tracking-[0.2em]">{mv.index}</span>
                <span
                  aria-hidden
                  className="text-faint group-hover:text-accent text-2xl transition-colors duration-300"
                >
                  ♪
                </span>
              </div>
              <h3 className="font-display mt-8 text-2xl font-medium">{mv.title}</h3>
              <p className="text-muted mt-3 text-sm leading-relaxed text-pretty">{mv.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
