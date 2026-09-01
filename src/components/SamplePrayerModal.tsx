import React, { useState, useEffect } from 'react';
import { Sparkles, Copy, Check, RotateCw, X, Globe, HeartHandshake } from 'lucide-react';
import toast from 'react-hot-toast';

export interface SamplePrayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: string;
  day: string;
}

export default function SamplePrayerModal({ isOpen, onClose, topic, day }: SamplePrayerModalProps) {
  const [language, setLanguage] = useState<'en' | 'tl'>('en');
  const [prayer, setPrayer] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [variation, setVariation] = useState<number>(1);
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && topic) {
      fetchPrayer(language, 1);
    } else {
      setPrayer('');
      setVariation(1);
    }
  }, [isOpen, topic]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const fetchPrayer = async (lang: 'en' | 'tl', varCount: number) => {
    setIsLoading(true);
    setHasCopied(false);
    try {
      const response = await fetch('/api/generate-prayer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          day,
          language: lang,
          variation: varCount
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.prayer) {
          setPrayer(data.prayer);
          return;
        }
      }
      throw new Error("Failed to load prayer guide");
    } catch (err) {
      console.error("Prayer fetch error:", err);
      // Fallback
      if (lang === 'tl') {
        setPrayer(`Aming AMANG nasa langit, buong puso naming itinataas sa Iyo ang panalanging ito para sa ${topic}. Puspusin Mo kami ng Iyong banal na kapayapaan, karunungan, at proteksyon sa aming bawat araw, sa pangalan ni HESUS, Amen.`);
      } else {
        setPrayer(`Our FATHER in Heaven, we earnestly lift up this prayer focus regarding ${topic}. May Your grace, wisdom, and sovereign protection abound in our lives as we walk faithfully in Your Word, in JESUS' Name, Amen.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageChange = (newLang: 'en' | 'tl') => {
    if (newLang === language) return;
    setLanguage(newLang);
    fetchPrayer(newLang, variation);
  };

  const handleRegenerate = () => {
    const nextVar = variation + 1;
    setVariation(nextVar);
    fetchPrayer(language, nextVar);
  };

  const handleCopy = async () => {
    if (!prayer) return;
    try {
      await navigator.clipboard.writeText(prayer);
      setHasCopied(true);
      toast.success(language === 'tl' ? 'Nakopya ang panalangin sa clipboard!' : 'Prayer copied to clipboard!');
      setTimeout(() => setHasCopied(false), 2500);
    } catch (err) {
      toast.error('Could not copy to clipboard');
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-amber-100 flex flex-col relative animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Decorative Header */}
        <div className="bg-gradient-to-r from-[#0F2C59] via-[#163a75] to-[#0F2C59] p-5 sm:p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#D4A373]/25 text-[#f1cd9d] border border-[#D4A373]/40">
              {day} Focus Guide
            </span>
            <span className="flex items-center gap-1 text-xs text-blue-200">
              <Sparkles size={13} className="text-amber-300 animate-pulse" />
              AI Prayer Guide
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold font-serif leading-snug text-white pr-6">
            {topic}
          </h3>

          {/* Language Selector */}
          <div className="mt-4 flex items-center justify-between gap-3 pt-3 border-t border-white/15">
            <div className="flex items-center gap-1.5 text-xs text-blue-200 font-medium">
              <Globe size={14} className="text-[#D4A373]" />
              <span>Prayer Language:</span>
            </div>
            
            <div className="flex items-center bg-black/25 p-0.5 rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => handleLanguageChange('en')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  language === 'en'
                    ? 'bg-[#D4A373] text-white shadow-xs font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => handleLanguageChange('tl')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  language === 'tl'
                    ? 'bg-[#D4A373] text-white shadow-xs font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Tagalog
              </button>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          {isLoading ? (
            <div className="py-8 space-y-3">
              <div className="flex items-center justify-center gap-2 text-amber-700 font-medium text-sm animate-pulse mb-3">
                <HeartHandshake className="h-5 w-5 text-[#C82323] animate-bounce" />
                <span>{language === 'tl' ? 'Bumubuo ng taos-pusong panalangin...' : 'Composing heartfelt prayer guide...'}</span>
              </div>
              <div className="space-y-2.5">
                <div className="h-4 bg-slate-100 rounded-full w-3/4 animate-pulse"></div>
                <div className="h-4 bg-slate-100 rounded-full w-full animate-pulse"></div>
                <div className="h-4 bg-slate-100 rounded-full w-5/6 animate-pulse"></div>
              </div>
            </div>
          ) : (
            <div className="relative">
              <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/70 shadow-inner text-slate-800">
                <div className="text-3xl text-amber-300/80 font-serif leading-none select-none mb-1">“</div>
                <p className="text-base sm:text-lg font-serif italic leading-relaxed text-slate-900 -mt-3">
                  {prayer}
                </p>
                <div className="text-3xl text-amber-300/80 font-serif leading-none select-none text-right -mt-2">”</div>
              </div>

              <div className="mt-2 text-center">
                <p className="text-[11px] text-slate-600 font-medium flex items-center justify-center gap-1">
                  <span>✨</span>
                  <span>
                    {language === 'tl'
                      ? 'Maaari itong gamitin sa iyong personal o pampamilyang oras ng panalangin.'
                      : 'Use this prayer during your personal devotional or family altar time.'}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleRegenerate}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-200/80 active:scale-95 transition-all border border-slate-200 disabled:opacity-50 cursor-pointer"
            title="Generate another prayer variation"
          >
            <RotateCw size={15} className={`${isLoading ? 'animate-spin' : ''}`} />
            <span>{language === 'tl' ? 'Iba Pang Panalangin' : 'Regenerate'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              disabled={isLoading || !prayer}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs active:scale-95 cursor-pointer ${
                hasCopied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#0F2C59] hover:bg-[#163a75] text-white'
              } disabled:opacity-50`}
            >
              {hasCopied ? (
                <>
                  <Check size={16} />
                  <span>{language === 'tl' ? 'Nakopya na!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>{language === 'tl' ? 'Kopyahin' : 'Copy Prayer'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
