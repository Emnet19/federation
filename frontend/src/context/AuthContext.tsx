"use client";

import React, { createContext, useContext, useState } from "react";

export interface User {
  name: string;
  role: "Federation Admin" | "Club Admin";
  email: string;
}

// Demo credential registry — in production this is a backend API call
export const DEMO_CREDENTIALS: Array<{ email: string; password: string; user: User }> = [
  {
    email: "admin@eaf.gov.et",
    password: "Admin@2026",
    user: { name: "Abebe Bikila", role: "Federation Admin", email: "admin@eaf.gov.et" },
  },
  {
    email: "haile@arada-club.et",
    password: "Club@2026",
    user: { name: "Haile Gebrselassie", role: "Club Admin", email: "haile@arada-club.et" },
  },
  {
    email: "defence@eaf-club.et",
    password: "Club@2026",
    user: { name: "Col. Derartu Tulu", role: "Club Admin", email: "defence@eaf-club.et" },
  },
];

interface AuthContextType {
  user: User | null;
  loginWithCredentials: (email: string, password: string) => { success: boolean; error?: string; redirectTo?: string };
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  React.useEffect(() => {
    const storedUser = localStorage.getItem("eacrms_session");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored session", e);
      }
    }
    setIsLoading(false);
  }, []);

  const loginWithCredentials = (
    email: string,
    password: string
  ): { success: boolean; error?: string; redirectTo?: string } => {
    const match = DEMO_CREDENTIALS.find(
      (c) =>
        c.email.toLowerCase() === email.toLowerCase().trim() &&
        c.password === password
    );

    if (!match) {
      return { success: false, error: "Invalid email or password. Please check your credentials." };
    }

    setUser(match.user);
    localStorage.setItem("eacrms_session", JSON.stringify(match.user));

    const redirectTo =
      match.user.role === "Federation Admin" ? "/federation" : "/club-admin";

    return { success: true, redirectTo };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("eacrms_session");
  };

  return (
    <AuthContext.Provider value={{ user, loginWithCredentials, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
