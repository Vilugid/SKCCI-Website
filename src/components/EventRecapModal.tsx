import React from 'react';
import { X, Calendar, MapPin, Users, Clock, ExternalLink, Image as ImageIcon, Sparkles } from 'lucide-react';
import { ChurchEvent } from '../api/events';

interface EventRecapModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: ChurchEvent | null;
  attendanceCount?: number;
  rsvpCount?: number;
  formatDate?: (dateStr: string) => string;
}

const defaultFormatDate = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  } catch {
    return dateStr;
  }
};

export default function EventRecapModal({
  isOpen,
  onClose,
  event,
  attendanceCount,
  rsvpCount = 0,
  formatDate = defaultFormatDate
}: EventRecapModalProps) {
  if (!isOpen || !event) return null;

  const totalAttendees = typeof attendanceCount === 'number' ? attendanceCount : rsvpCount;
  const totalCap = typeof event.capacity === 'number' ? event.capacity : parseInt(event.capacity as any, 10) || 30;

  const rawLink = event.photosUrl?.trim() || 'https://www.facebook.com/share/g/1BpFgffo67/';
  const photoLink = (rawLink.startsWith('http://') || rawLink.startsWith('https://'))
    ? rawLink
    : `https://${rawLink}`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100 flex flex-col relative animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Cover Image with Overlay */}
        <div className="relative h-48 bg-slate-900 overflow-hidden">
          {event.coverImage ? (
            <img 
              src={event.coverImage} 
              alt={event.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-85"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0F2C59] to-[#1E3A8A] text-white">
              <Calendar size={48} className="text-white/60" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          <div className="absolute bottom-4 left-5 right-5 text-white">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-gray-500/50 text-gray-200 border border-white/20 mb-1.5 inline-block">
              Concluded Gathering
            </span>
            <h3 className="text-xl font-bold font-serif leading-tight">
              {event.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {/* Metadata Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 text-gray-700 border border-gray-100">
              <Clock size={15} className="text-gray-500 shrink-0" />
              <span className="font-semibold">{formatDate(event.dateTime)}</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 text-gray-700 border border-gray-100">
              <MapPin size={15} className="text-gray-500 shrink-0" />
              <span className="truncate font-medium">{event.location}</span>
            </div>
          </div>

          {/* Attendance Stats */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <Users size={16} className="text-[#0F2C59]" />
              <span className="font-medium">Total Registered / Attended:</span>
            </div>
            <span className="font-bold text-sm text-[#0F2C59] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
              {totalAttendees} {totalCap > 0 && totalCap < 9999 ? `/ ${totalCap}` : ''} Attendees
            </span>
          </div>

          {/* Description / Summary */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">About This Gathering</h4>
            <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line bg-gray-50/50 p-4 rounded-xl border border-gray-100/80">
              {event.description}
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href={photoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-bold transition-all shadow-xs cursor-pointer group"
          >
            <ImageIcon size={15} />
            <span>View Church Photos & Highlights</span>
            <ExternalLink size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
