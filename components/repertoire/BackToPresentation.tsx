"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";

/** Elegant way back from the Répertoire to the Presentation. */
export function BackToPresentation() {
  const { t } = useLanguage();

  return (
    <section className="bg-paper-2 px-6 pb-24 sm:px-10 lg:px-16">
      <div className="border-line mx-auto max-w-7xl border-t pt-10">
        <Reveal>
          <Link
            href="/"
            className="group text-ink inline-flex items-center gap-3 text-sm font-medium"
          >
            <span
              aria-hidden
              className="inline-block transition-transform duration-400 ease-out group-hover:-translate-x-1.5"
            >
              ←
            </span>
            {t.work.back}
            <span className="hairline w-10 transition-[width] duration-400 ease-out group-hover:w-16" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
