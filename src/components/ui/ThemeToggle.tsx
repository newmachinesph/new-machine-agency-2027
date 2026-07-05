"use client";

import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const toggle = () => {
    const html = document.documentElement;
    html.classList.add("theme-anim");
    window.setTimeout(() => html.classList.remove("theme-anim"), 400);
    const next = html.dataset.theme === "dark" ? "light" : "dark";
    html.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage unavailable (private mode) — theme still applies for the session.
    }
  };

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggle}
      className="grid h-10 w-10 place-items-center border border-border transition hover:border-accent"
    >
      <Sun className="hidden dark:block" size={18} />
      <Moon className="dark:hidden" size={18} />
    </button>
  );
}
