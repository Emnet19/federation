"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { AuthGuard } from "@/components/common/AuthGuard";

export default function FederationAdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLoginPage = pathname === "/federation/login" || pathname === "/";

  const allNavItems = [
    {
      name: "Dashboard",
      href: "/federation",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
        </svg>
      ),
    },
    {
      name: "Verification",
      href: "/federation/verification",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      name: "Club & Roster Hub",
      href: "/federation/clubs",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      name: "Member Registration",
      href: "/federation/clubs/members",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
    },
    {
      name: "Events Setup",
      href: "/federation/events",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: "Event Approval",
      href: "/events/approval",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      name: "Event Organizers",
      href: "/events/create",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      name: "Policy & Licensing",
      href: "/federation/policy",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      name: "Results Portal",
      href: "/federation/results",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ];

  const navItems = allNavItems.filter((item) => {
    if (item.href === "/events/approval") {
      return user?.role === "Federation Admin";
    }
    if (user?.role === "Club Admin") {
      return (
        item.href === "/federation" ||
        item.href === "/federation/clubs" ||
        item.href === "/federation/clubs/members" ||
        item.href === "/events/create"
      );
    }
    return true;
  });

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const initials = user?.name ? user.name.split(" ").map((n) => n[0]).join("") : "A";
  const activeLabel = navItems.find((item) => item.href === pathname)?.name ?? "Dashboard";

  if (isLoginPage) {
    return <AuthGuard>{children}</AuthGuard>;
  }

  return (
    <AuthGuard>
      <div className="flex min-h-screen" style={{ backgroundColor: "#F7F8FA", color: "#1D1D1F" }}>

        {/* ── SIDEBAR ── */}
        <aside
          className="hidden w-64 shrink-0 md:flex md:flex-col"
          style={{
            backgroundColor: "#FFFFFF",
            borderRight: "1px solid #D9DEE5",
          }}
        >
          {/* Logo Header */}
          <div
            className="flex h-16 items-center gap-3 px-6"
            style={{ borderBottom: "1px solid #D9DEE5" }}
          >
            <div
              className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg p-0.5"
              style={{ backgroundColor: "#F7F8FA", border: "1px solid #D9DEE5" }}
            >
              <Image src="/logo.png" alt="EAF Logo" fill className="object-contain" />
            </div>
            <div className="min-w-0">
              <span className="block text-sm font-bold tracking-wide truncate" style={{ color: "#1D1D1F" }}>
                EACRMS Admin
              </span>
              <span className="block text-[10px] font-medium" style={{ color: "#8B9098" }}>
                EAF Official Portal
              </span>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 space-y-1 px-3 py-5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-[0.98]"
                  style={
                    isActive
                      ? {
                          backgroundColor: "#DCEBF6",
                          color: "#0140A7",
                          border: "1px solid rgba(1,64,167,0.15)",
                        }
                      : {
                          color: "#555B63",
                          border: "1px solid transparent",
                        }
                  }
                  onMouseEnter={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "#F1F3F5";
                      (e.currentTarget as HTMLElement).style.color = "#1D1D1F";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "#555B63";
                    }
                  }}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Footer */}
          <div className="p-4" style={{ borderTop: "1px solid #D9DEE5", backgroundColor: "#F7F8FA" }}>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white shrink-0"
                style={{ backgroundColor: "#0140A7" }}
              >
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-xs font-bold" style={{ color: "#1D1D1F" }}>{user?.name}</p>
                <p className="truncate text-[10px] font-mono" style={{ color: "#8B9098" }}>{user?.role}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="flex w-full items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold transition-all"
                style={{
                  border: "1px solid #D9DEE5",
                  backgroundColor: "#FFFFFF",
                  color: "#555B63",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "#F1F3F5")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "#FFFFFF")}
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Portal Hub
              </Link>
              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold transition-all"
                style={{
                  border: "1px solid #D9DEE5",
                  backgroundColor: "transparent",
                  color: "#555B63",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(211,47,47,0.06)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(211,47,47,0.3)";
                  (e.currentTarget as HTMLElement).style.color = "#D32F2F";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLElement).style.borderColor = "#D9DEE5";
                  (e.currentTarget as HTMLElement).style.color = "#555B63";
                }}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        {/* ── MAIN PANEL ── */}
        <div className="flex flex-1 flex-col min-w-0">
          {/* Header */}
          <header
            className="flex h-16 items-center justify-between px-6 backdrop-blur-md"
            style={{
              borderBottom: "1px solid #D9DEE5",
              backgroundColor: "rgba(255,255,255,0.92)",
            }}
          >
            {/* Mobile: hamburger + logo */}
            <div className="flex items-center gap-4 md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{ color: "#555B63" }}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  }
                </svg>
              </button>
              <div className="flex items-center gap-2">
                <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded" style={{ border: "1px solid #D9DEE5" }}>
                  <Image src="/logo.png" alt="EAF Logo" fill className="object-contain" />
                </div>
                <span className="text-xs font-bold tracking-wide" style={{ color: "#1D1D1F" }}>EACRMS</span>
              </div>
            </div>

            {/* Desktop breadcrumb */}
            <div className="hidden md:flex items-center gap-2 text-xs font-medium">
              <span className="font-semibold uppercase tracking-wider text-[10px]" style={{ color: "#8B9098" }}>Admin</span>
              <span style={{ color: "#D9DEE5" }}>/</span>
              <span className="font-semibold" style={{ color: "#1D1D1F" }}>{activeLabel}</span>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold shadow-sm transition-all"
                style={{
                  border: "1px solid #D9DEE5",
                  backgroundColor: "#F7F8FA",
                  color: "#555B63",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "#DCEBF6")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "#F7F8FA")}
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Portal Hub</span>
              </Link>

              {/* Status badge */}
              <div
                className="rounded-full px-3 py-1 flex items-center gap-2"
                style={{ backgroundColor: "#DCEBF6", border: "1px solid rgba(1,64,167,0.15)" }}
              >
                <span className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: "#0140A7" }} />
                <span className="text-[10px] font-bold font-mono uppercase tracking-wider" style={{ color: "#0140A7" }}>
                  Fayda Secured
                </span>
              </div>

              <div className="h-8 w-px hidden sm:block" style={{ backgroundColor: "#D9DEE5" }} />
              <span className="hidden sm:inline text-xs" style={{ color: "#555B63" }}>
                Welcome,{" "}
                <span className="font-semibold" style={{ color: "#1D1D1F" }}>{user?.name}</span>
              </span>
            </div>
          </header>

          {/* Mobile Nav Drawer */}
          {mobileMenuOpen && (
            <div
              className="md:hidden px-4 py-4 space-y-1"
              style={{
                borderBottom: "1px solid #D9DEE5",
                backgroundColor: "rgba(255,255,255,0.97)",
                backdropFilter: "blur(12px)",
              }}
            >
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-semibold transition-all"
                    style={
                      isActive
                        ? { backgroundColor: "#DCEBF6", color: "#0140A7", border: "1px solid rgba(1,64,167,0.15)" }
                        : { color: "#555B63", border: "1px solid transparent" }
                    }
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                );
              })}
              <div
                className="mt-4 pt-4 flex items-center justify-between px-4"
                style={{ borderTop: "1px solid #D9DEE5" }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: "#0140A7" }}
                  >
                    {initials}
                  </div>
                  <div>
                    <p className="text-xs font-bold" style={{ color: "#1D1D1F" }}>{user?.name}</p>
                    <p className="text-[10px] font-mono" style={{ color: "#8B9098" }}>{user?.role}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="rounded-lg px-3 py-1.5 text-xs font-bold transition-all"
                  style={{
                    border: "1px solid rgba(211,47,47,0.3)",
                    color: "#D32F2F",
                    backgroundColor: "rgba(211,47,47,0.05)",
                  }}
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
