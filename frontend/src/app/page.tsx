"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { colors } from "@/constants/colors";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.bgPage, color: colors.textPrimary }}>
      {/* ── NAVIGATION BAR ── */}
      <header
        className="sticky top-0 z-40 px-4 sm:px-8 py-3.5 backdrop-blur-xl"
        style={{
          backgroundColor: "rgba(255,255,255,0.92)",
          borderBottom: `1px solid ${colors.borderDefault}`,
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="relative h-10 w-10 overflow-hidden rounded-xl p-1 shadow-sm transition-transform group-hover:scale-105"
              style={{ backgroundColor: colors.bgSurface, border: `1px solid ${colors.borderDefault}` }}
            >
              <Image src="/logo.png" alt="EAF Logo" fill className="object-contain" priority />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight block leading-none" style={{ color: colors.textPrimary }}>
                EACRMS
              </span>
              <span className="text-[10px] font-bold font-mono tracking-wider" style={{ color: colors.primary }}>
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
                border: `1px solid ${colors.borderDefault}`,
                backgroundColor: colors.bgSurface,
                color: colors.textSecondary,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = colors.primary; (e.currentTarget as HTMLElement).style.color = colors.primary; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = colors.borderDefault; (e.currentTarget as HTMLElement).style.color = colors.textSecondary; }}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: colors.primary }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Policy &amp; Regulations
            </Link>

            <Link
              href="/club-admin/login"
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-extrabold text-white shadow-md transition-all active:scale-95"
              style={{ backgroundColor: colors.primary }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = colors.primaryDark)}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = colors.primary)}
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
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full blur-[160px]" style={{ backgroundColor: colors.primaryAlpha07 }} />
        <div className="absolute top-1/2 -right-32 h-[500px] w-[500px] rounded-full blur-[160px]" style={{ backgroundColor: colors.accentAlpha07 }} />
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="relative z-10 flex-1 mx-auto max-w-7xl px-4 sm:px-8 py-12 space-y-20">

        {/* HERO SECTION */}
        <section className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold"
              style={{ backgroundColor: colors.primaryLight, color: colors.primary, border: `1px solid ${colors.primaryAlpha20}` }}
            >
              <span className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: colors.primary }} />
              Official Ethiopian Athletics Operations Center
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.15]" style={{ color: colors.textPrimary }}>
              Ethiopian Athletics Competition &amp; Roster Management System
            </h1>

            <p className="text-base leading-relaxed" style={{ color: colors.textSecondary }}>
              Empowering Ethiopian athletes and national league clubs with verified biometric digital ID onboarding via{" "}
              <strong style={{ color: colors.primary }}>Fayda National ID</strong>, World Athletics-compliant seeding engines,
              and live photo-finish timing.
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/athlete/register"
                className="flex items-center gap-2.5 rounded-2xl px-7 py-4 text-sm font-extrabold text-white shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: colors.accent }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = colors.accentDark)}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = colors.accent)}
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
                  border: `1px solid ${colors.borderDefault}`,
                  backgroundColor: colors.bgSurface,
                  color: colors.textPrimary,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = colors.primary; (e.currentTarget as HTMLElement).style.color = colors.primary; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = colors.borderDefault; (e.currentTarget as HTMLElement).style.color = colors.textPrimary; }}
              >
                Club Admin Sign In →
              </Link>
            </div>

            {/* METRICS */}
            <div className="grid grid-cols-3 gap-4 pt-6" style={{ borderTop: `1px solid ${colors.borderDefault}` }}>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold" style={{ color: colors.primary }}>15,000+</p>
                <p className="text-xs font-semibold" style={{ color: colors.textMuted }}>Verified Athletes</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold" style={{ color: colors.accent }}>100%</p>
                <p className="text-xs font-semibold" style={{ color: colors.textMuted }}>Fayda ID Sync</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold" style={{ color: colors.primary }}>48 Clubs</p>
                <p className="text-xs font-semibold" style={{ color: colors.textMuted }}>National League</p>
              </div>
            </div>
          </div>

          {/* HERO IMAGERY */}
          <div className="lg:col-span-6">
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl group h-96 sm:h-[440px]"
              style={{ border: `1px solid ${colors.borderDefault}` }}
            >
              <Image
                src="/ethiopian_athlete_hero.png"
                alt="Ethiopian Track Athletes in Action"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white" style={{ background: `linear-gradient(to top, rgba(1,64,167,0.85), rgba(1,64,167,0.2), transparent)` }}>
                <h3 className="text-2xl font-extrabold tracking-tight">National Track &amp; Field Championships</h3>
                <p className="text-sm mt-1" style={{ color: colors.primaryLight }}>
                  Addis Ababa National Stadium • Real-Time FinishLynx Timing &amp; World Athletics Seeding
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── PLATFORM FEATURES ── */}
        <section className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: colors.textPrimary }}>
              Core Platform Capabilities
            </h2>
            <p className="text-xs sm:text-sm" style={{ color: colors.textMuted }}>
              Designed for speed, transparency, and full compliance with national identity regulations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                emoji: "🆔",
                title: "Fayda National ID Verification",
                desc: "Seamless self-service athlete onboarding. Athletes use their 16-digit FAN ID to eliminate age cheating and manual paperwork.",
                accent: colors.primary,
                accentBg: colors.primaryLight,
              },
              {
                emoji: "🏃",
                title: "Live Competition & Seeding",
                desc: "Automated heat lane assignments, FinishLynx photo-finish integration, and real-time event status tracking for live national championships.",
                accent: colors.accent,
                accentBg: colors.accentLight,
              },
              {
                emoji: "🏛️",
                title: "Secure Club & Federation Portals",
                desc: "Dedicated, isolated authentication portals for Club Officers and Federation Executives, featuring in-house athlete registration and roster audits.",
                accent: colors.primaryDark,
                accentBg: colors.primaryLight,
              },
            ].map((feat) => (
              <div
                key={feat.title}
                className="rounded-3xl p-7 space-y-3 shadow-sm"
                style={{ backgroundColor: colors.bgSurface, border: `1px solid ${colors.borderDefault}` }}
              >
                <div
                  className="h-12 w-12 rounded-2xl flex items-center justify-center font-bold text-xl"
                  style={{ backgroundColor: feat.accentBg }}
                >
                  {feat.emoji}
                </div>
                <h3 className="text-base font-bold" style={{ color: colors.textPrimary }}>{feat.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: colors.textSecondary }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: colors.textPrimary }}>
              How Athlete Registration Works
            </h2>
            <p className="text-xs sm:text-sm" style={{ color: colors.textMuted }}>
              A simple, secure process powered by Fayda National ID.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 relative">
            {/* connector line */}
            <div className="hidden sm:block absolute top-10 left-[17%] right-[17%] h-0.5" style={{ backgroundColor: colors.borderDefault }} />

            {[
              {
                step: "01",
                icon: "📝",
                title: "Create Account",
                desc: "Enter your email, set a secure password and confirm it. Your account lets you track your registration status anytime.",
                color: colors.primary,
                bg: colors.primaryLight,
              },
              {
                step: "02",
                icon: "🆔",
                title: "Verify Fayda FAN ID",
                desc: "Provide your 16-digit Fayda Access Number. The system instantly verifies your biometric identity from the national database.",
                color: colors.accent,
                bg: colors.accentLight,
              },
              {
                step: "03",
                icon: "✅",
                title: "Await Club Approval",
                desc: "Your application is sent to your chosen club for review. Log back in with your email and password to track status updates.",
                color: colors.primaryDark,
                bg: colors.primaryLight,
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center space-y-4 relative">
                <div
                  className="relative z-10 h-20 w-20 rounded-full flex items-center justify-center text-3xl shadow-lg"
                  style={{ backgroundColor: item.bg, border: `2px solid ${item.color}22` }}
                >
                  {item.icon}
                  <span
                    className="absolute -top-1 -right-1 h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-black text-white"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.step}
                  </span>
                </div>
                <h3 className="text-base font-bold" style={{ color: colors.textPrimary }}>{item.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: colors.textSecondary }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/athlete/register"
              className="inline-flex items-center gap-2.5 rounded-2xl px-8 py-4 text-sm font-extrabold text-white shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: colors.accent }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = colors.accentDark)}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = colors.accent)}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Start Your Athlete Registration
            </Link>
          </div>
        </section>

        {/* ── COMPLIANCE & STATS BANNER ── */}
        <section
          className="rounded-3xl p-10 relative overflow-hidden"
          style={{ backgroundColor: colors.primary }}
        >
          {/* background glow */}
          <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full blur-[100px]" style={{ backgroundColor: "rgba(230,165,0,0.15)" }} />
          <div className="relative z-10 grid sm:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase" style={{ color: colors.accentLight }}>
                Proclamation No. 1284/2023
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                Mandatory Fayda National ID for All League Participants
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: colors.primaryLight }}>
                The Ethiopian Athletics Federation mandates that all athletes competing in the national league must be verified through the Fayda Digital National Identity system to ensure age compliance and prevent fraud.
              </p>
              <Link href="/policy" className="inline-flex items-center gap-2 text-sm font-bold hover:underline" style={{ color: colors.accentLight }}>
                Read the Full Compliance Policy →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "16-Digit", label: "FAN ID Required", icon: "🆔" },
                { value: "Real-Time", label: "Biometric Sync", icon: "⚡" },
                { value: "0", label: "Manual Paperwork", icon: "📄" },
                { value: "100%", label: "Age Verified Rosters", icon: "✅" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl p-5 space-y-1"
                  style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
                >
                  <div className="text-xl">{stat.icon}</div>
                  <p className="text-xl font-extrabold text-white">{stat.value}</p>
                  <p className="text-[10px] font-semibold" style={{ color: colors.primaryLight }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer
        className="py-8 px-4 text-center text-xs space-y-1"
        style={{ borderTop: `1px solid ${colors.borderDefault}`, backgroundColor: colors.bgSurface, color: colors.textMuted }}
      >
        <p>© 2026 Ethiopian Athletics Federation. All rights reserved.</p>
        <p className="font-mono text-[10px]">Powered by EACRMS · Integrated with Fayda Digital National ID</p>
      </footer>
    </div>
  );
}
