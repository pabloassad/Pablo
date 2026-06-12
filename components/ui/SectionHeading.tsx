import clsx from "clsx";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  kicker,
  title,
  intro,
  align = "left",
  className,
}: {
  kicker?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={clsx("flex flex-col gap-5", align === "center" && "items-center text-center", className)}>
      {kicker && (
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent">{kicker}</span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="text-balance text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">{title}</h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p className={clsx("max-w-xl text-balance text-base text-muted sm:text-lg", align === "center" && "mx-auto")}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
