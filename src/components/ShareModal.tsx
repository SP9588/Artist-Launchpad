import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  Send,
  ExternalLink,
  Smartphone
} from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://artistlaunchpad.academy';
  const shareTitle = 'Artist Launchpad | Acting, Dancing, Singing & Music Production Academy';
  const shareText = 'Turn your creative talent into your next big thing. Apply to Artist Launchpad for professional training in Acting, Dancing, Singing, and Music Production!';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setActiveMessage('Link copied to clipboard!');
    setTimeout(() => {
      setCopied(false);
      setActiveMessage(null);
    }, 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: currentUrl,
        });
      } catch {
        // User cancelled or failed
      }
    } else {
      handleCopyLink();
    }
  };

  const socialNetworks = [
    {
      name: 'WhatsApp',
      color: 'bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366]/25 border-[#25D366]/30',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.693.078-1.956-.445-1.524-.63-2.502-2.186-2.58-2.288-.078-.101-.617-.82-.617-1.564 0-.744.389-1.109.527-1.26.138-.151.3-.189.4-.189.101 0 .2.001.288.006.09.005.21-.034.329.252.12.287.408 1.002.445 1.077.036.076.06.164.01.265-.05.101-.075.164-.15.252-.075.088-.158.197-.226.265-.075.076-.153.158-.066.309.088.151.39 1.042 1.238 1.796.848.754 1.562 1.011 1.782 1.112.22.101.349.088.479-.063.13-.151.554-.644.703-.865.149-.221.299-.184.498-.11.199.075 1.265.597 1.482.705.217.108.362.164.415.253.053.088.053.513-.091.918z" />
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.526 3.66 1.438 5.168L2 22l4.98-1.402C8.423 21.493 10.15 22 12 22c5.523 0 10-4.477 10-10S17.523 2 velvet 12 2zm0 18.15c-1.637 0-3.167-.47-4.46-1.283l-.32-.2-2.955.831.841-2.87-.209-.333C4.053 14.965 3.55 13.529 3.55 12c0-4.659 3.791-8.45 8.45-8.45 4.659 0 8.45 3.791 8.45 8.45 0 4.659-3.791 8.45-8.45 8.45z" />
        </svg>
      ),
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + currentUrl)}`
    },
    {
      name: 'X (Twitter)',
      color: 'bg-white/10 text-white hover:bg-white/20 border-white/20',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`
    },
    {
      name: 'Telegram',
      color: 'bg-[#229ED9]/15 text-[#229ED9] hover:bg-[#229ED9]/25 border-[#229ED9]/30',
      icon: <Send className="w-4 h-4" />,
      url: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`
    },
    {
      name: 'LinkedIn',
      color: 'bg-[#0077b5]/15 text-[#0077b5] hover:bg-[#0077b5]/25 border-[#0077b5]/30',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 1 0 0-3.06 1.53 1.53 0 0 0 0 3.06m1.4 9.74v-8.37H5.06v8.37h2.8z" />
        </svg>
      ),
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`
    },
    {
      name: 'Facebook',
      color: 'bg-[#1877F2]/15 text-[#1877F2] hover:bg-[#1877F2]/25 border-[#1877F2]/30',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
    },
    {
      name: 'Threads',
      color: 'bg-white/10 text-neutral-200 hover:bg-white/20 border-white/20',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12.186 24C5.467 24 0 18.665 0 12.096 0 5.527 5.467.192 12.186.192c6.643 0 11.968 5.174 11.968 11.815 0 1.63-.332 3.197-.98 4.636a.96.96 0 0 1-1.284.48.96.96 0 0 1-.48-1.285c.538-1.196.815-2.493.815-3.831 0-5.59-4.48-10.02-10.039-10.02C6.55 1.987 2.07 6.417 2.07 12.096c0 5.68 4.48 10.11 10.116 10.11 3.526 0 6.643-1.802 8.358-4.717a.96.96 0 0 1 1.314-.336.96.96 0 0 1 .336 1.314C20.08 21.848 16.386 24 12.186 24zm4.498-13.43c-.153-.08-.344-.12-.572-.12-.472 0-.96.16-1.45.48-.48.31-.89.73-1.22 1.23-.33.5-.53 1.05-.6 1.63-.07.57-.02 1.12.15 1.62.17.5.47.9.89 1.18.42.28.92.42 1.48.42.54 0 1.03-.13 1.45-.4.42-.26.74-.63.95-1.09.21-.46.32-.99.32-1.57 0-.94-.28-1.76-.85-2.45-.57-.69-1.37-1.12-2.39-1.28-1.02-.17-2.07-.05-3.09.34-1.02.39-1.87.99-2.52 1.76-.65.77-1.04 1.69-1.15 2.71-.11 1.02.06 2.05.5 3.01.44.96 1.1 1.75 1.95 2.33.85.58 1.84.88 2.92.88 1.1 0 2.13-.3 3.03-.89.9-.59 1.58-1.4 2-2.39a.96.96 0 0 1 1.25-.49.96.96 0 0 1 .49 1.25c-.56 1.3-1.48 2.37-2.7 3.16-1.22.79-2.62 1.2-4.07 1.2-1.44 0-2.77-.4-3.92-1.18-1.15-.78-2.03-1.84-2.61-3.13-.58-1.29-.81-2.67-.67-4.04.14-1.37.66-2.61 1.53-3.64.87-1.03 2.01-1.83 3.37-2.35 1.36-.52 2.77-.67 4.13-.44 1.36.22 2.45.8 3.22 1.72.77.92 1.15 2.02 1.15 3.27 0 .82-.16 1.58-.47 2.25-.31.67-.78 1.21-1.39 1.59-.61.38-1.33.57-2.12.57-.8 0-1.49-.2-2.06-.59-.57-.39-.97-.93-1.18-1.59-.21-.66-.21-1.37 0-2.09.21-.72.63-1.37 1.23-1.9.6-.53 1.32-.88 2.12-1.04.8-.16 1.55-.1 2.22.18.27.11.47.28.6.51z" />
        </svg>
      ),
      url: `https://threads.net/intent/post?text=${encodeURIComponent(shareText + ' ' + currentUrl)}`
    },
    {
      name: 'Reddit',
      color: 'bg-[#FF4500]/15 text-[#FF4500] hover:bg-[#FF4500]/25 border-[#FF4500]/30',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.688-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.197-2.512-.73a.326.326 0 0 0-.232-.095z" />
        </svg>
      ),
      url: `https://reddit.com/submit?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(shareTitle)}`
    },
    {
      name: 'Pinterest',
      color: 'bg-[#BD081C]/15 text-[#BD081C] hover:bg-[#BD081C]/25 border-[#BD081C]/30',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
        </svg>
      ),
      url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(currentUrl)}&description=${encodeURIComponent(shareText)}`
    },
    {
      name: 'TikTok',
      color: 'bg-white/10 text-pink-300 hover:bg-white/20 border-white/20',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      ),
      onClick: () => {
        handleCopyLink();
        setActiveMessage('Link copied! Share it on your TikTok Bio or DM!');
      }
    }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-[#110c24] border border-purple-500/30 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 z-10 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-purple-900/40">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 id="share-modal-title" className="text-lg font-bold text-white">
                Share Artist Launchpad
              </h3>
              <p className="text-xs text-neutral-400">
                Spread the word to creative learners across all global platforms
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close share dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Social Grid */}
        <div>
          <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
            1-Click Direct Share:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {socialNetworks.map((net) => {
              if (net.url) {
                return (
                  <a
                    key={net.name}
                    href={net.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all text-xs font-semibold ${net.color}`}
                  >
                    <span className="shrink-0">{net.icon}</span>
                    <span className="truncate">{net.name}</span>
                    <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
                  </a>
                );
              }

              return (
                <button
                  key={net.name}
                  type="button"
                  onClick={net.onClick}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all text-xs font-semibold text-left cursor-pointer ${net.color}`}
                >
                  <span className="shrink-0">{net.icon}</span>
                  <span className="truncate">{net.name}</span>
                  <Copy className="w-3 h-3 ml-auto opacity-70" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Native Mobile Share / More Apps */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleNativeShare}
            className="w-full py-3 px-4 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/30 text-purple-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Smartphone className="w-4 h-4 text-purple-400" />
            <span>More Apps & System Share (Instagram, Snapchat, Messages)</span>
          </button>
        </div>

        {/* Copy Website Link Bar */}
        <div className="pt-3 border-t border-white/10 space-y-2">
          <div className="text-xs font-semibold text-neutral-400">
            Website Link:
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="flex-1 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-neutral-300 text-xs font-mono truncate focus:outline-none"
            />
            <button
              onClick={handleCopyLink}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md shrink-0 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>

          {activeMessage && (
            <div className="text-center text-xs font-medium text-emerald-400 animate-fade-in pt-1">
              {activeMessage}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
