"use client";

import React, { useState } from "react";

const results = [
  { id: "RES-001", event: "100m Men Senior Final", status: "Certified", wind: "+1.6", signed: true, finishFile: "EVT-0822-100M-FINAL.evt" },
  { id: "RES-002", event: "Women 800m U20 Heat 1", status: "Pending Sign-Off", wind: "N/A", signed: false, finishFile: "EVT-0822-W800-H1.evt" },
  { id: "RES-003", event: "Men Triple Jump Senior", status: "Pending Sign-Off", wind: "+0.8", signed: false, finishFile: "EVT-0822-MTJ.evt" },
  { id: "RES-004", event: "Women 200m U18 Semi Final", status: "Rejected (Wind)", wind: "+2.4", signed: false, finishFile: "EVT-0822-W200-SF.evt" },
];

const broadcasts = [
  { id: "BC-001", channel: "EBC Sports WebSocket", status: "Connected", latency: "0.8s", format: "JSON / WS" },
  { id: "BC-002", channel: "Africa Sports TV GraphQL", status: "Connected", latency: "1.1s", format: "JSON / WS" },
  { id: "BC-003", channel: "Media Press Portal API", status: "Idle", latency: "—", format: "REST / JSON" },
];

const statusStyle: Record<string, string> = {
  "Certified": "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20",
  "Pending Sign-Off": "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border border-yellow-500/20",
  "Rejected (Wind)": "bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20",
};

export default function ResultsPage() {
  const [items, setItems] = useState(results);
  const [signing, setSigning] = useState<string | null>(null);

  const signOff = (id: string) => {
    setSigning(id);
    setTimeout(() => {
      setItems((prev) => prev.map((r) => r.id === id ? { ...r, status: "Certified", signed: true } : r));
      setSigning(null);
    }, 1600);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Results Portal</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
          Monitor photo-finish ingestion, wind validations, broadcast feeds, and certify official scoresheets.
        </p>
      </div>

      {/* Live Pipeline Status */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/40 backdrop-blur-md shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 font-mono">Online</span>
          </div>
          <p className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">Photo-Finish Ingestor</p>
          <p className="text-sm font-bold text-slate-900 dark:text-zinc-200 mt-1">FinishLynx Pipeline</p>
          <p className="text-[10px] font-mono text-slate-500 dark:text-zinc-400 mt-1">Watching: /ingest/*.LIF / *.EVT</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/40 backdrop-blur-md shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 font-mono">Synced</span>
          </div>
          <p className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">Wind Gauge Integration</p>
          <p className="text-sm font-bold text-slate-900 dark:text-zinc-200 mt-1">WG-402 Live Sensor</p>
          <p className="text-[10px] font-mono text-slate-500 dark:text-zinc-400 mt-1">Threshold: ±2.0 m/s (WA Rule)</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/40 backdrop-blur-md shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 font-mono">Live</span>
          </div>
          <p className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">NGB Sync</p>
          <p className="text-sm font-bold text-slate-900 dark:text-zinc-200 mt-1">World Athletics XML Export</p>
          <p className="text-[10px] font-mono text-slate-500 dark:text-zinc-400 mt-1">ETH-NADA API: IDLE</p>
        </div>
      </div>

      {/* Broadcast Engine */}
      <div className="rounded-2xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30 overflow-hidden shadow-sm">
        <div className="border-b border-slate-100 dark:border-zinc-800 px-6 py-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-zinc-200">Live Broadcast Feeds</h2>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-zinc-800">
          {broadcasts.map((bc) => (
            <div key={bc.id} className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 hover:bg-slate-50/80 dark:hover:bg-zinc-900/40 transition-colors">
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-zinc-200">{bc.channel}</p>
                <p className="text-[10px] font-mono text-slate-500 dark:text-zinc-400 mt-0.5">Format: {bc.format}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">
                  Latency: <span className={bc.latency === "—" ? "text-slate-400 dark:text-zinc-500" : "text-emerald-600 dark:text-emerald-400 font-bold"}>{bc.latency}</span>
                </span>
                <span className={`rounded-full px-3 py-1 text-[10px] font-bold font-mono border ${
                  bc.status === "Connected"
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
                    : "bg-slate-100 text-slate-600 border-slate-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700"
                }`}>
                  {bc.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Result Sign-Off Queue */}
      <div className="rounded-2xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 px-6 py-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-zinc-200">Official Scoresheet Sign-Off</h2>
          <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs text-yellow-700 dark:text-yellow-400 font-bold border border-yellow-500/20">
            {items.filter(i => i.status === "Pending Sign-Off").length} Awaiting Signature
          </span>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-zinc-800">
          {items.map((res) => (
            <div key={res.id} className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between hover:bg-slate-50/80 dark:hover:bg-zinc-900/40 transition-colors">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-bold text-slate-900 dark:text-zinc-200">{res.event}</p>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold font-mono ${statusStyle[res.status] || "bg-slate-100 text-slate-700 border-slate-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700"}`}>
                    {res.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3 mt-1 text-[10px] font-mono text-slate-500 dark:text-zinc-400">
                  <span>File: {res.finishFile}</span>
                  <span>•</span>
                  <span className={parseFloat(res.wind) > 2.0 ? "text-red-600 dark:text-red-400 font-bold" : "text-slate-600 dark:text-zinc-400"}>
                    Wind: {res.wind} m/s {parseFloat(res.wind) > 2.0 ? "⚠ ILLEGAL" : ""}
                  </span>
                  {res.signed && <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓ Signed Off</span>}
                </div>
              </div>
              {res.status === "Pending Sign-Off" && (
                <button
                  onClick={() => signOff(res.id)}
                  disabled={signing === res.id}
                  className="shrink-0 flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors active:scale-95 disabled:opacity-50 shadow-sm"
                >
                  {signing === res.id ? (
                    <>
                      <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Certifying...
                    </>
                  ) : "Certify & Sign Off"}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
