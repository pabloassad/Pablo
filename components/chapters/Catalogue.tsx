"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { projects, categoryLabels } from "@/data/projects";
import type { Project, ProjectCategory } from "@/lib/content/types";

type Filter = "all" | ProjectCategory;

const CATS: ProjectCategory[] = ["design", "video", "sound"];
const ease = [0.16, 1, 0.3, 1] as const;

export function Catalogue() {
  const { t, locale } = useLanguage();
  const w = t.work;
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section id="projets" className="bg-paper-2 px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel index="02" label={w.label} />
        </Reveal>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <RevealText
            as="h2"
            text={w.title}
            className="font-display uppercase"
            style={{ fontSize: "var(--text-h2)", lineHeight: "var(--text-h2--line-height)" }}
          />
          <Reveal delayIndex={1} as="p" className="text-mute max-w-xs text-base leading-relaxed">
            {w.intro}
          </Reveal>
        </div>

        {/* Filters */}
        <Reveal delayIndex={1}>
          <div className="border-line mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t pt-5">
            {(["all", ...CATS] as Filter[]).map((f) => {
              const label = f === "all" ? w.filterAll : categoryLabels[f][locale];
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={active}
                  className={`relative text-sm font-medium transition-colors duration-200 ${
                    active ? "text-ink" : "text-faint hover:text-mute"
                  }`}
                >
                  {label}
                  {active && (
                    <motion.span
                      layoutId="filter-underline"
                      className="bg-ink absolute -bottom-[1.4rem] left-0 h-px w-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Grid */}
        <motion.ul layout className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, ease, delay: (i % 3) * 0.05 }}
              >
                <ProjectCard project={p} comingSoon={w.comingSoon} roleLabel={w.roleLabel} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  comingSoon,
  roleLabel,
}: {
  project: Project;
  comingSoon: string;
  roleLabel: string;
}) {
  const { locale } = useLanguage();
  const isPlaceholder = project.status === "placeholder" || !project.cover;

  return (
    <figure className="group">
      <div className="border-line bg-paper relative aspect-[4/5] w-full overflow-hidden border">
        {isPlaceholder ? (
          <>
            {/* Faint particle field — intentional empty slot */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-60"
              style={{
                backgroundImage: "radial-gradient(rgba(10,10,10,0.25) 1px, transparent 1.4px)",
                backgroundSize: "9px 9px",
                maskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, #000 25%, transparent 75%)",
                WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, #000 25%, transparent 75%)",
              }}
            />
            <span className="text-faint absolute right-3 top-3 text-[0.6rem] font-medium uppercase tracking-[0.18em]">
              {comingSoon}
            </span>
          </>
        ) : (
          <Image
            src={project.cover as string}
            alt={project.title[locale]}
            fill
            sizes="(max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        )}

        {/* Index tick */}
        <span className="text-ink/50 absolute left-3 top-3 font-display text-xs">
          {String(indexOf(project)).padStart(2, "0")}
        </span>
      </div>

      <figcaption className="mt-3">
        <span className="text-faint text-[0.65rem] font-medium uppercase tracking-[0.16em]">
          {categoryLabels[project.category][locale]}
        </span>
        <h3
          className="font-display text-ink mt-1"
          style={{ fontSize: "clamp(1.05rem,1.6vw,1.4rem)", fontWeight: 700, letterSpacing: "-0.01em" }}
        >
          {project.title[locale]}
        </h3>
        {project.role && (
          <p className="text-mute mt-1 text-sm">
            <span className="text-faint">{roleLabel} — </span>
            {project.role[locale]}
          </p>
        )}
      </figcaption>
    </figure>
  );
}

// Stable 1-based index within the full catalogue (for the tick number).
function indexOf(project: Project) {
  return projects.findIndex((p) => p.slug === project.slug) + 1;
}
