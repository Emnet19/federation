"use client";

import React, { createContext, useContext, useState } from "react";

export interface EventOrganizer {
  name: string;
  email: string;
  organization: string;
}

// Demo credential registry — in production this is a backend API call
export const ORGANIZER_DEMO_CREDENTIALS = {
  email: "organizer@eacrms.com",
  password: "organizer123",
};

interface EventOrganizerContextType {
  organizer: EventOrganizer | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  isLoading: boolean;
}

const EventOrganizerContext = createContext<EventOrganizerContextType | undefined>(undefined);

export function EventOrganizerProvider({ children }: { children: React.ReactNode }) {
  const [organizer, setOrganizer] = useState<EventOrganizer | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  React.useEffect(() => {
    const storedOrganizer = localStorage.getItem("eacrms_organizer_session");
    if (storedOrganizer) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe session restore
        setOrganizer(JSON.parse(storedOrganizer));
      } catch (e) {
        console.error("Failed to parse organizer session", e);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (
    email: string,
    password: string
  ): { success: boolean; error?: string } => {
    if (
      email.toLowerCase().trim() === ORGANIZER_DEMO_CREDENTIALS.email &&
      password === ORGANIZER_DEMO_CREDENTIALS.password
    ) {
      const session: EventOrganizer = {
        name: "EAF Event Organizer",
        email: ORGANIZER_DEMO_CREDENTIALS.email,
        organization: "Ethiopian Athletics Federation",
      };
      setOrganizer(session);
      localStorage.setItem("eacrms_organizer_session", JSON.stringify(session));
      return { success: true };
    }
    return {
      success: false,
      error: "Invalid email or password. Please check your organizer credentials.",
    };
  };

  const logout = () => {
    setOrganizer(null);
    localStorage.removeItem("eacrms_organizer_session");
  };

  return (
    <EventOrganizerContext.Provider value={{ organizer, login, logout, isLoading }}>
      {children}
    </EventOrganizerContext.Provider>
  );
}

export function useEventOrganizer() {
  const context = useContext(EventOrganizerContext);
  if (context === undefined) {
    throw new Error("useEventOrganizer must be used within an EventOrganizerProvider");
  }
  return context;
}
