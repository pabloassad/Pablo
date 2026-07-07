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
    <section id="contact" className="bg-paper px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="05" label={c.label} />
        </Reveal>

        <div className="grid gap-10 md:grid-cols-12 md:items-start">
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

          {/* Portrait plate — lives here while the 3D layer owns the hero */}
          <Reveal delayIndex={2} className="monolith-swap-in mt-8 hidden md:col-span-3 md:col-start-10 lg:block">
            <figure className="relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src="/portrait/portrait.jpg"
                  alt="Pablo Assad — portrait"
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
                <span className="border-ink/40 absolute left-0 top-0 z-10 h-3 w-3 border-l border-t" aria-hidden />
                <span className="border-ink/40 absolute right-0 top-0 z-10 h-3 w-3 border-r border-t" aria-hidden />
                <span className="border-ink/40 absolute bottom-0 left-0 z-10 h-3 w-3 border-b border-l" aria-hidden />
                <span className="border-ink/40 absolute bottom-0 right-0 z-10 h-3 w-3 border-b border-r" aria-hidden />
              </div>
              <figcaption className="mt-2 flex items-center justify-between">
                <span className="kicker">Pablo Assad</span>
                <span className="text-faint text-[0.65rem] uppercase tracking-[0.15em]">Paris</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

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
