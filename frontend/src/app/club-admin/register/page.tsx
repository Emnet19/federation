"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { useAuth } from "@/context/AuthContext";

export interface RegisteredClub {
  id: string;
  name: string;
  region: string;
  category: string;
}

export interface RosterMember {
  id: string;
  memberType: "Athlete" | "Coach";
  fullName: string;
  faydaId: string;
  clubId: string;
  clubName: string;
  phone: string;
  status: "Fayda Verified & Active" | "Pending License Review";
  registeredDate: string;
  // Athlete specific
  dob?: string;
  gender?: "Male" | "Female";
  eventCategory?: string;
  emergencyContact?: string;
  // Coach specific
  certificationLevel?: string;
  specialization?: string;
  experienceYears?: number;
  email?: string;
}

const INITIAL_CLUBS: RegisteredClub[] = [
  { id: "EAF-CLB-101", name: "Defence Athletics Club", region: "Addis Ababa", category: "National League" },
  { id: "EAF-CLB-102", name: "Arada Athletics Club", region: "Addis Ababa", category: "Regional Club" },
  { id: "EAF-CLB-103", name: "Hawassa Athletics AC", region: "Sidama", category: "Regional Club" },
  { id: "EAF-CLB-104", name: "Oromia Police Sports Club", region: "Oromia", category: "National League" },
];

const INITIAL_MEMBERS: RosterMember[] = [
  {
    id: "EAF-ATH-2026-101",
    memberType: "Athlete",
    fullName: "Tamirat Tola",
    faydaId: "FIN-7712-9041",
    clubId: "EAF-CLB-101",
    clubName: "Defence Athletics Club",
    phone: "+251 911 402 910",
    status: "Fayda Verified & Active",
    registeredDate: "2026-01-15",
    dob: "1991-08-11",
    gender: "Male",
    eventCategory: "Marathon & Road Running",
    emergencyContact: "+251 911 000 111",
  },
  {
    id: "EAF-ATH-2026-102",
    memberType: "Athlete",
    fullName: "Letesenbet Gidey",
    faydaId: "FIN-3382-1048",
    clubId: "EAF-CLB-103",
    clubName: "Hawassa Athletics AC",
    phone: "+251 922 849 204",
    status: "Fayda Verified & Active",
    registeredDate: "2026-02-01",
    dob: "1998-03-20",
    gender: "Female",
    eventCategory: "Long Distance (5000m/10000m)",
    emergencyContact: "+251 922 111 222",
  },
  {
    id: "EAF-CCH-2026-201",
    memberType: "Coach",
    fullName: "Gemedu Dedefo",
    faydaId: "FIN-5510-8291",
    clubId: "EAF-CLB-101",
    clubName: "Defence Athletics Club",
    phone: "+251 911 392 810",
    status: "Fayda Verified & Active",
    registeredDate: "2026-01-10",
    certificationLevel: "Master Coach (WA Level 3)",
    specialization: "Marathon & Endurance",
    experienceYears: 18,
    email: "gemedu.d@athletics.et",
  },
];

