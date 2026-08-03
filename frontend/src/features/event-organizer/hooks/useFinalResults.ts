"use client";

import { useCallback, useEffect, useState } from "react";
import type { FinalResultEvent } from "../types";
import { finalResultsService } from "../services/finalResultsService";

export function useFinalResults() {
  const [results, setResults] = useState<FinalResultEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResults = useCallback(() => finalResultsService.getResults(), []);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const data = await fetchResults();
        if (!ignore) {
          setResults(data);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Failed to load final results.");
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
  }, [fetchResults]);

  const refresh = useCallback(() => {
    setIsLoading(true);
    setError(null);
    async function load() {
      try {
        const data = await fetchResults();
        setResults(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load final results.");
      } finally {
        setIsLoading(false);
      }
    }
    void load();
  }, [fetchResults]);

  return { results, isLoading, error, refresh };
}
