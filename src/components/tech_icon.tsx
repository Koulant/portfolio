"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import * as React from "react";

type TechIconProps = {
  alt: string;
  lightSrc: string;
  darkSrc: string;
  fallbackSrc?: string;
  className?: string;
  width?: number;
  height?: number;
};

export function TechIcon({
  alt,
  lightSrc,
  darkSrc,
  fallbackSrc,
  className,
  width = 24,
  height = 24,
}: TechIconProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [src, setSrc] = React.useState<string>(lightSrc);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const nextSrc = mounted && resolvedTheme === "dark" ? darkSrc : lightSrc;
    setSrc(nextSrc);
  }, [mounted, resolvedTheme, lightSrc, darkSrc]);

  const handleError = () => {
    if (fallbackSrc && src !== fallbackSrc) {
      setSrc(fallbackSrc);
    }
  };

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
      unoptimized
    />
  );
}
