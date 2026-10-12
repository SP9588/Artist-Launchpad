import React, { useState } from 'react';
import { COURSES_DATA, CourseData } from '../data/courses.ts';
import type { CourseName } from '../types/index.ts';
import { Check, ArrowRight, Clock, Award, Users, ChevronDown, ChevronUp } from 'lucide-react';

interface CoursesSectionProps {
  onSelectCourse: (course: CourseName) => void;
  showPricing: boolean;
  pricingSettings?: {
    actingPrice?: string;
    dancingPrice?: string;
    singingPrice?: string;
    musicProductionPrice?: string;
  };
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  onSelectCourse,
  showPricing,
  pricingSettings
}) => {
  const [expandedCurriculum, setExpandedCurriculum] = useState<Record<string, boolean>>({});

  const toggleCurriculum = (courseId: string) => {
    setExpandedCurriculum(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  const getCustomPrice = (course: CourseData) => {
    if (!pricingSettings) return course.defaultFee;
    if (course.name === 'Acting' && pricingSettings.actingPrice) return pricingSettings.actingPrice;
    if (course.name === 'Dancing' && pricingSettings.dancingPrice) return pricingSettings.dancingPrice;
    if (course.name === 'Singing' && pricingSettings.singingPrice) return pricingSettings.singingPrice;
    if (course.name === 'Music Production' && pricingSettings.musicProductionPrice) return pricingSettings.musicProductionPrice;
    return course.defaultFee;
  };

  return (
    <section id="courses" className="py-24 bg-[#09070f] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-pink-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs sm:text-sm font-semibold tracking-wider text-purple-400 uppercase mb-3">
            Core Disciplines & Training
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Curated Programs Designed for Real Performance
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg">
            Choose your primary discipline or build a multi-disciplinary creative portfolio. Every syllabus bridges foundational craft with camera, stage, and studio execution.
          </p>
        </div>

        {/* 4 Dedicated Course Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {COURSES_DATA.map((course) => {
            const isCurriculumOpen = !!expandedCurriculum[course.id];
            const price = getCustomPrice(course);

            return (
              <div
                key={course.id}
                className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/40 transition-all duration-300 flex flex-col group"
              >
                {/* Course Visual Asset with Overlaid Badges */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-neutral-900">
                  <img
                    src={course.image}
                    alt={`${course.name} training at Artist Launchpad`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120e1e] via-[#120e1e]/40 to-transparent" />
                  
                  {/* Top metadata tags - unboxed clean presentation */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs">
                    <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded text-purple-300 font-semibold border border-white/10">
                      {course.mode}
                    </span>
                    <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded text-neutral-300 border border-white/10">
                      {course.duration}
                    </span>
                  </div>

                  {/* Course Title and Tagline overlay */}
                  <div className="absolute bottom-4 left-6 right-6">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
                      {course.name}
                    </h3>
                    <p className="text-sm font-medium text-purple-200/90">
                      {course.tagline}
                    </p>
                  </div>
                </div>

                {/* Course Body Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  
                  {/* Description */}
                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Course Details strip */}
                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/10 text-xs text-neutral-300">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>Level: {course.level}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-pink-400 shrink-0" />
                      <span>Small Group Mentorship</span>
                    </div>
                  </div>

                  {/* Key Syllabus Highlights */}
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-400 mb-3">
                      Core Syllabus Modules:
                    </h4>
                    <ul className="space-y-2">
                      {course.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-200">
                          <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Collapsible Detailed Curriculum Drill-Down */}
                  <div>
                    <button
                      type="button"
                      onClick={() => toggleCurriculum(course.id)}
                      className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-medium transition-colors cursor-pointer"
                    >
                      <span>{isCurriculumOpen ? 'Hide Weekly Breakdown' : 'View Weekly Breakdown'}</span>
                      {isCurriculumOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {isCurriculumOpen && (
                      <div className="mt-3 space-y-2.5 p-3 rounded-lg bg-white/[0.03] border border-white/5 text-xs">
                        {course.curriculum.map((mod, mIdx) => (
                          <div key={mIdx} className="space-y-1">
                            <div className="font-semibold text-neutral-200">{mod.module}</div>
                            <div className="text-neutral-400 flex flex-wrap gap-2">
                              {mod.topics.map((t, tIdx) => (
                                <span key={tIdx} className="text-neutral-400">
                                  • {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Pricing Display (Only when configured by administrator) */}
                  {showPricing && (
                    <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 flex items-center justify-between">
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-purple-300 font-medium">Standard Tuition</div>
                        <div className="text-lg font-bold text-white tabular-nums">{price}</div>
                      </div>
                      <div className="text-right text-[11px] text-neutral-400">
                        Includes studio time & showcase
                      </div>
                    </div>
                  )}

                  {/* Action CTA */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => onSelectCourse(course.name)}
                      className="w-full py-3.5 px-5 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-500 hover:via-pink-500 hover:to-orange-400 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-purple-500/20 transition-all cursor-pointer"
                    >
                      <span>Apply for {course.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Multi-Skill Note */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-white/[0.02] border border-white/10 max-w-2xl mx-auto">
          <h4 className="text-base font-semibold text-white mb-1">
            Interested in Multiple Disciplines?
          </h4>
          <p className="text-sm text-neutral-400 mb-4">
            Select "Multiple Skills" in your application form. We craft customized cross-training tracks for dual-skilled artists (e.g. Acting + Dance, Singing + Music Production).
          </p>
          <button
            onClick={() => onSelectCourse('Multiple Skills')}
            className="text-sm font-semibold text-purple-400 hover:text-purple-300 inline-flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Apply for Multiple Disciplines Track</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
