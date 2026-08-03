import Link from "next/link";

export default function PublicSiteFooter() {
  return (
    <footer className="py-8 px-4 text-center text-xs space-y-1 border-t border-slate-200 bg-white text-slate-500 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 transition-colors">
      <p>© 2026 Ethiopian Athletics Federation. All rights reserved.</p>
      <p className="font-mono text-[10px]">
        Powered by EACRMS · Integrated with Fayda Digital National ID ·{" "}
        <Link href="/events" className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400">
          Browse Athletics Events
        </Link>
      </p>
    </footer>
  );
}
