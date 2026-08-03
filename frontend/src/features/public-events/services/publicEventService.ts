import type { EventDetail, PublicEvent, PublicEventFilters, ScheduleEntry } from "../types";
import { PUBLIC_EVENTS, EVENT_CATEGORIES, EVENT_TYPES } from "../data/events";
import { PUBLIC_SCHEDULE } from "../data/schedules";
import { getLiveEventDetail, LIVE_EVENT_DETAILS } from "../data/liveEvents";
import { getFinalResultDetail, FINAL_RESULT_DETAILS } from "../data/finalResults";
import { getEventTimeline } from "../data/timelines";
import { getVenueInfo } from "../data/venues";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const byStatus = (status: PublicEvent["status"]) => (e: PublicEvent) => e.status === status;

export const publicEventService = {
  async getEvents(filters: PublicEventFilters = {}): Promise<PublicEvent[]> {
    await delay(400);
    let events = [...PUBLIC_EVENTS];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      events = events.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.organizer.toLowerCase().includes(q) ||
          e.city.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q)
      );
    }

    if (filters.category && filters.category !== "All Categories") {
      events = events.filter((e) => e.category === filters.category);
    }

    if (filters.eventType && filters.eventType !== "All Types") {
      events = events.filter((e) => e.eventType === filters.eventType);
    }

    switch (filters.sortBy) {
      case "name":
        events.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "participants":
        events.sort((a, b) => b.registeredAthletes - a.registeredAthletes);
        break;
      case "date":
      default:
        events.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
        break;
    }

    return events;
  },

  async getFeaturedEvent(): Promise<PublicEvent | null> {
    await delay(250);
    return PUBLIC_EVENTS.find((e) => e.featured) ?? null;
  },

  async getUpcomingEvents(): Promise<PublicEvent[]> {
    await delay(300);
    return PUBLIC_EVENTS.filter(byStatus("Upcoming")).sort(
      (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
  },

  async getLiveEvents(): Promise<PublicEvent[]> {
    await delay(300);
    return PUBLIC_EVENTS.filter(byStatus("Live"));
  },

  async getLiveEventDetails(): Promise<import("../types").LiveEventDetail[]> {
    await delay(300);
    return LIVE_EVENT_DETAILS;
  },

  async getFinalResultDetails(): Promise<import("../types").FinalResultDetail[]> {
    await delay(300);
    return FINAL_RESULT_DETAILS;
  },

  async getCompletedEvents(): Promise<PublicEvent[]> {
    await delay(300);
    return PUBLIC_EVENTS.filter(byStatus("Completed")).sort(
      (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
  },

  async getSchedule(): Promise<ScheduleEntry[]> {
    await delay(350);
    return PUBLIC_SCHEDULE;
  },

  async getEventCategories(): Promise<string[]> {
    await delay(100);
    return EVENT_CATEGORIES;
  },

  async getEventTypes(): Promise<string[]> {
    await delay(100);
    return EVENT_TYPES;
  },

  async getEventById(id: string): Promise<EventDetail | null> {
    await delay(450);
    const event = PUBLIC_EVENTS.find((e) => e.id === id);
    if (!event) return null;

    const schedule = PUBLIC_SCHEDULE.filter((s) => s.eventId === id);
    const liveResults = getLiveEventDetail(id);
    const finalResults = getFinalResultDetail(id);
    const timeline = getEventTimeline(id);
    const venue = getVenueInfo(event.venue);

    return {
      event,
      schedule,
      liveResults,
      finalResults,
      timeline,
      venue: venue ?? {
        name: event.venue,
        city: event.city,
        region: event.region,
        address: event.venueAddress,
        capacity: event.maxParticipants,
        surface: event.eventType,
        facilities: ["On-site registration desk", "First aid station", "Spectator area"],
      },
    };
  },
};
