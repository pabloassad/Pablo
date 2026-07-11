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
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 sm:px-10 lg:px-16">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <span className="bg-ink block h-2 w-2 rounded-full transition-transform duration-500 group-hover:scale-125" aria-hidden />
          <span className="font-display hidden text-lg tracking-tight sm:block" style={{ fontWeight: 700 }}>
            Pablo Assad
          </span>
          <span className="font-display text-lg tracking-tight sm:hidden" style={{ fontWeight: 700 }}>
            P.A.
          </span>
        </Link>

        {/* The two spaces */}
        <ul className="flex items-center gap-6 sm:gap-8">
          {tabs.map((tab) => (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={tab.active ? "page" : undefined}
                className={cn(
                  "relative pb-1 text-sm font-medium transition-colors duration-200",
                  tab.active ? "text-ink" : "text-mute hover:text-ink",
                )}
              >
                {tab.label}
                {tab.active && (
                  <motion.span
                    layoutId="nav-tab-underline"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-ink absolute bottom-0 left-0 h-[2px] w-full"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-5">
          <LangToggle className="hidden sm:flex" />
          <a
            href={onRepertoire ? "/#contact" : "#contact"}
            className="bg-ink text-paper hidden rounded-full px-5 py-2 text-sm font-medium transition-opacity duration-300 hover:opacity-85 md:inline-block"
          >
            {t.nav.cta}
          </a>
          <LangToggle className="flex sm:hidden" />
        </div>
      </nav>
    </header>
  );
}
