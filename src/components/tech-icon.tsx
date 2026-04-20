import type { SimpleIcon } from "simple-icons";

import { cn } from "@/lib/utils";

type TechIconProps = {
  icon?: Pick<SimpleIcon, "path" | "hex" | "source" | "slug" | "title"> & { viewBox?: string };
  className?: string;
  width?: number;
  height?: number;
  monochrome?: boolean;
};

export function TechIcon({
  icon,
  className,
  width = 24,
  height = 24,
  monochrome = false,
}: TechIconProps) {
  if (!icon) {
    return null;
  }

  return (
    <svg
      viewBox={icon.viewBox ?? "0 0 24 24"}
      aria-hidden="true"
      className={cn(className)}
      width={width}
      height={height}
    >
      <path d={icon.path} fill={monochrome ? "currentColor" : `#${icon.hex}`} />
    </svg>
  );
}
