import { collection, query, orderBy, getDocs, doc, setDoc, addDoc, deleteDoc, serverTimestamp, increment, onSnapshot, writeBatch } from 'firebase/firestore';
import { db } from '../firebase';

export interface PrayerRequest {
  id: string;
  name: string;
  category: string;
  details: string;
  status: 'pending' | 'prayed';
  createdAt?: any;
}

export const submitPrayerRequest = async (requestData: Omit<PrayerRequest, 'id' | 'status' | 'createdAt'>) => {
  if (!db) throw new Error("Database not initialized");
  const docRef = await addDoc(collection(db, 'prayer_requests'), {
    ...requestData,
    status: 'pending',
    createdAt: serverTimestamp()
  });
  return docRef.id;
};

export const fetchPrayerRequests = async (): Promise<PrayerRequest[]> => {
  if (!db) return [];
  try {
    const q = query(collection(db, 'prayer_requests'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PrayerRequest));
  } catch (err) {
    console.warn("fetchPrayerRequests fallback:", err);
    return [];
  }
};

export const updatePrayerStatus = async (requestId: string, status: 'pending' | 'prayed') => {
  if (!db) throw new Error("Database not initialized");
  await setDoc(doc(db, 'prayer_requests', requestId), { status }, { merge: true });
};

export const deletePrayerRequest = async (requestId: string) => {
  if (!db) throw new Error("Database not initialized");
  await deleteDoc(doc(db, 'prayer_requests', requestId));
};

export const updatePrayerCounter = async (counterId: string, isIncrement: boolean) => {
  if (!db) throw new Error("Database not initialized");
  const counterRef = doc(db, 'prayer_counters', counterId);
  await setDoc(counterRef, {
    count: increment(isIncrement ? 1 : -1)
  }, { merge: true });
};

export interface PrayerLog {
  id: string;
  userId: string;
  prayerItemId: string;
  week: string;
  month: string;
  timestamp?: any;
}

// Batching & Debouncing Queue for Prayer Logs
interface PendingPrayerAction {
  userId: string;
  prayerItemId: string;
  week: string;
  month: string;
  isPrayed: boolean;
}

const pendingPrayerQueue: Map<string, PendingPrayerAction> = new Map();
let prayerFlushTimer: any = null;

export const flushPrayerActions = async () => {
  if (!db || pendingPrayerQueue.size === 0) return;
  const actionsToFlush = Array.from(pendingPrayerQueue.values());
  pendingPrayerQueue.clear();

  try {
    const batch = writeBatch(db);
    for (const action of actionsToFlush) {
      const logId = `${action.userId}_${action.prayerItemId}_${action.week}`;
      const logRef = doc(db, 'prayer_logs', logId);
      if (action.isPrayed) {
        batch.set(logRef, {
          userId: action.userId,
          prayerItemId: action.prayerItemId,
          week: action.week,
          month: action.month,
          timestamp: serverTimestamp()
        }, { merge: true });
      } else {
        batch.delete(logRef);
      }
    }
    await batch.commit();
  } catch (error: any) {
    console.warn("Batch prayer sync warning (using local optimistic state):", error?.message || error);
  }
};

export const logPrayerAction = async (userId: string, prayerItemId: string, week: string, month: string, isPrayed: boolean) => {
  const queueKey = `${userId}_${prayerItemId}_${week}`;
  pendingPrayerQueue.set(queueKey, { userId, prayerItemId, week, month, isPrayed });

  // Save to local device cache immediately
  try {
    const localKey = `sk_prayer_checked_${userId}_${week}`;
    const raw = localStorage.getItem(localKey);
    const checkedMap = raw ? JSON.parse(raw) : {};
    if (isPrayed) {
      checkedMap[prayerItemId] = true;
    } else {
      delete checkedMap[prayerItemId];
    }
    localStorage.setItem(localKey, JSON.stringify(checkedMap));
  } catch (e) {
    // ignore localStorage quota errors
  }

  // Debounce Firestore write by 700ms to batch rapid successive clicks into one atomic batch
  if (prayerFlushTimer) clearTimeout(prayerFlushTimer);
  prayerFlushTimer = setTimeout(() => {
    flushPrayerActions();
  }, 700);
};

export const subscribeToPrayerLogs = (callback: (logs: PrayerLog[]) => void) => {
  if (!db) return () => {};
  return onSnapshot(
    collection(db, 'prayer_logs'), 
    (snapshot) => {
      const logs: PrayerLog[] = [];
      snapshot.forEach(doc => {
        logs.push({ id: doc.id, ...doc.data() } as PrayerLog);
      });
      callback(logs);
    },
    (error) => {
      console.warn("Prayer logs subscription notice (reading local cache):", error?.message || error);
    }
  );
};

export const subscribeToCounters = (callback: (counters: Record<string, number>) => void) => {
  if (!db) return () => {};
  
  return onSnapshot(
    collection(db, 'prayer_counters'), 
    (snapshot) => {
      const counters: Record<string, number> = {};
      snapshot.forEach(doc => {
        counters[doc.id] = doc.data().count || 0;
      });
      callback(counters);
    },
    (error) => {
      console.warn("Prayer counters subscription notice (reading local cache):", error?.message || error);
    }
  );
};

