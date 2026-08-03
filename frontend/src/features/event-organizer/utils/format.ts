const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function parseISODate(value: string): Date {
  return new Date(`${value}T00:00:00`);
}

export function formatDate(value: string): string {
  const date = parseISODate(value);
  return `${date.getDate()} ${MONTHS_SHORT[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatDay(value: string): string {
  const date = parseISODate(value);
  return String(date.getDate()).padStart(2, "0");
}

export function formatMonth(value: string): string {
  const date = parseISODate(value);
  return MONTHS_SHORT[date.getMonth()];
}

export function formatTimeRange(start: string, end: string): string {
  const to12Hour = (value: string) => {
    const [hour, minute] = value.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${displayHour}:${String(minute).padStart(2, "0")} ${period}`;
  };
  return `${to12Hour(start)} – ${to12Hour(end)}`;
}
