import { cn } from "@/lib/utils";

/**
 * La Mesure — sections are numbered like bars on a score. The eyebrow reads:
 * bar number, double bar-line, label. The double bar is the site's recurring
 * gesture; it replaces the generic hairline everywhere a section opens.
 */
export function SectionLabel({
  index,
  label,
  className,
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="mono text-ink text-xs">{index}</span>
      <span className="flex items-center gap-[3px]" aria-hidden>
        <span className="bg-ink/70 h-3 w-px" />
        <span className="bg-ink/70 h-3 w-[2px]" />
      </span>
      <span className="kicker whitespace-nowrap">{label}</span>
    </div>
  );
}
