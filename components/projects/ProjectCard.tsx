"use client";

import Link from "next/link";
import { GradientArt } from "@/components/ui/GradientArt";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { projectArt } from "@/lib/data";

export function ProjectCard({
  slug,
  title,
  tag,
  short,
  featured = false,
}: {
  slug: string;
  title: string;
  tag: string;
  short: string;
  featured?: boolean;
}) {
  const { t } = useLanguage();

  return (
    <Link
      href={`/projects/${slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-line transition-colors duration-500 hover:border-accent/40 ${
        featured ? "sm:col-span-2" : ""
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <GradientArt
          variant={projectArt[slug] ?? "slate"}
          pattern={featured ? "lines" : "circle"}
          className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
        <span className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-foreground backdrop-blur-sm">
          {tag}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6 lg:p-8">
        <h3 className="text-xl font-medium tracking-tight sm:text-2xl">{title}</h3>
        <p className="text-sm leading-relaxed text-muted sm:text-base">{short}</p>
        <span className="mt-2 inline-flex items-center gap-2 text-sm text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {t.projects.details}
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
