"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const SESSION_KEY = "pa_intro_seen";

/**
 * Cinematic title card. On the first visit of a session it briefly holds the
 * name over a dark ground, then lifts away like a curtain to reveal the page.
 * Shown once per session (sessionStorage) and skipped entirely for
 * reduced-motion users.
 */
export function Intro() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduced) return;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      // Private mode / storage blocked — fail open and just show it.
    }
    // Client-only by design: the curtain must stay out of the server HTML so
    // crawlers and no-JS visitors get the content directly, never the overlay.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShow(true);
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const timer = setTimeout(() => setShow(false), 850);
    return () => clearTimeout(timer);
  }, [reduced]);

  const handleSettled = () => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore
    }
    document.documentElement.style.overflow = "";
  };

  return (
    <AnimatePresence onExitComplete={handleSettled}>
      {show && (
        <motion.div
          key="intro"
          aria-hidden
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="kicker text-paper/55">Portfolio</span>
            <p className="font-display mt-3 text-4xl font-light text-paper sm:text-6xl">
              Pablo Assad
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
