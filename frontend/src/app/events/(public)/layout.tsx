import PublicSiteHeader from "@/components/layout/PublicSiteHeader";
import PublicSiteFooter from "@/components/layout/PublicSiteFooter";

export default function PublicEventsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-zinc-950 dark:text-zinc-100">
      <PublicSiteHeader />

      {/* ── DECORATIVE BACKGROUND ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[160px] dark:bg-blue-500/10" />
        <div className="absolute top-1/2 -right-32 h-[500px] w-[500px] rounded-full bg-yellow-500/5 blur-[160px] dark:bg-yellow-500/10" />
      </div>

      <main className="relative z-10 mx-auto flex-1 max-w-7xl px-4 py-10 sm:px-8 sm:py-12">
        {children}
      </main>

      <PublicSiteFooter />
    </div>
  );
}
