import Link from "next/link";
import type { PublicEvent } from "../types";
import { formatDate, formatTime, formatNumber } from "../utils/format";
import EventStatusBadge, { RegistrationBadge } from "./EventStatusBadge";
import CountdownTimer from "./CountdownTimer";
import Icon from "./Icon";

export default function EventCard({ event }: { event: PublicEvent }) {
  return (
    <div className="group flex flex-col rounded-3xl bg-white p-6 shadow-sm border border-slate-200 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60">
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
          {event.category}
        </span>
        <EventStatusBadge status={event.status} />
      </div>

      <h3 className="text-base font-bold leading-snug text-slate-900 dark:text-white">
        <Link href={`/events/${event.id}`} className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">
          {event.name}
        </Link>
      </h3>

      <div className="mt-3 space-y-2 text-xs text-slate-600 dark:text-zinc-400">
        <div className="flex items-center gap-2">
          <Icon name="calendar" className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
          <span>
            {formatDate(event.date)} · {formatTime(event.startTime)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="mapPin" className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
          <span>
            {event.venue}, {event.city}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="building" className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
          <span>{event.organizer}</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="users" className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
          <span>
            {formatNumber(event.registeredAthletes)} athletes · {event.competitionLevel}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-zinc-800">
        <RegistrationBadge status={event.registrationStatus} />
        <CountdownTimer targetDate={event.startDate} targetTime={event.startTime} />
      </div>

      <div className="mt-5 flex gap-3">
        <Link
          href={`/events/${event.id}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-md transition-all hover:bg-blue-700 active:scale-[0.98] dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          View Details
          <Icon name="arrowRight" className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
