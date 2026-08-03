"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEventOrganizer } from "@/context/EventOrganizerContext";

export default function EventOrganizerLoginPage() {
  const { login } = useEventOrganizer();
  const router = useRouter();

  const [email, setEmail] = useState("organizer@eacrms.com");
  const [password, setPassword] = useState("organizer123");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) { setError("Organizer email is required."); return; }
    if (!password.trim()) { setError("Password is required."); return; }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    const result = login(email, password);
    setIsLoading(false);

    if (result.success) {
      router.push("/events/dashboard");
    } else {
      setError(result.error || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-50 px-4 py-12 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full blur-[180px]" style={{ backgroundColor: "rgba(1,64,167,0.08)" }} />
        <div className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full blur-[180px]" style={{ backgroundColor: "rgba(230,165,0,0.08)" }} />
      </div>

      <div className="relative z-10 w-full max-w-md space-y-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div
            className="relative h-20 w-20 overflow-hidden rounded-2xl bg-white p-2 shadow-xl"
            style={{ border: "1px solid #D9DEE5" }}
          >
            <Image src="/logo.png" alt="EAF Logo" fill className="object-contain p-1" priority />
          </div>
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-mono font-bold border mb-2"
              style={{ backgroundColor: "#DCEBF6", color: "#0140A7", borderColor: "rgba(1,64,167,0.2)" }}
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              EVENT ORGANIZER PORTAL
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Organizer Sign In
            </h1>
            <p className="mt-1 text-xs font-medium text-slate-400 dark:text-zinc-500">
              Ethiopian Athletics Federation • Competition Portal
            </p>
          </div>
        </div>

        {/* Secure Login Card */}
        <div
          className="rounded-3xl border p-8 space-y-6 shadow-2xl"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#D9DEE5" }}
        >
          {/* Restricted Access Notice */}
          <div
            className="rounded-2xl p-4 border text-xs leading-relaxed space-y-1"
            style={{ backgroundColor: "rgba(230,165,0,0.08)", borderColor: "rgba(230,165,0,0.3)", color: "#8A6200" }}
          >
            <div className="flex items-center gap-2 font-bold" style={{ color: "#B08200" }}>
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>RESTRICTED ACCESS NOTICE</span>
            </div>
            <p>
              Only authorized <strong>Event Organizers</strong> and accredited competition staff may access this portal.
              Club officers use the Club Portal; athletes use the Athlete Portal.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold mb-1.5 dark:text-zinc-300" style={{ color: "#3A3E44" }}>Organizer Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="organizer@eacrms.com"
                className="w-full rounded-xl border px-4 py-3 placeholder-slate-400 focus:outline-none transition-colors dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                style={{ borderColor: "#D9DEE5", backgroundColor: "#F7F8FA", color: "#1D1D1F" }}
              />
            </div>

            <div>
              <label className="block font-bold mb-1.5 dark:text-zinc-300" style={{ color: "#3A3E44" }}>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="••••••••"
                  className="w-full rounded-xl border px-4 py-3 pr-11 placeholder-slate-400 focus:outline-none transition-colors dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                  style={{ borderColor: "#D9DEE5", backgroundColor: "#F7F8FA", color: "#1D1D1F" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "#8B9098" }}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {showPassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {error && (
              <div
                className="rounded-xl border p-3 font-semibold text-center"
                style={{ borderColor: "rgba(211,47,47,0.25)", backgroundColor: "rgba(211,47,47,0.06)", color: "#D32F2F" }}
              >
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-2xl p-4 text-sm font-extrabold text-white shadow-lg transition-all disabled:opacity-50 active:scale-[0.98]"
              style={{ backgroundColor: "#0140A7" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "#01368C")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "#0140A7")}
            >
              {isLoading ? "Authenticating..." : "Sign In to Organizer Portal"}
            </button>
          </form>

          {/* Demo Credentials */}
          <div
            className="rounded-xl border p-3 text-[11px] font-mono space-y-1"
            style={{ borderColor: "#D9DEE5", backgroundColor: "#F7F8FA", color: "#555B63" }}
          >
            <p className="font-bold" style={{ color: "#0140A7" }}>Demo Organizer Credentials:</p>
            <div>
              Email: <code className="font-bold dark:text-zinc-100" style={{ color: "#1D1D1F" }}>organizer@eacrms.com</code>
            </div>
            <div>
              Password: <code className="font-bold dark:text-zinc-100" style={{ color: "#1D1D1F" }}>organizer123</code>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="text-xs transition-colors"
            style={{ color: "#555B63" }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#0140A7")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "#555B63")}
          >
            ← Return to Main Home Page
          </Link>
        </div>
      </div>
    </div>
  );
}
