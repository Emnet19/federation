"use client";

import { Flag, MapPin, Radio, Timer } from "lucide-react";
import type { LiveEvent } from "../types";
import { StatusBadge } from "./StatusBadge";

interface LiveEventCardProps {
  event: LiveEvent;
}

export function LiveEventCard({ event }: LiveEventCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{event.name}</h3>
            <StatusBadge status={event.status} pulse />
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-slate-600 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1.5">
              <Flag className="h-3.5 w-3.5 text-[#0140A7] dark:text-blue-400" />
              {event.currentRound} · {event.heat}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Timer className="h-3.5 w-3.5 text-[#0140A7] dark:text-blue-400" />
              {event.currentTime}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#0140A7] dark:text-blue-400" />
              {event.venue}
            </span>
          </div>
        </div>
        <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-red-600 dark:bg-red-950/50 dark:text-red-400">
          <Radio className="h-3.5 w-3.5 animate-pulse" />
          Live Timing Feed
        </div>
      </div>

      <div className="overflow-x-auto border-t border-slate-200 dark:border-zinc-800">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:bg-zinc-950/40 dark:text-zinc-400">
              <th className="px-4 py-2.5">Rank</th>
              <th className="px-4 py-2.5">Bib</th>
              <th className="px-4 py-2.5">Athlete</th>
              <th className="px-4 py-2.5">Club</th>
              <th className="px-4 py-2.5">Lane</th>
              <th className="px-4 py-2.5">Result</th>
              <th className="px-4 py-2.5">Position</th>
              <th className="px-4 py-2.5">Status</th>
            </tr>
          </thead>
          <tbody>
            {event.leaderboard.map((entry) => (
              <tr
                key={`${event.id}-${entry.bibNumber}`}
                className="border-t border-slate-100 text-xs transition-colors hover:bg-[#DCEBF6]/30 dark:border-zinc-800 dark:hover:bg-[#0A4870]/20"
              >
                <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                  {entry.rank}
                </td>
                <td className="px-4 py-3 font-mono text-slate-600 dark:text-zinc-400">
                  {entry.bibNumber}
                </td>
                <td className="px-4 py-3 font-semibold text-slate-800 dark:text-zinc-200">
                  {entry.athleteName}
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-zinc-400">{entry.club}</td>
                <td className="px-4 py-3 font-mono text-slate-600 dark:text-zinc-400">
                  {entry.lane}
                </td>
                <td className="px-4 py-3 font-mono font-bold text-slate-900 dark:text-white">
                  {entry.result}
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-zinc-400">{entry.position}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={entry.status} pulse={entry.status === "Running"} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
