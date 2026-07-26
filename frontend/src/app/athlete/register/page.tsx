"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/common/ThemeToggle";

interface RegisteredClub {
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

export interface RegisteredAthleteProfile {
  id: string;
  fullName: string;
  faydaId: string;
  dob: string;
  gender: "Male" | "Female";
  phone: string;
  eventCategory: string;
  clubId: string;
  clubName: string;
  emergencyContact?: string;
  status: "Licensed & Active" | "Pending Fayda Check";
  issuedDate: string;
}

export default function AthleteSelfRegistrationPage() {
  // Wizard Progress Step: 1 = Personal Details, 2 = Club Association, 3 = Fayda ID Verification, 4 = Digital License Badge
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState<"Male" | "Female">("Male");
  const [phone, setPhone] = useState("");
  const [eventCategory, setEventCategory] = useState("Long Distance (5000m/10000m)");
  const [emergencyContact, setEmergencyContact] = useState("");

  // Optional Club Selection State
  const [selectedClubId, setSelectedClubId] = useState<string>("UNATTACHED"); // Default unattached

  // National ID Verification State
  const [faydaId, setFaydaId] = useState("");
  const [isVerifyingFayda, setIsVerifyingFayda] = useState(false);
  const [faydaVerificationStep, setFaydaVerificationStep] = useState<string | null>(null);

  // Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Registered Athlete Result
  const [registeredAthlete, setRegisteredAthlete] = useState<RegisteredAthleteProfile | null>(null);

  // Auto-format Fayda ID: FIN-XXXX-XXXX
  const formatFaydaId = (val: string) => {
    const cleaned = val.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (cleaned.startsWith("FIN")) {
      const nums = cleaned.slice(3);
      if (nums.length <= 4) return `FIN-${nums}`;
      return `FIN-${nums.slice(0, 4)}-${nums.slice(4, 8)}`;
    }
    return val.toUpperCase();
  };

  // Step 1 Validation (Personal Profile)
  const validateStep1 = (): boolean => {
    const errs: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 3) {
      errs.fullName = "Full legal name is required (minimum 3 characters).";
    }

    if (!dob) {
      errs.dob = "Date of birth is required.";
    } else {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (isNaN(age) || age < 12) {
        errs.dob = "Athlete must be at least 12 years old for federation registration.";
      }
    }

    const phoneRegex = /^(\+251|0)[79]\d{8}$/;
    const cleanPhone = phone.replace(/\s+/g, "");
    if (!phone.trim()) {
      errs.phone = "Contact phone number is required.";
    } else if (!phoneRegex.test(cleanPhone)) {
      errs.phone = "Invalid Ethiopian phone format (+251 9... or 09...).";
    }

    if (emergencyContact.trim()) {
      const cleanEm = emergencyContact.replace(/\s+/g, "");
      if (!phoneRegex.test(cleanEm)) {
        errs.emergencyContact = "Invalid emergency contact phone format.";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 3 Validation (Fayda National ID)
  const validateStep3 = (): boolean => {
    const errs: Record<string, string> = {};
    const faydaRegex = /^FIN-\d{4}-\d{4}$/;

    if (!faydaId.trim()) {
      errs.faydaId = "Fayda National ID is required.";
    } else if (!faydaRegex.test(faydaId.trim())) {
      errs.faydaId = "Invalid Fayda ID format! Must match FIN-XXXX-XXXX (e.g., FIN-8849-2049).";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Handle Moving from Step 1 to Step 2
  const handleProceedToClub = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  // Handle Moving from Step 2 to Step 3
  const handleProceedToFayda = () => {
    setCurrentStep(3);
  };

  // Handle Final Submission & Fayda Verification Simulation
  const handleVerifyAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setIsVerifyingFayda(true);
    setFaydaVerificationStep("Querying Fayda Identity Registry API...");

    // Stepwise Verification Simulation
    setTimeout(() => {
      setFaydaVerificationStep("Validating Biometric Fingerprint & Demographics...");
      setTimeout(() => {
        setFaydaVerificationStep("Generating EAF Digital License Badge...");
        setTimeout(() => {
          let assignedClubName = "Unattached / Independent Athlete";
          if (selectedClubId !== "UNATTACHED") {
            const found = AVAILABLE_CLUBS.find((c) => c.id === selectedClubId);
            if (found) assignedClubName = found.name;
          }

          const generatedId = `EAF-ATH-2026-${Math.floor(100 + Math.random() * 900)}`;
          const profile: RegisteredAthleteProfile = {
            id: generatedId,
            fullName: fullName.trim(),
            faydaId: faydaId.trim(),
            dob,
            gender,
            phone: phone.trim(),
            eventCategory,
            clubId: selectedClubId,
            clubName: assignedClubName,
            emergencyContact: emergencyContact.trim() || undefined,
            status: "Licensed & Active",
            issuedDate: new Date().toISOString().split("T")[0],
          };

          setRegisteredAthlete(profile);
          setIsVerifyingFayda(false);
          setFaydaVerificationStep(null);
          setCurrentStep(4);
        }, 800);
      }, 800);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-200">
      {/* STANDALONE ATHLETE PORTAL HEADER */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 dark:border-zinc-800/80 dark:bg-zinc-900/60 backdrop-blur-xl px-4 sm:px-6 py-3.5">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-white border border-slate-200 dark:bg-zinc-900 dark:border-zinc-800 p-1 shadow-md">
              <Image src="/logo.png" alt="EAF Logo" fill className="object-contain" priority />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Athlete Self-Service Portal
                </span>
                <span className="rounded-full bg-yellow-500/10 px-2.5 py-0.5 text-[10px] font-mono font-bold text-yellow-700 dark:text-yellow-400 border border-yellow-500/20">
                  Self Registration
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-mono">
                Ethiopian Athletics Federation · Proclamation No. 1284/2023 Compliant
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              ← Portal Hub
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="mx-auto max-w-4xl px-4 sm:px-6 py-8 space-y-8">
        {/* WELCOME CARD */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40 backdrop-blur-md shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-mono font-bold text-yellow-700 dark:text-yellow-400 border border-yellow-500/20">
              Self-Service Athlete License
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-zinc-500">
              Fayda API v1.1
            </span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Register as an Athlete
          </h1>
          <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
            Create your official Ethiopian Athletics Federation profile, verify your Fayda National ID, and receive your digital competition badge.
          </p>
        </div>

        {/* REGISTRATION PROGRESS TRACKER BAR */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/40 backdrop-blur-md shadow-sm space-y-4">
          <div className="flex items-center justify-between text-xs font-bold font-mono">
            <span className="text-slate-700 dark:text-zinc-300">Registration Progress</span>
            <span className="text-yellow-600 dark:text-yellow-400">
              Step {currentStep} of 4 ({currentStep === 1 ? "25%" : currentStep === 2 ? "50%" : currentStep === 3 ? "75%" : "100%"})
            </span>
          </div>

          {/* Visual Step Progress Line */}
          <div className="relative h-2 w-full rounded-full bg-slate-200 dark:bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-yellow-500 transition-all duration-500 ease-out"
              style={{ width: `${currentStep * 25}%` }}
            />
          </div>

          {/* Step Labels */}
          <div className="grid grid-cols-4 gap-1 text-center text-[10px] font-mono font-semibold">
            <div className={currentStep >= 1 ? "text-yellow-600 dark:text-yellow-400 font-bold" : "text-slate-400 dark:text-zinc-600"}>
              1. Profile & Event
            </div>
            <div className={currentStep >= 2 ? "text-yellow-600 dark:text-yellow-400 font-bold" : "text-slate-400 dark:text-zinc-600"}>
              2. Club Association
            </div>
            <div className={currentStep >= 3 ? "text-yellow-600 dark:text-yellow-400 font-bold" : "text-slate-400 dark:text-zinc-600"}>
              3. Fayda National ID
            </div>
            <div className={currentStep >= 4 ? "text-yellow-600 dark:text-yellow-400 font-bold" : "text-slate-400 dark:text-zinc-600"}>
              4. License Badge
            </div>
          </div>
        </div>

        {/* STEP 1: ATHLETE SIGNUP FORM (PERSONAL PROFILE & EVENT) */}
        {currentStep === 1 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 dark:border-zinc-800 dark:bg-zinc-900/40 backdrop-blur-md shadow-sm space-y-6 animate-fadeIn">
            <div className="border-b border-slate-100 dark:border-zinc-800 pb-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-xs font-bold">
                  1
                </span>
                Personal Profile & Primary Event
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
                Enter your official legal name and athletic event discipline.
              </p>
            </div>

            <form onSubmit={handleProceedToClub} className="space-y-4 text-xs">
              {/* Full Legal Name */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Tamirat Tola"
                  className={`w-full rounded-xl border px-4 py-2.5 text-slate-900 placeholder-slate-400 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-600 focus:outline-none ${
                    errors.fullName
                      ? "border-red-500 bg-red-500/5 focus:border-red-500"
                      : "border-slate-200 bg-slate-50 dark:border-zinc-800 focus:border-yellow-500"
                  }`}
                />
                {errors.fullName ? (
                  <p className="mt-1 text-[11px] font-semibold text-red-500">{errors.fullName}</p>
                ) : (
                  <p className="mt-1 text-[10px] text-slate-500 dark:text-zinc-500">
                    Must match government records on Fayda National ID card.
                  </p>
                )}
              </div>

              {/* Grid: DOB & Gender */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className={`w-full rounded-xl border px-4 py-2 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100 focus:outline-none font-mono ${
                      errors.dob
                        ? "border-red-500 bg-red-500/5 focus:border-red-500"
                        : "border-slate-200 bg-slate-50 dark:border-zinc-800 focus:border-yellow-500"
                    }`}
                  />
                  {errors.dob ? (
                    <p className="mt-1 text-[11px] font-semibold text-red-500">{errors.dob}</p>
                  ) : (
                    <p className="mt-1 text-[10px] text-slate-500 dark:text-zinc-500">
                      Minimum age required: 12 years old.
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">
                    Gender Category *
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as "Male" | "Female")}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 focus:border-yellow-500 focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              {/* Phone & Primary Event */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+251 911 234 567"
                    className={`w-full rounded-xl border px-4 py-2.5 text-slate-900 placeholder-slate-400 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-600 focus:outline-none ${
                      errors.phone
                        ? "border-red-500 bg-red-500/5 focus:border-red-500"
                        : "border-slate-200 bg-slate-50 dark:border-zinc-800 focus:border-yellow-500"
                    }`}
                  />
                  {errors.phone ? (
                    <p className="mt-1 text-[11px] font-semibold text-red-500">{errors.phone}</p>
                  ) : (
                    <p className="mt-1 text-[10px] text-slate-500 dark:text-zinc-500 font-mono">
                      Format: +251 911 234 567 or 0911234567
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">
                    Primary Event Category *
                  </label>
                  <select
                    value={eventCategory}
                    onChange={(e) => setEventCategory(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 focus:border-yellow-500 focus:outline-none"
                  >
                    <option value="Sprints (100m/200m/400m)">Sprints (100m / 200m / 400m)</option>
                    <option value="Middle Distance (800m/1500m)">Middle Distance (800m / 1500m)</option>
                    <option value="Long Distance (5000m/10000m)">Long Distance (5000m / 10000m)</option>
                    <option value="Marathon & Road Running">Marathon & Road Running</option>
                    <option value="3000m Steeplechase">3000m Steeplechase</option>
                    <option value="Jumps & Throws">Jumps & Throws</option>
                  </select>
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">
                  Emergency Phone Contact (Optional)
                </label>
                <input
                  type="text"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  placeholder="+251 911 000 111"
                  className={`w-full rounded-xl border px-4 py-2.5 text-slate-900 placeholder-slate-400 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-600 focus:outline-none ${
                    errors.emergencyContact
                      ? "border-red-500 bg-red-500/5 focus:border-red-500"
                      : "border-slate-200 bg-slate-50 dark:border-zinc-800 focus:border-yellow-500"
                  }`}
                />
                {errors.emergencyContact && (
                  <p className="mt-1 text-[11px] font-semibold text-red-500">{errors.emergencyContact}</p>
                )}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-yellow-500 px-6 py-3 text-xs font-bold text-slate-950 shadow-lg shadow-yellow-500/20 transition-all hover:bg-yellow-400 active:scale-95"
                >
                  Proceed to Club Selection →
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: OPTIONAL CLUB SELECTOR */}
        {currentStep === 2 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 dark:border-zinc-800 dark:bg-zinc-900/40 backdrop-blur-md shadow-sm space-y-6 animate-fadeIn">
            <div className="border-b border-slate-100 dark:border-zinc-800 pb-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-xs font-bold">
                  2
                </span>
                Optional Club Association
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
                You may choose an accredited athletics club to represent, or skip to register as an independent athlete.
              </p>
            </div>

            {/* Skip Club Banner Option */}
            <div
              onClick={() => setSelectedClubId("UNATTACHED")}
              className={`cursor-pointer rounded-2xl border p-5 transition-all flex items-center justify-between ${
                selectedClubId === "UNATTACHED"
                  ? "border-yellow-500 bg-yellow-500/10 shadow-md"
                  : "border-slate-200 bg-slate-50/50 hover:border-slate-300 dark:border-zinc-800 dark:bg-zinc-950/50 dark:hover:border-zinc-700"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 font-bold text-base">
                  🏃
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">
                    Skip Club Association (Register as Independent Athlete)
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 mt-0.5">
                    Participate in open federation trials, championships, and individual races unattached.
                  </p>
                </div>
              </div>
              <div
                className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                  selectedClubId === "UNATTACHED"
                    ? "border-yellow-500 bg-yellow-500"
                    : "border-slate-300 dark:border-zinc-700"
                }`}
              >
                {selectedClubId === "UNATTACHED" && <span className="h-2 w-2 rounded-full bg-slate-950" />}
              </div>
            </div>

            {/* Select Club Cards Grid */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider font-mono">
                Or Select an Accredited Club
              </h3>

              <div className="grid gap-3 sm:grid-cols-2">
                {AVAILABLE_CLUBS.map((c) => {
                  const isSelected = selectedClubId === c.id;
                  return (
                    <div
                      key={c.id}
                      onClick={() => setSelectedClubId(c.id)}
                      className={`cursor-pointer rounded-xl border p-4 text-xs transition-all space-y-2 ${
                        isSelected
                          ? "border-yellow-500 bg-yellow-500/10 shadow-sm"
                          : "border-slate-200 bg-slate-50 dark:border-zinc-800 dark:bg-zinc-950/60 hover:border-slate-300 dark:hover:border-zinc-700"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-zinc-100">{c.name}</h4>
                          <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-mono mt-0.5">
                            {c.region} · {c.category}
                          </p>
                        </div>
                        <div
                          className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? "border-yellow-500 bg-yellow-500"
                              : "border-slate-300 dark:border-zinc-700"
                          }`}
                        >
                          {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-slate-950" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                ← Back to Profile
              </button>

              <button
                type="button"
                onClick={handleProceedToFayda}
                className="flex items-center gap-2 rounded-xl bg-yellow-500 px-6 py-3 text-xs font-bold text-slate-950 shadow-lg shadow-yellow-500/20 transition-all hover:bg-yellow-400 active:scale-95"
              >
                Proceed to National ID Check →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: NATIONAL FAYDA ID VERIFICATION UI */}
        {currentStep === 3 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 dark:border-zinc-800 dark:bg-zinc-900/40 backdrop-blur-md shadow-sm space-y-6 animate-fadeIn">
            <div className="border-b border-slate-100 dark:border-zinc-800 pb-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-xs font-bold">
                  3
                </span>
                Fayda National ID Verification
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
                Verify your national identity card governed by Proclamation No. 1284/2023.
              </p>
            </div>

            <form onSubmit={handleVerifyAndSubmit} className="space-y-5 text-xs">
              {/* Fayda ID Card Input Box */}
              <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/5 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block font-bold text-slate-800 dark:text-zinc-200">
                    Fayda National ID Number (FIN) *
                  </label>
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Official API
                  </span>
                </div>

                <input
                  type="text"
                  value={faydaId}
                  onChange={(e) => setFaydaId(formatFaydaId(e.target.value))}
                  placeholder="FIN-8849-2049"
                  maxLength={13}
                  disabled={isVerifyingFayda}
                  className={`w-full rounded-xl border px-4 py-3 font-mono text-base tracking-wider text-slate-900 placeholder-slate-400 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-600 focus:outline-none ${
                    errors.faydaId
                      ? "border-red-500 bg-red-500/5 focus:border-red-500"
                      : "border-slate-300 bg-white dark:border-zinc-800 focus:border-yellow-500"
                  }`}
                />

                {errors.faydaId ? (
                  <p className="text-[11px] font-semibold text-red-500">{errors.faydaId}</p>
                ) : (
                  <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-mono leading-relaxed">
                    Enter the 8-digit Fayda number on your digital resident ID card. Format: FIN-XXXX-XXXX (e.g. FIN-7712-9041).
                  </p>
                )}
              </div>

              {/* SIMULATED VERIFICATION LOADING STATE UI */}
              {isVerifyingFayda && (
                <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-6 text-center space-y-3 animate-pulse">
                  <div className="mx-auto h-8 w-8 animate-spin rounded-full border-3 border-blue-500 border-t-transparent" />
                  <div>
                    <h4 className="font-bold text-blue-700 dark:text-blue-300 text-sm">
                      Fayda Identity Verification in Progress...
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-zinc-400 font-mono mt-1">
                      {faydaVerificationStep}
                    </p>
                  </div>
                </div>
              )}

              {/* Summary Card Before Verification */}
              <div className="rounded-xl bg-slate-50 dark:bg-zinc-950/60 p-4 border border-slate-200 dark:border-zinc-800 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 font-mono block">
                  Registration Summary
                </span>
                <div className="grid grid-cols-2 gap-2 text-slate-700 dark:text-zinc-300">
                  <div>Name: <span className="font-bold text-slate-900 dark:text-white">{fullName}</span></div>
                  <div>Event: <span className="font-bold text-slate-900 dark:text-white">{eventCategory}</span></div>
                  <div>Club: <span className="font-bold text-blue-600 dark:text-blue-400">{selectedClubId === "UNATTACHED" ? "Independent" : AVAILABLE_CLUBS.find(c => c.id === selectedClubId)?.name}</span></div>
                  <div>Phone: <span className="font-mono font-bold text-slate-900 dark:text-white">{phone}</span></div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  disabled={isVerifyingFayda}
                  onClick={() => setCurrentStep(2)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 disabled:opacity-50"
                >
                  ← Back to Club Selection
                </button>

                <button
                  type="submit"
                  disabled={isVerifyingFayda}
                  className="flex items-center gap-2 rounded-xl bg-yellow-500 px-7 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-yellow-500/20 transition-all hover:bg-yellow-400 active:scale-95 disabled:opacity-50"
                >
                  {isVerifyingFayda ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                      Verifying Fayda ID...
                    </>
                  ) : (
                    "Verify Fayda ID & Complete Registration"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 4: SUBMISSION STATUS & DIGITAL EAF ATHLETE LICENSE BADGE */}
        {currentStep === 4 && registeredAthlete && (
          <div className="space-y-6 animate-fadeIn">
            {/* STATUS BANNER */}
            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-slate-900 dark:text-white shadow-lg space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white font-bold text-lg shadow-md">
                  ✓
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-emerald-800 dark:text-emerald-300">
                    Athlete Registration Successful & Fayda Verified!
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-zinc-300 font-mono mt-0.5">
                    Status: <span className="font-bold text-emerald-600 dark:text-emerald-400">Licensed & Active</span> · Proclamation No. 1284/2023
                  </p>
                </div>
              </div>
            </div>

            {/* DIGITAL ATHLETE LICENSE BADGE CARD */}
            <div className="mx-auto max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 shadow-2xl space-y-6 p-7 relative">
              {/* Background Glow */}
              <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-yellow-500/10 blur-3xl" />

              {/* Card Top Header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-white border border-slate-200 dark:bg-zinc-950 p-1">
                    <Image src="/logo.png" alt="EAF" fill className="object-contain" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">
                      Ethiopian Athletics Federation
                    </h3>
                    <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-mono">
                      Official Digital Athlete Pass
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  ACTIVE LICENSE
                </span>
              </div>

              {/* Badge Details Body */}
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between rounded-xl bg-yellow-500/10 p-3.5 border border-yellow-500/20">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-yellow-700 dark:text-yellow-400 font-bold block">
                      License Badge ID
                    </span>
                    <span className="font-mono text-base font-extrabold text-slate-900 dark:text-white">
                      {registeredAthlete.id}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-mono text-slate-500 dark:text-zinc-400 block">
                      Issued Date
                    </span>
                    <span className="font-mono font-bold text-slate-700 dark:text-zinc-300">
                      {registeredAthlete.issuedDate}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-mono block">Full Name</span>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{registeredAthlete.fullName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-mono block">Fayda National ID</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-zinc-200">{registeredAthlete.faydaId}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-mono block">Primary Event</span>
                    <span className="font-medium text-slate-800 dark:text-zinc-200">{registeredAthlete.eventCategory}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-mono block">Club Representation</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">{registeredAthlete.clubName}</span>
                  </div>
                </div>

                {/* Barcode Graphic Placeholder */}
                <div className="pt-3 border-t border-slate-100 dark:border-zinc-800/80 flex flex-col items-center gap-1.5">
                  <div className="h-10 w-full bg-slate-900 dark:bg-zinc-100 rounded flex items-center justify-around px-2">
                    {Array.from({ length: 32 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-7 ${i % 3 === 0 ? "w-1.5" : i % 2 === 0 ? "w-1" : "w-0.5"} ${
                          i % 5 === 0 ? "bg-transparent" : "bg-white dark:bg-slate-950"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 dark:text-zinc-500">
                    VERIFIED EAF COMP-PASS · {registeredAthlete.id}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(1);
                    setRegisteredAthlete(null);
                    setFullName("");
                    setFaydaId("");
                    setPhone("");
                  }}
                  className="flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  Register Another Athlete
                </button>
                <Link
                  href="/"
                  className="flex-1 flex items-center justify-center rounded-xl bg-yellow-500 py-2.5 text-xs font-bold text-slate-950 shadow-md hover:bg-yellow-400"
                >
                  Return to Portal Hub →
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
