"use client";

import React, { useState } from "react";

const initialLogs = [
  { id: 1, type: "system", message: "Wind-Gauge feed synced for Addis Ababa Stadium (Device ID: WG-402)", time: "10 mins ago" },
  { id: 2, type: "auth", message: "Fayda ID verification batch query completed (1,240 records processed)", time: "42 mins ago" },
  { id: 3, type: "warning", message: "Roster audit flagged age discrepancy for Athlete U18 registry (Club: Arada Athletics)", time: "1 hour ago" },
  { id: 4, type: "timing", message: "Ingested photo-finish event file 'EVT-0822-100M-FINAL.evt' from FinishLynx", time: "2 hours ago" },
  { id: 5, type: "payment", message: "Telebirr license fee transaction batch approved by NBE gateway", time: "4 hours ago" },
];

export default function AdminDashboard() {
  const [secLoading, setSecLoading] = useState(false);
  const [logs, setLogs] = useState(initialLogs);

  const triggerAudit = () => {
    setSecLoading(true);
    setTimeout(() => {
      setSecLoading(false);
      setLogs((prev) => [
        { id: Date.now(), type: "system", message: "Triggered global Proclamation No. 1284/2023 biometric registry check: all profiles verified.", time: "Just now" },
        ...prev,
      ]);
    }, 1200);
  };

  const bgMap: Record<string, string> = {
    system: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    auth: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    warning: "bg-red-500/10 text-red-600 dark:text-red-400",
    timing: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    payment: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Federation Dashboard</h1>
          <p className="text-sm text-slate-600 dark:text-zinc-400">EACRMS Central Command — Ethiopian Athletic Federation (EAF)</p>
        </div>
        <button
          onClick={triggerAudit}
          disabled={secLoading}
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/10 transition-all hover:bg-emerald-500 active:scale-[0.98] disabled:opacity-50"
        >
          {secLoading ? (
            <><div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> Auditing...</>
          ) : (
            <><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg> Run Registry Audit</>
          )}
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Registered Athletes", value: "15,482", sub: "15,124 Fayda verified", tag: "98% Verified", tagColor: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" },
          { label: "Timing Ingestors", value: "4 / 4", sub: "FinishLynx & RFID connected", tag: "Active", tagColor: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" },
          { label: "Pending Licenses", value: "124", sub: "Needs manual document audit", tag: "Action Required", tagColor: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400" },
          { label: "NBE Payments", value: "99.8%", sub: "Telebirr & Chapa APIs Active", tag: "Secured", tagColor: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40 backdrop-blur-md shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-zinc-500 uppercase tracking-wider">{s.label}</span>
              <span className={`rounded px-2 py-0.5 text-[10px] font-mono font-bold ${s.tagColor}`}>{s.tag}</span>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{s.value}</span>
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-zinc-500">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Logs + Security */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/30 backdrop-blur-md shadow-sm lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Regulatory & Timing Logs</h2>
          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-zinc-800/60 dark:bg-zinc-900/50">
                <span className={`rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider font-mono shrink-0 ${bgMap[log.type] ?? "bg-slate-200 text-slate-700 dark:bg-zinc-800 dark:text-zinc-400"}`}>
                  {log.type}
                </span>
                <div>
                  <p className="text-xs font-medium text-slate-800 dark:text-zinc-200">{log.message}</p>
                  <p className="text-[10px] text-slate-500 dark:text-zinc-500 mt-0.5">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/30 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">Infrastructure Security</h2>
            <div className="space-y-4 text-xs">
              {[
                { k: "Security Standard", v: "AES-256 / TLS 1.3", c: "text-slate-700 dark:text-zinc-300" },
                { k: "WAF Protection", v: "ACTIVE (DDoS Shield)", c: "text-emerald-600 dark:text-emerald-400" },
                { k: "Server Latency", v: "< 1.2s avg", c: "text-emerald-600 dark:text-emerald-400" },
                { k: "Anti-Doping API", v: "IDLE", c: "text-slate-500 dark:text-zinc-400" },
              ].map((row) => (
                <div key={row.k} className="flex justify-between border-b border-slate-100 dark:border-zinc-800 pb-2 last:border-0 last:pb-0">
                  <span className="text-slate-500 dark:text-zinc-500">{row.k}</span>
                  <span className={`font-semibold font-mono ${row.c}`}>{row.v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
            <h3 className="text-sm font-bold text-emerald-700 dark:text-emerald-400 mb-2">Addis Ababa Grand Prix Notice</h3>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Photo-finish registers are monitored in the Results Portal. Wind measurement limits are locked to World Athletics standards: ±2.0 m/s threshold.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
