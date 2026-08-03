"use client";

import { useCallback, useEffect, useState } from "react";
import type { TimelineEvent } from "../types";
import { timelineService } from "../services/timelineService";

export function useEventTimelines() {
  const [timelines, setTimelines] = useState<TimelineEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTimelines = useCallback(() => timelineService.getTimelines(), []);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const data = await fetchTimelines();
        if (!ignore) {
          setTimelines(data);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Failed to load event timelines.");
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
  }, [fetchTimelines]);

  const refresh = useCallback(() => {
    setIsLoading(true);
    setError(null);
    async function load() {
      try {
        const data = await fetchTimelines();
        setTimelines(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load event timelines.");
      } finally {
        setIsLoading(false);
      }
    }
    void load();
  }, [fetchTimelines]);

  return { timelines, isLoading, error, refresh };
}
