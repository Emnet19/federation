"use client";

import { useCallback, useEffect, useState } from "react";
import type { DashboardData } from "../types";
import { dashboardService } from "../services/dashboardService";

export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(() => dashboardService.getDashboardData(), []);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const dashboardData = await fetchData();
        if (!ignore) {
          setData(dashboardData);
          setError(null);
        }
      } catch (err) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Failed to load dashboard data.");
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
        const dashboardData = await fetchData();
        setData(dashboardData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dashboard data.");
      } finally {
        setIsLoading(false);
      }
    }
    void load();
  }, [fetchData]);

  return { data, isLoading, error, refresh };
}
