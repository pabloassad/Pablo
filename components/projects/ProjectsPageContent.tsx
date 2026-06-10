"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { VenuesGrid } from "@/components/projects/VenuesGrid";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function ProjectsPageContent() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero kicker={t.projects.kicker} title={t.projects.title} intro={t.projects.intro} />

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {t.projects.items.map((item, i) => (
            <RevealItem key={item.slug} className={i === 0 ? "sm:col-span-2" : ""}>
              <ProjectCard slug={item.slug} title={item.title} tag={item.tag} short={item.short} featured={i === 0} />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <VenuesGrid />
    </>
  );
}
