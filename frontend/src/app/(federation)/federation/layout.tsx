"use client";

// Prevent static prerendering — federation pages depend on client-side auth/localStorage
export const dynamic = "force-dynamic";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AuthGuard } from "@/components/common/AuthGuard";
import { ThemeToggle } from "@/components/common/ThemeToggle";

export default function FederationLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLoginPage = pathname === "/federation/login";

  const allNavItems = [
    {
      name: "Dashboard",
      href: "/federation",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
        </svg>
      ),
    },
    {
      name: "Verification",
      href: "/federation/verification",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      name: "Club & Roster Hub",
      href: "/federation/clubs",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      name: "Member Registration",
      href: "/federation/clubs/members",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
    },
    {
      name: "Events Setup",
      href: "/federation/events",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: "Policy & Licensing",
      href: "/federation/policy",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      name: "Results Portal",
      href: "/federation/results",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ];

  const navItems = user?.role === "Club Admin"
    ? allNavItems.filter((item) => item.href === "/federation" || item.href === "/federation/clubs" || item.href === "/federation/clubs/members")
    : allNavItems;

  const handleLogout = () => {
    logout();
    router.push("/federation/login");
  };

  const initials = user?.name ? user.name.split(" ").map((n) => n[0]).join("") : "A";
  const activeLabel = navItems.find((item) => item.href === pathname)?.name ?? "Dashboard";

  if (isLoginPage) {
    return <AuthGuard>{children}</AuthGuard>;
  }

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-slate-50 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-200">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/50 backdrop-blur-md md:flex md:flex-col">
          {/* Sidebar Logo Header */}
          <div className="flex h-16 items-center gap-3 border-b border-slate-200 dark:border-zinc-800/80 px-6">
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-slate-100 border border-slate-200 dark:bg-zinc-900 dark:border-zinc-800 p-0.5">
              <Image src="/logo.png" alt="EAF Logo" fill className="object-contain" />
            </div>
            <div className="min-w-0">
              <span className="block text-sm font-bold tracking-wide text-slate-900 dark:text-white truncate">EACRMS Admin</span>
              <span className="block text-[10px] text-slate-500 dark:text-zinc-500 font-medium">EAF Official Portal</span>
            </div>
          </div>

          <nav className="flex-1 space-y-1.5 px-4 py-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.98] border ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200 border-transparent"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-slate-200 dark:border-zinc-800/80 p-4 bg-slate-50/50 dark:bg-zinc-900/30">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-bold border border-emerald-500/20">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-xs font-bold text-slate-800 dark:text-zinc-200">{user?.name}</p>
                <p className="truncate text-[10px] text-slate-500 dark:text-zinc-500 font-mono">{user?.role}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 dark:border-zinc-800 bg-transparent py-2 text-xs font-bold text-slate-600 dark:text-zinc-400 transition-all hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-600 dark:hover:text-red-400"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Panel */}
        <div className="flex flex-1 flex-col min-w-0">
          {/* Header */}
          <header className="flex h-16 items-center justify-between border-b border-slate-200 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/20 px-6 backdrop-blur-md">
            <div className="flex items-center gap-4 md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  }
                </svg>
              </button>
              <div className="flex items-center gap-2">
                <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
                  <Image src="/logo.png" alt="EAF Logo" fill className="object-contain" />
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white tracking-wide">EACRMS</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-zinc-500">
              <span className="text-slate-700 dark:text-zinc-400 font-semibold uppercase tracking-wider text-[10px]">Admin</span>
              <span>/</span>
              <span className="text-slate-900 dark:text-zinc-300 font-semibold">{activeLabel}</span>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 px-3 py-1 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] font-bold text-slate-600 dark:text-zinc-400 uppercase tracking-wider font-mono">Fayda Secured</span>
              </div>
              <div className="h-8 w-px bg-slate-200 dark:bg-zinc-800 hidden sm:block"></div>
              <span className="hidden sm:inline text-xs text-slate-600 dark:text-zinc-400">
                Welcome, <span className="font-semibold text-slate-900 dark:text-zinc-200">{user?.name}</span>
              </span>
            </div>
          </header>

          {/* Mobile Nav Drawer */}
          {mobileMenuOpen && (
            <div className="md:hidden border-b border-slate-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/90 backdrop-blur-lg px-4 py-4 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                      isActive ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20" : "text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800/40"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                );
              })}
              <div className="border-t border-slate-200 dark:border-zinc-800 mt-4 pt-4 flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">{initials}</div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-zinc-200">{user?.name}</p>
                    <p className="text-[10px] text-slate-500 dark:text-zinc-500 font-mono">{user?.role}</p>
                  </div>
                </div>
                <button onClick={handleLogout} className="rounded-lg border border-slate-200 dark:border-zinc-800 px-3 py-1.5 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-500/10">Sign Out</button>
              </div>
            </div>
          )}

          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
