import type { LiveCompetitor, LiveEvent } from "../types";
import { LIVE_EVENTS } from "../data/liveEvents";
import { LIVE_COMPETITORS } from "../data/competitors";

const LATENCY_MS = 500;

export const liveResultsService = {
  async getLiveEvents(): Promise<LiveEvent[]> {
    await new Promise((res) => setTimeout(res, LATENCY_MS));
    return LIVE_EVENTS.map((event) => ({
      ...event,
      leaderboard: event.leaderboard.map((entry) => ({ ...entry })),
    }));
  },

  async getLiveCompetitors(): Promise<LiveCompetitor[]> {
    await new Promise((res) => setTimeout(res, 350));
    return LIVE_COMPETITORS.map((competitor) => ({ ...competitor }));
  },
};
