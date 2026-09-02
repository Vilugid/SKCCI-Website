import React, { useState, useEffect } from 'react';
import { BIBLE_PLAN } from '../data';
import { CheckCircle2, Circle, ChevronLeft, ChevronRight, Check, Save, Download, Loader2, Sparkles, BookOpen, MessageSquareText, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import BibleStreakCard from './BibleStreakCard';
import GoogleDrivePlayer from './GoogleDrivePlayer';
import { isSuperAdmin } from '../utils/roles';
import { fetchBibleExplainerVideo, fetchAllBibleExplainerVideos } from '../api/bibleVideos';
import { ReadingPlanId } from '../types';

interface BiblePlanProps {
  progressArray: number[];
  setProgressArray: (val: number[] | ((prev: number[]) => number[])) => void;
  is100DayComplete: boolean;
  setIs100DayComplete: (complete: boolean) => void;
}

interface HundredDaysReflection {
  userId: string;
  day: number;
  chapterScripture: string;
  note: string;
  dateCompleted?: string;
  createdAt: number;
  updatedAt: number;
}

export default function BiblePlan({ progressArray, setProgressArray, is100DayComplete, setIs100DayComplete }: BiblePlanProps) {
  const { user, signInWithGoogle } = useAuth();
  const isSuper = isSuperAdmin(user?.email);
  const [mounted, setMounted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  
  // Selected / Viewed Day for the Passage Reader (defaults to first incomplete day or Day 1)
  const completedDays = new Set(progressArray);
  const initialDay = BIBLE_PLAN.find(item => !completedDays.has(item.day))?.day || 1;
  const [selectedDay, setSelectedDay] = useState<number>(initialDay);

  // Explainer videos state for 100 Days Plan
  const [explainerVideos, setExplainerVideos] = useState<Record<number, string>>({});

  // Reflections state
  const [reflections, setReflections] = useState<Record<number, HundredDaysReflection>>({});
  const [noteText, setNoteText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showAuthAlert, setShowAuthAlert] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch all 100 days explainer videos on mount
  useEffect(() => {
    fetchAllBibleExplainerVideos('plan_100').then((videos) => {
      setExplainerVideos(videos);
    });
  }, []);

  // Fetch video for selected day if not yet cached in state
  useEffect(() => {
    if (explainerVideos[selectedDay] === undefined) {
      fetchBibleExplainerVideo(selectedDay, 'plan_100').then((url) => {
        if (url !== null) {
          setExplainerVideos(prev => ({ ...prev, [selectedDay]: url }));
        }
      });
    }
  }, [selectedDay, explainerVideos]);

  // Update note text when selectedDay changes
  useEffect(() => {
    setNoteText(reflections[selectedDay]?.note || '');
    setShowAuthAlert(false);
  }, [selectedDay, reflections]);

  // Fetch permanent 100 days reflections for authenticated user
  useEffect(() => {
    if (!user || !db) {
      setReflections({});
      return;
    }

    const fetchReflections = async () => {
      try {
        const colRef = collection(db, `users/${user.uid}/hundred_days_reflections`);
        const snapshot = await getDocs(colRef);
        const fetched: Record<number, HundredDaysReflection> = {};
        snapshot.forEach(docSnap => {
          const data = docSnap.data() as HundredDaysReflection;
          fetched[data.day] = data;
        });
        setReflections(fetched);
      } catch (err) {
        console.error('Failed to fetch 100 days reflections:', err);
      }
    };

    fetchReflections();
  }, [user]);

  const currentPlanItem = BIBLE_PLAN.find(item => item.day === selectedDay) || BIBLE_PLAN[0];
  const isSelectedDayCompleted = completedDays.has(selectedDay);

  const savedNote = (reflections[selectedDay]?.note || '').trim();
  const currentNote = noteText.trim();
  const hasChangesToSave = currentNote !== savedNote;
  const isAlreadySaved = !isSaving && currentNote === savedNote && savedNote.length > 0;

  const toggleDay = (day: number) => {
    let newArray: number[];
    const isNowCompleted = !completedDays.has(day);
    if (completedDays.has(day)) {
      newArray = progressArray.filter(d => d !== day);
    } else {
      newArray = [...progressArray, day];
    }
    
    setProgressArray(newArray);
    
    // If completing and a reflection exists or is saved, update dateCompleted
    if (user && db && reflections[day]) {
      const todayStr = new Date().toISOString().split('T')[0];
      const updatedRef: HundredDaysReflection = {
        ...reflections[day],
        dateCompleted: isNowCompleted ? todayStr : '',
        updatedAt: Date.now()
      };
      setDoc(doc(db, `users/${user.uid}/hundred_days_reflections`, String(day)), updatedRef).catch(console.error);
      setReflections(prev => ({ ...prev, [day]: updatedRef }));
    }

    if (newArray.length === 100 && !is100DayComplete) {
      setIs100DayComplete(true);
      setShowCelebration(true);
    }
  };

  const handleSaveNote = async () => {
    if (!user) {
      setShowAuthAlert(true);
      return;
    }
    if (!db) return;

    setIsSaving(true);
    try {
      const todayStr = new Date().toISOString().split('T')[0];
      const data: HundredDaysReflection = {
        userId: user.uid,
        day: selectedDay,
        chapterScripture: `${currentPlanItem.book} ${currentPlanItem.chapter}`,
        note: noteText.substring(0, 100),
        dateCompleted: isSelectedDayCompleted ? (reflections[selectedDay]?.dateCompleted || todayStr) : (reflections[selectedDay]?.dateCompleted || ''),
        createdAt: reflections[selectedDay]?.createdAt || Date.now(),
        updatedAt: Date.now()
      };

      await setDoc(doc(db, `users/${user.uid}/hundred_days_reflections`, String(selectedDay)), data);
      setReflections(prev => ({ ...prev, [selectedDay]: data }));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      setShowAuthAlert(false);
    } catch (err) {
      console.error('Error saving 100 days reflection:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportCSV = () => {
    const rows = [
      ['Day Number', 'Chapter/Scripture', 'Date Completed', 'Reflection Note'],
      ...BIBLE_PLAN.map(item => {
        const ref = reflections[item.day];
        const isDone = completedDays.has(item.day);
        const dateCompleted = ref?.dateCompleted || (isDone ? 'Completed' : 'Incomplete');
        const note = ref?.note || '';
        return [
          item.day.toString(),
          `"${item.book} ${item.chapter}"`,
          `"${dateCompleted}"`,
          `"${note.replace(/"/g, '""')}"`
        ];
      })
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'My_First_100_Days_with_JESUS_Reflections.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!mounted) return null;

  const progressPercentage = Math.round((completedDays.size / 100) * 100);
  const totalNotesCount = Object.keys(reflections).length;

  return (
    <div className="py-16 bg-white sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <img src="/logos/churchlogo4.png" alt="Savior-King Commission Church" onError={(e) => { e.currentTarget.style.display = 'none'; }} className="h-10 w-auto mx-auto mb-6" />
          <h2 className="text-3xl font-extrabold text-[#0F2C59] sm:text-4xl font-serif">
            My First 100 Days with JESUS
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Grow in your relationship with GOD by reading His Word. Studying 1 chapter a day in the New Testament.
          </p>
        </div>

        {/* Progress Bar Card & Milestone Export */}
        <div className="max-w-3xl mx-auto mb-12 bg-[#FAFAFA] rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Your Progress</p>
              <p className="text-3xl font-bold text-[#C82323]">{progressPercentage}%</p>
            </div>
            <div className="flex flex-wrap items-center sm:justify-end gap-3">
              <span className="text-sm font-medium text-gray-900">
                {completedDays.size} of 100 Days
              </span>
              
              {/* Permanent Milestone CSV Export Button */}
              <button
                type="button"
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-gray-50 text-[#0F2C59] border border-gray-200 shadow-sm transition-colors"
                title="Export your 100 days reading & reflection notes to CSV"
              >
                <Download size={14} className="text-[#C82323]" />
                <span>Export My 100 Days Notes (CSV)</span>
              </button>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 overflow-hidden mb-2">
            <div 
              className="bg-[#D4A373] h-3 sm:h-4 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          {progressPercentage === 100 && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200/80 rounded-xl flex items-center justify-between text-xs text-amber-900">
              <span className="font-semibold flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-600" /> Milestone Complete! You have finished all 100 Days.
              </span>
              <button
                type="button"
                onClick={handleExportCSV}
                className="font-bold text-[#C82323] hover:underline"
              >
                Download Lifetime CSV &rarr;
              </button>
            </div>
          )}
        </div>

        {/* Bible Reading Streak & Shield Tracking Module - Shown only while user is active on the 100 Days Plan */}
        {!is100DayComplete && progressPercentage < 100 && (
          <div className="max-w-3xl mx-auto mb-12">
            <BibleStreakCard
              planId="plan_100"
              allowPlanSwitch={false}
              currentDayNumber={selectedDay}
              totalPlanDays={100}
              onReadingMarked={(dayNum) => {
                if (dayNum && !completedDays.has(dayNum)) {
                  toggleDay(dayNum);
                }
              }}
            />
          </div>
        )}

        {/* Hero Card: Today's / Selected Day Passage Reader & Reflection Note */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className={`rounded-2xl p-6 sm:p-10 border shadow-lg relative overflow-hidden transition-colors ${
            isSelectedDayCompleted ? 'bg-[#FAFAFA]/70 border-[#D4A373]/50' : 'bg-white border-gray-200'
          }`}>
            
            {/* Day Navigation */}
            <div className="flex items-center justify-between mb-8">
              <button 
                type="button"
                onClick={() => setSelectedDay(Math.max(1, selectedDay - 1))}
                disabled={selectedDay === 1}
                className={`p-2 rounded-full transition-colors ${
                  selectedDay === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100 text-gray-700'
                }`}
                title="Previous Day"
              >
                <ChevronLeft size={24} />
              </button>
              
              <div className="text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C82323]">
                  Milestone Journey
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#0F2C59] mt-0.5">
                  Day {selectedDay} of 100
                </h3>
              </div>

              <button 
                type="button"
                onClick={() => setSelectedDay(Math.min(100, selectedDay + 1))}
                disabled={selectedDay === 100}
                className={`p-2 rounded-full transition-colors ${
                  selectedDay === 100 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100 text-gray-700'
                }`}
                title="Next Day"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Passage Reader Box */}
            <label className={`flex items-center p-5 rounded-2xl cursor-pointer transition-all border ${
              isSelectedDayCompleted 
                ? 'bg-[#D4A373]/15 border-[#D4A373]/50 shadow-sm' 
                : 'bg-[#FAFAFA] border-gray-200 hover:bg-gray-100/70 hover:border-gray-300'
            }`}>
              <div className="flex-shrink-0 mr-4">
                <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-colors ${
                  isSelectedDayCompleted ? 'bg-[#D4A373] border-[#D4A373] text-white shadow-sm' : 'border-gray-300 bg-white'
                }`}>
                  {isSelectedDayCompleted && <Check size={18} strokeWidth={3} />}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-[#C82323]" />
                  <p className="text-xs font-bold uppercase tracking-wider text-[#C82323]">
                    New Testament Reading
                  </p>
                </div>
                <p className="text-xl font-bold text-gray-900 mt-0.5">
                  {currentPlanItem.book} Chapter {currentPlanItem.chapter}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {isSelectedDayCompleted ? '✓ Completed reading for this milestone' : 'Tap to mark as completed'}
                </p>
              </div>
              <input 
                type="checkbox" 
                className="hidden" 
                checked={isSelectedDayCompleted} 
                onChange={() => toggleDay(selectedDay)} 
              />
            </label>

            {/* Bible Gateway Quick Reading Link */}
            <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border transition-all bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#D4A373]/20 text-[#D4A373] flex items-center justify-center flex-shrink-0">
                  <BookOpen size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#D4A373]">
                    Read on Bible Gateway
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {currentPlanItem.book} {currentPlanItem.chapter}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <a
                  href={`https://www.biblegateway.com/passage/?search=${encodeURIComponent(`${currentPlanItem.book} ${currentPlanItem.chapter}`)}&version=NKJV`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F2C59] hover:bg-[#1A365D] text-white text-xs font-bold transition-all shadow-xs cursor-pointer group"
                >
                  <span>Read Today&apos;s Chapter</span>
                  <ExternalLink size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Daily Explainer Video (Google Drive Player for 100 Days Plan) */}
            <div className="mt-6">
              <GoogleDrivePlayer
                planId="plan_100"
                dayNumber={selectedDay}
                dayTitle={`Day ${selectedDay} — ${currentPlanItem.book} ${currentPlanItem.chapter}`}
                videoUrl={explainerVideos[selectedDay] || null}
                canEdit={isSuper}
                adminEmail={user?.email || ''}
                theme="light"
                onVideoUpdated={(newUrl) => {
                  setExplainerVideos(prev => ({
                    ...prev,
                    [selectedDay]: newUrl || ''
                  }));
                }}
              />
            </div>

            {/* Clean Reflection Card: What struck you most? */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#D4A373] flex items-center gap-2">
                  <MessageSquareText size={16} />
                  What struck you most?
                </h4>
                <div className="flex items-center justify-between sm:justify-end gap-3">
                  <span className={`text-xs font-medium ${noteText.length >= 100 ? 'text-red-500 font-bold' : 'text-gray-500'}`}>
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
                className="w-full p-4 rounded-xl resize-none h-28 text-sm transition-all border outline-none bg-[#FAFAFA] border-gray-200 focus:border-[#D4A373] focus:bg-white focus:ring-1 focus:ring-[#D4A373] text-gray-900 placeholder:text-gray-400"
              />
              
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                {showAuthAlert ? (
                  <div className="flex-1 flex flex-col sm:flex-row items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 w-full text-sm">
                    <span className="flex-1">Please sign in to save and sync your 100 Days journey to the cloud.</span>
                    <button 
                      type="button"
                      onClick={signInWithGoogle}
                      className="whitespace-nowrap px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm"
                    >
                      Sign In
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 text-xs text-gray-500">
                    {reflections[selectedDay]?.updatedAt && (
                      <span>Saved in cloud • Permanent lifetime record</span>
                    )}
                  </div>
                )}
                
                <button
                  type="button"
                  onClick={handleSaveNote}
                  disabled={isSaving || !hasChangesToSave}
                  className={`w-full sm:w-auto flex-shrink-0 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                    saveSuccess
                      ? 'bg-green-600 hover:bg-green-700 text-white shadow-sm'
                      : !hasChangesToSave
                      ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed shadow-none'
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

          </div>
        </div>

        {/* 100 Days Selection Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700">
              Select Day ({completedDays.size}/100 completed • {totalNotesCount} notes recorded)
            </h3>
            <span className="text-xs text-gray-500">
              Click any day to open its passage & reflection note
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-3">
            {BIBLE_PLAN.map((item) => {
              const isCompleted = completedDays.has(item.day);
              const isSelected = selectedDay === item.day;
              const hasNote = Boolean(reflections[item.day]?.note);

              return (
                <button
                  key={item.day}
                  type="button"
                  onClick={() => {
                    setSelectedDay(item.day);
                    // scroll smoothly to passage reader if on mobile
                    if (window.innerWidth < 768) {
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }
                  }}
                  className={`relative flex flex-col items-center justify-center p-3 rounded-xl border text-sm transition-all ${
                    isSelected 
                      ? 'ring-2 ring-[#0F2C59] border-[#0F2C59] bg-white shadow-md'
                      : isCompleted 
                        ? 'bg-[#FAFAFA] border-[#D4A373]/40 text-amber-900 shadow-sm' 
                        : 'bg-white border-gray-200 text-gray-600 hover:border-amber-300 hover:bg-[#FAFAFA]/50'
                  }`}
                >
                  <div className="absolute top-2 right-2">
                    {isCompleted ? (
                      <CheckCircle2 size={16} className="text-[#D4A373]" />
                    ) : (
                      <Circle size={16} className="text-gray-300" />
                    )}
                  </div>
                  
                  {hasNote && (
                    <div className="absolute top-2 left-2" title="Reflection note saved">
                      <span className="w-2 h-2 rounded-full bg-[#0F2C59] block" />
                    </div>
                  )}

                  <span className="font-bold text-lg mb-1">{item.day}</span>
                  <span className="text-xs text-center leading-tight">
                    {item.book} <br className="hidden sm:block" /> {item.chapter}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        
      </div>
      
      {showCelebration && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setShowCelebration(false)} />
          <div className="relative bg-white rounded-3xl p-8 max-w-md text-center shadow-2xl border border-gray-100">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 text-green-600 mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">Hallelujah!</h3>
            <p className="text-gray-600 mb-6 text-base leading-relaxed">
              You have successfully completed the 100 Days Bible Plan! The full 365-Day Bible Reading Guide is now UNLOCKED.
            </p>
            <div className="space-y-3">
              <button 
                type="button"
                onClick={handleExportCSV}
                className="w-full py-3 px-6 rounded-xl bg-white border-2 border-[#0F2C59] text-[#0F2C59] font-bold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <Download size={16} /> Export My 100 Days Notes (CSV)
              </button>
              <button 
                type="button"
                onClick={() => setShowCelebration(false)}
                className="w-full py-3.5 px-6 rounded-xl bg-[#C82323] hover:bg-[#a11b1b] text-white font-medium text-lg transition-colors shadow-sm"
              >
                Praise the Lord
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

