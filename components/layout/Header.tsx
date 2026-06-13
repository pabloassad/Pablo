"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { navLinks } from "@/lib/data";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const { t, locale, toggleLocale } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || menuOpen ? "glass" : "bg-transparent border-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8 lg:h-20 lg:px-12">
          <Link href="/" aria-label="Pablito" className="flex items-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              {/* Black wordmark inverted to white for the dark theme */}
              <Image
                src="/logos/pablito.png"
                alt="Pablito"
                width={1534}
                height={202}
                priority
                className="block h-5 w-auto invert transition-[filter,opacity] duration-300 hover:opacity-80 lg:h-6"
              />
            </motion.span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "relative text-[13px] font-medium tracking-[0.04em] text-foreground/80 transition-colors duration-300 hover:text-foreground",
                    active && "text-foreground"
                  )}
                >
                  {t.nav[link.key]}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggleLocale}
              className="flex min-h-11 items-center gap-1 rounded-full border border-line px-3.5 py-2 text-xs font-medium tracking-widest text-muted transition-colors duration-300 hover:border-accent/50 hover:text-foreground"
              aria-label="Toggle language"
            >
              <span className={clsx(locale === "fr" && "text-accent")}>FR</span>
              <span className="text-line">/</span>
              <span className={clsx(locale === "en" && "text-accent")}>EN</span>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="relative flex h-11 w-11 flex-col items-center justify-center gap-[5px] md:hidden"
              aria-label={menuOpen ? t.nav.close : t.nav.menu}
              aria-expanded={menuOpen}
            >
              <motion.span
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
                className="block h-px w-5 bg-foreground transition-colors"
              />
              <motion.span
                animate={{ opacity: menuOpen ? 0 : 1 }}
                className="block h-px w-5 bg-foreground transition-colors"
              />
              <motion.span
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
                className="block h-px w-5 bg-foreground transition-colors"
              />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
