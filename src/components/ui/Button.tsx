import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "ghost";
  className?: string;
  disabled?: boolean;
  children: ReactNode;
};

const variants = {
  primary:
    "inline-flex items-center justify-center gap-2 bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition hover:bg-accent-strong",
  ghost:
    "inline-flex items-center justify-center gap-2 border border-border px-6 py-3 text-sm font-semibold text-fg transition hover:border-accent hover:text-accent-fg",
} as const;

export default function Button({
  href,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled,
  children,
}: ButtonProps) {
  const classes = `${variants[variant]} ${className}`.trim();

  if (href) {
    if (href.startsWith("http")) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
