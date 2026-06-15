"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { CaseStudy } from "@/lib/i18n/translations";
import { cn } from "@/lib/utils";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-line border-t pt-4">
      <dt className="kicker">{label}</dt>
      <dd className="text-ink mt-2 text-sm leading-relaxed text-pretty">{value}</dd>
    </div>
  );
}

function Case({ data, flip, t }: { data: CaseStudy; flip: boolean; t: ReturnType<typeof useLanguage>["t"] }) {
  const w = t.work;
  return (
    <article className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
      {/* Visual */}
      <Reveal className={cn("md:col-span-5", flip ? "md:order-2 md:col-start-8" : "md:order-1")}>
        <div className="bg-paper-deep relative aspect-[4/5] overflow-hidden rounded-2xl">
          <Image
            src={data.image}
            alt={`${data.client} — ${data.title}`}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
          />
          <span className="font-display absolute left-5 top-3 text-[5rem] leading-none text-paper/90 mix-blend-overlay">
            {data.index}
          </span>
        </div>
      </Reveal>

      {/* Text */}
      <div className={cn("md:col-span-6", flip ? "md:order-1 md:col-start-1" : "md:order-2 md:col-start-7")}>
        <Reveal>
          <span className="kicker">{data.discipline}</span>
          <h3 className="font-display mt-3 text-3xl font-medium sm:text-4xl">{data.client}</h3>
          <p className="text-accent-deep mt-1 text-lg italic font-display">{data.title}</p>
        </Reveal>

        <Reveal delayIndex={1}>
          <dl className="mt-8 grid gap-5 sm:grid-cols-2">
            <Field label={w.contextLabel} value={data.context} />
            <Field label={w.roleLabel} value={data.role} />
            <Field label={w.actionLabel} value={data.action} />
            <Field label={w.resultLabel} value={data.result} />
          </dl>
        </Reveal>
      </div>
    </article>
  );
}

export function Work() {
  const { t } = useLanguage();
  const w = t.work;

  return (
    <section id="projets" className="px-6 py-28 sm:px-10 sm:py-36 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Reveal>
              <SectionLabel index="03" label={w.label} />
            </Reveal>
            <RevealText
              as="h2"
              text={w.title}
              className="font-display mt-8 font-light"
              style={{ fontSize: "var(--text-h2)", lineHeight: "var(--text-h2--line-height)" }}
            />
          </div>
          <Reveal delayIndex={2} as="p" className="text-muted md:col-span-4 text-base leading-relaxed text-pretty">
            {w.intro}
          </Reveal>
        </div>

        <div className="mt-20 space-y-24 sm:space-y-32">
          {w.cases.map((c, i) => (
            <Case key={c.index} data={c} flip={i % 2 === 1} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
