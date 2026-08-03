export function EventCardSkeleton() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="h-5 w-24 animate-pulse rounded-full bg-slate-200 dark:bg-zinc-700" />
        <div className="h-5 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-zinc-700" />
      </div>
      <div className="h-4 w-3/4 animate-pulse rounded-md bg-slate-200 dark:bg-zinc-700" />
      <div className="mt-4 space-y-2.5">
        <div className="h-3.5 w-full animate-pulse rounded-md bg-slate-100 dark:bg-zinc-800" />
        <div className="h-3.5 w-5/6 animate-pulse rounded-md bg-slate-100 dark:bg-zinc-800" />
        <div className="h-3.5 w-4/6 animate-pulse rounded-md bg-slate-100 dark:bg-zinc-800" />
        <div className="h-3.5 w-2/3 animate-pulse rounded-md bg-slate-100 dark:bg-zinc-800" />
      </div>
      <div className="mt-5 h-10 animate-pulse rounded-xl bg-slate-200 dark:bg-zinc-700" />
    </div>
  );
}

export function LiveEventCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-red-200 bg-white shadow-sm dark:border-red-900/50 dark:bg-zinc-900/60">
      <div className="h-9 animate-pulse bg-red-200/70 dark:bg-red-950/40" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-3/4 animate-pulse rounded-md bg-slate-200 dark:bg-zinc-700" />
        <div className="h-3.5 w-full animate-pulse rounded-md bg-slate-100 dark:bg-zinc-800" />
        <div className="h-3.5 w-2/3 animate-pulse rounded-md bg-slate-100 dark:bg-zinc-800" />
        <div className="h-10 animate-pulse rounded-xl bg-slate-200 dark:bg-zinc-700" />
      </div>
    </div>
  );
}

export function ScheduleSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
      <div className="space-y-3 p-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-8 animate-pulse rounded-lg bg-slate-100 dark:bg-zinc-800" />
        ))}
      </div>
    </div>
  );
}

export function FeaturedSkeleton() {
  return (
    <div className="h-72 animate-pulse rounded-3xl bg-slate-200 dark:bg-zinc-800 sm:h-96" />
  );
}
