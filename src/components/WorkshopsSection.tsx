import React from 'react';
import { Calendar, Sparkles, Video, Users2, Headphones, ArrowRight } from 'lucide-react';
import type { CourseName } from '../types/index.ts';

interface WorkshopsSectionProps {
  onSelectCourse: (course: CourseName) => void;
}

export const WorkshopsSection: React.FC<WorkshopsSectionProps> = ({ onSelectCourse }) => {
  const upcomingWorkshops = [
    {
      title: 'Monologue Mastery & Self-Tape Intensive',
      discipline: 'Acting' as CourseName,
      type: 'Weekend Masterclass (2 Days)',
      desc: 'Hands-on camera work: blocking, emotional triggers, lighting your self-tape, and live casting room feedback.',
      icon: Video,
      spots: 'Limited to 12 participants'
    },
    {
      title: 'Bollywood & Contemporary Fusion Choreography',
      discipline: 'Dancing' as CourseName,
      type: 'Single-Day Intensive (4 Hours)',
      desc: 'Learn a high-octane performance routine, dynamic musicality transitions, and stage energy projection.',
      icon: Users2,
      spots: 'Limited to 16 participants'
    },
    {
      title: 'DAW Beat-Making & Sound Design Bootcamp',
      discipline: 'Music Production' as CourseName,
      type: '3-Day Practical Lab',
      desc: 'From zero to finished beat: drum synthesis, bass 808 layering, sampling techniques, and basic mix buss routing.',
      icon: Headphones,
      spots: 'Limited to 10 workstations'
    }
  ];

  return (
    <section id="workshops" className="py-24 bg-[#0d0a18] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <div className="text-xs sm:text-sm font-semibold tracking-wider text-orange-400 uppercase mb-3">
              Specialized Intensives & Coaching
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Workshops, Masterclasses & Studio Memberships
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-neutral-400 text-sm max-w-md">
            Short, focused modules for busy artists looking to upgrade specific technical skills alongside full courses.
          </p>
        </div>

        {/* 3 Featured Workshops */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {upcomingWorkshops.map((ws, i) => {
            const Icon = ws.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-pink-500/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-4">
                    <span className="flex items-center gap-1.5 text-purple-300 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      {ws.type}
                    </span>
                    <span>{ws.spots}</span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                    {ws.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 mb-6 leading-relaxed">
                    {ws.desc}
                  </p>
                </div>

                <button
                  onClick={() => onSelectCourse(ws.discipline)}
                  className="w-full py-2.5 px-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Apply for Workshop</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Studio Membership & Practice Passes Callout */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-purple-950/40 via-pink-950/20 to-orange-950/30 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Studio Membership & Rehearsal Hours</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Need Practice Space or High-End Vocal/DAW Booths?
            </h3>
            <p className="text-sm text-neutral-300">
              Enrolled students and verified alumni receive subsidized access to our acoustically treated vocal rooms, mirror dance floors, and production suites.
            </p>
          </div>

          <button
            onClick={() => onSelectCourse('Multiple Skills')}
            className="px-6 py-3 rounded-xl bg-white text-neutral-900 hover:bg-neutral-100 font-bold text-sm whitespace-nowrap shrink-0 transition-colors cursor-pointer"
          >
            Enquire for Practice Passes
          </button>
        </div>

      </div>
    </section>
  );
};
