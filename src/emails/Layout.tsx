import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import type { ReactNode } from "react";
import { site } from "@/config/site";
import { brand, fontStack, LOGO_CID } from "./theme";

type LayoutProps = {
  /** Inbox preview snippet shown before the body is opened. */
  preview: string;
  /** Small uppercase label above nothing in particular, sits in the header. */
  eyebrow: string;
  children: ReactNode;
};

/**
 * Shared shell for every transactional email: a dark branded header with the
 * inlined logo (referenced by CID so it renders even when remote images are
 * blocked), the message body, and a dark footer with contact details.
 */
export default function Layout({ preview, eyebrow, children }: LayoutProps) {
  const office = site.offices[0];

  return (
    <Html lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={body}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Row>
              <Column style={{ width: "44px" }}>
                <Img
                  src={`cid:${LOGO_CID}`}
                  width="44"
                  height="44"
                  alt="New Machine"
                  style={logo}
                />
              </Column>
              <Column style={{ paddingLeft: "14px", verticalAlign: "middle" }}>
                <Text style={wordmark}>NEW MACHINE</Text>
                <Text style={eyebrowStyle}>{eyebrow}</Text>
              </Column>
            </Row>
          </Section>

          {/* Body */}
          <Section style={content}>{children}</Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerBrand}>{site.tagline}</Text>
            <Text style={footerText}>
              {office.address.join(", ")}
            </Text>
            <Text style={footerText}>
              <Link href={`mailto:${site.email}`} style={footerLink}>
                {site.email}
              </Link>
              {"  ·  "}
              <Link href={site.url} style={footerLink}>
                {site.domain}
              </Link>
            </Text>
            <Hr style={footerRule} />
            <Text style={footerFine}>
              You are receiving this email because you contacted {site.name}{" "}
              through {site.domain}.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body: React.CSSProperties = {
  backgroundColor: "#eceee9",
  fontFamily: fontStack,
  margin: 0,
  padding: "24px 0",
};

const container: React.CSSProperties = {
  width: "100%",
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: brand.paper,
  borderRadius: "14px",
  overflow: "hidden",
  border: `1px solid ${brand.border}`,
};

const header: React.CSSProperties = {
  backgroundColor: brand.ink,
  padding: "26px 32px",
};

const logo: React.CSSProperties = {
  borderRadius: "10px",
  display: "block",
};

const wordmark: React.CSSProperties = {
  color: "#ffffff",
  fontSize: "17px",
  fontWeight: 800,
  letterSpacing: "0.14em",
  lineHeight: "1.1",
  margin: "0 0 3px",
};

const eyebrowStyle: React.CSSProperties = {
  color: brand.sage,
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  margin: 0,
};

const content: React.CSSProperties = {
  padding: "34px 32px 8px",
};

const footer: React.CSSProperties = {
  backgroundColor: brand.ink,
  padding: "26px 32px 30px",
};

const footerBrand: React.CSSProperties = {
  color: "#ffffff",
  fontSize: "13px",
  fontWeight: 600,
  margin: "0 0 10px",
};

const footerText: React.CSSProperties = {
  color: brand.mutedOnInk,
  fontSize: "12px",
  lineHeight: "1.6",
  margin: "0 0 4px",
};

const footerLink: React.CSSProperties = {
  color: brand.sage,
  textDecoration: "none",
};

const footerRule: React.CSSProperties = {
  borderColor: "#26262b",
  margin: "16px 0 12px",
};

const footerFine: React.CSSProperties = {
  color: "#71717a",
  fontSize: "11px",
  lineHeight: "1.6",
  margin: 0,
};
