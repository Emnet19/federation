"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useEventOrganizer } from "@/context/EventOrganizerContext";
import { useDashboard } from "@/features/event-organizer/hooks/useDashboard";
import { QUICK_ACTIONS } from "@/features/event-organizer/data/dashboard";
import { getIcon } from "@/features/event-organizer/utils/icons";

const statsConfig = [
  { label: "Total Events", key: "total", accent: "#0140A7" },
  { label: "Upcoming", key: "upcoming", accent: "#0288D1" },
  { label: "Live Now", key: "live", accent: "#E6A500" },
  { label: "Completed", key: "completed", accent: "#555B63" },
] as const;

export default function EventOrganizerDashboard() {
  const { organizer } = useEventOrganizer();
  const { data, isLoading } = useDashboard();

  return (
    <div className="space-y-8">
      {/* ── WELCOME HERO ── */}
      <section
        className="relative overflow-hidden rounded-3xl p-8 text-white shadow-xl"
        style={{ backgroundColor: "#0140A7" }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full blur-[120px]" style={{ backgroundColor: "rgba(255,255,255,0.14)" }} />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full blur-[120px]" style={{ backgroundColor: "rgba(230,165,0,0.18)" }} />
        </div>

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center">
          <div className="flex-1 space-y-3">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider"
              style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "#E6FFFA" }}
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ backgroundColor: "#7FDBBF" }} />
              Organizer Command Center
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Welcome back, {organizer?.name.split(" ")[0] ?? "Organizer"}
            </h1>
            <p className="max-w-xl text-xs leading-relaxed sm:text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>
              Manage your competitions end-to-end: create sanctioned events, publish schedules, and stream
              live results to clubs and the public.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/events/create"
                className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-extrabold shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: "#E6A500", color: "#1D1D1F" }}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Event
              </Link>
              <Link
                href="/events/schedule"
                className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-extrabold transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: "rgba(255,255,255,0.14)", color: "#FFFFFF" }}
              >
                View Schedule →
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative hidden w-56 h-40 shrink-0 md:block">
            <div
              className="relative h-full w-full overflow-hidden rounded-2xl"
              style={{ border: "1px solid rgba(255,255,255,0.25)" }}
            >
              <Image
                src="/ethiopian_athlete_hero.png"
                alt="Ethiopian athletes competing"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0" style={{ backgroundColor: "rgba(1,64,167,0.15)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statsConfig.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60"
          >
            <p className="text-2xl font-extrabold" style={{ color: stat.accent }}>
              {isLoading ? (
                <span className="inline-block h-8 w-10 animate-pulse rounded-md bg-slate-200 dark:bg-zinc-700" />
              ) : (
                String(data?.stats[stat.key] ?? 0).padStart(2, "0")
              )}
            </p>
            <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-zinc-400">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* ── QUICK ACTIONS ── */}
      <section className="space-y-4">
        <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98] dark:border-zinc-800 dark:bg-zinc-900/60"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DCEBF6] text-[#0140A7] dark:bg-[#0A4870]/50 dark:text-blue-300">
                {getIcon(action.icon, { className: "h-5 w-5" })}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{action.name}</p>
                <p className="mt-0.5 text-[11px] font-medium text-slate-400 dark:text-zinc-500">{action.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── UPCOMING EVENTS + ACTIVITY ── */}
      <section className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Events */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Upcoming Events</h2>
            <Link href="/events/schedule" className="text-xs font-bold text-[#0140A7] dark:text-blue-400">
              View schedule →
            </Link>
          </div>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-14 animate-pulse rounded-xl bg-slate-100 dark:bg-zinc-800" />
              ))}
            </div>
          ) : (data?.upcomingEvents.length ?? 0) === 0 ? (
            <p className="py-8 text-center text-xs text-slate-500 dark:text-zinc-400">
              No upcoming events scheduled.
            </p>
          ) : (
            <div className="space-y-3">
              {data?.upcomingEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50 p-3.5 transition-colors dark:border-zinc-800 dark:bg-zinc-950/40"
                >
                  <div className="min-w-0 space-y-0.5">
                    <p className="truncate text-sm font-bold text-slate-900 dark:text-white">{ev.name}</p>
                    <p className="font-mono text-[11px] text-slate-400 dark:text-zinc-500">
                      {ev.date} • {ev.venue}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#0140A7] dark:bg-blue-950/40 dark:text-blue-400">
                    {ev.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
          <h2 className="mb-4 text-base font-extrabold text-slate-900 dark:text-white">Recent Activity</h2>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-9 animate-pulse rounded-xl bg-slate-100 dark:bg-zinc-800" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {data?.activity.map((a) => (
                <div key={a.text} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#0140A7] dark:bg-blue-500" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs leading-relaxed text-slate-700 dark:text-zinc-300">{a.text}</p>
                    <p className="mt-0.5 font-mono text-[10px] text-slate-400 dark:text-zinc-500">
                      {a.type} • {a.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
