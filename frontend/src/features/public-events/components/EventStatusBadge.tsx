import { cn } from "@/lib/utils";

interface EventStatusBadgeProps {
  status: "Upcoming" | "Live" | "Completed";
  className?: string;
}

const STYLES: Record<EventStatusBadgeProps["status"], string> = {
  Upcoming: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900/60",
  Live: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/60",
  Completed: "bg-slate-100 text-slate-600 border-slate-200 dark:bg-zinc-800/60 dark:text-zinc-300 dark:border-zinc-700",
};

export default function EventStatusBadge({ status, className }: EventStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide",
        STYLES[status],
        className
      )}
    >
      {status === "Live" && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
        </span>
      )}
      {status}
    </span>
  );
}

interface RegistrationBadgeProps {
  status: "Open" | "Closing Soon" | "Closed";
  className?: string;
}

const REG_STYLES: Record<RegistrationBadgeProps["status"], string> = {
  Open: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/60",
  "Closing Soon": "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900/60",
  Closed: "bg-slate-100 text-slate-500 border-slate-200 dark:bg-zinc-800/60 dark:text-zinc-400 dark:border-zinc-700",
};

export function RegistrationBadge({ status, className }: RegistrationBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide",
        REG_STYLES[status],
        className
      )}
    >
      {status === "Open" ? "Registration Open" : status === "Closed" ? "Registration Closed" : "Closing Soon"}
    </span>
  );
}
