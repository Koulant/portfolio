"use client";

import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { contactMethods } from "@/data/contact";

function getContactEmail() {
  const emailMethod = contactMethods.find((method) => method.label.toLowerCase().includes("email"));

  return emailMethod?.value ?? "";
}

export function ContactForm() {
  const [status, setStatus] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const firstName = String(formData.get("firstName") || "").trim();
    const lastName = String(formData.get("lastName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const senderName = `${firstName} ${lastName}`.trim();
    const recipient = getContactEmail();

    if (!recipient) {
      setStatus("Contact email is not configured. Please use the direct links below.");
      return;
    }

    const subject = `Portfolio contact from ${senderName || "Website Visitor"}`;
    const body = `From: ${senderName || "Website Visitor"} (${email || "no email provided"})\n\n${message}`;
    const query = new URLSearchParams({
      subject,
      body,
    });
    const emailHref = `mailto:${recipient}?${query.toString()}`;

    window.location.href = emailHref;
    setStatus("Opening your email client...");
  };

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <label className="text-sm font-medium" htmlFor="firstName">
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Your first name"
            className="border-input placeholder:text-muted-foreground/80 focus-visible:border-ring focus-visible:ring-ring/50 h-11 w-full rounded-md border bg-transparent px-3 text-sm transition-colors outline-none focus-visible:ring-[3px]"
            required
          />
        </div>

        <div className="grid gap-1.5">
          <label className="text-sm font-medium" htmlFor="lastName">
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Your last name"
            className="border-input placeholder:text-muted-foreground/80 focus-visible:border-ring focus-visible:ring-ring/50 h-11 w-full rounded-md border bg-transparent px-3 text-sm transition-colors outline-none focus-visible:ring-[3px]"
            required
          />
        </div>
      </div>

      <div className="grid gap-1.5">
        <label className="text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Your email address"
          className="border-input placeholder:text-muted-foreground/80 focus-visible:border-ring focus-visible:ring-ring/50 h-11 w-full rounded-md border bg-transparent px-3 text-sm transition-colors outline-none focus-visible:ring-[3px]"
          required
        />
      </div>

      <div className="grid gap-1.5">
        <label className="text-sm font-medium" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Enter your message here..."
          rows={6}
          className="border-input placeholder:text-muted-foreground/80 focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-md border bg-transparent px-3 py-2.5 text-sm transition-colors outline-none focus-visible:ring-[3px]"
          required
        />
      </div>

      <Button type="submit" className="h-11 w-full text-sm">
        Submit
      </Button>

      {status ? <p className="text-muted-foreground text-xs">{status}</p> : null}
    </form>
  );
}
