import Link from "next/link";
import type { LiveEventDetail, PublicEvent } from "../types";
import { formatNumber } from "../utils/format";
import Icon from "./Icon";

export default function LiveEventCard({
  event,
  live,
}: {
  event: PublicEvent;
  live?: LiveEventDetail;
}) {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm border border-red-200 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-red-900/50 dark:bg-zinc-900/60">
      <div className="flex items-center justify-between gap-3 bg-red-600 px-5 py-2.5">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-white">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          Live
        </span>
        <span className="font-mono text-[10px] font-bold text-red-100">
          {live?.currentTime ?? event.startTime}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-bold leading-snug text-slate-900 dark:text-white">{event.name}</h3>

        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs text-slate-600 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <Icon name="timer" className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:text-zinc-500">
                Current Round
              </p>
              <p className="font-bold text-slate-800 dark:text-zinc-200">{live?.currentRound ?? "In Progress"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="users" className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:text-zinc-500">
                Competitors
              </p>
              <p className="font-bold text-slate-800 dark:text-zinc-200">
                {formatNumber(live?.numberOfCompetitors ?? event.registeredAthletes)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-start gap-2 text-xs text-slate-600 dark:text-zinc-400">
          <Icon name="mapPin" className="mt-0.5 h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
          <span>{live?.venue ?? `${event.venue}, ${event.city}`}</span>
        </div>

        <div className="mt-5 flex gap-3 border-t border-slate-100 pt-4 dark:border-zinc-800">
          <Link
            href={`/events/${event.id}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-md transition-all hover:bg-red-700 active:scale-[0.98]"
          >
            <Icon name="flame" className="h-3.5 w-3.5" />
            Live Results
          </Link>
          <Link
            href={`/events/${event.id}`}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 transition-all hover:border-blue-600 hover:text-blue-600 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-blue-400 dark:hover:text-blue-400"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
