"use client";

import { useEffect, useMemo, useState } from "react";

type RoleScrollerProps = {
  roles: string[];
};

type ScrollPhase = "show" | "hide";

export function RoleScroller({ roles }: RoleScrollerProps) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<ScrollPhase>("show");
  const transitionMs = 420;
  const holdMs = 1800;
  const safeRoles = useMemo(() => roles.filter(Boolean), [roles]);

  useEffect(() => {
    if (safeRoles.length <= 1) return;
    let swapTimer: ReturnType<typeof setTimeout> | null = null;

    const interval = setInterval(() => {
      setPhase("hide");
      swapTimer = setTimeout(() => {
        setIndex((current) => (current + 1) % safeRoles.length);
        setPhase("show");
      }, transitionMs);
    }, holdMs + transitionMs);

    return () => {
      clearInterval(interval);
      if (swapTimer) clearTimeout(swapTimer);
    };
  }, [safeRoles.length, transitionMs, holdMs, index]);

  if (safeRoles.length === 0) {
    return null;
  }

  return (
    <p className="text-muted-foreground relative h-8 overflow-hidden text-xl">
      <span
        className={`text-muted-foreground will-change-opacity transition-opacity duration-[400ms] ease-in-out ${
          phase === "show" ? "opacity-100" : "opacity-0"
        }`}
      >
        {safeRoles[index]}
      </span>
    </p>
  );
}
