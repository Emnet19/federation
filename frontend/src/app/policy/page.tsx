"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/common/ThemeToggle";

export default function PublicPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-200">
      {/* Navigation Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 dark:border-zinc-800/80 dark:bg-zinc-900/80 backdrop-blur-xl px-4 sm:px-8 py-3.5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-white border border-slate-200 dark:bg-zinc-900 dark:border-zinc-800 p-1 shadow-sm transition-transform group-hover:scale-105">
                <Image src="/logo.png" alt="EAF Logo" fill className="object-contain" priority />
              </div>
              <div>
                <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white block leading-none">
                  EACRMS
                </span>
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 font-mono tracking-wider">
                  ETHIOPIAN ATHLETICS FEDERATION
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm hover:border-blue-600 hover:text-blue-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all"
            >
              ← Back to Portal
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-12 space-y-12">
        {/* Banner */}
        <div className="rounded-3xl border border-slate-200 dark:border-zinc-800/80 bg-gradient-to-br from-blue-500/5 via-blue-500/0 to-transparent p-8 sm:p-10 text-center space-y-4 shadow-xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            EAF Regulatory & Licensing Policy
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Official guidelines governing national athlete registration, Fayda biometric verification, club licensing, and competition entry standards across the Federal Democratic Republic of Ethiopia.
          </p>
        </div>

        {/* Policy Pillars */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Pillar 1 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/60 shadow-sm space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 font-bold">
              01
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Fayda National Identity Mandate</h2>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Per EAF directive, all domestic and national league athletes must complete Fayda 16-digit FAN ID verification prior to receiving competition licenses. Manual age declarations without Fayda verification will be flagged for secondary audit.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/60 shadow-sm space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
              02
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Club Licensing & Roster Limits</h2>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Affiliated athletics clubs must renew their license annually. Club roster changes are subject to transfer windows. Unaffiliated athletes may register directly for open trial divisions subject to federation approval.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/60 shadow-sm space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold">
              03
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">World Athletics Technical Rules</h2>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Seeding algorithms, heat lane assignments, and timing hardware integrations (FinishLynx & transponder timing) operate strictly in compliance with World Athletics Technical Rule § 163.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/60 shadow-sm space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold">
              04
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Anti-Doping & Age Integrity</h2>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              ETH-NADO anti-doping compliance and age-group verification (U16, U18, U20, Senior) are mandatory. Discrepancies lead to immediate license suspension and pending hearing review.
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40 gap-4">
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">Have questions about policy compliance?</p>
            <p className="text-xs text-slate-500 dark:text-zinc-400">Contact the Ethiopian Athletics Federation Technical Secretariat.</p>
          </div>
          <Link
            href="/athlete/register"
            className="rounded-xl px-5 py-2.5 text-xs font-extrabold text-white transition-all shadow-md shrink-0 bg-[#E6A500] hover:bg-[#C98F00]"
          >
            Start Fayda Registration →
          </Link>
        </div>
      </main>
    </div>
  );
}
