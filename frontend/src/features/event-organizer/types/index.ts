export type ScheduleEventStatus = "Upcoming" | "Ongoing" | "Completed";

export interface ScheduleEvent {
  id: string;
  name: string;
  category: string;
  eventType: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  organizer: string;
  registeredAthletes: number;
  status: ScheduleEventStatus;
  description: string;
  capacity: number;
  registrationDeadline: string;
  competitionLevel: string;
  contactPerson: string;
}

export type CompetitionStatus = "LIVE";

export type AthleteLiveStatus = "Running" | "Finished" | "Qualified" | "Eliminated";

export interface LeaderboardEntry {
  rank: number;
  bibNumber: number;
  athleteName: string;
  club: string;
  lane: number;
  result: string;
  position: string;
  status: AthleteLiveStatus;
}

export interface LiveEvent {
  id: string;
  name: string;
  category: string;
  currentRound: string;
  heat: string;
  status: CompetitionStatus;
  currentTime: string;
  venue: string;
  leaderboard: LeaderboardEntry[];
}

export interface LiveCompetitor {
  id: string;
  photo: string | null;
  athleteName: string;
  club: string;
  bibNumber: number;
  lane: number;
  countryOrRegion: string;
  currentPosition: number;
  currentTime: string;
  status: AthleteLiveStatus;
}

export type Medal = "gold" | "silver" | "bronze";

export interface FinalStanding {
  position: number;
  bibNumber: number;
  athlete: string;
  club: string;
  result: string;
  medal?: Medal;
}

export interface FinalResultEvent {
  id: string;
  eventName: string;
  eventDate: string;
  venue: string;
  winner: string;
  standings: FinalStanding[];
}

export type TimelineStageStatus = "Completed" | "Current" | "Upcoming";

export interface TimelineStage {
  id: string;
  stage: string;
  date: string;
  time: string;
  description: string;
  status: TimelineStageStatus;
}

export interface TimelineEvent {
  id: string;
  eventName: string;
  stages: TimelineStage[];
}

export interface DashboardQuickAction {
  name: string;
  href: string;
  desc: string;
  icon: string;
}

export interface DashboardActivity {
  text: string;
  time: string;
  type: string;
}

export interface DashboardStats {
  total: number;
  upcoming: number;
  live: number;
  completed: number;
}

export interface DashboardData {
  stats: DashboardStats;
  upcomingEvents: ScheduleEvent[];
  activity: DashboardActivity[];
}
