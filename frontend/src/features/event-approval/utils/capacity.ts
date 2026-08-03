export interface CapacityStats {
  registered: number;
  maxCap: number;
  remaining: number;
  fillPercentage: number;
}

export const getCapacityStats = (
  maxParticipants: string | number | undefined,
  registeredAthletes?: number
): CapacityStats => {
  const registered = registeredAthletes || 0;
  const maxCap = Number(maxParticipants) || 1;
  const remaining = Math.max(0, maxCap - registered);
  const fillPercentage = Math.min(100, Math.round((registered / maxCap) * 100));
  return { registered, maxCap, remaining, fillPercentage };
};
