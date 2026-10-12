import React from 'react';
import { Target, Mic2, Film, Radio } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="academy" className="py-24 bg-[#0d0a18] border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Text Column */}
          <div>
            <div className="text-xs sm:text-sm font-semibold tracking-wider text-pink-400 uppercase mb-3">
              About Artist Launchpad
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
              A Studio-First Academy Built for Real Industry Demands
            </h2>
            <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
              <p>
                Artist Launchpad was created to bridge the wide gap between theoretical creative classes and actual commercial auditions, casting rooms, and studio recording booths.
              </p>
              <p>
                Whether you are stepping into a studio for the first time or refining your professional technique, our training is centered around hands-on repetition, constructive faculty feedback, and tangible output. You don't just learn concepts; you practice on high-grade microphones, dance before full-length rehearsal mirrors, read scripts opposite fellow actors under studio lighting, and build audio stems in industry DAWs.
              </p>
              <p className="text-neutral-400 text-sm">
                We believe in rigorous craft over empty hype. Our curriculum focuses on audition discipline, artistic stamina, vocal health, and authentic creative expression.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-2xl font-bold text-purple-400 mb-1">1:8</div>
                <div className="text-xs text-neutral-400">Low Faculty-to-Student Ratio for Individual Focus</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-2xl font-bold text-pink-400 mb-1">100%</div>
                <div className="text-xs text-neutral-400">Practical Studio & Performance Workstations</div>
              </div>
            </div>
          </div>

          {/* Right Bento Grid Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-purple-500/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-purple-950/60 flex items-center justify-center text-purple-400 mb-4 border border-purple-500/20">
                <Film className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Camera & Stage Ready</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Actors and dancers work under continuous playback cameras to assess screen eye-lines, micro-expressions, body symmetry, and framing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-pink-500/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-pink-950/60 flex items-center justify-center text-pink-400 mb-4 border border-pink-500/20">
                <Mic2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Acoustic Vocal Booths</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Vocalists practice on professional condenser microphones with dedicated monitoring headphones, mastering breath support and Sur stability.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-orange-500/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-orange-950/60 flex items-center justify-center text-orange-400 mb-4 border border-orange-500/20">
                <Radio className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">DAW Workstations</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Music production learners access professional controllers, audio interfaces, and digital instruments to arrange, track, and mix original music.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-purple-500/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-purple-950/60 flex items-center justify-center text-purple-400 mb-4 border border-purple-500/20">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Audition Preparation</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Practical guidance on shooting self-tapes, formatting audio demos, compiling performance reels, and presenting your talent with poise.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