export default function StandaloneClubAdminRegisterPage() {
  const { user } = useAuth();
  const [clubs] = useState<RegisteredClub[]>(INITIAL_CLUBS);
  const [members, setMembers] = useState<RosterMember[]>(INITIAL_MEMBERS);

  // Form Mode: "Athlete" | "Coach"
  const [memberType, setMemberType] = useState<"Athlete" | "Coach">("Athlete");

  // Common Form Fields
  const [fullName, setFullName] = useState("");
  const [faydaId, setFaydaId] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedClubId, setSelectedClubId] = useState<string>("EAF-CLB-101"); // Optional club association

  // Athlete Specific Fields
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState<"Male" | "Female">("Male");
  const [eventCategory, setEventCategory] = useState("Sprints (100m/200m/400m)");
  const [emergencyContact, setEmergencyContact] = useState("");

  // Coach Specific Fields
  const [certificationLevel, setCertificationLevel] = useState("Level 1 World Athletics");
  const [specialization, setSpecialization] = useState("Middle & Long Distance");
  const [experienceYears, setExperienceYears] = useState<number>(3);
  const [email, setEmail] = useState("");

  // Validation & UI State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMember, setSuccessMember] = useState<RosterMember | null>(null);

  // Directory Filter State
  const [searchFilter, setSearchFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState<"All" | "Athlete" | "Coach">("All");

  // Auto-format Fayda ID pattern: FIN-XXXX-XXXX
  const formatFaydaIdInput = (val: string) => {
    const cleaned = val.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (cleaned.startsWith("FIN")) {
      const nums = cleaned.slice(3);
      if (nums.length <= 4) return `FIN-${nums}`;
      return `FIN-${nums.slice(0, 4)}-${nums.slice(4, 8)}`;
    }
    return val.toUpperCase();
  };

  // Backend Validation Engine
  const validateForm = (): boolean => {
    const errs: Record<string, string> = {};

    // Legal Name check
    if (!fullName.trim() || fullName.trim().length < 3) {
      errs.fullName = "Full legal name is required (minimum 3 characters).";
    }

    // Fayda ID Regex
    const faydaRegex = /^FIN-\d{4}-\d{4}$/;
    if (!faydaId.trim()) {
      errs.faydaId = "Fayda National ID is required.";
    } else if (!faydaRegex.test(faydaId.trim())) {
      errs.faydaId = "Invalid Fayda ID format! Format must be FIN-XXXX-XXXX (e.g. FIN-8849-2049).";
    }

    // Ethiopian Phone Regex
    const phoneRegex = /^(\+251|0)[79]\d{8}$/;
    const cleanPhone = phone.replace(/\s+/g, "");
    if (!phone.trim()) {
      errs.phone = "Contact phone number is required.";
    } else if (!phoneRegex.test(cleanPhone)) {
      errs.phone = "Invalid Ethiopian phone number. Example: +251 911 234 567 or 0911234567.";
    }

    if (memberType === "Athlete") {
      // Age check >= 12 yrs
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
          errs.dob = "Athlete must be at least 12 years of age for federation registration.";
        }
      }

      if (emergencyContact.trim()) {
        const cleanEm = emergencyContact.replace(/\s+/g, "");
        if (!phoneRegex.test(cleanEm)) {
          errs.emergencyContact = "Invalid emergency phone format (+251 9... or 09...).";
        }
      }
    } else {
      // Coach Specific Checks
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.trim()) {
        errs.email = "Official contact email address is required.";
      } else if (!emailRegex.test(email.trim())) {
        errs.email = "Invalid email address format (e.g. coach@domain.et).";
      }

      if (experienceYears < 1 || isNaN(experienceYears)) {
        errs.experienceYears = "Experience must be at least 1 year.";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMember(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      let assignedClubName = "Unattached / Independent";
      if (selectedClubId !== "UNATTACHED") {
        const found = clubs.find((c) => c.id === selectedClubId);
        if (found) assignedClubName = found.name;
      }

      const generatedId =
        memberType === "Athlete"
          ? `EAF-ATH-2026-${Math.floor(100 + Math.random() * 900)}`
          : `EAF-CCH-2026-${Math.floor(200 + Math.random() * 900)}`;

      const newMember: RosterMember = {
        id: generatedId,
        memberType,
        fullName: fullName.trim(),
        faydaId: faydaId.trim(),
        clubId: selectedClubId,
        clubName: assignedClubName,
        phone: phone.trim(),
        status: "Fayda Verified & Active",
        registeredDate: new Date().toISOString().split("T")[0],
        ...(memberType === "Athlete"
          ? { dob, gender, eventCategory, emergencyContact: emergencyContact.trim() || undefined }
          : { certificationLevel, specialization, experienceYears, email: email.trim() }),
      };

      setMembers((prev) => [newMember, ...prev]);
      setIsSubmitting(false);
      setSuccessMember(newMember);

      // Reset form
      setFullName("");
      setFaydaId("");
      setPhone("");
      setDob("");
      setEmergencyContact("");
      setEmail("");
      setErrors({});
    }, 1200);
  };

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.fullName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      m.faydaId.toLowerCase().includes(searchFilter.toLowerCase()) ||
      m.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
      m.clubName.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesRole = roleFilter === "All" || m.memberType === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-200">
      {/* STANDALONE CLUB ADMIN TOP NAVBAR */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 dark:border-zinc-800/80 dark:bg-zinc-900/60 backdrop-blur-xl px-6 py-3.5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-white border border-slate-200 dark:bg-zinc-900 dark:border-zinc-800 p-1 shadow-md">
              <Image src="/logo.png" alt="EAF Logo" fill className="object-contain" priority />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Club Admin Portal
                </span>
                <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  Member Registration
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-mono">
                Ethiopian Athletics Federation · Proclamation No. 1284/2023 Compliant
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Fayda Verified Gateway
            </div>

            <ThemeToggle />

            <Link
              href="/"
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              ← Back to Portal Hub
            </Link>
          </div>
        </div>
      </header>

      {/* PAGE CONTAINER */}
      <main className="mx-auto max-w-7xl px-6 py-8 space-y-8">
        {/* WELCOME BANNER */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40 backdrop-blur-md shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Club Member & Coach Registration Center
            </h1>
            <p className="mt-1 text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Official self-service portal for club managers to onboard athletes and coaches under their club roster.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 dark:bg-zinc-950 p-3 border border-slate-200 dark:border-zinc-800 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold">
              {user?.name ? user.name[0] : "C"}
            </div>
            <div className="text-xs">
              <p className="font-bold text-slate-900 dark:text-zinc-200">{user?.name || "Haile Gebrselassie"}</p>
              <p className="text-[10px] text-blue-600 dark:text-blue-400 font-mono">Licensed Club Administrator</p>
            </div>
          </div>
        </div>

        {/* SUCCESS CONFIRMATION STATE */}
        {successMember && (
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-slate-900 dark:text-white shadow-lg space-y-4 animate-fadeIn">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white font-bold text-lg shadow-md">
                  ✓
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-emerald-800 dark:text-emerald-300">
                    {successMember.memberType} Successfully Registered & Fayda Verified!
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-zinc-300 font-mono mt-0.5">
                    Proclamation No. 1284/2023 National Identity Registry Validation Passed
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSuccessMember(null)}
                className="text-xs text-slate-500 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-white font-bold"
              >
                ✕ Close
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 rounded-xl bg-white/80 dark:bg-zinc-950/80 p-4 border border-emerald-500/20 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-mono block">EAF Badge ID</span>
                <span className="font-bold font-mono text-emerald-600 dark:text-emerald-400 text-sm">{successMember.id}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-mono block">Member Name</span>
                <span className="font-bold text-slate-900 dark:text-zinc-100">{successMember.fullName}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-mono block">Fayda National ID</span>
                <span className="font-bold font-mono text-slate-700 dark:text-zinc-300">{successMember.faydaId}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-mono block">Club Roster</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{successMember.clubName}</span>
              </div>
            </div>
          </div>
        )}

        {/* MAIN LAYOUT: REGISTRATION FORM + LIVE ROSTER */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* REGISTRATION FORM CONTAINER */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-7 dark:border-zinc-800 dark:bg-zinc-900/40 backdrop-blur-md space-y-6 shadow-sm">
            {/* Header & Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 dark:border-zinc-800 pb-5 gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold">
                    +
                  </span>
                  Club Admin Member Form
                </h2>
                <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
                  Select registration mode below to onboard athletes or coaches.
                </p>
              </div>

              {/* Mode Switcher */}
              <div className="flex rounded-xl bg-slate-100 dark:bg-zinc-950 p-1 border border-slate-200 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => { setMemberType("Athlete"); setErrors({}); }}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                    memberType === "Athlete"
                      ? "bg-yellow-500 text-slate-950 shadow-sm"
                      : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  🏃 Athlete Registration
                </button>
                <button
                  type="button"
                  onClick={() => { setMemberType("Coach"); setErrors({}); }}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                    memberType === "Coach"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  📋 Coach Registration
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* OPTIONAL CLUB ASSOCIATION SELECT */}
              <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block font-bold text-slate-800 dark:text-zinc-200">
                    Optional Club Association
                  </label>
                  <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-semibold">
                    Shown on EAF Roster
                  </span>
                </div>
                <select
                  value={selectedClubId}
                  onChange={(e) => setSelectedClubId(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 focus:border-blue-500 focus:outline-none font-medium"
                >
                  {clubs.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.region} · {c.category})
                    </option>
                  ))}
                  <option value="UNATTACHED">Unattached / Independent Member</option>
                </select>
                <p className="text-[10px] text-slate-500 dark:text-zinc-400">
                  Select the club to associate this {memberType.toLowerCase()} with, or choose &quot;Unattached / Independent&quot;.
                </p>
              </div>

              {/* Full Legal Name */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={memberType === "Athlete" ? "e.g. Tamirat Tola" : "e.g. Gemedu Dedefo"}
                  className={`w-full rounded-xl border px-4 py-2.5 text-slate-900 placeholder-slate-400 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-600 focus:outline-none ${
                    errors.fullName
                      ? "border-red-500 bg-red-500/5 focus:border-red-500"
                      : "border-slate-200 bg-slate-50 dark:border-zinc-800 focus:border-blue-500"
                  }`}
                />
                {errors.fullName ? (
                  <p className="mt-1 text-[11px] font-semibold text-red-500">{errors.fullName}</p>
                ) : (
                  <p className="mt-1 text-[10px] text-slate-500 dark:text-zinc-500">
                    Must match full legal name registered on Fayda National ID card.
                  </p>
                )}
              </div>

              {/* Fayda ID & Phone Grid */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">
                    Fayda National ID *
                  </label>
                  <input
                    type="text"
                    value={faydaId}
                    onChange={(e) => setFaydaId(formatFaydaIdInput(e.target.value))}
                    placeholder="FIN-8849-2049"
                    maxLength={13}
                    className={`w-full rounded-xl border px-4 py-2.5 font-mono text-slate-900 placeholder-slate-400 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-600 focus:outline-none ${
                      errors.faydaId
                        ? "border-red-500 bg-red-500/5 focus:border-red-500"
                        : "border-slate-200 bg-slate-50 dark:border-zinc-800 focus:border-blue-500"
                    }`}
                  />
                  {errors.faydaId ? (
                    <p className="mt-1 text-[11px] font-semibold text-red-500">{errors.faydaId}</p>
                  ) : (
                    <p className="mt-1 text-[10px] text-slate-500 dark:text-zinc-500 font-mono">
                      Format: FIN-XXXX-XXXX (Proclamation No. 1284/2023)
                    </p>
                  )}
                </div>

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
                        : "border-slate-200 bg-slate-50 dark:border-zinc-800 focus:border-blue-500"
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
              </div>

              {/* ATHLETE SPECIFIC FIELDS */}
              {memberType === "Athlete" ? (
                <>
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
                            : "border-slate-200 bg-slate-50 dark:border-zinc-800 focus:border-blue-500"
                        }`}
                      />
                      {errors.dob ? (
                        <p className="mt-1 text-[11px] font-semibold text-red-500">{errors.dob}</p>
                      ) : (
                        <p className="mt-1 text-[10px] text-slate-500 dark:text-zinc-500">
                          Athlete must be at least 12 years of age.
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
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">
                      Primary Event Category *
                    </label>
                    <select
                      value={eventCategory}
                      onChange={(e) => setEventCategory(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="Sprints (100m/200m/400m)">Sprints (100m / 200m / 400m)</option>
                      <option value="Middle Distance (800m/1500m)">Middle Distance (800m / 1500m)</option>
                      <option value="Long Distance (5000m/10000m)">Long Distance (5000m / 10000m)</option>
                      <option value="Marathon & Road Running">Marathon & Road Running</option>
                      <option value="3000m Steeplechase">3000m Steeplechase</option>
                      <option value="Jumps & Throws">Jumps & Throws</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">
                      Emergency Contact Phone (Optional)
                    </label>
                    <input
                      type="text"
                      value={emergencyContact}
                      onChange={(e) => setEmergencyContact(e.target.value)}
                      placeholder="+251 911 000 111"
                      className={`w-full rounded-xl border px-4 py-2.5 text-slate-900 placeholder-slate-400 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-600 focus:outline-none ${
                        errors.emergencyContact
                          ? "border-red-500 bg-red-500/5 focus:border-red-500"
                          : "border-slate-200 bg-slate-50 dark:border-zinc-800 focus:border-blue-500"
                      }`}
                    />
                    {errors.emergencyContact && (
                      <p className="mt-1 text-[11px] font-semibold text-red-500">{errors.emergencyContact}</p>
                    )}
                  </div>
                </>
              ) : (
                /* COACH SPECIFIC FIELDS */
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">
                        Certification Level *
                      </label>
                      <select
                        value={certificationLevel}
                        onChange={(e) => setCertificationLevel(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="Level 1 World Athletics">Level 1 World Athletics</option>
                        <option value="Level 2 WA National Coach">Level 2 WA National Coach</option>
                        <option value="Master Coach (WA Level 3)">Master Coach (WA Level 3)</option>
                        <option value="Youth Academy Coach">Youth Academy Coach</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">
                        Coaching Discipline *
                      </label>
                      <select
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="Middle & Long Distance">Middle & Long Distance</option>
                        <option value="Marathon & Endurance">Marathon & Endurance</option>
                        <option value="Sprints & Hurdles">Sprints & Hurdles</option>
                        <option value="Jumps & Throws">Jumps & Throws</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">
                        Official Email Address *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="coach.name@athletics.et"
                        className={`w-full rounded-xl border px-4 py-2.5 text-slate-900 placeholder-slate-400 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-600 focus:outline-none ${
                          errors.email
                            ? "border-red-500 bg-red-500/5 focus:border-red-500"
                            : "border-slate-200 bg-slate-50 dark:border-zinc-800 focus:border-blue-500"
                        }`}
                      />
                      {errors.email ? (
                        <p className="mt-1 text-[11px] font-semibold text-red-500">{errors.email}</p>
                      ) : (
                        <p className="mt-1 text-[10px] text-slate-500 dark:text-zinc-500">
                          Official contact for license credentials.
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">
                        Coaching Experience (Years) *
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={50}
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(parseInt(e.target.value) || 0)}
                        className={`w-full rounded-xl border px-4 py-2.5 text-slate-900 font-mono dark:bg-zinc-950 dark:text-zinc-100 focus:outline-none ${
                          errors.experienceYears
                            ? "border-red-500 bg-red-500/5 focus:border-red-500"
                            : "border-slate-200 bg-slate-50 dark:border-zinc-800 focus:border-blue-500"
                        }`}
                      />
                      {errors.experienceYears && (
                        <p className="mt-1 text-[11px] font-semibold text-red-500">{errors.experienceYears}</p>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* SUBMIT BUTTON WITH ANIMATED LOADING */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 ${
                    memberType === "Athlete"
                      ? "bg-yellow-500 hover:bg-yellow-400 text-slate-950 shadow-yellow-500/20"
                      : "bg-blue-600 hover:bg-blue-500 shadow-blue-500/20"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Verifying Fayda National ID & Registering...
                    </>
                  ) : (
                    `Complete ${memberType} Registration`
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* REGISTERED ROSTER DIRECTORY COLUMN */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40 backdrop-blur-md space-y-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Registered Roster</h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">Total {members.length} active members</p>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Fayda Verified
                </span>
              </div>

              {/* Search & Filters */}
              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Search name, Fayda ID..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 focus:border-blue-500 focus:outline-none font-mono"
                />
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value as "All" | "Athlete" | "Coach")}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 focus:border-blue-500 focus:outline-none font-medium shrink-0"
                >
                  <option value="All">All Roles</option>
                  <option value="Athlete">Athletes</option>
                  <option value="Coach">Coaches</option>
                </select>
              </div>

              {/* Member Roster List */}
              <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
                {filteredMembers.map((m) => (
                  <div
                    key={m.id}
                    className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-3.5 text-xs space-y-2 dark:border-zinc-800 dark:bg-zinc-950/60 transition-all hover:border-slate-300 dark:hover:border-zinc-700"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-zinc-100 text-sm">{m.fullName}</h4>
                        <p className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold mt-0.5">
                          {m.clubName}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold font-mono border ${
                          m.memberType === "Athlete"
                            ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20"
                            : "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20"
                        }`}
                      >
                        {m.memberType}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between border-t border-slate-200/60 dark:border-zinc-800/60 pt-2 text-[11px] font-mono text-slate-600 dark:text-zinc-400">
                      <span>ID: {m.id}</span>
                      <span>Fayda: {m.faydaId}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
