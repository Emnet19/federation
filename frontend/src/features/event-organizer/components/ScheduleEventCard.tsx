"use client";

import { useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  Clock,
  MapPin,
  Users,
} from "lucide-react";
import type { ScheduleEvent } from "../types";
import { StatusBadge } from "./StatusBadge";
import { formatDay, formatMonth, formatDate, formatTimeRange } from "../utils/format";
import { cn } from "@/lib/utils";

interface ScheduleEventCardProps {
  event: ScheduleEvent;
  defaultExpanded?: boolean;
}

export function ScheduleEventCard({ event, defaultExpanded = false }: ScheduleEventCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-5">
        <div className="flex shrink-0 items-center gap-4 sm:w-48 sm:flex-col sm:gap-1 sm:text-center">
          <div
            className="flex h-14 w-14 flex-col items-center justify-center rounded-xl text-white"
            style={{ backgroundColor: "#0140A7" }}
          >
            <span className="text-lg font-extrabold leading-none">{formatDay(event.date)}</span>
            <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wider">
              {formatMonth(event.date)}
            </span>
          </div>
          <div className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400">
            {event.competitionLevel}
          </div>
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{event.name}</h3>
            <span className="rounded-full bg-[#DCEBF6] px-2 py-0.5 text-[10px] font-bold text-[#0140A7] dark:bg-[#0A4870]/60 dark:text-blue-300">
              {event.category}
            </span>
            <span className="rounded-full border border-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-500 dark:border-zinc-700 dark:text-zinc-400">
              {event.eventType}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-slate-600 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-[#0140A7] dark:text-blue-400" />
              {formatDate(event.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#0140A7] dark:text-blue-400" />
              {formatTimeRange(event.startTime, event.endTime)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#0140A7] dark:text-blue-400" />
              {event.venue}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-[#0140A7] dark:text-blue-400" />
              {event.registeredAthletes.toLocaleString()} athletes
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-4 sm:flex-col sm:items-end">
          <StatusBadge status={event.status} pulse={event.status === "Ongoing"} />
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-[#0140A7] transition-all hover:bg-[#DCEBF6] active:scale-95 dark:border-zinc-700 dark:text-blue-400 dark:hover:bg-[#0A4870]/40 cursor-pointer"
          >
            {expanded ? "Hide Details" : "View Details"}
            <ChevronDown
              className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-180")}
            />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-slate-200 bg-slate-50/70 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-950/40">
          <div className="grid gap-4 text-xs sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                About this event
              </p>
              <p className="mt-1 leading-relaxed text-slate-600 dark:text-zinc-400">
                {event.description}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                Organizer
              </p>
              <p className="mt-1 font-semibold text-slate-800 dark:text-zinc-200">
                {event.organizer}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400">{event.contactPerson}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                Registered Athletes
              </p>
              <p className="mt-1 font-semibold text-slate-800 dark:text-zinc-200">
                {event.registeredAthletes.toLocaleString()}{" "}
                <span className="font-normal text-slate-500 dark:text-zinc-400">
                  of {event.capacity.toLocaleString()} capacity
                </span>
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                Registration Deadline
              </p>
              <p className="mt-1 font-semibold text-slate-800 dark:text-zinc-200">
                {formatDate(event.registrationDeadline)}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                Event ID
              </p>
              <p className="mt-1 font-mono text-[11px] font-semibold text-slate-800 dark:text-zinc-200">
                {event.id}
              </p>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
