import Image from "next/image";
import Link from "next/link";
import { navLinks, site, whatsappHref } from "@/config/site";
import { stages } from "@/lib/services";
import PatternMosaic from "@/components/ui/PatternMosaic";
import PatternTrace from "@/components/ui/PatternTrace";
import PatternGrid from "@/components/ui/PatternGrid";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <PatternMosaic rows={2} className="h-16 w-full" />
      <div className="relative overflow-hidden" aria-hidden="true">
        <Image
          src="/nomad-background.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover grayscale"
        />
        <div className="absolute inset-0 bg-accent-deep mix-blend-multiply" />
        <div className="absolute inset-0 bg-accent-deep/30" />
        <PatternTrace
          idPrefix="pt-footer"
          className="absolute inset-0 text-accent opacity-45"
        />
        <p className="footer-word relative text-center">NOMAD</p>
      </div>

      <div className="wrap relative grid gap-10 py-16 md:grid-cols-[1.7fr_1fr_1fr_1fr] md:py-20">
        <PatternGrid
          cols={3}
          rows={3}
          seed={3}
          className="pointer-events-none absolute -left-6 top-0 hidden h-40 w-40 opacity-[0.08] md:block"
        />
        <div>
          <p className="font-display text-xl font-bold uppercase tracking-tight">
            Nomad<span className="text-accent-fg">*</span>Media
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Full-lifecycle startup studio — remote-first, building with founders worldwide.
          </p>
          <div className="mt-6 flex gap-5">
            {site.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted transition-colors hover:text-fg"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
            Pages
          </p>
          <ul className="mt-5 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-fg"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="text-sm text-muted transition-colors hover:text-fg"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
            Services
          </p>
          <ul className="mt-5 space-y-3">
            {stages.map((stage) => (
              <li key={stage}>
                <Link
                  href="/services/"
                  className="text-sm text-muted transition-colors hover:text-fg"
                >
                  {stage}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/services/"
                className="text-sm font-semibold text-accent-fg transition-colors hover:text-fg"
              >
                All services →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
            Get in touch
          </p>
          <ul className="mt-5 space-y-3">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-sm text-muted transition-colors hover:text-fg"
              >
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted transition-colors hover:text-fg"
              >
                WhatsApp
              </a>
            </li>
            <li className="text-sm text-muted">We reply within 24 hours.</li>
          </ul>

          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.15em] text-muted">
            Offices
          </p>
          <ul className="mt-4 space-y-4">
            {site.offices.map((office) => (
              <li key={office.region} className="text-sm leading-relaxed text-muted">
                <span className="block text-fg">
                  {office.flag} {office.region}
                </span>
                {office.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                <a
                  href={`tel:${office.phone.replace(/[^+\d]/g, "")}`}
                  className="mt-1 inline-block transition-colors hover:text-fg"
                >
                  {office.phone}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="wrap flex flex-wrap items-center justify-between gap-3 py-6 text-xs text-muted">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="uppercase tracking-[0.2em] text-[10px]">
            Est. 2026 — Built nomadic
          </p>
          <div className="flex gap-5">
            <Link href="/privacy-policy/" className="transition-colors hover:text-fg">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service/" className="transition-colors hover:text-fg">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
