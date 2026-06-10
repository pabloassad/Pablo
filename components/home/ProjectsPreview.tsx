"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function ProjectsPreview() {
  const { t } = useLanguage();
  const items = t.projects.items.slice(0, 3);

  return (
    <section className="border-y border-line bg-background-elevated/40">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
            <SectionHeading kicker={t.home.projectsLabel} title={t.home.projectsTitle} />
            <Button href="/projects" variant="ghost" className="shrink-0">
              {t.home.projectsCta}
            </Button>
          </div>
          <RevealGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {items.map((item, i) => (
              <RevealItem key={item.slug} className={i === 0 ? "sm:col-span-2" : ""}>
                <ProjectCard slug={item.slug} title={item.title} tag={item.tag} short={item.short} featured={i === 0} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
