"use client";

// Prevent static prerendering — /events/* pages depend on client-side auth/localStorage
export const dynamic = "force-dynamic";

import { usePathname } from "next/navigation";
import FederationAdminLayout from "@/components/layout/FederationAdminLayout";
import MainLayout from "@/components/layout/MainLayout";

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/events/approval") {
    return <FederationAdminLayout>{children}</FederationAdminLayout>;
  }

  return <MainLayout>{children}</MainLayout>;
}
