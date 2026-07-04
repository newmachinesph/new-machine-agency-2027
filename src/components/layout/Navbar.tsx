"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/config/site";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

export default function Navbar() {
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 8,
    () => false,
  );
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu on navigation (state adjustment during render).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    if (open) setOpen(false);
  }

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled || open
          ? "border-b border-border bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-extrabold tracking-tight">
          nomad<span className="text-accent-fg">media</span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm transition-colors ${
                isActive(link.href) ? "font-medium text-fg" : "text-muted hover:text-fg"
              }`}
            >
              {link.label}
              {isActive(link.href) ? (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
                />
              ) : null}
            </Link>
          ))}
          <ThemeToggle />
          <Button href="/contact" className="px-5 py-2.5">
            Contact Us
          </Button>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open ? (
        <div className="fixed inset-0 top-16 z-40 flex flex-col gap-6 bg-bg px-6 py-10 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-3xl font-semibold ${
                isActive(link.href) ? "text-accent-fg" : "text-fg"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4">
            <Button href="/contact">Contact Us</Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
