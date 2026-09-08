import React from 'react';
import { Sparkles, X, ArrowRight, CheckCircle2, Shield, Film, BookOpen, Music, Trash2, Globe } from 'lucide-react';
import { TabItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface WhatsNewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: TabItem) => void;
}

interface UpdateItem {
  id: string;
  version: string;
  date: string;
  tag: 'NEW' | 'IMPROVED' | 'FIX';
  titleEn: string;
  titleTl: string;
  descriptionEn: string;
  descriptionTl: string;
  highlightsEn: string[];
  highlightsTl: string[];
  icon: React.ReactNode;
  actionTab?: TabItem;
  actionLabelEn?: string;
  actionLabelTl?: string;
}

const UPDATES: UpdateItem[] = [
  {
    id: 'sidebar-deletion',
    version: 'v1.4.0',
    date: 'September 2026',
    tag: 'NEW',
    titleEn: 'Leader Tools: Service Dates Sidebar Deletion',
    titleTl: 'Leader Tools: Pagbura ng Record sa Service Dates Sidebar',
    descriptionEn: 'Cell leaders and admins can now delete outdated or duplicate service records directly from each item in the Service Dates left sidebar.',
    descriptionTl: 'Maaari nang magbura ng duplicate o lumang tala ng Sunday service direkta mula sa Service Dates sidebar sa kaliwa.',
    highlightsEn: [
      'Accessible in-app confirmation modal with record details preview',
      'Automatic document cleanup on date revisions preventing duplicate records',
      'Instant list re-indexing and state synchronization'
    ],
    highlightsTl: [
      'May malinaw na confirmation modal na nagpapakita ng detalye bago magbura',
      'Kusang nililinis ang lumang record kapag binago ang petsa upang maiwasan ang duplicate',
      'Mabilis at ligtas na pagsasaayos ng listahan sa Firestore'
    ],
    icon: <Trash2 size={18} className="text-red-600" />,
    actionTab: 'Leader Tools',
    actionLabelEn: 'Open Leader Tools',
    actionLabelTl: 'Buksan ang Leader Tools'
  },
  {
    id: '365-explainer-player',
    version: 'v1.4.0',
    date: 'September 2026',
    tag: 'NEW',
    titleEn: '365 Bible Guide: Google Drive Explainer Video',
    titleTl: '365 Bible Guide: Google Drive Gabay na Video',
    descriptionEn: 'Integrated mobile-responsive 16:9 Google Drive video player embedded directly in the 365-Day Bible Reading Guide with native fullscreen support.',
    descriptionTl: 'Mayroon nang 16:9 Google Drive video player sa 365-Day Bible Reading Guide na may fullscreen support para sa mas madaling pag-unawa.',
    highlightsEn: [
      'Smooth in-app video playback with zero layout shifting',
      'Mobile-optimized touch controls and fullscreen capability',
      'Admin controls to update or customize explainer video sources'
    ],
    highlightsTl: [
      'Maayos na video playback sa loob ng app nang walang lag o paggalaw ng layout',
      'Swak sa mobile touch controls at fullscreen viewing',
      'Madaling ma-update ng mga admin ang video source'
    ],
    icon: <Film size={18} className="text-blue-600" />,
    actionTab: '365 Bible Reading Guide',
    actionLabelEn: 'Watch 365 Explainer',
    actionLabelTl: 'Panoorin ang 365 Gabay'
  },
  {
    id: 'bilingual-nav',
    version: 'v1.4.0',
    date: 'September 2026',
    tag: 'IMPROVED',
    titleEn: 'Streamlined Language Toggle & Navigation Consistency',
    titleTl: 'Pinasimpleng Language Toggle & Matatag na Nav Menu',
    descriptionEn: 'Clean English / Tagalog language pill toggle with persistent top navigation titles for seamless browsing across languages.',
    descriptionTl: 'Mas malinis na English / Tagalog toggle kung saan nananatiling pamilyar at madaling gamitin ang top menu habang binabasa ang mga aral.',
    highlightsEn: [
      'Compact English / Tagalog pill switch with instant state transition',
      'Consistent header landmarks across both English and Tagalog modes',
      'Preserved devotional readings and form translations'
    ],
    highlightsTl: [
      'Simple at compact na English / Tagalog switch button',
      'Parehong pamilyar na menu items sa header para hindi maligaw',
      'Kumpletong pagsasalin sa mga gabay at panalangin sa bawat pahina'
    ],
    icon: <Globe size={18} className="text-emerald-600" />
  },
  {
    id: 'weekly-verse-sync',
    version: 'v1.3.0',
    date: 'August 2026',
    tag: 'IMPROVED',
    titleEn: 'Real-Time Weekly Memory Verse Synchronization',
    titleTl: 'Real-Time Sync ng Lingguhang Memory Verse',
    descriptionEn: 'The weekly memory verse now synchronizes live from Firestore across all cell groups and leader tools with one-click clipboard copying.',
    descriptionTl: 'Ang lingguhang memory verse ay awtomatikong naka-sync sa Firestore para sa lahat ng cell groups na may one-click copy.',
    highlightsEn: [
      'Live cloud sync across all cell group leader sessions',
      'One-tap copy button formatted with scripture reference and translation',
      'Admin-controlled live updates without app redeployment'
    ],
    highlightsTl: [
      'Live na cloud update para sa lahat ng cell group leaders',
      'Mabilis na pagkopya ng talata kasama ang reference at salin',
      'Madaling mabago ng lider kahit kailan'
    ],
    icon: <BookOpen size={18} className="text-amber-600" />,
    actionTab: 'Leader Tools',
    actionLabelEn: 'View Memory Verse',
    actionLabelTl: 'Tingnan ang Memory Verse'
  },
  {
    id: 'song-bank-archive',
    version: 'v1.3.0',
    date: 'August 2026',
    tag: 'NEW',
    titleEn: 'Master Worship Song Bank (100+ Songs)',
    titleTl: 'Master Song Bank ng Pagsamba (100+ Awit)',
    descriptionEn: 'Comprehensive praise and worship lyrics catalog categorized alphabetically (A–Z) with instant search and cell-formatted copying.',
    descriptionTl: 'Komprehensibong talaan ng mga awit ng pagsamba (A–Z) na may mabilis na search at madaling kopyahing lyrics para sa cell meeting.',
    highlightsEn: [
      'Instant real-time search across song titles and lyrics',
      'One-click formatted text copying for group chat distribution',
      'Mobile-friendly collapsible view in Leader Tools'
    ],
    highlightsTl: [
      'Mabilisang paghahanap sa pamagat at liriko ng awit',
      'Isang pindot lang para makopya ang kumpletong lyrics',
      'Malinis at madaling buksan sa cellphone'
    ],
    icon: <Music size={18} className="text-indigo-600" />,
    actionTab: 'Leader Tools',
    actionLabelEn: 'Explore Song Bank',
    actionLabelTl: 'Tingnan ang Song Bank'
  }
];

