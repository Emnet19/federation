import type { TimelineEvent } from "../types";
import { EVENT_TIMELINES } from "../data/timelines";

const LATENCY_MS = 450;

export const timelineService = {
  async getTimelines(): Promise<TimelineEvent[]> {
    await new Promise((res) => setTimeout(res, LATENCY_MS));
    return EVENT_TIMELINES.map((timeline) => ({
      ...timeline,
      stages: timeline.stages.map((stage) => ({ ...stage })),
    }));
  },
};
