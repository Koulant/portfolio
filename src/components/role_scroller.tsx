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
  const safeRoleCount = safeRoles.length;
  const safeRolesKey = safeRoles.join("|");

  useEffect(() => {
    if (safeRoleCount <= 1) return;
    let cycleTimer: ReturnType<typeof setTimeout> | null = null;

    const cycle = () => {
      setPhase("hide");
      cycleTimer = setTimeout(() => {
        setIndex((current) => (current + 1) % safeRoleCount);
        setPhase("show");
        cycleTimer = setTimeout(cycle, holdMs);
      }, transitionMs);
    };

    cycleTimer = setTimeout(cycle, holdMs);

    return () => {
      if (cycleTimer) clearTimeout(cycleTimer);
    };
  }, [safeRoleCount, safeRolesKey, transitionMs, holdMs]);

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
