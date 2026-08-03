"use client";

import { RefreshCw, Users, Zap } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
import { EmptyState } from "../components/EmptyState";
import { LiveClock } from "../components/LiveClock";
import { LiveEventCard } from "../components/LiveEventCard";
import { LiveCompetitorCard } from "../components/LiveCompetitorCard";
import { useLiveEvents } from "../hooks/useLiveEvents";
import { cn } from "@/lib/utils";

export default function LiveResultsView() {
  const { liveEvents, competitors, isLoading, error, refresh } = useLiveEvents();

  const runningCount = competitors.filter((c) => c.status === "Running").length;

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        eyebrow={
          <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-red-600 dark:border-red-900/60 dark:bg-red-950/50 dark:text-red-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
            Live Competition
          </span>
        }
        title="Live Results"
        subtitle="Real-time event progress feed from the timing hardware network."
        actions={
          <>
            <LiveClock />
            <button
              type="button"
              onClick={refresh}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm transition-all hover:border-blue-600 hover:text-blue-600 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-blue-400 dark:hover:text-blue-400 cursor-pointer"
            >
              <RefreshCw className={cn("h-3.5 w-3.5", isLoading && "animate-spin")} />
              Refresh Feed
            </button>
          </>
        }
      />

      {error ? (
        <EmptyState title="Live feed unavailable" description={error} />
      ) : isLoading ? (
        <>
          <LoadingSkeleton rows={3} />
          <LoadingSkeleton rows={2} />
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5 dark:border-red-900/60 dark:bg-red-950/30">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-red-600 dark:text-red-400" />
                <p className="text-2xl font-extrabold text-red-600 dark:text-red-400">
                  {liveEvents.length}
                </p>
              </div>
              <p className="mt-1 text-xs font-semibold text-red-700/80 dark:text-red-400/80">
                Events Live Now
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900/60 dark:bg-amber-950/30">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-amber-700 dark:text-amber-400" />
                <p className="text-2xl font-extrabold text-amber-700 dark:text-amber-400">
                  {competitors.length}
                </p>
              </div>
              <p className="mt-1 text-xs font-semibold text-amber-800/80 dark:text-amber-400/80">
                Athletes Competing
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900/60 dark:bg-emerald-950/30">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  {runningCount}
                </p>
              </div>
              <p className="mt-1 text-xs font-semibold text-emerald-700/80 dark:text-emerald-400/80">
                On the Track Right Now
              </p>
            </div>
          </div>

          {liveEvents.length === 0 ? (
            <EmptyState
              icon={Zap}
              title="No live events right now"
              description="Live competition feeds will appear here when timing systems are streaming."
            />
          ) : (
            <div className="space-y-5">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Live Events
              </h2>
              {liveEvents.map((event) => (
                <LiveEventCard key={event.id} event={event} />
              ))}
            </div>
          )}

          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Live Competitors
                </h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  Athletes currently participating across all live events.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                {competitors.length} in action
              </span>
            </div>

            {competitors.length === 0 ? (
              <EmptyState
                icon={Users}
                title="No competitors participating"
                description="Competitor cards will populate as athletes are called to their marks."
              />
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {competitors.map((competitor) => (
                  <LiveCompetitorCard key={competitor.id} competitor={competitor} />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
