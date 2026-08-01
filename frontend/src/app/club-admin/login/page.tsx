"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { colors } from "@/constants/colors";

export default function ClubAdminLoginPage() {
  const { loginWithCredentials } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("haile@arada-club.et");
  const [password, setPassword] = useState("Club@2026");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) { setError("Email address is required."); return; }
    if (!password.trim()) { setError("Password is required."); return; }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    const result = loginWithCredentials(email, password);
    setIsLoading(false);

    if (result.success) {
      router.push("/club-admin");
    } else {
      setError(result.error || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-12 transition-colors duration-200 overflow-hidden">
      {/* Brand Background Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full blur-[180px]" style={{ backgroundColor: colors.primaryAlpha07 }} />
        <div className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full blur-[180px]" style={{ backgroundColor: colors.secondaryAlpha07 }} />
      </div>

      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      <div className="relative z-10 w-full max-w-md space-y-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-white p-2 shadow-xl border border-slate-200 dark:border-slate-800">
            <Image src="/logo.png" alt="EAF Logo" fill className="object-contain p-1" priority />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-mono font-bold border mb-2" style={{ backgroundColor: colors.brand.primaryLight, color: colors.brand.primary, borderColor: colors.primaryAlpha20 }}>
              🔒 CLUB ADMIN PORTAL
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Club Sign In
            </h1>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 font-medium">
              Ethiopian Athletics Federation • Club Management Portal
            </p>
          </div>
        </div>

        {/* Secure Login Card */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-8 shadow-2xl space-y-6 transition-colors">
          
          {/* Explicit Notice: Only Club Admins Allowed */}
          <div className="rounded-2xl p-4 border text-xs leading-relaxed space-y-1 bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-200">
            <div className="flex items-center gap-2 font-bold text-amber-700 dark:text-amber-400">
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>RESTRICTED ACCESS NOTICE</span>
            </div>
            <p>
              Only authorized <strong>Club Administrators</strong> and certified club officials are allowed to access this portal. Athletes must use the Athlete Portal.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">Registered Club Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="haile@arada-club.et"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 pr-11 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  👁
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-red-600 dark:text-red-400 font-semibold text-center">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-2xl p-4 text-sm font-extrabold text-white shadow-lg transition-all disabled:opacity-50"
              style={{ backgroundColor: colors.brand.primary }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = colors.brand.primaryDark)}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = colors.brand.primary)}
            >
              {isLoading ? "Authenticating..." : "Sign In to Club Portal"}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-3 text-[11px] font-mono text-slate-600 dark:text-slate-400 space-y-1">
            <p className="font-bold" style={{ color: colors.brand.primary }}>Demo Club Admin Credentials:</p>
            <div>Arada AC: <code className="text-slate-900 dark:text-white">haile@arada-club.et</code> / <code>Club@2026</code></div>
            <div>Defence AC: <code className="text-slate-900 dark:text-white">defence@eaf-club.et</code> / <code>Club@2026</code></div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            ← Return to Main Home Page
          </Link>
        </div>
      </div>
    </div>
  );
}
