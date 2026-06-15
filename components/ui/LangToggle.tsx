"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

/** FR ⇄ EN switch — instant, no reload. */
export function LangToggle({ className }: { className?: string }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={cn(
        "flex items-center gap-1 font-mono text-xs tracking-[0.15em]",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {(["fr", "en"] as const).map((code, i) => (
        <span key={code} className="flex items-center">
          {i === 1 && <span className="text-faint mx-1" aria-hidden>/</span>}
          <button
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={locale === code}
            className={cn(
              "uppercase transition-colors duration-200",
              locale === code ? "text-ink" : "text-faint hover:text-muted",
            )}
          >
            {code}
          </button>
        </span>
      ))}
    </div>
  );
}
