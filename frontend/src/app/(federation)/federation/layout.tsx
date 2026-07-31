"use client";

// Prevent static prerendering — federation pages depend on client-side auth/localStorage
export const dynamic = "force-dynamic";

import MainLayout from "@/components/layout/MainLayout";

export default function FederationLayout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
