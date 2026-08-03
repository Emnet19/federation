export type {
  Event,
  EventData,
  EventFormData,
  Filters,
  ToastMessage,
  ToastType,
  ApprovalHistoryEntry,
} from '@/features/events/types/event';

export type ApprovalAction = 'Approved' | 'Rejected';

export type EventStatus = 'Pending' | 'Approved' | 'Rejected' | 'Draft';
