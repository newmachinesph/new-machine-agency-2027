import { Button, Heading, Hr, Section, Text } from "@react-email/components";
import { site, whatsappHref } from "@/config/site";
import Layout from "./Layout";
import { brand } from "./theme";

export type ConfirmationData = {
  name: string;
  service?: string;
  message: string;
};

/** Friendly auto-reply sent to the visitor so they know the message landed. */
export default function InquiryConfirmation({
  name,
  service,
  message,
}: ConfirmationData) {
  const firstName = name.split(" ")[0] || name;

  return (
    <Layout
      preview={`Thanks for reaching out to ${site.name}, we'll reply within 24 hours.`}
      eyebrow="Message received"
    >
      <Heading style={heading}>Thanks, {firstName}.</Heading>
      <Text style={intro}>
        We have your message and a real person on our team will get back to you
        within 24 hours, usually much faster. No bots, no account managers, just
        a straight answer from the people who would do the work.
      </Text>

      <Text style={recapLabel}>What you sent us</Text>
      <Section style={card}>
        {service ? (
          <div style={rowStyle}>
            <Text style={rowLabel}>Service</Text>
            <Text style={rowValue}>{service}</Text>
          </div>
        ) : null}
        <Text style={rowLabel}>Message</Text>
        <Text style={messageText}>{message}</Text>
      </Section>

      <Text style={intro}>
        If it is urgent, the fastest way to reach us is WhatsApp. Otherwise, sit
        tight, we will be in touch shortly.
      </Text>

      <Section style={{ textAlign: "center", padding: "6px 0 4px" }}>
        <Button href={whatsappHref} style={button}>
          Message us on WhatsApp
        </Button>
      </Section>

      <Hr style={rule} />
      <Text style={signoff}>
        Talk soon,
        <br />
        <span style={{ color: brand.text, fontWeight: 600 }}>
          The {site.name} team
        </span>
      </Text>
    </Layout>
  );
}

const heading: React.CSSProperties = {
  color: brand.text,
  fontSize: "24px",
  fontWeight: 800,
  letterSpacing: "-0.02em",
  margin: "0 0 8px",
};

const intro: React.CSSProperties = {
  color: brand.muted,
  fontSize: "15px",
  lineHeight: "1.7",
  margin: "0 0 22px",
};

const recapLabel: React.CSSProperties = {
  color: brand.muted,
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  margin: "0 0 8px",
};

const card: React.CSSProperties = {
  backgroundColor: brand.panel,
  border: `1px solid ${brand.border}`,
  borderLeft: `3px solid ${brand.sage}`,
  borderRadius: "10px",
  padding: "4px 18px",
  margin: "0 0 24px",
};

const rowStyle: React.CSSProperties = {
  borderBottom: `1px solid ${brand.border}`,
  padding: "10px 0",
};

const rowLabel: React.CSSProperties = {
  color: brand.muted,
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  margin: "10px 0 2px",
};

const rowValue: React.CSSProperties = {
  color: brand.text,
  fontSize: "15px",
  fontWeight: 500,
  margin: 0,
};

const messageText: React.CSSProperties = {
  color: brand.text,
  fontSize: "15px",
  lineHeight: "1.7",
  whiteSpace: "pre-wrap",
  margin: "4px 0 12px",
};

const button: React.CSSProperties = {
  backgroundColor: brand.sageDeep,
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: 700,
  padding: "13px 26px",
  textDecoration: "none",
};

const rule: React.CSSProperties = {
  borderColor: brand.border,
  margin: "26px 0 16px",
};

const signoff: React.CSSProperties = {
  color: brand.muted,
  fontSize: "15px",
  lineHeight: "1.7",
  margin: 0,
};
