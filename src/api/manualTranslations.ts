import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { LessonData } from '../lessonsData';
import { sanitizeData } from './db';
import { formatLessonDivineWords } from '../utils/textFormatter';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const currentUser = auth?.currentUser;
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentUser?.uid ?? null,
      email: currentUser?.email ?? null,
      emailVerified: currentUser?.emailVerified ?? null,
      isAnonymous: currentUser?.isAnonymous ?? null,
      tenantId: currentUser?.tenantId ?? null,
      providerInfo:
        currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export type TranslationSource = 'official' | 'ai';

export interface StoredManualTranslation extends LessonData {
  source: TranslationSource;
  updatedBy: string;
  updatedByUid: string;
  updatedAt?: any;
}

const COLLECTION_PATH = 'manual_translations_fil';
const VALID_CATEGORIES = new Set(['Evangelism', 'Consolidation', 'Envisioning']);

function clampStr(val: unknown, maxLen: number): string {
  return String(val ?? '').trim().slice(0, maxLen);
}

/**
 * Fetches all permanently saved Tagalog manual translations from Firestore.
 */
export async function fetchAllFirestoreTagalogLessons(): Promise<Record<string, StoredManualTranslation>> {
  if (!db) return {};
  try {
    const snap = await getDocs(collection(db, COLLECTION_PATH));
    const map: Record<string, StoredManualTranslation> = {};
    snap.forEach((docSnap) => {
      const data = docSnap.data() as any;
      if (data && typeof data.title === 'string' && Array.isArray(data.teachingSections)) {
        const formatted = formatLessonDivineWords({
          id: docSnap.id,
          title: data.title,
          category: data.category,
          readingTime: data.readingTime || '',
          scriptureFocus: {
            reference: data.scriptureFocus?.reference || '',
            text: data.scriptureFocus?.text || '',
          },
          objectives: Array.isArray(data.objectives) ? data.objectives : [],
          teachingSections: Array.isArray(data.teachingSections) ? data.teachingSections : [],
          reflectionQuestions: Array.isArray(data.reflectionQuestions) ? data.reflectionQuestions : [],
          prayer: data.prayer || '',
          challenge: data.challenge || '',
        });
        map[docSnap.id] = {
          ...formatted,
          source: data.source === 'official' ? 'official' : 'ai',
          updatedBy: data.updatedBy || '',
          updatedByUid: data.updatedByUid || '',
          updatedAt: data.updatedAt ?? null,
        };
      }
    });
    return map;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, COLLECTION_PATH);
  }
}

/**
 * Fetches a single permanently saved Tagalog manual translation from Firestore.
 */
export async function fetchFirestoreTagalogLesson(
  lessonId: string
): Promise<StoredManualTranslation | null> {
  if (!db) return null;
  const docPath = `${COLLECTION_PATH}/${lessonId}`;
  try {
    const snap = await getDoc(doc(db, COLLECTION_PATH, lessonId));
    if (!snap.exists()) return null;
    const data = snap.data() as any;
    const formatted = formatLessonDivineWords({
      id: snap.id,
      title: data.title,
      category: data.category,
      readingTime: data.readingTime || '',
      scriptureFocus: {
        reference: data.scriptureFocus?.reference || '',
        text: data.scriptureFocus?.text || '',
      },
      objectives: Array.isArray(data.objectives) ? data.objectives : [],
      teachingSections: Array.isArray(data.teachingSections) ? data.teachingSections : [],
      reflectionQuestions: Array.isArray(data.reflectionQuestions) ? data.reflectionQuestions : [],
      prayer: data.prayer || '',
      challenge: data.challenge || '',
    });
    return {
      ...formatted,
      source: data.source === 'official' ? 'official' : 'ai',
      updatedBy: data.updatedBy || '',
      updatedByUid: data.updatedByUid || '',
      updatedAt: data.updatedAt ?? null,
    };
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, docPath);
  }
}

/**
 * Saves a verified/official or AI-generated Tagalog manual lesson permanently to Firestore.
 * Enforces all blueprint field boundaries and strips undefined values before writing.
 */
