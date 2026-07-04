import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/config/site";

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-ink shadow-lg transition hover:bg-accent-strong"
    >
      <MessageCircle size={22} />
    </a>
  );
}
