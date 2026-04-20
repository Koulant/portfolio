"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";

const formSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required.")
    .max(100, "First name must be 100 characters or less."),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required.")
    .max(100, "Last name must be 100 characters or less."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Enter a valid email address.")
    .max(254, "Email must be 254 characters or less."),
  message: z
    .string()
    .trim()
    .min(1, "Message is required.")
    .max(4000, "Message must be 4000 characters or less."),
  company: z.string().optional(),
});

type ContactFormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
      company: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const payload = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        toast.error(payload.error ?? "Could not send your message. Please try again.");
        return;
      }

      form.reset();
      toast.success("Message sent. Thank you.");
    } catch {
      toast.error("Could not send your message. Please try again.");
    }
  };

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup className="grid gap-6 sm:grid-cols-2">
        <Controller
          name="firstName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>First name</FieldLabel>
              <input
                {...field}
                id={field.name}
                type="text"
                placeholder="Your first name"
                autoComplete="given-name"
                aria-required="true"
                aria-invalid={fieldState.invalid}
                className="border-input placeholder:text-muted-foreground/80 focus-visible:border-ring focus-visible:ring-ring/50 h-11 w-full rounded-md border bg-transparent px-3 text-sm transition-colors outline-none focus-visible:ring-[3px]"
              />
              {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
            </Field>
          )}
        />

        <Controller
          name="lastName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Last name</FieldLabel>
              <input
                {...field}
                id={field.name}
                type="text"
                placeholder="Your last name"
                autoComplete="family-name"
                aria-required="true"
                aria-invalid={fieldState.invalid}
                className="border-input placeholder:text-muted-foreground/80 focus-visible:border-ring focus-visible:ring-ring/50 h-11 w-full rounded-md border bg-transparent px-3 text-sm transition-colors outline-none focus-visible:ring-[3px]"
              />
              {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
            </Field>
          )}
        />
      </FieldGroup>

      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
            <input
              {...field}
              id={field.name}
              type="email"
              placeholder="Your email address"
              autoComplete="email"
              aria-required="true"
              aria-invalid={fieldState.invalid}
              className="border-input placeholder:text-muted-foreground/80 focus-visible:border-ring focus-visible:ring-ring/50 h-11 w-full rounded-md border bg-transparent px-3 text-sm transition-colors outline-none focus-visible:ring-[3px]"
            />
            {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
          </Field>
        )}
      />

      <Controller
        name="message"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Message</FieldLabel>
            <textarea
              {...field}
              id={field.name}
              placeholder="Enter your message here..."
              rows={6}
              aria-required="true"
              aria-invalid={fieldState.invalid}
              className="border-input placeholder:text-muted-foreground/80 focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-md border bg-transparent px-3 py-2.5 text-sm transition-colors outline-none focus-visible:ring-[3px]"
            />
            {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
          </Field>
        )}
      />

      <Controller
        name="company"
        control={form.control}
        render={({ field }) => (
          <input
            {...field}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />
        )}
      />

      <Button type="submit" className="h-11 w-full text-sm" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Sending..." : "Submit"}
      </Button>
    </form>
  );
}
