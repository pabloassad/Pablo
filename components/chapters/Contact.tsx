"use client";

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
    <section id="contact" className="bg-paper px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="05" label={c.label} />
        </Reveal>

        <RevealText
          as="h2"
          text={c.title}
          className="font-display mt-8 max-w-4xl uppercase"
          style={{ fontSize: "var(--text-h2)", lineHeight: "var(--text-h2--line-height)" }}
        />

        <Reveal delayIndex={1} as="p" className="text-mute mt-8 max-w-xl text-lg leading-relaxed text-pretty">
          {c.lead}
        </Reveal>

        <Reveal delayIndex={2}>
          <MagneticButton href={`mailto:${c.email}`} variant="solid" className="mt-10">
            {c.cta}
            <span aria-hidden>→</span>
          </MagneticButton>
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
