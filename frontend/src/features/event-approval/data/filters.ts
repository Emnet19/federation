import type { Filters } from '@/features/events/types/event';

export const PAGE_SIZE = 6;

export const DEFAULT_FILTERS: Filters = {
  search: '',
  category: 'All',
  competitionLevel: 'All',
  region: 'All',
  status: 'All',
  sortBy: 'submittedDate',
};

export const CATEGORY_OPTIONS = ['Track', 'Field', 'Road Race', 'Cross Country', 'Marathon'];

export const COMPETITION_LEVEL_OPTIONS = ['Regional', 'National', 'International'];

export const REGION_OPTIONS = ['Addis Ababa', 'Oromia', 'Amhara', 'Sidama', 'Tigray', 'SNNPR'];

export interface StatusFilterOption {
  value: string;
  label?: string;
  labelKey?: string;
}

export const STATUS_OPTIONS: StatusFilterOption[] = [
  { value: 'Pending', label: 'Pending Approval' },
  { value: 'Approved', labelKey: 'statuses.Approved' },
  { value: 'Rejected', label: 'Rejected' },
  { value: 'Draft', label: 'Draft' },
];
