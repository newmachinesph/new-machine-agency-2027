"use client";

import { useState, type FormEvent } from "react";
import services from "@/content/services.json";
import { site } from "@/config/site";
import Button from "@/components/ui/Button";

type Status = "idle" | "sending" | "sent" | "error" | "mailto";

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
      return;
    }

    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const company = String(data.get("company") ?? "");
    const service = String(data.get("service") ?? "");
    const message = String(data.get("message") ?? "");

    const endpoint: string = site.formEndpoint;
    if (endpoint) {
      setStatus("sending");
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`);
        setStatus("sent");
        form.reset();
      } catch {
        setStatus("error");
      }
      return;
    }

    // No form provider configured, fall back to the visitor's email app.
    const details = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : "",
      service ? `Service: ${service}` : "",
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Inquiry from ${name}`,
    )}&body=${encodeURIComponent(details)}`;
    setStatus("mailto");
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
            Something went wrong. Please try WhatsApp or email instead.
          </p>
        ) : null}
        {status === "mailto" ? (
          <p className="text-muted">
            Your email app should open. If not, write to us directly at {site.email}.
          </p>
        ) : null}
      </div>
    </form>
  );
}
