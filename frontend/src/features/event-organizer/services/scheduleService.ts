import type { ScheduleEvent } from "../types";
import { SCHEDULE_EVENTS } from "../data/schedules";

const LATENCY_MS = 400;

export const scheduleService = {
  async getEvents(): Promise<ScheduleEvent[]> {
    await new Promise((res) => setTimeout(res, LATENCY_MS));
    return SCHEDULE_EVENTS.map((event) => ({ ...event }));
  },

  async getEventById(id: string): Promise<ScheduleEvent | null> {
    await new Promise((res) => setTimeout(res, 200));
    const event = SCHEDULE_EVENTS.find((e) => e.id === id);
    return event ? { ...event } : null;
  },
};
