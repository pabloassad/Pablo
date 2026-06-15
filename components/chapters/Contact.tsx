"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Contact() {
  const { t } = useLanguage();
  const c = t.contact;

  const channels = [
    { label: c.emailLabel, value: c.email, href: `mailto:${c.email}`, external: false },
    { label: c.phoneLabel, value: c.phone, href: `tel:${c.phoneHref}`, external: false },
    { label: c.linkedinLabel, value: c.linkedinHandle, href: c.linkedin, external: true },
  ];

  return (
    <section id="contact" className="bg-ink text-paper px-6 py-28 sm:px-10 sm:py-40 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="font-mono text-accent text-xs tracking-[0.2em]">06</span>
            <span className="h-px w-8 shrink-0 bg-paper/25" aria-hidden />
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-paper/60">{c.label}</span>
          </div>
        </Reveal>

        <RevealText
          as="h2"
          text={c.title}
          className="font-display mt-10 max-w-4xl font-light text-pretty"
          style={{ fontSize: "var(--text-h2)", lineHeight: "var(--text-h2--line-height)" }}
        />

        <Reveal delayIndex={2} as="p" className="mt-8 max-w-xl text-lg leading-relaxed text-paper/70 text-pretty">
          {c.lead}
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-paper/15 bg-paper/15 sm:grid-cols-3">
          {channels.map((ch, i) => (
            <Reveal key={ch.label} delayIndex={i} className="bg-ink">
              <a
                href={ch.href}
                target={ch.external ? "_blank" : undefined}
                rel={ch.external ? "noopener noreferrer" : undefined}
                className="group flex h-full flex-col justify-between gap-8 p-7 transition-colors hover:bg-paper/[0.04]"
              >
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-paper/65">{ch.label}</span>
                <span className="text-paper group-hover:text-accent flex items-center gap-2 text-lg break-all transition-colors">
                  {ch.value}
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delayIndex={2}>
          <div className="no-print mt-12 flex flex-wrap items-center gap-4">
            <MagneticButton href={`mailto:${c.email}`} variant="invert">
              {t.nav.cta}
            </MagneticButton>
            <button
              type="button"
              onClick={() => window.print()}
              className="border-paper/30 text-paper hover:border-accent hover:text-accent inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-sm font-medium transition-colors duration-300"
            >
              {c.pdf}
              <span aria-hidden>↧</span>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
