"use client";

import { useMemo, useState } from "react";
import { CalendarDays, ChevronDown, RefreshCw, Search } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
import { EmptyState } from "../components/EmptyState";
import { StatusBadge } from "../components/StatusBadge";
import { ScheduleEventCard } from "../components/ScheduleEventCard";
import { useScheduleEvents } from "../hooks/useScheduleEvents";
import { cn } from "@/lib/utils";

const STATUS_TABS = ["All", "Upcoming", "Ongoing", "Completed"] as const;

export default function EventScheduleView() {
  const { events, isLoading, error, refresh } = useScheduleEvents();
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(
    () => Array.from(new Set(events.map((event) => event.category))).sort(),
    [events]
  );

  const stats = useMemo(
    () => ({
      total: events.length,
      upcoming: events.filter((e) => e.status === "Upcoming").length,
      ongoing: events.filter((e) => e.status === "Ongoing").length,
      completed: events.filter((e) => e.status === "Completed").length,
    }),
    [events]
  );

  const filteredEvents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return events.filter((event) => {
      const matchesStatus = statusFilter === "All" || event.status === statusFilter;
      const matchesCategory = categoryFilter === "All" || event.category === categoryFilter;
      const matchesQuery =
        !query ||
        event.name.toLowerCase().includes(query) ||
        event.venue.toLowerCase().includes(query) ||
        event.organizer.toLowerCase().includes(query);
      return matchesStatus && matchesCategory && matchesQuery;
    });
  }, [events, statusFilter, categoryFilter, searchQuery]);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        eyebrow={<StatusBadge status="Ongoing" pulse />}
        title="Event Schedule"
        subtitle="Session-by-session timetable for approved competitions."
        actions={
          <button
            type="button"
            onClick={refresh}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm transition-all hover:border-blue-600 hover:text-blue-600 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-blue-400 dark:hover:text-blue-400 cursor-pointer"
          >
            <RefreshCw className={cn("h-3.5 w-3.5", isLoading && "animate-spin")} />
            Refresh
          </button>
        }
      />

      {error ? (
        <EmptyState title="Schedule unavailable" description={error} />
      ) : isLoading ? (
        <LoadingSkeleton rows={5} />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { label: "Total Events", value: stats.total, accent: "#0140A7" },
              { label: "Upcoming", value: stats.upcoming, accent: "#0288D1" },
              { label: "Ongoing", value: stats.ongoing, accent: "#F59E0B" },
              { label: "Completed", value: stats.completed, accent: "#555B63" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60"
              >
                <p className="text-2xl font-extrabold" style={{ color: stat.accent }}>
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-zinc-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="flex flex-wrap items-center gap-2">
              {STATUS_TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setStatusFilter(tab)}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-xs font-bold transition-all active:scale-95 cursor-pointer",
                    statusFilter === tab
                      ? "bg-[#0140A7] text-white shadow-md dark:bg-blue-600"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-[#0140A7] hover:text-[#0140A7] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-blue-400 dark:hover:text-blue-400"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="relative flex-1 lg:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search event, venue, organizer..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-700 shadow-sm transition-colors placeholder:text-slate-400 focus:border-[#0140A7] focus:outline-none focus:ring-2 focus:ring-[#0140A7]/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:placeholder:text-zinc-500"
              />
            </div>

            <div className="relative lg:w-52">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-9 text-xs font-semibold text-slate-700 shadow-sm transition-colors focus:border-[#0140A7] focus:outline-none focus:ring-2 focus:ring-[#0140A7]/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 cursor-pointer"
              >
                <option value="All">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
            </div>
          </div>

          {filteredEvents.length === 0 ? (
            <EmptyState
              icon={CalendarDays}
              title="No events match your filters"
              description="Try adjusting the search term, status, or category to see more results."
            />
          ) : (
            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <ScheduleEventCard
                  key={event.id}
                  event={event}
                  defaultExpanded={event.status === "Ongoing"}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
