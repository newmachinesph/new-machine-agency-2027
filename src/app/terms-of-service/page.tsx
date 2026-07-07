import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern your use of ${site.legalName}’s website and services.`,
  alternates: { canonical: "/terms-of-service/" },
};

export default function TermsOfServicePage() {
  return (
    <div className="wrap max-w-3xl pt-32 pb-24">
      <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-5xl">
        Terms of Service
      </h1>
      <p className="mt-4 text-sm text-muted">Last updated: 1 July 2026</p>

      <div className="prose mt-10">
        <h2>Agreement to terms</h2>
        <p>
          These Terms of Service (“Terms”) govern your use of the website operated by{" "}
          {site.legalName} (“we”, “us”, “our”) and any services we provide. By using
          this website or engaging our services, you agree to these Terms. If you do
          not agree, please do not use the website or our services. Individual client
          engagements may be covered by a separate written agreement; where that
          agreement conflicts with these Terms, the written agreement prevails.
        </p>

        <h2>Services</h2>
        <p>
          We provide digital growth services including website design, landing pages,
          corporate websites, social media management and lead generation, as described
          on this website. Service descriptions are indicative — the precise scope of
          any engagement is defined in the proposal or agreement we issue to you before
          work begins. We may update, expand or discontinue services at any time.
        </p>

        <h2>Quotes and payment</h2>
        <ul>
          <li>
            Every engagement starts with a written quote. The quoted price is fixed for
            the scope it describes and does not change unless the scope changes.
          </li>
          <li>
            Quotes are valid for 30 days from the date of issue unless stated otherwise.
          </li>
          <li>
            Payment terms — including any deposit, milestones and final payment — are
            set out in the quote or agreement. Work begins once the agreed deposit is
            received.
          </li>
          <li>
            Late payment may result in paused work or delayed delivery until the
            account is brought up to date.
          </li>
        </ul>

        <h2>Client responsibilities</h2>
        <p>To keep projects on schedule, you agree to:</p>
        <ul>
          <li>
            Provide the content, materials and information we reasonably need (text,
            images, brand assets, access credentials) in a timely manner.
          </li>
          <li>
            Review and approve deliverables within the agreed review windows. Delays in
            feedback extend the timeline accordingly.
          </li>
          <li>
            Ensure that any materials you supply do not infringe the rights of any
            third party and that you have the right to use them.
          </li>
        </ul>

        <h2>Intellectual property</h2>
        <p>
          Upon receipt of full payment, ownership of the final deliverables — including
          the design, code and content we created for you — transfers to you. Until
          full payment is received, all deliverables remain our property. We retain
          ownership of our pre-existing tools, frameworks and know-how used to produce
          the deliverables. We may showcase completed work in our portfolio and
          marketing materials unless you request otherwise in writing.
        </p>

        <h2>Third-party services</h2>
        <p>
          Projects often rely on third-party services such as hosting providers, domain
          registrars, form processors, analytics platforms and advertising networks.
          Those services are governed by their own terms and fees, which you are
          responsible for. We are not liable for outages, changes or data practices of
          third-party services.
        </p>

        <h2>Warranties and disclaimers</h2>
        <p>
          We perform our services with reasonable skill and care. However, the website
          and its content are provided “as is” without warranties of any kind, whether
          express or implied. We do not guarantee specific business outcomes — such as
          rankings, traffic volumes, lead counts or revenue — as these depend on
          factors beyond our control.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, {site.legalName} shall not be liable
          for any indirect, incidental, special or consequential damages — including
          loss of profits, revenue, data or business opportunity — arising out of or
          related to your use of the website or our services. Our total aggregate
          liability for any claim shall not exceed the amount you paid us for the
          specific service giving rise to the claim.
        </p>

        <h2>Termination</h2>
        <p>
          Either party may end an engagement with written notice. If you terminate a
          project in progress, payment is due for all work completed up to the date of
          termination, and any deposit is non-refundable to the extent it covers work
          already performed. We may suspend or terminate services where these Terms are
          materially breached and the breach is not remedied within a reasonable time.
        </p>

        <h2>Governing law</h2>
        <p>
          These Terms are governed by and construed in accordance with the laws of the
          Republic of the Philippines. Any dispute arising out of or in connection
          with these Terms or our services shall be subject to the exclusive jurisdiction
          of the courts of Makati City, Philippines.
        </p>

        <h2>Changes to these terms</h2>
        <p>
          We may revise these Terms from time to time. The “Last updated” date at the
          top of this page shows when they were last changed. Continued use of the
          website or our services after changes take effect constitutes acceptance of
          the revised Terms.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these Terms? Email us at {site.email} and we’ll be glad to
          clarify anything.
        </p>
      </div>
    </div>
  );
}
