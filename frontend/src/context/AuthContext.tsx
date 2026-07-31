"use client";

import React, { createContext, useContext, useState } from "react";

export interface User {
  name: string;
  role: "Federation Admin" | "Athlete" | "Club Admin";
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: "Federation Admin" | "Athlete" | "Club Admin") => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PREDEFINED_USERS: Record<User["role"], User> = {
  "Federation Admin": {
    name: "Abebe Bikila",
    role: "Federation Admin",
    email: "admin@eaf.gov.et",
  },
  Athlete: {
    name: "Derartu Tulu",
    role: "Athlete",
    email: "derartu@eaf-athlete.et",
  },
  "Club Admin": {
    name: "Haile Gebrselassie",
    role: "Club Admin",
    email: "haile@arada-club.et",
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  React.useEffect(() => {
    const storedUser = localStorage.getItem("eacrms_session");
    if (storedUser) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe session restore
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored session", e);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (role: "Federation Admin" | "Athlete" | "Club Admin") => {
    const selectedUser = PREDEFINED_USERS[role];
    setUser(selectedUser);
    localStorage.setItem("eacrms_session", JSON.stringify(selectedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("eacrms_session");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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
