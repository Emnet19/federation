"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function FederationLoginPage() {
  const { loginWithCredentials } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("admin@eaf.gov.et");
  const [password, setPassword] = useState("Admin@2026");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) { setError("Email is required."); return; }
    if (!password.trim()) { setError("Password is required."); return; }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    const result = loginWithCredentials(email, password);
    setIsLoading(false);

    if (result.success) {
      router.push("/federation");
    } else {
      setError(result.error || "Invalid Federation Official credentials.");
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0A4870 0%, #0140A7 50%, #0A4870 100%)" }}
    >
      {/* Decorative orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full blur-[200px]"
          style={{ backgroundColor: "rgba(220,235,246,0.12)" }}
        />
        <div
          className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full blur-[200px]"
          style={{ backgroundColor: "rgba(230,165,0,0.1)" }}
        />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(#DCEBF6 1px, transparent 1px), linear-gradient(90deg, #DCEBF6 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md space-y-8">
        {/* Header / Branding */}
        <div className="flex flex-col items-center text-center space-y-5">
          <div
            className="relative h-24 w-24 overflow-hidden rounded-3xl p-2 shadow-2xl"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(220,235,246,0.3)" }}
          >
            <Image src="/logo.png" alt="EAF Logo" fill className="object-contain p-1" priority />
          </div>
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-mono font-bold mb-3"
              style={{
                backgroundColor: "rgba(230,165,0,0.18)",
                border: "1px solid rgba(230,165,0,0.4)",
                color: "#FFF3CC",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#E6A500" }} />
              FEDERATION EXECUTIVE PORTAL
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Federation Admin Portal
            </h1>
            <p className="mt-2 text-sm font-medium" style={{ color: "#DCEBF6" }}>
              Ethiopian Athletics Federation Executive Control &amp; Audit Portal
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div
          className="rounded-3xl p-8 shadow-2xl space-y-6"
          style={{
            backgroundColor: "rgba(255,255,255,0.97)",
            border: "1px solid rgba(220,235,246,0.4)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="space-y-1">
            <h2 className="text-base font-bold" style={{ color: "#1D1D1F" }}>Official Federation Sign In</h2>
            <p className="text-[11px]" style={{ color: "#8B9098" }}>
              Enter your executive EAF credentials to access the audit queues and management panel.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            {/* Email */}
            <div>
              <label className="block font-bold mb-1.5" style={{ color: "#555B63" }}>
                Official Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="admin@eaf.gov.et"
                className="w-full rounded-xl px-4 py-3 text-sm placeholder-[#8B9098] focus:outline-none transition-colors"
                style={{
                  border: "1.5px solid #D9DEE5",
                  backgroundColor: "#F7F8FA",
                  color: "#1D1D1F",
                }}
                onFocus={e => (e.currentTarget.style.borderColor = "#0140A7")}
                onBlur={e => (e.currentTarget.style.borderColor = "#D9DEE5")}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block font-bold mb-1.5" style={{ color: "#555B63" }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="••••••••"
                  className="w-full rounded-xl px-4 py-3 pr-11 text-sm placeholder-[#8B9098] focus:outline-none transition-colors"
                  style={{
                    border: "1.5px solid #D9DEE5",
                    backgroundColor: "#F7F8FA",
                    color: "#1D1D1F",
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = "#0140A7")}
                  onBlur={e => (e.currentTarget.style.borderColor = "#D9DEE5")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "#8B9098" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#0140A7")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "#8B9098")}
                >
                  {showPassword ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                className="rounded-xl p-3 text-xs font-semibold text-center"
                style={{
                  backgroundColor: "rgba(211,47,47,0.06)",
                  border: "1px solid rgba(211,47,47,0.2)",
                  color: "#D32F2F",
                }}
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-2xl p-4 text-sm font-extrabold text-white shadow-lg transition-all disabled:opacity-50 active:scale-[0.98]"
              style={{ backgroundColor: "#0140A7" }}
              onMouseEnter={e => { if (!isLoading) (e.currentTarget as HTMLElement).style.backgroundColor = "#0A4870"; }}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "#0140A7")}
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Authenticating...
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In to Federation Executive Portal
                </>
              )}
            </button>
          </form>

          {/* Demo credentials hint */}
          <div
            className="rounded-xl p-3 text-[11px] font-mono text-center space-y-0.5"
            style={{
              backgroundColor: "#DCEBF6",
              border: "1px solid rgba(1,64,167,0.15)",
            }}
          >
            <p className="font-bold" style={{ color: "#0140A7" }}>Federation Admin Demo Credentials:</p>
            <p style={{ color: "#555B63" }}>admin@eaf.gov.et / Admin@2026</p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="text-xs font-medium transition-colors"
            style={{ color: "rgba(220,235,246,0.7)" }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#FFFFFF")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(220,235,246,0.7)")}
          >
            ← Return to Main Home Page
          </Link>
        </div>
      </div>
    </div>
  );
}
