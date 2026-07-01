"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { LangToggle } from "@/components/ui/LangToggle";
import { cn } from "@/lib/utils";

export function Nav() {
  const { t } = useLanguage();
  const items = t.nav.items;
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 no-print",
        scrolled
          ? "border-line bg-paper/80 border-b py-3 backdrop-blur-xl"
          : "border-b border-transparent py-5",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 sm:px-10 lg:px-16">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="bg-ink block h-2 w-2 rounded-full transition-transform duration-500 group-hover:scale-125" aria-hidden />
          <span className="font-display text-lg tracking-tight" style={{ fontWeight: 700 }}>Pablo Assad</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "relative text-sm transition-colors duration-200",
                  active === item.id ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                {item.label}
                {active === item.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="bg-ink absolute -bottom-1.5 left-0 h-px w-full"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          <LangToggle className="hidden sm:flex" />
          <a
            href="#contact"
            className="bg-ink text-paper hidden rounded-full px-5 py-2 text-sm font-medium transition-opacity duration-300 hover:opacity-85 sm:inline-block"
          >
            {t.nav.cta}
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            className="text-ink flex flex-col gap-1.5 lg:hidden"
          >
            <span className={cn("h-px w-6 bg-current transition-transform duration-300", menuOpen && "translate-y-[3.5px] rotate-45")} />
            <span className={cn("h-px w-6 bg-current transition-transform duration-300", menuOpen && "-translate-y-[3.5px] -rotate-45")} />
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="bg-paper/95 border-line overflow-hidden border-t backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-6 sm:px-10">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-ink block py-2 text-2xl font-light"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="mt-4">
                <LangToggle />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
