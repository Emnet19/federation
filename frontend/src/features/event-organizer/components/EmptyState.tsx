"use client";

import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-zinc-700 dark:bg-zinc-900/30",
        className
      )}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-zinc-800">
        <Icon className="h-7 w-7 text-slate-400 dark:text-zinc-500" />
      </div>
      <p className="text-sm font-bold text-slate-800 dark:text-zinc-200">{title}</p>
      <p className="mt-1 max-w-sm text-xs text-slate-500 dark:text-zinc-400">{description}</p>
    </div>
  );
}
