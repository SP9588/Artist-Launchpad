import React from 'react';
import { X, Shield, FileText } from 'lucide-react';

interface PolicyModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const PolicyModals: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#120e24] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-900/40 border border-purple-500/20 flex items-center justify-center text-purple-300">
              {isPrivacy ? <Shield className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {isPrivacy ? 'Privacy & Data Protection Policy' : 'Terms & Conditions of Enrollment'}
              </h3>
              <p className="text-[11px] text-neutral-400">Artist Launchpad Academy Standards</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto py-4 text-xs sm:text-sm text-neutral-300 space-y-4 leading-relaxed pr-2">
          {isPrivacy ? (
            <>
              <p>
                At <strong>Artist Launchpad</strong>, we respect your creative ambition and personal privacy. This policy outlines how information submitted through our application portal is collected, stored, and utilized.
              </p>
              <h4 className="font-bold text-white text-sm">1. Data Collected</h4>
              <p>
                When you apply, we collect your full name, contact mobile number, optional email address, city/district, age category, and training preferences. We do not collect payment card information during initial application.
              </p>
              <h4 className="font-bold text-white text-sm">2. Purpose of Processing</h4>
              <p>
                Your contact details are strictly used by our authorized admissions counselors to communicate batch availability, schedule discovery interviews, and provide syllabus consultations via WhatsApp, phone, or email.
              </p>
              <h4 className="font-bold text-white text-sm">3. Data Security & Non-Disclosure</h4>
              <p>
                All student applications are secured with database access control policies. We do not sell, rent, or lease applicant telephone numbers or emails to third-party telemarketers or external casting agents without explicit consent.
              </p>
              <h4 className="font-bold text-white text-sm">4. Communication Preferences</h4>
              <p>
                You may at any time request removal or update of your applicant record by notifying our admissions desk at admissions@artistlaunchpad.academy.
              </p>
            </>
          ) : (
            <>
              <p>
                Please review our terms of enrollment and training code of conduct for Artist Launchpad Academy:
              </p>
              <h4 className="font-bold text-white text-sm">1. Craft Focus & No Employment Guarantees</h4>
              <p>
                Artist Launchpad is a professional training institution providing rigorous education in Acting, Dancing, Singing, and Music Production. We do not make promises of guaranteed acting roles, recording contracts, reality TV placements, or specific income. Artistic success depends on continuous practice, audition outcomes, and market factors.
              </p>
              <h4 className="font-bold text-white text-sm">2. Attendance & Code of Conduct</h4>
              <p>
                All learners are expected to maintain professional studio etiquette, punctual attendance for ensemble rehearsals and recording sessions, and respectful collaboration with peers and faculty.
              </p>
              <h4 className="font-bold text-white text-sm">3. Studio Facilities & Equipment</h4>
              <p>
                Learners granted access to recording booths, microphones, lighting instruments, and DAW workstations must adhere to operating guidelines to protect high-grade studio hardware.
              </p>
              <h4 className="font-bold text-white text-sm">4. Batch Transfers & Rescheduling</h4>
              <p>
                If unforeseen professional commitments arise, students may request a batch transfer to a later intake subject to seat availability and faculty approval.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
