"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { GradientArt } from "@/components/ui/GradientArt";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { projectArt } from "@/lib/data";
import { motion } from "framer-motion";

export function ProjectDetailContent({ slug }: { slug: string }) {
  const { t } = useLanguage();
  const item = t.projects.items.find((p) => p.slug === slug);
  const index = t.projects.items.findIndex((p) => p.slug === slug);
  const next = t.projects.items[(index + 1) % t.projects.items.length];

  if (!item) return null;

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <GradientArt
          variant={projectArt[item.slug] ?? "slate"}
          pattern="lines"
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        <div className="relative mx-auto flex min-h-[60vh] max-w-7xl flex-col justify-end gap-6 px-6 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-40 lg:px-12 lg:pt-48">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground">
              <span aria-hidden>←</span> {t.projects.back}
            </Link>
          </motion.div>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs uppercase tracking-[0.4em] text-accent"
          >
            {item.tag}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl text-balance text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl"
          >
            {item.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl text-balance text-base text-muted sm:text-lg"
          >
            {item.description}
          </motion.p>
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm uppercase tracking-[0.3em] text-muted"
          >
            {item.role}
          </motion.span>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-col gap-8">
          {item.body.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-balance text-base leading-relaxed text-muted sm:text-lg">{paragraph}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 rounded-2xl border border-line bg-background-elevated/60 p-8 lg:p-10">
            <p className="text-balance text-lg font-medium leading-relaxed tracking-tight sm:text-xl">{item.impact}</p>
          </div>
        </Reveal>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 sm:flex-row sm:items-center sm:px-8 lg:px-12">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-accent">{t.projects.kicker}</p>
            <h3 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">{next.title}</h3>
          </div>
          <div className="flex gap-3">
            <Button href={`/projects/${next.slug}`} variant="ghost">
              {t.projects.details}
            </Button>
            <Button href="/projects">{t.projects.back}</Button>
          </div>
        </div>
      </section>
    </>
  );
}
