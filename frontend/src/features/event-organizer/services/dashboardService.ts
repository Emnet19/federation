import type { DashboardData } from "../types";
import { DASHBOARD_ACTIVITY } from "../data/dashboard";
import { SCHEDULE_EVENTS } from "../data/schedules";

const LATENCY_MS = 400;

export const dashboardService = {
  async getDashboardData(): Promise<DashboardData> {
    await new Promise((res) => setTimeout(res, LATENCY_MS));

    const upcomingEvents = SCHEDULE_EVENTS.filter((event) => event.status === "Upcoming")
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 3)
      .map((event) => ({ ...event }));

    return {
      stats: {
        total: SCHEDULE_EVENTS.length,
        upcoming: SCHEDULE_EVENTS.filter((e) => e.status === "Upcoming").length,
        live: SCHEDULE_EVENTS.filter((e) => e.status === "Ongoing").length,
        completed: SCHEDULE_EVENTS.filter((e) => e.status === "Completed").length,
      },
      upcomingEvents,
      activity: DASHBOARD_ACTIVITY.map((entry) => ({ ...entry })),
    };
  },
};
