"use client";

import { useEffect, useState } from "react";
import type { PublicEvent, PublicEventFilters } from "../types";
import { publicEventService } from "../services/publicEventService";

export function usePublicEventBrowse(filters: PublicEventFilters) {
  const [events, setEvents] = useState<PublicEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- data load on mount + filter change
    setIsLoading(true);

    publicEventService.getEvents(filters).then((result) => {
      if (!ignore) setEvents(result);
    }).finally(() => {
      if (!ignore) setIsLoading(false);
    });

    return () => {
      ignore = true;
    };
  }, [filters]);

  return { events, isLoading };
}
