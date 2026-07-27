"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

// Types
export interface RegisteredClub {
  id: string;
  name: string;
  region: string;
  manager: string;
  faydaId: string;
  category: string;
  status: "Active License" | "Pending Fayda Verification" | "Under Audit";
  athletesCount: number;
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
  // Athlete specific fields
  dob?: string;
  gender?: "Male" | "Female";
  eventCategory?: string;
  emergencyContact?: string;
  // Coach specific fields
  certificationLevel?: string;
  specialization?: string;
  experienceYears?: number;
  email?: string;
}

const INITIAL_CLUBS: RegisteredClub[] = [
  {
    id: "EAF-CLB-101",
    name: "Defence Athletics Club",
    region: "Addis Ababa",
    manager: "Col. Derartu Tulu",
    faydaId: "FIN-8849-2049",
    category: "National League",
    status: "Active License",
    athletesCount: 142,
  },
  {
    id: "EAF-CLB-102",
    name: "Arada Athletics Club",
    region: "Addis Ababa",
    manager: "Abebe Bikila",
    faydaId: "FIN-1049-5930",
    category: "Regional Club",
    status: "Active License",
    athletesCount: 124,
  },
  {
    id: "EAF-CLB-103",
    name: "Hawassa Athletics AC",
    region: "Sidama",
    manager: "Haile Gebrselassie",
    faydaId: "FIN-9032-4820",
    category: "Regional Club",
    status: "Active License",
    athletesCount: 88,
  },
  {
    id: "EAF-CLB-104",
    name: "Oromia Police Sports Club",
    region: "Oromia",
    manager: "Kenenisa Bekele",
    faydaId: "FIN-4930-1094",
    category: "National League",
    status: "Pending Fayda Verification",
    athletesCount: 95,
  },
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
  {
    id: "EAF-CCH-2026-202",
    memberType: "Coach",
    fullName: "Hussein Shibo",
    faydaId: "FIN-1102-4958",
    clubId: "EAF-CLB-102",
    clubName: "Arada Athletics Club",
    phone: "+251 933 104 829",
    status: "Fayda Verified & Active",
    registeredDate: "2026-02-14",
    certificationLevel: "Level 2 WA National Coach",
    specialization: "Middle Distance & Steeplechase",
    experienceYears: 12,
    email: "h.shibo@arada-ac.et",
  },
];

