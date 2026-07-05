import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.legalName} collects, uses and protects your personal information.`,
  alternates: { canonical: "/privacy-policy/" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="wrap max-w-3xl pt-32 pb-24">
      <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-5xl">Privacy Policy</h1>
      <p className="mt-4 text-sm text-muted">Last updated: 1 July 2026</p>

      <div className="prose mt-10">
        <h2>Who we are</h2>
        <p>
          {site.legalName} (“we”, “us”, “our”) is a digital growth agency based in the
          United Arab Emirates, serving clients globally. This policy explains what
          information we collect when you use our website, why we collect it, and the
          choices you have. By using this website, you agree to the practices described
          here.
        </p>

        <h2>What we collect</h2>
        <p>We collect a deliberately small amount of information:</p>
        <ul>
          <li>
            <strong>Contact form data.</strong> When you send us a message, we receive
            the details you choose to share — typically your name, email address,
            company name, the service you’re interested in, and your message.
          </li>
          <li>
            <strong>Analytics data.</strong> If analytics are enabled on this site, we
            may collect anonymised usage information such as pages visited, approximate
            location (country or city level), device type and browser. This data does
            not directly identify you.
          </li>
          <li>
            <strong>Cookies and similar technologies.</strong> We may use a small number
            of cookies or local-storage entries — for example, to remember your theme
            preference. See the Cookies section below.
          </li>
        </ul>
        <p>
          We do not knowingly collect sensitive personal data, and we ask that you do
          not include it in messages to us.
        </p>

        <h2>How we use your information</h2>
        <ul>
          <li>To respond to your inquiries and provide the services you request.</li>
          <li>To prepare proposals and quotes you ask us for.</li>
          <li>To improve our website, services and communication.</li>
          <li>To comply with legal obligations that apply to us.</li>
        </ul>
        <p>
          We do not use your information for automated decision-making, and we do not
          send marketing email unless you have asked to receive it.
        </p>

        <h2>Legal basis</h2>
        <p>
          We process your information because it is necessary to respond to your
          request (for example, replying to a contact form submission), because we have
          a legitimate interest in operating and improving our business, or because you
          have given consent — which you may withdraw at any time by contacting us.
        </p>

        <h2>Sharing your information</h2>
        <p>
          We do not sell, rent or trade your personal information. We share it only
          with service providers who help us operate — such as email providers, form
          processing services and website hosting — and only to the extent needed for
          them to perform their work for us. These providers are bound by their own
          privacy and security obligations. We may also disclose information where the
          law requires it.
        </p>

        <h2>Data retention</h2>
        <p>
          We keep contact inquiries for as long as needed to handle your request and
          maintain our business records, after which they are deleted. Anonymised
          analytics data may be retained longer because it does not identify you. If
          you would like your information deleted sooner, contact us and we will remove
          it unless we are legally required to keep it.
        </p>

        <h2>Your rights</h2>
        <p>Depending on where you live, you may have the right to:</p>
        <ul>
          <li>Request a copy of the personal information we hold about you.</li>
          <li>Ask us to correct inaccurate information.</li>
          <li>Ask us to delete your information.</li>
          <li>Object to or restrict certain processing.</li>
          <li>Withdraw consent where processing is based on consent.</li>
        </ul>
        <p>
          To exercise any of these rights, email us at {site.email}. We respond to all
          legitimate requests within a reasonable timeframe.
        </p>

        <h2>Cookies</h2>
        <p>
          This site uses minimal cookies and local storage. We store your theme
          preference (light or dark) locally in your browser so the site remembers it
          on your next visit — this never leaves your device. If analytics are enabled,
          the analytics provider may set its own cookies; you can block or delete
          cookies at any time through your browser settings without breaking the site.
        </p>

        <h2>Third-party links</h2>
        <p>
          Our website contains links to external sites — such as WhatsApp and social
          media platforms. We are not responsible for the privacy practices of those
          sites, and we encourage you to read their privacy policies before sharing
          information with them.
        </p>

        <h2>Children</h2>
        <p>
          Our website and services are intended for businesses and are not directed at
          children under 16. We do not knowingly collect personal information from
          children. If you believe a child has provided us with personal information,
          contact us and we will delete it.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy from time to time as our services or legal
          obligations change. The “Last updated” date at the top of this page shows
          when it was last revised. Meaningful changes will be reflected on this page —
          we encourage you to review it periodically.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy or your personal information? Email us at{" "}
          {site.email} and we’ll be glad to help.
        </p>
      </div>
    </div>
  );
}
