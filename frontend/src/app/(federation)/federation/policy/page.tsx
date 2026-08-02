"use client";

import React, { useState } from "react";

const clubs = [
  { id: "CLB-001", name: "Arada Athletics Club", region: "Addis Ababa", licensed: true, athletes: 124, pending: 3, transferLocked: false, fee: "Paid" },
  { id: "CLB-002", name: "Hawassa Athletics AC", region: "Sidama", licensed: true, athletes: 88, pending: 0, transferLocked: true, fee: "Paid" },
  { id: "CLB-003", name: "Adama Sports Club", region: "Oromia", licensed: false, athletes: 45, pending: 12, transferLocked: false, fee: "Overdue" },
  { id: "CLB-004", name: "St. Joseph Academy", region: "Addis Ababa", licensed: true, athletes: 67, pending: 5, transferLocked: false, fee: "Paid" },
  { id: "CLB-005", name: "Lideta Youth Club", region: "Addis Ababa", licensed: false, athletes: 31, pending: 8, transferLocked: false, fee: "Overdue" },
];

const transfers = [
  { id: "TRF-001", athlete: "Bekele Worku", from: "Adama SC", to: "Arada AC", date: "2026-07-22", status: "Approved", deadline: "Passed" },
  { id: "TRF-002", athlete: "Tigist Haile", from: "Hawassa AC", to: "St. Joseph", date: "2026-07-24", status: "Pending Review", deadline: "Open" },
  { id: "TRF-003", athlete: "Dawit Tesfaye", from: "Lideta YC", to: "Arada AC", date: "2026-07-25", status: "Pending Review", deadline: "Open" },
];

export default function PolicyPage() {
  const [clubList, setClubList] = useState(clubs);
  const [tfList, setTfList] = useState(transfers);

  const activateLicense = (id: string) => {
    setClubList((prev) => prev.map((c) => c.id === id ? { ...c, licensed: true, fee: "Paid" } : c));
  };
  const lockTransfer = (id: string) => {
    setTfList((prev) => prev.map((t) => t.id === id ? { ...t, status: "Locked", deadline: "Closed" } : t));
  };

  const statusStyle: Record<string, string> = {
    "Approved": "text-emerald-600 dark:text-emerald-400",
    "Pending Review": "text-yellow-600 dark:text-yellow-400",
    "Locked": "text-red-600 dark:text-red-400",
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Policy & Club Audit Panel</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
          Manage club licensing, roster audits, and digital transfer registries — per EAF Regulatory Framework.
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/40 backdrop-blur-md shadow-sm">
          <p className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Total Clubs</p>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{clubs.length}</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">{clubs.filter(c => c.licensed).length} Licensed</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/40 backdrop-blur-md shadow-sm">
          <p className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Pending Submissions</p>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{clubs.reduce((a, c) => a + c.pending, 0)}</p>
          <p className="text-xs text-yellow-600 dark:text-yellow-400 font-medium mt-1">Across {clubs.filter(c => c.pending > 0).length} clubs</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/40 backdrop-blur-md shadow-sm">
          <p className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Overdue License Fees</p>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{clubs.filter(c => c.fee === "Overdue").length}</p>
          <p className="text-xs text-red-600 dark:text-red-400 font-medium mt-1">Telebirr payment required</p>
        </div>
      </div>

      {/* Club Roster Table */}
      <div className="rounded-2xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30 overflow-hidden shadow-sm">
        <div className="border-b border-slate-100 dark:border-zinc-800 px-6 py-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-zinc-200">Club & School Licensing Registry</h2>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-zinc-800">
          {clubList.map((club) => (
            <div key={club.id} className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between hover:bg-slate-50/80 dark:hover:bg-zinc-900/40 transition-colors">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-bold text-slate-900 dark:text-zinc-100">{club.name}</p>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold font-mono border ${club.licensed
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
                    : "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20"
                    }`}>
                    {club.licensed ? "Licensed" : "Unlicensed"}
                  </span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold font-mono border ${club.fee === "Paid"
                    ? "bg-slate-100 text-slate-700 border-slate-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700"
                    : "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20"
                    }`}>
                    Fee: {club.fee}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3 mt-1 text-[10px] font-mono text-slate-500 dark:text-zinc-400">
                  <span>{club.region}</span>
                  <span>{club.athletes} Athletes</span>
                  {club.pending > 0 && <span className="text-yellow-600 dark:text-yellow-400 font-bold">{club.pending} Pending Docs</span>}
                  {club.transferLocked && <span className="text-red-600 dark:text-red-400 font-bold">Transfers Locked</span>}
                </div>
              </div>
              {!club.licensed && (
                <button
                  onClick={() => activateLicense(club.id)}
                  className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold text-white transition-colors active:scale-95 shadow-sm"
                  style={{ backgroundColor: "#0140A7" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "#0A4870")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "#0140A7")}
                >
                  Activate License
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Transfer Registry */}
      <div className="rounded-2xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30 overflow-hidden shadow-sm">
        <div className="border-b border-slate-100 dark:border-zinc-800 px-6 py-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-zinc-200">Digital Transfer Registry</h2>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-zinc-800">
          {tfList.map((tf) => (
            <div key={tf.id} className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between hover:bg-slate-50/80 dark:hover:bg-zinc-900/40 transition-colors">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-zinc-200">{tf.athlete}</p>
                <div className="flex flex-wrap gap-2 mt-0.5 text-[10px] font-mono text-slate-500 dark:text-zinc-400">
                  <span>{tf.from} → {tf.to}</span>
                  <span>•</span>
                  <span>Filed: {tf.date}</span>
                  <span>•</span>
                  <span>Window: {tf.deadline}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className={`text-xs font-bold font-mono ${statusStyle[tf.status] || "text-slate-600 dark:text-zinc-400"}`}>
                  {tf.status}
                </span>
                {tf.status === "Pending Review" && (
                  <button
                    onClick={() => lockTransfer(tf.id)}
                    className="rounded-lg border border-red-500/30 bg-red-500/5 px-3 py-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    Lock Transfer
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
