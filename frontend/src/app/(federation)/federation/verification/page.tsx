"use client";

import React, { useState } from "react";

const queue = [
  { id: "VRF-001", name: "Biruk Tekle", age: 17, club: "Arada Athletics", type: "Fayda", status: "Pending", flag: "Age Discrepancy" },
  { id: "VRF-002", name: "Sara Moges", age: 15, club: "St. Joseph School", type: "Passport Scan", status: "Pending", flag: null },
  { id: "VRF-003", name: "Solomon Alemu", age: 20, club: "Adama AC", type: "Fayda", status: "Approved", flag: null },
  { id: "VRF-004", name: "Hana Girma", age: 18, club: "Lideta Club", type: "Birth Certificate", status: "Pending", flag: null },
  { id: "VRF-005", name: "Yonas Tesfaye", age: 14, club: "Hawassa Athletics", type: "Passport Scan", status: "Rejected", flag: "Missing Guardian Consent" },
];

const ageDivisions = [
  { label: "U16 (Under 16)", count: 3842, verified: 3710 },
  { label: "U18 (Under 18)", count: 4591, verified: 4430 },
  { label: "U20 (Under 20)", count: 3112, verified: 3100 },
  { label: "Senior (20+)", count: 3937, verified: 3884 },
];

export default function VerificationPage() {
  const [items, setItems] = useState(queue);

  const approve = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: "Approved", flag: null } : i)));
  };

  const reject = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: "Rejected" } : i)));
  };

  const statusStyle: Record<string, string> = {
    Pending: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border border-yellow-500/20",
    Approved: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20",
    Rejected: "bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20",
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Verification Control Panel</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
          Fayda National ID integration, manual document queues, and age-class validation — governed by Proclamation No. 1284/2023.
        </p>
      </div>

      {/* Fayda Status Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-6 py-5 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
            <svg className="h-5 w-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </span>
          <div>
            <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Fayda National ID API — Connected</p>
            <p className="text-xs text-slate-600 dark:text-zinc-400">Last batch: 1,240 records — <span className="text-emerald-600 dark:text-emerald-400 font-semibold">1,212 passed</span> · <span className="text-yellow-600 dark:text-yellow-400 font-semibold">18 flagged</span> · <span className="text-red-600 dark:text-red-400 font-semibold">10 rejected</span></p>
          </div>
        </div>
        <div className="sm:ml-auto flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-zinc-400">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          API Gateway: api.fayda.gov.et / TLS 1.3
        </div>
      </div>

      {/* Age Division Summary */}
      <div>
        <h2 className="text-base font-bold text-slate-900 dark:text-zinc-200 mb-4">Age-Class Division Verification Status</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ageDivisions.map((div) => {
            const pct = Math.round((div.verified / div.count) * 100);
            return (
              <div key={div.label} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/40 backdrop-blur-md shadow-sm">
                <p className="text-xs font-bold text-slate-500 dark:text-zinc-400 mb-1">{div.label}</p>
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{pct}%</p>
                <div className="mt-2 h-1.5 rounded-full bg-slate-100 dark:bg-zinc-800">
                  <div
                    className="h-1.5 rounded-full bg-emerald-500 transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="mt-2 text-[10px] text-slate-500 dark:text-zinc-400 font-mono">{div.verified.toLocaleString()} / {div.count.toLocaleString()} verified</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Manual Verification Queue */}
      <div className="rounded-2xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 px-6 py-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-zinc-200">Manual Document Review Queue</h2>
          <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs text-yellow-700 dark:text-yellow-400 font-bold border border-yellow-500/20">
            {items.filter(i => i.status === "Pending").length} Pending
          </span>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-zinc-800">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between hover:bg-slate-50/80 dark:hover:bg-zinc-900/40 transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-400 text-xs font-bold shrink-0 border border-slate-200 dark:border-zinc-700">
                  {item.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-zinc-200">{item.name}</p>
                  <div className="flex flex-wrap gap-2 mt-0.5 text-[10px] text-slate-500 dark:text-zinc-400 font-mono">
                    <span>ID: {item.id}</span>
                    <span>•</span>
                    <span>Age {item.age}</span>
                    <span>•</span>
                    <span>{item.club}</span>
                    <span>•</span>
                    <span>{item.type}</span>
                  </div>
                  {item.flag && (
                    <span className="mt-1 inline-flex rounded bg-red-500/10 px-2 py-0.5 text-[10px] text-red-600 dark:text-red-400 font-bold border border-red-500/20">
                      ⚠ {item.flag}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-bold font-mono ${statusStyle[item.status]}`}>
                  {item.status}
                </span>
                {item.status === "Pending" && (
                  <div className="flex gap-2">
                    <button onClick={() => approve(item.id)} className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors active:scale-95 shadow-sm">
                      Approve
                    </button>
                    <button onClick={() => reject(item.id)} className="rounded-lg border border-red-500/30 bg-red-500/5 px-3 py-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors active:scale-95">
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
