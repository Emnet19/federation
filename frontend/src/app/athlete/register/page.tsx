"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/common/ThemeToggle";

export interface RegisteredClub {
  id: string;
  name: string;
  region: string;
  category: string;
}

const AVAILABLE_CLUBS: RegisteredClub[] = [
  { id: "EAF-CLB-101", name: "Defence Athletics Club", region: "Addis Ababa", category: "National League" },
  { id: "EAF-CLB-102", name: "Arada Athletics Club", region: "Addis Ababa", category: "Regional Club" },
  { id: "EAF-CLB-103", name: "Hawassa Athletics AC", region: "Sidama", category: "Regional Club" },
  { id: "EAF-CLB-104", name: "Oromia Police Sports Club", region: "Oromia", category: "National League" },
];

export interface FaydaVerifiedIdentity {
  name: string;
  fanId: string;
  gender: string;
  dob: string;
  nationality: string;
}

export interface RegisteredAthleteProfile {
  id: string;
  fullName: string;
  fanId: string;
  dob: string;
  gender: string;
  phone: string;
  region: string;
  eventCategory: string;
  clubId: string;
  clubName: string;
  status: "Pending Approval" | "Licensed & Active";
  issuedDate: string;
}

export default function AthleteSelfRegistrationPage() {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 2 Inputs
  const [fanInput, setFanInput] = useState("1223556898888565"); // 16 digits
  const [phoneInput, setPhoneInput] = useState("0911238066");
  const [fanError, setFanError] = useState("");

  // Step 3 OTP State
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  // Step 4 State
  const [faydaIdentity, setFaydaIdentity] = useState<FaydaVerifiedIdentity | null>(null);
  const [selectedClubId, setSelectedClubId] = useState<string>("EAF-CLB-102");
  const [eventCategory, setEventCategory] = useState("Long Distance (5k / 10k / Marathon)");
  const [region, setRegion] = useState("Addis Ababa");

  // Step 5 State
  const [registeredAthlete, setRegisteredAthlete] = useState<RegisteredAthleteProfile | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Format FAN ID
  const format16DigitFan = (val: string) => {
    const raw = val.replace(/\D/g, "").slice(0, 16);
    const groups = raw.match(/.{1,4}/g);
    return groups ? groups.join(" ") : raw;
  };

  const getCleanFanDigits = (val: string) => val.replace(/\D/g, "");

  const handleStartFlow = () => {
    setCurrentStep(2);
  };

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setFanError("");

    const cleanFan = getCleanFanDigits(fanInput);
    if (!cleanFan || cleanFan.length !== 16) {
      setFanError(`FAN ID must be exactly 16 digits. (Entered ${cleanFan.length} digits)`);
      return;
    }

    if (!phoneInput.trim()) {
      setFanError("Please enter your mobile phone number for OTP verification.");
      return;
    }

    setIsSendingOtp(true);
    setTimeout(() => {
      const generated = "849201";
      setOtpCode(generated);
      setEnteredOtp(generated);
      setIsSendingOtp(false);
      setCurrentStep(3);
    }, 500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError("");

    if (enteredOtp !== otpCode && enteredOtp !== "849201" && enteredOtp.length !== 6) {
      setOtpError("Invalid OTP code. Please enter 849201 for demo verification.");
      return;
    }

    const cleanFan = getCleanFanDigits(fanInput) || "1223556898888565";
    setFaydaIdentity({
      name: "Abebe Bikila",
      fanId: cleanFan,
      gender: "Male",
      dob: "2002-05-15",
      nationality: "Ethiopian",
    });

    setCurrentStep(4);
  };

  const handleFinalSubmit = () => {
    if (!faydaIdentity) return;

    setIsSubmitting(true);

    setTimeout(() => {
      let assignedClubName = "Independent / Unattached";
      if (selectedClubId !== "UNATTACHED") {
        const found = AVAILABLE_CLUBS.find((c) => c.id === selectedClubId);
        if (found) assignedClubName = found.name;
      }

      const generatedId = `EAF-ATH-2026-${Math.floor(100 + Math.random() * 900)}`;
      const profile: RegisteredAthleteProfile = {
        id: generatedId,
        fullName: faydaIdentity.name,
        fanId: faydaIdentity.fanId,
        dob: faydaIdentity.dob,
        gender: faydaIdentity.gender,
        phone: phoneInput.trim(),
        region,
        eventCategory,
        clubId: selectedClubId,
        clubName: assignedClubName,
        status: "Pending Approval",
        issuedDate: new Date().toISOString().split("T")[0],
      };

      try {
        const existing = localStorage.getItem("eacrms_pending_athletes");
        const list = existing ? JSON.parse(existing) : [];
        list.unshift(profile);
        localStorage.setItem("eacrms_pending_athletes", JSON.stringify(list));
      } catch (e) {
        console.error("Failed to save pending athlete registration", e);
      }

      setRegisteredAthlete(profile);
      setIsSubmitting(false);
      setCurrentStep(5);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-200 flex flex-col">
      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 dark:border-zinc-800/80 dark:bg-zinc-900/80 backdrop-blur-xl px-4 sm:px-6 py-3.5">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl bg-white border border-slate-200 dark:bg-zinc-900 dark:border-zinc-800 p-1 shadow-sm">
              <Image src="/logo.png" alt="EAF Logo" fill className="object-contain" priority />
            </div>
            <div>
              <h1 className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                Register as an Athlete
              </h1>
              <p className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                Fayda Digital Identity Verification
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-all"
            >
              Home Portal
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 mx-auto max-w-xl w-full px-4 py-10 flex flex-col justify-center">

        {/* STEP PROGRESS BAR */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-bold font-mono text-slate-500 dark:text-zinc-400 mb-2">
            <span>Step {currentStep} of 5</span>
            <span>
              {currentStep === 1 && "Start Onboarding"}
              {currentStep === 2 && "FAN ID Input"}
              {currentStep === 3 && "SMS OTP Verification"}
              {currentStep === 4 && "Fayda Profile Review"}
              {currentStep === 5 && "Registration Submitted"}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-300"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: REGISTER AS AN ATHLETE (VIBRANT EMERALD THEME) */}
        {currentStep === 1 && (
          <div className="rounded-3xl border border-emerald-500/20 bg-white dark:border-zinc-800 dark:bg-zinc-900/80 backdrop-blur-xl p-8 shadow-xl text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-3xl">
              🆔
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Register as an Athlete
              </h2>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed max-w-sm mx-auto">
                Fast and secure athlete onboarding powered by <strong>Fayda National ID</strong> verification. Verify instantly with your 16-digit FAN ID.
              </p>
            </div>

            {/* VIBRANT EMERALD BUTTON MATCHING USER SCREENSHOT */}
            <div className="pt-4">
              <button
                onClick={handleStartFlow}
                className="w-full flex items-center justify-center gap-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white p-4 font-extrabold shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] group"
              >
                <div className="h-7 w-7 rounded-lg bg-white/20 flex items-center justify-center text-xs font-mono font-black text-white">
                  FAN
                </div>
                <span className="text-sm tracking-wide">Register as an Athlete</span>
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l7-7m7 7H3" />
                </svg>
              </button>
            </div>

            <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-zinc-400 font-mono">
              <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Instant Biometric & Age-Verification via NID API</span>
            </div>
          </div>
        )}

        {/* STEP 2: FAN ID & PHONE INPUT */}
        {currentStep === 2 && (
          <div className="rounded-3xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/80 backdrop-blur-xl p-8 shadow-xl space-y-6">
            <button
              onClick={() => setCurrentStep(1)}
              className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
            >
              ← Back
            </button>

            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Enter Your Fayda Access Number (FAN)</h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Provide your 16-digit FAN ID and mobile phone number to receive a one-time SMS verification code.
              </p>
            </div>

            <form onSubmit={handleRequestOtp} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                  16-Digit Fayda Access Number (FAN)
                </label>
                <input
                  type="text"
                  value={format16DigitFan(fanInput)}
                  onChange={(e) => {
                    setFanInput(e.target.value);
                    setFanError("");
                  }}
                  placeholder="1223 5568 9888 8565"
                  maxLength={19}
                  className="w-full font-mono text-base tracking-wider rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition-colors"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                  Registered Mobile Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  placeholder="0911238066"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition-colors"
                />
              </div>

              {fanError && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-red-600 dark:text-red-400 font-semibold">
                  ⚠ {fanError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSendingOtp}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 p-4 text-sm font-extrabold text-white shadow-lg shadow-emerald-500/25 transition-all disabled:opacity-50"
              >
                {isSendingOtp ? "Dispatching SMS OTP..." : "Send SMS Verification Code"}
              </button>
            </form>
          </div>
        )}

        {/* STEP 3: SMS OTP VERIFICATION */}
        {currentStep === 3 && (
          <div className="rounded-3xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/80 backdrop-blur-xl p-8 shadow-xl space-y-6">
            <button
              onClick={() => setCurrentStep(2)}
              className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
            >
              ← Back to FAN ID
            </button>

            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Verify SMS OTP</h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                We sent a 6-digit security code to <strong className="text-slate-800 dark:text-zinc-200 font-mono">{phoneInput}</strong>.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between font-bold text-emerald-800 dark:text-emerald-300">
                <span>Demo OTP Simulation:</span>
                <span className="font-mono text-sm bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30 text-emerald-700 dark:text-emerald-300">
                  {otpCode || "849201"}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-zinc-400">
                For evaluation demo mode, standard numbers are auto-verified using code <strong>849201</strong>.
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                  Enter 6-Digit OTP Code
                </label>
                <input
                  type="text"
                  value={enteredOtp}
                  onChange={(e) => {
                    setEnteredOtp(e.target.value);
                    setOtpError("");
                  }}
                  placeholder="849201"
                  maxLength={6}
                  className="w-full text-center font-mono text-xl tracking-[0.4em] rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>

              {otpError && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-red-600 dark:text-red-400 font-semibold">
                  ⚠ {otpError}
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 p-4 text-sm font-extrabold text-white shadow-lg shadow-emerald-500/25 transition-all"
              >
                Verify & Retrieve Fayda Identity
              </button>
            </form>
          </div>
        )}

        {/* STEP 4: FAYDA PROFILE REVIEW & SELECTION */}
        {currentStep === 4 && faydaIdentity && (
          <div className="rounded-3xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/80 backdrop-blur-xl p-8 shadow-xl space-y-6">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                ✓ Fayda Verified Identity
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Confirm Athlete Information</h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 dark:border-zinc-800 dark:bg-zinc-950/60 p-5 space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-zinc-800">
                <span className="text-slate-500 dark:text-zinc-500">Full Name:</span>
                <span className="font-extrabold text-slate-900 dark:text-white text-sm">{faydaIdentity.name}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-zinc-800">
                <span className="text-slate-500 dark:text-zinc-500">Fayda FAN ID:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{format16DigitFan(faydaIdentity.fanId)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-zinc-800">
                <span className="text-slate-500 dark:text-zinc-500">Date of Birth / Age:</span>
                <span className="font-bold text-slate-800 dark:text-zinc-200">{faydaIdentity.dob} (Senior)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-zinc-500">Gender & Nationality:</span>
                <span className="font-bold text-slate-800 dark:text-zinc-200">{faydaIdentity.gender} · {faydaIdentity.nationality}</span>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                  Select Affiliated Athletics Club
                </label>
                <select
                  value={selectedClubId}
                  onChange={(e) => setSelectedClubId(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:border-emerald-500 focus:outline-none transition-colors"
                >
                  <option value="UNATTACHED">Independent / Unattached Athlete</option>
                  {AVAILABLE_CLUBS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.region}) — {c.category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                  Primary Event Specialization
                </label>
                <select
                  value={eventCategory}
                  onChange={(e) => setEventCategory(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:border-emerald-500 focus:outline-none transition-colors"
                >
                  <option value="Sprints (100m / 200m / 400m)">Sprints (100m / 200m / 400m)</option>
                  <option value="Middle Distance (800m / 1500m)">Middle Distance (800m / 1500m)</option>
                  <option value="Long Distance (5k / 10k / Marathon)">Long Distance (5k / 10k / Marathon)</option>
                  <option value="Field Events (Jumps / Throws)">Field Events (Jumps / Throws)</option>
                </select>
              </div>

              <button
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 p-4 text-sm font-extrabold text-white shadow-lg shadow-emerald-500/25 transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Submitting Registration..." : "Submit Athlete Registration"}
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: REGISTRATION COMPLETE & WAITING NOTIFICATION */}
        {currentStep === 5 && registeredAthlete && (
          <div className="rounded-3xl border border-emerald-500/20 bg-white dark:border-zinc-800 dark:bg-zinc-900/90 backdrop-blur-xl p-8 shadow-xl text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-3xl">
              ⏳
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-bold text-yellow-700 dark:text-yellow-400 border border-yellow-500/20 font-mono">
                Status: Pending Approval
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Registration Submitted Successfully!
              </h2>
              <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed max-w-md mx-auto">
                Your athlete profile has been registered and sent for official review. <strong>Please wait for an SMS message or email</strong> to confirm whether your registration is accepted by your club and federation officials.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 dark:border-zinc-800 dark:bg-zinc-950/60 p-5 text-left text-xs font-mono space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Application ID:</span>
                <span className="font-bold text-slate-900 dark:text-white">{registeredAthlete.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Athlete Name:</span>
                <span className="font-bold text-slate-900 dark:text-white">{registeredAthlete.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Assigned Club:</span>
                <span className="font-bold text-slate-900 dark:text-white">{registeredAthlete.clubName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Fayda FAN ID:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{format16DigitFan(registeredAthlete.fanId)}</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white dark:bg-zinc-100 dark:text-slate-900 px-6 py-3 text-xs font-bold shadow-md transition-all hover:opacity-90"
              >
                Return to Home Page
              </Link>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
