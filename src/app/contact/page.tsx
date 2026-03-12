import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/contact-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { contactMethods } from "@/data/contact";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  const isExternalHref = (href: string) => href.startsWith("http") || href.startsWith("mailto:");
  const isHttpHref = (href: string) => href.startsWith("http");

  return (
    <section className="space-y-6 text-left">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Contact</CardTitle>
          <p className="text-muted-foreground text-sm">
            Reach out for collaboration, software engineering opportunities, or project inquiries.
          </p>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Send a message</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground text-sm">
            Please fill out the form below and I&apos;ll get back to you as soon as possible.
          </p>
          <ContactForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Direct links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {contactMethods.map((method) =>
              isExternalHref(method.href) ? (
                <a
                  key={method.label}
                  href={method.href}
                  target={isHttpHref(method.href) ? "_blank" : undefined}
                  rel={isHttpHref(method.href) ? "noopener noreferrer" : undefined}
                  className="text-muted-foreground hover:text-foreground text-sm underline underline-offset-4 transition-colors"
                >
                  {method.label}: {method.value}
                </a>
              ) : (
                <Link
                  key={method.label}
                  href={method.href}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {method.label}: {method.value}
                </Link>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
