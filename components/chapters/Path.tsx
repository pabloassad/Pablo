"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { TimelineEntry } from "@/lib/i18n/translations";

function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ul className="space-y-px">
      {entries.map((e, i) => (
        <Reveal key={`${e.title}-${i}`} delayIndex={i} as="li">
          <div className="border-line flex items-baseline gap-5 border-t py-4">
            <span className="font-mono text-faint w-16 shrink-0 text-xs">{e.year || "—"}</span>
            <div>
              <p className="text-ink font-medium">
                {e.title}
                {e.note && (
                  <span className="text-accent-deep ml-2 text-xs font-mono uppercase tracking-wide">
                    · {e.note}
                  </span>
                )}
              </p>
              <p className="text-muted text-sm">{e.place}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}

export function Path() {
  const { t } = useLanguage();
  const p = t.path;

  return (
    <section id="parcours" className="px-6 py-28 sm:px-10 sm:py-36 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel index="05" label={p.label} />
        </Reveal>
        <RevealText
          as="h2"
          text={p.title}
          className="font-display mt-8 font-light"
          style={{ fontSize: "var(--text-h2)", lineHeight: "var(--text-h2--line-height)" }}
        />

        <div className="mt-16 grid gap-x-16 gap-y-14 md:grid-cols-2">
          <div>
            <h3 className="kicker mb-4">{p.educationLabel}</h3>
            <Timeline entries={p.education} />
          </div>
          <div>
            <h3 className="kicker mb-4">{p.experienceLabel}</h3>
            <Timeline entries={p.experience} />
          </div>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <h3 className="kicker mb-5">{p.toolsLabel}</h3>
            <ul className="flex flex-wrap gap-2.5">
              {p.tools.map((tool, i) => (
                <Reveal key={tool} delayIndex={i} as="li">
                  <span className="border-line text-ink inline-block rounded-full border px-4 py-1.5 text-sm">
                    {tool}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal delayIndex={2} className="md:col-span-5">
            <div className="bg-accent-soft rounded-2xl p-7">
              <h3 className="kicker mb-3">{p.signalLabel}</h3>
              <p className="font-display text-2xl font-light leading-snug text-pretty">{p.signal}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
