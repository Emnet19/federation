"use client";

export default function LiveResults() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Live Results</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
          Real-time event progress feed from the timing hardware network.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/30 px-6 py-24 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-zinc-800">
          <svg className="h-7 w-7 text-slate-400 dark:text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <p className="text-sm font-bold text-slate-800 dark:text-zinc-200">Live Feed In Progress</p>
        <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
          Live results will stream here during competition sessions.
        </p>
      </div>
    </div>
  );
}
