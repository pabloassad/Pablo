import { cn } from "@/lib/utils";

interface SectionLabelProps {
  index: string;
  label: string;
  className?: string;
}

/** Mono eyebrow with a section number — the "studio timecode" motif. */
export function SectionLabel({ index, label, className }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="font-mono text-accent-deep text-xs tracking-[0.2em]">{index}</span>
      <span className="hairline w-8 shrink-0" aria-hidden />
      <span className="kicker">{label}</span>
    </div>
  );
}
