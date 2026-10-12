import React from 'react';
import { ClipboardList, PhoneCall, CalendarCheck, Clapperboard, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onOpenApply: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenApply }) => {
  const steps = [
    {
      number: '01',
      title: 'Submit Application Online',
      desc: 'Fill out the quick 2-minute application modal detailing your discipline, current experience level, preferred training mode, and learning goals.',
      icon: ClipboardList
    },
    {
      number: '02',
      title: 'Intake Call & Skill Review',
      desc: 'Our admissions counselors and faculty review your application and connect via WhatsApp or phone to discuss your goals and answer questions.',
      icon: PhoneCall
    },
    {
      number: '03',
      title: 'Batch & Schedule Matching',
      desc: 'Select a morning, evening, or weekend batch aligned with your routine, whether attending in-person studio classes or our interactive online modules.',
      icon: CalendarCheck
    },
    {
      number: '04',
      title: 'Studio Labs & Final Showcase',
      desc: 'Immerse in intensive drills, constructive critiques, recorded sessions, and a final capstone showcase or studio demo tape.',
      icon: Clapperboard
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#09070f] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs sm:text-sm font-semibold tracking-wider text-purple-400 uppercase mb-3">
            Admissions & Onboarding
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            How It Works: From Application to Studio
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            A straightforward, transparent pathway designed to respect your creative goals and guide you into the right batch.
          </p>
        </div>

        {/* 4 Steps Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-purple-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-purple-500/60 font-mono">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-purple-950/40 border border-purple-500/20 flex items-center justify-center text-purple-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-14 text-center">
          <button
            onClick={onOpenApply}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-semibold rounded-xl hover:opacity-95 shadow-lg shadow-purple-500/20 cursor-pointer transition-all"
          >
            <span>Start Your Application Today</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
