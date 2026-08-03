"use client";

import { Check, CircleDot } from "lucide-react";
import type { TimelineEvent, TimelineStage } from "../types";
import { formatDate } from "../utils/format";
import { cn } from "@/lib/utils";

interface TimelineCardProps {
  timeline: TimelineEvent;
}

function StageNode({ status }: { status: TimelineStage["status"] }) {
  if (status === "Completed") {
    return (
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white ring-4 ring-emerald-500/15">
        <Check className="h-4 w-4" />
      </div>
    );
  }
  if (status === "Current") {
    return (
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white ring-4 ring-amber-500/20">
        <CircleDot className="h-4 w-4 animate-pulse" />
      </div>
    );
  }
  return (
    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-slate-300 bg-white dark:border-zinc-600 dark:bg-zinc-900">
      <span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-zinc-600" />
    </div>
  );
}

const stageBadgeClass: Record<TimelineStage["status"], string> = {
  Completed:
    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/60",
  Current:
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/60",
  Upcoming:
    "bg-slate-100 text-slate-500 border-slate-200 dark:bg-zinc-800/70 dark:text-zinc-400 dark:border-zinc-700",
};

export function TimelineCard({ timeline }: TimelineCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
      <div className="border-b border-slate-200 px-5 py-4 dark:border-zinc-800">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">{timeline.eventName}</h3>
        <p className="mt-0.5 text-[11px] font-mono text-slate-400 dark:text-zinc-500">
          {timeline.id}
        </p>
      </div>

      <div className="px-5 py-5">
        <ol className="relative ml-3 space-y-0">
          {timeline.stages.map((stage, index) => {
            const isLast = index === timeline.stages.length - 1;
            return (
              <li key={stage.id} className="relative flex gap-4 pb-6 last:pb-0">
                {!isLast && (
                  <span
                    className={cn(
                      "absolute left-[13px] top-7 h-[calc(100%-28px)] w-0.5",
                      stage.status === "Completed" ? "bg-emerald-400/60" : "bg-slate-200 dark:bg-zinc-700"
                    )}
                  />
                )}
                <StageNode status={stage.status} />
                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {stage.stage}
                    </p>
                    <span
                      className={cn(
                        "rounded-full border px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider",
                        stageBadgeClass[stage.status]
                      )}
                    >
                      {stage.status}
                    </span>
                  </div>
                  <p className="mt-0.5 font-mono text-[11px] text-slate-400 dark:text-zinc-500">
                    {formatDate(stage.date)} · {stage.time}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
                    {stage.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </article>
  );
}
