"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { navLinks } from "@/config/site";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import DuotoneImage from "@/components/ui/DuotoneImage";
import { IconArrowRight, IconWebsite } from "@/components/ui/icons";
import { stageGroups, serviceIcons } from "@/lib/services";
import products from "@/content/products.json";

type MegaKey = "services" | "products";

/** Which nav items open a mega panel, keyed by their config href. */
const MEGA_MENUS: Record<string, MegaKey> = {
  "/services": "services",
  "/products": "products",
};

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

function Caret({ open }: { open: boolean }) {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      aria-hidden="true"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="M2 3.5 L5 6.5 L8 3.5" />
    </svg>
  );
}

/** Desktop mega-menu trigger + its dropdown panel. Shared open/close and
 *  keyboard handling live on the wrapping group in Navbar. */
function MegaItem({
  label,
  href,
  menuKey,
  active,
  isCurrent,
  registerTrigger,
  onOpen,
  onToggle,
  children,
}: {
  label: string;
  href: string;
  menuKey: MegaKey;
  active: boolean;
  isCurrent: boolean;
  registerTrigger: (el: HTMLButtonElement | null) => void;
  onOpen: () => void;
  onToggle: () => void;
  children: ReactNode;
}) {
  const panelId = `mega-${menuKey}`;
  return (
    <div className="flex items-center" onMouseEnter={onOpen} onFocus={onOpen}>
      <button
        ref={registerTrigger}
        type="button"
        aria-haspopup="true"
        aria-expanded={active}
        aria-controls={panelId}
        onClick={onToggle}
        className={`relative flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] transition-colors ${
          isCurrent || active ? "font-semibold text-fg" : "text-muted hover:text-fg"
        }`}
      >
        {label}
        <Caret open={active} />
        {isCurrent ? (
          <span
            aria-hidden="true"
            className="absolute -bottom-1.5 left-[calc(50%-7px)] h-1 w-1 -translate-x-1/2 bg-accent"
          />
        ) : null}
      </button>
      {active ? (
        <div className="absolute inset-x-0 top-full pt-4">
          <div
            id={panelId}
            className="mega-panel glass chamfer p-6 md:p-8"
            aria-label={`${label} menu`}
          >
            {children}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ServicesPanel() {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-7 md:grid-cols-4 lg:grid-cols-[repeat(4,minmax(0,1fr))_1.2fr]">
      {stageGroups.map((group) => (
        <div key={group.stage}>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-accent-fg">
            {group.stage}
          </p>
          <ul className="mt-3 space-y-0.5">
            {group.services.map((service) => {
              const Icon = serviceIcons[service.icon] ?? IconWebsite;
              return (
                <li key={service.slug}>
                  <Link
                    href="/services/"
                    className="group/svc flex items-center gap-2.5 py-1 text-sm text-muted transition-colors hover:text-fg"
                  >
                    <Icon
                      size={15}
                      className="shrink-0 text-muted/70 transition-colors group-hover/svc:text-accent-fg"
                    />
                    <span>{service.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {/* Featured 2027 promo — links + image, the "combination" callout. */}
      <Link
        href="/services/"
        className="beam group/promo relative flex min-h-[13rem] flex-col justify-end overflow-hidden chamfer p-5 md:col-span-4 lg:col-span-1"
      >
        <DuotoneImage
          src="https://picsum.photos/seed/nomad-scale-2027/640/840"
          className="absolute inset-0"
          sizes="(min-width: 1024px) 16rem, 100vw"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent"
        />
        <div className="relative">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent-strong">
            Scale · Beyond
          </p>
          <p className="mt-2 font-display text-lg font-semibold leading-tight text-white">
            AI agents that run growth for you.
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
            Explore all services <IconArrowRight size={14} />
          </span>
        </div>
      </Link>
    </div>
  );
}

function ProductsPanel() {
  return (
    <div className="ml-auto w-full max-w-xl">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-accent-fg">
          Our products
        </p>
        <Link
          href="/products/"
          className="inline-flex items-center gap-1 text-xs font-semibold text-muted transition-colors hover:text-fg"
        >
          View all products <IconArrowRight size={13} />
        </Link>
      </div>
      <ul className="space-y-2">
        {products.map((product) => (
          <li key={product.slug}>
            <Link
              href={`/products/${product.slug}/`}
              className="beam group/prod flex items-center gap-4 chamfer border border-border bg-card/60 p-3"
            >
              <DuotoneImage
                src={`https://picsum.photos/seed/${product.slug}/200/150`}
                className="h-14 w-20 shrink-0 chamfer"
                sizes="80px"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-fg">{product.name}</span>
                  <span className="chamfer bg-accent/15 px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wide text-accent-fg">
                    {product.status}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-muted">{product.oneLiner}</p>
              </div>
              <IconArrowRight
                size={16}
                className="shrink-0 text-muted/70 transition-colors group-hover/prod:text-accent-fg"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Navbar() {
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 8,
    () => false,
  );
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<MegaKey | null>(null);
  const pathname = usePathname();
  const groupRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close menus on navigation (state adjustment during render).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    if (open) setOpen(false);
    if (active) setActive(null);
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
  const megaLinks = navLinks.filter((link) => MEGA_MENUS[link.href]);
  const plainLinks = navLinks.filter((link) => !MEGA_MENUS[link.href]);
  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const openMega = (key: MegaKey) => {
    cancelClose();
    setActive(key);
  };
  const closeMega = () => {
    cancelClose();
    setActive(null);
  };
  // Delay the close so crossing the header→panel seam doesn't drop the panel
  // before the cursor reaches it; re-entering the group cancels the timer.
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setActive(null), 150);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors ${
          scrolled || open || active
            ? "border-b border-border bg-bg/80 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <div className="wrap relative flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="Nomad Media home">
            <Logo className="h-5 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
            <div
              ref={groupRef}
              className="flex items-center gap-7 self-stretch"
              onMouseEnter={cancelClose}
              onMouseLeave={() => {
                if (!groupRef.current?.contains(document.activeElement)) scheduleClose();
              }}
              onBlur={(e) => {
                if (!groupRef.current?.contains(e.relatedTarget as Node)) closeMega();
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape" && active) {
                  const trigger = triggerRefs.current[active];
                  closeMega();
                  trigger?.focus();
                }
              }}
            >
              {megaLinks.map((link) => {
                const menuKey = MEGA_MENUS[link.href]!;
                return (
                  <MegaItem
                    key={link.href}
                    label={link.label}
                    href={link.href}
                    menuKey={menuKey}
                    active={active === menuKey}
                    isCurrent={isActive(link.href)}
                    registerTrigger={(el) => {
                      triggerRefs.current[menuKey] = el;
                    }}
                    onOpen={() => openMega(menuKey)}
                    onToggle={() =>
                      setActive((cur) => (cur === menuKey ? null : menuKey))
                    }
                  >
                    {menuKey === "services" ? <ServicesPanel /> : <ProductsPanel />}
                  </MegaItem>
                );
              })}
            </div>

            {plainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-xs uppercase tracking-[0.15em] transition-colors ${
                  isActive(link.href) ? "font-semibold text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {link.label}
                {isActive(link.href) ? (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 bg-accent"
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
              className="grid h-10 w-10 place-items-center border border-border"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — outside <header>: its backdrop-blur creates a containing
          block that would trap this fixed overlay and collapse its height. */}
      {open ? (
        <div className="fixed inset-0 top-16 z-40 flex flex-col gap-8 overflow-y-auto bg-bg px-6 py-10 md:hidden">
          {/* Services — grouped by lifecycle stage */}
          <div>
            <Link
              href="/services/"
              className={`font-display text-2xl font-semibold ${
                isActive("/services") ? "text-accent-fg" : "text-fg"
              }`}
            >
              Services
            </Link>
            <div className="mt-4 space-y-4">
              {stageGroups.map((group) => (
                <div key={group.stage}>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-accent-fg">
                    {group.stage}
                  </p>
                  <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5">
                    {group.services.map((service) => (
                      <li key={service.slug}>
                        <Link href="/services/" className="text-sm text-muted">
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <Link
              href="/products/"
              className={`font-display text-2xl font-semibold ${
                isActive("/products") ? "text-accent-fg" : "text-fg"
              }`}
            >
              Products
            </Link>
            <ul className="mt-3 space-y-2">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/products/${product.slug}/`}
                    className="flex items-center gap-2 text-sm text-muted"
                  >
                    <span className="text-fg">{product.name}</span>
                    <span className="chamfer bg-accent/15 px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-accent-fg">
                      {product.status}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Remaining links */}
          <div className="flex flex-col gap-5">
            {plainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-display text-2xl font-semibold ${
                  isActive(link.href) ? "text-accent-fg" : "text-fg"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-2">
            <Button href="/contact">Contact Us</Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
