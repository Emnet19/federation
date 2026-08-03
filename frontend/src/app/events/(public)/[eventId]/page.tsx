"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { usePublicEventDetail } from "@/features/public-events/hooks/usePublicEventDetail";
import EventStatusBadge, { RegistrationBadge } from "@/features/public-events/components/EventStatusBadge";
import ScheduleTable from "@/features/public-events/components/ScheduleTable";
import Icon from "@/features/public-events/components/Icon";
import { cn } from "@/lib/utils";
import { formatDate, formatTime, formatNumber } from "@/features/public-events/utils/format";

const MEDAL_STYLES: Record<string, string> = {
  gold: "bg-amber-500 text-white",
  silver: "bg-slate-400 text-white",
  bronze: "bg-orange-700 text-white",
};

function DetailSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-5 w-32 animate-pulse rounded-md bg-slate-200 dark:bg-zinc-700" />
      <div className="h-64 animate-pulse rounded-3xl bg-slate-200 dark:bg-zinc-800 sm:h-80" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl bg-slate-100 dark:bg-zinc-800" />
        ))}
      </div>
      <div className="h-40 animate-pulse rounded-3xl bg-slate-100 dark:bg-zinc-800" />
    </div>
  );
}

export default function PublicEventDetailPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const { detail, isLoading, error } = usePublicEventDetail(eventId);

  if (isLoading) return <DetailSkeleton />;

  if (error || !detail) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white/60 px-6 py-20 text-center dark:border-zinc-700 dark:bg-zinc-900/40">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400">
          <Icon name="search" className="h-7 w-7" />
        </div>
        <h1 className="mt-4 text-lg font-extrabold text-slate-900 dark:text-white">Event not found</h1>
        <p className="mt-1 max-w-sm text-xs leading-relaxed text-slate-500 dark:text-zinc-400">
          {error ?? "The event you are looking for is no longer available."}
        </p>
        <Link
          href="/events"
          className="mt-6 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-extrabold text-white shadow-md transition-all hover:bg-blue-700"
        >
          <Icon name="arrowLeft" className="h-4 w-4" />
          Back to Events
        </Link>
      </div>
    );
  }

  const { event, schedule, liveResults, finalResults, timeline, venue } = detail;

  const infoCards = [
    { label: "Date", value: formatDate(event.date), icon: "calendar" },
    { label: "Time", value: `${formatTime(event.startTime)} – ${formatTime(event.endTime)} EAT`, icon: "clock" },
    { label: "Venue", value: `${event.venue}, ${event.city}`, icon: "mapPin" },
    { label: "Organizer", value: event.organizer, icon: "building" },
    { label: "Registered Athletes", value: formatNumber(event.registeredAthletes), icon: "users" },
    {
      label: "Competition Level",
      value: event.competitionLevel,
      icon: "trophy",
    },
  ];

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* ── BACK LINK ── */}
      <div>
        <Link
          href="/events"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm transition-all hover:border-blue-600 hover:text-blue-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-blue-400 dark:hover:text-blue-400"
        >
          <Icon name="arrowLeft" className="h-4 w-4" />
          Back to All Events
        </Link>
      </div>

      {/* ── OVERVIEW HERO ── */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-xl dark:border-zinc-800">
        <div className="relative h-64 sm:h-80">
          <Image
            src="/ethiopian_athlete_hero.png"
            alt={event.name}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/95 via-blue-900/50 to-blue-900/10" />
        </div>
        <div className="absolute inset-0 flex items-end">
          <div className="w-full p-6 sm:p-10">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#E6A500] px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#1D1D1F]">
                {event.category}
              </span>
              <EventStatusBadge status={event.status} />
              <RegistrationBadge status={event.registrationStatus} />
              <span className="rounded-full border border-white/30 bg-white/10 px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur">
                {event.competitionLevel}
              </span>
            </div>
            <h1 className="max-w-3xl text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
              {event.name}
            </h1>
            <p className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-blue-100">
              <span className="flex items-center gap-2">
                <Icon name="calendar" className="h-4 w-4 text-[#E6A500]" />
                {formatDate(event.date)}
              </span>
              <span className="flex items-center gap-2">
                <Icon name="clock" className="h-4 w-4 text-[#E6A500]" />
                {formatTime(event.startTime)} EAT
              </span>
              <span className="flex items-center gap-2">
                <Icon name="mapPin" className="h-4 w-4 text-[#E6A500]" />
                {event.venue}, {event.city}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ── QUICK INFO ── */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {infoCards.map((card) => (
          <div
            key={card.label}
            className="flex items-start gap-3.5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
              <Icon name={card.icon} className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                {card.label}
              </p>
              <p className="mt-0.5 text-sm font-bold leading-snug text-slate-900 dark:text-white">{card.value}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── EVENT OVERVIEW ── */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">Event Overview</h2>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-8">
          <p className="text-sm leading-relaxed text-slate-600 dark:text-zinc-300">{event.longDescription}</p>
          <div className="mt-5 grid gap-3 border-t border-slate-100 pt-5 text-xs sm:grid-cols-2 dark:border-zinc-800">
            <div>
              <p className="font-bold text-slate-500 dark:text-zinc-400">Age Category</p>
              <p className="mt-0.5 font-semibold text-slate-800 dark:text-zinc-100">{event.ageCategory}</p>
            </div>
            <div>
              <p className="font-bold text-slate-500 dark:text-zinc-400">Gender Category</p>
              <p className="mt-0.5 font-semibold text-slate-800 dark:text-zinc-100">{event.genderCategory}</p>
            </div>
            <div>
              <p className="font-bold text-slate-500 dark:text-zinc-400">Registration Deadline</p>
              <p className="mt-0.5 font-semibold text-slate-800 dark:text-zinc-100">{formatDate(event.registrationDeadline)}</p>
            </div>
            <div>
              <p className="font-bold text-slate-500 dark:text-zinc-400">Capacity</p>
              <p className="mt-0.5 font-semibold text-slate-800 dark:text-zinc-100">
                {formatNumber(event.registeredAthletes)} / {formatNumber(event.maxParticipants)} registered
              </p>
            </div>
            <div>
              <p className="font-bold text-slate-500 dark:text-zinc-400">Contact</p>
              <p className="mt-0.5 font-semibold text-slate-800 dark:text-zinc-100">{event.contactPerson}</p>
            </div>
            <div>
              <p className="font-bold text-slate-500 dark:text-zinc-400">Event Type</p>
              <p className="mt-0.5 font-semibold text-slate-800 dark:text-zinc-100">{event.eventType}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── EVENT TIMELINE ── */}
      {timeline.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">Event Timeline</h2>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-8">
            <ol className="relative space-y-6 border-l border-slate-200 pl-6 dark:border-zinc-700">
              {timeline.map((stage, idx) => (
                <li key={stage.id} className="relative">
                  <span
                    className={cn(
                      "absolute -left-[30px] flex h-3.5 w-3.5 items-center justify-center rounded-full ring-4",
                      stage.status === "Completed"
                        ? "bg-emerald-500 ring-emerald-100 dark:ring-emerald-950/60"
                        : stage.status === "Current"
                          ? "bg-[#E6A500] ring-amber-100 dark:ring-amber-950/60"
                          : "bg-slate-300 ring-slate-100 dark:bg-zinc-600 dark:ring-zinc-900"
                    )}
                  />
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{stage.stage}</p>
                    <span
                      className={cn(
                        "rounded-full border px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider",
                        stage.status === "Completed"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300"
                          : stage.status === "Current"
                            ? "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300"
                            : "border-slate-200 bg-slate-50 text-slate-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                      )}
                    >
                      {stage.status}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-[10px] text-slate-400 dark:text-zinc-500">
                    {formatDate(stage.date)} · {formatTime(stage.time)} EAT
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
                    {stage.description}
                  </p>
                  {idx < timeline.length - 1 && <span className="sr-only">next stage</span>}
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ── SCHEDULE ── */}
      {schedule.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">Schedule</h2>
          <ScheduleTable schedule={schedule} />
        </section>
      )}

      {/* ── LIVE RESULTS ── */}
      {liveResults && (
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">Live Results</h2>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-white">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              Live
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            {liveResults.name} · {liveResults.currentRound} ·{" "}
            <span className="font-semibold text-slate-700 dark:text-zinc-300">{liveResults.currentTime}</span> ·{" "}
            {formatNumber(liveResults.numberOfCompetitors)} competitors
          </p>
          <div className="overflow-x-auto rounded-3xl border border-red-200 bg-white shadow-sm dark:border-red-900/50 dark:bg-zinc-900/60">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-red-50 text-[10px] font-extrabold uppercase tracking-wider text-red-800 dark:border-zinc-800 dark:bg-red-950/30 dark:text-red-300">
                  <th className="px-5 py-3.5">Rank</th>
                  <th className="px-5 py-3.5">Bib</th>
                  <th className="px-5 py-3.5">Athlete</th>
                  <th className="px-5 py-3.5">Club</th>
                  <th className="px-5 py-3.5">Lane</th>
                  <th className="px-5 py-3.5">Result</th>
                  <th className="px-5 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody>
                {liveResults.leaderboard.map((c) => (
                  <tr
                    key={c.bibNumber}
                    className="border-b border-slate-100 text-xs transition-colors last:border-0 hover:bg-red-50/40 dark:border-zinc-800/60 dark:hover:bg-zinc-800/30"
                  >
                    <td className="px-5 py-3.5 font-extrabold text-slate-900 dark:text-white">{c.rank}</td>
                    <td className="px-5 py-3.5 font-mono text-slate-500 dark:text-zinc-400">{c.bibNumber}</td>
                    <td className="px-5 py-3.5 font-bold text-slate-900 dark:text-white">{c.athleteName}</td>
                    <td className="px-5 py-3.5 text-slate-600 dark:text-zinc-300">{c.club}</td>
                    <td className="px-5 py-3.5 font-mono text-slate-500 dark:text-zinc-400">{c.lane}</td>
                    <td className="px-5 py-3.5 font-mono font-bold text-blue-700 dark:text-blue-400">{c.result}</td>
                    <td className="px-5 py-3.5">
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide",
                          c.status === "Qualified"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                            : c.status === "Eliminated"
                              ? "bg-slate-100 text-slate-500 dark:bg-zinc-800 dark:text-zinc-400"
                              : c.status === "Running"
                                ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
                                : "bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-300"
                        )}
                      >
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ── FINAL RESULTS ── */}
      {finalResults && (
        <section className="space-y-4">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">Final Results</h2>
          <div className="mb-3 flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/60 dark:bg-amber-950/30">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-500 text-white">
              <Icon name="trophy" className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Champion
              </p>
              <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                {finalResults.winner} · {finalResults.winnerClub}
              </p>
            </div>
          </div>
          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-400">
                  <th className="px-5 py-3.5">Position</th>
                  <th className="px-5 py-3.5">Bib</th>
                  <th className="px-5 py-3.5">Athlete</th>
                  <th className="px-5 py-3.5">Club</th>
                  <th className="px-5 py-3.5">Result</th>
                </tr>
              </thead>
              <tbody>
                {finalResults.standings.map((s) => (
                  <tr
                    key={s.bibNumber}
                    className="border-b border-slate-100 text-xs transition-colors last:border-0 hover:bg-blue-50/40 dark:border-zinc-800/60 dark:hover:bg-zinc-800/30"
                  >
                    <td className="px-5 py-3.5">
                      <span
                        className={cn(
                          "inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-black",
                          s.medal ? MEDAL_STYLES[s.medal] : "bg-slate-100 text-slate-500 dark:bg-zinc-800 dark:text-zinc-400"
                        )}
                      >
                        {s.position}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-slate-500 dark:text-zinc-400">{s.bibNumber}</td>
                    <td className="px-5 py-3.5 font-bold text-slate-900 dark:text-white">{s.athlete}</td>
                    <td className="px-5 py-3.5 text-slate-600 dark:text-zinc-300">{s.club}</td>
                    <td className="px-5 py-3.5 font-mono font-bold text-blue-700 dark:text-blue-400">{s.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ── VENUE INFORMATION ── */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">Venue Information</h2>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
              <Icon name="mapPin" className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{venue.name}</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">{venue.address}</p>
              <div className="mt-4 grid gap-3 text-xs sm:grid-cols-2">
                <div>
                  <p className="font-bold text-slate-500 dark:text-zinc-400">City / Region</p>
                  <p className="mt-0.5 font-semibold text-slate-800 dark:text-zinc-100">
                    {venue.city}, {venue.region}
                  </p>
                </div>
                <div>
                  <p className="font-bold text-slate-500 dark:text-zinc-400">Surface</p>
                  <p className="mt-0.5 font-semibold text-slate-800 dark:text-zinc-100">{venue.surface}</p>
                </div>
              </div>
              <div className="mt-5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                  Facilities
                </p>
                <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                  {venue.facilities.map((facility) => (
                    <li key={facility} className="flex items-start gap-2 text-xs text-slate-600 dark:text-zinc-300">
                      <Icon name="checkCircle" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                      {facility}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
