import {
  FileText,
  Calendar,
  MapPin,
  Sliders,
  UserCheck,
  CheckCircle2,
  Save,
  XCircle,
  AlertCircle
} from 'lucide-react';
import type { EventFormData } from '@/features/events/types/event';

interface EventFormProps {
  formData: EventFormData;
  onChange: (name: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSaveDraft: () => void;
  onCancel: () => void;
  errors: Partial<Record<keyof EventFormData | string, string>>;
  isSubmitting: boolean;
}

export default function EventForm({ formData, onChange, onSubmit, onSaveDraft, onCancel, errors, isSubmitting }: EventFormProps) {
  const categories = ['Track', 'Field', 'Road Race', 'Cross Country', 'Marathon'];
  const competitionLevels = ['Regional', 'National', 'International'];
  const ageCategories = ['U16', 'U18', 'U20', 'Senior'];
  const genderCategories = ['Male', 'Female', 'Mixed'];
  const timeZones = ['EAT (UTC+3)', 'UTC+0', 'CET (UTC+1)', 'EST (UTC-5)'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">

      {/* SECTION 1: BASIC INFORMATION */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">1. Basic Information</h3>
            <p className="text-xs text-slate-500">Provide official title, category, and competition tier</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Event Name */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Event Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              placeholder="e.g. 55th Ethiopian National Athletics Championships"
              className={`w-full text-sm px-4 py-2.5 rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.eventName
                  ? 'border-red-400 focus:ring-red-200 text-red-900'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100 text-slate-900'
              }`}
            />
            {errors.eventName && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.eventName}
              </p>
            )}
          </div>

          {/* Event Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Event Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full text-sm px-4 py-2.5 rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.category
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.category}
              </p>
            )}
          </div>

          {/* Competition Level */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Competition Level <span className="text-red-500">*</span>
            </label>
            <select
              name="competitionLevel"
              value={formData.competitionLevel}
              onChange={handleChange}
              className={`w-full text-sm px-4 py-2.5 rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.competitionLevel
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            >
              <option value="">Select Competition Level</option>
              {competitionLevels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
            {errors.competitionLevel && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.competitionLevel}
              </p>
            )}
          </div>

          {/* Event Description */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Event Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the scope, discipline details, and significance of the event..."
              className={`w-full text-sm px-4 py-2.5 rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.description
                  ? 'border-red-400 focus:ring-red-200 text-red-900'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100 text-slate-900'
              }`}
            />
            {errors.description && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 2: SCHEDULE */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
          <div className="p-2 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">2. Schedule & Timeline</h3>
            <p className="text-xs text-slate-500">Configure key registration windows and competition dates</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Registration Opens */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Registration Opens <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="registrationOpens"
              value={formData.registrationOpens}
              onChange={handleChange}
              className={`w-full text-sm px-4 py-2.5 rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.registrationOpens
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />
            {errors.registrationOpens && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.registrationOpens}
              </p>
            )}
          </div>

          {/* Registration Deadline */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Registration Deadline <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="registrationDeadline"
              value={formData.registrationDeadline}
              onChange={handleChange}
              className={`w-full text-sm px-4 py-2.5 rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.registrationDeadline
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />
            {errors.registrationDeadline && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.registrationDeadline}
              </p>
            )}
          </div>

          {/* Event Start Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Event Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className={`w-full text-sm px-4 py-2.5 rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.startDate
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />
            {errors.startDate && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.startDate}
              </p>
            )}
          </div>

