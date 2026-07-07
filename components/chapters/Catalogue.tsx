"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { projects, categoryLabels } from "@/data/projects";
import type { Project, ProjectCategory } from "@/lib/content/types";

type Filter = "all" | ProjectCategory;

const CATS: ProjectCategory[] = ["design", "video", "sound"];
const ease = [0.16, 1, 0.3, 1] as const;
const HASH_PREFIX = "#projet-";

export function Catalogue() {
  const { t, locale } = useLanguage();
  const w = t.work;
  const [filter, setFilter] = useState<Filter>("all");
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const filtered = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );
  const openProject = useMemo(
    () => projects.find((p) => p.slug === openSlug) ?? null,
    [openSlug],
  );

  // Deep link: open from #projet-<slug> on load, keep the hash in sync.
  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash;
      if (h.startsWith(HASH_PREFIX)) {
        const slug = decodeURIComponent(h.slice(HASH_PREFIX.length));
        if (projects.some((p) => p.slug === slug)) {
           
          setOpenSlug(slug);
        }
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const open = useCallback((slug: string, el: HTMLElement) => {
    triggerRef.current = el;
    setOpenSlug(slug);
    history.replaceState(null, "", `${HASH_PREFIX}${slug}`);
  }, []);

  const close = useCallback(() => {
    setOpenSlug(null);
    history.replaceState(null, "", window.location.pathname);
    triggerRef.current?.focus();
    triggerRef.current = null;
  }, []);

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

        {/* Grid — the productions are the heroines */}
        <motion.ul layout className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-3">
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
                <ProjectCard
                  project={p}
                  comingSoon={w.comingSoon}
                  openLabel={w.open}
                  onOpen={open}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <ProjectModal project={openProject} onClose={close} />
    </section>
  );
}

function ProjectCard({
  project,
  comingSoon,
  openLabel,
  onOpen,
}: {
  project: Project;
  comingSoon: string;
  openLabel: string;
  onOpen: (slug: string, el: HTMLElement) => void;
}) {
  const { locale } = useLanguage();
  const isPlaceholder = project.status === "placeholder" || !project.cover;

  return (
    <button
      type="button"
      onClick={(e) => onOpen(project.slug, e.currentTarget)}
      aria-label={`${openLabel} — ${project.title[locale]}`}
      className="group block w-full text-left"
    >
      <span className="border-line bg-paper relative block aspect-[4/5] w-full overflow-hidden border">
        {isPlaceholder ? (
          <>
            <span
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
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        )}

        {/* Hover veil — title + category surface on demand */}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 translate-y-full bg-ink/85 px-4 py-3 backdrop-blur-sm transition-transform duration-400 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0"
        >
          <span
            className="font-display text-paper block truncate text-base"
            style={{ fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            {project.title[locale]}
          </span>
          <span className="text-paper/60 block text-[0.6rem] font-medium uppercase tracking-[0.16em]">
            {categoryLabels[project.category][locale]}
          </span>
        </span>
      </span>

      {/* Whisper caption — always there on touch, minimal */}
      <span className="mt-2 flex items-baseline justify-between gap-3 sm:hidden">
        <span className="font-display text-ink truncate text-sm" style={{ fontWeight: 600 }}>
          {project.title[locale]}
        </span>
        <span className="text-faint shrink-0 text-[0.6rem] uppercase tracking-[0.14em]">
          {project.year ?? ""}
        </span>
      </span>
    </button>
  );
}
