import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Loader2, Sparkles, MessageCircle, Copy, Check, Share2 } from 'lucide-react';
import type { CourseName, SkillLevel, TrainingMode, ScheduleOption, ApplicationSubmission } from '../types/index.ts';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenShare?: () => void;
  preselectedCourse?: CourseName;
  whatsappNumber?: string;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  onOpenShare,
  preselectedCourse = 'Acting',
  whatsappNumber = '+91 98765 43210'
}) => {
  const [formData, setFormData] = useState<ApplicationSubmission>({
    fullName: '',
    phone: '',
    email: '',
    cityDistrict: '',
    course: preselectedCourse,
    skillLevel: 'Beginner',
    trainingMode: 'Hybrid',
    ageGroup: '18-24',
    schedule: 'Flexible',
    learningGoals: '',
    consent: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{ code: string; fullName: string; course: string } | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Sync preselectedCourse when opened
  useEffect(() => {
    if (preselectedCourse) {
      setFormData(prev => ({ ...prev, course: preselectedCourse }));
    }
  }, [preselectedCourse, isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Validation function
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name (at least 2 characters).';
    }

    const cleanPhone = formData.phone.replace(/[^\d]/g, '');
    const isIndianStandard = cleanPhone.length === 10 && /^[6-9]\d{9}$/.test(cleanPhone);
    const isIndianPrefixed = (cleanPhone.length === 12 && cleanPhone.startsWith('91')) || (cleanPhone.length === 11 && cleanPhone.startsWith('0'));
    const isIntl = cleanPhone.length >= 8 && cleanPhone.length <= 15;

    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile / WhatsApp number is required.';
    } else if (!isIndianStandard && !isIndianPrefixed && !isIntl) {
      newErrors.phone = 'Enter a valid 10-digit mobile number (e.g. 9876543210).';
    }

    if (formData.email && formData.email.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please provide a valid email address.';
      }
    }

    if (!formData.cityDistrict.trim() || formData.cityDistrict.trim().length < 2) {
      newErrors.cityDistrict = 'Please enter your city and district.';
    }

    if (!formData.consent) {
      newErrors.consent = 'You must provide consent for admissions contact.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Submission failed. Please try again.');
      }

      // Server confirmed success
      setSubmittedData({
        code: data.application.code,
        fullName: data.application.fullName,
        course: data.application.course
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred while submitting your application.';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleResetAndClose = () => {
    setSubmittedData(null);
    setSubmitError(null);
    setErrors({});
    onClose();
  };

  const cleanWA = whatsappNumber.replace(/[^\d]/g, '');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={handleResetAndClose}
      />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-2xl bg-[#100b1e] border border-purple-500/30 rounded-2xl sm:rounded-3xl shadow-2xl shadow-purple-900/40 my-8 overflow-hidden z-10 flex flex-col max-h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#150f26]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
            <h2 id="modal-headline" className="text-base sm:text-lg font-bold text-white">
              {submittedData ? 'Application Received' : 'Apply for Artist Launchpad'}
            </h2>
          </div>
          
          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {submittedData ? (
            /* SUCCESS CONFIRMATION STATE */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white mb-2">
                  Application Submitted Successfully!
                </h3>
                <p className="text-neutral-300 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-white">{submittedData.fullName}</span>. Your application for <span className="text-purple-300 font-semibold">{submittedData.course}</span> is securely registered with our admissions board.
                </p>
              </div>

              {/* Reference Code Card */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 max-w-sm mx-auto flex items-center justify-between">
                <div className="text-left">
                  <div className="text-[11px] uppercase tracking-wider text-neutral-400">Application Reference ID</div>
                  <div className="text-xl font-mono font-bold text-amber-300 tabular-nums">
                    {submittedData.code}
                  </div>
                </div>

                <button
                  onClick={() => handleCopyCode(submittedData.code)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-neutral-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Copy reference code"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Next Steps Checklist */}
              <div className="text-left p-5 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs sm:text-sm space-y-2 text-neutral-300">
                <div className="font-semibold text-white mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>What happens next:</span>
                </div>
                <p>1. Our admissions counselor will review your discipline and schedule preferences within 24–48 hours.</p>
                <p>2. We will reach out via WhatsApp/Phone to arrange your 10-minute discovery consultation.</p>
              </div>

              {/* Optional Instant WhatsApp Connect & Share */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/${cleanWA}?text=${encodeURIComponent(`Hello Artist Launchpad team! I just applied for ${submittedData.course} (Ref: ${submittedData.code}). Looking forward to connecting!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-black" />
                  <span>Notify Admissions on WhatsApp</span>
                </a>

                {onOpenShare && (
                  <button
                    type="button"
                    onClick={() => {
                      handleResetAndClose();
                      onOpenShare();
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/30 text-purple-200 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    <Share2 className="w-4 h-4 text-purple-400" />
                    <span>Share With Friends</span>
                  </button>
                )}

                <button
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  Done & Close
                </button>
              </div>
            </div>
          ) : (
            /* APPLICATION FORM */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Introduction */}
              <div>
                <p className="text-xs sm:text-sm text-neutral-300">
                  Fill in your details below to begin your creative journey. Our admissions faculty will review your goals and match you with the appropriate batch.
                </p>
              </div>

              {submitError && (
                <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs sm:text-sm flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Step 1: Personal & Contact Information */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase font-bold tracking-wider text-purple-300">
                  1. Contact Information
                </h3>

                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Full Name <span className="text-pink-400">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Priya Nair"
                    className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border ${
                      errors.fullName ? 'border-red-500/70 focus:border-red-500' : 'border-white/15 focus:border-purple-400'
                    } text-white placeholder-neutral-500 text-sm focus:outline-none transition-colors`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-400">{errors.fullName}</p>
                  )}
                </div>

                {/* Mobile / WhatsApp & Email Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Mobile / WhatsApp Number <span className="text-pink-400">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9876543210 or +91 98765 43210"
                      className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border ${
                        errors.phone ? 'border-red-500/70 focus:border-red-500' : 'border-white/15 focus:border-purple-400'
                      } text-white placeholder-neutral-500 text-sm focus:outline-none transition-colors`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Email Address <span className="text-neutral-500">(Optional)</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. priya@example.com"
                      className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border ${
                        errors.email ? 'border-red-500/70 focus:border-red-500' : 'border-white/15 focus:border-purple-400'
                      } text-white placeholder-neutral-500 text-sm focus:outline-none transition-colors`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* City and District & Age Group Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cityDistrict" className="block text-xs font-medium text-neutral-300 mb-1.5">
                      City & District <span className="text-pink-400">*</span>
                    </label>
                    <input
                      id="cityDistrict"
                      type="text"
                      required
                      value={formData.cityDistrict}
                      onChange={(e) => setFormData({ ...formData, cityDistrict: e.target.value })}
                      placeholder="e.g. Mumbai, Andheri or Pune, Kothrud"
                      className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border ${
                        errors.cityDistrict ? 'border-red-500/70 focus:border-red-500' : 'border-white/15 focus:border-purple-400'
                      } text-white placeholder-neutral-500 text-sm focus:outline-none transition-colors`}
                    />
                    {errors.cityDistrict && (
                      <p className="mt-1 text-xs text-red-400">{errors.cityDistrict}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="ageGroup" className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Age Group <span className="text-neutral-500">(Optional)</span>
                    </label>
                    <select
                      id="ageGroup"
                      value={formData.ageGroup || '18-24'}
                      onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#19132b] border border-white/15 text-white text-sm focus:outline-none focus:border-purple-400 transition-colors"
                    >
                      <option value="Under 18">Under 18 (Teen Cohort)</option>
                      <option value="18-24">18 - 24 Years</option>
                      <option value="25-34">25 - 34 Years</option>
                      <option value="35+">35+ Years</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 2: Course & Training Preferences */}
              <div className="space-y-4 pt-2 border-t border-white/10">
                <h3 className="text-xs uppercase font-bold tracking-wider text-pink-300">
                  2. Discipline & Training Setup
                </h3>

                {/* Preferred Course Selection */}
                <div>
                  <label htmlFor="courseSelect" className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Preferred Discipline / Course <span className="text-pink-400">*</span>
                  </label>
                  <select
                    id="courseSelect"
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value as CourseName })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#19132b] border border-white/15 text-white text-sm focus:outline-none focus:border-purple-400 font-semibold"
                  >
                    <option value="Acting">Acting (Screen, Monologue & Audition Prep)</option>
                    <option value="Dancing">Dancing (Contemporary, Commercial & Bollywood)</option>
                    <option value="Singing">Singing (Vocal Mastery, Pitch & Studio Mic)</option>
                    <option value="Music Production">Music Production (DAW, Beats & Sound Engineering)</option>
                    <option value="Multiple Skills">Multiple Skills (Custom Cross-Training Track)</option>
                  </select>
                </div>

                {/* Skill Level & Training Mode Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="skillLevelSelect" className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Current Experience Level <span className="text-pink-400">*</span>
                    </label>
                    <select
                      id="skillLevelSelect"
                      value={formData.skillLevel}
                      onChange={(e) => setFormData({ ...formData, skillLevel: e.target.value as SkillLevel })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#19132b] border border-white/15 text-white text-sm focus:outline-none focus:border-purple-400"
                    >
                      <option value="Beginner">Beginner (Little to no prior training)</option>
                      <option value="Some Experience">Some Experience (Self-taught / Hobbyist)</option>
                      <option value="Intermediate">Intermediate (1-2 years training or practice)</option>
                      <option value="Experienced">Experienced (Working artist / Semi-pro)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="trainingModeSelect" className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Preferred Training Mode <span className="text-pink-400">*</span>
                    </label>
                    <select
                      id="trainingModeSelect"
                      value={formData.trainingMode}
                      onChange={(e) => setFormData({ ...formData, trainingMode: e.target.value as TrainingMode })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#19132b] border border-white/15 text-white text-sm focus:outline-none focus:border-purple-400"
                    >
                      <option value="Offline">Offline Studio (In-person studio sessions)</option>
                      <option value="Online">Online Interactive (Live video masterclasses)</option>
                      <option value="Hybrid">Hybrid (Online theory + Weekend studio labs)</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Schedule */}
                <div>
                  <label htmlFor="scheduleSelect" className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Preferred Batch Schedule
                  </label>
                  <select
                    id="scheduleSelect"
                    value={formData.schedule}
                    onChange={(e) => setFormData({ ...formData, schedule: e.target.value as ScheduleOption })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#19132b] border border-white/15 text-white text-sm focus:outline-none focus:border-purple-400"
                  >
                    <option value="Flexible">Flexible (Open to any slot)</option>
                    <option value="Morning">Morning Batches (8:00 AM - 11:30 AM)</option>
                    <option value="Afternoon">Afternoon Batches (2:00 PM - 5:00 PM)</option>
                    <option value="Evening">Evening Batches (7:00 PM - 9:30 PM)</option>
                  </select>
                </div>

                {/* Learning Goals or Message */}
                <div>
                  <label htmlFor="learningGoals" className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Your Learning Goals or Creative Background <span className="text-neutral-500">(Optional)</span>
                  </label>
                  <textarea
                    id="learningGoals"
                    rows={3}
                    value={formData.learningGoals || ''}
                    onChange={(e) => setFormData({ ...formData, learningGoals: e.target.value })}
                    placeholder="Tell us what you want to achieve (e.g. preparing for upcoming OTT auditions, building original indie songs, improving stage confidence)..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-purple-400 transition-colors"
                  />
                </div>
              </div>

              {/* Step 3: Consent Checkbox */}
              <div className="pt-2 border-t border-white/10">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded text-purple-600 focus:ring-purple-500 border-white/30 bg-white/10"
                  />
                  <span className="text-xs text-neutral-300 leading-relaxed">
                    I agree to be contacted by the Artist Launchpad admissions desk via phone or WhatsApp regarding my enquiry, and acknowledge the academy's <span className="text-purple-300 underline">Privacy Policy</span>.
                  </span>
                </label>
                {errors.consent && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.consent}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:opacity-95 shadow-xl shadow-purple-600/30 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Application to Server...</span>
                    </>
                  ) : (
                    <span>Submit Academy Application</span>
                  )}
                </button>
                <p className="text-center text-[11px] text-neutral-500 mt-2.5">
                  Secure transmission · No upfront payment required to apply · Confidential
                </p>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
