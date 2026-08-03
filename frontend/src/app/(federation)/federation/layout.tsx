"use client";

// Prevent static prerendering — federation pages depend on client-side auth/localStorage
export const dynamic = "force-dynamic";

import FederationAdminLayout from "@/components/layout/FederationAdminLayout";

export default function FederationLayout({ children }: { children: React.ReactNode }) {
  return <FederationAdminLayout>{children}</FederationAdminLayout>;
}
