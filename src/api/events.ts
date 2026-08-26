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

export const fetchRSVPs = async (eventId: string): Promise<RSVP[]> => {
  if (!db) return [];
  const snapshot = await getDocs(collection(db, 'events', eventId, 'rsvps'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as RSVP));
};

export const fetchAllRSVPs = async (events: ChurchEvent[]): Promise<Record<string, RSVP[]>> => {
  const rsvpsByEvent: Record<string, RSVP[]> = {};
  if (!db || !events.length) return rsvpsByEvent;
  
  await Promise.all(
    events.map(async (event) => {
      const rsvps = await fetchRSVPs(event.id);
      rsvpsByEvent[event.id] = rsvps;
    })
  );
  
  return rsvpsByEvent;
};

export const toggleRSVP = async (eventId: string, user: any, isRSVPd: boolean) => {
  if (!db || !user) throw new Error("Database or user not initialized");
  
  const rsvpRef = doc(db, 'events', eventId, 'rsvps', user.uid);
  
  if (isRSVPd) {
    // Cancel RSVP
    await deleteDoc(rsvpRef);
  } else {
    // Add RSVP
    await setDoc(rsvpRef, {
      eventId,
      userId: user.uid,
      userName: user.displayName || 'Unknown User',
      userEmail: user.email || '',
      photoUrl: user.photoURL || '',
      rsvpAt: serverTimestamp()
    });
  }
};
