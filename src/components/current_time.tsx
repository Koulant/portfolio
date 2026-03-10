"use client";

import { useEffect, useState } from "react";

type CurrentTimeProps = {
  timezone: string;
};

export function CurrentTime({ timezone }: CurrentTimeProps) {
  const [currentTime, setCurrentTime] = useState(() => formatTime(timezone));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(formatTime(timezone));
    }, 60_000);

    return () => clearInterval(timer);
  }, [timezone]);

  return <span>{currentTime}</span>;
}

function formatTime(timezone: string) {
  const now = new Date();

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: timezone,
    hour12: true,
    timeZoneName: "short",
  }).format(now);
}
