import React, { useState } from 'react';
import { Menu, X, ShieldCheck, Share2 } from 'lucide-react';

interface NavbarProps {
  onOpenApply: () => void;
  onOpenAdmin: () => void;
  onOpenShare: () => void;
  isAdminLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenApply,
  onOpenAdmin,
  onOpenShare,
  isAdminLoggedIn
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#09070f]/85 backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <a
            href="#"
            className="flex items-center gap-2 text-xl sm:text-2xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent font-extrabold">
              Artist Launchpad
            </span>
          </a>

          {/* Zone 2: Concise Single-Line Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
            <a
              href="#courses"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Courses
            </a>
            <a
              href="#academy"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Academy
            </a>
            <a
              href="#how-it-works"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              How It Works
            </a>
            <a
              href="#workshops"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Workshops
            </a>
            <a
              href="#faq"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              FAQ
            </a>
            <a
              href="#contact"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: Primary Action & Staff Admin link & Share */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              onClick={onOpenShare}
              className="p-2 sm:px-3 sm:py-2 text-xs font-medium rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Share Artist Launchpad on Social Media"
            >
              <Share2 className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button
              onClick={onOpenAdmin}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                isAdminLoggedIn
                  ? 'bg-purple-950/80 text-purple-200 border border-purple-500/30 hover:bg-purple-900/60'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
              title="Staff Admissions Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>{isAdminLoggedIn ? 'Admin CRM' : 'Staff Portal'}</span>
            </button>

            <button
              onClick={onOpenApply}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-lg hover:opacity-95 hover:shadow-lg hover:shadow-purple-500/25 active:scale-[0.99] transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              Apply Now
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d0918] border-b border-white/10 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-base font-medium text-neutral-300">
            <a
              href="#courses"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-white/5 hover:text-white transition-colors"
            >
              Courses
            </a>
            <a
              href="#academy"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-white/5 hover:text-white transition-colors"
            >
              Academy
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-white/5 hover:text-white transition-colors"
            >
              How It Works
            </a>
            <a
              href="#workshops"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-white/5 hover:text-white transition-colors"
            >
              Workshops
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-white/5 hover:text-white transition-colors"
            >
              FAQ
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-white/5 hover:text-white transition-colors"
            >
              Contact
            </a>
          </nav>
          
          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenShare();
                }}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-purple-300 hover:text-white"
              >
                <Share2 className="w-4 h-4 text-purple-400" />
                <span>Share Academy</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-neutral-300 hover:text-white"
              >
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span>{isAdminLoggedIn ? 'Open Admin CRM' : 'Staff Login'}</span>
              </button>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenApply();
              }}
              className="w-full py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-center"
            >
              Apply Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
