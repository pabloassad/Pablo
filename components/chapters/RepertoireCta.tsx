"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";

const COVERS = [
  "/works/adonis/cover.webp",
  "/works/le-cercle/02.webp",
  "/works/boss-lady/cover.webp",
];

/**
 * The single, strong doorway from the Presentation to the Répertoire: a
 * full-width ink card where three real covers fan out on hover and the title
 * slides its arrow. One CTA, impossible to miss, impossible to mistake.
 */
export function RepertoireCta() {
  const { t } = useLanguage();
  const c = t.repCta;
  const reduced = useReducedMotion();

  return (
    <section className="bg-paper px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Link
            href="/repertoire"
            className="group bg-ink relative block overflow-hidden px-7 py-14 sm:px-12 sm:py-20"
          >
            {/* Cover fan — quietly parked, spreads on hover */}
            <div
              aria-hidden
              className="pointer-events-none absolute right-[-2rem] top-1/2 hidden -translate-y-1/2 md:block"
            >
              {COVERS.map((src, i) => (
                <motion.div
                  key={src}
                  initial={false}
                  className="border-paper/20 absolute right-16 top-1/2 h-52 w-40 origin-bottom overflow-hidden border shadow-2xl transition-transform duration-500 ease-out lg:h-64 lg:w-52"
                  style={{
                    translateY: "-50%",
                    rotate: reduced ? 0 : (i - 1) * 4,
                    zIndex: 3 - i,
                  }}
                >
                  <div
                    className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105"
                    style={{
                      transform: `translateX(${(i - 1) * 6}px)`,
                    }}
                  >
                    <Image src={src} alt="" fill sizes="240px" className="object-cover opacity-90" />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="relative z-10 max-w-2xl">
              <span className="text-paper/50 text-[0.65rem] font-medium uppercase tracking-[0.22em]">
                {c.kicker}
              </span>
              <span
                className="font-display text-paper mt-4 block uppercase transition-transform duration-500 ease-out group-hover:translate-x-2"
                style={{ fontSize: "clamp(2rem,5.5vw,4.5rem)", lineHeight: 0.95, fontWeight: 800, letterSpacing: "-0.02em" }}
              >
                {c.title}
                <motion.span
                  aria-hidden
                  className="ml-4 inline-block transition-transform duration-500 ease-out group-hover:translate-x-3"
                >
                  →
                </motion.span>
              </span>
              <span className="text-paper/60 mt-4 block text-base">{c.sub}</span>
            </div>

            {/* Sweep line */}
            <span
              aria-hidden
              className="bg-paper/30 absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
