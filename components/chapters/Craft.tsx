"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * A rest in the score. No pitch, no argument — one line held in silence.
 * The double bar-line marks the pause; the quote breathes; the attribution
 * stays a whisper. Generous space above and below keeps it a moment, not a
 * section.
 */
export function Craft() {
  const { t, locale } = useLanguage();
  const c = t.craft;
  const quote = locale === "fr" ? `« ${c.title} »` : `“${c.title}”`;

  return (
    <section id="creation" className="bg-paper px-6 py-32 sm:px-10 sm:py-44 lg:px-16">
      <div className="mx-auto max-w-4xl">
        <Reveal className="flex justify-center">
          <SectionLabel index="03" label={c.label} />
        </Reveal>

        <figure className="mt-16 text-center sm:mt-20">
          {/* The rest — the score's silent marker */}
          <Reveal>
            <span className="font-display text-faint block text-2xl leading-none tracking-tight" aria-hidden>
              ‖
            </span>
          </Reveal>

          <blockquote className="mt-10">
            <RevealText
              as="p"
              text={quote}
              className="font-display text-ink mx-auto max-w-3xl text-balance"
              style={{
                fontSize: "clamp(1.55rem,3.6vw,2.9rem)",
                lineHeight: 1.28,
                fontWeight: 300,
                letterSpacing: "-0.015em",
              }}
            />
          </blockquote>

          <Reveal delayIndex={2}>
            <figcaption className="text-faint mt-12 text-[0.7rem] font-medium uppercase tracking-[0.28em]">
              {c.aside}
            </figcaption>
          </Reveal>
        </figure>
      </div>
    </section>
  );
}
