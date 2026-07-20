"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Contact() {
  const { t } = useLanguage();
  const c = t.contact;

  const rows = [
    { label: c.emailLabel, value: c.email, href: `mailto:${c.email}` },
    { label: c.phoneLabel, value: c.phone, href: `tel:${c.phoneHref}` },
    { label: c.linkedinLabel, value: c.linkedinHandle, href: c.linkedin, external: true },
  ];

  return (
    <section id="contact" className="cv-section bg-paper px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="05" label={c.label} />
        </Reveal>

        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <RevealText
              as="h2"
              text={c.title}
              className="font-display mt-8 max-w-4xl uppercase"
              style={{ fontSize: "var(--text-h2)", lineHeight: "var(--text-h2--line-height)" }}
            />

            <Reveal delayIndex={1} as="p" className="text-mute mt-8 max-w-xl text-lg leading-relaxed text-pretty">
              {c.lead}
            </Reveal>
          </div>

          {/* A quiet object note: the boombox bag, music carried everywhere */}
          <Reveal delayIndex={2} className="max-w-xs md:col-span-3 md:col-start-10 md:max-w-none">
            <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-[4/5]">
              <Image
                src="/portrait/sac.webp"
                alt="Sac imprimé radiocassette"
                fill
                sizes="(max-width: 768px) 320px, 25vw"
                className="object-cover"
                style={{ objectPosition: "42% 72%" }}
              />
              <span className="border-ink/40 absolute left-0 top-0 z-10 h-3 w-3 border-l border-t" aria-hidden />
              <span className="border-ink/40 absolute right-0 top-0 z-10 h-3 w-3 border-r border-t" aria-hidden />
              <span className="border-ink/40 absolute bottom-0 left-0 z-10 h-3 w-3 border-b border-l" aria-hidden />
              <span className="border-ink/40 absolute bottom-0 right-0 z-10 h-3 w-3 border-b border-r" aria-hidden />
            </div>
          </Reveal>
        </div>

        <Reveal delayIndex={2}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton href={`mailto:${c.email}`} variant="solid">
              {c.cta}
              <span aria-hidden>→</span>
            </MagneticButton>
            <a
              href="/cv/CV-Pablo-Assad-2026.pdf"
              download="CV-Pablo-Assad-2026.pdf"
              className="group border-ink/25 text-ink hover:border-ink inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-sm font-medium whitespace-nowrap transition-colors duration-300"
            >
              {c.cv}
              <span aria-hidden className="inline-block transition-transform duration-300 ease-out group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
          </div>
        </Reveal>

        <ul className="border-line mt-16 grid gap-px overflow-hidden border-t sm:grid-cols-3">
          {rows.map((row, i) => (
            <Reveal key={row.label} delayIndex={i} as="li" className="border-line border-b py-6 sm:border-b-0 sm:border-l sm:pl-6 sm:first:border-l-0 sm:first:pl-0">
              <span className="text-faint text-[0.65rem] font-medium uppercase tracking-[0.18em]">
                {row.label}
              </span>
              <a
                href={row.href}
                target={row.external ? "_blank" : undefined}
                rel={row.external ? "noopener noreferrer" : undefined}
                className="font-display text-ink hover:text-mute mt-2 block text-lg transition-colors"
                style={{ fontWeight: 600, letterSpacing: "-0.01em" }}
              >
                {row.value}
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
