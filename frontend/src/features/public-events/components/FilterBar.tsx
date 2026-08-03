import React from "react";
import Icon from "./Icon";

export interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  eventType: string;
  onEventTypeChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  categories: string[];
  eventTypes: string[];
  sortOptions: { value: string; label: string }[];
  isLoading?: boolean;
}

const selectClass =
  "w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-9 text-xs font-semibold text-slate-700 shadow-sm transition-colors focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200";

function Select({
  value,
  onChange,
  options,
  placeholder,
  ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  ariaLabel: string;
}) {
  return (
    <div className="relative">
      <select value={value} onChange={(e) => onChange(e.target.value)} aria-label={ariaLabel} className={selectClass}>
        <option value="all">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <Icon name="chevronDown" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    </div>
  );
}

export default function FilterBar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  eventType,
  onEventTypeChange,
  sortBy,
  onSortChange,
  categories,
  eventTypes,
  sortOptions,
}: FilterBarProps) {
  return (
    <div className="grid gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4 dark:border-zinc-800 dark:bg-zinc-900/60">
      <div className="relative sm:col-span-2 lg:col-span-1">
        <Icon name="search" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search events by name, venue or organizer..."
          aria-label="Search events"
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs font-semibold text-slate-700 shadow-sm placeholder:text-slate-400 transition-colors focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:placeholder:text-zinc-500"
        />
      </div>

      <Select
        value={category}
        onChange={onCategoryChange}
        options={categories}
        placeholder="All Categories"
        ariaLabel="Filter by category"
      />

      <Select
        value={eventType}
        onChange={onEventTypeChange}
        options={eventTypes}
        placeholder="All Types"
        ariaLabel="Filter by event type"
      />

      <div className="relative">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Sort events"
          className={selectClass}
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <Icon name="chevronDown" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
    </div>
  );
}
