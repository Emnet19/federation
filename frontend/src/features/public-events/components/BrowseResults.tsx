import type { FinalResultDetail, LiveEventDetail, PublicEvent } from "../types";
import EventCard from "./EventCard";
import LiveEventCard from "./LiveEventCard";
import CompletedEventCard from "./CompletedEventCard";
import { EventCardSkeleton } from "./Skeletons";
import Icon from "./Icon";

interface BrowseResultsProps {
  events: PublicEvent[];
  liveDetails: LiveEventDetail[];
  finalResults: FinalResultDetail[];
  isLoading: boolean;
  emptyMessage?: string;
}

export default function BrowseResults({
  events,
  liveDetails,
  finalResults,
  isLoading,
  emptyMessage = "No events match your search and filters.",
}: BrowseResultsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <EventCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white/60 px-6 py-16 text-center dark:border-zinc-700 dark:bg-zinc-900/40">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
          <Icon name="search" className="h-7 w-7" />
        </div>
        <p className="mt-4 text-sm font-bold text-slate-700 dark:text-zinc-200">No events found</p>
        <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => {
        if (event.status === "Live") {
          return (
            <LiveEventCard
              key={event.id}
              event={event}
              live={liveDetails.find((l) => l.eventId === event.id)}
            />
          );
        }
        if (event.status === "Completed") {
          return (
            <CompletedEventCard
              key={event.id}
              event={event}
              result={finalResults.find((r) => r.eventId === event.id)}
            />
          );
        }
        return <EventCard key={event.id} event={event} />;
      })}
    </div>
  );
}
