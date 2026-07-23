"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { LangToggle } from "@/components/ui/LangToggle";
import { cn } from "@/lib/utils";

/**
 * Two spaces, immediately legible: Présentation / Répertoire. The active tab
 * carries an animated underline; the contact CTA always lands on the
 * presentation page's contact chapter.
 */
export function Nav() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onRepertoire = pathname.startsWith("/repertoire");
  const tabs = [
    { href: "/", label: t.nav.presentation, active: !onRepertoire },
    { href: "/repertoire", label: t.nav.repertoire, active: onRepertoire },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 no-print",
        scrolled
          ? "border-line bg-paper/80 border-b py-3 backdrop-blur-xl"
          : "border-b border-transparent py-5",
      )}
    >
      {/* On phones a 3-column grid keeps the wide FR labels, FR/EN and contact
          from ever colliding; from sm up (where there's room) the two spaces are
          pinned to the true viewport centre so they read as perfectly centred. */}
      <nav className="relative mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 sm:flex sm:justify-between sm:px-10 lg:px-16">
        <Link href="/" className="font-display text-lg tracking-tight justify-self-start" style={{ fontWeight: 700 }}>
          <span className="hidden sm:inline">Pablo Assad</span>
          <span className="sm:hidden">P.A.</span>
        </Link>

        {/* The two spaces — centred (grid centre on mobile, viewport centre from sm) */}
        <ul className="flex items-center gap-7 justify-self-center sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:gap-9">
          {tabs.map((tab) => (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={tab.active ? "page" : undefined}
                className={cn(
                  "relative py-1 text-sm font-medium transition-colors duration-200",
                  tab.active ? "text-ink" : "text-mute hover:text-ink",
                )}
              >
                {tab.label}
                {tab.active && (
                  <motion.span
                    layoutId="nav-tab-underline"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-ink absolute -bottom-0.5 left-0 h-[2px] w-full"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-3 justify-self-end sm:gap-5">
          <LangToggle />
          {/* Contact stays reachable everywhere: on phones a quiet outline
              envelope that sits at the same weight as FR/EN; the full pill from
              sm up. */}
          <a
            href={onRepertoire ? "/#contact" : "#contact"}
            aria-label={t.nav.cta}
            className="text-ink hover:text-mute flex items-center transition-colors sm:bg-ink sm:text-paper sm:rounded-full sm:px-5 sm:py-2 sm:text-sm sm:font-medium sm:hover:text-paper sm:hover:opacity-85"
          >
            <svg className="sm:hidden" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            <span className="hidden sm:inline">{t.nav.cta}</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
