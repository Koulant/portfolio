import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: {
    absolute: "Contact | Anton Koulikov",
  },
};

export default function ContactPage() {

  return (
    <section className="space-y-6 text-left">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Contact</CardTitle>
          <p className="text-muted-foreground text-sm">
            Feel free to reach out for software engineering opportunities, collaboration, or project
            inquiries.
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

    </section>
  );
}
