import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

interface FloatingWhatsAppProps {
  whatsappNumber: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ whatsappNumber }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  const cleanNumber = whatsappNumber.replace(/[^\d]/g, '');
  const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent('Hi Artist Launchpad Admissions! I have a question about course batches and eligibility.')}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Friendly tooltip */}
      {showTooltip && (
        <div className="relative mb-2.5 px-3 py-2 bg-[#171129] border border-purple-500/30 rounded-xl shadow-xl shadow-black/50 text-xs text-white max-w-xs flex items-center gap-2 animate-bounce-subtle">
          <span>Need quick advice? Chat on WhatsApp</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-neutral-400 hover:text-white p-0.5"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] shadow-2xl shadow-[#25D366]/40 flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-all group"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp with Admissions Desk"
      >
        <MessageCircle className="w-7 h-7 fill-black group-hover:scale-110 transition-transform" />
      </a>
    </div>
  );
};
