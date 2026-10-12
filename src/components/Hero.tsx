import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Share2 } from 'lucide-react';
import heroImg from '../assets/images/hero_artist_academy_1791774748937.jpg';

interface HeroProps {
  onOpenApply: () => void;
  onOpenShare: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenApply, onOpenShare }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-12 pb-20">
      {/* Background Studio Photography with measured scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Artist Launchpad performing arts and music production studio"
          className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-[1.1]"
          referrerPolicy="no-referrer"
        />
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09070f] via-[#09070f]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09070f]/90 via-transparent to-[#09070f]/80" />
        {/* Atmospheric ambient glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[300px] bg-pink-600/15 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle Category Kicker - clean unboxed text */}
        <div className="inline-flex items-center gap-2 mb-6 text-xs sm:text-sm font-medium text-purple-300/90 tracking-wide">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Professional Creative Skills Academy</span>
          <span aria-hidden="true">·</span>
          <span>Admissions Open for New Cohort</span>
        </div>

        {/* Marquee Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 text-balance leading-[1.12]">
          Turn Your Talent Into{' '}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            Your Next Big Thing.
          </span>
        </h1>

        {/* Supporting text */}
        <p className="text-lg sm:text-xl lg:text-2xl text-neutral-300 font-normal max-w-3xl mx-auto mb-10 leading-relaxed text-balance">
          Learn. Create. Perform. Start your creative journey today.
          <span className="block mt-2 text-base sm:text-lg text-neutral-400">
            Intensive, practical training in Acting, Dancing, Singing, and Music Production led by seasoned industry practitioners.
          </span>
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onOpenApply}
            className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-xl hover:opacity-95 hover:shadow-2xl hover:shadow-purple-500/30 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <a
            href="#courses"
            className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-neutral-200 bg-white/5 hover:bg-white/10 hover:text-white border border-white/15 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            Explore Courses
          </a>

          <button
            type="button"
            onClick={onOpenShare}
            className="w-full sm:w-auto px-6 py-4 text-base font-semibold text-purple-200 bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/30 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Share2 className="w-5 h-5 text-purple-400" />
            <span>Share Website</span>
          </button>
        </div>

        {/* 4-Item Proof & Highlights Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10 max-w-4xl mx-auto text-left">
          <div className="p-3">
            <div className="flex items-center gap-2 text-purple-400 text-sm font-semibold mb-1">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>4 Core Disciplines</span>
            </div>
            <p className="text-xs text-neutral-400">Acting, Dance, Vocal & DAW Production</p>
          </div>

          <div className="p-3">
            <div className="flex items-center gap-2 text-pink-400 text-sm font-semibold mb-1">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Live Studio Sessions</span>
            </div>
            <p className="text-xs text-neutral-400">Microphones, mirrors, DAWs & camera drills</p>
          </div>

          <div className="p-3">
            <div className="flex items-center gap-2 text-orange-400 text-sm font-semibold mb-1">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Flexible Modes</span>
            </div>
            <p className="text-xs text-neutral-400">Offline studio, online & hybrid tracks</p>
          </div>

          <div className="p-3">
            <div className="flex items-center gap-2 text-purple-300 text-sm font-semibold mb-1">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Audition Readiness</span>
            </div>
            <p className="text-xs text-neutral-400">Showreels, demo tracks & performance showcase</p>
          </div>
        </div>

      </div>
    </section>
  );
};
