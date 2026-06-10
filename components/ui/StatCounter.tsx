"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

interface StatCounterProps {
  value: string;
  label: string;
}

/* Animates "800+" / "1M+" / "7" style values by counting up the numeric part on view */
export function StatCounter({ value, label }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const match = value.match(/^([\d.]+)(.*)$/);
  const [display, setDisplay] = useState(match ? `0${match[2]}` : value);

  useEffect(() => {
    if (!inView || !match) return;
    const [, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        const formatted = numStr.includes(".") ? v.toFixed(1) : Math.round(v).toString();
        setDisplay(`${formatted}${suffix}`);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
      <span ref={ref} className="text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">
        {display}
      </span>
      <span className="text-xs uppercase tracking-[0.25em] text-muted">{label}</span>
    </div>
  );
}
