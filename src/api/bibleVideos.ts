import { doc, getDoc, setDoc, deleteDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { extractGoogleDriveFileId } from '../utils/googleDrive';

export interface BibleVideoRecord {
  dayNumber: number;
  videoUrl: string;
  fileId: string;
  embedUrl: string;
  title?: string;
  updatedBy?: string;
  updatedAt?: any;
}

const LOCAL_STORAGE_PREFIX = 'sk_bible_explainer_video_';

/**
 * Fetch explainer video for a specific day of the 365-day plan
 */
export const fetchBibleExplainerVideo = async (dayNumber: number): Promise<string | null> => {
  // Check local cache first for zero-latency & offline resilience
  try {
    const cached = localStorage.getItem(`${LOCAL_STORAGE_PREFIX}${dayNumber}`);
    if (cached) {
      return cached;
    }
  } catch (e) {
    // ignore local storage error
  }

  if (!db) return null;

  try {
    const docRef = doc(db, 'bible_plan_videos', String(dayNumber));
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data();
      const url = data.videoUrl || data.embedUrl || null;
      if (url) {
        try {
          localStorage.setItem(`${LOCAL_STORAGE_PREFIX}${dayNumber}`, url);
        } catch (e) {}
      }
      return url;
    }
  } catch (err: any) {
    console.warn(`Fetch explainer video for day ${dayNumber} notice:`, err?.message || err);
  }

  return null;
};

/**
 * Fetch all explainer videos mapped by dayNumber
 */
export const fetchAllBibleExplainerVideos = async (): Promise<Record<number, string>> => {
  const result: Record<number, string> = {};
  if (!db) return result;

  try {
    const snap = await getDocs(collection(db, 'bible_plan_videos'));
    snap.forEach((docSnap) => {
      const day = parseInt(docSnap.id, 10);
      const data = docSnap.data();
      const url = data.videoUrl || data.embedUrl || '';
      if (!isNaN(day) && url) {
        result[day] = url;
        try {
          localStorage.setItem(`${LOCAL_STORAGE_PREFIX}${day}`, url);
        } catch (e) {}
      }
    });
  } catch (err: any) {
    console.warn("Fetch all explainer videos notice:", err?.message || err);
  }

  return result;
};

/**
 * Save or update explainer video for a specific day
 */
export const saveBibleExplainerVideo = async (
  dayNumber: number,
  videoUrl: string,
  adminEmail: string
): Promise<void> => {
  const trimmedUrl = videoUrl.trim();
  const fileId = extractGoogleDriveFileId(trimmedUrl) || '';
  const embedUrl = fileId ? `https://drive.google.com/file/d/${fileId}/preview` : trimmedUrl;

  // Update local cache immediately
  try {
    if (trimmedUrl) {
      localStorage.setItem(`${LOCAL_STORAGE_PREFIX}${dayNumber}`, trimmedUrl);
    } else {
      localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}${dayNumber}`);
    }
  } catch (e) {}

  if (!db) return;

  const docRef = doc(db, 'bible_plan_videos', String(dayNumber));

  if (!trimmedUrl) {
    await deleteDoc(docRef);
    return;
  }

  await setDoc(docRef, {
    dayNumber,
    videoUrl: trimmedUrl,
    fileId,
    embedUrl,
    updatedBy: adminEmail,
    updatedAt: serverTimestamp()
  }, { merge: true });
};

/**
 * Remove explainer video for a specific day
 */
export const deleteBibleExplainerVideo = async (dayNumber: number): Promise<void> => {
  try {
    localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}${dayNumber}`);
  } catch (e) {}

  if (!db) return;
  const docRef = doc(db, 'bible_plan_videos', String(dayNumber));
  await deleteDoc(docRef);
};
