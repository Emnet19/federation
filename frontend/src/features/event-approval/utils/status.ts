export interface StatusBadgeConfig {
  badgeClass: string;
  dotClass: string;
  labelKey: string;
}

export const STATUS_BADGE_CONFIG: Record<string, StatusBadgeConfig> = {
  Approved: { badgeClass: 'badge-success', dotClass: 'bg-success', labelKey: 'statuses.Approved' },
  Rejected: { badgeClass: 'badge-error', dotClass: 'bg-error', labelKey: 'statuses.Rejected' },
  Draft: { badgeClass: 'badge-neutral', dotClass: 'bg-text-secondary', labelKey: 'statuses.Draft' },
  Pending: { badgeClass: 'badge-warning', dotClass: 'bg-secondary animate-pulse', labelKey: 'statuses.Pending' },
};

export const getStatusBadgeConfig = (status: string): StatusBadgeConfig =>
  STATUS_BADGE_CONFIG[status] ?? STATUS_BADGE_CONFIG.Pending;
