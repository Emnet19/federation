'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, ShieldAlert, X } from 'lucide-react';
import type { ApprovalAction, EventData } from '../types';

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (eventId: string, actionType: ApprovalAction, adminNote: string) => Promise<void>;
  actionType: ApprovalAction | null;
  event: EventData | null;
}

export default function ApprovalModal({ isOpen, onClose, onConfirm, actionType, event }: ApprovalModalProps) {
  const { t } = useTranslation();
  const [adminNote, setAdminNote] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !event) return null;

  const isApprove = actionType === 'Approved';

  const handleConfirm = async () => {
    if (!actionType) return;
    setIsProcessing(true);
    try {
      await onConfirm(event.id, actionType, adminNote);
      setAdminNote('');
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="modal-backdrop animate-fade-in font-sans">
      <div className="dialog space-y-0">

        <div className={`p-6 text-white flex items-center justify-between ${isApprove ? 'bg-success' : 'bg-error'}`}>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-white/20 backdrop-blur-md">
              {isApprove ? (
                <ShieldCheck className="w-6 h-6 text-white" />
              ) : (
                <ShieldAlert className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h3 className="text-base font-bold">
                {isApprove ? t('modal.confirmApproval') : t('modal.confirmRejection')}
              </h3>
              <p className="text-xs text-white/80 font-normal">{t('modal.sanctioningBoard')}</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="p-3.5 rounded-xl bg-background dark:bg-dark-bg border border-border dark:border-dark-border space-y-1">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-text-secondary dark:text-dark-text-muted">{t('modal.targetEvent')}</span>
            <p className="font-bold text-text-primary dark:text-dark-text text-sm">{event.eventName}</p>
            <p className="text-xs text-text-secondary dark:text-dark-text-muted">{event.category} • {event.stadium}, {event.city}</p>
          </div>

          <p className="text-xs text-text-secondary dark:text-dark-text-muted leading-relaxed">
            {isApprove ? t('modal.approveDesc') : t('modal.rejectDesc')}
          </p>

          <div className="space-y-1.5 pt-1">
            <label className="block text-xs font-semibold text-text-primary dark:text-dark-text uppercase tracking-wider">
              {isApprove ? t('modal.approvalNotes') : t('modal.rejectionReason')}
            </label>
            <textarea
              rows={3}
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              placeholder={isApprove ? t('modal.approvePlaceholder') : t('modal.rejectPlaceholder')}
              className="w-full text-xs p-3.5 rounded-xl border border-border dark:border-dark-border bg-background dark:bg-dark-bg focus:bg-surface dark:focus:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
        </div>

        <div className="bg-background dark:bg-dark-surface px-6 py-4 border-t border-border dark:border-dark-border flex items-center justify-end space-x-3">
          <button type="button" onClick={onClose} disabled={isProcessing} className="btn-ghost text-xs cursor-pointer">
            {t('common.cancel')}
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isProcessing || (!isApprove && !adminNote.trim())}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold text-white shadow-sm transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 ${
              isApprove ? 'bg-success hover:bg-emerald-600' : 'bg-error hover:bg-red-600'
            }`}
          >
            {isProcessing ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {t('common.processing')}
              </>
            ) : (
              <>{isApprove ? t('modal.approveCompetition') : t('modal.rejectEvent')}</>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