export default function ClubRegistrationPage() {
  const [clubs, setClubs] = useState<RegisteredClub[]>(INITIAL_CLUBS);
  const [members, setMembers] = useState<RosterMember[]>(INITIAL_MEMBERS);

  // Portal View Tabs: "members" (Add Member) | "club" (Register Club) | "directory" (Live Roster)
  const [activeTab, setActiveTab] = useState<"members" | "club" | "directory">("members");

  // Member Registration Form Mode: "Athlete" | "Coach"
  const [memberType, setMemberType] = useState<"Athlete" | "Coach">("Athlete");

  // --- Member Form State ---
  const [fullName, setFullName] = useState("");
  const [faydaId, setFaydaId] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedClubId, setSelectedClubId] = useState<string>("EAF-CLB-101"); // default to first club or "" for unattached

  // Athlete Specific Form State
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState<"Male" | "Female">("Male");
  const [eventCategory, setEventCategory] = useState("Sprints (100m/200m/400m)");
  const [emergencyContact, setEmergencyContact] = useState("");

  // Coach Specific Form State
  const [certificationLevel, setCertificationLevel] = useState("Level 1 World Athletics");
  const [specialization, setSpecialization] = useState("Middle & Long Distance");
  const [experienceYears, setExperienceYears] = useState<number>(3);
  const [email, setEmail] = useState("");

  // Validation Errors & Form Status
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMember, setSuccessMember] = useState<RosterMember | null>(null);

  // --- Club Registration Form State ---
  const [clubName, setClubName] = useState("");
  const [region, setRegion] = useState("Addis Ababa");
  const [managerName, setManagerName] = useState("");
  const [clubFaydaId, setClubFaydaId] = useState("");
  const [category, setCategory] = useState("Regional Club");
  const [isSubmittingClub, setIsSubmittingClub] = useState(false);
  const [clubSuccessMsg, setClubSuccessMsg] = useState<string | null>(null);

  // Directory Filter State
  const [searchFilter, setSearchFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState<"All" | "Athlete" | "Coach">("All");
  const [clubFilter, setClubFilter] = useState<string>("All");

  // Helper for Fayda ID formatting suggestion/check
  const formatFaydaIdInput = (val: string) => {
    // Auto format FIN-XXXX-XXXX if user types digits
    const cleaned = val.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (cleaned.startsWith("FIN")) {
      const nums = cleaned.slice(3);
      if (nums.length <= 4) return `FIN-${nums}`;
      return `FIN-${nums.slice(0, 4)}-${nums.slice(4, 8)}`;
    }
    return val.toUpperCase();
  };

  // Live Backend Validation Function for Member Registration
  const validateMemberForm = (): boolean => {
    const errs: Record<string, string> = {};

    // 1. Full Name check
    if (!fullName.trim() || fullName.trim().length < 3) {
      errs.fullName = "Full legal name is required (minimum 3 characters).";
    }

    // 2. Fayda ID Regex Validation matching FIN-XXXX-XXXX
    const faydaRegex = /^FIN-\d{4}-\d{4}$/;
    if (!faydaId.trim()) {
      errs.faydaId = "Fayda National ID is required.";
    } else if (!faydaRegex.test(faydaId.trim())) {
      errs.faydaId = "Invalid Fayda ID format! Must match FIN-XXXX-XXXX (e.g., FIN-8849-2049).";
    }

    // 3. Phone Regex Validation (+251 or 09/07...)
    const phoneRegex = /^(\+251|0)[79]\d{8}$/;
    const cleanPhone = phone.replace(/\s+/g, "");
    if (!phone.trim()) {
      errs.phone = "Contact phone number is required.";
    } else if (!phoneRegex.test(cleanPhone)) {
      errs.phone = "Invalid Ethiopian phone number. Format: +251 911 234 567 or 0911234567.";
    }

    if (memberType === "Athlete") {
      // 4. Date of Birth & Age check (>= 12 years)
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
          errs.dob = "Athlete must be at least 12 years old to register with federation.";
        }
      }

      // Emergency Phone check (optional or format check if provided)
      if (emergencyContact.trim()) {
        const cleanEm = emergencyContact.replace(/\s+/g, "");
        if (!phoneRegex.test(cleanEm)) {
          errs.emergencyContact = "Invalid emergency phone format (+251 9... or 09...).";
        }
      }
    } else {
      // Coach Specific Validation
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

  // Submit Handler for Athlete / Coach Registration
  const handleMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMember(null);

    if (!validateMemberForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate backend verification & Fayda API check delay
    setTimeout(() => {
      // Lookup selected club name
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
          ? {
              dob,
              gender,
              eventCategory,
              emergencyContact: emergencyContact.trim() || undefined,
            }
          : {
              certificationLevel,
              specialization,
              experienceYears,
              email: email.trim(),
            }),
      };

      // Update members list & increment club count if attached
      setMembers((prev) => [newMember, ...prev]);
      if (selectedClubId !== "UNATTACHED") {
        setClubs((prev) =>
          prev.map((c) =>
            c.id === selectedClubId ? { ...c, athletesCount: c.athletesCount + 1 } : c
          )
        );
      }

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

  // Submit Handler for New Club Registration
  const handleClubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clubName || !managerName || !clubFaydaId) return;

    setIsSubmittingClub(true);
    setClubSuccessMsg(null);

    setTimeout(() => {
      const newClubId = `EAF-CLB-${100 + clubs.length + 1}`;
      const newClub: RegisteredClub = {
        id: newClubId,
        name: clubName,
        region,
        manager: managerName,
        faydaId: clubFaydaId,
        category,
        status: "Active License",
        athletesCount: 0,
      };

      setClubs([newClub, ...clubs]);
      setIsSubmittingClub(false);
      setClubSuccessMsg(`Club "${clubName}" has been successfully licensed & registered with ID ${newClubId}!`);

      // Reset form
      setClubName("");
      setManagerName("");
      setClubFaydaId("");
    }, 1000);
  };

  // Filtered Roster Directory
  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.fullName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      m.faydaId.toLowerCase().includes(searchFilter.toLowerCase()) ||
      m.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
      m.clubName.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesRole = roleFilter === "All" || m.memberType === roleFilter;

    const matchesClub =
      clubFilter === "All"
        ? true
        : clubFilter === "UNATTACHED"
        ? m.clubId === "UNATTACHED"
        : m.clubId === clubFilter;

    return matchesSearch && matchesRole && matchesClub;
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200 dark:border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Athletics Club & Roster Hub
            </h1>
            <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-mono font-bold text-blue-700 dark:text-blue-400 border border-blue-500/20">
              Club Admin Portal
            </span>
          </div>
          <p className="mt-1.5 text-sm text-slate-600 dark:text-zinc-400">
            Register and manage athletes, coaches, and club licensing under Ethiopian Athletics Federation standards.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex rounded-xl bg-slate-200/70 dark:bg-zinc-900 p-1 border border-slate-300/50 dark:border-zinc-800 self-start md:self-auto">
          <button
            onClick={() => setActiveTab("members")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all ${
              activeTab === "members"
                ? "bg-white text-blue-600 shadow-sm dark:bg-zinc-800 dark:text-blue-400"
                : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Member Form
          </button>
          <button
            onClick={() => setActiveTab("club")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all ${
              activeTab === "club"
                ? "bg-white text-emerald-600 shadow-sm dark:bg-zinc-800 dark:text-emerald-400"
                : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Register Club
          </button>
          <button
            onClick={() => setActiveTab("directory")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all ${
              activeTab === "directory"
                ? "bg-white text-yellow-600 shadow-sm dark:bg-zinc-800 dark:text-yellow-400"
                : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Live Roster ({members.length})
          </button>
        </div>
      </div>

      {/* SUCCESS CONFIRMATION BANNER FOR MEMBER REGISTRATION */}
      {successMember && (
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-slate-900 dark:text-white shadow-lg space-y-3 animate-fadeIn">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white font-bold text-lg shadow-md">
                ✓
              </div>
              <div>
                <h3 className="text-base font-extrabold text-emerald-800 dark:text-emerald-300">
                  {successMember.memberType} Successfully Registered & Verified!
                </h3>
                <p className="text-xs text-slate-600 dark:text-zinc-300 font-mono mt-0.5">
                  Fayda Proclamation No. 1284/2023 Validation Complete
                </p>
              </div>
            </div>
            <button
              onClick={() => setSuccessMember(null)}
              className="text-xs text-slate-500 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-white"
            >
              ✕ Close
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 rounded-xl bg-white/70 dark:bg-zinc-950/70 p-4 border border-emerald-500/20 text-xs">
            <div>
              <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-mono block">EAF ID Badge</span>
              <span className="font-bold font-mono text-emerald-600 dark:text-emerald-400 text-sm">{successMember.id}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-mono block">Full Name</span>
              <span className="font-bold text-slate-800 dark:text-zinc-100">{successMember.fullName}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-mono block">Fayda National ID</span>
              <span className="font-bold font-mono text-slate-700 dark:text-zinc-300">{successMember.faydaId}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase font-mono block">Club Association</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">{successMember.clubName}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-[11px] text-slate-600 dark:text-zinc-400">
              The registered {successMember.memberType.toLowerCase()} is now active in the official competition roster directory.
            </span>
            <button
              onClick={() => setActiveTab("directory")}
              className="font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              View in Live Roster →
            </button>
          </div>
        </div>
      )}

      {/* MAIN LAYOUT CONTENT */}
      {activeTab === "members" && (
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Member Registration Form */}
          <Card className="lg:col-span-7 backdrop-blur-md">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-5 gap-3">
              <div>
                <CardTitle className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs">
                    +
                  </span>
                  Club Admin Member Registration Form
                </CardTitle>
                <CardDescription className="mt-1 text-xs text-slate-500 dark:text-zinc-400 font-normal">
                  Register athletes and coaches under your club or as unattached federation members.
                </CardDescription>
              </div>

              {/* Athlete / Coach Switcher */}
              <div className="flex rounded-xl bg-slate-100 dark:bg-zinc-950 p-1 border border-slate-200 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => {
                    setMemberType("Athlete");
                    setErrors({});
                  }}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                    memberType === "Athlete"
                      ? "bg-yellow-500 text-slate-950 shadow-sm"
                      : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  🏃 Athlete Form
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMemberType("Coach");
                    setErrors({});
                  }}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                    memberType === "Coach"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  📋 Coach Form
                </button>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
            <form onSubmit={handleMemberSubmit} className="space-y-4 text-xs">
              {/* Optional Club Association Select */}
              <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block font-bold text-slate-800 dark:text-zinc-200">
                    Club Association (Optional)
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
                  Select the target club roster to attach this member to, or choose &quot;Unattached / Independent&quot;.
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
                    Must match government records on Fayda National ID card.
                  </p>
                )}
              </div>

              {/* Grid: Fayda ID & Phone */}
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

              {/* DYNAMIC FIELDS BASED ON MEMBER TYPE */}
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
                          Must be at least 12 years of age.
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
                      <option value="Jumps & Throws">Jumps & Throws (High Jump, Long Jump, Javelin)</option>
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
                /* COACH FORM SPECIFIC FIELDS */
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
                          For official federation credential updates.
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

              {/* Submit Button with Loading State */}
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
                      Verifying Fayda ID & Registering {memberType}...
                    </>
                  ) : (
                    `Complete ${memberType} Registration`
                  )}
                </button>
              </div>
            </form>
            </CardContent>
          </Card>

          {/* Quick Roster Preview Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Summary Widget */}
            <Card className="backdrop-blur-md">
              <CardHeader className="flex flex-row items-center justify-between border-b pb-3 space-y-0">
                <CardTitle className="text-sm font-bold text-slate-900 dark:text-white">Roster Breakdown</CardTitle>
                <CardDescription className="text-xs font-mono font-normal text-slate-500 dark:text-zinc-400">EAF Certified</CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-center">
                    <span className="text-2xl font-extrabold text-yellow-600 dark:text-yellow-400 font-mono block">
                      {members.filter((m) => m.memberType === "Athlete").length}
                    </span>
                    <span className="text-[11px] font-bold text-slate-700 dark:text-zinc-300 uppercase font-mono">
                      Athletes
                    </span>
                  </div>
                  <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 text-center">
                    <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-mono block">
                      {members.filter((m) => m.memberType === "Coach").length}
                    </span>
                    <span className="text-[11px] font-bold text-slate-700 dark:text-zinc-300 uppercase font-mono">
                      Coaches
                    </span>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 dark:bg-zinc-950 p-4 border border-slate-200 dark:border-zinc-800 space-y-2 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-mono block">
                    Proclamation No. 1284/2023 Validation
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-zinc-400 leading-relaxed">
                    All submitted athlete and coach profiles undergo automated real-time verification against the National Fayda Identity Registry.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Additions List */}
            <Card className="backdrop-blur-md">
              <CardHeader className="flex flex-row items-center justify-between border-b pb-3 space-y-0">
                <CardTitle className="text-sm font-bold text-slate-900 dark:text-white">Recent Roster Registrations</CardTitle>
                <button
                  onClick={() => setActiveTab("directory")}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View All →
                </button>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {members.slice(0, 4).map((m) => (
                    <div
                      key={m.id}
                      className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50/50 p-3 text-xs dark:border-zinc-800 dark:bg-zinc-950/50"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-lg font-bold text-xs ${
                            m.memberType === "Athlete"
                              ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20"
                              : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                          }`}
                        >
                          {m.memberType === "Athlete" ? "ATH" : "CCH"}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-zinc-100">{m.fullName}</p>
                          <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-mono">
                            {m.clubName} · {m.faydaId}
                          </p>
                        </div>
                      </div>

                      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold font-mono text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        Verified
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* CLUB REGISTRATION TAB */}
      {activeTab === "club" && (
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Club Form */}
          <Card className="lg:col-span-5 backdrop-blur-md">
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-normal">
                  +
                </span>
                Register New Athletics Club
              </CardTitle>
              <CardDescription className="mt-1 text-xs text-slate-500 dark:text-zinc-400 font-normal">
                Complete manager Fayda verification and regional charter licensing.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {clubSuccessMsg && (
                <Card className="mb-6 border-emerald-500/30 bg-emerald-500/5">
                  <CardContent className="pt-5 pb-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm">
                        ✓
                      </span>
                      <div>
                        <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                          Club Registered Successfully
                        </p>
                        <p className="text-xs text-slate-500 dark:text-zinc-400 font-normal">
                          {clubSuccessMsg}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-center">
                        <span className="block text-[10px] uppercase font-mono font-bold text-slate-500 dark:text-zinc-500 mb-0.5">
                          Status
                        </span>
                        <span className="text-xs font-bold text-yellow-600 dark:text-yellow-400">
                          Pending Verification
                        </span>
                      </div>
                      <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3 text-center">
                        <span className="block text-[10px] uppercase font-mono font-bold text-slate-500 dark:text-zinc-500 mb-0.5">
                          Next Step
                        </span>
                        <span className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                          EAF Review
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <form onSubmit={handleClubSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">Club / Academy Name *</label>
                  <input
                    type="text"
                    required
                    value={clubName}
                    onChange={(e) => setClubName(e.target.value)}
                    placeholder="e.g. Gullele Youth Athletics Academy"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 placeholder-slate-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-600 focus:border-emerald-500 focus:outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">Region / City Administration *</label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 focus:border-emerald-500 focus:outline-none font-mono"
                  >
                    <option value="Addis Ababa">Addis Ababa</option>
                    <option value="Oromia">Oromia</option>
                    <option value="Amhara">Amhara</option>
                    <option value="Sidama">Sidama</option>
                    <option value="Tigray">Tigray</option>
                    <option value="SNNPR">SNNPR</option>
                    <option value="Dire Dawa">Dire Dawa</option>
                    <option value="Somali">Somali</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">Club Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 focus:border-emerald-500 focus:outline-none font-medium"
                  >
                    <option value="Regional Club">Regional Club</option>
                    <option value="National League">National League</option>
                    <option value="School Athletics">School Athletics</option>
                    <option value="Youth Academy">Youth Academy</option>
                  </select>
                </div>

                <div className="border-t border-slate-100 dark:border-zinc-800/80 pt-4">
                  <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">Club Manager Name *</label>
                  <input
                    type="text"
                    required
                    value={managerName}
                    onChange={(e) => setManagerName(e.target.value)}
                    placeholder="e.g. Gezahegne Abera"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 placeholder-slate-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-600 focus:border-emerald-500 focus:outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-zinc-300 mb-1">Manager Fayda National ID Number *</label>
                  <input
                    type="text"
                    required
                    value={clubFaydaId}
                    onChange={(e) => setClubFaydaId(formatFaydaIdInput(e.target.value))}
                    placeholder="FIN-3920-8492"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 font-mono placeholder-slate-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-600 focus:border-emerald-500 focus:outline-none font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingClub}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-500 active:scale-[0.98] disabled:opacity-50"
                >
                  {isSubmittingClub ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Registering & Verifying Fayda ID...
                    </>
                  ) : (
                    "Complete Club Registration"
                  )}
                </button>
              </form>
            </CardContent>
          </Card>

          {/* Registered Clubs Directory */}
          <Card className="lg:col-span-7 backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between border-b pb-4 space-y-0">
              <div>
                <CardTitle className="text-lg font-bold text-slate-900 dark:text-white">Registered Athletics Clubs</CardTitle>
                <CardDescription className="text-xs text-slate-500 dark:text-zinc-400 font-normal">EAF Verified Registry ({clubs.length} registered)</CardDescription>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                Live Registry
              </span>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {clubs.map((c) => (
                  <div
                    key={c.id}
                    className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50/50 p-4 transition-all hover:border-slate-300 dark:border-zinc-800/80 dark:bg-zinc-950/60 dark:hover:border-zinc-700"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-zinc-100 text-sm">{c.name}</h3>
                        <p className="text-[10px] text-slate-500 dark:text-zinc-500 font-mono mt-0.5">
                          ID: {c.id} · Region: {c.region} · Category: {c.category}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold font-mono border ${
                          c.status === "Active License"
                            ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"
                            : "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20"
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between border-t border-slate-200/60 dark:border-zinc-800/60 pt-3 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 dark:bg-zinc-800 text-[10px] font-bold text-slate-700 dark:text-zinc-300">
                          {c.manager.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <span className="text-slate-600 dark:text-zinc-400 font-medium">{c.manager}</span>
                          <span className="ml-2 text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">Fayda Verified ({c.faydaId})</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-700 dark:text-zinc-300 font-mono">
                        {c.athletesCount} Registered Athletes
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* LIVE ROSTER DIRECTORY TAB */}
      {activeTab === "directory" && (
        <Card className="backdrop-blur-md">
          <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b pb-5">
            <div>
              <CardTitle className="text-lg font-bold text-slate-900 dark:text-white">
                Federation Live Roster Directory
              </CardTitle>
              <CardDescription className="text-xs text-slate-500 dark:text-zinc-400">
                Official directory of verified Athletes and Coaches across all clubs.
              </CardDescription>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Search name, Fayda ID, club..."
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-600 focus:border-blue-500 focus:outline-none w-56 font-mono"
                />
              </div>

              {/* Role filter */}
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as "All" | "Athlete" | "Coach")}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 focus:border-blue-500 focus:outline-none font-medium"
              >
                <option value="All">All Roles</option>
                <option value="Athlete">Athletes Only</option>
                <option value="Coach">Coaches Only</option>
              </select>

              {/* Club Filter */}
              <select
                value={clubFilter}
                onChange={(e) => setClubFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 focus:border-blue-500 focus:outline-none font-medium"
              >
                <option value="All">All Clubs</option>
                {clubs.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
                <option value="UNATTACHED">Unattached / Independent</option>
              </select>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {/* Members Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-zinc-800 text-[10px] uppercase tracking-wider font-mono text-slate-500 dark:text-zinc-500">
                    <th className="py-3 px-4">Member ID</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Full Name</th>
                    <th className="py-3 px-4">Fayda National ID</th>
                    <th className="py-3 px-4">Club Association</th>
                    <th className="py-3 px-4">Category / Specialization</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60">
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map((m) => (
                      <tr key={m.id} className="hover:bg-slate-50/80 dark:hover:bg-zinc-800/30 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-zinc-100">
                          {m.id}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold font-mono border ${
                              m.memberType === "Athlete"
                                ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20"
                                : "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20"
                            }`}
                          >
                            {m.memberType}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                          {m.fullName}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-zinc-400">
                          {m.faydaId}
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-zinc-300">
                          {m.clubName}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 dark:text-zinc-400">
                          {m.memberType === "Athlete" ? m.eventCategory : m.certificationLevel}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-zinc-400 text-[11px]">
                          {m.phone}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold font-mono text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                            Verified
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-500 dark:text-zinc-500">
                        No roster members found matching filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
