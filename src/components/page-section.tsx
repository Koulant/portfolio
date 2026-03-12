import type { ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SectionLeadPanelProps = {
  title: ReactNode;
  description: ReactNode;
  className?: string;
  descriptionClassName?: string;
};

export function SectionLeadPanel({
  title,
  description,
  className,
  descriptionClassName,
}: SectionLeadPanelProps) {
  return (
    <Card className={cn("p-4 sm:p-6", className)}>
      <CardHeader className="p-0 pb-2">
        <CardTitle>{title}</CardTitle>
        <p className={cn("text-muted-foreground text-sm", descriptionClassName)}>{description}</p>
      </CardHeader>
    </Card>
  );
}

type SectionItemCardProps = {
  className?: string;
  children: ReactNode;
};

export function SectionItemCard({ className, children }: SectionItemCardProps) {
  return <Card className={cn("overflow-hidden p-4 sm:p-5", className)}>{children}</Card>;
}

type SectionHeaderProps = {
  className?: string;
  children: ReactNode;
};

export function SectionHeader({ className, children }: SectionHeaderProps) {
  return <CardHeader className={cn("p-0 pb-2", className)}>{children}</CardHeader>;
}

type SectionBodyProps = {
  className?: string;
  children: ReactNode;
};

export function SectionBody({ className, children }: SectionBodyProps) {
  return <CardContent className={cn("p-0", className)}>{children}</CardContent>;
}

export function compactClass<TRow extends { compact?: boolean }>(
  row: TRow,
  normalClass: string,
  compactClassName: string
) {
  return row.compact ? compactClassName : normalClass;
}
