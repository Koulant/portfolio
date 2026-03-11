"use client";

import { ChevronDown } from "lucide-react";
import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";

function Collapsible({
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return (
    <CollapsiblePrimitive.Root
      className={cn("w-full", className)}
      data-slot="collapsible"
      {...props}
    />
  );
}

function CollapsibleTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Trigger>) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      className={cn(
        "data-[state=open]:bg-accent/35 group focus-visible:ring-ring/30 flex w-full items-start justify-between gap-3 rounded-lg border-none p-0 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      <span className="flex-1">{children}</span>
      <ChevronDown className="mt-1 size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
    </CollapsiblePrimitive.Trigger>
  );
}

function CollapsibleContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Content>) {
  return (
    <CollapsiblePrimitive.Content
      data-slot="collapsible-content"
      className={cn(
        "overflow-hidden text-sm",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-1",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-1",
        className
      )}
      {...props}
    >
      {children}
    </CollapsiblePrimitive.Content>
  );
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
