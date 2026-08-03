"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Icon from "./Icon";

interface CountdownTimerProps {
  targetDate: string;
  targetTime: string;
  className?: string;
}

function timeLeft(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  };
}

export default function CountdownTimer({ targetDate, targetTime, className }: CountdownTimerProps) {
  const target = new Date(`${targetDate}T${targetTime}:00+03:00`).getTime();
  const [left, setLeft] = useState(() => timeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setLeft(timeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const isFinished = left.days === 0 && left.hours === 0 && left.minutes === 0 && left.seconds === 0;

  if (isFinished) {
    return (
      <div className={cn("flex items-center gap-1.5 text-[11px] font-bold text-blue-600 dark:text-blue-400", className)}>
        <Icon name="checkCircle" className="h-4 w-4" />
        <span>Event has started</span>
      </div>
    );
  }

  const segments = [
    { value: left.days, label: "Days" },
    { value: left.hours, label: "Hrs" },
    { value: left.minutes, label: "Min" },
    { value: left.seconds, label: "Sec" },
  ];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Icon name="timer" className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      <div className="flex items-center gap-1 font-mono">
        {segments.map((seg, i) => (
          <span key={seg.label} className="flex items-center gap-1">
            <span className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[11px] font-bold text-slate-800 tabular-nums dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100">
              {String(seg.value).padStart(2, "0")}
            </span>
            <span className="text-[9px] font-semibold text-slate-400 dark:text-zinc-500">{seg.label}</span>
            {i < segments.length - 1 && <span className="text-slate-300 dark:text-zinc-600">:</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
