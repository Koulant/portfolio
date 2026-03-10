"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import * as React from "react";

type TechIconProps = {
  alt: string;
  lightSrc: string;
  darkSrc: string;
  className?: string;
  width?: number;
  height?: number;
};

export function TechIcon({
  alt,
  lightSrc,
  darkSrc,
  className,
  width = 24,
  height = 24,
}: TechIconProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const src = mounted && resolvedTheme === "dark" ? darkSrc : lightSrc;

  return (
    <Image src={src} alt={alt} width={width} height={height} className={className} unoptimized />
  );
}
