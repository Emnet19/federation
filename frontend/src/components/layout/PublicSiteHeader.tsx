"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Events", href: "/events", icon: "events" },
  { label: "Policy & Regulations", href: "/policy", icon: "policy" },
];

function NavIcon({ icon, className }: { icon: string; className: string }) {
  const paths: Record<string, React.ReactNode> = {
    home: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10" />
    ),
    events: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    ),
    policy: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    ),
  };
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {paths[icon]}
    </svg>
  );
}

export default function PublicSiteHeader() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 dark:border-zinc-800/80 dark:bg-zinc-900/80 backdrop-blur-xl px-4 sm:px-8 py-3.5 transition-colors duration-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
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
        <div className="flex flex-wrap items-center justify-end gap-2.5">
          <ThemeToggle />
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all border",
                isActive(item.href)
                  ? "border-blue-600 bg-blue-50 text-blue-600 dark:border-blue-400 dark:bg-blue-950/40 dark:text-blue-400"
                  : "border-slate-200 bg-white text-slate-600 hover:border-blue-600 hover:text-blue-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-blue-400 dark:hover:text-blue-400"
              )}
            >
              <NavIcon icon={item.icon} className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              {item.label}
            </Link>
          ))}

          <Link
            href="/sign-in"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-extrabold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
}
