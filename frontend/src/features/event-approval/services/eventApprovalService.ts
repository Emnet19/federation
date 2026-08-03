import { eventService } from '@/features/events/services/eventService';
import type { Event, EventData, Filters } from '@/features/events/types/event';

export const APPROVAL_ACTOR = 'Ato Solomon Desta (EAF)';

export const eventApprovalService = {
  async getEvents(filters: Filters = {}): Promise<EventData[]> {
    return eventService.getEvents(filters);
  },

  async getEventById(id: string): Promise<Event | null> {
    return eventService.getEventById(id);
  },

  async updateStatus(eventId: string, newStatus: string, adminNote = ''): Promise<Event> {
    return eventService.updateEventStatus(eventId, newStatus, adminNote, APPROVAL_ACTOR);
  },

  async approveEvent(eventId: string, adminNote = ''): Promise<Event> {
    return eventService.updateEventStatus(eventId, 'Approved', adminNote, APPROVAL_ACTOR);
  },

  async rejectEvent(eventId: string, adminNote: string): Promise<Event> {
    return eventService.updateEventStatus(eventId, 'Rejected', adminNote, APPROVAL_ACTOR);
  },

  async requestChanges(eventId: string, adminNote = 'Requested changes from event organizer.'): Promise<Event> {
    return eventService.updateEventStatus(eventId, 'Draft', adminNote, APPROVAL_ACTOR);
  },

  async saveAdminNotes(eventId: string, currentStatus: string, notes: string): Promise<Event> {
    return eventService.updateEventStatus(eventId, currentStatus, notes, APPROVAL_ACTOR);
  },

  async resetData(): Promise<Event[]> {
    return eventService.resetData();
  },
};
