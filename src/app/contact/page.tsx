import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { contactMethods } from "@/data/contact";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  const isExternalHref = (href: string) => href.startsWith("http") || href.startsWith("mailto:");
  const isHttpHref = (href: string) => href.startsWith("http");

  return (
    <section className="space-y-8 text-left">
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
          <form className="space-y-6">
            <FieldGroup className="gap-5">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="firstName">First name</FieldLabel>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Your first name"
                    className="border-input placeholder:text-muted-foreground/80 focus-visible:border-ring focus-visible:ring-ring/50 h-11 w-full rounded-md border bg-transparent px-3 text-sm transition-colors outline-none focus-visible:ring-[3px]"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="lastName">Last name</FieldLabel>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Your last name"
                    className="border-input placeholder:text-muted-foreground/80 focus-visible:border-ring focus-visible:ring-ring/50 h-11 w-full rounded-md border bg-transparent px-3 text-sm transition-colors outline-none focus-visible:ring-[3px]"
                  />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your email address"
                  className="border-input placeholder:text-muted-foreground/80 focus-visible:border-ring focus-visible:ring-ring/50 h-11 w-full rounded-md border bg-transparent px-3 text-sm transition-colors outline-none focus-visible:ring-[3px]"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="message">Message</FieldLabel>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Enter your message here..."
                  rows={6}
                  className="border-input placeholder:text-muted-foreground/80 focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-md border bg-transparent px-3 py-2.5 text-sm transition-colors outline-none focus-visible:ring-[3px]"
                />
              </Field>
            </FieldGroup>
            <Button type="button" className="h-11 w-full text-sm">
              Submit
            </Button>
            <p className="text-muted-foreground text-center text-xs">
              Form submission is not wired yet. Use the contact links below for now.
            </p>
          </form>
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
