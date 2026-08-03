'use client';

import '@/i18n';
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import EventTable from '../components/EventTable';
import EventDrawer from '../components/EventDrawer';
import ApprovalModal from '../components/ApprovalModal';
import { eventApprovalService } from '../services/eventApprovalService';
import { exportEventsCSV } from '../utils/export';
import {
  CATEGORY_OPTIONS,
  COMPETITION_LEVEL_OPTIONS,
  DEFAULT_FILTERS,
  REGION_OPTIONS,
  STATUS_OPTIONS,
} from '../data/filters';
import {
  Search, RotateCw, Download, CheckCircle2, ChevronDown
} from 'lucide-react';
import type { ApprovalAction, EventData, Filters, ToastMessage } from '../types';

export default function EventApproval() {
  const { t } = useTranslation();

  const [events, setEvents] = useState<EventData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [modalEvent, setModalEvent] = useState<EventData | null>(null);
  const [actionType, setActionType] = useState<ApprovalAction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<ToastMessage | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      const data = await eventApprovalService.getEvents(filters);
      setEvents(data);
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => { fetchEvents(); }, [fetchEvents]); // eslint-disable-line react-hooks/set-state-in-effect -- mount + filter-change data load

  const handleFilterChange = (field: string, value: string) => {
    setIsLoading(true);
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleViewDetails = (event: EventData) => {
    setSelectedEvent(event);
    setIsDrawerOpen(true);
  };

  const triggerApproveModal = (event: EventData) => {
    setModalEvent(event);
    setActionType('Approved');
    setIsModalOpen(true);
  };

  const triggerRejectModal = (event: EventData) => {
    setModalEvent(event);
    setActionType('Rejected');
    setIsModalOpen(true);
  };

  const handleConfirmAction = async (eventId: string, newStatus: string, adminNote: string) => {
    try {
      const updated = await eventApprovalService.updateStatus(eventId, newStatus, adminNote);
      setEvents((prev) => prev.map((e) => (e.id === eventId ? updated : e)));
      if (selectedEvent && selectedEvent.id === eventId) setSelectedEvent(updated);
      setToastMessage({
        type: newStatus === 'Approved' ? 'success' : 'error',
        text: t('approval.statusUpdated', { name: updated.eventName, status: newStatus })
      });
      setTimeout(() => setToastMessage(null), 4000);
    } catch (err) { console.error(err); }
  };

  const handleRequestChanges = async (event: EventData) => {
    await handleConfirmAction(event.id, 'Draft', 'Requested changes from event organizer.');
    setIsDrawerOpen(false);
  };

  const handleSaveNotes = async (eventId: string, notes: string) => {
    try {
      const current = events.find((e) => e.id === eventId);
      if (current) {
        const updated = await eventApprovalService.saveAdminNotes(eventId, current.status, notes);
        setSelectedEvent(updated);
        setEvents((prev) => prev.map((e) => (e.id === eventId ? updated : e)));
        setToastMessage({ type: 'info', text: t('approval.notesSaved') });
        setTimeout(() => setToastMessage(null), 3000);
      }
    } catch (err) { console.error(err); }
  };

  return (
    <div className="event-approval-scope space-y-6 animate-fade-in max-w-[1500px] mx-auto pb-12 font-sans">

      {toastMessage && (
        <div className={`p-4 rounded-full shadow-md border flex items-center justify-between transition-all ${
          toastMessage.type === 'success' ? 'bg-success text-white border-success'
            : toastMessage.type === 'info' ? 'bg-primary text-white border-primary'
            : 'bg-error text-white border-error'
        }`}>
          <div className="flex items-center space-x-3 text-xs font-semibold px-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      <div className="page-header">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="badge-warning">{t('approval.badge')}</span>
          </div>
          <h1 className="text-2xl font-bold text-text-primary dark:text-dark-text tracking-tight flex items-center gap-2">
            {t('approval.title')}
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary dark:text-dark-text-muted mt-1 font-normal">
            {t('approval.subtitle')}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button onClick={fetchEvents} className="btn-secondary py-2.5 px-4 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            title={t('approval.refreshList')}>
            <RotateCw className={`w-4 h-4 text-primary dark:text-info ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{t('common.refresh')}</span>
          </button>
          <button onClick={() => exportEventsCSV(events)} className="btn-secondary py-2.5 px-4 text-xs font-semibold flex items-center gap-1.5 cursor-pointer">
            <Download className="w-4 h-4 text-primary dark:text-info" />
            <span>{t('common.exportCsv')}</span>
          </button>
        </div>
      </div>

      <div className="card p-4 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">

          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary dark:text-dark-text-muted" />
            <input type="text" value={filters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder={t('filters.searchEvent')} className="filter-search" />
          </div>

          <div className="relative">
            <select value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="filter-select">
              <option value="All">{t('filters.allCategories')}</option>
              {CATEGORY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-text-secondary dark:text-dark-text-muted absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select value={filters.competitionLevel}
              onChange={(e) => handleFilterChange('competitionLevel', e.target.value)}
              className="filter-select">
              <option value="All">{t('common.all')} Levels</option>
              {COMPETITION_LEVEL_OPTIONS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-text-secondary dark:text-dark-text-muted absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select value={filters.region}
              onChange={(e) => handleFilterChange('region', e.target.value)}
              className="filter-select">
              <option value="All">{t('filters.allRegions')}</option>
              {REGION_OPTIONS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-text-secondary dark:text-dark-text-muted absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="filter-select">
              <option value="All">{t('common.all')} Statuses</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>{s.labelKey ? t(s.labelKey) : s.label}</option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-text-secondary dark:text-dark-text-muted absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

        </div>
      </div>

      <EventTable
        events={events} isLoading={isLoading} onViewDetails={handleViewDetails}
        onApprove={triggerApproveModal} onReject={triggerRejectModal}
        onSortChange={(field) => handleFilterChange('sortBy', field)}
      />

      <EventDrawer
        isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} event={selectedEvent}
        onApprove={(evt) => { setIsDrawerOpen(false); triggerApproveModal(evt); }}
        onReject={(evt) => { setIsDrawerOpen(false); triggerRejectModal(evt); }}
        onRequestChanges={handleRequestChanges} onSaveNotes={handleSaveNotes}
      />

      <ApprovalModal
        isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAction} actionType={actionType} event={modalEvent}
      />

    </div>
  );
}
