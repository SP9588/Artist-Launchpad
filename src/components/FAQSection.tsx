import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Can beginners with zero prior experience apply?',
      a: 'Absolutely. Over 65% of our learners join as absolute beginners. Each discipline offers distinct cohorts starting from core fundamentals—sensory exercises for actors, basic Sur and pitch holding for singers, rhythm counts for dancers, and DAW layout navigation for producers.'
    },
    {
      q: 'Do you offer online classes for students outside major cities?',
      a: 'Yes. All four disciplines feature interactive live online tracks or hybrid schedules with weekend studio access. Online students receive identical curriculum, individual video critiques, live Q&A sessions with instructors, and remote recording assignments.'
    },
    {
      q: 'Does Artist Launchpad guarantee auditions or acting/music contracts?',
      a: 'No academy can ethically or truthfully guarantee roles, fame, or signing contracts, and we strictly refrain from false marketing promises. What we do guarantee is uncompromising, industry-standard training, a professional showreel or demo reel, audition self-tape coaching, and an internal showcase presentation.'
    },
    {
      q: 'What is the schedule commitment and can working professionals join?',
      a: 'Yes. We run specialized Evening (7:30 PM - 9:30 PM) and Weekend Intensive (Saturday & Sunday) cohorts tailored specifically for university students and working professionals.'
    },
    {
      q: 'Can I apply for multiple skills at the same time?',
      a: 'Yes! Many performing artists cross-train in Acting + Dance or Singing + Music Production. When applying, select "Multiple Skills" and our admissions team will consult with you on an aligned, manageable schedule without overlapping sessions.'
    },
    {
      q: 'What happens after I submit my application online?',
      a: 'Once submitted, our admissions desk reviews your profile and goals within 24 to 48 business hours. We will reach out via WhatsApp or phone call to schedule a brief 10-minute discovery call and allocate your batch.'
    }
  ];

  return (
    <section id="faq" className="py-24 bg-[#09070f] relative border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-wider text-purple-400 uppercase mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            Transparent answers about admission, skill prerequisites, scheduling, and training methodology.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors cursor-pointer"
                >
                  <span className="text-base font-semibold text-white">
                    {faq.q}
                  </span>
                  <span className="text-purple-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-neutral-300 leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
