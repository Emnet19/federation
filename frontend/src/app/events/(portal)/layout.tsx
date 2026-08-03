"use client";

// Prevent static prerendering — /events/* pages depend on client-side auth/localStorage
export const dynamic = "force-dynamic";

import { usePathname } from "next/navigation";
import FederationAdminLayout from "@/components/layout/FederationAdminLayout";
import EventOrganizerLayout from "@/components/layout/EventOrganizerLayout";
import { EventOrganizerProvider } from "@/context/EventOrganizerContext";

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/events/approval") {
    return <FederationAdminLayout>{children}</FederationAdminLayout>;
  }

  return (
    <EventOrganizerProvider>
      <EventOrganizerLayout>{children}</EventOrganizerLayout>
    </EventOrganizerProvider>
  );
}
