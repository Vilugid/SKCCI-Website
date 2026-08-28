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

/**
 * Subscribe in real time to the user's reading streak for a given plan
 */
export const subscribeToUserStreak = (
  userId: string,
  planId: ReadingPlanId,
  callback: (streak: UserReadingStreak) => void
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
        callback({
          userId: data.userId || userId,
          planId: data.planId || planId,
          currentStreak: typeof data.currentStreak === 'number' ? data.currentStreak : 0,
          longestStreak: typeof data.longestStreak === 'number' ? data.longestStreak : 0,
          shieldsAvailable: typeof data.shieldsAvailable === 'number' ? Math.min(MAX_SHIELDS, Math.max(0, data.shieldsAvailable)) : 1,
          lastCompletedDate: data.lastCompletedDate || null,
          completedDays: Array.isArray(data.completedDays) ? data.completedDays : [],
          history: Array.isArray(data.history) ? data.history : [],
          updatedAt: data.updatedAt
        });
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
  const prevLastDate = currentStreakState.lastCompletedDate;
  let currentStreak = currentStreakState.currentStreak || 0;
  let longestStreak = currentStreakState.longestStreak || 0;
  let shieldsAvailable = typeof currentStreakState.shieldsAvailable === 'number' ? currentStreakState.shieldsAvailable : 1;
  const completedDays = Array.isArray(currentStreakState.completedDays) ? [...currentStreakState.completedDays] : [];
  const history: StreakHistoryItem[] = Array.isArray(currentStreakState.history) ? [...currentStreakState.history] : [];

  let alertMessage = '';
  let isAlreadyCompletedToday = false;
  let isShieldUsed = false;
  let isNewShieldAwarded = false;
  let isStreakReset = false;

  // Add day number to completedDays if provided and not already present
  if (typeof dayNumber === 'number' && !completedDays.includes(dayNumber)) {
    completedDays.push(dayNumber);
  }

  if (!prevLastDate) {
    // 1. Brand new streak start
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
      alertMessage = `🔥 Streak on fire! ${currentStreak} Days completed!`;

      // Shield Reward: Award +1 streak shield for every 7 consecutive reading days
      if (currentStreak > 0 && currentStreak % SHIELD_REWARD_DAYS === 0) {
        if (shieldsAvailable < MAX_SHIELDS) {
          shieldsAvailable += 1;
          isNewShieldAwarded = true;
          alertMessage += ` 🛡️ Milestone reached! You earned +1 Streak Shield! (${shieldsAvailable}/${MAX_SHIELDS})`;
        }
      }
    } else if (diffDays === 2) {
      // Missed exactly 1 day (yesterday)
      if (shieldsAvailable > 0) {
        // Shield used!
        shieldsAvailable -= 1;
        isShieldUsed = true;
        
        // Record yesterday as shield_used and today as completed
        const yesterdayStr = getLocalDateString(new Date(Date.now() - 86400000));
        history.push({ date: yesterdayStr, status: 'shield_used' });
        
        // Streak is preserved and continued
        currentStreak += 1;
        longestStreak = Math.max(currentStreak, longestStreak);
        history.push({ date: todayStr, status: 'completed', dayNumber });
        alertMessage = `🛡️ Streak Shield Saved Your Streak! (Streak: ${currentStreak} Days 🔥, ${shieldsAvailable} shields left)`;

        // Check shield reward milestone
        if (currentStreak > 0 && currentStreak % SHIELD_REWARD_DAYS === 0 && shieldsAvailable < MAX_SHIELDS) {
          shieldsAvailable += 1;
          isNewShieldAwarded = true;
        }
      } else {
        // No shield available -> reset
        isStreakReset = true;
        currentStreak = 1;
        const yesterdayStr = getLocalDateString(new Date(Date.now() - 86400000));
        history.push({ date: yesterdayStr, status: 'missed' });
        history.push({ date: todayStr, status: 'completed', dayNumber });
        alertMessage = "Streak reset to 1 day. Keep your momentum going! 📖";
      }
    } else {
      // Missed more than 1 day -> reset to 1
      isStreakReset = true;
      currentStreak = 1;
      history.push({ date: todayStr, status: 'completed', dayNumber });
      alertMessage = "Streak reset to 1 day. Welcome back to God's Word! 📖";
    }
  }

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
