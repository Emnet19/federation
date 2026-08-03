"use client";

import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  rows?: number;
  className?: string;
}

export function LoadingSkeleton({ rows = 4, className }: LoadingSkeletonProps) {
  return (
    <div
      className={cn(
        "space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60",
        className
      )}
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="h-5 w-1/3 skeleton-shimmer rounded-full" />
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="h-14 w-full skeleton-shimmer rounded-xl" />
      ))}
    </div>
  );
}
