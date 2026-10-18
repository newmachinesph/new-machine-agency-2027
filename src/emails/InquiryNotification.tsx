import { Button, Heading, Hr, Section, Text } from "@react-email/components";
import Layout from "./Layout";
import { brand } from "./theme";

export type InquiryData = {
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
  /** Pre-formatted, human-readable submission timestamp. */
  submittedAt: string;
};

/** Internal notification sent to the studio inbox for each new inquiry. */
export default function InquiryNotification({
  name,
  email,
  company,
  service,
  message,
  submittedAt,
}: InquiryData) {
  const rows: Array<[string, string]> = [
    ["Name", name],
    ["Email", email],
    ...(company ? ([["Company", company]] as Array<[string, string]>) : []),
    ...(service ? ([["Service", service]] as Array<[string, string]>) : []),
    ["Submitted", submittedAt],
  ];

  return (
    <Layout
      preview={`New inquiry from ${name}${company ? ` at ${company}` : ""}`}
      eyebrow="New website inquiry"
    >
      <Heading style={heading}>New inquiry</Heading>
      <Text style={intro}>
        Someone just reached out through the contact form. The details are below,
        and you can reply to them directly.
      </Text>

      <Section style={card}>
        {rows.map(([label, value]) => (
          <div key={label} style={rowStyle}>
            <Text style={rowLabel}>{label}</Text>
            <Text style={rowValue}>{value}</Text>
          </div>
        ))}
      </Section>

      <Text style={messageLabel}>Message</Text>
      <Section style={messageBox}>
        <Text style={messageText}>{message}</Text>
      </Section>

      <Section style={{ textAlign: "center", padding: "8px 0 4px" }}>
        <Button
          href={`mailto:${email}?subject=${encodeURIComponent(
            `Re: your inquiry to New Machine`,
          )}`}
          style={button}
        >
          Reply to {name.split(" ")[0] || name}
        </Button>
      </Section>

      <Hr style={rule} />
      <Text style={footNote}>
        Sent automatically by the contact form. Reply to this email to respond,
        it is addressed to {email}.
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
  lineHeight: "1.6",
  margin: "0 0 22px",
};

const card: React.CSSProperties = {
  backgroundColor: brand.panel,
  border: `1px solid ${brand.border}`,
  borderLeft: `3px solid ${brand.sage}`,
  borderRadius: "10px",
  padding: "6px 18px",
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
  margin: "0 0 2px",
};

const rowValue: React.CSSProperties = {
  color: brand.text,
  fontSize: "15px",
  fontWeight: 500,
  margin: 0,
  wordBreak: "break-word",
};

const messageLabel: React.CSSProperties = {
  color: brand.muted,
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  margin: "0 0 8px",
};

const messageBox: React.CSSProperties = {
  backgroundColor: "#ffffff",
  border: `1px solid ${brand.border}`,
  borderRadius: "10px",
  padding: "4px 18px",
  margin: "0 0 26px",
};

const messageText: React.CSSProperties = {
  color: brand.text,
  fontSize: "15px",
  lineHeight: "1.7",
  whiteSpace: "pre-wrap",
  margin: "12px 0",
};

const button: React.CSSProperties = {
  backgroundColor: brand.ink,
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

const footNote: React.CSSProperties = {
  color: brand.muted,
  fontSize: "12px",
  lineHeight: "1.6",
  margin: 0,
};
