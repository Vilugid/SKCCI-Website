import { collection, query, orderBy, getDocs, doc, setDoc, addDoc, deleteDoc, serverTimestamp, increment, onSnapshot } from 'firebase/firestore';
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
  const q = query(collection(db, 'prayer_requests'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PrayerRequest));
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

export const logPrayerAction = async (userId: string, prayerItemId: string, week: string, month: string, isPrayed: boolean) => {
  if (!db) throw new Error("Database not initialized");
  const logId = `${userId}_${prayerItemId}_${week}`;
  const logRef = doc(db, 'prayer_logs', logId);
  
  if (isPrayed) {
    await setDoc(logRef, {
      userId,
      prayerItemId,
      week,
      month,
      timestamp: serverTimestamp()
    });
  } else {
    await deleteDoc(logRef);
  }
};

export const subscribeToPrayerLogs = (callback: (logs: PrayerLog[]) => void) => {
  if (!db) return () => {};
  return onSnapshot(collection(db, 'prayer_logs'), (snapshot) => {
    const logs: PrayerLog[] = [];
    snapshot.forEach(doc => {
      logs.push({ id: doc.id, ...doc.data() } as PrayerLog);
    });
    callback(logs);
  });
};

export const subscribeToCounters = (callback: (counters: Record<string, number>) => void) => {
  if (!db) return () => {};
  
  return onSnapshot(collection(db, 'prayer_counters'), (snapshot) => {
    const counters: Record<string, number> = {};
    snapshot.forEach(doc => {
      counters[doc.id] = doc.data().count || 0;
    });
    callback(counters);
  });
};
