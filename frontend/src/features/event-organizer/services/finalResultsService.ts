import type { FinalResultEvent } from "../types";
import { FINAL_RESULTS } from "../data/finalResults";

const LATENCY_MS = 400;

export const finalResultsService = {
  async getResults(): Promise<FinalResultEvent[]> {
    await new Promise((res) => setTimeout(res, LATENCY_MS));
    return FINAL_RESULTS.map((result) => ({
      ...result,
      standings: result.standings.map((standing) => ({ ...standing })),
    }));
  },

  async getResultById(id: string): Promise<FinalResultEvent | null> {
    await new Promise((res) => setTimeout(res, 200));
    const result = FINAL_RESULTS.find((r) => r.id === id);
    return result ? { ...result } : null;
  },
};
