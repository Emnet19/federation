import { INITIAL_EVENTS } from '../data/events';
import type { Event, EventFormData, Filters } from '../types/event';

const STORAGE_KEY = 'eacrms_events_v1';

const getStoredEvents = (): Event[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data) as Event[];
    }
  } catch {
  }
  return INITIAL_EVENTS;
};

const saveStoredEvents = (events: Event[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch {
  }
};

export const eventService = {
  async getEvents(filters: Filters = {}): Promise<Event[]> {
    await new Promise((res) => setTimeout(res, 350));
    let events = getStoredEvents();

    if (filters.search) {
      const q = filters.search.toLowerCase();
      events = events.filter(
        (e) =>
          e.eventName.toLowerCase().includes(q) ||
          e.organizerName.toLowerCase().includes(q) ||
          e.city.toLowerCase().includes(q) ||
          e.id.toLowerCase().includes(q)
      );
    }

    if (filters.category && filters.category !== 'All') {
      events = events.filter((e) => e.category === filters.category);
    }

    if (filters.competitionLevel && filters.competitionLevel !== 'All') {
      events = events.filter((e) => e.competitionLevel === filters.competitionLevel);
    }

    if (filters.region && filters.region !== 'All') {
      events = events.filter((e) => e.region === filters.region);
    }

    if (filters.status && filters.status !== 'All') {
      events = events.filter((e) => e.status === filters.status);
    }

    if (filters.sortBy) {
      events = [...events].sort((a, b) => {
        if (filters.sortBy === 'startDate') {
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        }
        if (filters.sortBy === 'eventName') {
          return a.eventName.localeCompare(b.eventName);
        }
        if (filters.sortBy === 'submittedDate') {
          return new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime();
        }
        if (filters.sortBy === 'participants') {
          return Number(b.maxParticipants) - Number(a.maxParticipants);
        }
        return 0;
      });
    } else {
      events = [...events].sort((a, b) => new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime());
    }

    return events;
  },

  async getEventById(id: string): Promise<Event | null> {
    await new Promise((res) => setTimeout(res, 200));
    const events = getStoredEvents();
    return events.find((e) => e.id === id) || null;
  },

  async createEvent(eventData: EventFormData, isDraft = false): Promise<Event> {
    await new Promise((res) => setTimeout(res, 500));
    const events = getStoredEvents();

    const newId = `EVT-${new Date().getFullYear()}-${String(events.length + 1).padStart(3, '0')}`;
    const nowStr = new Date().toISOString().split('T')[0];
    const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) + ' EAT';

    const newEvent: Event = {
      ...eventData,
      id: newId,
      status: isDraft ? 'Draft' : 'Pending',
      registeredAthletes: 0,
      submittedBy: eventData.contactPerson || 'Federation Admin',
      submittedDate: nowStr,
      approvalHistory: [
        {
          action: isDraft ? 'Draft Created' : 'Submitted',
          user: eventData.contactPerson || 'Federation Admin',
          role: 'Event Organizer',
          date: `${nowStr} ${timeStr}`,
          notes: isDraft ? 'Event saved as draft configuration.' : 'Submitted for federation review and sanctioning.'
        }
      ]
    };

    const updatedEvents = [newEvent, ...events];
    saveStoredEvents(updatedEvents);
    return newEvent;
  },

  async updateEventStatus(id: string, newStatus: string, adminNote = '', actorName = 'Federation Board'): Promise<Event> {
    await new Promise((res) => setTimeout(res, 450));
    const events = getStoredEvents();
    const eventIndex = events.findIndex((e) => e.id === id);

    if (eventIndex === -1) {
      throw new Error(`Event with ID ${id} not found.`);
    }

    const nowStr = new Date().toISOString().split('T')[0];
    const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) + ' EAT';

    const currentEvent = events[eventIndex];
    const updatedHistory = [
      ...(currentEvent.approvalHistory || []),
      {
        action: newStatus,
        user: actorName,
        role: 'Federation Administrator',
        date: `${nowStr} ${timeStr}`,
        notes: adminNote || `Status updated to ${newStatus}.`
      }
    ];

    const updatedEvent: Event = {
      ...currentEvent,
      status: newStatus,
      adminNotes: adminNote || currentEvent.adminNotes,
      approvalHistory: updatedHistory
    };

    events[eventIndex] = updatedEvent;
    saveStoredEvents(events);
    return updatedEvent;
  },

  async resetData(): Promise<Event[]> {
    saveStoredEvents(INITIAL_EVENTS);
    return INITIAL_EVENTS;
  }
};
