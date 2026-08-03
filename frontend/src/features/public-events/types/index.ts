export type EventStatus = "Upcoming" | "Live" | "Completed";
export type RegistrationStatus = "Open" | "Closing Soon" | "Closed";
export type CompetitionLevel = "National" | "International" | "Regional";
export type BrowseFilter = "all" | "upcoming" | "live" | "completed";

export interface PublicEvent {
  id: string;
  name: string;
  category: string;
  eventType: string;
  competitionLevel: CompetitionLevel;
  description: string;
  longDescription: string;
  date: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  venue: string;
  city: string;
  region: string;
  venueAddress: string;
  organizer: string;
  contactPerson: string;
  registrationStatus: RegistrationStatus;
  registrationDeadline: string;
  registeredAthletes: number;
  maxParticipants: number;
  ageCategory: string;
  genderCategory: string;
  status: EventStatus;
  featured?: boolean;
  hasLiveResults?: boolean;
  hasFinalResults?: boolean;
}

export interface ScheduleEntry {
  id: string;
  eventId: string;
  eventName: string;
  discipline: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  category: string;
  status: EventStatus;
}

export interface LiveCompetitor {
  rank: number;
  bibNumber: number;
  athleteName: string;
  club: string;
  lane: number;
  result: string;
  status: "Running" | "Finished" | "Qualified" | "Eliminated";
}

export interface LiveEventDetail {
  eventId: string;
  name: string;
  currentRound: string;
  currentTime: string;
  venue: string;
  numberOfCompetitors: number;
  leaderboard: LiveCompetitor[];
}

export interface FinalStanding {
  position: number;
  bibNumber: number;
  athlete: string;
  club: string;
  result: string;
  medal?: "gold" | "silver" | "bronze";
}

export interface FinalResultDetail {
  eventId: string;
  winner: string;
  winnerClub: string;
  venue: string;
  eventDate: string;
  standings: FinalStanding[];
}

export interface TimelineStage {
  id: string;
  stage: string;
  date: string;
  time: string;
  description: string;
  status: "Completed" | "Current" | "Upcoming";
}

export interface VenueInfo {
  name: string;
  city: string;
  region: string;
  address: string;
  capacity: number;
  surface: string;
  facilities: string[];
}

export interface EventDetail {
  event: PublicEvent;
  schedule: ScheduleEntry[];
  liveResults?: LiveEventDetail;
  finalResults?: FinalResultDetail;
  timeline: TimelineStage[];
  venue: VenueInfo;
}

export interface PublicEventFilters {
  search?: string;
  category?: string;
  eventType?: string;
  sortBy?: "date" | "name" | "participants";
}
