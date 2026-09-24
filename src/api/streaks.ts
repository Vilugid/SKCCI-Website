import { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { ReadingPlanId, UserReadingStreak, StreakHistoryItem } from '../types';

export const MAX_SHIELDS = 3;
export const SHIELD_REWARD_DAYS = 7;

export const getLocalDateString = (d: Date = new Date()): string => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getDayDifference = (dateStr1: string, dateStr2: string): number => {
  // difference = dateStr1 - dateStr2 in days
  const [y1, m1, d1] = dateStr1.split('-').map(Number);
  const [y2, m2, d2] = dateStr2.split('-').map(Number);
  const utc1 = Date.UTC(y1, m1 - 1, d1);
  const utc2 = Date.UTC(y2, m2 - 1, d2);
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((utc1 - utc2) / msPerDay);
};

export const addDaysToDateString = (dateStr: string, days: number): string => {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  date.setUTCDate(date.getUTCDate() + days);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getDefaultStreak = (userId: string, planId: ReadingPlanId): UserReadingStreak => ({
  userId,
  planId,
  currentStreak: 0,
  longestStreak: 0,
  shieldsAvailable: 1, // starts at 1
  lastCompletedDate: null,
  completedDays: [],
  history: []
});

export const getStreakDocId = (userId: string, planId: ReadingPlanId): string => {
  return `${userId}_${planId}`;
};

export interface ReconcileResult {
  reconciledStreak: UserReadingStreak;
  hasChanges: boolean;
  shieldedDates: string[];
  missedDates: string[];
}

/**
 * Automatically inspects the streak for any past unrecorded days between
 * lastCompletedDate and todayStr. If days were missed and the user has shields,
 * shields are automatically consumed to protect the streak and maintain continuity!
 */
export const reconcileUserStreak = (
  streak: UserReadingStreak,
  todayStr: string = getLocalDateString(new Date())
): ReconcileResult => {
  if (!streak.lastCompletedDate || streak.currentStreak <= 0) {
    return {
      reconciledStreak: streak,
      hasChanges: false,
      shieldedDates: [],
      missedDates: []
    };
  }

  const prevLastDate = streak.lastCompletedDate;
  const diffDays = getDayDifference(todayStr, prevLastDate);

  // If completed today (0) or completed yesterday (1), no past days were missed!
  if (diffDays <= 1) {
    return {
      reconciledStreak: streak,
      hasChanges: false,
      shieldedDates: [],
      missedDates: []
    };
  }

  // Days strictly between prevLastDate and todayStr are past missed days
  // (todayStr itself is NOT evaluated as missed because today is still in progress)
  let currentStreak = streak.currentStreak;
  let shieldsAvailable = Math.min(MAX_SHIELDS, Math.max(0, streak.shieldsAvailable ?? 1));
  const history = Array.isArray(streak.history) ? [...streak.history] : [];
  let lastEffectiveDate = prevLastDate;
  let hasChanges = false;
  const shieldedDates: string[] = [];
  const missedDates: string[] = [];
  let streakAlive = currentStreak > 0;

  for (let offset = 1; offset < diffDays; offset++) {
    const missedDate = addDaysToDateString(prevLastDate, offset);
    const existingIndex = history.findIndex(h => h.date === missedDate);
    const existing = existingIndex >= 0 ? history[existingIndex] : null;

    if (existing) {
      if (existing.status === 'shield_used' || existing.status === 'completed') {
        lastEffectiveDate = missedDate;
      } else if (existing.status === 'missed') {
        streakAlive = false;
      }
      continue;
    }

    // Unrecorded past day!
    if (streakAlive && shieldsAvailable > 0) {
      // Automatic Streak Shield triggers!
      shieldsAvailable -= 1;
      history.push({ date: missedDate, status: 'shield_used' });
      shieldedDates.push(missedDate);
      lastEffectiveDate = missedDate;
      hasChanges = true;
    } else {
      // No shields remaining -> streak is broken
      history.push({ date: missedDate, status: 'missed' });
      missedDates.push(missedDate);
      streakAlive = false;
      hasChanges = true;
    }
  }

  if (!streakAlive) {
    currentStreak = 0;
  }

  history.sort((a, b) => a.date.localeCompare(b.date));

  const reconciledStreak: UserReadingStreak = {
    ...streak,
    currentStreak,
    shieldsAvailable,
    lastCompletedDate: lastEffectiveDate,
    history: history.slice(-60),
    updatedAt: new Date().toISOString()
  };

  return {
    reconciledStreak,
    hasChanges,
    shieldedDates,
    missedDates
  };
};

/**
 * Subscribe in real time to the user's reading streak for a given plan
 */
export const subscribeToUserStreak = (
  userId: string,
  planId: ReadingPlanId,
  callback: (streak: UserReadingStreak, meta?: { shieldedDates: string[] }) => void
) => {
  if (!db || !userId) {
    callback(getDefaultStreak(userId || 'anonymous', planId));
    return () => {};
  }

  const docId = getStreakDocId(userId, planId);
  const docRef = doc(db, 'user_reading_streaks', docId);

  return onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        const rawStreak: UserReadingStreak = {
          userId: data.userId || userId,
          planId: data.planId || planId,
          currentStreak: typeof data.currentStreak === 'number' ? data.currentStreak : 0,
          longestStreak: typeof data.longestStreak === 'number' ? data.longestStreak : 0,
          shieldsAvailable: typeof data.shieldsAvailable === 'number' ? Math.min(MAX_SHIELDS, Math.max(0, data.shieldsAvailable)) : 1,
          lastCompletedDate: data.lastCompletedDate || null,
          completedDays: Array.isArray(data.completedDays) ? data.completedDays : [],
          history: Array.isArray(data.history) ? data.history : [],
          updatedAt: data.updatedAt
        };

        // Reconcile missed days automatically using shields
        const todayStr = getLocalDateString(new Date());
        const { reconciledStreak, hasChanges, shieldedDates } = reconcileUserStreak(rawStreak, todayStr);

        callback(reconciledStreak, { shieldedDates });

        // If shields were consumed or days were reconciled, asynchronously persist to Firestore
        if (hasChanges && db && userId && userId !== 'anonymous' && userId !== 'guest') {
          setDoc(docRef, {
            ...reconciledStreak,
            updatedAt: serverTimestamp()
          }, { merge: true }).catch(err => {
            console.error("Error auto-persisting reconciled streak:", err);
          });
        }
      } else {
        // Document does not exist yet; return default initialized streak
        callback(getDefaultStreak(userId, planId));
      }
    },
    (error) => {
      console.error(`Error listening to reading streak (${planId}):`, error);
      callback(getDefaultStreak(userId, planId));
    }
  );
};

