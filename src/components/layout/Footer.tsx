import Image from "next/image";
import Link from "next/link";
import { navLinks, site } from "@/config/site";
import PatternMosaic from "@/components/ui/PatternMosaic";
import PatternTrace from "@/components/ui/PatternTrace";
import { IconArrowRight } from "@/components/ui/icons";

/** Statement footer: MACHINE band closes the page, one display-sized email
 *  link carries the CTA, navigation collapses to a single inline row. */
export default function Footer({ stages }: { stages: string[] }) {
  const year = new Date().getFullYear();
  const office = site.offices[0];

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
        <p className="footer-word relative text-center">MACHINE</p>
      </div>

      <div className="wrap grid gap-12 py-16 md:grid-cols-2 md:py-20">
        <div>
          <p className="font-display text-xl font-bold uppercase tracking-tight">
            New<span className="text-accent-fg">*</span>Machine
          </p>
          <p className="mt-4 max-w-sm text-sm font-medium leading-relaxed text-accent-fg">
            {site.principle}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            Full-lifecycle startup studio based in Makati, building with
            founders worldwide.
          </p>
        </div>

        <div className="md:text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
            Start the conversation
          </p>
          <a
            href={`mailto:${site.email}`}
            className="group mt-4 inline-flex items-center gap-3 font-display text-[clamp(1.4rem,3vw,2.5rem)] font-semibold tracking-tight text-fg transition-colors hover:text-accent-fg"
          >
            {site.email}
            <IconArrowRight className="h-6 w-6 shrink-0 text-accent-fg transition-transform duration-200 group-hover:translate-x-1" />
          </a>
          <p className="mt-3 text-sm text-muted">
            We reply within 24 hours ·{" "}
            {office ? `${office.region}: ${office.address.join(", ")}` : null}
          </p>
        </div>
      </div>

      <div className="border-t border-border">
        <nav
          aria-label="Footer"
          className="wrap flex flex-wrap items-center gap-x-7 gap-y-3 py-6"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-fg"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-sm text-muted transition-colors hover:text-fg"
          >
            Contact
          </Link>
          <span className="hidden flex-1 md:block" />
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
        </nav>
        <p className="wrap pb-6 text-xs text-muted">
          {stages.map((stage, i) => (
            <span key={stage}>
              {i > 0 && " · "}
              <Link
                href="/services/"
                className="transition-colors hover:text-fg"
              >
                {stage}
              </Link>
            </span>
          ))}
        </p>
      </div>

      <div className="border-t border-border">
        <div className="wrap flex flex-wrap items-center justify-between gap-3 py-6 text-xs text-muted">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="uppercase tracking-[0.2em] text-[10px]">
            Est. 2026, Built to run
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
