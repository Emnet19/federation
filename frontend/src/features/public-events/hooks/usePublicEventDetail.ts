"use client";

import { useEffect, useState } from "react";
import type { EventDetail } from "../types";
import { publicEventService } from "../services/publicEventService";

export function usePublicEventDetail(id: string) {
  const [detail, setDetail] = useState<EventDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- data load on mount / id change
    setIsLoading(true);
    setError(null);

    publicEventService.getEventById(id).then((result) => {
      if (ignore) return;
      if (!result) {
        setError("Event not found or no longer available.");
      } else {
        setDetail(result);
      }
    }).catch(() => {
      if (!ignore) setError("Failed to load event details. Please try again.");
    }).finally(() => {
      if (!ignore) setIsLoading(false);
    });

    return () => {
      ignore = true;
    };
  }, [id]);

  return { detail, isLoading, error };
}
