"use client";

import React, { useState } from "react";

const events = [
  { id: "EVT-001", name: "100m Men Senior Final", venue: "Addis Ababa Stadium", status: "Seeded", lanes: 8, heats: 1, windLimit: 2.0, timingSystem: "FinishLynx + RFID" },
  { id: "EVT-002", name: "Women 800m U20 Heats", venue: "Addis Ababa Stadium", status: "Pending Seeding", lanes: 8, heats: 3, windLimit: null, timingSystem: "FinishLynx" },
  { id: "EVT-003", name: "Men Triple Jump Senior", venue: "Adama Sports Complex", status: "Seeded", lanes: 6, heats: 1, windLimit: 2.0, timingSystem: "Manual + Tablet" },
  { id: "EVT-004", name: "Women 200m U18 Semi", venue: "Hawassa Athletics Track", status: "Draft", lanes: 6, heats: 2, windLimit: 2.0, timingSystem: "FinishLynx" },
];

const statusStyle: Record<string, string> = {
  "Seeded": "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20",
  "Pending Seeding": "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border border-yellow-500/20",
  "Draft": "bg-slate-100 text-slate-700 border-slate-300 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700",
};

export default function EventsPage() {
  const [items, setItems] = useState(events);
  const [running, setRunning] = useState<string | null>(null);

  const runSeeding = (id: string) => {
    setRunning(id);
    setTimeout(() => {
      setItems((prev) => prev.map((e) => e.id === id ? { ...e, status: "Seeded" } : e));
      setRunning(null);
    }, 1800);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Events Setup & Seeding</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
          Configure meet specifications, run World Athletics-compliant seeding engines, and bind timing hardware systems.
        </p>
      </div>

      {/* World Athletics Compliance Banner */}
      <div className="flex items-center gap-4 rounded-2xl border border-blue-500/20 bg-blue-500/5 px-6 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 shrink-0">
          <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-bold text-blue-700 dark:text-blue-400">World Athletics Seeding Rulebook — Active Compliance Mode</p>
          <p className="text-xs text-slate-600 dark:text-zinc-400">Lane allocation derived from validated PR/SB athlete records. Wind gauge threshold: ±2.0 m/s for sprints and jumps.</p>
        </div>
        <span className="ml-auto rounded-full bg-blue-500/10 px-3 py-1 text-[10px] font-mono font-bold text-blue-700 dark:text-blue-400 border border-blue-500/20 hidden sm:inline">
          WA Rule § 163
        </span>
      </div>

      {/* Timing Hardware Status */}
      <div>
        <h2 className="text-base font-bold text-slate-900 dark:text-zinc-200 mb-4">Timing Hardware Status</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "FinishLynx Photo-Finish", file: ".LIF / .EVT", status: "Online", color: "emerald" },
            { name: "RFID Transponder Mats", file: "Passive RF", status: "Online", color: "emerald" },
            { name: "Wind Gauge (WG-402)", file: "Live Sensor", status: "Online", color: "emerald" },
            { name: "Backup Timing Server", file: "Standby", status: "Standby", color: "zinc" },
          ].map((hw) => (
            <div key={hw.name} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/40 backdrop-blur-md shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className={`h-2.5 w-2.5 rounded-full ${hw.color === "emerald" ? "bg-emerald-500 animate-pulse" : "bg-slate-400 dark:bg-zinc-600"}`} />
                <span className={`text-[11px] font-bold font-mono ${hw.color === "emerald" ? "text-emerald-700 dark:text-emerald-400" : "text-slate-500 dark:text-zinc-400"}`}>{hw.status}</span>
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-zinc-200">{hw.name}</p>
              <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-mono mt-1">Format: {hw.file}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Event Management Table */}
      <div className="rounded-2xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 px-6 py-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-zinc-200">Competition Events</h2>
          <button className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition-colors active:scale-95 shadow-sm">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Event
          </button>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-zinc-800">
          {items.map((ev) => (
            <div key={ev.id} className="px-6 py-4 hover:bg-slate-50/80 dark:hover:bg-zinc-900/40 transition-colors">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-bold text-slate-900 dark:text-zinc-100">{ev.name}</p>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold font-mono ${statusStyle[ev.status]}`}>{ev.status}</span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-[10px] text-slate-500 dark:text-zinc-400 font-mono">
                    <span>📍 {ev.venue}</span>
                    <span>🏁 {ev.lanes} Lanes</span>
                    <span>🔥 {ev.heats} Heat{ev.heats > 1 ? "s" : ""}</span>
                    {ev.windLimit && <span>💨 Wind ≤ {ev.windLimit} m/s</span>}
                    <span>⏱ {ev.timingSystem}</span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  {ev.status !== "Seeded" && (
                    <button
                      onClick={() => runSeeding(ev.id)}
                      disabled={running === ev.id}
                      className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-500 transition-colors active:scale-95 disabled:opacity-50 shadow-sm"
                    >
                      {running === ev.id ? (
                        <>
                          <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Seeding...
                        </>
                      ) : "Run Seeding"}
                    </button>
                  )}
                  <button className="rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
