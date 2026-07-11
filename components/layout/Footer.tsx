"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper/60 no-print px-6 pb-12 sm:px-10 lg:px-16">
      <div className="border-paper/10 mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 border-t pt-8 sm:flex-row sm:items-center">
        <span className="font-display text-paper text-base whitespace-nowrap">Pablo Assad</span>
        {/* La Mesure — the site is set to a tempo, like everything else here */}
        <span className="text-xs uppercase tracking-[0.15em] whitespace-nowrap">
          {t.footer.note} <span className="text-paper/35">· ♩ = 120</span>
        </span>
        <span className="text-xs whitespace-nowrap">
          © {year} — {t.footer.rights}
        </span>
      </div>
    </footer>
  );
}
