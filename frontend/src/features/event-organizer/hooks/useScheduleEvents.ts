"use client";

import { useCallback, useEffect, useState } from "react";
import type { ScheduleEvent } from "../types";
import { scheduleService } from "../services/scheduleService";

export function useScheduleEvents() {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(() => scheduleService.getEvents(), []);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const data = await fetchEvents();
        if (!ignore) {
          setEvents(data);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Failed to load the event schedule.");
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
  }, [fetchEvents]);

  const refresh = useCallback(() => {
    setIsLoading(true);
    setError(null);
    async function load() {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load the event schedule.");
      } finally {
        setIsLoading(false);
      }
    }
    void load();
  }, [fetchEvents]);

  return { events, isLoading, error, refresh };
}
