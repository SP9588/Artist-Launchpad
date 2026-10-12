import React from 'react';
import type { AcademySettings } from '../types/index.ts';
import { ShieldCheck, Heart, Share2, Instagram, Youtube } from 'lucide-react';

interface FooterProps {
  settings: AcademySettings;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenAdmin: () => void;
  onOpenApply: () => void;
  onOpenShare: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onOpenPrivacy,
  onOpenTerms,
  onOpenAdmin,
  onOpenApply,
  onOpenShare
}) => {
  return (
    <footer className="bg-[#06040b] text-neutral-400 text-xs border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          
          {/* Col 1: Wordmark & statement */}
          <div className="md:col-span-1 space-y-3">
            <span className="text-lg font-bold tracking-tight text-white block">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
                Artist Launchpad
              </span>
            </span>
            <p className="text-neutral-400 leading-relaxed text-xs">
              Professional training academy for Acting, Dancing, Singing, and Music Production. Fostering authentic creative technique for stage, camera, and studio.
            </p>

            {/* Direct Creator / Academy Channels */}
            <div className="pt-2 flex flex-col gap-1.5 text-xs">
              <a
                href="https://instagram.com/santymanikpuri"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-neutral-300 hover:text-pink-400 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                <span>@santymanikpuri (Instagram)</span>
              </a>
              <a
                href="https://youtube.com/@makemestar4130"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-neutral-300 hover:text-red-400 transition-colors"
              >
                <Youtube className="w-3.5 h-3.5 text-red-400" />
                <span>@makemestar4130 (YouTube)</span>
              </a>
            </div>

            <div className="pt-2 text-[11px] text-neutral-500">
              © {new Date().getFullYear()} Artist Launchpad Academy. All rights reserved.
            </div>
          </div>

          {/* Col 2: Disciplines */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold uppercase tracking-wider text-[11px]">Disciplines</h4>
            <ul className="space-y-2">
              <li><a href="#courses" className="hover:text-white transition-colors">Acting & Screen Performance</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">Contemporary & Bollywood Dance</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">Vocal Coaching & Singing</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">Music Production & DAW Engineering</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">Cross-Discipline Track</a></li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold uppercase tracking-wider text-[11px]">Academy & Community</h4>
            <ul className="space-y-2">
              <li><a href="#academy" className="hover:text-white transition-colors">Our Studio Philosophy</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How Admissions Work</a></li>
              <li><a href="#workshops" className="hover:text-white transition-colors">Masterclasses & Workshops</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Frequently Asked Questions</a></li>
              <li><button onClick={onOpenApply} className="hover:text-purple-300 transition-colors cursor-pointer text-left">Submit Application Form</button></li>
              <li>
                <button
                  onClick={onOpenShare}
                  className="inline-flex items-center gap-1.5 text-purple-300 hover:text-purple-200 transition-colors cursor-pointer text-left"
                >
                  <Share2 className="w-3 h-3" />
                  <span>Share Website Globally</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Institutional & Legal */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold uppercase tracking-wider text-[11px]">Transparency & Legal</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Privacy Policy & Data Security
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTerms}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Terms & Conditions of Enrollment
                </button>
              </li>
              <li>
                <span className="text-neutral-500 block text-[11px]">
                  Contact: {settings.email}
                </span>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenAdmin}
                  className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-purple-300 transition-colors text-xs cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Administrator & CRM Login</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Quiet Bottom Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-4">
          <p>
            Artist Launchpad is a professional skill-building academy. We do not guarantee employment, casting selection, or record contracts.
          </p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
            <span>for creative artists</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
