"use client";

import { Award, CalendarDays, Download, FileSpreadsheet, MapPin, Printer, Trophy } from "lucide-react";
import type { FinalResultEvent, Medal } from "../types";
import { formatDate } from "../utils/format";
import { MEDAL_COLORS, MEDAL_LABELS } from "../utils/export";
import { cn } from "@/lib/utils";

interface FinalResultCardProps {
  result: FinalResultEvent;
  index?: number;
  onExportPdf?: (result: FinalResultEvent) => void;
  onExportExcel?: (result: FinalResultEvent) => void;
  onPrint?: (result: FinalResultEvent) => void;
}

const medalRing: Record<Medal, string> = {
  gold: "bg-[#B8860B]/15 dark:bg-[#B8860B]/25",
  silver: "bg-[#6B7280]/15 dark:bg-[#9CA3AF]/20",
  bronze: "bg-[#B3541E]/15 dark:bg-[#C2703D]/25",
};

export function FinalResultCard({
  result,
  index = 0,
  onExportPdf,
  onExportExcel,
  onPrint,
}: FinalResultCardProps) {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60",
        index === 0 && "ring-1 ring-[#0140A7]/20 dark:ring-blue-500/20"
      )}
    >
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-2">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {result.eventName}
          </h3>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-slate-600 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-[#0140A7] dark:text-blue-400" />
              {formatDate(result.eventDate)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#0140A7] dark:text-blue-400" />
              {result.venue}
            </span>
          </div>
        </div>
        <div className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#FFF3CC] px-3 py-2 text-xs font-bold text-[#B8860B] dark:bg-[#E6A500]/15 dark:text-yellow-400">
          <Trophy className="h-4 w-4" />
          Winner: {result.winner}
        </div>
      </div>

      <div className="overflow-x-auto border-t border-slate-200 dark:border-zinc-800">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:bg-zinc-950/40 dark:text-zinc-400">
              <th className="px-4 py-2.5">Position</th>
              <th className="px-4 py-2.5">Bib</th>
              <th className="px-4 py-2.5">Athlete</th>
              <th className="px-4 py-2.5">Club</th>
              <th className="px-4 py-2.5">Result</th>
              <th className="px-4 py-2.5">Medal</th>
            </tr>
          </thead>
          <tbody>
            {result.standings.map((standing) => (
              <tr
                key={`${result.id}-${standing.position}`}
                className={cn(
                  "border-t border-slate-100 text-xs transition-colors dark:border-zinc-800",
                  standing.position <= 3
                    ? "bg-[#DCEBF6]/30 dark:bg-[#0A4870]/25"
                    : "hover:bg-[#DCEBF6]/20 dark:hover:bg-[#0A4870]/15"
                )}
              >
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-extrabold",
                      standing.position === 1 && "bg-[#B8860B] text-white",
                      standing.position === 2 && "bg-[#6B7280] text-white",
                      standing.position === 3 && "bg-[#B3541E] text-white",
                      standing.position > 3 && "bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-400"
                    )}
                  >
                    {standing.position}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-slate-600 dark:text-zinc-400">
                  {standing.bibNumber}
                </td>
                <td className="px-4 py-3 font-semibold text-slate-800 dark:text-zinc-200">
                  {standing.athlete}
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-zinc-400">{standing.club}</td>
                <td className="px-4 py-3 font-mono font-bold text-slate-900 dark:text-white">
                  {standing.result}
                </td>
                <td className="px-4 py-3">
                  {standing.medal ? (
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider",
                        medalRing[standing.medal]
                      )}
                      style={{ color: MEDAL_COLORS[standing.medal] }}
                    >
                      <Award className="h-3.5 w-3.5" />
                      {MEDAL_LABELS[standing.medal]}
                    </span>
                  ) : (
                    <span className="text-slate-300 dark:text-zinc-700">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(onExportPdf || onExportExcel || onPrint) && (
        <div className="flex flex-wrap items-center gap-2 border-t border-slate-200 bg-slate-50/70 px-5 py-3 dark:border-zinc-800 dark:bg-zinc-950/40">
          <span className="mr-auto text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
            Export &amp; Share
          </span>
          {onExportPdf && (
            <button
              type="button"
              onClick={() => onExportPdf(result)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-600 transition-all hover:border-[#0140A7] hover:text-[#0140A7] active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-blue-400 dark:hover:text-blue-400 cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              Export PDF
            </button>
          )}
          {onExportExcel && (
            <button
              type="button"
              onClick={() => onExportExcel(result)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-600 transition-all hover:border-[#2E7D32] hover:text-[#2E7D32] active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-emerald-400 dark:hover:text-emerald-400 cursor-pointer"
            >
              <FileSpreadsheet className="h-3.5 w-3.5" />
              Export Excel
            </button>
          )}
          {onPrint && (
            <button
              type="button"
              onClick={() => onPrint(result)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-600 transition-all hover:border-[#E6A500] hover:text-[#B8860B] active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-yellow-400 dark:hover:text-yellow-400 cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5" />
              Print Results
            </button>
          )}
        </div>
      )}
    </article>
  );
}
