"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/common/ThemeToggle";

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
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white px-4 py-12 overflow-hidden">
      {/* Emerald Background Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[180px]" />
        <div className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[180px]" />
      </div>

      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      <div className="relative z-10 w-full max-w-md space-y-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-white p-2 shadow-2xl shadow-emerald-500/20 border border-slate-800">
            <Image src="/logo.png" alt="EAF Logo" fill className="object-contain p-1" priority />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-mono font-bold text-emerald-400 border border-emerald-500/20 mb-2">
              🔒 SECURE CLUB PORTAL AUTHENTICATION
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Club Admin Sign In
            </h1>
            <p className="mt-1 text-xs text-slate-400 font-medium">
              Authorized Athletics Club Officer Authentication Portal
            </p>
          </div>
        </div>

        {/* Secure Login Card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 backdrop-blur-xl p-8 shadow-2xl space-y-6">
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1.5">Registered Club Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="haile@arada-club.et"
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 pr-11 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  👁
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-red-400 font-semibold text-center">
                {error}
              </div>
            )}

            {/* Vibrant Emerald Button matching user provided screenshot */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 p-4 text-sm font-extrabold text-white shadow-lg shadow-emerald-500/25 transition-all disabled:opacity-50"
            >
              {isLoading ? "Authenticating..." : "Sign In to Club Portal"}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-[11px] font-mono text-slate-400 space-y-1">
            <p className="font-bold text-emerald-400">Demo Club Admin Credentials:</p>
            <div>Arada AC: <code className="text-white">haile@arada-club.et</code> / <code>Club@2026</code></div>
            <div>Defence AC: <code className="text-white">defence@eaf-club.et</code> / <code>Club@2026</code></div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="text-xs text-slate-400 hover:text-white transition-colors">
            ← Return to Main Home Page
          </Link>
        </div>
      </div>
    </div>
  );
}
