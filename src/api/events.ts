import { collection, query, orderBy, getDocs, doc, setDoc, addDoc, deleteDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export interface ChurchEvent {
  id: string;
  title: string;
  description: string;
  dateTime: string;
  location: string;
  capacity: number;
  coverImage: string;
  createdAt?: any;
  isRecurring?: boolean;
  isPast?: boolean;
}

export interface RSVP {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  userEmail: string;
  photoUrl: string;
  rsvpAt?: any;
}

export const fetchEvents = async (): Promise<ChurchEvent[]> => {
  if (!db) return [];
  try {
    const q = query(collection(db, 'events'), orderBy('dateTime', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      const rawCap = data.capacity;
      const capacityNum = typeof rawCap === 'number' ? rawCap : (parseInt(rawCap, 10) || 30);
      return {
        id: doc.id,
        title: data.title || '',
        description: data.description || '',
        dateTime: data.dateTime || '',
        location: data.location || '',
        capacity: capacityNum,
        coverImage: data.coverImage || '',
        createdAt: data.createdAt
      } as ChurchEvent;
    });
  } catch (err) {
    console.error("Error fetching events from Firestore:", err);
    return [];
  }
};

export const createEvent = async (eventData: Partial<ChurchEvent>) => {
  if (!db) throw new Error("Database not initialized");
  const docRef = await addDoc(collection(db, 'events'), {
    ...eventData,
    createdAt: serverTimestamp()
  });
  return docRef.id;
};

export const updateEvent = async (eventId: string, eventData: Partial<ChurchEvent>) => {
  if (!db) throw new Error("Database not initialized");
  const docRef = doc(db, 'events', eventId);
  await setDoc(docRef, eventData, { merge: true });
};

export const removeEvent = async (eventId: string) => {
  if (!db) throw new Error("Database not initialized");
  await deleteDoc(doc(db, 'events', eventId));
};

export interface SundayServiceCardSettings {
  title: string;
  description: string;
  coverImage: string;
  location: string;
  timeSchedule: string;
  onlineLink?: string;
  updatedAt?: any;
}

export interface SundayAttendanceRecord {
  id: string;
  date: string; // YYYY-MM-DD
  count: number;
  notes?: string;
  loggedBy?: string;
  createdAt?: any;
}

export const DEFAULT_SUNDAY_SERVICE_SETTINGS: SundayServiceCardSettings = {
  title: 'Sunday Worship Service',
  description: 'Join us every Sunday for worship, fellowship, and the Word!',
  coverImage: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80',
  location: 'SKCC Hall',
  timeSchedule: 'Every Sunday, 9:30 AM',
  onlineLink: 'https://www.facebook.com/share/g/1BpFgffo67/'
};

export const fetchSundayServiceCard = async (): Promise<SundayServiceCardSettings> => {
  if (!db) return DEFAULT_SUNDAY_SERVICE_SETTINGS;
  try {
    const docRef = doc(db, 'church_settings', 'sunday_service_card');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data();
      return {
        title: data.title || DEFAULT_SUNDAY_SERVICE_SETTINGS.title,
        description: data.description || DEFAULT_SUNDAY_SERVICE_SETTINGS.description,
        coverImage: data.coverImage || DEFAULT_SUNDAY_SERVICE_SETTINGS.coverImage,
        location: data.location || DEFAULT_SUNDAY_SERVICE_SETTINGS.location,
        timeSchedule: data.timeSchedule || DEFAULT_SUNDAY_SERVICE_SETTINGS.timeSchedule,
        onlineLink: data.onlineLink !== undefined ? data.onlineLink : DEFAULT_SUNDAY_SERVICE_SETTINGS.onlineLink,
        updatedAt: data.updatedAt
      };
    }
  } catch (err) {
    console.error("Error fetching Sunday service card settings:", err);
  }
  return DEFAULT_SUNDAY_SERVICE_SETTINGS;
};

export const updateSundayServiceCard = async (settings: Partial<SundayServiceCardSettings>) => {
  if (!db) throw new Error("Database not initialized");
  const docRef = doc(db, 'church_settings', 'sunday_service_card');
  await setDoc(docRef, {
    ...settings,
    updatedAt: serverTimestamp()
  }, { merge: true });
};

export const fetchSundayAttendance = async (): Promise<SundayAttendanceRecord[]> => {
  if (!db) return [];
  try {
    const q = query(collection(db, 'sunday_attendance'), orderBy('date', 'asc'));
    const snap = await getDocs(q);
    return snap.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        date: data.date || '',
        count: typeof data.count === 'number' ? data.count : (parseInt(data.count, 10) || 0),
        notes: data.notes || '',
        loggedBy: data.loggedBy || '',
        createdAt: data.createdAt
      } as SundayAttendanceRecord;
    });
  } catch (err) {
    console.error("Error fetching Sunday attendance logs:", err);
    return [];
  }
};

export const logSundayAttendance = async (record: { date: string; count: number; notes?: string; loggedBy?: string }) => {
  if (!db) throw new Error("Database not initialized");
  const docRef = await addDoc(collection(db, 'sunday_attendance'), {
    ...record,
    count: Number(record.count),
    createdAt: serverTimestamp()
  });
  return docRef.id;
};

export const updateSundayAttendance = async (id: string, record: Partial<SundayAttendanceRecord>) => {
  if (!db) throw new Error("Database not initialized");
  const docRef = doc(db, 'sunday_attendance', id);
  await setDoc(docRef, {
    ...record,
    count: record.count !== undefined ? Number(record.count) : undefined,
    updatedAt: serverTimestamp()
  }, { merge: true });
};

export const deleteSundayAttendance = async (id: string) => {
  if (!db) throw new Error("Database not initialized");
  await deleteDoc(doc(db, 'sunday_attendance', id));
};

export const fetchRSVPs = async (eventId: string): Promise<RSVP[]> => {
  if (!db) return [];
  try {
    const snapshot = await getDocs(collection(db, 'events', eventId, 'rsvps'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as RSVP));
  } catch (err) {
    console.error(`Error fetching RSVPs for ${eventId}:`, err);
    return [];
  }
};

export const fetchAllRSVPs = async (events: ChurchEvent[]): Promise<Record<string, RSVP[]>> => {
  const rsvpsByEvent: Record<string, RSVP[]> = {};
  if (!db) return rsvpsByEvent;
  
  // Ensure recurring sunday service and all event ids are fetched
  const eventIds = Array.from(new Set(['recurring_sunday_service', ...events.map(e => e.id)]));
  
  await Promise.all(
    eventIds.map(async (eventId) => {
      const rsvps = await fetchRSVPs(eventId);
      rsvpsByEvent[eventId] = rsvps;
    })
  );
  
  return rsvpsByEvent;
};

export const toggleRSVP = async (eventId: string, user: any, isRSVPd: boolean) => {
  if (!db || !user) throw new Error("Database or user not initialized");
  
  const rsvpRef = doc(db, 'events', eventId, 'rsvps', user.uid);
  const localKey = `skcc_rsvp_${eventId}_${user.uid}`;
  
  if (isRSVPd) {
    // Cancel RSVP
    try {
      localStorage.removeItem(localKey);
    } catch (e) {}
    await deleteDoc(rsvpRef);
  } else {
    // Add RSVP
    try {
      localStorage.setItem(localKey, 'true');
    } catch (e) {}
    await setDoc(rsvpRef, {
      eventId,
      userId: user.uid,
      userName: user.displayName || user.email?.split('@')[0] || 'SKCC Member',
      userEmail: user.email || '',
      photoUrl: user.photoURL || '',
      rsvpAt: serverTimestamp()
    });
  }
};
