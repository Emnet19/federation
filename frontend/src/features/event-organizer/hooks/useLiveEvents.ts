"use client";

import { useCallback, useEffect, useState } from "react";
import type { LiveCompetitor, LiveEvent } from "../types";
import { liveResultsService } from "../services/liveResultsService";

export function useLiveEvents() {
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([]);
  const [competitors, setCompetitors] = useState<LiveCompetitor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    () =>
      Promise.all([
        liveResultsService.getLiveEvents(),
        liveResultsService.getLiveCompetitors(),
      ]),
    []
  );

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const [events, athleteList] = await fetchData();
        if (!ignore) {
          setLiveEvents(events);
          setCompetitors(athleteList);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Failed to load live results.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }
    void load();
    return () => {
      ignore = true;
    };
  }, [fetchData]);

  const refresh = useCallback(() => {
    setIsLoading(true);
    setError(null);
    async function load() {
      try {
        const [events, athleteList] = await fetchData();
        setLiveEvents(events);
        setCompetitors(athleteList);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load live results.");
      } finally {
        setIsLoading(false);
      }
    }
    void load();
  }, [fetchData]);

  return { liveEvents, competitors, isLoading, error, refresh };
}
