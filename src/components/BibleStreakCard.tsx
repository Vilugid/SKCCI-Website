import React, { useState, useEffect } from 'react';
import { Flame, Shield, ShieldAlert, ShieldCheck, Trophy, Calendar, Sparkles, CheckCircle2, AlertCircle, Info, ChevronRight, HelpCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { ReadingPlanId, UserReadingStreak } from '../types';
import { subscribeToUserStreak, recordReadingCompletion, getLocalDateString, getDayDifference, MAX_SHIELDS, SHIELD_REWARD_DAYS, getDefaultStreak } from '../api/streaks';

interface BibleStreakCardProps {
  planId: ReadingPlanId;
  onPlanChange?: (planId: ReadingPlanId) => void;
  allowPlanSwitch?: boolean;
  currentDayNumber?: number;
  totalPlanDays?: number;
  className?: string;
  onReadingMarked?: (dayNum?: number) => void;
}

export default function BibleStreakCard({
  planId,
  onPlanChange,
  allowPlanSwitch = true,
  currentDayNumber,
  totalPlanDays,
  className = '',
  onReadingMarked
}: BibleStreakCardProps) {
  const { user, signInWithGoogle } = useAuth();
  const [streakData, setStreakData] = useState<UserReadingStreak>(getDefaultStreak(user?.uid || 'guest', planId));
  const [loading, setLoading] = useState(true);
  const [isMarking, setIsMarking] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showCelebrationBadge, setShowCelebrationBadge] = useState(false);

  const todayStr = getLocalDateString(new Date());
  const isCompletedToday = streakData.lastCompletedDate === todayStr;

  // Real-time Firestore sync
  useEffect(() => {
    setLoading(true);
    if (!user) {
      // Fallback local storage for offline / unauthenticated preview
      const localKey = `sk_local_streak_${planId}`;
      const saved = localStorage.getItem(localKey);
      if (saved) {
        try {
          setStreakData(JSON.parse(saved));
        } catch {
          setStreakData(getDefaultStreak('guest', planId));
        }
      } else {
        setStreakData(getDefaultStreak('guest', planId));
      }
      setLoading(false);
      return;
    }

    const unsubscribe = subscribeToUserStreak(user.uid, planId, (data) => {
      setStreakData(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, planId]);

  const triggerConfetti = (isMilestone = false) => {
    try {
      if (isMilestone) {
        // Multi-stage grand celebration confetti
        const count = 200;
        const defaults = { origin: { y: 0.7 } };

        const fire = (particleRatio: number, opts: confetti.Options) => {
          confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio)
          });
        };

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
      } else {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch {
      // Fallback gracefully if canvas is constrained
    }
  };

  const handleMarkComplete = async () => {
    if (!user) {
      toast((t) => (
        <div className="flex items-center gap-2">
          <span>Please sign in with Google to save your streaks permanently!</span>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              signInWithGoogle();
            }}
            className="bg-[#C82323] text-white px-2 py-1 rounded text-xs font-bold"
          >
            Sign In
          </button>
        </div>
      ), { icon: '🔐', duration: 5000 });
      
      // Perform local offline streak update
      const todayStr = getLocalDateString(new Date());
      const updatedLocal: UserReadingStreak = {
        ...streakData,
        currentStreak: isCompletedToday ? streakData.currentStreak : streakData.currentStreak + 1,
        longestStreak: Math.max(streakData.longestStreak, isCompletedToday ? streakData.currentStreak : streakData.currentStreak + 1),
        lastCompletedDate: todayStr,
        completedDays: currentDayNumber && !streakData.completedDays.includes(currentDayNumber)
          ? [...streakData.completedDays, currentDayNumber]
          : streakData.completedDays
      };
      setStreakData(updatedLocal);
      localStorage.setItem(`sk_local_streak_${planId}`, JSON.stringify(updatedLocal));
      triggerConfetti(false);
      toast.success("Reading completed for today! 🔥");
      if (onReadingMarked && currentDayNumber) onReadingMarked(currentDayNumber);
      return;
    }

    setIsMarking(true);
    try {
      const result = await recordReadingCompletion(user.uid, planId, streakData, currentDayNumber);
      
      if (result.isNewShieldAwarded) {
        triggerConfetti(true);
        toast.success(result.alertMessage, { duration: 6000, icon: '🛡️' });
      } else if (result.isShieldUsed) {
        toast(result.alertMessage, { duration: 6000, icon: '🛡️' });
      } else if (result.isAlreadyCompletedToday) {
        toast(result.alertMessage, { icon: '🔥' });
      } else {
        triggerConfetti(false);
        toast.success(result.alertMessage, { icon: '🔥' });
      }

      setShowCelebrationBadge(true);
      setTimeout(() => setShowCelebrationBadge(false), 4000);

      if (onReadingMarked && currentDayNumber) {
        onReadingMarked(currentDayNumber);
      }
    } catch (err: any) {
      console.error("Error marking reading complete:", err);
      toast.error(err?.message || "Failed to update streak. Please try again.");
    } finally {
      setIsMarking(false);
    }
  };

  // Generate 7-day visual timeline ending today
  const recentDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = getLocalDateString(d);
    const dayLabel = d.toLocaleDateString('en-US', { weekday: 'narrow' });
    const isToday = dateStr === todayStr;

    // Find in history
    const historyItem = streakData.history.find(h => h.date === dateStr);
    let status: 'completed' | 'shield_used' | 'missed' | 'pending' | 'future' = 'pending';

    if (historyItem) {
      status = historyItem.status;
    } else if (streakData.lastCompletedDate === dateStr) {
      status = 'completed';
    } else if (isToday) {
      status = isCompletedToday ? 'completed' : 'pending';
    } else {
      // Past day with no record
      status = 'missed';
    }

    return {
      dateStr,
      dayLabel,
      dayNumber: d.getDate(),
      isToday,
      status
    };
  });

  const nextShieldInDays = SHIELD_REWARD_DAYS - (streakData.currentStreak % SHIELD_REWARD_DAYS);

  return (
    <div className={`bg-gradient-to-br from-white via-[#FCFBF7] to-[#F7F4EC] rounded-2xl border border-[#E9E4D4] shadow-sm overflow-hidden transition-all duration-300 ${className}`}>
      {/* Top Banner with Plan Selector & Info */}
      <div className="bg-[#0F2C59] px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 text-white">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="p-1.5 rounded-lg bg-white/10 text-amber-300">
            <Flame size={18} className="animate-pulse text-amber-400 fill-amber-400" />
          </span>
          <div>
            <h3 className="text-sm sm:text-base font-bold font-serif tracking-wide flex items-center gap-2 truncate">
              Bible Reading Streak & Shields
            </h3>
            <p className="text-[11px] text-blue-200 truncate">
              {planId === 'plan_100' ? 'My First 100 Days with JESUS' : '365-Day Bible Reading Guide'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {allowPlanSwitch && onPlanChange && (
            <div className="bg-white/10 p-0.5 rounded-xl flex items-center border border-white/15">
              <button
                type="button"
                onClick={() => onPlanChange('plan_100')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                  planId === 'plan_100'
                    ? 'bg-white text-[#0F2C59] shadow-sm'
                    : 'text-blue-100 hover:text-white'
                }`}
              >
                100 Days
              </button>
              <button
                type="button"
                onClick={() => onPlanChange('plan_365')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                  planId === 'plan_365'
                    ? 'bg-white text-[#0F2C59] shadow-sm'
                    : 'text-blue-100 hover:text-white'
                }`}
              >
                365 Guide
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowRulesModal(true)}
            className="text-blue-200 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            title="How Streaks & Shields work"
          >
            <HelpCircle size={16} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-6 flex items-center justify-center space-x-3 text-gray-500">
          <Loader2 className="animate-spin text-[#C82323]" size={20} />
          <span className="text-sm font-medium">Syncing your reading streak...</span>
        </div>
      ) : (
        <div className="p-4 sm:p-6 space-y-5">
          {/* Main Highlights Grid: Active Streak, Shields, Longest Record */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            
            {/* 1. Active Current Streak */}
            <div className="relative bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-white p-4 rounded-xl border border-amber-200/80 shadow-xs flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-sm flex-shrink-0">
                <Flame size={26} className="fill-white animate-bounce duration-1000" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-serif">
                    {streakData.currentStreak}
                  </span>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                    {streakData.currentStreak === 1 ? 'Day' : 'Days'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-medium truncate">
                  {isCompletedToday ? '🔥 Active Today' : '⏳ Today Pending'}
                </p>
              </div>
              {isCompletedToday && (
                <span className="absolute top-2 right-2 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-md border border-emerald-200 flex items-center gap-0.5">
                  <CheckCircle2 size={11} /> Saved
                </span>
              )}
            </div>

            {/* 2. Streak Shields Available */}
            <div className="bg-gradient-to-br from-sky-500/10 via-blue-500/5 to-white p-4 rounded-xl border border-sky-200/80 shadow-xs flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-600 to-[#0F2C59] flex items-center justify-center text-white shadow-sm flex-shrink-0">
                <Shield size={24} className="fill-sky-200 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#0F2C59] tracking-tight font-serif">
                      {streakData.shieldsAvailable}
                    </span>
                    <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">
                      / {MAX_SHIELDS} Shields
                    </span>
                  </div>
                </div>
                {/* Visual Shield Slots */}
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: MAX_SHIELDS }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2 flex-1 rounded-full transition-all ${
                        idx < streakData.shieldsAvailable
                          ? 'bg-sky-500 shadow-xs'
                          : 'bg-gray-200'
                      }`}
                      title={idx < streakData.shieldsAvailable ? 'Shield Active' : 'Empty Shield Slot'}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Longest Streak Record */}
            <div className="bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-white p-4 rounded-xl border border-emerald-200/80 shadow-xs flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-sm flex-shrink-0">
                <Trophy size={22} className="text-amber-300" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-serif">
                    {streakData.longestStreak}
                  </span>
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    Days
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-medium truncate">
                  Personal Record
                </p>
              </div>
            </div>
          </div>

          {/* 7-Day Timeline Mini Tracker */}
          <div className="bg-white/80 p-3.5 sm:p-4 rounded-xl border border-gray-200/90 shadow-xs">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar size={14} className="text-gray-500" /> 7-Day Reading Tracker
              </span>
              <span className="text-[11px] text-gray-500 font-medium">
                Next shield in <span className="font-bold text-[#0F2C59]">{nextShieldInDays} {nextShieldInDays === 1 ? 'day' : 'days'}</span>
              </span>
            </div>

            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {recentDays.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all ${
                    item.isToday
                      ? 'ring-2 ring-[#0F2C59] ring-offset-1 border-[#0F2C59] bg-blue-50/50'
                      : 'border-gray-200/80 bg-gray-50/50'
                  }`}
                >
                  <span className="text-[10px] font-semibold text-gray-500 uppercase">{item.dayLabel}</span>
                  <span className="text-xs font-bold text-gray-800 mb-1">{item.dayNumber}</span>
                  
                  {item.status === 'completed' && (
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs" title="Completed">
                      <CheckCircle2 size={12} />
                    </span>
                  )}
                  {item.status === 'shield_used' && (
                    <span className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-xs" title="Protected by Shield">
                      <Shield size={11} className="fill-white" />
                    </span>
                  )}
                  {item.status === 'missed' && (
                    <span className="w-5 h-5 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-[10px] font-bold" title="Missed day">
                      •
                    </span>
                  )}
                  {item.status === 'pending' && (
                    <span className="w-5 h-5 rounded-full border-2 border-dashed border-amber-400 text-amber-500 flex items-center justify-center text-[9px] font-bold" title="Pending today">
                      ⏳
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 mt-3 pt-2.5 border-t border-gray-100 text-[11px] text-gray-500">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Read
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span> Shield Used
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span> Missed
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full border border-dashed border-amber-400 bg-amber-50"></span> Today
              </span>
            </div>
          </div>

          {/* Action Row: Mark Today's Reading Complete */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <div className="text-xs text-gray-600">
              {isCompletedToday ? (
                <p className="font-semibold text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  You have already completed today's Bible reading! Keep the fire burning! 🔥
                </p>
              ) : (
                <p className="text-gray-600 flex items-center gap-1.5">
                  <Flame size={15} className="text-amber-500 fill-amber-400" />
                  Complete today's chapter to extend your streak to{' '}
                  <strong className="text-[#0F2C59]">{streakData.currentStreak + 1} {streakData.currentStreak === 0 ? 'Day' : 'Days'}</strong>!
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleMarkComplete}
              disabled={isMarking}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 ${
                isCompletedToday
                  ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-gradient-to-r from-[#C82323] to-[#A01B1B] hover:from-[#A01B1B] hover:to-[#831414] text-white shadow-amber-500/20'
              }`}
            >
              {isMarking ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving streak...
                </>
              ) : isCompletedToday ? (
                <>
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  Completed for Today ✓
                </>
              ) : (
                <>
                  <Flame size={16} className="fill-amber-300 text-amber-300 animate-pulse" />
                  Mark Today's Reading Complete
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Rules & Milestone Guide Modal */}
      <AnimatePresence>
        {showRulesModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative"
            >
              <button
                onClick={() => setShowRulesModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
              >
                ✕
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                  <Flame size={22} className="fill-amber-500" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#0F2C59] font-serif">How Streaks & Shields Work</h4>
                  <p className="text-xs text-gray-500">Daily habit building for spiritual growth</p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-gray-700 leading-relaxed">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/70 border border-amber-200">
                  <span className="text-base">🔥</span>
                  <div>
                    <strong className="text-gray-900 block font-semibold mb-0.5">Daily Reading Streak</strong>
                    Read and mark your chapter complete every day to increase your streak by +1 day.
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-sky-50/70 border border-sky-200">
                  <span className="text-base">🛡️</span>
                  <div>
                    <strong className="text-gray-900 block font-semibold mb-0.5">Automatic Streak Shields</strong>
                    If you miss a single day, a Streak Shield will automatically protect your streak so you don't lose your hard-earned progress!
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                  <span className="text-base">🌟</span>
                  <div>
                    <strong className="text-gray-900 block font-semibold mb-0.5">Earn More Shields</strong>
                    Every <span className="font-bold text-emerald-800">7 consecutive reading days</span>, you earn +1 new Streak Shield (up to a maximum cap of 3).
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowRulesModal(false)}
                className="mt-5 w-full py-2.5 bg-[#0F2C59] hover:bg-[#1A365D] text-white font-bold rounded-xl text-xs transition-colors"
              >
                Got It, Let's Read!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
