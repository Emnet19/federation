"use client";

import { useState } from "react";
import { History, RefreshCw } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
import { EmptyState } from "../components/EmptyState";
import { TimelineCard } from "../components/TimelineCard";
import { useEventTimelines } from "../hooks/useEventTimelines";
import { cn } from "@/lib/utils";

export default function EventTimelineView() {
  const { timelines, isLoading, error, refresh } = useEventTimelines();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const activeId = selectedId ?? timelines[0]?.id ?? null;
  const activeTimeline = timelines.find((timeline) => timeline.id === activeId) ?? null;

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        eyebrow={
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0140A7]/20 bg-[#DCEBF6] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#0140A7] dark:border-blue-500/30 dark:bg-[#0A4870]/40 dark:text-blue-300">
            <History className="h-3.5 w-3.5" />
            Lifecycle View
          </span>
        }
        title="Event Timeline"
        subtitle="Chronological lifecycle view of competition events from creation to final results."
        actions={
          <button
            type="button"
            onClick={refresh}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm transition-all hover:border-blue-600 hover:text-blue-600 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-blue-400 dark:hover:text-blue-400 cursor-pointer"
          >
            <RefreshCw className={cn("h-3.5 w-3.5", isLoading && "animate-spin")} />
            Refresh
          </button>
        }
      />

      {error ? (
        <EmptyState title="Timeline unavailable" description={error} />
      ) : isLoading ? (
        <LoadingSkeleton rows={6} />
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-2">
            {timelines.map((timeline) => (
              <button
                key={timeline.id}
                type="button"
                onClick={() => setSelectedId(timeline.id)}
                className={cn(
                  "max-w-full truncate rounded-full px-3.5 py-1.5 text-xs font-bold transition-all active:scale-95 cursor-pointer",
                  activeId === timeline.id
                    ? "bg-[#0140A7] text-white shadow-md dark:bg-blue-600"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-[#0140A7] hover:text-[#0140A7] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-blue-400 dark:hover:text-blue-400"
                )}
              >
                {timeline.eventName}
              </button>
            ))}
          </div>

          {activeTimeline ? (
            <TimelineCard key={activeTimeline.id} timeline={activeTimeline} />
          ) : (
            <EmptyState
              icon={History}
              title="No timelines available"
              description="Event lifecycle stages will appear here once events are created."
            />
          )}
        </>
      )}
    </div>
  );
}
