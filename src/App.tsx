/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { CoursesSection } from './components/CoursesSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { HowItWorks } from './components/HowItWorks.tsx';
import { WorkshopsSection } from './components/WorkshopsSection.tsx';
import { FAQSection } from './components/FAQSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { ApplicationModal } from './components/ApplicationModal.tsx';
import { AdminLoginModal } from './components/AdminLoginModal.tsx';
import { AdminDashboard } from './components/AdminDashboard.tsx';
import { PolicyModals } from './components/PolicyModals.tsx';
import { FloatingWhatsApp } from './components/FloatingWhatsApp.tsx';
import { ShareModal } from './components/ShareModal.tsx';
import type { AcademySettings, CourseName } from './types/index.ts';

const defaultSettings: AcademySettings = {
  academyName: 'Artist Launchpad',
  whatsappNumber: '+91 92791 20271',
  phoneNumber: '+91 92791 20271',
  email: 'santoshprasad8891@gmail.com',
  location: 'Raipur, Chhattisgarh (Studio Campus & Online Tracks)',
  instagramUrl: 'https://instagram.com/santymanikpuri',
  youtubeUrl: 'https://youtube.com/@makemestar4130',
  facebookUrl: 'https://facebook.com/artistlaunchpad',
  showPricing: false,
  actingPrice: '₹18,500 / 8-week module',
  dancingPrice: '₹14,000 / 8-week module',
  singingPrice: '₹16,500 / 8-week module',
  musicProductionPrice: '₹24,000 / 10-week module'
};

export default function App() {
  const [settings, setSettings] = useState<AcademySettings>(defaultSettings);
  
  // Modal states
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [preselectedCourse, setPreselectedCourse] = useState<CourseName>('Acting');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Admin CRM states
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  // Legal modals
  const [policyType, setPolicyType] = useState<'privacy' | 'terms' | null>(null);

  // Check saved admin session token on load
  useEffect(() => {
    const saved = localStorage.getItem('alp_admin_token');
    if (saved) {
      setAdminToken(saved);
    }

    // Fetch live academy settings from API
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data && data.academyName) {
          setSettings(data);
        }
      })
      .catch(err => {
        console.warn('Could not fetch settings from server, using default:', err);
      });
  }, []);

  // Handlers for Application Modal
  const handleOpenApply = (course?: CourseName) => {
    if (course) {
      setPreselectedCourse(course);
    }
    setIsApplyModalOpen(true);
  };

  const handleOpenShare = () => {
    setIsShareModalOpen(true);
  };

  const handleAdminClick = () => {
    if (adminToken) {
      setIsAdminDashboardOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const handleLoginSuccess = (token: string) => {
    setAdminToken(token);
    localStorage.setItem('alp_admin_token', token);
    setIsAdminDashboardOpen(true);
  };

  const handleLogout = () => {
    setAdminToken(null);
    localStorage.removeItem('alp_admin_token');
    setIsAdminDashboardOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#09070f] text-neutral-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* Navigation Top Bar adhering to Top Bar Contract */}
      <Navbar
        onOpenApply={() => handleOpenApply()}
        onOpenAdmin={handleAdminClick}
        onOpenShare={handleOpenShare}
        isAdminLoggedIn={!!adminToken}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenApply={() => handleOpenApply()}
          onOpenShare={handleOpenShare}
        />

        {/* 4 Dedicated Course Cards Section */}
        <CoursesSection
          onSelectCourse={(course) => handleOpenApply(course)}
          showPricing={settings.showPricing}
          pricingSettings={{
            actingPrice: settings.actingPrice,
            dancingPrice: settings.dancingPrice,
            singingPrice: settings.singingPrice,
            musicProductionPrice: settings.musicProductionPrice
          }}
        />

        {/* Academy Studio Philosophy & Facilities */}
        <AboutSection />

        {/* How It Works: Step-by-Step Pathway */}
        <HowItWorks onOpenApply={() => handleOpenApply()} />

        {/* Masterclasses & Workshops (Monetization Preview) */}
        <WorkshopsSection onSelectCourse={(course) => handleOpenApply(course)} />

        {/* Frequently Asked Questions */}
        <FAQSection />

        {/* Contact Us Section with Direct Channels */}
        <ContactSection
          settings={settings}
          onOpenApply={() => handleOpenApply()}
          onOpenShare={handleOpenShare}
        />
      </main>

      {/* Footer */}
      <Footer
        settings={settings}
        onOpenPrivacy={() => setPolicyType('privacy')}
        onOpenTerms={() => setPolicyType('terms')}
        onOpenAdmin={handleAdminClick}
        onOpenApply={() => handleOpenApply()}
        onOpenShare={handleOpenShare}
      />

      {/* Interactive Pop-up Application Form Modal */}
      <ApplicationModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        onOpenShare={handleOpenShare}
        preselectedCourse={preselectedCourse}
        whatsappNumber={settings.whatsappNumber}
      />

      {/* Staff Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Admin CRM Dashboard Drawer/View */}
      {isAdminDashboardOpen && adminToken && (
        <AdminDashboard
          isOpen={isAdminDashboardOpen}
          onClose={() => setIsAdminDashboardOpen(false)}
          token={adminToken}
          onLogout={handleLogout}
          onSettingsUpdated={(newSettings) => setSettings(newSettings)}
        />
      )}

      {/* Worldwide Social Media Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      {/* Privacy Policy & Terms Dialogs */}
      <PolicyModals
        type={policyType}
        onClose={() => setPolicyType(null)}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp whatsappNumber={settings.whatsappNumber} />
    </div>
  );
}
