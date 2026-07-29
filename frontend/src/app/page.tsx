"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F7F8FA", color: "#1D1D1F" }}>
      {/* ── NAVIGATION BAR ── */}
      <header
        className="sticky top-0 z-40 px-4 sm:px-8 py-3.5 backdrop-blur-xl"
        style={{
          backgroundColor: "rgba(255,255,255,0.92)",
          borderBottom: "1px solid #D9DEE5",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="relative h-10 w-10 overflow-hidden rounded-xl p-1 shadow-sm transition-transform group-hover:scale-105"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #D9DEE5" }}
            >
              <Image src="/logo.png" alt="EAF Logo" fill className="object-contain" priority />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight block leading-none" style={{ color: "#1D1D1F" }}>
                EACRMS
              </span>
              <span className="text-[10px] font-bold font-mono tracking-wider" style={{ color: "#0140A7" }}>
                ETHIOPIAN ATHLETICS FEDERATION
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-3">
            <Link
              href="/policy"
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all"
              style={{
                border: "1px solid #D9DEE5",
                backgroundColor: "#FFFFFF",
                color: "#555B63",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#0140A7"; (e.currentTarget as HTMLElement).style.color = "#0140A7"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#D9DEE5"; (e.currentTarget as HTMLElement).style.color = "#555B63"; }}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: "#0140A7" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Policy &amp; Regulations
            </Link>

            <Link
              href="/club-admin/login"
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-extrabold text-white shadow-md transition-all active:scale-95"
              style={{ backgroundColor: "#0140A7" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "#0A4870")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "#0140A7")}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Club Portal Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* ── DECORATIVE BACKGROUND ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full blur-[160px]" style={{ backgroundColor: "rgba(1,64,167,0.07)" }} />
        <div className="absolute top-1/2 -right-32 h-[500px] w-[500px] rounded-full blur-[160px]" style={{ backgroundColor: "rgba(230,165,0,0.07)" }} />
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="relative z-10 flex-1 mx-auto max-w-7xl px-4 sm:px-8 py-12 space-y-20">

        {/* HERO SECTION */}
        <section className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold"
              style={{ backgroundColor: "#DCEBF6", color: "#0140A7", border: "1px solid rgba(1,64,167,0.2)" }}
            >
              <span className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: "#0140A7" }} />
              Official Ethiopian Athletics Operations Center
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.15]" style={{ color: "#1D1D1F" }}>
              Ethiopian Athletics Competition &amp; Roster Management System
            </h1>

            <p className="text-base leading-relaxed" style={{ color: "#555B63" }}>
              Empowering Ethiopian athletes and national league clubs with verified biometric digital ID onboarding via{" "}
              <strong style={{ color: "#0140A7" }}>Fayda National ID</strong>, World Athletics-compliant seeding engines,
              and live photo-finish timing.
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/athlete/register"
                className="flex items-center gap-2.5 rounded-2xl px-7 py-4 text-sm font-extrabold text-white shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: "#E6A500" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "#C98F00")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "#E6A500")}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Register as an Athlete
              </Link>

              <Link
                href="/club-admin/login"
                className="flex items-center gap-2.5 rounded-2xl px-7 py-4 text-sm font-bold shadow-sm transition-all"
                style={{
                  border: "1px solid #D9DEE5",
                  backgroundColor: "#FFFFFF",
                  color: "#1D1D1F",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#0140A7"; (e.currentTarget as HTMLElement).style.color = "#0140A7"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#D9DEE5"; (e.currentTarget as HTMLElement).style.color = "#1D1D1F"; }}
              >
                Club Admin Portal →
              </Link>
            </div>

            {/* METRICS */}
            <div className="grid grid-cols-3 gap-4 pt-6" style={{ borderTop: "1px solid #D9DEE5" }}>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#0140A7" }}>15,000+</p>
                <p className="text-xs font-semibold" style={{ color: "#8B9098" }}>Verified Athletes</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#E6A500" }}>100%</p>
                <p className="text-xs font-semibold" style={{ color: "#8B9098" }}>Fayda ID Sync</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#0140A7" }}>48 Clubs</p>
                <p className="text-xs font-semibold" style={{ color: "#8B9098" }}>National League</p>
              </div>
            </div>
          </div>

          {/* HERO IMAGERY */}
          <div className="lg:col-span-6 space-y-4">
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl group h-80 sm:h-96"
              style={{ border: "1px solid #D9DEE5" }}
            >
              <Image
                src="/ethiopian_athlete_hero.png"
                alt="Ethiopian Track Athletes in Action"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white" style={{ background: "linear-gradient(to top, rgba(1,64,167,0.85), rgba(1,64,167,0.2), transparent)" }}>
                <div
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-mono font-bold backdrop-blur-md w-fit mb-2"
                  style={{ backgroundColor: "rgba(230,165,0,0.25)", border: "1px solid rgba(230,165,0,0.5)", color: "#FFF3CC" }}
                >
                  ✓ FAYDA BIOMETRIC VERIFIED
                </div>
                <h3 className="text-xl font-extrabold tracking-tight">National Track &amp; Field Championships</h3>
                <p className="text-xs mt-1" style={{ color: "#DCEBF6" }}>
                  Addis Ababa National Stadium • Real-Time FinishLynx Timing &amp; World Athletics Seeding
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden shadow-lg h-36 group" style={{ border: "1px solid #D9DEE5" }}>
                <Image
                  src="/ethiopian_marathon_runner.png"
                  alt="Ethiopian Marathon Victory"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 p-4 flex flex-col justify-end text-white" style={{ background: "linear-gradient(to top, rgba(10,72,112,0.9), rgba(10,72,112,0.3), transparent)" }}>
                  <p className="text-xs font-bold">Marathon League Trials</p>
                  <p className="text-[10px] font-mono" style={{ color: "#DCEBF6" }}>Verified FAN Roster</p>
                </div>
              </div>

              <div
                className="rounded-2xl p-5 flex flex-col justify-between"
                style={{ backgroundColor: "#DCEBF6", border: "1px solid rgba(1,64,167,0.2)" }}
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider" style={{ color: "#0140A7" }}>
                    National ID Mandate
                  </span>
                  <p className="text-sm font-extrabold" style={{ color: "#0A4870" }}>Proclamation No. 1284/2023</p>
                  <p className="text-xs leading-snug" style={{ color: "#555B63" }}>
                    All league roster entries require 16-digit Fayda FAN ID validation.
                  </p>
                </div>
                <Link href="/policy" className="text-xs font-bold hover:underline mt-2" style={{ color: "#0140A7" }}>
                  Read Compliance Policy →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── PLATFORM FEATURES ── */}
        <section className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#1D1D1F" }}>
              Core Platform Capabilities
            </h2>
            <p className="text-xs sm:text-sm" style={{ color: "#8B9098" }}>
              Designed for speed, transparency, and full compliance with national identity regulations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                emoji: "🆔",
                title: "Fayda National ID Verification",
                desc: "Seamless self-service athlete onboarding. Athletes use their 16-digit FAN ID with SMS OTP authentication to eliminate age cheating and manual paperwork.",
                accent: "#0140A7",
                accentBg: "#DCEBF6",
              },
              {
                emoji: "🏃",
                title: "Live Competition & Seeding",
                desc: "Automated heat lane assignments, FinishLynx photo-finish integration, and real-time event status tracking for live national championships.",
                accent: "#E6A500",
                accentBg: "#FFF3CC",
              },
              {
                emoji: "🏛️",
                title: "Secure Club & Federation Portals",
                desc: "Dedicated, isolated authentication portals for Club Officers and Federation Executives, featuring in-house athlete registration and roster audits.",
                accent: "#0A4870",
                accentBg: "#DCEBF6",
              },
            ].map((feat) => (
              <div
                key={feat.title}
                className="rounded-3xl p-7 space-y-3 shadow-sm"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #D9DEE5" }}
              >
                <div
                  className="h-12 w-12 rounded-2xl flex items-center justify-center font-bold text-xl"
                  style={{ backgroundColor: feat.accentBg }}
                >
                  {feat.emoji}
                </div>
                <h3 className="text-base font-bold" style={{ color: "#1D1D1F" }}>{feat.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#555B63" }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PORTAL ACCESS CARDS ── */}
        <section className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* CLUB ADMIN CARD */}
          <div
            className="rounded-3xl p-8 shadow-xl space-y-6 flex flex-col justify-between"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #D9DEE5" }}
          >
            <div className="space-y-4">
              <div
                className="h-12 w-12 rounded-2xl flex items-center justify-center font-bold text-xl"
                style={{ backgroundColor: "#FFF3CC" }}
              >
                🏢
              </div>
              <div>
                <h3 className="text-xl font-bold" style={{ color: "#1D1D1F" }}>Club Admin Portal</h3>
                <p className="text-xs mt-1" style={{ color: "#8B9098" }}>
                  Access your club dashboard to register new athletes, manage rosters, approve pending applications, and view live meets.
                </p>
              </div>
            </div>
            <Link
              href="/club-admin/login"
              className="w-full flex items-center justify-center gap-2 rounded-2xl p-4 text-xs font-extrabold text-white shadow-lg transition-all"
              style={{ backgroundColor: "#E6A500" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "#C98F00")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "#E6A500")}
            >
              Sign In to Club Portal →
            </Link>
          </div>

          {/* FEDERATION PORTAL CARD */}
          <div
            className="rounded-3xl p-8 shadow-xl space-y-6 flex flex-col justify-between"
            style={{ backgroundColor: "#0140A7" }}
          >
            <div className="space-y-4">
              <div
                className="h-12 w-12 rounded-2xl flex items-center justify-center font-bold text-xl"
                style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                🏛️
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Federation Admin Portal</h3>
                <p className="text-xs mt-1" style={{ color: "#DCEBF6" }}>
                  Dedicated executive portal for national federation officials to manage club audits, age verification queues, and rule compliance.
                </p>
              </div>
            </div>
            <Link
              href="/federation/login"
              className="w-full flex items-center justify-center gap-2 rounded-2xl p-4 text-xs font-extrabold shadow-lg transition-all"
              style={{ backgroundColor: "#FFFFFF", color: "#0140A7" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#DCEBF6"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#FFFFFF"; }}
            >
              Go to Federation Executive Portal →
            </Link>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer
        className="py-8 px-4 text-center text-xs space-y-1"
        style={{ borderTop: "1px solid #D9DEE5", backgroundColor: "#FFFFFF", color: "#8B9098" }}
      >
        <p>© 2026 Ethiopian Athletics Federation. All rights reserved.</p>
        <p className="font-mono text-[10px]">Powered by EACRMS · Integrated with Fayda Digital National ID</p>
      </footer>
    </div>
  );
}
