import React, { useState, useEffect } from 'react';
import { BIBLE_PLAN_365_FULL } from '../bibleData';
import { 
  CheckCircle2, 
  Circle, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Sun, 
  Moon, 
  Check, 
  Save, 
  Download, 
  AlertCircle, 
  X, 
  Loader2,
  BookOpen,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSyncedState } from '../hooks/useSyncedState';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, setDoc, getDocs, collection, query, where } from 'firebase/firestore';
import BibleStreakCard from './BibleStreakCard';
import GoogleDrivePlayer from './GoogleDrivePlayer';
import { isSuperAdmin } from '../utils/roles';
import { fetchBibleExplainerVideo, fetchAllBibleExplainerVideos } from '../api/bibleVideos';
import { ReadingPlanId } from '../types';

type Theme = 'light' | 'dark';

interface ScriptureReflection {
  userId: string;
  date: string;
  year: number;
  note: string;
  passageTitle: string;
  createdAt: number;
  updatedAt: number;
}


interface BiblePlan365Props {
  is100DayComplete?: boolean;
}

export default function BiblePlan365({ is100DayComplete: propIs100DayComplete }: BiblePlan365Props = {}) {
  const { user, signInWithGoogle } = useAuth();
  const isSuper = isSuperAdmin(user?.email);
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);
  const currentYear = new Date().getFullYear();

  // Synced 100-day completion status check
  const [synced100Complete] = useSyncedState<boolean>('sk_100_day_completed', false);
  const [synced100Progress] = useSyncedState<number[]>('sk_100_day_progress', []);
  const is100Completed = propIs100DayComplete ?? (synced100Complete || synced100Progress.length >= 100);
  
  // Progress sets via useSyncedState
  const [completedOTArray, setCompletedOTArray] = useSyncedState<number[]>(`sk_bible_ot_${currentYear}`, []);
  const [completedNTArray, setCompletedNTArray] = useSyncedState<number[]>(`sk_bible_nt_${currentYear}`, []);
  
  const completedOT = new Set(completedOTArray);
  const completedNT = new Set(completedNTArray);
  
  // Current viewed day (defaults to today)
  const [viewedDay, setViewedDay] = useState<number>(1);
  const [actualToday, setActualToday] = useState<number>(1);

  // Daily Explainer Videos (Google Drive)
  const [explainerVideos, setExplainerVideos] = useState<Record<number, string>>({});
  
  // Reflection Notes State
  const [reflections, setReflections] = useState<Record<string, ScriptureReflection>>({});
  const [noteText, setNoteText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showAuthAlert, setShowAuthAlert] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  
  const getCalendarDateForDay = (dayNum: number, year: number) => {
    // January 1st is dayNum=1
    const d = new Date(year, 0, dayNum);
    // Format as YYYY-MM-DD in local time
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };
  
  const viewedDate = getCalendarDateForDay(viewedDay, currentYear);
  
  const savedNote = (reflections[viewedDate]?.note || '').trim();
  const currentNote = noteText.trim();
  const hasChangesToSave = currentNote !== savedNote;
  const isAlreadySaved = !isSaving && currentNote === savedNote && savedNote.length > 0;
  
  useEffect(() => {
    setNoteText(reflections[viewedDate]?.note || '');
  }, [viewedDate, reflections]);
  
  useEffect(() => {
    // Fetch explainer videos
    fetchAllBibleExplainerVideos().then((videos) => {
      setExplainerVideos(videos);
    });
  }, []);

  useEffect(() => {
    if (explainerVideos[viewedDay] === undefined) {
      fetchBibleExplainerVideo(viewedDay).then((url) => {
        if (url !== null) {
          setExplainerVideos(prev => ({ ...prev, [viewedDay]: url }));
        }
      });
    }
  }, [viewedDay, explainerVideos]);

  useEffect(() => {
    if (!user || !db) {
      setReflections({});
      return;
    }
    const fetchReflections = async () => {
      try {
        const q = query(
          collection(db, `users/${user.uid}/scripture_reflections`),
          where('year', '==', currentYear)
        );
        const snapshot = await getDocs(q);
        const fetched: Record<string, ScriptureReflection> = {};
        snapshot.forEach(doc => {
          const data = doc.data() as ScriptureReflection;
          fetched[data.date] = data;
        });
        setReflections(fetched);
      } catch (err) {
        console.error('Failed to fetch reflections:', err);
      }
    };
    fetchReflections();
  }, [user, currentYear]);

  const handleSaveNote = async () => {
    if (!user) {
      setShowAuthAlert(true);
      return;
    }
    if (!db) return;
    
    setIsSaving(true);
    try {
      const docRef = doc(db, `users/${user.uid}/scripture_reflections`, viewedDate);
      const data: ScriptureReflection = {
        userId: user.uid,
        date: viewedDate,
        year: currentYear,
        note: noteText.substring(0, 100),
        passageTitle: `Day ${viewedDay}`,
        updatedAt: Date.now(),
        createdAt: reflections[viewedDate]?.createdAt || Date.now()
      };
      await setDoc(docRef, data);
      setReflections(prev => ({ ...prev, [viewedDate]: data }));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      setShowAuthAlert(false);
    } catch (err) {
      console.error("Error saving note:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportCSV = () => {
    const rows = [
      ['Date', 'Passage/Reading Title', 'Reflection Note'],
      ...Object.values(reflections).map(r => [
        r.date, 
        `"${r.passageTitle}"`, 
        `"${r.note.replace(/"/g, '""')}"`
      ])
    ];
    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Scripture_Reflections_${currentYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const todayDateObj = new Date();
  const isDecember = todayDateObj.getMonth() === 11;
  const hasNotesThisYear = Object.keys(reflections).length > 0;
  const showYearEndBanner = isDecember && hasNotesThisYear && !bannerDismissed;
  
  useEffect(() => {
    // Calculate today's day of the year
    const now = new Date();
    const start = new Date(currentYear, 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    // Clamp to 1-365
    const todayNum = Math.max(1, Math.min(365, dayOfYear));
    setActualToday(todayNum);
    setViewedDay(todayNum);
    
    // Cleanup old years
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('sk_bible_') && !key.endsWith(currentYear.toString())) {
        localStorage.removeItem(key);
      }
    }
    
    setMounted(true);
  }, [currentYear]);

  const toggleReading = (day: number, type: 'ot' | 'nt') => {
    const isOT = type === 'ot';
    const currentArray = isOT ? completedOTArray : completedNTArray;
    const setArrayFunc = isOT ? setCompletedOTArray : setCompletedNTArray;
    
    let newArray: number[];
    if (currentArray.includes(day)) {
      newArray = currentArray.filter(d => d !== day);
    } else {
      newArray = [...currentArray, day];
    }
    setArrayFunc(newArray);
  };

  if (!mounted) return null;

  const progressPercentage = Math.round(((completedOT.size + completedNT.size) / (365 * 2)) * 100);
  const currentReading = BIBLE_PLAN_365_FULL[viewedDay - 1];
  
  const isViewedOTDone = completedOT.has(viewedDay);
  const isViewedNTDone = completedNT.has(viewedDay);
  const isViewedAllDone = isViewedOTDone && isViewedNTDone;
  
  const themeClasses = {
    bg: theme === 'light' ? 'bg-white' : 'bg-gray-900',
    text: theme === 'light' ? 'text-gray-900' : 'text-gray-50',
    textMuted: theme === 'light' ? 'text-gray-600' : 'text-gray-400',
    border: theme === 'light' ? 'border-gray-200' : 'border-gray-800',
    card: theme === 'light' ? 'bg-[#FAFAFA]' : 'bg-gray-800/50',
    buttonHover: theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-gray-800',
  };

  return (
    <div className={`py-16 sm:py-24 min-h-screen transition-colors duration-300 ${themeClasses.bg} ${themeClasses.text}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Year-End Banner */}
        <AnimatePresence>
          {showYearEndBanner && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 rounded-xl p-4 bg-amber-50 border border-amber-200 text-amber-900 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-start sm:items-center gap-3">
                <AlertCircle className="flex-shrink-0 text-amber-600 mt-0.5 sm:mt-0" size={20} />
                <p className="text-sm font-medium">
                  <strong>Year-End Notice:</strong> All reflection notes will automatically reset on January 1. Make sure to download a copy for your records.
                </p>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleExportCSV}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm whitespace-nowrap"
                >
                  <Download size={16} /> Export Notes (CSV)
                </button>
                <button 
                  onClick={() => setBannerDismissed(true)}
                  className="p-2 text-amber-600 hover:bg-amber-100 rounded-lg transition-colors flex-shrink-0"
                  aria-label="Dismiss banner"
                >
                  <X size={20} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Header & Theme Toggle */}
        <div className="flex justify-end mb-4">
          <button 
            onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
            className={`p-2 rounded-full ${themeClasses.card} ${themeClasses.buttonHover} transition-colors`}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={20} className="text-gray-600" /> : <Sun size={20} className="text-[#D4A373]" />}
          </button>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-12">
          <img src="/logos/churchlogo4.png" alt="Savior-King Commission Church" onError={(e) => { e.currentTarget.style.display = 'none'; }} className="h-10 w-auto mx-auto mb-6" />
          <h2 className={`text-3xl font-extrabold sm:text-4xl font-serif ${theme === 'light' ? 'text-[#0F2C59]' : 'text-gray-50'}`}>
            365-Day Bible Reading Guide
          </h2>
          <p className={`mt-4 text-lg ${themeClasses.textMuted}`}>
            Read the entire Bible in one year. The plan rests and renews automatically every January 1st.
          </p>
        </div>

        {/* Progress Bar */}
        <div className={`max-w-3xl mx-auto mb-12 rounded-2xl p-6 sm:p-8 border shadow-sm ${themeClasses.card} ${themeClasses.border}`}>
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className={`text-sm font-medium uppercase tracking-wide ${themeClasses.textMuted}`}>2026 Progress</p>
              <p className="text-3xl font-bold text-[#C82323]">{progressPercentage}%</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{Math.floor((completedOT.size + completedNT.size)/2)} of 365 Days</p>
            </div>
          </div>
          <div className={`w-full rounded-full h-3 sm:h-4 overflow-hidden ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'}`}>
            <div 
              className="bg-[#D4A373] h-3 sm:h-4 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Bible Reading Streak & Shield Tracking Module - Shown only when user has completed the 100-Day Bible Plan */}
        {is100Completed && (
          <div className="max-w-3xl mx-auto mb-12">
            <BibleStreakCard
              planId="plan_365"
              allowPlanSwitch={false}
              currentDayNumber={viewedDay}
              totalPlanDays={365}
              onReadingMarked={(dayNum) => {
                if (dayNum) {
                  if (!completedOT.has(dayNum)) toggleReading(dayNum, 'ot');
                  if (!completedNT.has(dayNum)) toggleReading(dayNum, 'nt');
                }
              }}
            />
          </div>
        )}

        {/* Hero Card: Today's / Viewed Reading */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className={`rounded-2xl p-6 sm:p-10 border shadow-lg relative overflow-hidden transition-colors ${isViewedAllDone ? (theme === 'light' ? 'bg-[#FAFAFA]/50 border-[#D4A373]/40' : 'bg-amber-900/10 border-amber-900/50') : (theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700')}`}>
            
            {/* View Navigation */}
            <div className="flex items-center justify-between mb-8">
              <button 
                onClick={() => setViewedDay(Math.max(1, viewedDay - 1))}
                disabled={viewedDay === 1}
                className={`p-2 rounded-full ${viewedDay === 1 ? 'opacity-30 cursor-not-allowed' : themeClasses.buttonHover}`}
              >
                <ChevronLeft size={24} />
              </button>
              
              <div className="text-center">
                <span className={`text-sm font-bold uppercase tracking-wider ${viewedDay === actualToday ? 'text-[#C82323]' : themeClasses.textMuted}`}>
                  {viewedDay === actualToday ? "Today's Reading" : `Day ${viewedDay}`}
                </span>
                <h3 className="text-2xl font-serif font-bold mt-1">Day {viewedDay} of 365</h3>
              </div>

              <button 
                onClick={() => setViewedDay(Math.min(365, viewedDay + 1))}
                disabled={viewedDay === 365}
                className={`p-2 rounded-full ${viewedDay === 365 ? 'opacity-30 cursor-not-allowed' : themeClasses.buttonHover}`}
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              {/* OT Row */}
              <label className={`flex items-center p-4 rounded-xl cursor-pointer transition-colors border ${isViewedOTDone ? (theme === 'light' ? 'bg-[#D4A373]/20/50 border-[#D4A373]/40' : 'bg-amber-900/20 border-[#0F2C59]/50') : (theme === 'light' ? 'bg-[#FAFAFA] border-gray-200 hover:bg-gray-100' : 'bg-gray-900/50 border-gray-700 hover:bg-gray-700')}`}>
                <div className="flex-shrink-0 mr-4">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${isViewedOTDone ? 'bg-[#D4A373] border-[#D4A373] text-white' : (theme === 'light' ? 'border-gray-300' : 'border-gray-600')}`}>
                    {isViewedOTDone && <Check size={16} strokeWidth={3} />}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium uppercase text-[#C82323] dark:text-[#D4A373]">Old Testament</p>
                  <p className="text-lg font-bold">{currentReading.ot}</p>
                </div>
                <input 
                  type="checkbox" 
                  className="hidden" 
                  checked={isViewedOTDone} 
                  onChange={() => toggleReading(viewedDay, 'ot')} 
                />
              </label>

              {/* NT Row */}
              <label className={`flex items-center p-4 rounded-xl cursor-pointer transition-colors border ${isViewedNTDone ? (theme === 'light' ? 'bg-[#D4A373]/20/50 border-[#D4A373]/40' : 'bg-amber-900/20 border-[#0F2C59]/50') : (theme === 'light' ? 'bg-[#FAFAFA] border-gray-200 hover:bg-gray-100' : 'bg-gray-900/50 border-gray-700 hover:bg-gray-700')}`}>
                <div className="flex-shrink-0 mr-4">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${isViewedNTDone ? 'bg-[#D4A373] border-[#D4A373] text-white' : (theme === 'light' ? 'border-gray-300' : 'border-gray-600')}`}>
                    {isViewedNTDone && <Check size={16} strokeWidth={3} />}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium uppercase text-blue-600 dark:text-blue-400">New Testament</p>
                  <p className="text-lg font-bold">{currentReading.nt}</p>
                </div>
                <input 
                  type="checkbox" 
                  className="hidden" 
                  checked={isViewedNTDone} 
                  onChange={() => toggleReading(viewedDay, 'nt')} 
                />
              </label>
            </div>

            {/* Bible Gateway Quick Reading Link */}
            <div className={`mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border transition-all ${
              theme === 'light' 
                ? 'bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40' 
                : 'bg-amber-950/20 border-amber-500/20 hover:border-amber-500/40'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#D4A373]/20 text-[#D4A373] flex items-center justify-center flex-shrink-0">
                  <BookOpen size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#D4A373]">
                    Read on Bible Gateway
                  </p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {currentReading.ot} &bull; {currentReading.nt}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://www.biblegateway.com/passage/?search=${encodeURIComponent(`${currentReading.ot}; ${currentReading.nt}`)}&version=NKJV`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0F2C59] hover:bg-[#1A365D] dark:bg-[#D4A373] dark:hover:bg-[#c49262] text-white dark:text-slate-950 text-xs font-bold transition-all shadow-xs cursor-pointer group"
                >
                  <span>Read Today&apos;s Chapters</span>
                  <ExternalLink size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a
                  href="https://www.biblegateway.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium transition-colors"
                  title="Visit BibleGateway.com homepage"
                >
                  Bible Gateway ↗
                </a>
              </div>
            </div>

            {/* Daily Explainer Video (Google Drive Player) */}
            <div className="mt-6">
              <GoogleDrivePlayer
                dayNumber={viewedDay}
                dayTitle={`Day ${viewedDay} — ${currentReading.ot} & ${currentReading.nt}`}
                videoUrl={explainerVideos[viewedDay] || null}
                canEdit={isSuper}
                adminEmail={user?.email || ''}
                theme={theme}
                onVideoUpdated={(newUrl) => {
                  setExplainerVideos(prev => ({
                    ...prev,
                    [viewedDay]: newUrl || ''
                  }));
                }}
              />
            </div>
            
            {/* Daily Scripture Reflection Note */}
            <div className={`mt-8 pt-6 border-t ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}>
              <div className="mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#D4A373] flex items-center gap-2">
                  What struck you most?
                </h4>
                <div className="flex items-center justify-between sm:justify-end gap-3">
                  {isDecember && hasNotesThisYear && (
                    <button
                      onClick={handleExportCSV}
                      className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors shadow-sm ${
                        theme === 'light' 
                          ? 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700' 
                          : 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-200'
                      }`}
                    >
                      <Download size={14} /> Export CSV
                    </button>
                  )}
                  <span className={`text-xs font-medium ${noteText.length >= 100 ? 'text-red-500' : themeClasses.textMuted}`}>
                    {noteText.length}/100
                  </span>
                </div>
              </div>
              
              <textarea
                value={noteText}
                onChange={(e) => {
                  if (!user) {
                    setShowAuthAlert(true);
                  } else {
                    setNoteText(e.target.value);
                    setShowAuthAlert(false);
                  }
                }}
                maxLength={100}
                placeholder="Write your short reflection here..."
                className={`w-full p-4 rounded-xl resize-none h-28 text-sm transition-all border outline-none ${
                  theme === 'light'
                    ? 'bg-[#FAFAFA] border-gray-200 focus:border-[#D4A373] focus:bg-white focus:ring-1 focus:ring-[#D4A373]'
                    : 'bg-gray-900/50 border-gray-700 text-gray-100 focus:border-[#D4A373] focus:bg-gray-800'
                }`}
              />
              
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                {showAuthAlert ? (
                  <div className="flex-1 flex flex-col sm:flex-row items-center gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 w-full">
                    <span className="text-sm">Please sign in to save and sync your scripture reflections to the cloud.</span>
                    <button 
                      onClick={signInWithGoogle}
                      className="whitespace-nowrap px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-md text-sm font-medium transition-colors"
                    >
                      Sign In
                    </button>
                  </div>
                ) : (
                  <div className="flex-1"></div>
                )}
                
                <button
                  onClick={handleSaveNote}
                  disabled={isSaving || !hasChangesToSave}
                  className={`w-full sm:w-auto flex-shrink-0 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                    saveSuccess
                      ? 'bg-green-600 hover:bg-green-700 text-white shadow-sm'
                      : !hasChangesToSave
                      ? theme === 'light'
                        ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed shadow-none'
                        : 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed shadow-none'
                      : 'bg-[#0F2C59] hover:bg-[#1A365D] text-white shadow-sm cursor-pointer active:scale-95'
                  }`}
                  title={!hasChangesToSave ? (isAlreadySaved ? "Your reflection is already saved in cloud" : "No changes to save") : "Save reflection to cloud"}
                >
                  {isSaving ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : saveSuccess ? (
                    <Check size={18} />
                  ) : isAlreadySaved ? (
                    <Check size={18} className="text-gray-400" />
                  ) : (
                    <Save size={18} />
                  )}
                  {isSaving ? 'Saving...' : saveSuccess ? 'Saved!' : isAlreadySaved ? 'Saved to Cloud' : 'Save to Cloud'}
                </button>
              </div>
            </div>

            {viewedDay !== actualToday && (
              <div className="mt-8 text-center">
                <button 
                  onClick={() => setViewedDay(actualToday)}
                  className="inline-flex items-center text-sm font-medium text-[#C82323] hover:text-[#a11b1b]"
                >
                  <Calendar size={16} className="mr-2" /> Jump to Today (Day {actualToday})
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 365 Day Grid */}
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xl font-bold font-serif mb-6 text-center">Full Year Overview</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-3">
            {BIBLE_PLAN_365_FULL.map((item) => {
              const otDone = completedOT.has(item.day);
              const ntDone = completedNT.has(item.day);
              const allDone = otDone && ntDone;
              const isToday = item.day === actualToday;
              
              let cardStyle = theme === 'light' 
                ? 'bg-white border-gray-200 text-gray-600 hover:border-amber-300' 
                : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-[#D4A373]';
                
              if (allDone) {
                cardStyle = theme === 'light'
                  ? 'bg-[#FAFAFA] border-[#D4A373]/40 text-amber-900 shadow-sm'
                  : 'bg-amber-900/20 border-[#a11b1b] text-amber-400';
              } else if (otDone || ntDone) {
                cardStyle = theme === 'light'
                  ? 'bg-[#FAFAFA] border-[#D4A373]/40 text-gray-800'
                  : 'bg-gray-800/80 border-[#a11b1b]/50 text-gray-300';
              }
              
              if (isToday) {
                cardStyle += theme === 'light' ? ' ring-2 ring-[#D4A373] ring-offset-1' : ' ring-2 ring-[#D4A373] ring-offset-gray-900 ring-offset-2';
              }

              return (
                <button
                  key={item.day}
                  onClick={() => {
                    setViewedDay(item.day);
                    window.scrollTo({ top: 100, behavior: 'smooth' });
                  }}
                  className={`relative flex flex-col items-center justify-center p-3 rounded-xl border text-sm transition-all ${cardStyle}`}
                >
                  <div className="absolute top-2 right-2">
                    {allDone ? (
                      <CheckCircle2 size={16} className="text-[#D4A373]" />
                    ) : (otDone || ntDone) ? (
                      <div className="w-4 h-4 rounded-full border-2 border-[#D4A373] flex items-center justify-center text-[10px] font-bold text-[#D4A373]">½</div>
                    ) : (
                      <Circle size={16} className={theme === 'light' ? "text-gray-300" : "text-gray-600"} />
                    )}
                  </div>
                  <span className={`font-bold text-lg mb-1 ${isToday ? 'text-[#C82323]' : ''}`}>{item.day}</span>
                  <span className="text-[10px] text-center leading-tight truncate w-full px-1">
                    {item.ot.split(' ')[0]} / {item.nt.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
