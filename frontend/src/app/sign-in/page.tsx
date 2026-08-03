"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { colors } from "@/constants/colors";

const ROLE_OPTIONS = [
  {
    value: "club",
    label: "Club",
    description: "Club administrators & officials",
    detail: "Manage your club roster, members and club-level operations.",
    href: "/club-admin/login",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    ),
    accent: colors.brand.primary,
    accentLight: colors.brand.primaryLight,
  },
  {
    value: "organizer",
    label: "Event Organizer",
    description: "Competition staff & organizers",
    detail: "Plan events, publish schedules and manage live competition results.",
    href: "/events/login",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    ),
    accent: colors.brand.secondaryDark,
    accentLight: colors.brand.secondaryLight,
  },
];

export default function RoleSelectionPage() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-50 px-4 py-12 text-slate-900 transition-colors duration-200 dark:bg-zinc-950 dark:text-zinc-100">
      {/* Brand Background Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full blur-[180px]" style={{ backgroundColor: colors.primaryAlpha07 }} />
        <div className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full blur-[180px]" style={{ backgroundColor: colors.secondaryAlpha07 }} />
      </div>

      <div className="absolute right-6 top-6 z-20">
        <ThemeToggle />
      </div>

      <div className="relative z-10 w-full max-w-lg space-y-6">
        {/* Header */}
        <div className="flex flex-col items-center space-y-3 text-center">
          <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
            <Image src="/logo.png" alt="EAF Logo" fill className="object-contain p-1" priority />
          </div>
          <div>
            <div
              className="mb-2 inline-flex items-center gap-2 rounded-full border px-3.5 py-1 font-mono text-xs font-bold"
              style={{ backgroundColor: colors.brand.primaryLight, color: colors.brand.primary, borderColor: colors.primaryAlpha20 }}
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              SECURE PORTAL ACCESS
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Sign In
            </h1>
            <p className="mt-1 text-xs font-medium text-slate-500 dark:text-zinc-400">
              Choose how you want to sign in to the Ethiopian Athletics Federation portal.
            </p>
          </div>
        </div>

        {/* Role Selection */}
        <div className="space-y-3">
          {ROLE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => router.push(option.href)}
              className="group flex w-full cursor-pointer items-center gap-4 rounded-3xl border border-slate-200 bg-white/90 p-5 text-left shadow-sm backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.99] dark:border-zinc-800 dark:bg-zinc-900/90"
              style={{ borderColor: "transparent" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = option.accent;
                e.currentTarget.style.boxShadow = `0 0 0 3px ${option.accent}22`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-200 group-hover:scale-105"
                style={{ backgroundColor: option.accentLight, color: option.accent }}
              >
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {option.icon}
                </svg>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-base font-extrabold text-slate-900 dark:text-white">
                  {option.label}
                </span>
                <span className="block text-xs font-semibold" style={{ color: option.accent }}>
                  {option.description}
                </span>
                <span className="mt-1 block text-xs font-medium text-slate-500 dark:text-zinc-400">
                  {option.detail}
                </span>
              </span>
              <svg className="h-5 w-5 shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-slate-500 dark:text-zinc-600 dark:group-hover:text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>

        {/* Demo hint */}
        <div
          className="rounded-2xl border p-4 text-[11px] font-mono leading-relaxed"
          style={{ borderColor: colors.border.default, backgroundColor: colors.background.surfaceVariant, color: colors.text.tertiary }}
        >
          <p className="font-bold" style={{ color: colors.text.secondary }}>
            Demo Portals:
          </p>
          <p>
            <span className="font-bold" style={{ color: colors.brand.primary }}>Club</span> · haile@arada-club.et / Club@2026
          </p>
          <p>
            <span className="font-bold" style={{ color: colors.brand.secondaryDark }}>Event Organizer</span> · organizer@eacrms.com / organizer123
          </p>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-colors hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Return to Main Home Page
          </Link>
        </div>
      </div>
    </div>
  );
}
