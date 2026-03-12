"use client";

import { cn } from "@/lib/utils";

type TimelineMarkerProps = {
  isLast?: boolean;
  className?: string;
  dotClassName?: string;
  lineClassName?: string;
};

export function TimelineMarker({
  isLast = false,
  className,
  dotClassName,
  lineClassName,
}: TimelineMarkerProps) {
  return (
    <div className={cn("flex w-4 flex-col items-center", className)}>
      <span
        className={cn("bg-background border-border mt-2 h-3 w-3 rounded-full border", dotClassName)}
      />
      {!isLast ? <span className={cn("bg-border mt-0 -mb-6 w-px flex-1", lineClassName)} /> : null}
    </div>
  );
}