export default function WhatsNewModal({ isOpen, onClose, onNavigate }: WhatsNewModalProps) {
  const { isTagalog } = useLanguage();

  if (!isOpen) return null;

  const handleAction = (tab?: TabItem) => {
    if (tab) {
      onNavigate(tab);
      onClose();
    }
  };

  const getTagBadge = (tag: 'NEW' | 'IMPROVED' | 'FIX') => {
    switch (tag) {
      case 'NEW':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'IMPROVED':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'FIX':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-gray-100 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="whats-new-title"
      >
        {/* Modal Header */}
        <div className="bg-[#0F2C59] px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-white flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-400 flex-shrink-0 shadow-inner">
              <Sparkles size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="whats-new-title" className="text-lg sm:text-xl font-bold font-serif">
                  {isTagalog ? 'Mga Bagong Update' : "What's New in SKCCI"}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Latest v1.4.0
                </span>
              </div>
              <p className="text-xs text-blue-100/80 mt-0.5">
                {isTagalog 
                  ? 'Mga pinakabagong kagamitan at pagsasaayos sa ating platform' 
                  : 'Recent platform features, tools, and enhancements'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Updates Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 divide-y divide-gray-100 flex-1">
          {UPDATES.map((update, idx) => (
            <div key={update.id} className={idx > 0 ? 'pt-4' : ''}>
              <div className="bg-gray-50/70 hover:bg-gray-50 rounded-xl p-4 sm:p-4.5 border border-gray-100 transition-colors">
                {/* Header line with icon, tag, date */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-white shadow-2xs border border-gray-200/80 flex items-center justify-center flex-shrink-0">
                      {update.icon}
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border tracking-wider uppercase ${getTagBadge(update.tag)}`}>
                      {update.tag}
                    </span>
                    <span className="text-[11px] font-mono text-gray-400">
                      {update.version}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">
                    {update.date}
                  </span>
                </div>

                {/* Title and Description */}
                <h3 className="text-base font-bold text-[#0F2C59] font-serif">
                  {isTagalog ? update.titleTl : update.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                  {isTagalog ? update.descriptionTl : update.descriptionEn}
                </p>

                {/* Highlights */}
                <ul className="mt-3 space-y-1.5">
                  {(isTagalog ? update.highlightsTl : update.highlightsEn).map((hl, i) => (
                    <li key={i} className="flex items-start text-xs text-gray-600">
                      <CheckCircle2 size={13} className="text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>

                {/* Optional Action Button */}
                {update.actionTab && (
                  <div className="mt-3.5 pt-3 border-t border-gray-200/60 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleAction(update.actionTab)}
                      className="inline-flex items-center text-xs font-bold text-[#C82323] hover:text-[#9e1b1b] bg-white hover:bg-red-50/50 border border-gray-200 px-3 py-1.5 rounded-lg shadow-2xs transition-all active:scale-95 cursor-pointer"
                    >
                      <span>{isTagalog ? update.actionLabelTl : update.actionLabelEn}</span>
                      <ArrowRight size={13} className="ml-1.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-5 sm:px-6 py-3.5 border-t border-gray-100 flex items-center justify-between flex-shrink-0">
          <span className="text-xs text-gray-500 hidden sm:inline">
            {isTagalog 
              ? 'Salamat sa patuloy na paglago kasama ang SKCCI.' 
              : 'Thank you for growing with Savior-King Commission Church.'}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl text-sm font-semibold text-gray-700 bg-white hover:bg-gray-100 border border-gray-200 shadow-2xs transition-colors cursor-pointer"
          >
            {isTagalog ? 'Isara' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
