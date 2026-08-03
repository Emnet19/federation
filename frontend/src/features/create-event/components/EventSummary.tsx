import {
  Calendar,
  MapPin,
  Users,
  UserCheck,
  Clock,
  Sparkles,
  ShieldAlert,
  Tag
} from 'lucide-react';
import type { EventFormData } from '@/features/events/types/event';

interface EventSummaryProps {
  formData: EventFormData;
}

export default function EventSummary({ formData }: EventSummaryProps) {
  const {
    eventName,
    category,
    competitionLevel,
    stadium,
    city,
    region,
    startDate,
    endDate,
    eventTime,
    timeZone,
    organizerName,
    contactPerson,
    email,
    maxParticipants,
    ageCategory,
    genderCategory,
    trackFieldType
  } = formData;

  return (
    <div className="sticky top-20 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* Live Badge Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Live Preview Card
          </span>
        </div>
        <div className="flex items-center space-x-1 text-[11px] font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Real-time Sync</span>
        </div>
      </div>

      {/* Main Title & Status Badge */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Status Badge */}
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5 animate-pulse" />
            Pending Approval
          </span>

          {/* Level Badge */}
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
            {competitionLevel || 'Competition Level'}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 leading-snug break-words">
          {eventName || 'Untitled Athletics Event'}
        </h3>

        <div className="flex flex-wrap gap-1.5">
          <span className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
            <Tag className="w-3 h-3 mr-1" />
            {category || 'Category'}
          </span>
          {ageCategory && (
            <span className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-100">
              Age: {ageCategory}
            </span>
          )}
          {genderCategory && (
            <span className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">
              Gender: {genderCategory}
            </span>
          )}
        </div>
      </div>

      {/* Grid Key Details */}
      <div className="space-y-3 pt-2 text-xs">

        {/* Schedule */}
        <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
          <Calendar className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-medium text-slate-500 block text-[11px]">Event Schedule</span>
            <p className="font-semibold text-slate-800">
              {startDate ? startDate : 'YYYY-MM-DD'}
              {endDate && endDate !== startDate ? ` — ${endDate}` : ''}
            </p>
            {eventTime && (
              <p className="text-[11px] text-slate-500 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                {eventTime} {timeZone || 'EAT'}
              </p>
            )}
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
          <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-medium text-slate-500 block text-[11px]">Venue & Location</span>
            <p className="font-semibold text-slate-800">
              {stadium || 'Stadium / Venue'}
            </p>
            <p className="text-[11px] text-slate-500">
              {[city, region].filter(Boolean).join(', ') || 'City, Region'}
            </p>
          </div>
        </div>

        {/* Capacity / Quota */}
        <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
          <Users className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5 w-full">
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-500 text-[11px]">Participant Quota</span>
              <span className="font-bold text-slate-800">
                {maxParticipants ? `${Number(maxParticipants).toLocaleString()} Athletes` : 'Not specified'}
              </span>
            </div>
            {trackFieldType && (
              <p className="text-[11px] text-slate-500 truncate pt-0.5">
                Surface: {trackFieldType}
              </p>
            )}
          </div>
        </div>

        {/* Organizer */}
        <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
          <UserCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-medium text-slate-500 block text-[11px]">Organizer Contact</span>
            <p className="font-semibold text-slate-800">
              {organizerName || 'Organizer Name'}
            </p>
            {contactPerson && (
              <p className="text-[11px] text-slate-600">Contact: {contactPerson}</p>
            )}
            {email && <p className="text-[11px] text-blue-600 truncate">{email}</p>}
          </div>
        </div>

      </div>

      {/* Federation Clearance Note */}
      <div className="pt-2">
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-200/60 text-[11px] text-amber-900 flex items-start space-x-2">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            Upon submission, this event will be routed to the Ethiopian Athletics Federation Sanctioning Office for technical verification and calendar slot confirmation.
          </p>
        </div>
      </div>
    </div>
  );
}
