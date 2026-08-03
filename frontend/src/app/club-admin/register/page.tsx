"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { useAuth } from "@/context/AuthContext";

export interface RosterMember {
  id: string;
  memberType: "Athlete" | "Coach";
  fullName: string;
  faydaId: string;
  clubId: string;
  clubName: string;
  phone: string;
  status: "Pending Approval" | "Fayda Verified & Active";
  registeredDate: string;
  dob?: string;
  gender?: "Male" | "Female";
  eventCategory?: string;
}

interface PendingAthleteSubmission {
  id: string;
  fullName: string;
  fanId: string;
  clubId: string;
  clubName: string;
  phone: string;
  status?: string;
  issuedDate?: string;
  dob?: string;
  gender?: "Male" | "Female";
  eventCategory?: string;
}

export interface CompetitionEvent {
  id: string;
  title: string;
  status: "LIVE" | "UPCOMING";
  category: string;
  dateOrTime: string;
  venue: string;
  timingSystem: string;
  participatingAthletes: number;
  description: string;
}

const INITIAL_MEMBERS: RosterMember[] = [
  {
    id: "EAF-ATH-2026-101",
    memberType: "Athlete",
    fullName: "Tamirat Tola",
    faydaId: "1223 5568 9888 1011",
    clubId: "EAF-CLB-101",
    clubName: "Defence Athletics Club",
    phone: "+251 911 402 910",
    status: "Fayda Verified & Active",
    registeredDate: "2026-01-15",
    dob: "1991-08-11",
    gender: "Male",
    eventCategory: "Marathon & Road Running",
  },
  {
    id: "EAF-ATH-2026-102",
    memberType: "Athlete",
    fullName: "Letesenbet Gidey",
    faydaId: "3382 1048 5592 1022",
    clubId: "EAF-CLB-102",
    clubName: "Arada Athletics Club",
    phone: "+251 922 849 204",
    status: "Fayda Verified & Active",
    registeredDate: "2026-02-01",
    dob: "1998-03-20",
    gender: "Female",
    eventCategory: "Long Distance (5000m/10000m)",
  },
  {
    id: "EAF-ATH-2026-103",
    memberType: "Athlete",
    fullName: "Berihu Aregawi",
    faydaId: "5512 8840 9182 3044",
    clubId: "EAF-CLB-102",
    clubName: "Arada Athletics Club",
    phone: "+251 911 884 201",
    status: "Fayda Verified & Active",
    registeredDate: "2026-03-10",
    dob: "2001-02-28",
    gender: "Male",
    eventCategory: "5000m / 10,000m",
  },
];

const COMPETITION_EVENTS: CompetitionEvent[] = [
  {
    id: "EVT-LIVE-01",
    title: "Ethiopian National Track & Field Championship — 10,000m Final",
    status: "LIVE",
    category: "Senior Men & Women",
    dateOrTime: "In Progress (Lap 18/25)",
    venue: "Addis Ababa National Stadium",
    timingSystem: "FinishLynx Photo-Finish + RFID Mat",
    participatingAthletes: 24,
    description: "National Olympic selection final trials. Active RFID transponder tracking on lap 18.",
  },
  {
    id: "EVT-LIVE-02",
    title: "Hawassa Regional Athletics Cup — 800m Semi-Finals",
    status: "LIVE",
    category: "U20 Division",
    dateOrTime: "In Progress (Heat 2)",
    venue: "Hawassa University Stadium",
    timingSystem: "FinishLynx Camera",
    participatingAthletes: 16,
    description: "Regional club championship heat qualification.",
  },
  {
    id: "EVT-UPCOMING-01",
    title: "Jan Meda International Cross Country Championship",
    status: "UPCOMING",
    category: "Senior & U20",
    dateOrTime: "Aug 15, 2026 • 08:30 AM",
    venue: "Jan Meda Grounds, Addis Ababa",
    timingSystem: "Dual RFID Transponder Chip",
    participatingAthletes: 120,
    description: "World Athletics Cross Country Tour Gold series qualification meet.",
  },
  {
    id: "EVT-UPCOMING-02",
    title: "Great Ethiopian Road Race 10K Trials",
    status: "UPCOMING",
    category: "Open Club League",
    dateOrTime: "Sep 02, 2026 • 07:00 AM",
    venue: "Meskel Square, Addis Ababa",
    timingSystem: "BibTag Transponder Timing",
    participatingAthletes: 450,
    description: "Annual national road race league opener.",
  },
];

export default function StandaloneClubAdminRegisterPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"dashboard" | "add-athlete" | "roster" | "events">("dashboard");
  const [members, setMembers] = useState<RosterMember[]>(INITIAL_MEMBERS);
  const [eventsList] = useState<CompetitionEvent[]>(COMPETITION_EVENTS);

  // ── In-House Athlete Registration – multi-step state ──────────────────────
  // Step A: Fayda FAN entry
  const [regStep, setRegStep] = useState<"fayda" | "otp" | "details" | "done">("fayda");
  const [newAthleteFan, setNewAthleteFan] = useState("");
  const [fanLookupError, setFanLookupError] = useState("");
  const [isFetchingFayda, setIsFetchingFayda] = useState(false);

  // Step B: OTP
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otpError, setOtpError] = useState("");
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpResendCooldown, setOtpResendCooldown] = useState(0);

  // Step C: identity card returned by Fayda (simulated)
  const [faydaProfile, setFaydaProfile] = useState<{
    fullName: string; dob: string; gender: "Male" | "Female";
    nationality: string; maskedPhone: string;
  } | null>(null);

  // Step C: additional contact info & event category
  const [newAthletePhone, setNewAthletePhone] = useState("");
  const [newAthleteEmail, setNewAthleteEmail] = useState("");
  const [newAthletePassword, setNewAthletePassword] = useState("");
  const [newAthleteCategory, setNewAthleteCategory] = useState("Long Distance (5k / 10k / Marathon)");
  const [detailsError, setDetailsError] = useState("");

  const [regSuccessMessage, setRegSuccessMessage] = useState("");

  // Load pending athlete submissions from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("eacrms_pending_athletes");
      if (stored) {
        const pendingList = JSON.parse(stored);
        const mappedPending: RosterMember[] = pendingList.map((p: PendingAthleteSubmission) => ({
          id: p.id,
          memberType: "Athlete",
          fullName: p.fullName,
          faydaId: p.fanId,
          clubId: p.clubId,
          clubName: p.clubName,
          phone: p.phone,
          status: p.status || "Pending Approval",
          registeredDate: p.issuedDate || new Date().toISOString().split("T")[0],
          dob: p.dob,
          gender: p.gender,
          eventCategory: p.eventCategory,
        }));

        // eslint-disable-next-line react-hooks/set-state-in-effect -- load pending submissions on mount
        setMembers((prev) => {
          const ids = new Set(prev.map((m) => m.id));
          const newEntries = mappedPending.filter((m) => !ids.has(m.id));
          return [...newEntries, ...prev];
        });
      }
    } catch (e) {
      console.error("Error reading pending athletes", e);
    }
  }, []);

  // Format 16-digit FAN with spaces
  const formatFanDigits = (val: string) => {
    const raw = val.replace(/\D/g, "").slice(0, 16);
    const groups = raw.match(/.{1,4}/g);
    return groups ? groups.join(" ") : raw;
  };

  // OTP resend countdown
  useEffect(() => {
    if (otpResendCooldown <= 0) return;
    const t = setTimeout(() => setOtpResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [otpResendCooldown]);

  // Step A: Admin enters Fayda FAN → simulate lookup + send OTP
  const handleFanLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setFanLookupError("");
    const clean = newAthleteFan.replace(/\D/g, "");
    if (clean.length !== 16) {
      setFanLookupError(`FAN must be exactly 16 digits (${clean.length} entered).`);
      return;
    }
    setIsFetchingFayda(true);
    // Simulate Fayda API: fetch identity + dispatch OTP to athlete's registered phone
    setTimeout(() => {
      setFaydaProfile({
        fullName: "Abebe Bikila",
        dob: "2001-03-22",
        gender: "Male",
        nationality: "Ethiopian",
        maskedPhone: "+251 9** *** 910",
      });
      setIsFetchingFayda(false);
      setOtpDigits(["", "", "", "", "", ""]);
      setOtpResendCooldown(60);
      setRegStep("otp");
    }, 900);
  };

  // Step B: Verify OTP
  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError("");
    const code = otpDigits.join("");
    if (code.length !== 6) {
      setOtpError("Please enter all 6 digits of the OTP.");
      return;
    }
    setIsVerifyingOtp(true);
    // Simulate OTP check (demo: any 6 digits pass)
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

  const handleResendOtp = () => {
    if (otpResendCooldown > 0) return;
    setOtpDigits(["", "", "", "", "", ""]);
    setOtpError("");
    setOtpResendCooldown(60);
  };

  // Step C: Submit final contact details + register
  const handleFinalRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    setDetailsError("");
    if (!newAthletePhone.trim()) {
      setDetailsError("Phone number is required.");
      return;
    }
    if (!newAthleteEmail.trim() || !newAthleteEmail.includes("@")) {
      setDetailsError("Please enter a valid email address.");
      return;
    }
    if (newAthletePassword.length < 6) {
      setDetailsError("Password must be at least 6 characters.");
      return;
    }
    if (!faydaProfile) return;

    const clubName = user?.name ? user.name.replace(" Admin", "") : "Arada Athletics Club";
    const generatedId = `EAF-ATH-2026-${Math.floor(100 + Math.random() * 900)}`;

    const newMember: RosterMember = {
      id: generatedId,
      memberType: "Athlete",
      fullName: faydaProfile.fullName,
      faydaId: formatFanDigits(newAthleteFan),
      clubId: "EAF-CLB-102",
      clubName,
      phone: newAthletePhone.trim(),
      status: "Fayda Verified & Active",
      registeredDate: new Date().toISOString().split("T")[0],
      dob: faydaProfile.dob,
      gender: faydaProfile.gender,
      eventCategory: newAthleteCategory,
    };

    setMembers((prev) => [newMember, ...prev]);
    setRegStep("done");
    setRegSuccessMessage(
      `${faydaProfile.fullName} (FAN: ${formatFanDigits(newAthleteFan)}) successfully registered to ${clubName}.`
    );
    setTimeout(() => {
      setRegStep("fayda");
      setNewAthleteFan("");
      setNewAthletePhone("");
      setNewAthleteEmail("");
      setNewAthletePassword("");
      setFaydaProfile(null);
      setRegSuccessMessage("");
    }, 6000);
  };

  // Approve a pending athlete
  const handleApproveAthlete = (id: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: "Fayda Verified & Active" } : m))
    );
  };

  const currentClubName = user?.name ? user.name.replace(" Admin", "") : "Arada Athletics Club";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-200">
      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 dark:border-zinc-800/80 dark:bg-zinc-900/80 backdrop-blur-xl px-4 sm:px-8 py-3.5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl bg-white border border-slate-200 dark:bg-zinc-900 dark:border-zinc-800 p-1 shadow-sm">
                <Image src="/logo.png" alt="EAF Logo" fill className="object-contain" priority />
              </div>
              <div>
                <h1 className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">
                  Club Admin Portal
                </h1>
                <p className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  {currentClubName}
                </p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-1.5 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-all"
            >
              Sign Out
            </Link>
          </div>
        </div>
      </header>

      {/* DASHBOARD CONTAINER */}
      <main className="mx-auto max-w-7xl px-4 sm:px-8 py-8 space-y-8">

        {/* TAB NAVIGATION BAR */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-zinc-800 pb-4 gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* 1. Dashboard Tab */}
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all ${activeTab === "dashboard"
                ? "bg-slate-900 text-white dark:bg-zinc-100 dark:text-slate-900 shadow-md"
                : "bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                }`}
            >
              Dashboard
            </button>

            {/* 2. In-House Register Athlete Tab */}
            <button
              onClick={() => setActiveTab("add-athlete")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all ${activeTab === "add-athlete"
                ? "text-white shadow-md"
                : "bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              style={activeTab === "add-athlete" ? { backgroundColor: "#0140A7" } : {}}
            >
              Register New Athlete
            </button>

            {/* 3. Club Roster Tab */}
            <button
              onClick={() => setActiveTab("roster")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all ${activeTab === "roster"
                ? "text-white shadow-md"
                : "bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              style={activeTab === "roster" ? { backgroundColor: "#0140A7" } : {}}
            >
              Club Roster & Applications
              {members.filter((m) => m.status === "Pending Approval").length > 0 && (
                <span className="rounded-full px-2 py-0.5 text-[10px] font-black text-slate-950" style={{ backgroundColor: "#F59E0B" }}>
                  {members.filter((m) => m.status === "Pending Approval").length}
                </span>
              )}
            </button>

            {/* 4. Events Tab */}
            <button
              onClick={() => setActiveTab("events")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all ${activeTab === "events"
                ? "text-white shadow-md"
                : "bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              style={activeTab === "events" ? { backgroundColor: "#0140A7" } : {}}
            >
              Live & Upcoming Events
              <span className="flex h-2 w-2 rounded-full animate-ping" style={{ backgroundColor: "#D32F2F" }} />
            </button>
          </div>
        </div>

        {/* 1. SIMPLE OVERVIEW DASHBOARD (REQUIREMENT 1) */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {currentClubName} Dashboard
                </h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  Overview of active athletes, pending registrations, and live competition meets.
                </p>
              </div>

              <button
                onClick={() => setActiveTab("add-athlete")}
                className="rounded-xl text-white font-extrabold px-4 py-2.5 text-xs shadow-md transition-all shrink-0"
                style={{ backgroundColor: "#0140A7" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "#0A4870")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "#0140A7")}
              >
                + Register Athlete to Club Roster
              </button>
            </div>

            {/* STAT METRIC CARDS */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/60 shadow-sm space-y-2">
                <p className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">Total Club Athletes</p>
                <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{members.length}</p>
                <p className="text-xs font-semibold" style={{ color: "#2E7D32" }}>Active Roster License</p>
              </div>

              <div className="rounded-2xl border p-6 shadow-sm space-y-2" style={{ borderColor: "rgba(1,64,167,0.2)", backgroundColor: "rgba(1,64,167,0.05)" }}>
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#0140A7" }}>Fayda ID Verified</p>
                <p className="text-3xl font-extrabold" style={{ color: "#0140A7" }}>
                  {members.filter((m) => m.status === "Fayda Verified & Active").length}
                </p>
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-mono">16-Digit FAN Validated</p>
              </div>

              <div className="rounded-2xl border p-6 shadow-sm space-y-2" style={{ borderColor: "rgba(245,158,11,0.2)", backgroundColor: "rgba(245,158,11,0.05)" }}>
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#F59E0B" }}>Pending Approvals</p>
                <p className="text-3xl font-extrabold" style={{ color: "#F59E0B" }}>
                  {members.filter((m) => m.status === "Pending Approval").length}
                </p>
                <p className="text-xs text-slate-500 dark:text-zinc-400">Awaiting Club Review</p>
              </div>

              <div className="rounded-2xl border p-6 shadow-sm space-y-2" style={{ borderColor: "rgba(211,47,47,0.2)", backgroundColor: "rgba(211,47,47,0.05)" }}>
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#D32F2F" }}>Active Competitions</p>
                <p className="text-3xl font-extrabold" style={{ color: "#D32F2F" }}>
                  {eventsList.filter((e) => e.status === "LIVE").length} LIVE
                </p>
                <p className="text-xs text-slate-500 dark:text-zinc-400">In Progress Meets</p>
              </div>
            </div>

            {/* QUICK OVERVIEW GRID */}
            <div className="grid lg:grid-cols-12 gap-8">
              {/* RECENT ATHLETES SUMMARY */}
              <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/40 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-3">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Athlete Entries</h3>
                  <button onClick={() => setActiveTab("roster")} className="text-xs font-bold hover:underline" style={{ color: "#0140A7" }}>
                    View Full Roster →
                  </button>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-zinc-800 text-xs">
                  {members.slice(0, 4).map((m) => (
                    <div key={m.id} className="py-3 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{m.fullName}</p>
                        <p className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">FAN: {m.faydaId}</p>
                      </div>
                      <span
                        className="rounded-full px-2.5 py-1 text-[10px] font-bold font-mono"
                        style={m.status === "Pending Approval"
                          ? { backgroundColor: "rgba(245,158,11,0.1)", color: "#F59E0B" }
                          : { backgroundColor: "rgba(46,125,50,0.1)", color: "#2E7D32" }}
                      >
                        {m.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* LIVE EVENTS WIDGET */}
              <div className="lg:col-span-5 rounded-3xl border p-6 shadow-sm space-y-4" style={{ borderColor: "rgba(211,47,47,0.2)", background: "linear-gradient(to bottom right, rgba(211,47,47,0.05), white)" }}>
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full animate-ping" style={{ backgroundColor: "#D32F2F" }} />
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Live Event Status</h3>
                  </div>
                  <button onClick={() => setActiveTab("events")} className="text-xs font-bold hover:underline" style={{ color: "#D32F2F" }}>
                    All Events →
                  </button>
                </div>

                {eventsList.filter((e) => e.status === "LIVE").slice(0, 1).map((ev) => (
                  <div key={ev.id} className="space-y-3 text-xs">
                    <p className="font-extrabold text-slate-900 dark:text-white">{ev.title}</p>
                    <p className="text-slate-600 dark:text-zinc-400">{ev.description}</p>
                    <div className="p-3 rounded-xl bg-white dark:bg-zinc-950 font-mono text-[11px] space-y-1">
                      <p className="text-slate-500">📍 Venue: {ev.venue}</p>
                      <p className="font-bold" style={{ color: "#2E7D32" }}>⏱ Hardware: {ev.timingSystem}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. IN-HOUSE ATHLETE REGISTRATION – MULTI-STEP FAYDA FLOW */}
        {activeTab === "add-athlete" && (
          <div className="mx-auto max-w-lg space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                In-House Athlete Registration
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Register new athletes to <strong>{currentClubName}</strong> using their Fayda National ID.
              </p>
            </div>

            {/* STEP INDICATOR */}
            {regStep !== "done" && (
              <div className="flex items-center gap-2 text-[11px] font-bold font-mono">
                {(["fayda", "otp", "details"] as const).map((s, i) => {
                  const stepIdx = { fayda: 0, otp: 1, details: 2 }[regStep] ?? 0;
                  const isActive = regStep === s;
                  const isDone = i < stepIdx;
                  return (
                    <React.Fragment key={s}>
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-black transition-colors ${isDone
                          ? "text-white"
                          : "bg-slate-200 dark:bg-zinc-700 text-slate-500 dark:text-zinc-400"
                          }`}
                        style={isActive ? { backgroundColor: "#0140A7" } : isDone ? { backgroundColor: "#0140A7" } : {}}
                      >
                        {isDone ? <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg> : i + 1}
                      </span>
                      <span className={isActive ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-zinc-500"}>
                        {s === "fayda" ? "Fayda FAN" : s === "otp" ? "OTP Verify" : "Contact & Password"}
                      </span>
                      {i < 2 && <span className="text-slate-300 dark:text-zinc-600">—</span>}
                    </React.Fragment>
                  );
                })}
              </div>
            )}

            {/* ── STEP A: Enter Fayda FAN ── */}
            {regStep === "fayda" && (
              <div className="rounded-3xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/80 p-8 shadow-xl space-y-5">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold border" style={{ backgroundColor: "#DCEBF6", color: "#0140A7", borderColor: "rgba(1,64,167,0.2)" }}>
                    FAYDA NATIONAL ID
                  </div>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                    Enter the athlete&apos;s 16-digit Fayda Access Number (FAN). An OTP will be sent to the phone number linked to their Fayda account.
                  </p>
                </div>

                <form onSubmit={handleFanLookup} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                      Fayda Access Number (FAN) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formatFanDigits(newAthleteFan)}
                      onChange={(e) => { setNewAthleteFan(e.target.value); setFanLookupError(""); }}
                      placeholder="1223 5568 9888 8565"
                      maxLength={19}
                      required
                      className="w-full font-mono text-base tracking-widest rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white transition-colors"
                      onFocus={(e) => e.currentTarget.style.borderColor = "#0140A7"}
                      onBlur={(e) => e.currentTarget.style.borderColor = ""}
                    />
                  </div>

                  {fanLookupError && (
                    <div className="rounded-xl border p-3 font-semibold" style={{ backgroundColor: "rgba(211,47,47,0.1)", borderColor: "rgba(211,47,47,0.2)", color: "#D32F2F" }}>
                      <strong>Error:</strong> {fanLookupError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isFetchingFayda}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-extrabold text-white shadow-lg transition-all disabled:opacity-50"
                    style={{ backgroundColor: "#0140A7" }}
                    onMouseEnter={e => !isFetchingFayda && ((e.currentTarget as HTMLElement).style.backgroundColor = "#0A4870")}
                    onMouseLeave={e => !isFetchingFayda && ((e.currentTarget as HTMLElement).style.backgroundColor = "#0140A7")}
                  >
                    {isFetchingFayda ? (
                      <>
                        <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Sending OTP...
                      </>
                    ) : (
                      "Look up Fayda ID & Send OTP →"
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* ── STEP B: OTP Verification ── */}
            {regStep === "otp" && (
              <div className="rounded-3xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/80 p-8 shadow-xl space-y-5">
                <button
                  onClick={() => { setRegStep("fayda"); setOtpError(""); }}
                  className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
                >
                  ← Back
                </button>

                <div className="space-y-1 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-2xl border" style={{ backgroundColor: "#FFF3CC", borderColor: "#E6A500" }}>
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="#E6A500">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Enter OTP</h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                    A 6-digit code was sent to the athlete&apos;s Fayda-linked phone{" "}
                    <strong className="text-slate-700 dark:text-zinc-200">{faydaProfile?.maskedPhone}</strong>.
                    Ask the athlete to share it with you.
                  </p>
                </div>

                <form onSubmit={handleOtpVerify} className="space-y-5 text-xs" onPaste={handleOtpPaste}>
                  <div className="flex justify-center gap-2">
                    {otpDigits.map((d, i) => (
                      <input
                        key={i}
                        ref={(el) => { otpRefs.current[i] = el; }}
                        type="text"
                        inputMode="numeric"
                        value={d}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        maxLength={1}
                        className="h-12 w-10 rounded-xl border border-slate-300 bg-slate-50 text-center font-mono text-lg font-bold text-slate-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white transition-colors"
                        style={{ outlineColor: "#0140A7" }}
                        onFocus={(e) => e.currentTarget.style.borderColor = "#0140A7"}
                        onBlur={(e) => e.currentTarget.style.borderColor = ""}
                      />
                    ))}
                  </div>

                  {otpError && (
                    <div className="rounded-xl border p-3 font-semibold text-center" style={{ backgroundColor: "rgba(211,47,47,0.1)", borderColor: "rgba(211,47,47,0.2)", color: "#D32F2F" }}>
                      <strong>Error:</strong> {otpError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isVerifyingOtp}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-extrabold text-white shadow-lg transition-all disabled:opacity-50"
                    style={{ backgroundColor: "#0140A7" }}
                    onMouseEnter={e => !isVerifyingOtp && ((e.currentTarget as HTMLElement).style.backgroundColor = "#0A4870")}
                    onMouseLeave={e => !isVerifyingOtp && ((e.currentTarget as HTMLElement).style.backgroundColor = "#0140A7")}
                  >
                    {isVerifyingOtp ? (
                      <>
                        <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Verify OTP →"
                    )}
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={otpResendCooldown > 0}
                      className="text-[11px] font-semibold hover:underline disabled:text-slate-400 dark:disabled:text-zinc-600 disabled:cursor-not-allowed"
                      style={{ color: "#0140A7" }}
                    >
                      {otpResendCooldown > 0 ? `Resend OTP in ${otpResendCooldown}s` : "Resend OTP"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ── STEP C: Identity card + contact details ── */}
            {regStep === "details" && faydaProfile && (
              <div className="space-y-4">
                {/* Identity card pulled from Fayda */}
                <div className="rounded-2xl border p-5 space-y-3" style={{ borderColor: "rgba(1,64,167,0.3)", backgroundColor: "rgba(1,64,167,0.05)" }}>
                  <div className="flex items-center gap-2 text-xs font-bold" style={{ color: "#0140A7" }}>
                    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Fayda Identity Verified
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-[11px]">
                    <div>
                      <p className="text-slate-500 dark:text-zinc-500">Full Name</p>
                      <p className="font-bold text-slate-900 dark:text-white text-sm">{faydaProfile.fullName}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 dark:text-zinc-500">FAN ID</p>
                      <p className="font-bold" style={{ color: "#0140A7" }}>{formatFanDigits(newAthleteFan)}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 dark:text-zinc-500">Date of Birth</p>
                      <p className="font-bold text-slate-800 dark:text-zinc-200">{faydaProfile.dob}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 dark:text-zinc-500">Gender</p>
                      <p className="font-bold text-slate-800 dark:text-zinc-200">{faydaProfile.gender}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 dark:text-zinc-500">Nationality</p>
                      <p className="font-bold text-slate-800 dark:text-zinc-200">{faydaProfile.nationality}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 dark:text-zinc-500">Fayda Phone</p>
                      <p className="font-bold text-slate-800 dark:text-zinc-200">{faydaProfile.maskedPhone}</p>
                    </div>
                  </div>
                </div>

                {/* Additional contact + credentials form */}
                <div className="rounded-3xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/80 p-8 shadow-xl space-y-5">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Contact &amp; Portal Access</h3>
                    <p className="text-xs text-slate-500 dark:text-zinc-400">
                      Provide a phone number, email, and a temporary password so the athlete can log in to check their status.
                    </p>
                  </div>

                  <form onSubmit={handleFinalRegistration} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                        Contact Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={newAthletePhone}
                        onChange={(e) => { setNewAthletePhone(e.target.value); setDetailsError(""); }}
                        placeholder="0911 238 066"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white transition-colors"
                        style={{ outlineColor: "#0140A7" }}
                        onFocus={(e) => e.currentTarget.style.borderColor = "#0140A7"}
                        onBlur={(e) => e.currentTarget.style.borderColor = ""}
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={newAthleteEmail}
                        onChange={(e) => { setNewAthleteEmail(e.target.value); setDetailsError(""); }}
                        placeholder="athlete@example.et"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white transition-colors"
                        style={{ outlineColor: "#0140A7" }}
                        onFocus={(e) => e.currentTarget.style.borderColor = "#0140A7"}
                        onBlur={(e) => e.currentTarget.style.borderColor = ""}
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                        Temporary Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        value={newAthletePassword}
                        onChange={(e) => { setNewAthletePassword(e.target.value); setDetailsError(""); }}
                        placeholder="Min. 6 characters"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white transition-colors"
                        style={{ outlineColor: "#0140A7" }}
                        onFocus={(e) => e.currentTarget.style.borderColor = "#0140A7"}
                        onBlur={(e) => e.currentTarget.style.borderColor = ""}
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                        Event Category Specialization
                      </label>
                      <select
                        value={newAthleteCategory}
                        onChange={(e) => setNewAthleteCategory(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white transition-colors"
                        style={{ outlineColor: "#0140A7" }}
                        onFocus={(e) => e.currentTarget.style.borderColor = "#0140A7"}
                        onBlur={(e) => e.currentTarget.style.borderColor = ""}
                      >
                        <option value="Sprints (100m / 200m / 400m)">Sprints (100m / 200m / 400m)</option>
                        <option value="Middle Distance (800m / 1500m)">Middle Distance (800m / 1500m)</option>
                        <option value="Long Distance (5k / 10k / Marathon)">Long Distance (5k / 10k / Marathon)</option>
                        <option value="Field Events (Jumps / Throws)">Field Events (Jumps / Throws)</option>
                      </select>
                    </div>

                    {detailsError && (
                      <div className="rounded-xl border p-3 font-semibold" style={{ backgroundColor: "rgba(211,47,47,0.1)", borderColor: "rgba(211,47,47,0.2)", color: "#D32F2F" }}>
                        <strong>Error:</strong> {detailsError}
                      </div>
                    )}

                    <div className="flex gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => setRegStep("otp")}
                        className="flex-1 rounded-2xl border border-slate-200 dark:border-zinc-700 py-3.5 text-sm font-bold text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
                      >
                        ← Back
                      </button>
                      <button
                        type="submit"
                        className="flex-[2] rounded-2xl py-3.5 text-sm font-extrabold text-white shadow-lg transition-all"
                        style={{ backgroundColor: "#0140A7" }}
                        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "#0A4870")}
                        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "#0140A7")}
                      >
                        Register Athlete to Club Roster
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* ── STEP D: Success ── */}
            {regStep === "done" && (
              <div className="rounded-3xl border p-10 shadow-xl text-center space-y-4" style={{ borderColor: "rgba(1,64,167,0.3)", backgroundColor: "rgba(1,64,167,0.05)" }}>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full text-3xl" style={{ backgroundColor: "rgba(1,64,167,0.1)" }}>
                  <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="#0140A7">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Athlete Registered!</h3>
                <p className="text-xs font-semibold leading-relaxed" style={{ color: "#0140A7" }}>
                  {regSuccessMessage}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                  Redirecting to a new registration in 6 seconds…
                </p>
                <button
                  onClick={() => {
                    setRegStep("fayda");
                    setNewAthleteFan("");
                    setNewAthletePhone("");
                    setNewAthleteEmail("");
                    setNewAthletePassword("");
                    setFaydaProfile(null);
                    setRegSuccessMessage("");
                  }}
                  className="rounded-xl text-white font-bold px-6 py-2.5 text-xs shadow transition-colors"
                  style={{ backgroundColor: "#0140A7" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "#0A4870")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "#0140A7")}
                >
                  Register Another Athlete
                </button>
              </div>
            )}
          </div>
        )}

        {/* 3. CLUB ROSTER TAB */}
        {activeTab === "roster" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Athletes Roster Management</h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  Approve pending athlete self-service submissions or manage existing club licenses.
                </p>
              </div>
            </div>

            {/* MEMBERS TABLE */}
            <div className="rounded-2xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/40 overflow-hidden shadow-sm">
              <div className="divide-y divide-slate-100 dark:divide-zinc-800">
                {members.map((member) => (
                  <div key={member.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 dark:hover:bg-zinc-900/60 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-sm text-slate-700 dark:text-zinc-300 shrink-0">
                        {member.fullName.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-slate-900 dark:text-white">{member.fullName}</p>
                          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold font-mono border ${member.status === "Pending Approval"
                            ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20"
                            : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
                            }`}>
                            {member.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-500 dark:text-zinc-400">
                          <span>FAN: {member.faydaId}</span>
                          <span>•</span>
                          <span>Club: {member.clubName}</span>
                          {member.eventCategory && (
                            <>
                              <span>•</span>
                              <span>{member.eventCategory}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {member.status === "Pending Approval" && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleApproveAthlete(member.id)}
                          className="rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shadow-sm"
                        >
                          Approve License
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. LIVE & UPCOMING EVENTS TAB */}
        {activeTab === "events" && (
          <div className="space-y-8">
            {/* LIVE EVENTS SECTION */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="flex h-3 w-3 rounded-full bg-red-500 animate-ping" />
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                  Live Events (In Progress)
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {eventsList
                  .filter((e) => e.status === "LIVE")
                  .map((ev) => (
                    <div
                      key={ev.id}
                      className="rounded-3xl border border-red-500/30 bg-gradient-to-br from-red-500/5 via-white to-white dark:via-zinc-900 dark:to-zinc-950 p-6 shadow-md space-y-4 relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1 text-[11px] font-bold text-red-600 dark:text-red-400 border border-red-500/20 font-mono">
                          🔴 LIVE NOW
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">
                          {ev.dateOrTime}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                          {ev.title}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1 leading-relaxed">
                          {ev.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-3 border-t border-slate-200 dark:border-zinc-800">
                        <div>
                          <span className="text-slate-500 dark:text-zinc-500 block">Venue:</span>
                          <span className="font-bold text-slate-800 dark:text-zinc-200">{ev.venue}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 dark:text-zinc-500 block">Timing Hardware:</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">{ev.timingSystem}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* UPCOMING EVENTS SECTION */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-blue-500" />
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                  Upcoming Events & Competitions
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {eventsList
                  .filter((e) => e.status === "UPCOMING")
                  .map((ev) => (
                    <div
                      key={ev.id}
                      className="rounded-3xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/60 p-6 shadow-sm space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-[11px] font-bold text-blue-700 dark:text-blue-400 border border-blue-500/20 font-mono">
                          📅 UPCOMING
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">
                          {ev.dateOrTime}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                          {ev.title}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1 leading-relaxed">
                          {ev.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-3 border-t border-slate-200 dark:border-zinc-800">
                        <div>
                          <span className="text-slate-500 dark:text-zinc-500 block">Venue:</span>
                          <span className="font-bold text-slate-800 dark:text-zinc-200">{ev.venue}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 dark:text-zinc-500 block">Timing System:</span>
                          <span className="font-bold text-slate-800 dark:text-zinc-200">{ev.timingSystem}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
