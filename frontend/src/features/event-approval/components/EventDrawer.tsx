'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  X, Calendar, MapPin, Users, Trophy, User, CheckCircle2,
  XCircle, AlertTriangle, FileText, History, ShieldCheck
} from 'lucide-react';
import { getStatusBadgeConfig } from '../utils/status';
import { getCapacityStats } from '../utils/capacity';
import type { EventData } from '@/features/events/types/event';

interface EventDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventData | null;
  onApprove: (event: EventData) => void;
  onReject: (event: EventData) => void;
  onRequestChanges: (event: EventData) => void;
  onSaveNotes: (eventId: string, notes: string) => Promise<void>;
}

export default function EventDrawer({ isOpen, onClose, event, onApprove, onReject, onRequestChanges, onSaveNotes }: EventDrawerProps) {
  const { t } = useTranslation();
  const [adminNotesText, setAdminNotesText] = useState(event?.adminNotes || '');
  const [prevEvent, setPrevEvent] = useState(event);
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  if (event !== prevEvent) {
    setPrevEvent(event);
    setAdminNotesText(event?.adminNotes || '');
  }

  if (!isOpen || !event) return null;

  const { registered, remaining, fillPercentage } = getCapacityStats(event.maxParticipants, event.registeredAthletes);

  const renderStatusBadge = (status: string) => {
    const config = getStatusBadgeConfig(status);
    return <span className={config.badgeClass}><span className={`dot ${config.dotClass}`} />{t(config.labelKey)}</span>;
  };

  const handleSaveNotesClick = async () => {
    setIsSavingNotes(true);
    await onSaveNotes(event.id, adminNotesText);
    setIsSavingNotes(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-text-primary/50 backdrop-blur-xs transition-opacity animate-fade-in font-sans">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">

        <div className="w-screen max-w-[480px] bg-surface dark:bg-dark-surface border-l border-border dark:border-dark-border shadow-2xl flex flex-col justify-between animate-slide-in-right">

          <div className="p-6 bg-primary text-white flex items-center justify-between border-b border-[#013388]">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase font-semibold tracking-wider text-secondary">
                  {t('drawer.eventIdentifier')}: {event.id}
                </span>
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight mt-0.5">
                {t('drawer.eventDetails')}
              </h2>
            </div>
            <div className="flex items-center space-x-3">
              {renderStatusBadge(event.status)}
              <button onClick={onClose} className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">

            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-dark-text-muted flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-primary dark:text-info" />
                {t('drawer.generalInfo')}
              </h3>

              <div className="p-4 rounded-2xl bg-background dark:bg-dark-bg border border-border dark:border-dark-border space-y-3">
                <h4 className="font-bold text-text-primary dark:text-dark-text text-base leading-snug">
                  {event.eventName}
                </h4>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-text-secondary dark:text-dark-text-muted block text-[11px]">{t('table.category')}</span>
                    <span className="font-semibold text-text-primary dark:text-dark-text">{event.category}</span>
                  </div>
                  <div>
                    <span className="text-text-secondary dark:text-dark-text-muted block text-[11px]">{t('drawer.competitionLevel')}</span>
                    <span className="font-semibold text-text-primary dark:text-dark-text">{event.competitionLevel}</span>
                  </div>
                  <div>
                    <span className="text-text-secondary dark:text-dark-text-muted block text-[11px]">{t('table.organizer')}</span>
                    <span className="font-semibold text-text-primary dark:text-dark-text">{event.organizerName}</span>
                  </div>
                  <div>
                    <span className="text-text-secondary dark:text-dark-text-muted block text-[11px]">{t('form.region')}</span>
                    <span className="font-semibold text-text-primary dark:text-dark-text">{event.region}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-border dark:border-dark-border text-xs">
                  <span className="text-text-secondary dark:text-dark-text-muted block text-[11px]">{t('drawer.stadiumVenue')}</span>
                  <span className="font-semibold text-text-primary dark:text-dark-text flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-error" />
                    {event.stadium}, {event.city}
                  </span>
                  {event.venueAddress && (
                    <p className="text-[11px] text-text-secondary dark:text-dark-text-muted mt-0.5 pl-4">{event.venueAddress}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-dark-text-muted flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary dark:text-info" />
                {t('drawer.scheduleDetails')}
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs bg-primary-light/40 dark:bg-primary/20 p-4 rounded-2xl border border-primary/20 dark:border-info/30">
                <div>
                  <span className="text-text-secondary dark:text-dark-text-muted block text-[11px]">{t('form.registrationOpens')}</span>
                  <span className="font-semibold text-text-primary dark:text-dark-text">{event.registrationOpens || t('common.na')}</span>
                </div>
                <div>
                  <span className="text-text-secondary dark:text-dark-text-muted block text-[11px]">{t('form.registrationDeadline')}</span>
                  <span className="font-semibold text-text-primary dark:text-dark-text">{event.registrationDeadline || t('common.na')}</span>
                </div>
                <div>
                  <span className="text-text-secondary dark:text-dark-text-muted block text-[11px]">{t('drawer.competitionDate')}</span>
                  <span className="font-semibold text-text-primary dark:text-dark-text">
                    {event.startDate}{event.endDate && event.endDate !== event.startDate ? ` to ${event.endDate}` : ''}
                  </span>
                </div>
                <div>
                  <span className="text-text-secondary dark:text-dark-text-muted block text-[11px]">{t('drawer.startTime')}</span>
                  <span className="font-semibold text-text-primary dark:text-dark-text">
                    {event.eventTime} ({event.timeZone || 'EAT'})
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-dark-text-muted flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-secondary" />
                {t('drawer.eventDescription')}
              </h3>
              <div className="p-4 rounded-2xl bg-background dark:bg-dark-bg border border-border dark:border-dark-border text-xs text-text-primary dark:text-dark-text leading-relaxed whitespace-pre-line">
                {event.description || t('drawer.noDescription')}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-dark-text-muted flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-success" />
                {t('drawer.participantQuota')}
              </h3>

              <div className="p-4 rounded-2xl bg-success/5 border border-success/20 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <span className="text-text-secondary dark:text-dark-text-muted text-[11px] block">{t('drawer.maxCapacity')}</span>
                    <span className="font-bold text-text-primary dark:text-dark-text text-sm">
                      {event.maxParticipants ? Number(event.maxParticipants).toLocaleString() : '0'} {t('common.athletes')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-text-secondary dark:text-dark-text-muted text-[11px] block">{t('drawer.registeredRemaining')}</span>
                    <span className="font-semibold text-success">
                      {registered} {t('common.registered')} • {remaining} {t('common.remaining')}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="w-full h-2.5 bg-border dark:bg-dark-border rounded-full overflow-hidden p-0.5">
                    <div className="h-full bg-success rounded-full transition-all duration-500" style={{ width: `${fillPercentage}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-text-secondary dark:text-dark-text-muted font-medium">
                    <span>0%</span>
                    <span>{fillPercentage}% {t('drawer.capacityFilled', { percent: fillPercentage })}</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-dark-text-muted flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-primary dark:text-info" />
                {t('drawer.approvalHistory')}
              </h3>

              <div className="relative pl-6 border-l-2 border-border dark:border-dark-border space-y-4 my-2">
                {(event.approvalHistory || []).map((hist, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-surface dark:bg-dark-surface border-2 border-primary flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </div>

                    <div className="bg-background dark:bg-dark-bg p-3 rounded-xl border border-border dark:border-dark-border space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-text-primary dark:text-dark-text">{hist.action}</span>
                        <span className="text-[10px] text-text-secondary dark:text-dark-text-muted">{hist.date}</span>
                      </div>
                      <div className="text-[11px] text-text-secondary dark:text-dark-text-muted flex items-center gap-1">
                        <User className="w-3 h-3 text-text-secondary" />
                        <span>{hist.user}</span>
                        {hist.role && <span className="text-text-secondary dark:text-dark-text-muted">({hist.role})</span>}
                      </div>
                      {hist.notes && (
                        <p className="text-[11px] text-text-secondary dark:text-dark-text-muted italic pt-1 border-t border-border dark:border-dark-border mt-1">
                          &ldquo;{hist.notes}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-dark-text-muted flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-text-secondary" />
                  {t('drawer.adminNotes')}
                </h3>
                <button
                  type="button"
                  onClick={handleSaveNotesClick}
                  disabled={isSavingNotes}
                  className="text-[11px] font-semibold text-primary dark:text-info hover:underline cursor-pointer"
                >
                  {isSavingNotes ? t('common.saving') : t('form.saveDraft')}
                </button>
              </div>
              <textarea
                rows={3}
                value={adminNotesText}
                onChange={(e) => setAdminNotesText(e.target.value)}
                placeholder={t('drawer.adminNotesPlaceholder')}
                className="w-full text-xs p-3.5 rounded-xl border border-border dark:border-dark-border bg-background dark:bg-dark-bg focus:bg-surface dark:focus:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>

          </div>

          <div className="p-4 bg-text-primary dark:bg-dark-bg border-t border-dark-border flex items-center justify-between gap-2 shrink-0">
            <button
              onClick={() => onReject(event)}
              className="px-4 py-2.5 rounded-full text-xs font-semibold text-white bg-error hover:bg-red-600 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <XCircle className="w-4 h-4" />
              {t('drawer.reject')}
            </button>

            <button
              onClick={() => onRequestChanges(event)}
              className="px-4 py-2.5 rounded-full text-xs font-semibold text-slate-950 bg-secondary hover:bg-amber-400 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4" />
              {t('drawer.requestChanges')}
            </button>

            <button
              onClick={() => onApprove(event)}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-success hover:bg-emerald-600 shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              {t('common.approve')}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
