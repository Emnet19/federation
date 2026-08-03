"use client";

import { useEffect, useState } from "react";
import type { FinalResultDetail, LiveEventDetail, PublicEvent, ScheduleEntry } from "../types";
import { publicEventService } from "../services/publicEventService";

export function usePublicEventsPage() {
  const [featured, setFeatured] = useState<PublicEvent | null>(null);
  const [liveEvents, setLiveEvents] = useState<PublicEvent[]>([]);
  const [liveDetails, setLiveDetails] = useState<LiveEventDetail[]>([]);
  const [finalResults, setFinalResults] = useState<FinalResultDetail[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<PublicEvent[]>([]);
  const [completedEvents, setCompletedEvents] = useState<PublicEvent[]>([]);
  const [schedule, setSchedule] = useState<ScheduleEntry[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [eventTypes, setEventTypes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    Promise.all([
      publicEventService.getFeaturedEvent(),
      publicEventService.getLiveEvents(),
      publicEventService.getLiveEventDetails(),
      publicEventService.getFinalResultDetails(),
      publicEventService.getUpcomingEvents(),
      publicEventService.getCompletedEvents(),
      publicEventService.getSchedule(),
      publicEventService.getEventCategories(),
      publicEventService.getEventTypes(),
    ]).then(([feat, live, liveDetail, results, upcoming, completed, sched, cats, types]) => {
      if (ignore) return;
      setFeatured(feat);
      setLiveEvents(live);
      setLiveDetails(liveDetail);
      setFinalResults(results);
      setUpcomingEvents(upcoming);
      setCompletedEvents(completed);
      setSchedule(sched);
      setCategories(cats);
      setEventTypes(types);
    }).finally(() => {
      if (!ignore) setIsLoading(false);
    });

    return () => {
      ignore = true;
    };
  }, []);

  return {
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
  };
}
