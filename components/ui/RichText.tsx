import { Fragment } from "react";

/**
 * Minimal inline rich text: renders **bold** markers as <strong>, and a `\n`
 * as a line break that only shows on mobile (collapses on sm+). Lets the case
 * copy stay a plain string in the data while surfacing the words that matter
 * and controlling where a tight line wraps on small screens.
 */
export function RichText({ text, strongClass = "text-ink font-semibold" }: { text: string; strongClass?: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\n)/g);
  return (
    <>
      {parts.map((p, i) =>
        p === "\n" ? (
          <br key={i} className="sm:hidden" />
        ) : p.startsWith("**") && p.endsWith("**") ? (
          <strong key={i} className={strongClass}>
            {p.slice(2, -2)}
          </strong>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}
