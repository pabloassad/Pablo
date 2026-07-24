"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const SESSION_KEY = "pa_intro_seen";

/**
 * Cinematic title card. On the first visit of a session it holds the name over
 * a dark ground, then lifts away like a curtain to reveal the page. Shown once
 * per session (sessionStorage) on every device — reduced-motion visitors get
 * the same card, just without the vertical drift.
 */
export function Intro() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
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
    // Long enough to actually register as a title card on fast devices (the
    // 500ms version read as a flicker, or absent), short enough to uncover the
    // hero (the LCP element) quickly. The card then dissolves uniformly.
    const timer = setTimeout(() => setShow(false), 900);
    return () => clearTimeout(timer);
  }, []);

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
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: reduced ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
