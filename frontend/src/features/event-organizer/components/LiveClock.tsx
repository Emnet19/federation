"use client";

import { useEffect, useState } from "react";

export function LiveClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const time = now?.toLocaleTimeString("en-US", { hour12: false }) ?? "--:--:--";
  const date = now?.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="text-right">
      <p className="font-mono text-lg font-bold leading-none text-slate-900 dark:text-white">
        {time}
      </p>
      <p className="mt-0.5 font-mono text-[10px] text-slate-400 dark:text-zinc-500">
        {date} · EAT
      </p>
    </div>
  );
}
