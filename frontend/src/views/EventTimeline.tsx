"use client";

export default function EventTimeline() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Event Timeline</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
          Chronological lifecycle view of competition events from creation to final results.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/30 px-6 py-24 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-zinc-800">
          <svg className="h-7 w-7 text-slate-400 dark:text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-sm font-bold text-slate-800 dark:text-zinc-200">Timeline Module In Progress</p>
        <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
          Event lifecycle milestones will be visualized here.
        </p>
      </div>
    </div>
  );
}
