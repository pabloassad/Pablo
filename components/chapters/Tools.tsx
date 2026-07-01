"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { tools, toolGroups } from "@/data/tools";

export function Tools() {
  const { t, locale } = useLanguage();
  const tl = t.tools;

  return (
    <section id="outils" className="bg-paper-2 px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="04" label={tl.label} />
        </Reveal>

        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <RevealText
            as="h2"
            text={tl.title}
            className="font-display uppercase"
            style={{ fontSize: "var(--text-h2)", lineHeight: "var(--text-h2--line-height)" }}
          />
          <Reveal delayIndex={1} as="p" className="text-mute max-w-xs text-base leading-relaxed">
            {tl.intro}
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {toolGroups.map((group, gi) => (
            <Reveal key={group.key} delayIndex={gi} className="bg-paper-2 p-6">
              <span className="text-faint text-[0.65rem] font-medium uppercase tracking-[0.18em]">
                {group.label[locale]}
              </span>
              <ul className="mt-4 space-y-2.5">
                {tools
                  .filter((tool) => tool.group === group.key)
                  .map((tool) => (
                    <li
                      key={tool.name}
                      className="font-display text-ink text-lg"
                      style={{ fontWeight: 600, letterSpacing: "-0.01em" }}
                    >
                      {tool.name}
                    </li>
                  ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
