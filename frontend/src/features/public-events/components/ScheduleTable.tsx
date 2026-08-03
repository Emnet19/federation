import type { ScheduleEntry } from "../types";
import { formatDate, formatTime } from "../utils/format";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<ScheduleEntry["status"], string> = {
  Live: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/60",
  Upcoming: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900/60",
  Completed: "bg-slate-100 text-slate-500 border-slate-200 dark:bg-zinc-800/60 dark:text-zinc-400 dark:border-zinc-700",
};

export default function ScheduleTable({ schedule }: { schedule: ScheduleEntry[] }) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
      <table className="w-full min-w-[760px] border-collapse text-left">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-400">
            <th className="px-5 py-3.5">Event</th>
            <th className="px-5 py-3.5">Discipline</th>
            <th className="px-5 py-3.5">Date</th>
            <th className="px-5 py-3.5">Start</th>
            <th className="px-5 py-3.5">End</th>
            <th className="px-5 py-3.5">Venue</th>
            <th className="px-5 py-3.5">Category</th>
            <th className="px-5 py-3.5">Status</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((entry) => (
            <tr
              key={entry.id}
              className="border-b border-slate-100 text-xs transition-colors last:border-0 hover:bg-blue-50/40 dark:border-zinc-800/60 dark:hover:bg-zinc-800/30"
            >
              <td className="px-5 py-3.5 font-bold text-slate-900 dark:text-white">{entry.eventName}</td>
              <td className="px-5 py-3.5 font-medium text-slate-600 dark:text-zinc-300">{entry.discipline}</td>
              <td className="px-5 py-3.5 text-slate-600 dark:text-zinc-400">{formatDate(entry.date)}</td>
              <td className="px-5 py-3.5 font-mono text-slate-600 dark:text-zinc-400">{formatTime(entry.startTime)}</td>
              <td className="px-5 py-3.5 font-mono text-slate-600 dark:text-zinc-400">{formatTime(entry.endTime)}</td>
              <td className="px-5 py-3.5 text-slate-600 dark:text-zinc-400">{entry.venue}</td>
              <td className="px-5 py-3.5">
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
                  {entry.category}
                </span>
              </td>
              <td className="px-5 py-3.5">
                <span
                  className={cn(
                    "inline-flex rounded-full border px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide",
                    STATUS_STYLES[entry.status]
                  )}
                >
                  {entry.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
