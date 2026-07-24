"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

/**
 * Custom 404, in the site's register: the code set large like the affiche, a
 * quiet line, and two ways back. Rendered inside the root layout, so it keeps
 * the nav, footer and language toggle — a lost page still feels like the site.
 */
export default function NotFound() {
  const { t } = useLanguage();
  const n = t.notFound;

  return (
    <section className="flex min-h-[100svh] flex-col justify-center px-4 pt-24 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1600px]">
        <span className="kicker">{n.code}</span>

        <p
          className="font-display text-ink mt-5 select-none uppercase"
          style={{ fontSize: "clamp(4.5rem, 24vw, 20rem)", lineHeight: 0.82, letterSpacing: "-0.04em", fontWeight: 800 }}
          aria-hidden
        >
          404
        </p>

        <h1
          className="font-display text-ink mt-6 uppercase"
          style={{ fontSize: "var(--text-h3)", lineHeight: "var(--text-h3--line-height)", fontWeight: 700, letterSpacing: "-0.02em" }}
        >
          {n.title}
        </h1>

        <p className="text-mute mt-4 max-w-md text-lg leading-relaxed text-pretty">{n.lead}</p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link
            href="/"
            className="group bg-ink text-paper inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-medium transition-opacity duration-300 hover:opacity-85"
          >
            {n.home}
            <span aria-hidden className="inline-block transition-transform duration-300 ease-out group-hover:-translate-x-0.5">
              ←
            </span>
          </Link>
          <Link
            href="/repertoire"
            className="group border-ink/25 text-ink hover:border-ink inline-flex items-center gap-2.5 rounded-full border px-7 py-3.5 text-sm font-medium transition-colors duration-300"
          >
            {n.work}
            <span aria-hidden className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
