import React, { useState, useEffect, useRef } from 'react';
import { ChurchEvent } from '../api/events';
import { 
  X, 
  Copy, 
  Check, 
  Share2, 
  ExternalLink, 
  Calendar, 
  MapPin, 
  Clock 
} from 'lucide-react';
import toast from 'react-hot-toast';

interface ShareEventModalProps {
  event: ChurchEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BASE_URL = 'https://skcci.org';

export const getEventShareUrl = (event: ChurchEvent): string => {
  const eventId = event.isRecurring ? 'sunday-worship' : event.id;
  return `${BASE_URL}/?tab=events&eventId=${encodeURIComponent(eventId)}`;
};

export const canUseNativeShare = (): boolean => {
  if (typeof navigator === 'undefined' || !navigator.share) return false;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  return isMobile;
};

export const triggerNativeShare = async (event: ChurchEvent): Promise<boolean> => {
  if (typeof navigator !== 'undefined' && navigator.share) {
    const url = getEventShareUrl(event);
    const text = `Join us for "${event.title}" at Savior-King Commission Church!${event.location ? `\n📍 Location: ${event.location}` : ''}`;
    try {
      await navigator.share({
        title: event.title,
        text,
        url,
      });
      return true;
    } catch (err: any) {
      if (err.name === 'AbortError') {
        return true; // User canceled the share sheet
      }
      return false;
    }
  }
  return false;
};

export default function ShareEventModal({ event, isOpen, onClose }: ShareEventModalProps) {
  const [copied, setCopied] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  const shareUrl = getEventShareUrl(event);
  const shareText = `Join us for "${event.title}" at Savior-King Commission Church! ${event.location ? `\n📍 ${event.location}` : ''}\n${shareUrl}`;

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      toast.success('Event link copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      toast.error('Failed to copy link');
    }
  };

  const handleShareFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(`Join us for ${event.title} at Savior King Commission Church!`)}`;
    window.open(fbUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
  };

  const handleShareInstagram = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      toast.success('Event details copied! Opening Instagram...', { duration: 3500 });
    } catch (e) {
      // ignore
    }
    setTimeout(() => {
      window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
    }, 400);
  };

  const handleShareTikTok = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      toast.success('Event details copied! Opening TikTok...', { duration: 3500 });
    } catch (e) {
      // ignore
    }
    setTimeout(() => {
      window.open('https://www.tiktok.com/', '_blank', 'noopener,noreferrer');
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        ref={modalRef}
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-gray-100 relative animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5 pr-8">
          <div className="w-11 h-11 rounded-2xl bg-[#0F2C59]/10 text-[#0F2C59] flex items-center justify-center shrink-0">
            <Share2 size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 font-serif leading-tight">Share Event</h3>
            <p className="text-xs text-gray-500">Invite family and friends to join us</p>
          </div>
        </div>

        {/* Event Preview Summary Card */}
        <div className="mb-6 p-4 rounded-2xl bg-gray-50/90 border border-gray-100 space-y-2">
          <h4 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug">
            {event.title}
          </h4>
          <div className="flex flex-col gap-1 text-xs text-gray-600">
            {event.location && (
              <div className="flex items-center gap-1.5 truncate">
                <MapPin size={13} className="text-[#C82323] shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-gray-500">
              <Clock size={13} className="text-[#0F2C59] shrink-0" />
              <span>{event.isRecurring ? 'Every Sunday Worship' : 'Special Event'}</span>
            </div>
          </div>
        </div>

        {/* Copy Direct Link Box */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Direct Link
          </label>
          <div className="flex items-center gap-2 p-1.5 pl-3.5 bg-gray-50 border border-gray-200 rounded-xl focus-within:border-[#0F2C59] transition-colors">
            <input 
              type="text" 
              readOnly 
              value={shareUrl} 
              className="bg-transparent text-xs text-gray-700 flex-1 outline-hidden select-all truncate font-mono"
            />
            <button
              onClick={handleCopyLink}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-xs ${
                copied 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-[#0F2C59] text-white hover:bg-[#0F2C59]/90'
              }`}
            >
              {copied ? (
                <>
                  <Check size={14} /> Copied!
                </>
              ) : (
                <>
                  <Copy size={14} /> Copy Link
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Social Share Buttons */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5">
            Share via Socials
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {/* Facebook */}
            <button
              onClick={handleShareFacebook}
              className="flex flex-col items-center justify-center p-3 rounded-2xl border border-gray-100 bg-[#1877F2]/5 hover:bg-[#1877F2]/10 text-gray-800 transition-all hover:scale-[1.02] cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center mb-1.5 shadow-xs group-hover:shadow-md transition-shadow">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <span className="text-xs font-bold text-gray-800">Facebook</span>
            </button>

            {/* Instagram */}
            <button
              onClick={handleShareInstagram}
              className="flex flex-col items-center justify-center p-3 rounded-2xl border border-gray-100 bg-pink-50/50 hover:bg-pink-50 text-gray-800 transition-all hover:scale-[1.02] cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#fd5949] via-[#d6249f] to-[#285AEB] text-white flex items-center justify-center mb-1.5 shadow-xs group-hover:shadow-md transition-shadow">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <span className="text-xs font-bold text-gray-800">Instagram</span>
            </button>

            {/* TikTok */}
            <button
              onClick={handleShareTikTok}
              className="flex flex-col items-center justify-center p-3 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-gray-100 text-gray-800 transition-all hover:scale-[1.02] cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center mb-1.5 shadow-xs group-hover:shadow-md transition-shadow">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.76 1.43-.01 2.7-1.02 3.01-2.41.11-.53.14-1.07.13-1.61V.02z"/>
                </svg>
              </div>
              <span className="text-xs font-bold text-gray-800">TikTok</span>
            </button>
          </div>
        </div>

        {/* Footer info note */}
        <div className="mt-5 pt-4 border-t border-gray-100 text-center">
          <p className="text-[11px] text-gray-400">
            Share with friends, life groups, or family to spread the Gospel!
          </p>
        </div>
      </div>
    </div>
  );
}