export interface MarkCompleteResult {
  success: boolean;
  alertMessage: string;
  isAlreadyCompletedToday: boolean;
  isShieldUsed: boolean;
  isNewShieldAwarded: boolean;
  isStreakReset: boolean;
  newStreak: number;
  updatedData: UserReadingStreak;
}

/**
 * Execute streak & shield business logic and persist to Firestore
 */
export const recordReadingCompletion = async (
  userId: string,
  planId: ReadingPlanId,
  currentStreakState: UserReadingStreak,
  dayNumber?: number
): Promise<MarkCompleteResult> => {
  if (!userId) {
    throw new Error('User must be authenticated to record reading streak.');
  }

  const todayStr = getLocalDateString(new Date());
  
  // 1. Reconcile any past missed days first using shields so state is clean
  const { reconciledStreak, shieldedDates } = reconcileUserStreak(currentStreakState, todayStr);
  const prevLastDate = reconciledStreak.lastCompletedDate;
  let currentStreak = reconciledStreak.currentStreak || 0;
  let longestStreak = reconciledStreak.longestStreak || 0;
  let shieldsAvailable = typeof reconciledStreak.shieldsAvailable === 'number' ? reconciledStreak.shieldsAvailable : 1;
  const completedDays = Array.isArray(reconciledStreak.completedDays) ? [...reconciledStreak.completedDays] : [];
  const history: StreakHistoryItem[] = Array.isArray(reconciledStreak.history) ? [...reconciledStreak.history] : [];

  let alertMessage = '';
  let isAlreadyCompletedToday = false;
  let isShieldUsed = shieldedDates.length > 0;
  let isNewShieldAwarded = false;
  let isStreakReset = false;

  // Add day number to completedDays if provided and not already present
  if (typeof dayNumber === 'number' && !completedDays.includes(dayNumber)) {
    completedDays.push(dayNumber);
  }

  if (!prevLastDate || currentStreak === 0) {
    // 1. Brand new streak start or restart
    currentStreak = 1;
    longestStreak = Math.max(1, longestStreak);
    history.push({ date: todayStr, status: 'completed', dayNumber });
    alertMessage = "🔥 Reading completed! You've started a 1-day streak!";
  } else {
    const diffDays = getDayDifference(todayStr, prevLastDate);

    if (diffDays === 0) {
      // Same day reading
      isAlreadyCompletedToday = true;
      alertMessage = "Completed for today! 🔥 Keep your streak burning!";
    } else if (diffDays === 1) {
      // Consecutive day (+1 streak)
      currentStreak += 1;
      longestStreak = Math.max(currentStreak, longestStreak);
      history.push({ date: todayStr, status: 'completed', dayNumber });
      
      if (isShieldUsed) {
        alertMessage = `🛡️ Streak Shield Saved Your Streak! Continued to ${currentStreak} Days 🔥!`;
      } else {
        alertMessage = `🔥 Streak on fire! ${currentStreak} Days completed!`;
      }

      // Shield Reward: Award +1 streak shield for every 7 consecutive reading days
      if (currentStreak > 0 && currentStreak % SHIELD_REWARD_DAYS === 0) {
        if (shieldsAvailable < MAX_SHIELDS) {
          shieldsAvailable += 1;
          isNewShieldAwarded = true;
          alertMessage += ` 🛡️ Milestone reached! You earned +1 Streak Shield! (${shieldsAvailable}/${MAX_SHIELDS})`;
        }
      }
    } else {
      // Missed days after reconciliation (meaning no shields were left)
      isStreakReset = true;
      currentStreak = 1;
      history.push({ date: todayStr, status: 'completed', dayNumber });
      alertMessage = "Streak reset to 1 day. Welcome back to God's Word! 📖";
    }
  }

  history.sort((a, b) => a.date.localeCompare(b.date));

  const updatedData: UserReadingStreak = {
    userId,
    planId,
    currentStreak,
    longestStreak,
    shieldsAvailable: Math.min(MAX_SHIELDS, Math.max(0, shieldsAvailable)),
    lastCompletedDate: todayStr,
    completedDays,
    history: history.slice(-60), // keep the latest 60 entries to keep doc lightweight
    updatedAt: new Date().toISOString()
  };

  // Persist to Firestore
  if (db) {
    const docId = getStreakDocId(userId, planId);
    const docRef = doc(db, 'user_reading_streaks', docId);
    await setDoc(docRef, {
      ...updatedData,
      updatedAt: serverTimestamp()
    }, { merge: true });
  }

  return {
    success: true,
    alertMessage,
    isAlreadyCompletedToday,
    isShieldUsed,
    isNewShieldAwarded,
    isStreakReset,
    newStreak: currentStreak,
    updatedData
  };
};
