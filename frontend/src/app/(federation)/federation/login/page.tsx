"use client";

import React from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/common/ThemeToggle";

export default function LoginPage() {
  const { login, user } = useAuth();
  const router = useRouter();

  const handleQuickLogin = (role: "Federation Admin" | "Athlete" | "Club Admin") => {
    login(role);
    if (role === "Federation Admin") {
      router.push("/federation");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-200 sm:px-6 lg:px-8">
      {/* Top Bar for Theme Switcher */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
        <ThemeToggle />
      </div>

      {/* Decorative background gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-[120px]"></div>
        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-yellow-500/10 blur-[120px]"></div>
      </div>

      <div className="w-full max-w-lg space-y-8 relative z-10">
        <div className="text-center">
          <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-1.5 shadow-xl shadow-emerald-500/10">
            <Image
              src="/logo.png"
              alt="EAF Logo"
              fill
              className="object-contain p-1"
              priority
            />
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            EACRMS Portal Login
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
            Ethiopian Athletics Competition and Roster Management System
          </p>
          <div className="mt-1 flex justify-center gap-1.5 text-xs text-slate-500 dark:text-zinc-500 font-mono">
            <span>EAF Proclamation Compliant</span>
            <span>•</span>
            <span>Fayda Integrated</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900/40 backdrop-blur-xl shadow-xl">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-zinc-200 text-center mb-6">
            Select a Role to Authenticate
          </h3>

          <div className="space-y-4">
            {/* Admin Option */}
            <button
              onClick={() => handleQuickLogin("Federation Admin")}
              className="group flex w-full items-start justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-left transition-all hover:border-emerald-500 hover:bg-emerald-500/10 active:scale-[0.99]"
            >
              <div className="space-y-1">
                <p className="font-semibold text-emerald-700 dark:text-emerald-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-300">
                  Federation Admin
                </p>
                <p className="text-xs text-slate-600 dark:text-zinc-400">
                  Full admin privileges, verify IDs, seed events, sign off results.
                </p>
                <p className="text-[10px] text-slate-500 dark:text-zinc-500 font-mono">User: Abebe Bikila (admin@eaf.gov.et)</p>
              </div>
              <span className="rounded bg-emerald-500/10 px-2 py-1 text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                Authorized
              </span>
            </button>

            {/* Club Admin Option */}
            <button
              onClick={() => handleQuickLogin("Club Admin")}
              className="group flex w-full items-start justify-between rounded-xl border border-slate-200 bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900/40 p-4 text-left transition-all hover:border-slate-300 dark:hover:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800/40 active:scale-[0.99]"
            >
              <div className="space-y-1">
                <p className="font-semibold text-slate-900 dark:text-zinc-200">
                  Club / School Admin
                </p>
                <p className="text-xs text-slate-600 dark:text-zinc-400">
                  Manage rosters, submit documents, audit transfer deadlines.
                </p>
                <p className="text-[10px] text-slate-500 dark:text-zinc-500 font-mono">User: Haile Gebrselassie (haile@arada-club.et)</p>
              </div>
              <span className="rounded bg-slate-200 dark:bg-zinc-800 px-2 py-1 text-xs text-slate-700 dark:text-zinc-400 font-medium">
                Restricted
              </span>
            </button>

            {/* Athlete Option */}
            <button
              onClick={() => handleQuickLogin("Athlete")}
              className="group flex w-full items-start justify-between rounded-xl border border-slate-200 bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900/40 p-4 text-left transition-all hover:border-slate-300 dark:hover:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800/40 active:scale-[0.99]"
            >
              <div className="space-y-1">
                <p className="font-semibold text-slate-900 dark:text-zinc-200">
                  Athlete / Parent
                </p>
                <p className="text-xs text-slate-600 dark:text-zinc-400">
                  Register with Fayda ID, view achievements, geofenced mobile check-in.
                </p>
                <p className="text-[10px] text-slate-500 dark:text-zinc-500 font-mono">User: Derartu Tulu (derartu@eaf-athlete.et)</p>
              </div>
              <span className="rounded bg-slate-200 dark:bg-zinc-800 px-2 py-1 text-xs text-slate-700 dark:text-zinc-400 font-medium">
                Restricted
              </span>
            </button>
          </div>

          {user && (
            <div className="mt-6 border-t border-slate-200 dark:border-zinc-800 pt-6 text-center">
              <p className="text-xs text-slate-600 dark:text-zinc-400">
                Currently logged in as:{" "}
                <span className="text-slate-900 dark:text-zinc-200 font-semibold">{user.name}</span> ({user.role})
              </p>
              <button
                onClick={() => {
                  if (user.role === "Federation Admin") {
                    router.push("/federation");
                  }
                }}
                className="mt-3 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline transition-colors"
              >
                {user.role === "Federation Admin" ? "Go to Admin Shell →" : "View Restricted Access Blocked Alert"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
