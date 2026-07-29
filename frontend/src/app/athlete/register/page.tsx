"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { colors } from "@/constants/colors";

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
  email: string;
  fullName: string;
  fanId: string;
  dob: string;
  gender: string;
  region: string;
  eventCategory: string;
  clubId: string;
  clubName: string;
  status: "Pending Approval" | "Licensed & Active";
  issuedDate: string;
}

export default function AthleteSelfRegistrationPage() {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1 State: Account Setup (Email & Password)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step1Error, setStep1Error] = useState("");

  // Step 2 State: Fayda FAN ID (NO Phone Number required)
  const [fanInput, setFanInput] = useState("1223556898888565"); // 16 digits default demo
  const [fanError, setFanError] = useState("");
  const [isVerifyingFan, setIsVerifyingFan] = useState(false);

  // Step 3 State: Fayda Identity & Club Selection
  const [faydaIdentity, setFaydaIdentity] = useState<FaydaVerifiedIdentity | null>(null);
  const [selectedClubId, setSelectedClubId] = useState<string>("EAF-CLB-102");
  const [eventCategory, setEventCategory] = useState("Long Distance (5k / 10k / Marathon)");
  const [region, setRegion] = useState("Addis Ababa");

  // Step 4 State: Final Registered Profile
  const [registeredAthlete, setRegisteredAthlete] = useState<RegisteredAthleteProfile | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Format 16-digit FAN ID with spaces
  const format16DigitFan = (val: string) => {
    const raw = val.replace(/\D/g, "").slice(0, 16);
    const groups = raw.match(/.{1,4}/g);
    return groups ? groups.join(" ") : raw;
  };

  const getCleanFanDigits = (val: string) => val.replace(/\D/g, "");

  // Handle Step 1: Email & Passwords Validation
  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    setStep1Error("");

    if (!email.trim() || !email.includes("@")) {
      setStep1Error("Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 6) {
      setStep1Error("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setStep1Error("Passwords do not match. Please verify and try again.");
      return;
    }

    setCurrentStep(2);
  };

  // Handle Step 2: Fayda FAN ID Verification (No phone number asked)
  const handleStep2Next = (e: React.FormEvent) => {
    e.preventDefault();
    setFanError("");

    const cleanFan = getCleanFanDigits(fanInput);
    if (!cleanFan || cleanFan.length !== 16) {
      setFanError(`Fayda FAN ID must be exactly 16 digits. (Entered ${cleanFan.length} digits)`);
      return;
    }

    setIsVerifyingFan(true);
    setTimeout(() => {
      setFaydaIdentity({
        name: "Abebe Bikila",
        fanId: cleanFan,
        gender: "Male",
        dob: "2002-05-15",
        nationality: "Ethiopian",
      });
      setIsVerifyingFan(false);
      setCurrentStep(3);
    }, 600);
  };

  // Handle Step 3: Final Submission
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
        email: email.trim(),
        fullName: faydaIdentity.name,
        fanId: faydaIdentity.fanId,
        dob: faydaIdentity.dob,
        gender: faydaIdentity.gender,
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
      setCurrentStep(4);
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
                Athlete Self-Registration
              </h1>
              <p className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                Fayda Digital Identity Onboarding
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
            <span>Step {currentStep} of 4</span>
            <span>
              {currentStep === 1 && "Account Credentials"}
              {currentStep === 2 && "Fayda FAN Validation"}
              {currentStep === 3 && "Profile & Club Selection"}
              {currentStep === 4 && "Application Submitted"}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-zinc-800 overflow-hidden">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${(currentStep / 4) * 100}%`,
                backgroundColor: colors.brand.primary,
              }}
            />
          </div>
        </div>

        {/* STEP 1: USER ACCOUNT CREATION (Email, Password, Confirm Password) */}
        {currentStep === 1 && (
          <div className="rounded-3xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/80 backdrop-blur-xl p-8 shadow-xl space-y-6">
            <div className="space-y-2 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-2xl border" style={{ backgroundColor: colors.brand.primaryLight, color: colors.brand.primary, borderColor: colors.primaryAlpha20 }}>
                🔐
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Create Athlete Account
              </h2>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed max-w-md mx-auto">
                Set up your login details first. When you log back in later, you can track your registration status and see any changes or approvals.
              </p>
            </div>

            <form onSubmit={handleStep1Next} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setStep1Error(""); }}
                  placeholder="athlete@example.et"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setStep1Error(""); }}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setStep1Error(""); }}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none transition-colors"
                />
              </div>

              {step1Error && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-red-600 dark:text-red-400 font-semibold">
                  ⚠ {step1Error}
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-2xl p-4 text-sm font-extrabold text-white shadow-lg transition-all"
                style={{ backgroundColor: colors.brand.primary }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = colors.brand.primaryDark)}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = colors.brand.primary)}
              >
                <span>Next: Enter Fayda FAN ID</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l7-7m7 7H3" />
                </svg>
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: FAYDA FAN NUMBER ONLY (NO PHONE NUMBER ASKED) */}
        {currentStep === 2 && (
          <div className="rounded-3xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/80 backdrop-blur-xl p-8 shadow-xl space-y-6">
            <button
              onClick={() => setCurrentStep(1)}
              className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
            >
              ← Back to Account Credentials
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold border mb-1" style={{ backgroundColor: colors.brand.secondaryLight, color: colors.brand.secondaryDark, borderColor: "rgba(230,165,0,0.3)" }}>
                🆔 FAYDA NATIONAL ID MANDATE
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Enter Your Fayda Access Number (FAN)</h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Enter your 16-digit Fayda Access Number (FAN). Your identity details will be automatically validated with the national identity database.
              </p>
            </div>

            <form onSubmit={handleStep2Next} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                  16-Digit Fayda Access Number (FAN) <span className="text-red-500">*</span>
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
                  className="w-full font-mono text-base tracking-wider rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none transition-colors"
                />
              </div>

              {fanError && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-red-600 dark:text-red-400 font-semibold">
                  ⚠ {fanError}
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifyingFan}
                className="w-full flex items-center justify-center gap-2 rounded-2xl p-4 text-sm font-extrabold text-white shadow-lg transition-all disabled:opacity-50"
                style={{ backgroundColor: colors.brand.primary }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = colors.brand.primaryDark)}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = colors.brand.primary)}
              >
                {isVerifyingFan ? "Validating FAN ID..." : "Next: Verify Fayda Identity →"}
              </button>
            </form>
          </div>
        )}

        {/* STEP 3: FAYDA PROFILE REVIEW & CLUB SELECTION */}
        {currentStep === 3 && faydaIdentity && (
          <div className="rounded-3xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/80 backdrop-blur-xl p-8 shadow-xl space-y-6">
            <button
              onClick={() => setCurrentStep(2)}
              className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
            >
              ← Back to FAN Input
            </button>

            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold border" style={{ backgroundColor: colors.brand.primaryLight, color: colors.brand.primary, borderColor: colors.primaryAlpha20 }}>
                ✓ Fayda Verified Identity
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Confirm Athlete &amp; Club Details</h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 dark:border-zinc-800 dark:bg-zinc-950/60 p-5 space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-zinc-800">
                <span className="text-slate-500 dark:text-zinc-500">Account Email:</span>
                <span className="font-extrabold text-slate-900 dark:text-white">{email}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-zinc-800">
                <span className="text-slate-500 dark:text-zinc-500">Full Name:</span>
                <span className="font-extrabold text-slate-900 dark:text-white text-sm">{faydaIdentity.name}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-zinc-800">
                <span className="text-slate-500 dark:text-zinc-500">Fayda FAN ID:</span>
                <span className="font-bold" style={{ color: colors.brand.primary }}>{format16DigitFan(faydaIdentity.fanId)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-zinc-800">
                <span className="text-slate-500 dark:text-zinc-500">Date of Birth / Age:</span>
                <span className="font-bold text-slate-800 dark:text-zinc-200">{faydaIdentity.dob} (Senior)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-zinc-500">Gender &amp; Nationality:</span>
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
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none transition-colors"
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
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none transition-colors"
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
                className="w-full flex items-center justify-center gap-2 rounded-2xl p-4 text-sm font-extrabold text-white shadow-lg transition-all disabled:opacity-50"
                style={{ backgroundColor: colors.brand.secondary }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = colors.brand.secondaryDark)}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = colors.brand.secondary)}
              >
                {isSubmitting ? "Submitting Registration..." : "Submit Athlete Registration"}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: REGISTRATION COMPLETE & STATUS TRACKING INFO */}
        {currentStep === 4 && registeredAthlete && (
          <div className="rounded-3xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/90 backdrop-blur-xl p-8 shadow-xl text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full text-3xl border" style={{ backgroundColor: colors.brand.primaryLight, color: colors.brand.primary, borderColor: colors.primaryAlpha20 }}>
              ⏳
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold font-mono border" style={{ backgroundColor: colors.brand.secondaryLight, color: colors.brand.secondaryDark, borderColor: "rgba(230,165,0,0.3)" }}>
                Status: Pending Approval
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Registration Submitted Successfully!
              </h2>
              <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed max-w-md mx-auto">
                Your athlete profile has been registered under <strong>{registeredAthlete.email}</strong>. You can sign in anytime using your email and password to check your application status.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 dark:border-zinc-800 dark:bg-zinc-950/60 p-5 text-left text-xs font-mono space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Account Email:</span>
                <span className="font-bold text-slate-900 dark:text-white">{registeredAthlete.email}</span>
              </div>
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
                <span className="font-bold" style={{ color: colors.brand.primary }}>{format16DigitFan(registeredAthlete.fanId)}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
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