export async function saveFirestoreTagalogLesson(
  lesson: LessonData,
  source: TranslationSource,
  user: { uid: string; email?: string | null; displayName?: string | null }
): Promise<StoredManualTranslation> {
  if (!db) {
    throw new Error('Firestore database is not initialized.');
  }
  if (!user?.uid) {
    throw new Error('Please sign in with an authorized admin account to save to Firestore.');
  }

  lesson = formatLessonDivineWords(lesson);
  const safeId = clampStr(lesson.id, 100);
  if (!/^[a-zA-Z0-9_-]+$/.test(safeId)) {
    throw new Error(`Invalid lesson ID: ${safeId}`);
  }

  const safeCategory = VALID_CATEGORIES.has(lesson.category) ? lesson.category : 'Evangelism';
  const safeTeachingSections = (lesson.teachingSections || []).slice(0, 30).map((sec, idx) => ({
    id: clampStr(sec.id || `sec-${idx}`, 100),
    number: typeof sec.number === 'number' ? sec.number : idx + 1,
    title: clampStr(sec.title || `Seksyon ${idx + 1}`, 300),
    paragraphs: (sec.paragraphs || []).slice(0, 40).map((p) => clampStr(p, 5000)).filter(Boolean),
  }));

  if (safeTeachingSections.length === 0) {
    throw new Error('Lesson must include at least one teaching section.');
  }

  const basePayload = sanitizeData({
    id: safeId,
    title: clampStr(lesson.title, 300) || safeId,
    category: safeCategory,
    readingTime: clampStr(lesson.readingTime || '5 min na babasahin', 60),
    scriptureFocus: {
      reference: clampStr(lesson.scriptureFocus?.reference, 200),
      text: clampStr(lesson.scriptureFocus?.text, 3000),
    },
    objectives: (lesson.objectives || []).slice(0, 20).map((o) => clampStr(o, 1000)).filter(Boolean),
    teachingSections: safeTeachingSections,
    reflectionQuestions: (lesson.reflectionQuestions || [])
      .slice(0, 20)
      .map((q) => clampStr(q, 1000))
      .filter(Boolean),
    prayer: clampStr(lesson.prayer, 4000),
    challenge: clampStr(lesson.challenge, 4000),
    source: source === 'official' ? 'official' : 'ai',
    updatedBy: clampStr(user.email || user.displayName || 'Admin', 200),
    updatedByUid: clampStr(user.uid, 128),
  });

  const docPath = `${COLLECTION_PATH}/${safeId}`;
  try {
    await setDoc(doc(db, COLLECTION_PATH, safeId), {
      ...basePayload,
      updatedAt: serverTimestamp(),
    });

    return {
      ...basePayload,
      updatedAt: new Date().toISOString(),
    } as StoredManualTranslation;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }
}

/**
 * Deletes a saved Tagalog translation from Firestore.
 */
export async function deleteFirestoreTagalogLesson(lessonId: string): Promise<void> {
  if (!db) throw new Error('Firestore database is not initialized.');
  const docPath = `${COLLECTION_PATH}/${lessonId}`;
  try {
    await deleteDoc(doc(db, COLLECTION_PATH, lessonId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, docPath);
  }
}

/**
 * Deletes all legacy Tagalog manual translation documents from Firestore (`manual_translations_fil`)
 * now that all 29 lessons are bundled directly in the app.
 */
export async function purgeAllFirestoreTagalogLessons(): Promise<string[]> {
  if (!db) return [];
  try {
    const snap = await getDocs(collection(db, COLLECTION_PATH));
    if (snap.empty) return [];

    const deletedIds: string[] = [];
    for (const docSnap of snap.docs) {
      const docPath = `${COLLECTION_PATH}/${docSnap.id}`;
      try {
        await deleteDoc(doc(db, COLLECTION_PATH, docSnap.id));
        deletedIds.push(docSnap.id);
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, docPath);
      }
    }
    return deletedIds;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, COLLECTION_PATH);
  }
}

