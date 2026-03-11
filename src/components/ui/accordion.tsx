"use client";

import { ChevronDownIcon } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";

function Accordion({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root data-slot="accordion" className={cn("w-full", className)} {...props} />
  );
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-border/60 rounded-xl border", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Trigger
      data-slot="accordion-trigger"
      className={cn(
        "focus-visible:border-ring hover:bg-accent/40 focus-visible:ring-ring/30 [&_svg]:text-muted-foreground flex w-full cursor-pointer items-center justify-between gap-3 rounded-t-xl px-6 py-4 text-left text-sm font-medium outline-hidden transition-all hover:no-underline focus-visible:ring-2 focus-visible:ring-offset-2",
        "[&[data-state=open]>.accordion-chevron]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="accordion-chevron size-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn("overflow-hidden text-sm", className)}
      {...props}
    >
      <div className="px-6 pt-2 pb-6">{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
