"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/common/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-200">
      {/* ── NAVIGATION BAR ── */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 dark:border-zinc-800/80 dark:bg-zinc-900/80 backdrop-blur-xl px-4 sm:px-8 py-3.5 transition-colors duration-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl p-1 shadow-sm transition-transform group-hover:scale-105 bg-white border border-slate-200 dark:bg-zinc-900 dark:border-zinc-800">
              <Image src="/logo.png" alt="EAF Logo" fill className="object-contain" priority />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight block leading-none text-slate-900 dark:text-white">
                EACRMS
              </span>
              <span className="text-[10px] font-bold font-mono tracking-wider text-blue-600 dark:text-blue-400">
                ETHIOPIAN ATHLETICS FEDERATION
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/policy"
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all border border-slate-200 bg-white text-slate-600 hover:border-blue-600 hover:text-blue-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-blue-400 dark:hover:text-blue-400"
            >
              <svg className="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Policy &amp; Regulations
            </Link>

            <Link
              href="/club-admin/login"
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-extrabold text-white shadow-md transition-all active:scale-95 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* ── DECORATIVE BACKGROUND ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full blur-[160px] bg-blue-500/5 dark:bg-blue-500/10" />
        <div className="absolute top-1/2 -right-32 h-[500px] w-[500px] rounded-full blur-[160px] bg-yellow-500/5 dark:bg-yellow-500/10" />
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="relative z-10 flex-1 mx-auto max-w-7xl px-4 sm:px-8 py-12 space-y-20">

        {/* HERO SECTION */}
        <section className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold bg-blue-50/80 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40">
              <span className="h-2 w-2 rounded-full animate-pulse bg-blue-600 dark:bg-blue-400" />
              Official Ethiopian Athletics Operations Center
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.15] text-slate-900 dark:text-white">
              Ethiopian Athletics Competition &amp; Roster Management System
            </h1>

            <p className="text-base leading-relaxed text-slate-600 dark:text-zinc-300">
              Empowering Ethiopian athletes and national league clubs with verified biometric digital ID onboarding via{" "}
              <strong className="text-blue-600 dark:text-blue-400">Fayda National ID</strong>, World Athletics-compliant seeding engines,
              and live photo-finish timing.
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/athlete/register"
                className="flex items-center gap-2.5 rounded-2xl px-7 py-4 text-sm font-extrabold text-white shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] bg-[#E6A500] hover:bg-[#C98F00]"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Register as an Athlete
              </Link>

              <Link
                href="/policy"
                className="flex items-center gap-2.5 rounded-2xl px-7 py-4 text-sm font-bold shadow-sm transition-all border border-slate-200 bg-white text-slate-700 hover:border-blue-600 hover:text-blue-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-blue-400 dark:hover:text-blue-400"
              >
                Policy &amp; Regulations →
              </Link>
            </div>

            {/* METRICS */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-zinc-800/80">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">15,000+</p>
                <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400">Verified Athletes</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#E6A500] dark:text-yellow-400">100%</p>
                <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400">Fayda ID Sync</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">48 Clubs</p>
                <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400">National League</p>
              </div>
            </div>
          </div>

          {/* HERO IMAGERY */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group h-96 sm:h-[440px] border border-slate-200 dark:border-zinc-800/80">
              <Image
                src="/ethiopian_athlete_hero.png"
                alt="Ethiopian Track Athletes in Action"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white bg-gradient-to-t from-blue-900/90 via-blue-900/20 to-transparent">
                <h3 className="text-2xl font-extrabold tracking-tight">National Track &amp; Field Championships</h3>
                <p className="text-sm mt-1 text-blue-200 dark:text-blue-300">
                  Addis Ababa National Stadium • Real-Time FinishLynx Timing &amp; World Athletics Seeding
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── PLATFORM FEATURES ── */}
        <section className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Core Platform Capabilities
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
              Designed for speed, transparency, and full compliance with national identity regulations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Fayda National ID Verification",
                desc: "Seamless self-service athlete onboarding. Athletes use their 16-digit FAN ID to eliminate age cheating and manual paperwork.",
                iconColor: "text-blue-600 dark:text-blue-400",
                iconBg: "bg-blue-500/10 dark:bg-blue-500/20",
              },
              {
                title: "Live Competition & Seeding",
                desc: "Automated heat lane assignments, FinishLynx photo-finish integration, and real-time event status tracking for live national championships.",
                iconColor: "text-[#E6A500] dark:text-yellow-400",
                iconBg: "bg-yellow-500/10 dark:bg-yellow-500/20",
              },
              {
                title: "Secure Club & Federation Portals",
                desc: "Dedicated, isolated authentication portals for Club Officers and Federation Executives, featuring in-house athlete registration and roster audits.",
                iconColor: "text-blue-800 dark:text-blue-300",
                iconBg: "bg-blue-900/10 dark:bg-blue-900/20",
              },
            ].map((feat) => (
              <div
                key={feat.title}
                className="rounded-3xl p-7 space-y-3 shadow-sm bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800/80 transition-colors"
              >
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-bold text-xl ${feat.iconBg}`}>
                  <svg className={`h-6 w-6 ${feat.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{feat.title}</h3>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-zinc-400">{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              How Athlete Registration Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
              A simple, secure process powered by Fayda National ID.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 relative">
            {/* connector line */}
            <div className="hidden sm:block absolute top-10 left-[17%] right-[17%] h-0.5 bg-slate-200 dark:bg-zinc-800" />

            {[
              {
                step: "01",
                title: "Create Account",
                desc: "Enter your email, set a secure password and confirm it. Your account lets you track your registration status anytime.",
                color: "text-blue-600 dark:text-blue-400",
                bg: "bg-blue-500/10 dark:bg-blue-500/20",
                circleBorder: "border-blue-600/20",
                stepBg: "bg-blue-600",
              },
              {
                step: "02",
                title: "Verify Fayda FAN ID",
                desc: "Provide your 16-digit Fayda Access Number. The system instantly verifies your biometric identity from the national database.",
                color: "text-[#E6A500] dark:text-yellow-400",
                bg: "bg-yellow-500/10 dark:bg-yellow-500/20",
                circleBorder: "border-yellow-600/20",
                stepBg: "bg-[#E6A500]",
              },
              {
                step: "03",
                title: "Await Club Approval",
                desc: "Your application is sent to your chosen club for review. Log back in with your email and password to track status updates.",
                color: "text-blue-800 dark:text-blue-300",
                bg: "bg-blue-900/10 dark:bg-blue-900/20",
                circleBorder: "border-blue-900/20",
                stepBg: "bg-blue-800 dark:bg-blue-700",
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center space-y-4 relative">
                <div className={`relative z-10 h-20 w-20 rounded-full flex items-center justify-center shadow-lg ${item.bg} border-2 ${item.circleBorder}`}>
                  <svg className={`h-8 w-8 ${item.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className={`absolute -top-1 -right-1 h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-black text-white ${item.stepBg}`}>
                    {item.step}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/athlete/register"
              className="inline-flex items-center gap-2.5 rounded-2xl px-8 py-4 text-sm font-extrabold text-white shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] bg-[#E6A500] hover:bg-[#C98F00]"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Start Your Athlete Registration
            </Link>
          </div>
        </section>

        {/* ── FEDERATION NOTICE BOARD (NO EMOJIS) ── */}
        <section className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Official Notices &amp; Operational Status
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
              EACRMS system bulletins and technical specifications for athletic compliance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl p-7 space-y-4 bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800/80 shadow-sm transition-colors">
              <span className="text-[10px] font-bold font-mono tracking-wider text-blue-600 dark:text-blue-400 uppercase">
                Fayda Integration Bulletin
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Biometric ID Synchronization Mandate
              </h3>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
                All club registration procedures must connect directly to the Fayda National Identity system to audit age and nationality metrics. The automated database handshake eliminates processing delays and ensures identity accuracy.
              </p>
              <div className="text-[10px] font-mono text-slate-400 dark:text-zinc-500">
                Published: July 2026 • Technical Advisory Division
              </div>
            </div>

            <div className="rounded-3xl p-7 space-y-4 bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800/80 shadow-sm transition-colors">
              <span className="text-[10px] font-bold font-mono tracking-wider text-[#E6A500] dark:text-yellow-400 uppercase">
                Technical Specifications
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                FinishLynx Seeding Protocol Compliancy
              </h3>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
                Operational guidelines require automated seeding interfaces to synchronize with regional transponder configurations. Ensure all athlete profile registrations are approved forty-eight hours prior to scheduled trials.
              </p>
              <div className="text-[10px] font-mono text-slate-400 dark:text-zinc-500">
                Published: July 2026 • Competition Rules Board
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-4 text-center text-xs space-y-1 border-t border-slate-200 bg-white text-slate-500 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 transition-colors">
        <p>© 2026 Ethiopian Athletics Federation. All rights reserved.</p>
        <p className="font-mono text-[10px]">Powered by EACRMS · Integrated with Fayda Digital National ID</p>
      </footer>
    </div>
  );
}
