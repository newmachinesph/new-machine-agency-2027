import Image from "next/image";
import Link from "next/link";
import { navLinks, site, whatsappHref } from "@/config/site";
import services from "@/content/services.json";
import PatternMosaic from "@/components/ui/PatternMosaic";
import PatternTrace from "@/components/ui/PatternTrace";

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

      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.7fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-lg font-bold uppercase tracking-tight">
            Nomad<span className="text-accent-fg">*</span>Media
          </p>
          <p className="mt-3 text-sm text-muted">
            Digital growth agency based in the UAE, working with businesses worldwide.
          </p>
          <div className="mt-5 flex gap-4">
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
          <p className="text-sm font-semibold">Pages</p>
          <ul className="mt-4 space-y-2.5">
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
          <p className="text-sm font-semibold">Services</p>
          <ul className="mt-4 space-y-2.5">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href="/services/"
                  className="text-sm text-muted transition-colors hover:text-fg"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold">Get in touch</p>
          <ul className="mt-4 space-y-2.5">
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
