"use client";

import { useEffect, useMemo, useState } from "react";

const TRANSITION_MS = 420;
const HOLD_MS = 1800;

type RoleScrollerProps = {
  roles: string[];
};

type ScrollPhase = "show" | "hide";

export function RoleScroller({ roles }: RoleScrollerProps) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<ScrollPhase>("show");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const safeRoles = useMemo(() => roles.filter(Boolean), [roles]);
  const safeRoleCount = safeRoles.length;
  const safeRolesKey = useMemo(() => safeRoles.join("|"), [safeRoles]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    handleMotionPreference();
    mediaQuery.addEventListener("change", handleMotionPreference);

    return () => mediaQuery.removeEventListener("change", handleMotionPreference);
  }, []);

  useEffect(() => {
    if (safeRoleCount <= 1 || prefersReducedMotion) return;

    let cycleTimer: ReturnType<typeof setTimeout> | null = null;

    const cycle = () => {
      setPhase("hide");
      cycleTimer = setTimeout(() => {
        setIndex((current) => (current + 1) % safeRoleCount);
        setPhase("show");
        cycleTimer = setTimeout(cycle, HOLD_MS);
      }, TRANSITION_MS);
    };

    cycleTimer = setTimeout(cycle, HOLD_MS);

    return () => {
      if (cycleTimer) clearTimeout(cycleTimer);
    };
  }, [safeRoleCount, safeRolesKey, prefersReducedMotion]);

  if (safeRoles.length === 0) {
    return null;
  }

  if (prefersReducedMotion) {
    return <p className="text-muted-foreground h-8 w-full overflow-hidden text-base sm:text-xl">{safeRoles[index]}</p>;
  }

  return (
    <p className="text-muted-foreground relative h-8 w-full overflow-hidden text-base sm:text-xl">
      <span
        className={`will-change-[opacity] transition-opacity duration-400 ease-in-out ${
          phase === "show" ? "opacity-100" : "opacity-0"
        }`}
      >
        {safeRoles[index]}
      </span>
    </p>
  );
}
