import Link from "next/link";
import type { FinalResultDetail, PublicEvent } from "../types";
import { formatDate } from "../utils/format";
import EventStatusBadge from "./EventStatusBadge";
import Icon from "./Icon";

export default function CompletedEventCard({
  event,
  result,
}: {
  event: PublicEvent;
  result?: FinalResultDetail;
}) {
  return (
    <div className="group flex flex-col rounded-3xl bg-white p-6 shadow-sm border border-slate-200 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60">
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-600 dark:bg-zinc-800 dark:text-zinc-300">
          {event.category}
        </span>
        <EventStatusBadge status={event.status} />
      </div>

      <h3 className="text-base font-bold leading-snug text-slate-900 dark:text-white">
        <Link href={`/events/${event.id}`} className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">
          {event.name}
        </Link>
      </h3>

      <div className="mt-4 flex items-center gap-3 rounded-2xl bg-amber-50 p-3.5 dark:bg-amber-950/30">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-white shadow-sm">
          <Icon name="trophy" className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            Winner
          </p>
          <p className="truncate text-sm font-extrabold text-slate-900 dark:text-white">
            {result?.winner ?? "Results Pending"}
          </p>
          {result?.winnerClub && (
            <p className="truncate text-[11px] font-medium text-slate-500 dark:text-zinc-400">{result.winnerClub}</p>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-2 text-xs text-slate-600 dark:text-zinc-400">
        <div className="flex items-center gap-2">
          <Icon name="calendar" className="h-4 w-4 shrink-0 text-slate-500 dark:text-zinc-400" />
          <span>{formatDate(event.date)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="mapPin" className="h-4 w-4 shrink-0 text-slate-500 dark:text-zinc-400" />
          <span>
            {event.venue}, {event.city}
          </span>
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <Link
          href={`/events/${event.id}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-extrabold text-slate-700 transition-all hover:border-blue-600 hover:text-blue-600 active:scale-[0.98] dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-blue-400 dark:hover:text-blue-400"
        >
          <Icon name="trophy" className="h-3.5 w-3.5" />
          Final Results
        </Link>
      </div>
    </div>
  );
}
