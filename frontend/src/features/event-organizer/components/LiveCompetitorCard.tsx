"use client";

import { Globe, MapPin, Users } from "lucide-react";
import type { LiveCompetitor } from "../types";
import { StatusBadge } from "./StatusBadge";

interface LiveCompetitorCardProps {
  competitor: LiveCompetitor;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function LiveCompetitorCard({ competitor }: LiveCompetitorCardProps) {
  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0140A7] text-sm font-extrabold text-white dark:bg-[#0A4870]">
            {getInitials(competitor.athleteName)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
              {competitor.athleteName}
            </p>
            <p className="mt-0.5 text-[11px] text-slate-500 dark:text-zinc-400">
              Bib #{competitor.bibNumber} · Lane {competitor.lane}
            </p>
          </div>
        </div>
        <StatusBadge status={competitor.status} pulse={competitor.status === "Running"} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-zinc-400">
        <span className="inline-flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5 text-[#0140A7] dark:text-blue-400" />
          {competitor.club}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Globe className="h-3.5 w-3.5 text-[#0140A7] dark:text-blue-400" />
          {competitor.countryOrRegion}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-[#0140A7] dark:text-blue-400" />
          Position {competitor.currentPosition}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="font-mono font-bold text-slate-900 dark:text-white">
            {competitor.currentTime}
          </span>
        </span>
      </div>
    </article>
  );
}
