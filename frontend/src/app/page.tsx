import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-12 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-200 overflow-hidden">
      {/* Top Bar for Theme Switcher */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
        <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400 font-mono">Theme:</span>
        <ThemeToggle />
      </div>

      {/* Decorative background gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-500/10 blur-[140px]" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-yellow-500/10 blur-[140px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl space-y-10 text-center">
        {/* EAF Official Logo & Header */}
        <div className="space-y-4 flex flex-col items-center">
          <div className="relative h-28 w-28 overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-2 shadow-xl shadow-emerald-500/10">
            <Image
              src="/logo.png"
              alt="Ethiopian Athletics Federation Logo"
              fill
              sizes="112px"
              className="object-contain p-1"
              priority
            />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              EACRMS Portal Hub
            </h1>
            <p className="mt-2 text-base font-medium text-slate-600 dark:text-zinc-400">
              Ethiopian Athletics Competition and Roster Management System
            </p>
            <p className="mt-1 text-xs font-mono text-slate-500 dark:text-zinc-500">
              Ethiopian Athletic Federation (EAF) · v1.1.0 · Proclamation No. 1284/2023 Compliant
            </p>
          </div>
        </div>

        {/* 3 Portal Entry Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Card 1: Athlete Portal */}
          <Link href="/athlete/register" className="group flex">
            <Card className="flex flex-col w-full text-left transition-all hover:border-yellow-500 hover:shadow-xl dark:hover:border-yellow-500/50 dark:hover:bg-zinc-900/10 backdrop-blur-md">
              <CardHeader className="pb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 mb-2">
                  <svg className="h-6 w-6 text-yellow-500 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <CardTitle className="text-xl font-extrabold text-slate-900 dark:text-white">Athlete Portal</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 pb-4">
                <CardDescription className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                  Register with your Fayda National ID, view personal records, manage race entries, and access digital achievement badges and split times.
                </CardDescription>
                <div className="mt-5 flex flex-wrap gap-1.5 text-[10px] font-mono">
                  <span className="rounded bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 text-slate-700 dark:text-zinc-400">Fayda ID Login</span>
                  <span className="rounded bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 text-slate-700 dark:text-zinc-400">GPS Check-In</span>
                </div>
              </CardContent>
              <CardFooter className="pt-2 border-t-0 bg-transparent">
                <span className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-500 px-4 py-2.5 text-xs font-bold text-slate-950 transition-all group-hover:bg-yellow-400">
                  Enter Athlete Portal
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </CardFooter>
            </Card>
          </Link>

          {/* Card 2: Club Admin Member Registration Standalone Screen */}
          <Link href="/club-admin/register" className="group flex">
            <Card className="flex flex-col w-full text-left transition-all hover:border-blue-500 hover:shadow-xl dark:hover:border-blue-500/40 dark:hover:bg-zinc-900/10 backdrop-blur-md">
              <CardHeader className="pb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 mb-2">
                  <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <CardTitle className="text-xl font-extrabold text-slate-900 dark:text-white">Club Registry</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 pb-4">
                <CardDescription className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                  Self-service club licensing, regional sports association registration, roster management, and Fayda manager audits.
                </CardDescription>
                <div className="mt-5 flex flex-wrap gap-1.5 text-[10px] font-mono">
                  <span className="rounded bg-blue-500/10 text-blue-700 dark:text-blue-300 px-2 py-0.5">Club Licensing</span>
                  <span className="rounded bg-blue-500/10 text-blue-700 dark:text-blue-300 px-2 py-0.5">Roster Audits</span>
                </div>
              </CardContent>
              <CardFooter className="pt-2 border-t-0 bg-transparent">
                <span className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition-all group-hover:bg-blue-500">
                  Register & Manage Club
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </CardFooter>
            </Card>
          </Link>

          {/* Card 3: Federation Admin Portal */}
          <Link href="/federation/login" className="group flex">
            <Card className="flex flex-col w-full text-left transition-all hover:border-emerald-500 hover:shadow-xl dark:hover:border-emerald-500/40 dark:hover:bg-zinc-900/10 backdrop-blur-md">
              <CardHeader className="pb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 mb-2">
                  <svg className="h-6 w-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <CardTitle className="text-xl font-extrabold text-slate-900 dark:text-white">Federation Admin</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 pb-4">
                <CardDescription className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                  Access the EAF administrative control centre to manage Fayda verification queues, events, club policy, and results.
                </CardDescription>
                <div className="mt-5 flex flex-wrap gap-1.5 text-[10px] font-mono">
                  <span className="rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 px-2 py-0.5">Role Protected</span>
                  <span className="rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 px-2 py-0.5">AES-256</span>
                </div>
              </CardContent>
              <CardFooter className="pt-2 border-t-0 bg-transparent">
                <span className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white transition-all group-hover:bg-emerald-500">
                  Enter Admin Portal
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </CardFooter>
            </Card>
          </Link>
        </div>

        {/* Footer status row */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] font-mono text-slate-500 dark:text-zinc-600">
          <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Fayda API Online</span>
          <span>·</span>
          <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> FinishLynx Connected</span>
          <span>·</span>
          <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Telebirr Gateway Secured</span>
          <span>·</span>
          <span>TLS 1.3 · AES-256</span>
        </div>
      </div>
    </div>
  );
}
