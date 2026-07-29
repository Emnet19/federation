"use client";

import React, { useState, useEffect } from "react";
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

  // In-House Athlete Registration Form State (Requirement 1)
  const [newAthleteName, setNewAthleteName] = useState("");
  const [newAthleteFan, setNewAthleteFan] = useState("");
  const [newAthleteDob, setNewAthleteDob] = useState("2003-04-12");
  const [newAthleteGender, setNewAthleteGender] = useState<"Male" | "Female">("Male");
  const [newAthletePhone, setNewAthletePhone] = useState("");
  const [newAthleteCategory, setNewAthleteCategory] = useState("Long Distance (5k / 10k / Marathon)");
  const [regSuccessMessage, setRegSuccessMessage] = useState("");

  // Load pending athlete submissions from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("eacrms_pending_athletes");
      if (stored) {
        const pendingList = JSON.parse(stored);
        const mappedPending: RosterMember[] = pendingList.map((p: any) => ({
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

  // Format 16-digit FAN
  const formatFanDigits = (val: string) => {
    const raw = val.replace(/\D/g, "").slice(0, 16);
    const groups = raw.match(/.{1,4}/g);
    return groups ? groups.join(" ") : raw;
  };

  // Handle direct In-House Athlete Registration by Club Admin
  const handleInHouseRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAthleteName.trim()) return;

    const clubName = user?.name ? user.name.replace(" Admin", "") : "Arada Athletics Club";
    const generatedId = `EAF-ATH-2026-${Math.floor(100 + Math.random() * 900)}`;

    const newMember: RosterMember = {
      id: generatedId,
      memberType: "Athlete",
      fullName: newAthleteName.trim(),
      faydaId: formatFanDigits(newAthleteFan) || "1223 5568 9888 4401",
      clubId: "EAF-CLB-102",
      clubName,
      phone: newAthletePhone.trim() || "+251 911 000 999",
      status: "Fayda Verified & Active",
      registeredDate: new Date().toISOString().split("T")[0],
      dob: newAthleteDob,
      gender: newAthleteGender,
      eventCategory: newAthleteCategory,
    };

    setMembers((prev) => [newMember, ...prev]);

    // Reset form & show message
    setNewAthleteName("");
    setNewAthleteFan("");
    setNewAthletePhone("");
    setRegSuccessMessage(`Successfully registered ${newMember.fullName} directly to club roster with Fayda FAN ID ${newMember.faydaId}!`);

    setTimeout(() => setRegSuccessMessage(""), 5000);
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
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all ${
                activeTab === "dashboard"
                  ? "bg-slate-900 text-white dark:bg-zinc-100 dark:text-slate-900 shadow-md"
                  : "bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              📊 Dashboard
            </button>

            {/* 2. In-House Register Athlete Tab */}
            <button
              onClick={() => setActiveTab("add-athlete")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all ${
                activeTab === "add-athlete"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              ➕ Register New Athlete
            </button>

            {/* 3. Club Roster Tab */}
            <button
              onClick={() => setActiveTab("roster")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all ${
                activeTab === "roster"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              👥 Club Roster & Applications
              {members.filter((m) => m.status === "Pending Approval").length > 0 && (
                <span className="rounded-full bg-yellow-400 px-2 py-0.5 text-[10px] font-black text-slate-950">
                  {members.filter((m) => m.status === "Pending Approval").length}
                </span>
              )}
            </button>

            {/* 4. Events Tab */}
            <button
              onClick={() => setActiveTab("events")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all ${
                activeTab === "events"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              🏆 Live & Upcoming Events
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping" />
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
                className="rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold px-4 py-2.5 text-xs shadow-md transition-all shrink-0"
              >
                + Register Athlete to Club Roster
              </button>
            </div>

            {/* STAT METRIC CARDS */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/60 shadow-sm space-y-2">
                <p className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">Total Club Athletes</p>
                <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{members.length}</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Active Roster License</p>
              </div>

              <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 shadow-sm space-y-2">
                <p className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">Fayda ID Verified</p>
                <p className="text-3xl font-extrabold text-blue-700 dark:text-blue-400">
                  {members.filter((m) => m.status === "Fayda Verified & Active").length}
                </p>
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-mono">16-Digit FAN Validated</p>
              </div>

              <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6 shadow-sm space-y-2">
                <p className="text-xs font-bold text-yellow-700 dark:text-yellow-400 uppercase tracking-wider">Pending Approvals</p>
                <p className="text-3xl font-extrabold text-yellow-700 dark:text-yellow-400">
                  {members.filter((m) => m.status === "Pending Approval").length}
                </p>
                <p className="text-xs text-slate-500 dark:text-zinc-400">Awaiting Club Review</p>
              </div>

              <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 shadow-sm space-y-2">
                <p className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">Active Competitions</p>
                <p className="text-3xl font-extrabold text-red-600 dark:text-red-400">
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
                  <button onClick={() => setActiveTab("roster")} className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline">
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
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold font-mono ${
                        m.status === "Pending Approval"
                          ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
                          : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                      }`}>
                        {m.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* LIVE EVENTS WIDGET */}
              <div className="lg:col-span-5 rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-500/5 to-white dark:to-zinc-900 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-ping" />
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Live Event Status</h3>
                  </div>
                  <button onClick={() => setActiveTab("events")} className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline">
                    All Events →
                  </button>
                </div>

                {eventsList.filter((e) => e.status === "LIVE").slice(0, 1).map((ev) => (
                  <div key={ev.id} className="space-y-3 text-xs">
                    <p className="font-extrabold text-slate-900 dark:text-white">{ev.title}</p>
                    <p className="text-slate-600 dark:text-zinc-400">{ev.description}</p>
                    <div className="p-3 rounded-xl bg-white dark:bg-zinc-950 font-mono text-[11px] space-y-1">
                      <p className="text-slate-500">📍 Venue: {ev.venue}</p>
                      <p className="text-emerald-600 dark:text-emerald-400 font-bold">⏱ Hardware: {ev.timingSystem}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. IN-HOUSE ATHLETE REGISTRATION SECTION (REQUIREMENT 1) */}
        {activeTab === "add-athlete" && (
          <div className="mx-auto max-w-2xl space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                In-House Athlete Registration
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Register new athletes directly into the <strong>{currentClubName}</strong> official roster using their Fayda National ID (FAN).
              </p>
            </div>

            {regSuccessMessage && (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                ✓ {regSuccessMessage}
              </div>
            )}

            <div className="rounded-3xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/80 backdrop-blur-xl p-8 shadow-xl space-y-6">
              <form onSubmit={handleInHouseRegistration} className="space-y-4 text-xs">
                {/* Athlete Name */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                    Athlete Full Name
                  </label>
                  <input
                    type="text"
                    value={newAthleteName}
                    onChange={(e) => setNewAthleteName(e.target.value)}
                    placeholder="e.g. Derartu Tulu"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:border-blue-600 focus:outline-none transition-colors"
                  />
                </div>

                {/* Fayda FAN ID */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                    Fayda Access Number (FAN ID - 16 Digits)
                  </label>
                  <input
                    type="text"
                    value={formatFanDigits(newAthleteFan)}
                    onChange={(e) => setNewAthleteFan(e.target.value)}
                    placeholder="1223 5568 9888 8565"
                    maxLength={19}
                    required
                    className="w-full font-mono text-sm tracking-wider rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:border-blue-600 focus:outline-none transition-colors"
                  />
                </div>

                {/* DOB & Gender */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={newAthleteDob}
                      onChange={(e) => setNewAthleteDob(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:border-blue-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                      Gender
                    </label>
                    <select
                      value={newAthleteGender}
                      onChange={(e) => setNewAthleteGender(e.target.value as "Male" | "Female")}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:border-blue-600 focus:outline-none transition-colors"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    value={newAthletePhone}
                    onChange={(e) => setNewAthletePhone(e.target.value)}
                    placeholder="0911238066"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:border-blue-600 focus:outline-none transition-colors"
                  />
                </div>

                {/* Event Category */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1.5">
                    Event Category Specialization
                  </label>
                  <select
                    value={newAthleteCategory}
                    onChange={(e) => setNewAthleteCategory(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:border-blue-600 focus:outline-none transition-colors"
                  >
                    <option value="Sprints (100m / 200m / 400m)">Sprints (100m / 200m / 400m)</option>
                    <option value="Middle Distance (800m / 1500m)">Middle Distance (800m / 1500m)</option>
                    <option value="Long Distance (5k / 10k / Marathon)">Long Distance (5k / 10k / Marathon)</option>
                    <option value="Field Events (Jumps / Throws)">Field Events (Jumps / Throws)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 p-3.5 text-sm font-extrabold text-white shadow-lg transition-all"
                >
                  Register Athlete to Club Roster
                </button>
              </form>
            </div>
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
                          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold font-mono border ${
                            member.status === "Pending Approval"
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
