import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  external?: boolean;
}

export function Button({ href, children, variant = "primary", className, external }: ButtonProps) {
  const base =
    "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm tracking-wide transition-all duration-300 ease-out";
  const styles =
    variant === "primary"
      ? "bg-foreground text-background hover:bg-accent hover:shadow-[0_0_30px_rgba(216,200,168,0.35)]"
      : "border border-line text-foreground hover:border-accent/50 hover:bg-white/[0.03]";

  const content = (
    <>
      <span>{children}</span>
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(base, styles, className)}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={clsx(base, styles, className)}>
      {content}
    </Link>
  );
}
