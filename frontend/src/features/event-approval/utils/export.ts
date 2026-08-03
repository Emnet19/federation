import type { EventData } from '@/features/events/types/event';

const EXPORT_HEADERS = ['ID', 'Event Name', 'Category', 'Level', 'Organizer', 'Region', 'Stadium', 'Start Date', 'Status'];

export const exportEventsCSV = (events: EventData[]): void => {
  if (events.length === 0) return;

  const rows = events.map((e) => [
    e.id,
    `"${e.eventName}"`,
    e.category,
    e.competitionLevel,
    `"${e.organizerName}"`,
    e.region,
    `"${e.stadium}"`,
    e.startDate,
    e.status,
  ]);

  const csvContent = [EXPORT_HEADERS.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `EACRMS_Events_Export_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
