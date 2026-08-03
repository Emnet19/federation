"use client";

import React, { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Lock, Loader, ArrowLeft, BadgeCheck } from "lucide-react";
import { PAYMENT_METHODS, formatEthiopianBirr } from "@/lib/payment-methods";

const FEE = 500;
const BRAND = {
  primary: "#0140A7",
  primaryDark: "#0A4870",
  secondary: "#E6A500",
  success: "#2E7D32",
  error: "#D32F2F",
};

const subscribe = () => () => {};

function readTxRefFromUrl(): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("tx_ref") ?? "";
}

// Server renders the fallback, so the client's first (hydration) render matches.
const readTxRefServer = () => "";

export default function DemoCheckoutPage() {
  const txRef = useSyncExternalStore(subscribe, readTxRefFromUrl, readTxRefServer);
  const [selected, setSelected] = useState<string>(PAYMENT_METHODS[0]?.id ?? "");
  const [isPaying, setIsPaying] = useState(false);

  const finish = (status: "success" | "failed") => {
    setIsPaying(true);
    const qs = `tx_ref=${encodeURIComponent(txRef || "EAF-ATH-DEMO")}&status=${status}&method=${encodeURIComponent(selected)}`;
    window.location.assign(`/athlete/register?${qs}`);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100 flex flex-col">
      <div className="mx-auto max-w-lg w-full px-4 py-8 flex-1 flex flex-col justify-center">
        <div className="mb-6 flex items-center justify-center gap-2">
          <BadgeCheck className="h-5 w-5" style={{ color: BRAND.primary }} />
          <span className="text-xs font-bold font-mono tracking-wider" style={{ color: BRAND.primary }}>
            DEMO CHAPA CHECKOUT
          </span>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 shadow-xl overflow-hidden">
          <div className="px-8 py-6 text-white" style={{ backgroundColor: BRAND.primary }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold font-mono tracking-widest uppercase opacity-80">Amount due</p>
                <p className="text-3xl font-black mt-1">{formatEthiopianBirr(FEE)}</p>
              </div>
              <div className="text-right text-[10px] font-bold font-mono">
                <p className="opacity-80">Ref</p>
                <p className="bg-white/15 rounded-lg px-2 py-1 mt-1 max-w-[140px] truncate">{txRef || "..."}</p>
              </div>
            </div>
            <p className="mt-4 text-xs font-semibold">Ethiopian Athletics Federation - Athlete Registration Fee</p>
          </div>

          <div className="p-8 space-y-6">
            <div>
              <p className="text-xs font-bold text-slate-700 dark:text-zinc-300 mb-3">
                Choose a payment method
              </p>
              <div className="grid grid-cols-2 gap-3">
                {PAYMENT_METHODS.map((m) => {
                  const Icon = m.icon;
                  const active = selected === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelected(m.id)}
                      className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all ${
                        active ? "ring-2" : "hover:border-slate-300 dark:hover:border-zinc-600"
                      }`}
                      style={{
                        backgroundColor: active ? m.bg : undefined,
                        borderColor: active ? m.color : undefined,
                        boxShadow: active ? `0 0 0 1px ${m.color}33` : undefined,
                      }}
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl shrink-0" style={{ backgroundColor: m.bg, color: m.color }}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-xs font-extrabold text-slate-900 dark:text-white">{m.name}</span>
                        <span className="block text-[10px] font-medium text-slate-500 dark:text-zinc-400">{m.description}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              disabled={isPaying}
              onClick={() => finish("success")}
              className="w-full flex items-center justify-center gap-2 rounded-2xl p-4 text-sm font-extrabold text-white shadow-lg transition-all disabled:opacity-60"
              style={{ backgroundColor: BRAND.success }}
            >
              {isPaying ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" /> Completing Demo Payment...
                </>
              ) : (
                <>Complete Demo Payment</>
              )}
            </button>

            <button
              type="button"
              disabled={isPaying}
              onClick={() => finish("failed")}
              className="w-full flex items-center justify-center gap-2 rounded-2xl border border-slate-200 p-3.5 text-xs font-bold text-slate-600 hover:bg-slate-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors disabled:opacity-60"
            >
              <ArrowLeft className="h-4 w-4" /> Cancel Payment
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 dark:text-zinc-500">
              <Lock className="h-3.5 w-3.5" /> SSL Secured Payment
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/athlete/register" className="text-xs font-bold text-slate-500 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors">
            ← Back to Registration
          </Link>
        </div>
      </div>
    </div>
  );
}
