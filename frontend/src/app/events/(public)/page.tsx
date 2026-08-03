"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { usePublicEventsPage } from "@/features/public-events/hooks/usePublicEventsPage";
import { usePublicEventBrowse } from "@/features/public-events/hooks/usePublicEventBrowse";
import { SORT_OPTIONS } from "@/features/public-events/data/events";
import type { BrowseFilter, PublicEventFilters } from "@/features/public-events/types";
import SectionHeader from "@/features/public-events/components/SectionHeader";
import FilterBar from "@/features/public-events/components/FilterBar";
import BrowseResults from "@/features/public-events/components/BrowseResults";
import EventCard from "@/features/public-events/components/EventCard";
import LiveEventCard from "@/features/public-events/components/LiveEventCard";
import CompletedEventCard from "@/features/public-events/components/CompletedEventCard";
import FeaturedEventCard from "@/features/public-events/components/FeaturedEventCard";
import ScheduleTable from "@/features/public-events/components/ScheduleTable";
import Icon from "@/features/public-events/components/Icon";
import {
  FeaturedSkeleton,
  LiveEventCardSkeleton,
  ScheduleSkeleton,
  EventCardSkeleton,
} from "@/features/public-events/components/Skeletons";

const TABS: { value: BrowseFilter; label: string }[] = [
  { value: "all", label: "All Events" },
  { value: "upcoming", label: "Upcoming Events" },
  { value: "live", label: "Live Events" },
  { value: "completed", label: "Completed Events" },
];

export default function PublicEventsPage() {
  const {
    featured,
    liveEvents,
    liveDetails,
    finalResults,
    upcomingEvents,
    completedEvents,
    schedule,
    categories,
    eventTypes,
    isLoading,
  } = usePublicEventsPage();

  const [activeTab, setActiveTab] = useState<BrowseFilter>("all");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [eventType, setEventType] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const filters = useMemo<PublicEventFilters>(
    () => ({
      search: search.trim() || undefined,
      category: category === "all" ? undefined : category,
      eventType: eventType === "all" ? undefined : eventType,
      sortBy: sortBy as PublicEventFilters["sortBy"],
    }),
    [search, category, eventType, sortBy]
  );

  const { events, isLoading: browseLoading } = usePublicEventBrowse(filters);

  const visibleEvents = useMemo(() => {
    if (activeTab === "all") return events;
    return events.filter((e) => e.status.toLowerCase() === activeTab);
  }, [events, activeTab]);

  const liveDetailFor = (id: string) => liveDetails.find((l) => l.eventId === id);
  const resultFor = (id: string) => finalResults.find((r) => r.eventId === id);

  return (
    <div className="space-y-16 sm:space-y-20">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-xl dark:border-zinc-800">
        <div className="relative h-80 sm:h-[420px]">
          <Image
            src="/ethiopian_athlete_hero.png"
            alt="Ethiopian athletes competing at a national athletics event"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-900/70 to-blue-900/20" />
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-2xl p-6 sm:p-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/15 px-4 py-1.5 text-xs font-bold text-blue-100 backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#E6A500]" />
              Official EAF Competition Calendar
            </div>
            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Athletics Events
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-blue-100 sm:text-base">
              Explore upcoming and live athletics competitions across Ethiopia — from the national
              championships to marathons, road races and cross country trials.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#live-now"
                className="flex items-center gap-2 rounded-2xl bg-[#E6A500] px-6 py-3 text-sm font-extrabold text-[#1D1D1F] shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-600 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600" />
                </span>
                Live Now
              </a>
              <a
                href="#schedule"
                className="flex items-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition-all hover:bg-white/20"
              >
                <Icon name="calendar" className="h-4 w-4" />
                Event Schedule
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED EVENT ── */}
      <section id="featured" className="space-y-6">
        <SectionHeader
          eyebrow="Headline Competition"
          title="Featured Event"
          description="This month's headline competition — don't miss the action."
        />
        {isLoading ? (
          <FeaturedSkeleton />
        ) : featured ? (
          <FeaturedEventCard event={featured} />
        ) : null}
      </section>

      {/* ── LIVE EVENTS ── */}
      <section id="live-now" className="space-y-6">
        <SectionHeader
          eyebrow="Live Now"
          title="Live Events"
          description="Competitions currently in progress with real-time results streaming."
        />
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <LiveEventCardSkeleton key={i} />
            ))}
          </div>
        ) : liveEvents.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {liveEvents.map((event) => (
              <LiveEventCard key={event.id} event={event} live={liveDetailFor(event.id)} />
            ))}
          </div>
        ) : (
          <p className="rounded-3xl border border-dashed border-slate-300 bg-white/60 py-10 text-center text-xs text-slate-500 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-400">
            No competitions are live right now. Check back soon.
          </p>
        )}
      </section>

      {/* ── BROWSE EVENTS ── */}
      <section id="browse" className="space-y-6">
        <SectionHeader
          eyebrow="Browse Competitions"
          title="Find Your Event"
          description="Search and filter the full competition calendar by category, type and status."
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={
                  isActive
                    ? "cursor-pointer rounded-full bg-blue-600 px-5 py-2 text-xs font-extrabold text-white shadow-md transition-all active:scale-[0.98] dark:bg-blue-500"
                    : "cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-bold text-slate-600 transition-all hover:border-blue-600 hover:text-blue-600 active:scale-[0.98] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-blue-400 dark:hover:text-blue-400"
                }
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <FilterBar
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          eventType={eventType}
          onEventTypeChange={setEventType}
          sortBy={sortBy}
          onSortChange={setSortBy}
          categories={categories}
          eventTypes={eventTypes}
          sortOptions={SORT_OPTIONS}
        />

        <div className="flex items-center justify-between px-1">
          <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400">
            {browseLoading ? (
              "Loading events..."
            ) : (
              <>
                Showing <span className="font-extrabold text-slate-800 dark:text-zinc-100">{visibleEvents.length}</span>{" "}
                {visibleEvents.length === 1 ? "event" : "events"}
              </>
            )}
          </p>
          {activeTab !== "all" && (
            <button
              onClick={() => setActiveTab("all")}
              className="cursor-pointer text-xs font-bold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400"
            >
              Clear status filter
            </button>
          )}
        </div>

        <BrowseResults
          events={visibleEvents}
          liveDetails={liveDetails}
          finalResults={finalResults}
          isLoading={browseLoading}
        />
      </section>

      {/* ── UPCOMING EVENTS ── */}
      <section id="upcoming" className="space-y-6">
        <SectionHeader
          eyebrow="Coming Up"
          title="Upcoming Events"
          description="Mark your calendar — the next competitions on the Ethiopian athletics calendar."
        />
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>

      {/* ── EVENT SCHEDULE ── */}
      <section id="schedule" className="space-y-6">
        <SectionHeader
          eyebrow="Calendar"
          title="Event Schedule"
          description="A professional timetable of disciplines, sessions and competition windows."
        />
        {isLoading ? <ScheduleSkeleton /> : <ScheduleTable schedule={schedule} />}
      </section>

      {/* ── COMPLETED EVENTS ── */}
      <section id="completed" className="space-y-6">
        <SectionHeader
          eyebrow="Recently Completed"
          title="Completed Events"
          description="Results from recently finished competitions, with champions crowned."
        />
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {completedEvents.map((event) => (
              <CompletedEventCard key={event.id} event={event} result={resultFor(event.id)} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
