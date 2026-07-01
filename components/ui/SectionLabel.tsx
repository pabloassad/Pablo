import { cn } from "@/lib/utils";

interface SectionLabelProps {
  index: string;
  label: string;
  className?: string;
}

/** Swiss eyebrow with a section number — index, hairline, label. */
export function SectionLabel({ index, label, className }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="font-display text-ink text-xs tracking-tight">{index}</span>
      <span className="hairline w-8 shrink-0" aria-hidden />
      <span className="kicker">{label}</span>
    </div>
  );
}
