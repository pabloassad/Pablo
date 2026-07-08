"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { categoryLabels } from "@/data/projects";
import type { Project } from "@/lib/content/types";

const ease = [0.16, 1, 0.3, 1] as const;

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

/**
 * Image-first project overlay. Opens from a catalogue card; closes on ✕, Esc
 * or backdrop click. Focus is trapped inside while open, page scroll is
 * locked, and the URL hash carries a deep link (#projet-<slug>).
 * Placeholder entries get an intentional "coming soon" frame — never a hole.
 */
export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t, locale } = useLanguage();
  const panelRef = useRef<HTMLDivElement>(null);
  const w = t.work;

  // Scroll lock + Esc + focus trap while open.
  useEffect(() => {
    if (!project) return;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const panel = panelRef.current;
    const focusables = () =>
      panel
        ? Array.from(
            panel.querySelectorAll<HTMLElement>(
              'button, a[href], [tabindex]:not([tabindex="-1"])',
            ),
          )
        : [];
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const els = focusables();
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  const stop = useCallback((e: React.MouseEvent) => e.stopPropagation(), []);

  const media = project
    ? [
        ...(project.cover ? [{ src: project.cover, type: "image" as const }] : []),
        ...(project.media ?? []).filter((m) => m.src !== project.cover),
      ]
    : [];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[90] flex items-end justify-center bg-ink/45 p-0 backdrop-blur-sm sm:items-center sm:p-8"
          aria-hidden={false}
        >
          <motion.div
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 48, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.99 }}
            transition={{ duration: 0.45, ease }}
            onClick={stop}
            className="bg-paper relative flex max-h-[92svh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl sm:max-h-[85vh] sm:rounded-none sm:border"
          >
            {/* Header bar */}
            <div className="border-line flex items-start justify-between gap-6 border-b px-6 py-5 sm:px-8">
              <div>
                <span className="text-faint text-[0.65rem] font-medium uppercase tracking-[0.18em]">
                  {categoryLabels[project.category][locale]}
                  {project.year ? ` · ${project.year}` : ""}
                </span>
                <h3
                  id="project-modal-title"
                  className="font-display text-ink mt-1"
                  style={{ fontSize: "clamp(1.4rem,3vw,2.2rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}
                >
                  {project.title[locale]}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={w.close}
                className="border-line text-ink hover:bg-paper-2 mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors"
              >
                <span aria-hidden className="text-lg leading-none">×</span>
              </button>
            </div>

            {/* Body — image-first */}
            <div className="no-scrollbar overflow-y-auto px-6 py-6 sm:px-8">
              {media.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {media.map((m, i) =>
                    m.type === "video" ? (
                      <video
                        key={m.src}
                        src={m.src}
                        controls
                        playsInline
                        preload="metadata"
                        className="bg-ink max-h-[70svh] w-full sm:col-span-2"
                        style={{ objectFit: "contain" }}
                      />
                    ) : (
                      <div
                        key={m.src}
                        className={`bg-paper-2 relative overflow-hidden ${i === 0 ? "sm:col-span-2 aspect-[16/10]" : "aspect-[4/5]"}`}
                      >
                        <Image
                          src={m.src}
                          alt={m.alt?.[locale] ?? project.title[locale]}
                          fill
                          sizes="(max-width: 640px) 100vw, 896px"
                          className={i === 0 ? "object-contain" : "object-cover"}
                        />
                      </div>
                    ),
                  )}
                </div>
              ) : (
                <div className="border-line bg-paper-2 relative flex aspect-[16/10] items-center justify-center overflow-hidden border">
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage: "radial-gradient(rgba(10,10,10,0.25) 1px, transparent 1.4px)",
                      backgroundSize: "9px 9px",
                      maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 25%, transparent 75%)",
                      WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, #000 25%, transparent 75%)",
                    }}
                  />
                  <div className="relative text-center">
                    <span className="kicker">{w.comingSoon}</span>
                    <p className="text-mute mt-2 text-sm">{w.detailSoon}</p>
                  </div>
                </div>
              )}

              {/* Short copy — punctuation, never a slab */}
              <div className="border-line mt-6 grid gap-5 border-t pt-5 sm:grid-cols-2">
                {project.role && (
                  <div>
                    <span className="text-faint text-[0.65rem] font-medium uppercase tracking-[0.18em]">
                      {w.roleLabel}
                    </span>
                    <p className="text-ink mt-1 text-sm font-medium">{project.role[locale]}</p>
                    {project.client && <p className="text-mute mt-0.5 text-sm">{project.client}</p>}
                  </div>
                )}
                {project.blurb && (
                  <p className="text-mute text-sm leading-relaxed text-pretty">{project.blurb[locale]}</p>
                )}
              </div>

              {project.metrics && project.metrics.length > 0 && (
                <div className="border-line mt-5 grid grid-cols-2 gap-px border-t pt-5 sm:grid-cols-3">
                  {project.metrics.map((m) => (
                    <div key={m.label[locale]}>
                      <span className="font-display text-ink text-2xl" style={{ fontWeight: 800 }}>
                        {m.value}
                      </span>
                      <p className="text-faint mt-0.5 text-xs uppercase tracking-[0.12em]">{m.label[locale]}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
