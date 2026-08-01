"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Treat both the root login form and old /federation/login as login pages
  const isLoginPage = pathname === "/" || pathname === "/federation/login";

  useEffect(() => {
    if (!isLoading && !user && !isLoginPage) {
      router.replace("/");
    }
  }, [user, isLoading, isLoginPage, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
          <p className="text-xs font-semibold tracking-wide text-slate-500 dark:text-zinc-400 font-mono">Loading portal...</p>
        </div>
      </div>
    );
  }

  // Allow login page access
  if (isLoginPage) {
    // Allow login pages unconditionally
    return <>{children}</>;
  }

  // Not logged in
  if (!user) {
    return null;
  }

  // Role Protection: Federation Admin has full access; Club Admin can access Club & Roster Management
  const isClubRoute = pathname.startsWith("/federation/clubs");
  const isAllowed =
    user.role === "Federation Admin" ||
    (user.role === "Club Admin" && (isClubRoute || pathname === "/federation"));

  if (!isAllowed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100">
        <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-white dark:bg-zinc-900/60 p-8 text-center backdrop-blur-xl shadow-2xl">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-500">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Access Denied</h2>
          <p className="mb-6 text-sm text-slate-600 dark:text-zinc-400">
            Your account (<span className="text-slate-900 dark:text-zinc-200 font-semibold">{user.name}</span>) is registered as{" "}
            <span className="rounded bg-red-500/10 px-1.5 py-0.5 text-red-600 dark:text-red-400 font-mono text-xs">{user.role}</span>.
            This area is restricted to authorized Administrators only.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => { logout(); router.push("/"); }}
              className="flex w-full items-center justify-center rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-red-500 active:scale-[0.98]"
            >
              Log Out & Sign In Again
            </button>
            <button
              onClick={() => router.push("/")}
              className="flex w-full items-center justify-center rounded-xl border border-slate-200 dark:border-zinc-800 bg-transparent px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-zinc-400 transition-all hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-white"
            >
              Return to Portal Hub
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
