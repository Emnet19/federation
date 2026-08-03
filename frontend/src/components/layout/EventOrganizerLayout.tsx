"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEventOrganizer } from "@/context/EventOrganizerContext";
import { cn } from "@/lib/utils";

const allNavItems = [
  {
    name: "Dashboard",
    href: "/events/dashboard",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
      </svg>
    ),
  },
  {
    name: "Create Event",
    href: "/events/create",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    name: "Event Schedule",
    href: "/events/schedule",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: "Live Results",
    href: "/events/live-results",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    name: "Final Results",
    href: "/events/results",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    name: "Event Timeline",
    href: "/events/timeline",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function EventOrganizerLayout({ children }: { children: React.ReactNode }) {
  const { organizer, logout, isLoading } = useEventOrganizer();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLoginPage = pathname === "/events/login";

  useEffect(() => {
    if (!isLoading && !organizer && !isLoginPage) {
      router.replace("/events/login");
    }
  }, [isLoading, organizer, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0140A7] border-t-transparent dark:border-blue-500" />
          <p className="font-mono text-xs font-semibold tracking-wide text-slate-500 dark:text-zinc-400">
            Loading organizer portal...
          </p>
        </div>
      </div>
    );
  }

  if (!organizer) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/events/login");
  };

  const initials = organizer.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  const activeLabel = allNavItems.find((item) => item.href === pathname)?.name ?? "Dashboard";

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-zinc-950 dark:text-zinc-100">
      {/* ── SIDEBAR ── */}
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white md:flex md:flex-col dark:border-zinc-800 dark:bg-zinc-900">
        {/* Logo Header */}
        <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-6 dark:border-zinc-800">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100 p-0.5 dark:border-zinc-700 dark:bg-zinc-800">
            <Image src="/logo.png" alt="EAF Logo" fill className="object-contain" />
          </div>
          <div className="min-w-0">
            <span className="block truncate text-sm font-bold tracking-wide text-slate-900 dark:text-white">
              Event Organizer
            </span>
            <span className="block text-[10px] font-medium text-slate-400 dark:text-zinc-500">
              EAF Competition Portal
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-3 py-5">
          {allNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3.5 rounded-xl border border-transparent px-3 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-[0.98]",
                  isActive
                    ? "border-[#0140A7]/15 bg-[#DCEBF6] text-[#0140A7] dark:border-blue-500/30 dark:bg-[#0A4870]/50 dark:text-blue-300"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Footer */}
        <div className="border-t border-slate-200 bg-slate-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/40">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0140A7] text-sm font-bold text-white dark:bg-blue-600">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-slate-900 dark:text-white">
                {organizer.name}
              </p>
              <p className="truncate font-mono text-[10px] text-slate-400 dark:text-zinc-500">
                {organizer.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-200 py-2 text-xs font-bold text-slate-600 transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-600 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-red-700 dark:hover:bg-red-950/40 dark:hover:text-red-400"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* ── MAIN PANEL ── */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-6 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/90">
          {/* Mobile: hamburger + logo */}
          <div className="flex items-center gap-4 md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600 dark:text-zinc-300" aria-label="Toggle navigation menu">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded border border-slate-200 dark:border-zinc-700">
                <Image src="/logo.png" alt="EAF Logo" fill className="object-contain" />
              </div>
              <span className="text-xs font-bold tracking-wide text-slate-900 dark:text-white">
                Event Organizer
              </span>
            </div>
          </div>

          {/* Desktop breadcrumb */}
          <div className="hidden items-center gap-2 text-xs font-medium md:flex">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              Organizer
            </span>
            <span className="text-slate-300 dark:text-zinc-700">/</span>
            <span className="font-semibold text-slate-900 dark:text-white">{activeLabel}</span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm transition-all hover:bg-[#DCEBF6] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-[#0A4870]/50"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Portal Hub</span>
            </Link>

            <div className="hidden h-8 w-px bg-slate-200 sm:block dark:bg-zinc-700" />
            <span className="hidden text-xs text-slate-500 sm:inline dark:text-zinc-400">
              Welcome,{" "}
              <span className="font-semibold text-slate-900 dark:text-white">{organizer.name}</span>
            </span>
          </div>
        </header>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div
            className="space-y-1 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur-md md:hidden dark:border-zinc-800 dark:bg-zinc-900/95"
          >
            {allNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3.5 rounded-xl border border-transparent px-4 py-3 text-sm font-semibold transition-all",
                    isActive
                      ? "border-[#0140A7]/15 bg-[#DCEBF6] text-[#0140A7] dark:border-blue-500/30 dark:bg-[#0A4870]/50 dark:text-blue-300"
                      : "text-slate-600 dark:text-zinc-300"
                  )}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
            <div className="mt-4 flex items-center justify-between border-t border-slate-200 px-4 pt-4 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0140A7] text-xs font-bold text-white dark:bg-blue-600">
                  {initials}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{organizer.name}</p>
                  <p className="font-mono text-[10px] text-slate-400 dark:text-zinc-500">{organizer.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="cursor-pointer rounded-lg border border-red-300 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 dark:border-red-700 dark:bg-red-950/40 dark:text-red-400"
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
