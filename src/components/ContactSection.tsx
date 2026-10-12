import React from 'react';
import { MessageSquare, Phone, Mail, MapPin, Instagram, Youtube, Facebook, ArrowUpRight, Share2 } from 'lucide-react';
import type { AcademySettings } from '../types/index.ts';

interface ContactSectionProps {
  settings: AcademySettings;
  onOpenApply: () => void;
  onOpenShare: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ settings, onOpenApply, onOpenShare }) => {
  // Clean phone for whatsapp url
  const cleanWhatsApp = settings.whatsappNumber.replace(/[^\d]/g, '');
  const whatsAppUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent('Hello Artist Launchpad team! I am interested in learning more about your courses.')}`;
  const telUrl = `tel:${settings.phoneNumber.replace(/[^\d+]/g, '')}`;
  const mailUrl = `mailto:${settings.email}`;

  return (
    <section id="contact" className="py-24 bg-[#0d0a18] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Direct channels & Social Handles */}
          <div>
            <div className="text-xs sm:text-sm font-semibold tracking-wider text-pink-400 uppercase mb-3">
              Direct Admissions Assistance
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Get in Touch With Our Admissions Team
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mb-8 leading-relaxed">
              Have questions about audition prep, course eligibility, scheduling, or campus locations? Connect directly with an admissions advisor through WhatsApp, phone, or email.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {/* WhatsApp Card */}
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-all flex items-start gap-4 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#25D366]/20 flex items-center justify-center text-[#25D366] shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 font-medium flex items-center gap-1">
                    WhatsApp Enquiry
                    <ArrowUpRight className="w-3 h-3 text-[#25D366] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5">{settings.whatsappNumber}</div>
                  <div className="text-[11px] text-emerald-400 mt-1">Instant chat support</div>
                </div>
              </a>

              {/* Call Card */}
              <a
                href={telUrl}
                className="p-5 rounded-xl bg-purple-950/20 border border-purple-500/20 hover:bg-purple-950/40 transition-all flex items-start gap-4 group"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-900/40 flex items-center justify-center text-purple-300 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 font-medium flex items-center gap-1">
                    Admissions Desk
                    <ArrowUpRight className="w-3 h-3 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5">{settings.phoneNumber}</div>
                  <div className="text-[11px] text-neutral-400 mt-1">Mon - Sat: 10 AM - 7 PM</div>
                </div>
              </a>

              {/* Email Card */}
              <a
                href={mailUrl}
                className="p-5 rounded-xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] transition-all flex items-start gap-4 group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-neutral-300 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 font-medium flex items-center gap-1">
                    Official Email
                    <ArrowUpRight className="w-3 h-3 text-neutral-300 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5 break-all">{settings.email}</div>
                  <div className="text-[11px] text-neutral-400 mt-1">General & corporate queries</div>
                </div>
              </a>

              {/* Campus Hubs */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-amber-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 font-medium">Studio Campuses</div>
                  <div className="text-xs font-semibold text-white mt-1 leading-snug">
                    {settings.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Official Social Channels Featuring Santymanikpuri & Makemestar */}
            <div className="space-y-4">
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                Official Channels & Creator Handles:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Instagram @santymanikpuri */}
                <a
                  href="https://instagram.com/santymanikpuri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-gradient-to-r from-pink-950/30 to-purple-950/30 border border-pink-500/20 hover:border-pink-500/40 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-pink-600/20 text-pink-400 flex items-center justify-center shrink-0">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-pink-300 transition-colors">
                        @santymanikpuri
                      </div>
                      <div className="text-[11px] text-neutral-400">Instagram Official</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-pink-400 group-hover:translate-x-0.5 transition-transform" />
                </a>

                {/* YouTube @makemestar4130 */}
                <a
                  href="https://youtube.com/@makemestar4130"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-gradient-to-r from-red-950/30 to-purple-950/30 border border-red-500/20 hover:border-red-500/40 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center shrink-0">
                      <Youtube className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-red-300 transition-colors">
                        @makemestar4130
                      </div>
                      <div className="text-[11px] text-neutral-400">YouTube Channel</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-red-400 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

              {/* Worldwide Share Trigger Card */}
              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Share Artist Launchpad Worldwide</div>
                    <div className="text-[11px] text-neutral-400">Share to WhatsApp, Twitter, LinkedIn, Telegram, Pinterest, Threads & more</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenShare}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md hover:opacity-95 cursor-pointer shrink-0"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Across Socials</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Fast Application CTA Box */}
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Ready to take the first step?
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-4">
                Join the Next Cohort of Creative Performers
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                Applications take less than two minutes. Once received, our lead instructors review your goals and schedule your introductory counseling consultation.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                  <div className="w-2 h-2 rounded-full bg-purple-400" />
                  <span>No preliminary audition required for foundation tracks</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                  <div className="w-2 h-2 rounded-full bg-pink-400" />
                  <span>Personalized consultation with training coordinator</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-200">
                  <div className="w-2 h-2 rounded-full bg-orange-400" />
                  <span>Transparent cohort schedule & batch confirmation</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={onOpenApply}
                className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-bold text-base rounded-xl hover:opacity-95 shadow-xl shadow-purple-600/25 active:scale-[0.99] transition-all cursor-pointer"
              >
                Open Application Form
              </button>

              <button
                onClick={onOpenShare}
                className="w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white font-medium text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Share Academy With Friends & Fellow Artists</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
