import { Fragment } from "react";

/**
 * Minimal inline rich text: renders **bold** markers as <strong>. Lets the case
 * copy stay a plain string in the data while surfacing the words that matter.
 */
export function RichText({ text, strongClass = "text-ink font-bold" }: { text: string; strongClass?: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
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
