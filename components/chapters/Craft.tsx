"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Craft() {
  const { t } = useLanguage();
  const c = t.craft;

  return (
    <section id="creation" className="bg-paper px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="03" label={c.label} />
        </Reveal>

        <div className="mt-10 grid gap-12 md:grid-cols-12 md:items-start">
          <div className="md:col-span-7">
            <RevealText
              as="h2"
              text={c.title}
              className="font-display max-w-3xl uppercase"
              style={{ fontSize: "var(--text-h3)", lineHeight: "1.02", fontWeight: 800 }}
            />
            <div className="mt-8 max-w-xl space-y-5">
              {c.body.map((p, i) => (
                <Reveal key={i} delayIndex={i + 1} as="p" className="text-mute text-lg leading-relaxed text-pretty">
                  {p}
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delayIndex={2} className="md:col-span-4 md:col-start-9">
            <blockquote className="border-ink border-l-2 pl-6">
              <p className="font-display text-ink text-xl leading-snug text-pretty" style={{ fontWeight: 500, letterSpacing: "-0.01em" }}>
                {c.aside}
              </p>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
