"use client";

import { useState, type FormEvent } from "react";
import services from "@/content/services.json";
import { site } from "@/config/site";
import Button from "@/components/ui/Button";

type Status = "idle" | "sending" | "sent" | "error";

const inputClasses =
  "w-full border border-border bg-card px-4 py-3 text-sm placeholder:text-muted focus:border-accent outline-none";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: bots fill the hidden field, silently pretend success.
    if (String(data.get("website") ?? "").length > 0) {
      setStatus("sent");
      form.reset();
      return;
    }

    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      service: String(data.get("service") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Contact endpoint responded ${res.status}`);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="panel chamfer relative space-y-5 p-8 md:p-10">
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium">
          Name <span className="text-accent-fg" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          placeholder="Your name"
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium">
          Email <span className="text-accent-fg" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="contact-company" className="mb-1.5 block text-sm font-medium">
          Company
        </label>
        <input
          id="contact-company"
          name="company"
          type="text"
          placeholder="Company name (optional)"
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="contact-service" className="mb-1.5 block text-sm font-medium">
          What do you need?
        </label>
        <select id="contact-service" name="service" defaultValue="" className={inputClasses}>
          <option value="" disabled>
            Select a service…
          </option>
          {services.map((service) => (
            <option key={service.slug} value={service.name}>
              {service.name}
            </option>
          ))}
          <option value="Something else">Something else</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium">
          Message <span className="text-accent-fg" aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your business and what you want to achieve."
          className={inputClasses}
        />
      </div>

      {/* Honeypot: hidden from real users. */}
      <div aria-hidden="true" className="hidden">
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Button type="submit" className="w-full" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </Button>

      <div aria-live="polite" className="text-sm">
        {status === "sent" ? (
          <p className="text-accent-fg">Thanks, we’ll get back to you within 24 hours.</p>
        ) : null}
        {status === "error" ? (
          <p className="text-muted">
            Something went wrong sending your message. Please email us directly
            at {site.email}, or try again.
          </p>
        ) : null}
      </div>
    </form>
  );
}
