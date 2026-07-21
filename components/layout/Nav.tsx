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
      {/* Three balanced groups on one baseline: monogram · the two spaces · FR/EN + CTA */}
      <nav className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 sm:px-10 lg:px-16">
        <Link href="/" className="font-display justify-self-start text-lg tracking-tight" style={{ fontWeight: 700 }}>
          <span className="hidden sm:inline">Pablo Assad</span>
          <span className="sm:hidden">P.A.</span>
        </Link>

        {/* The two spaces — centred */}
        <ul className="flex items-center gap-7 justify-self-center sm:gap-9">
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

        <div className="flex shrink-0 items-center gap-5 justify-self-end">
          <LangToggle />
          <a
            href={onRepertoire ? "/#contact" : "#contact"}
            className="bg-ink text-paper hidden rounded-full px-5 py-2 text-sm font-medium transition-opacity duration-300 hover:opacity-85 md:inline-block"
          >
            {t.nav.cta}
          </a>
        </div>
      </nav>
    </header>
  );
}
