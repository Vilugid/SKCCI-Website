import { doc, getDoc, setDoc, deleteDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { extractGoogleDriveFileId } from '../utils/googleDrive';
import { ReadingPlanId } from '../types';

export interface BibleVideoRecord {
  dayNumber: number;
  planId?: string;
  videoUrl: string;
  fileId: string;
  embedUrl: string;
  title?: string;
  updatedBy?: string;
  updatedAt?: any;
}

const getStoragePrefix = (planId: 'plan_100' | 'plan_365' = 'plan_365') =>
  planId === 'plan_100' ? 'sk_bible_explainer_video_100_' : 'sk_bible_explainer_video_';

const getDocId = (dayNumber: number, planId: 'plan_100' | 'plan_365' = 'plan_365') =>
  planId === 'plan_100' ? `100_day_${dayNumber}` : String(dayNumber);

/**
 * Fetch explainer video for a specific day of the given plan
 */
export const fetchBibleExplainerVideo = async (
  dayNumber: number,
  planId: 'plan_100' | 'plan_365' = 'plan_365'
): Promise<string | null> => {
  const prefix = getStoragePrefix(planId);
  // Check local cache first for zero-latency & offline resilience
  try {
    const cached = localStorage.getItem(`${prefix}${dayNumber}`);
    if (cached) {
      return cached;
    }
  } catch (e) {
    // ignore local storage error
  }

  if (!db) return null;

  try {
    const docId = getDocId(dayNumber, planId);
    const docRef = doc(db, 'bible_plan_videos', docId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data();
      const url = data.videoUrl || data.embedUrl || null;
      if (url) {
        try {
          localStorage.setItem(`${prefix}${dayNumber}`, url);
        } catch (e) {}
      }
      return url;
    }
  } catch (err: any) {
    console.warn(`Fetch explainer video for ${planId} day ${dayNumber} notice:`, err?.message || err);
  }

  return null;
};

/**
 * Fetch all explainer videos mapped by dayNumber for the given plan
 */
export const fetchAllBibleExplainerVideos = async (
  planId: 'plan_100' | 'plan_365' = 'plan_365'
): Promise<Record<number, string>> => {
  const result: Record<number, string> = {};
  const prefix = getStoragePrefix(planId);
  if (!db) return result;

  try {
    const snap = await getDocs(collection(db, 'bible_plan_videos'));
    snap.forEach((docSnap) => {
      const id = docSnap.id;
      let day: number | null = null;
      if (planId === 'plan_100') {
        if (id.startsWith('100_day_')) {
          day = parseInt(id.replace('100_day_', ''), 10);
        }
      } else {
        if (!id.startsWith('100_day_')) {
          day = parseInt(id, 10);
        }
      }

      if (day !== null && !isNaN(day)) {
        const data = docSnap.data();
        const url = data.videoUrl || data.embedUrl || '';
        if (url) {
          result[day] = url;
          try {
            localStorage.setItem(`${prefix}${day}`, url);
          } catch (e) {}
        }
      }
    });
  } catch (err: any) {
    console.warn(`Fetch all explainer videos for ${planId} notice:`, err?.message || err);
  }

  return result;
};

/**
 * Save or update explainer video for a specific day and plan
 */
export const saveBibleExplainerVideo = async (
  dayNumber: number,
  videoUrl: string,
  adminEmail: string,
  planId: 'plan_100' | 'plan_365' = 'plan_365'
): Promise<void> => {
  const trimmedUrl = videoUrl.trim();
  const fileId = extractGoogleDriveFileId(trimmedUrl) || '';
  const embedUrl = fileId ? `https://drive.google.com/file/d/${fileId}/preview` : trimmedUrl;
  const prefix = getStoragePrefix(planId);
  const docId = getDocId(dayNumber, planId);

  // Update local cache immediately
  try {
    if (trimmedUrl) {
      localStorage.setItem(`${prefix}${dayNumber}`, trimmedUrl);
    } else {
      localStorage.removeItem(`${prefix}${dayNumber}`);
    }
  } catch (e) {}

  if (!db) return;

  const docRef = doc(db, 'bible_plan_videos', docId);

  if (!trimmedUrl) {
    await deleteDoc(docRef);
    return;
  }

  await setDoc(docRef, {
    dayNumber,
    planId,
    videoUrl: trimmedUrl,
    fileId,
    embedUrl,
    updatedBy: adminEmail,
    updatedAt: serverTimestamp()
  }, { merge: true });
};

/**
 * Remove explainer video for a specific day and plan
 */
export const deleteBibleExplainerVideo = async (
  dayNumber: number,
  planId: 'plan_100' | 'plan_365' = 'plan_365'
): Promise<void> => {
  const prefix = getStoragePrefix(planId);
  const docId = getDocId(dayNumber, planId);

  try {
    localStorage.removeItem(`${prefix}${dayNumber}`);
  } catch (e) {}

  if (!db) return;
  const docRef = doc(db, 'bible_plan_videos', docId);
  await deleteDoc(docRef);
};

