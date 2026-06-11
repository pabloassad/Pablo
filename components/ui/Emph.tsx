/*
 * Renders a copy string whose **marked** segments become semantic <strong>
 * emphasis — used for the long-form editorial texts (profile, Le Cercle,
 * private events) so translations stay plain strings.
 */
export function Emph({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-foreground">
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
}
