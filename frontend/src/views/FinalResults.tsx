"use client";

export default function FinalResults() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Final Results</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
          Official World Athletics-compliant result cards for completed events.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/30 px-6 py-24 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-zinc-800">
          <svg className="h-7 w-7 text-slate-400 dark:text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <p className="text-sm font-bold text-slate-800 dark:text-zinc-200">Results Module In Progress</p>
        <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
          Final results will be published here once the live timing pipeline is connected.
        </p>
      </div>
    </div>
  );
}
