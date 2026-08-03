"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/common/ThemeToggle";

// Brand colors
const BRAND = {
  primary: "#0140A7",
  primaryDark: "#0A4870",
  primaryLight: "#DCEBF6",
  secondary: "#E6A500",
  secondaryDark: "#C98F00",
  secondaryLight: "#FFF3CC",
  success: "#2E7D32",
  warning: "#F59E0B",
  error: "#D32F2F",
};

interface FaydaProfile {
  name: string;
  fanId: string;
  gender: string;
  dob: string;
  nationality: string;
  maskedPhone: string;
}

interface RegisteredAthlete {
  id: string;
  email: string;
  fullName: string;
  fanId: string;
  phone: string;
}

export default function AthleteSelfRegistrationPage() {
  const [regStep, setRegStep] = useState<"fayda" | "otp" | "details" | "done">("fayda");

  // Step 1: Fayda FAN
  const [fanInput, setFanInput] = useState("");
  const [fanError, setFanError] = useState("");
  const [isFetchingFayda, setIsFetchingFayda] = useState(false);

  // Step 2: OTP (NO RESEND BUTTON per user request)
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otpError, setOtpError] = useState("");
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  // Step 3: Identity + contact details
  const [faydaProfile, setFaydaProfile] = useState<FaydaProfile | null>(null);
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPassword, setContactPassword] = useState("");
  const [detailsError, setDetailsError] = useState("");

  // Step 4: Success
  const [registeredAthlete, setRegisteredAthlete] = useState<RegisteredAthlete | null>(null);

  const formatFanDigits = (val: string) => {
    const raw = val.replace(/\D/g, "").slice(0, 16);
    const groups = raw.match(/.{1,4}/g);
    return groups ? groups.join(" ") : raw;
  };

  // Step 1: Enter Fayda FAN → send OTP
  const handleFanLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setFanError("");
    const clean = fanInput.replace(/\D/g, "");
    if (clean.length !== 16) {
      setFanError(`FAN must be exactly 16 digits (${clean.length} entered).`);
      return;
    }
    setIsFetchingFayda(true);
    setTimeout(() => {
      setFaydaProfile({
        name: "Abebe Bikila",
        fanId: clean,
        gender: "Male",
        dob: "2001-03-22",
        nationality: "Ethiopian",
        maskedPhone: "+251 9** *** 910",
      });
      setIsFetchingFayda(false);
      setOtpDigits(["", "", "", "", "", ""]);
      setRegStep("otp");
    }, 900);
  };

  // Step 2: Verify OTP
  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError("");
    const code = otpDigits.join("");
    if (code.length !== 6) {
      setOtpError("Please enter all 6 digits of the OTP.");
      return;
    }

    // Reject common invalid OTP patterns
    const invalidPatterns = ["000000", "111111", "222222", "333333", "444444", "555555", "666666", "777777", "888888", "999999", "123456", "654321"];
    if (invalidPatterns.includes(code)) {
      setOtpError("Invalid OTP code. Please enter the correct code sent to your phone.");
      return;
    }

    setIsVerifyingOtp(true);
    setTimeout(() => {
      setIsVerifyingOtp(false);
      setRegStep("details");
    }, 800);
  };

  const handleOtpChange = (idx: number, val: string) => {
    const digit = val.replace(/\D/g, "").slice(-1);
    const next = [...otpDigits];
    next[idx] = digit;
    setOtpDigits(next);
    if (digit && idx < 5) otpRefs.current[idx + 1]?.focus();
  };

  const handleOtpKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setOtpDigits(pasted.split(""));
      otpRefs.current[5]?.focus();
    }
  };

  // Step 3: Final submission
  const handleFinalRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    setDetailsError("");
    if (!contactPhone.trim()) {
      setDetailsError("Phone number is required.");
      return;
    }
    if (!contactEmail.trim() || !contactEmail.includes("@")) {
      setDetailsError("Please enter a valid email address.");
      return;
    }
    if (contactPassword.length < 6) {
      setDetailsError("Password must be at least 6 characters.");
      return;
    }
    if (!faydaProfile) return;

    const generatedId = `EAF-ATH-${Date.now()}`;
    const athlete: RegisteredAthlete = {
      id: generatedId,
      email: contactEmail.trim(),
      fullName: faydaProfile.name,
      fanId: faydaProfile.fanId,
      phone: contactPhone.trim(),
    };

    setRegisteredAthlete(athlete);
    setRegStep("done");
  };

  const getStepNumber = () => {
    if (regStep === "fayda") return 1;
    if (regStep === "otp") return 2;
    if (regStep === "details") return 3;
    return 3;
  };

  const getStepLabel = () => {
    if (regStep === "fayda") return "Fayda FAN Entry";
    if (regStep === "otp") return "OTP Verification";
    if (regStep === "details") return "Contact Details";
    return "Complete";
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
              <h1 className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                Athlete Self-Registration
              </h1>
              <p className="text-[10px] font-mono font-bold" style={{ color: BRAND.secondary }}>
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
        {regStep !== "done" && (
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-bold font-mono text-slate-500 dark:text-zinc-400 mb-2">
              <span>Step {getStepNumber()} of 3</span>
              <span>{getStepLabel()}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-zinc-800 overflow-hidden">
              <div
                className="h-full transition-all duration-300"
                style={{
                  width: `${(getStepNumber() / 3) * 100}%`,
                  backgroundColor: BRAND.primary,
                }}
              />
            </div>
          </div>
        )}

        {/* STEP A: FAYDA FAN INPUT */}
        {regStep === "fayda" && (
          <div className="rounded-3xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/80 backdrop-blur-xl p-8 shadow-xl space-y-6">
            <div className="space-y-2 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-2xl border" style={{ backgroundColor: BRAND.primaryLight, color: BRAND.primary, borderColor: BRAND.primary + "33" }}>
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-4 0V5a2 2 0 014 0v1" />
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Enter Your Fayda FAN
              </h2>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed max-w-md mx-auto">
                Enter your 16-digit Fayda Access Number. An OTP will be sent to your registered phone number.
              </p>
            </div>

            <form onSubmit={handleFanLookup} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                  16-Digit Fayda Access Number (FAN) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formatFanDigits(fanInput)}
                  onChange={(e) => {
                    setFanInput(e.target.value);
                    setFanError("");
                  }}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="w-full font-mono text-base tracking-wider rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none transition-colors"
                />
              </div>

              {fanError && (
                <div className="rounded-xl border p-3 text-sm font-semibold" style={{ backgroundColor: BRAND.error + "1A", borderColor: BRAND.error + "33", color: BRAND.error }}>
                  <strong>Warning:</strong> {fanError}
                </div>
              )}

              <button
                type="submit"
                disabled={isFetchingFayda}
                className="w-full flex items-center justify-center gap-2 rounded-2xl p-4 text-sm font-extrabold text-white shadow-lg transition-all disabled:opacity-50"
                style={{ backgroundColor: BRAND.primary }}
                onMouseEnter={e => !isFetchingFayda && ((e.currentTarget as HTMLElement).style.backgroundColor = BRAND.primaryDark)}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = BRAND.primary)}
              >
                {isFetchingFayda ? "Sending OTP..." : "Send OTP →"}
              </button>
            </form>
          </div>
        )}

        {/* STEP B: OTP VERIFICATION (NO RESEND BUTTON) */}
        {regStep === "otp" && (
          <div className="rounded-3xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/80 backdrop-blur-xl p-8 shadow-xl space-y-6">
            <button
              onClick={() => setRegStep("fayda")}
              className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
            >
              ← Back to FAN Entry
            </button>

            <div className="space-y-2 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-2xl border" style={{ backgroundColor: BRAND.secondaryLight, color: BRAND.secondary, borderColor: BRAND.secondary + "33" }}>
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Enter OTP Code
              </h2>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed max-w-md mx-auto">
                We sent a 6-digit code to {faydaProfile?.maskedPhone || "your phone"}. Please enter it below.
              </p>
            </div>

            <form onSubmit={handleOtpVerify} className="space-y-4">
              <div className="flex justify-center gap-2">
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      otpRefs.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    onPaste={idx === 0 ? handleOtpPaste : undefined}
                    className="w-12 h-14 text-center text-xl font-bold rounded-xl border-2 bg-slate-50 dark:bg-zinc-950 dark:text-white focus:outline-none transition-colors"
                    style={{ borderColor: digit ? BRAND.primary : "#D9DEE5" }}
                  />
                ))}
              </div>

              {otpError && (
                <div className="rounded-xl border p-3 text-sm font-semibold text-center" style={{ backgroundColor: BRAND.error + "1A", borderColor: BRAND.error + "33", color: BRAND.error }}>
                  <strong>Error:</strong> {otpError}
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifyingOtp}
                className="w-full flex items-center justify-center gap-2 rounded-2xl p-4 text-sm font-extrabold text-white shadow-lg transition-all disabled:opacity-50"
                style={{ backgroundColor: BRAND.primary }}
                onMouseEnter={e => !isVerifyingOtp && ((e.currentTarget as HTMLElement).style.backgroundColor = BRAND.primaryDark)}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = BRAND.primary)}
              >
                {isVerifyingOtp ? "Verifying..." : "Verify OTP →"}
              </button>
            </form>
          </div>
        )}

        {/* STEP C: IDENTITY CARD + CONTACT DETAILS */}
        {regStep === "details" && faydaProfile && (
          <div className="rounded-3xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/80 backdrop-blur-xl p-8 shadow-xl space-y-6">
            <button
              onClick={() => setRegStep("otp")}
              className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
            >
              ← Back to OTP
            </button>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold border" style={{ backgroundColor: BRAND.primaryLight, color: BRAND.primary, borderColor: BRAND.primary + "33" }}>
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Fayda Verified
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your Identity & Contact Details</h2>
            </div>

            {/* Identity Card */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 dark:border-zinc-800 dark:bg-zinc-950/60 p-5 space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-zinc-800">
                <span className="text-slate-500 dark:text-zinc-500">Full Name:</span>
                <span className="font-extrabold text-slate-900 dark:text-white text-sm">{faydaProfile.name}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-zinc-800">
                <span className="text-slate-500 dark:text-zinc-500">Fayda FAN ID:</span>
                <span className="font-bold" style={{ color: BRAND.primary }}>{formatFanDigits(faydaProfile.fanId)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-zinc-800">
                <span className="text-slate-500 dark:text-zinc-500">Date of Birth:</span>
                <span className="font-bold text-slate-800 dark:text-zinc-200">{faydaProfile.dob}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-zinc-800">
                <span className="text-slate-500 dark:text-zinc-500">Gender:</span>
                <span className="font-bold text-slate-800 dark:text-zinc-200">{faydaProfile.gender}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-zinc-500">Nationality:</span>
                <span className="font-bold text-slate-800 dark:text-zinc-200">{faydaProfile.nationality}</span>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleFinalRegistration} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                  Your Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => {
                    setContactPhone(e.target.value);
                    setDetailsError("");
                  }}
                  placeholder="+251 912 345 678"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                  Your Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => {
                    setContactEmail(e.target.value);
                    setDetailsError("");
                  }}
                  placeholder="athlete@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                  Create Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={contactPassword}
                  onChange={(e) => {
                    setContactPassword(e.target.value);
                    setDetailsError("");
                  }}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none transition-colors"
                />
              </div>

              {detailsError && (
                <div className="rounded-xl border p-3 text-sm font-semibold" style={{ backgroundColor: BRAND.error + "1A", borderColor: BRAND.error + "33", color: BRAND.error }}>
                  <strong>Error:</strong> {detailsError}
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-2xl p-4 text-sm font-extrabold text-white shadow-lg transition-all"
                style={{ backgroundColor: BRAND.secondary }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = BRAND.secondaryDark)}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = BRAND.secondary)}
              >
                Complete Registration
              </button>
            </form>
          </div>
        )}

        {/* STEP D: PENDING APPROVAL STATUS */}
        {regStep === "done" && registeredAthlete && (
          <div className="rounded-3xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/90 backdrop-blur-xl p-8 shadow-xl text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full text-3xl border" style={{ backgroundColor: BRAND.secondaryLight, color: BRAND.secondary, borderColor: BRAND.secondary + "33" }}>
              <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold font-mono border" style={{ backgroundColor: BRAND.warning + "1A", color: BRAND.warning, borderColor: BRAND.warning + "33" }}>
                Status: Pending Approval
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Registration Submitted Successfully!
              </h2>
              <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed max-w-md mx-auto">
                Your athlete registration has been received and is currently under review.
                <strong className="block mt-2">You will receive an email at {registeredAthlete.email} once your registration is approved.</strong>
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 dark:border-zinc-800 dark:bg-zinc-950/60 p-5 text-left text-xs font-mono space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Application ID:</span>
                <span className="font-bold text-slate-900 dark:text-white">{registeredAthlete.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Full Name:</span>
                <span className="font-bold text-slate-900 dark:text-white">{registeredAthlete.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Email:</span>
                <span className="font-bold text-slate-900 dark:text-white">{registeredAthlete.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Phone:</span>
                <span className="font-bold text-slate-900 dark:text-white">{registeredAthlete.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Fayda FAN:</span>
                <span className="font-bold" style={{ color: BRAND.primary }}>{formatFanDigits(registeredAthlete.fanId)}</span>
              </div>
            </div>

            <div className="rounded-xl border p-4 text-xs text-left" style={{ backgroundColor: BRAND.primaryLight, borderColor: BRAND.primary + "33", color: BRAND.primaryDark }}>
              <p className="font-bold mb-1">Next Steps:</p>
              <ul className="space-y-1 ml-4 list-disc">
                <li>Please check your email regularly for approval notifications</li>
                <li>The review process typically takes 1-3 business days</li>
                <li>Once approved, you&apos;ll receive login credentials to access the athlete portal</li>
              </ul>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-xs font-bold shadow-md transition-all hover:opacity-90"
                style={{ backgroundColor: BRAND.primary, color: "white" }}
              >
                Return to Home
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
