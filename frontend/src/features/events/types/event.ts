export interface EventFormData {
  eventName: string;
  category: string;
  competitionLevel: string;
  description: string;
  registrationOpens: string;
  registrationDeadline: string;
  startDate: string;
  endDate: string;
  eventTime: string;
  timeZone: string;
  stadium: string;
  city: string;
  region: string;
  venueAddress: string;
  maxParticipants: string;
  ageCategory: string;
  genderCategory: string;
  trackFieldType: string;
  organizerName: string;
  contactPerson: string;
  email: string;
  phone: string;
}

export interface ApprovalHistoryEntry {
  action: string;
  user: string;
  role: string;
  date: string;
  notes: string;
}

export interface Event extends EventFormData {
  id: string;
  status: string;
  opStatus?: string;
  registeredAthletes: number;
  submittedBy: string;
  submittedDate: string;
  assignedManager?: string;
  participatingClubs?: string[];
  isPublic?: boolean;
  adminNotes?: string;
  approvalHistory: ApprovalHistoryEntry[];
}

export type EventData = Event;

export interface Filters {
  search?: string;
  category?: string;
  competitionLevel?: string;
  region?: string;
  status?: string;
  sortBy?: string;
}

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  type: ToastType;
  text: string;
}
