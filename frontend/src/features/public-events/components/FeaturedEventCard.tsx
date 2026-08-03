import Link from "next/link";
import Image from "next/image";
import type { PublicEvent } from "../types";
import { formatDate, formatTime, formatNumber } from "../utils/format";
import EventStatusBadge, { RegistrationBadge } from "./EventStatusBadge";
import Icon from "./Icon";

export default function FeaturedEventCard({ event }: { event: PublicEvent }) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-xl dark:border-zinc-800">
      <div className="relative h-72 sm:h-96">
        <Image
          src="/ethiopian_athlete_hero.png"
          alt={event.name}
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/95 via-blue-900/60 to-blue-900/10" />
      </div>

      <div className="absolute inset-0 flex items-end">
        <div className="w-full p-6 sm:p-10">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#E6A500] px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#1D1D1F] shadow-sm">
              Featured Event
            </span>
            <EventStatusBadge status={event.status} />
            <RegistrationBadge status={event.registrationStatus} />
          </div>

          <h2 className="max-w-2xl text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            {event.name}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-blue-100 dark:text-blue-200 sm:text-base">
            {event.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-blue-100 dark:text-blue-200">
            <span className="flex items-center gap-2">
              <Icon name="calendar" className="h-4 w-4 text-[#E6A500]" />
              {formatDate(event.date)} at {formatTime(event.startTime)}
            </span>
            <span className="flex items-center gap-2">
              <Icon name="mapPin" className="h-4 w-4 text-[#E6A500]" />
              {event.venue}, {event.city}
            </span>
            <span className="flex items-center gap-2">
              <Icon name="users" className="h-4 w-4 text-[#E6A500]" />
              {formatNumber(event.registeredAthletes)} registered
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/events/${event.id}`}
              className="flex items-center gap-2 rounded-2xl bg-[#E6A500] px-6 py-3 text-sm font-extrabold text-[#1D1D1F] shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              View Details
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
            <Link
              href="/events"
              className="flex items-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition-all hover:bg-white/20"
            >
              Explore All Events
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
