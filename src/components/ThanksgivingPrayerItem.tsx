import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Circle, 
  CheckCircle2, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  RotateCw, 
  Copy, 
  Check, 
  Loader2 
} from 'lucide-react';
import toast from 'react-hot-toast';

export interface ThanksgivingPrayerItemProps {
  dayLabel: string;
  passagesSummary?: string;
  isPrayed: boolean;
  onTogglePrayed: () => void;
  theme?: 'light' | 'dark';
  isTagalog?: boolean;
}

export default function ThanksgivingPrayerItem({
  dayLabel,
  passagesSummary = '',
  isPrayed,
  onTogglePrayed,
  theme = 'light',
  isTagalog = false,
}: ThanksgivingPrayerItemProps) {
  const [isPrayerExpanded, setIsPrayerExpanded] = useState<boolean>(false);
  const [samplePrayer, setSamplePrayer] = useState<string>('');
  const [isPrayerLoading, setIsPrayerLoading] = useState<boolean>(false);
  const [prayerVariation, setPrayerVariation] = useState<number>(1);

  const fetchSamplePrayer = async (lang: 'en' | 'tl', varCount: number) => {
    setIsPrayerLoading(true);
    try {
      const res = await fetch('/api/generate-prayer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: lang === 'tl'
            ? 'Panalangin ng Pasasalamat at Pagsasabuhay sa Salita ng Diyos: Pagpapasalamat sa matagumpay na oras ng pananalangin at pagbubulay, at humihiling sa Diyos na maisagawa at maisabuhay ang Salita upang hindi ito manatiling kaalaman lamang sa isip'
            : 'Prayer of Thanksgiving for Devotional Time and Life Transformation: Thanking God for a successful devotional time and asking for the Holy Spirit’s power to transform what we read into action so it does not stay as head knowledge only',
          day: `${dayLabel}${passagesSummary ? ` (${passagesSummary})` : ''}`,
          language: lang,
          variation: varCount
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.prayer) {
          setSamplePrayer(data.prayer);
          return;
        }
      }
      throw new Error('Could not load prayer');
    } catch (err) {
      console.error('Thanksgiving prayer fetch error:', err);
      if (lang === 'tl') {
        setSamplePrayer(
          'Aming AMANG nasa langit, lubos kaming nagpapasalamat sa Iyo sa matagumpay at mapagpalang oras ng pananalangin at pagbubulay sa Iyong Banal na Salita. Puspusin Mo kami ng Iyong Banal na Espiritu upang ang aming mga natutunan ay maisagawa at maisabuhay namin sa bawat araw, at hindi manatili bilang kaalaman lamang sa isip, sa pangalan ni HESUS, Amen.'
        );
      } else {
        setSamplePrayer(
          'Our FATHER in Heaven, thank You with all our hearts for this fruitful devotional time and for speaking directly to our spirits through Your Word. Empower us by Your Holy Spirit to transform all that we have read into active obedience and daily love, ensuring it never remains as mere head knowledge, in JESUS\' Name, Amen.'
        );
      }
    } finally {
      setIsPrayerLoading(false);
    }
  };

  const handleToggleSamplePrayer = () => {
    if (!isPrayerExpanded) {
      setIsPrayerExpanded(true);
      if (!samplePrayer) {
        fetchSamplePrayer(isTagalog ? 'tl' : 'en', prayerVariation);
      }
    } else {
      setIsPrayerExpanded(false);
    }
  };

  const handleRegeneratePrayer = () => {
    const nextVar = prayerVariation + 1;
    setPrayerVariation(nextVar);
    fetchSamplePrayer(isTagalog ? 'tl' : 'en', nextVar);
  };

  const handleCopyPrayer = () => {
    if (!samplePrayer) return;
    navigator.clipboard.writeText(samplePrayer);
    toast.success(isTagalog ? 'Nakopya ang panalangin sa clipboard!' : 'Prayer copied to clipboard!');
  };

  const handlePrayButtonClick = () => {
    if (!isPrayed) {
      onTogglePrayed();
    }
    toast.success(
      isTagalog 
        ? 'Amen! Naitala ang iyong panalangin ng pasasalamat.' 
        : 'Amen! Your prayer of thanksgiving has been recorded.'
    );
  };

  // Reset or regenerate when day or language changes
  useEffect(() => {
    setSamplePrayer('');
    setPrayerVariation(1);
    if (isPrayerExpanded) {
      fetchSamplePrayer(isTagalog ? 'tl' : 'en', 1);
    }
  }, [dayLabel, isTagalog]);

  return (
    <div 
      className={`p-4 sm:p-5 rounded-2xl border transition-all ${
        isPrayed 
          ? (theme === 'light' ? 'bg-amber-50/60 border-amber-200/80' : 'bg-amber-950/20 border-amber-800/40')
          : (theme === 'light' ? 'bg-[#FAFAFA] border-gray-200/80 hover:border-amber-200' : 'bg-gray-900/50 border-gray-700/80 hover:border-gray-600')
      }`}
    >
      <div className="flex items-start gap-3.5">
        <button
          type="button"
          onClick={onTogglePrayed}
          className={`mt-0.5 flex-shrink-0 transition-colors cursor-pointer ${
            isPrayed 
              ? 'text-green-500' 
              : (theme === 'light' ? 'text-gray-300 hover:text-gray-400' : 'text-gray-600 hover:text-gray-500')
          }`}
          title={isPrayed 
            ? (isTagalog ? 'Markahan bilang hindi pa naipanalangin' : 'Mark as unprayed') 
            : (isTagalog ? 'Ipinanalangin ko ito ngayon' : 'I prayed this today')
          }
        >
          {isPrayed ? (
            <CheckCircle2 size={24} className="fill-green-50 text-green-500" />
          ) : (
            <Circle size={24} />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className={`text-base font-semibold leading-snug ${
              isPrayed 
                ? (theme === 'light' ? 'text-gray-900 font-bold' : 'text-gray-100 font-bold') 
                : (theme === 'light' ? 'text-gray-800' : 'text-gray-200')
            }`}>
              {isTagalog 
                ? 'Panalangin ng Pasasalamat at Pagsasabuhay sa Salita' 
                : 'Prayer of Thanksgiving and Action in Living Out the Word'}
            </p>
          </div>

          <p className={`text-xs mt-1 italic ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
            {isTagalog 
              ? '“Maging tagatupad kayo ng salita, at hindi tagapakinig lamang, na dinadaya ninyo ang inyong sarili.” — Santiago 1:22' 
              : '“Do not merely listen to the word, and so deceive yourselves. Do what it says.” — James 1:22'}
          </p>
          
          <div className="flex flex-wrap items-center gap-2 mt-2.5">
            <button
              type="button"
              onClick={handleToggleSamplePrayer}
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full transition-all cursor-pointer active:scale-95 shadow-2xs group border ${
                isPrayerExpanded
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200/80'
              }`}
              title={isTagalog ? 'I-toggle ang Gabay sa Panalangin mula sa Gemini AI' : 'Toggle Gemini AI Sample Prayer Guide'}
            >
              <Sparkles size={13} className="text-amber-600 group-hover:scale-110 transition-transform" />
              <span>{isTagalog ? 'Gabay sa Panalangin' : 'Sample Prayer'}</span>
              {isPrayerExpanded ? <ChevronUp size={12} className="text-amber-700" /> : <ChevronDown size={12} className="text-amber-700" />}
            </button>

            {isPrayed && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200/80">
                <Check size={11} strokeWidth={3} /> {isTagalog ? 'Naipanalangin Na' : 'Prayed'}
              </span>
            )}
          </div>

          {/* Expandable Gemini AI Sample Prayer Guide */}
          <AnimatePresence>
            {isPrayerExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden mt-3"
              >
                <div className={`p-4 rounded-xl border relative ${
                  theme === 'light'
                    ? 'bg-amber-50/70 border-amber-200/90 text-gray-800'
                    : 'bg-amber-950/40 border-amber-700/60 text-amber-100'
                }`}>
                  <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-amber-200/60 dark:border-amber-800/60">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                      <Sparkles size={12} className="text-amber-600" />
                      {isTagalog ? 'Gabay sa Pasasalamat (Gemini AI)' : 'Thanksgiving Guided Prayer (Gemini AI)'}
                    </span>
                    
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handleRegeneratePrayer}
                        disabled={isPrayerLoading}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md hover:bg-amber-100 dark:hover:bg-amber-900/50 text-amber-900 dark:text-amber-200 transition-colors cursor-pointer disabled:opacity-50"
                        title={isTagalog ? 'Lumikha ng bagong bersyon ng panalangin' : 'Generate another prayer variation'}
                      >
                        <RotateCw size={11} className={isPrayerLoading ? 'animate-spin text-amber-600' : ''} />
                        <span>{isTagalog ? 'Bago' : 'New'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleCopyPrayer}
                        disabled={isPrayerLoading || !samplePrayer}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md hover:bg-amber-100 dark:hover:bg-amber-900/50 text-amber-900 dark:text-amber-200 transition-colors cursor-pointer disabled:opacity-50"
                        title="Copy prayer to clipboard"
                      >
                        <Copy size={11} />
                        <span>{isTagalog ? 'Kopyahin' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  {isPrayerLoading ? (
                    <div className="py-4 flex flex-col items-center justify-center gap-2 text-amber-800 dark:text-amber-300">
                      <Loader2 size={20} className="animate-spin text-amber-600" />
                      <p className="text-xs font-medium">
                        {isTagalog ? 'Inihahanda ang panalangin sa pamamagitan ng Gemini AI...' : 'Generating thanksgiving prayer with Gemini AI...'}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-serif italic leading-relaxed text-gray-800 dark:text-amber-100">
                        "{samplePrayer}"
                      </p>
                      
                      <div className="mt-3 pt-2 border-t border-amber-200/50 dark:border-amber-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="text-[11px] text-amber-900/80 dark:text-amber-300/80">
                          {isTagalog 
                            ? 'Tapusin ang debosyon sa pagpapasalamat at paghingi ng lakas upang isabuhay ang Salita.' 
                            : 'Conclude your devotional by thanking God and asking for strength to put His Word into action.'}
                        </span>

                        <button
                          type="button"
                          onClick={handlePrayButtonClick}
                          className={`inline-flex items-center justify-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer shadow-2xs self-start sm:self-auto ${
                            isPrayed
                              ? 'bg-green-600 hover:bg-green-700 text-white'
                              : 'bg-amber-700 hover:bg-amber-800 text-white'
                          }`}
                        >
                          {isPrayed ? (
                            <>
                              <Check size={13} strokeWidth={3} /> {isTagalog ? 'Amen! Naitala na.' : 'Amen! Recorded.'}
                            </>
                          ) : (
                            <>
                              <Check size={13} strokeWidth={2.5} /> {isTagalog ? 'Amen! Ipinanalangin Ko Ito' : 'Amen! I Prayed This'}
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
