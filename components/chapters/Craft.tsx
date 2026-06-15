"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Craft() {
  const { t } = useLanguage();
  const c = t.craft;

  return (
    <section id="creation" className="bg-paper-deep px-6 py-28 sm:px-10 sm:py-36 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel index="04" label={c.label} />
        </Reveal>

        <div className="mt-12 grid gap-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-6">
            <RevealText
              as="h2"
              text={c.title}
              className="font-display max-w-xl font-light text-pretty"
              style={{ fontSize: "var(--text-h2)", lineHeight: "var(--text-h2--line-height)" }}
            />
            <div className="mt-8 space-y-5">
              {c.body.map((p, i) => (
                <Reveal key={i} delayIndex={i + 2} as="p" className="text-muted text-lg leading-relaxed text-pretty">
                  {p}
                </Reveal>
              ))}
            </div>
            <Reveal delayIndex={4}>
              <p className="font-display text-accent-deep mt-8 text-xl italic leading-snug text-pretty">
                {c.aside}
              </p>
            </Reveal>
          </div>

          <Reveal delayIndex={2} className="md:col-span-6">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src="/images/studio-session.jpg"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