          {/* Event End Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Event End Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className={`w-full text-sm px-4 py-2.5 rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.endDate
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />
            {errors.endDate && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.endDate}
              </p>
            )}
          </div>

          {/* Event Start Time */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Event Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              name="eventTime"
              value={formData.eventTime}
              onChange={handleChange}
              className={`w-full text-sm px-4 py-2.5 rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.eventTime
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />
            {errors.eventTime && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.eventTime}
              </p>
            )}
          </div>

          {/* Time Zone */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Time Zone
            </label>
            <select
              name="timeZone"
              value={formData.timeZone}
              onChange={handleChange}
              className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
            >
              {timeZones.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* SECTION 3: LOCATION */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
          <div className="p-2 rounded-xl bg-red-50 text-red-600 border border-red-100">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">3. Location & Stadium Details</h3>
            <p className="text-xs text-slate-500">Specify host stadium, regional zone, and address</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stadium */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Stadium / Venue <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="stadium"
              value={formData.stadium}
              onChange={handleChange}
              placeholder="e.g. Abebe Bikila Stadium"
              className={`w-full text-sm px-4 py-2.5 rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.stadium
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />
            {errors.stadium && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.stadium}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g. Addis Ababa / Hawassa / Asela"
              className={`w-full text-sm px-4 py-2.5 rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.city
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />
            {errors.city && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.city}
              </p>
            )}
          </div>

          {/* Region */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Region <span className="text-red-500">*</span>
            </label>
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              className={`w-full text-sm px-4 py-2.5 rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.region
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            >
              <option value="">Select Region</option>
              <option value="Addis Ababa">Addis Ababa</option>
              <option value="Oromia">Oromia</option>
              <option value="Amhara">Amhara</option>
              <option value="Sidama">Sidama</option>
              <option value="Tigray">Tigray</option>
              <option value="SNNPR">SNNPR</option>
              <option value="Dire Dawa">Dire Dawa</option>
              <option value="Somali">Somali</option>
            </select>
            {errors.region && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.region}
              </p>
            )}
          </div>

          {/* Venue Address */}
          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Venue Address
            </label>
            <input
              type="text"
              name="venueAddress"
              value={formData.venueAddress}
              onChange={handleChange}
              placeholder="Full street or sub-city location address"
              className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* SECTION 4: EVENT CONFIGURATION */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">4. Event Technical Configuration</h3>
            <p className="text-xs text-slate-500">Define capacity limits, age categories, and surface types</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Max Participants */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Max Participants <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="maxParticipants"
              min="1"
              value={formData.maxParticipants}
              onChange={handleChange}
              placeholder="e.g. 500"
              className={`w-full text-sm px-4 py-2.5 rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.maxParticipants
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />
            {errors.maxParticipants && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.maxParticipants}
              </p>
            )}
          </div>

          {/* Age Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Age Category <span className="text-red-500">*</span>
            </label>
            <select
              name="ageCategory"
              value={formData.ageCategory}
              onChange={handleChange}
              className={`w-full text-sm px-4 py-2.5 rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.ageCategory
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            >
              <option value="">Select Age Group</option>
              {ageCategories.map((age) => (
                <option key={age} value={age}>
                  {age}
                </option>
              ))}
            </select>
            {errors.ageCategory && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.ageCategory}
              </p>
            )}
          </div>

          {/* Gender Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Gender Category <span className="text-red-500">*</span>
            </label>
            <select
              name="genderCategory"
              value={formData.genderCategory}
              onChange={handleChange}
              className={`w-full text-sm px-4 py-2.5 rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.genderCategory
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            >
              <option value="">Select Gender</option>
              {genderCategories.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            {errors.genderCategory && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.genderCategory}
              </p>
            )}
          </div>

          {/* Track / Field Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Track / Field Surface
            </label>
            <input
              type="text"
              name="trackFieldType"
              value={formData.trackFieldType}
              onChange={handleChange}
              placeholder="e.g. Polyurethane 400m Track / Asphalt"
              className="w-full text-sm px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* SECTION 5: ORGANIZER INFORMATION */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
          <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">5. Organizer Contact Information</h3>
            <p className="text-xs text-slate-500">Contact details for event administration & technical communications</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Organizer Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Organizer Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="organizerName"
              value={formData.organizerName}
              onChange={handleChange}
              placeholder="e.g. Ethiopian Athletics Federation"
              className={`w-full text-sm px-4 py-2.5 rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.organizerName
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />
            {errors.organizerName && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.organizerName}
              </p>
            )}
          </div>

          {/* Contact Person */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Contact Person <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              placeholder="e.g. Ato Hailegebriel Worku"
              className={`w-full text-sm px-4 py-2.5 rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.contactPerson
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />
            {errors.contactPerson && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.contactPerson}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Official Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="events@ethioathletics.org.et"
              className={`w-full text-sm px-4 py-2.5 rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.email
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+251 11 551 7844"
              className={`w-full text-sm px-4 py-2.5 rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.phone
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />
            {errors.phone && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.phone}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* BUTTON BAR */}
      <div className="bg-slate-900 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg border border-slate-800">
        <div className="text-xs text-slate-400 text-center sm:text-left">
          Ensure all required fields marked with (<span className="text-red-400">*</span>) are correctly filled.
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
          {/* Ghost / Cancel */}
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5"
          >
            <XCircle className="w-4 h-4" />
            Cancel
          </button>

          {/* Secondary / Save Draft */}
          <button
            type="button"
            onClick={onSaveDraft}
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center gap-1.5"
          >
            <Save className="w-4 h-4 text-amber-400" />
            Save Draft
          </button>

          {/* Primary / Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 shadow-md transition-all flex items-center gap-2 border border-blue-400/40 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Submit for Approval
              </>
            )}
          </button>
        </div>
      </div>

    </form>
  );
}
