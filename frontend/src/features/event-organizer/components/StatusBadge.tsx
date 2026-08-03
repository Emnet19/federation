"use client";

import { cn } from "@/lib/utils";

type StatusKey =
  | "Upcoming"
  | "Ongoing"
  | "Completed"
  | "LIVE"
  | "Running"
  | "Finished"
  | "Qualified"
  | "Eliminated"
  | "Current";

const statusStyles: Record<StatusKey, { badge: string; dot: string }> = {
  Upcoming: {
    badge:
      "bg-blue-50 text-[#0140A7] border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/60",
    dot: "bg-[#0140A7] dark:bg-blue-400",
  },
  Ongoing: {
    badge:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/60",
    dot: "bg-amber-500",
  },
  Completed: {
    badge:
      "bg-slate-100 text-slate-600 border-slate-200 dark:bg-zinc-800/70 dark:text-zinc-400 dark:border-zinc-700",
    dot: "bg-slate-400 dark:bg-zinc-500",
  },
  LIVE: {
    badge:
      "bg-red-50 text-red-600 border-red-200 dark:bg-red-950/50 dark:text-red-400 dark:border-red-900/60",
    dot: "bg-red-500",
  },
  Running: {
    badge:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/60",
    dot: "bg-amber-500",
  },
  Finished: {
    badge:
      "bg-slate-100 text-slate-600 border-slate-200 dark:bg-zinc-800/70 dark:text-zinc-400 dark:border-zinc-700",
    dot: "bg-slate-400 dark:bg-zinc-500",
  },
  Qualified: {
    badge:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/60",
    dot: "bg-emerald-500",
  },
  Eliminated: {
    badge:
      "bg-red-50 text-red-600 border-red-200 dark:bg-red-950/50 dark:text-red-400 dark:border-red-900/60",
    dot: "bg-red-500",
  },
  Current: {
    badge:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/60",
    dot: "bg-amber-500",
  },
};

interface StatusBadgeProps {
  status: string;
  pulse?: boolean;
  className?: string;
}

export function StatusBadge({ status, pulse = false, className }: StatusBadgeProps) {
  const style = statusStyles[status as StatusKey] ?? statusStyles.Completed;
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider",
        style.badge,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", style.dot, pulse && "animate-pulse")} />
      {status}
    </span>
  );
}
