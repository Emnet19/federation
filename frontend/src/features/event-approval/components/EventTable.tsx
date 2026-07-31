'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Eye,
  CheckCircle,
  XCircle,
  MoreVertical,
  ArrowUpDown,
  Calendar,
  MapPin,
  Check,
  ChevronLeft,
  ChevronRight,
  Inbox
} from 'lucide-react';
import { getStatusBadgeConfig } from '../utils/status';
import { PAGE_SIZE } from '../data/filters';
import type { EventData } from '@/features/events/types/event';

interface EventTableProps {
  events: EventData[];
  isLoading: boolean;
  onViewDetails: (event: EventData) => void;
  onApprove: (event: EventData) => void;
  onReject: (event: EventData) => void;
  onSortChange: (field: string) => void;
}

export default function EventTable({
  events,
  isLoading,
  onViewDetails,
  onApprove,
  onReject,
  onSortChange
}: EventTableProps) {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const totalItems = events.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE) || 1;
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedEvents = events.slice(startIndex, startIndex + PAGE_SIZE);

  const handleSort = (field: string) => {
    onSortChange(field);
  };

  const renderStatusBadge = (status: string) => {
    const config = getStatusBadgeConfig(status);
    return <span className={config.badgeClass}><span className={`dot ${config.dotClass}`} />{t(config.labelKey)}</span>;
  };

  if (isLoading) {
    return (
      <div className="card p-6 space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-14 skeleton-shimmer rounded-full w-full" />
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="card p-12 text-center space-y-4">
        <div className="w-16 h-16 bg-primary-light/50 dark:bg-primary/20 text-primary dark:text-info rounded-full flex items-center justify-center mx-auto">
          <Inbox className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-text-primary dark:text-dark-text">{t('table.emptyTitle')}</h3>
          <p className="text-xs text-text-secondary dark:text-dark-text-muted max-w-sm mx-auto">
            {t('table.emptyDesc')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">

          <thead>
            <tr className="table-header">
              <th className="py-3.5 px-4 cursor-pointer hover:text-primary dark:hover:text-info transition-colors" onClick={() => handleSort('eventName')}>
                <div className="flex items-center space-x-1">
                  <span>{t('table.eventName')}</span>
                  <ArrowUpDown className="w-3 h-3 text-text-secondary" />
                </div>
              </th>
              <th className="py-3.5 px-4">{t('table.category')}</th>
              <th className="py-3.5 px-4">{t('table.organizer')}</th>
              <th className="py-3.5 px-4">{t('table.regionStadium')}</th>
              <th className="py-3.5 px-4 cursor-pointer hover:text-primary dark:hover:text-info transition-colors" onClick={() => handleSort('startDate')}>
                <div className="flex items-center space-x-1">
                  <span>{t('table.schedule')}</span>
                  <ArrowUpDown className="w-3 h-3 text-text-secondary" />
                </div>
              </th>
              <th className="py-3.5 px-4 cursor-pointer hover:text-primary dark:hover:text-info transition-colors" onClick={() => handleSort('participants')}>
                <div className="flex items-center space-x-1">
                  <span>{t('table.quota')}</span>
                  <ArrowUpDown className="w-3 h-3 text-text-secondary" />
                </div>
              </th>
              <th className="py-3.5 px-4 cursor-pointer hover:text-primary dark:hover:text-info transition-colors" onClick={() => handleSort('submittedDate')}>
                <div className="flex items-center space-x-1">
                  <span>{t('table.submittedBy')}</span>
                  <ArrowUpDown className="w-3 h-3 text-text-secondary" />
                </div>
              </th>
              <th className="py-3.5 px-4 text-center">{t('table.status')}</th>
              <th className="py-3.5 px-4 text-right">{t('table.actions')}</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border/60 dark:divide-dark-border text-xs text-text-primary dark:text-dark-text">
            {paginatedEvents.map((evt) => (
              <tr key={evt.id} className="table-row group">
                <td className="py-4 px-4 font-semibold max-w-[220px]">
                  <div className="truncate font-semibold text-text-primary dark:text-dark-text group-hover:text-primary dark:group-hover:text-info transition-colors">
                    {evt.eventName}
                  </div>
                  <div className="text-[10px] text-text-secondary dark:text-dark-text-muted font-normal">
                    {evt.id} • {evt.competitionLevel}
                  </div>
                </td>

                <td className="py-4 px-4 whitespace-nowrap">
                  <span className="badge-info">{evt.category}</span>
                </td>

                <td className="py-4 px-4 max-w-[160px]">
                  <div className="truncate font-medium text-text-primary dark:text-dark-text">{evt.organizerName}</div>
                  <div className="text-[10px] text-text-secondary dark:text-dark-text-muted truncate">{evt.contactPerson}</div>
                </td>

                <td className="py-4 px-4 whitespace-nowrap">
                  <div className="font-semibold text-text-primary dark:text-dark-text">{evt.region}</div>
                  <div className="text-[10px] text-text-secondary dark:text-dark-text-muted flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-error shrink-0" />
                    <span className="truncate max-w-[120px]">{evt.stadium}</span>
                  </div>
                </td>

                <td className="py-4 px-4 whitespace-nowrap">
                  <div className="font-medium text-text-primary dark:text-dark-text flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-primary dark:text-info" />
                    <span>{evt.startDate}</span>
                  </div>
                  <div className="text-[10px] text-text-secondary dark:text-dark-text-muted">{evt.eventTime} {evt.timeZone}</div>
                </td>

                <td className="py-4 px-4 whitespace-nowrap">
                  <div className="font-bold text-text-primary dark:text-dark-text">
                    {evt.maxParticipants ? Number(evt.maxParticipants).toLocaleString() : '0'}
                  </div>
                  <div className="text-[10px] text-success font-medium">
                    {evt.registeredAthletes || 0} {t('common.registered')}
                  </div>
                </td>

                <td className="py-4 px-4 whitespace-nowrap">
                  <div className="font-medium text-text-primary dark:text-dark-text">{evt.submittedBy}</div>
                  <div className="text-[10px] text-text-secondary dark:text-dark-text-muted">{evt.submittedDate}</div>
                </td>

                <td className="py-4 px-4 text-center whitespace-nowrap">
                  {renderStatusBadge(evt.status)}
                </td>

                <td className="py-4 px-4 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end space-x-1">

                    <button
                      onClick={() => onViewDetails(evt)}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold text-primary dark:text-info bg-primary-light/50 dark:bg-primary/20 hover:bg-primary-light transition-colors flex items-center gap-1 cursor-pointer"
                      title={t('table.viewEventDetails')}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      {t('table.viewEventDetails')}
                    </button>

                    {evt.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => onApprove(evt)}
                          className="p-1.5 rounded-full text-success hover:bg-success/10 transition-colors cursor-pointer"
                          title={t('table.approveEvent')}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => onReject(evt)}
                          className="p-1.5 rounded-full text-error hover:bg-error/10 transition-colors cursor-pointer"
                          title={t('table.rejectEvent')}
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </>
                    )}

                    <div className="relative">
                      <button
                        onClick={() => setActiveMenuId(activeMenuId === evt.id ? null : evt.id)}
                        className="p-1.5 rounded-full text-text-secondary hover:text-text-primary dark:hover:text-dark-text hover:bg-primary-light/40 dark:hover:bg-dark-border transition-colors cursor-pointer"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {activeMenuId === evt.id && (
                        <div className="absolute right-0 mt-1 w-44 bg-surface dark:bg-dark-surface rounded-2xl shadow-lg border border-border dark:border-dark-border py-1.5 z-20 text-left text-xs animate-fade-in">
                          <button
                            onClick={() => { onViewDetails(evt); setActiveMenuId(null); }}
                            className="w-full px-3.5 py-2 text-text-primary dark:text-dark-text hover:bg-background dark:hover:bg-dark-border flex items-center gap-2 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-text-secondary" />
                            {t('table.viewFullDossier')}
                          </button>
                          <button
                            onClick={() => { onApprove(evt); setActiveMenuId(null); }}
                            className="w-full px-3.5 py-2 text-success hover:bg-success/10 flex items-center gap-2 font-medium cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5 text-success" />
                            {t('table.approveEvent')}
                          </button>
                          <button
                            onClick={() => { onReject(evt); setActiveMenuId(null); }}
                            className="w-full px-3.5 py-2 text-error hover:bg-error/10 flex items-center gap-2 font-medium cursor-pointer"
                          >
                            <XCircle className="w-3.5 h-3.5 text-error" />
                            {t('table.rejectEvent')}
                          </button>
                        </div>
                      )}
                    </div>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-background dark:bg-dark-surface px-6 py-4 border-t border-border dark:border-dark-border flex items-center justify-between text-xs text-text-secondary dark:text-dark-text-muted">
        <div>
          <span className="font-semibold text-text-primary dark:text-dark-text">{startIndex + 1}</span> to{' '}
          <span className="font-semibold text-text-primary dark:text-dark-text">
            {Math.min(startIndex + PAGE_SIZE, totalItems)}
          </span>{' '}
          of <span className="font-semibold text-text-primary dark:text-dark-text">{totalItems}</span> events
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-full border border-border dark:border-dark-border bg-surface dark:bg-dark-surface text-text-primary dark:text-dark-text hover:bg-primary-light/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="font-semibold text-text-primary dark:text-dark-text">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-full border border-border dark:border-dark-border bg-surface dark:bg-dark-surface text-text-primary dark:text-dark-text hover:bg-primary-light/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
