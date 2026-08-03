'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import EventForm from './EventForm';
import EventSummary from './EventSummary';
import { eventService } from '@/features/events/services/eventService';
import { ArrowLeft, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import type { EventFormData, ToastMessage } from '@/features/events/types/event';

const initialFormData: EventFormData = {
  eventName: '',
  category: '',
  competitionLevel: '',
  description: '',
  registrationOpens: '',
  registrationDeadline: '',
  startDate: '',
  endDate: '',
  eventTime: '08:00',
  timeZone: 'EAT (UTC+3)',
  stadium: '',
  city: '',
  region: '',
  venueAddress: '',
  maxParticipants: '',
  ageCategory: 'Senior',
  genderCategory: 'Mixed',
  trackFieldType: '',
  organizerName: 'Ethiopian Athletics Federation',
  contactPerson: '',
  email: '',
  phone: ''
};

type Errors = Partial<Record<keyof EventFormData | string, string>>;

export default function EventCreate() {
  const router = useRouter();

  const [formData, setFormData] = useState<EventFormData>(initialFormData);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<ToastMessage | null>(null);

  const handleFieldChange = useCallback((name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (name in prev) {
        const copy = { ...prev };
        delete copy[name as keyof Errors];
        return copy;
      }
      return prev;
    });
  }, []);

  const validate = useCallback((): boolean => {
    const newErrors: Errors = {};

    if (!formData.eventName.trim()) newErrors.eventName = 'Event Name is required.';
    if (!formData.category) newErrors.category = 'Please select an event category.';
    if (!formData.competitionLevel) newErrors.competitionLevel = 'Select competition level.';
    if (!formData.description.trim()) newErrors.description = 'Event description is required.';
    if (!formData.registrationOpens) newErrors.registrationOpens = 'Registration opening date required.';
    if (!formData.registrationDeadline) newErrors.registrationDeadline = 'Registration deadline required.';
    if (!formData.startDate) newErrors.startDate = 'Event start date required.';
    if (!formData.endDate) newErrors.endDate = 'Event end date required.';
    if (!formData.eventTime) newErrors.eventTime = 'Event start time required.';
    if (!formData.stadium.trim()) newErrors.stadium = 'Stadium or venue is required.';
    if (!formData.city.trim()) newErrors.city = 'City name is required.';
    if (!formData.region) newErrors.region = 'Select region.';
    if (!formData.maxParticipants || Number(formData.maxParticipants) <= 0) {
      newErrors.maxParticipants = 'Enter a valid participant capacity count.';
    }
    if (!formData.ageCategory) newErrors.ageCategory = 'Select age category.';
    if (!formData.genderCategory) newErrors.genderCategory = 'Select gender category.';
    if (!formData.organizerName.trim()) newErrors.organizerName = 'Organizer name is required.';
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address format.';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required.';

    if (formData.registrationOpens && formData.registrationDeadline) {
      if (new Date(formData.registrationDeadline) < new Date(formData.registrationOpens)) {
        newErrors.registrationDeadline = 'Deadline cannot be before opening date.';
      }
    }

    if (formData.registrationDeadline && formData.startDate) {
      if (new Date(formData.startDate) < new Date(formData.registrationDeadline)) {
        newErrors.startDate = 'Start date should be after or on registration deadline.';
      }
    }

    if (formData.startDate && formData.endDate) {
      if (new Date(formData.endDate) < new Date(formData.startDate)) {
        newErrors.endDate = 'End date cannot be earlier than start date.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
    setToastMessage(null);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await eventService.createEvent(formData, false);
      setToastMessage({
        type: 'success',
        text: `Event "${created.eventName}" successfully submitted for sanctioning approval!`
      });
      setTimeout(() => {
        resetForm();
      }, 1500);
    } catch {
      setToastMessage({
        type: 'error',
        text: 'Failed to create event. Please verify form details.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!formData.eventName.trim()) {
      setErrors({ eventName: 'Event Name is required to save a draft.' });
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await eventService.createEvent(formData, true);
      setToastMessage({
        type: 'info',
        text: `Draft "${created.eventName}" saved successfully.`
      });
      setTimeout(() => {
        resetForm();
      }, 1200);
    } catch {
      setToastMessage({
        type: 'error',
        text: 'Could not save draft.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-[1500px] mx-auto pb-12">

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div
          className={`p-4 rounded-xl shadow-md border flex items-center justify-between transition-all ${
            toastMessage.type === 'success'
              ? 'bg-emerald-600 text-white border-emerald-500'
              : toastMessage.type === 'info'
              ? 'bg-blue-600 text-white border-blue-500'
              : 'bg-red-600 text-white border-red-500'
          }`}
        >
          <div className="flex items-center space-x-3 text-sm font-medium">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-blue-600 mb-2 group transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
            Back to Event Approval Center
          </button>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Create New Competition Event
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure a new athletics event and submit it for federation approval.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            EACRMS Sanction Engine v2.4
          </span>
        </div>
      </div>

      {/* Validation Alert Summary */}
      {Object.keys(errors).length > 0 && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-red-900 mb-1">
              Please resolve the {Object.keys(errors).length} validation error(s) below before submitting:
            </h4>
            <ul className="list-disc list-inside space-y-0.5 text-red-700">
              {Object.values(errors).map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Main Two-Column Layout (Left 70%, Right 30%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Section (70%): Form Card */}
        <div className="lg:col-span-8">
          <EventForm
            formData={formData}
            onChange={handleFieldChange}
            onSubmit={handleSubmit}
            onSaveDraft={handleSaveDraft}
            onCancel={() => router.push('/')}
            errors={errors}
            isSubmitting={isSubmitting}
          />
        </div>

        {/* Right Section (30%): Live Summary Card */}
        <div className="lg:col-span-4">
          <EventSummary formData={formData} />
        </div>

      </div>

    </div>
  );
}
