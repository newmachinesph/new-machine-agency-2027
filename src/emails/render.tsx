import { render } from "@react-email/render";
import InquiryNotification, { type InquiryData } from "./InquiryNotification";
import InquiryConfirmation, {
  type ConfirmationData,
} from "./InquiryConfirmation";

type Rendered = { html: string; text: string };

async function renderBoth(element: React.ReactElement): Promise<Rendered> {
  const [html, text] = await Promise.all([
    render(element),
    render(element, { plainText: true }),
  ]);
  return { html, text };
}

/** Studio-facing notification email as HTML + plain-text alternative. */
export function renderNotificationEmail(data: InquiryData): Promise<Rendered> {
  return renderBoth(<InquiryNotification {...data} />);
}

/** Visitor-facing confirmation email as HTML + plain-text alternative. */
export function renderConfirmationEmail(
  data: ConfirmationData,
): Promise<Rendered> {
  return renderBoth(<InquiryConfirmation {...data} />);
}
