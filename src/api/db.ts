import { collection, query, orderBy, getDocs, doc, setDoc, addDoc, deleteDoc, serverTimestamp, onSnapshot, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase';

// CELL GROUPS

export const fetchCellGroups = async () => {
  if (!db) return [];
  const snapshot = await getDocs(collection(db, 'cell_groups'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const createCellGroup = async (groupData: any) => {
  if (!db) throw new Error("Database not initialized");
  const docRef = await addDoc(collection(db, 'cell_groups'), {
    ...groupData,
    createdAt: serverTimestamp()
  });
  return docRef.id;
};

export const updateCellGroup = async (groupId: string, groupData: any) => {
  if (!db) throw new Error("Database not initialized");
  const groupRef = doc(db, 'cell_groups', groupId);
  await setDoc(groupRef, groupData, { merge: true });
};

export const removeCellGroup = async (groupId: string) => {
  if (!db) throw new Error("Database not initialized");
  await deleteDoc(doc(db, 'cell_groups', groupId));
};

export const updateCellGroupLogs = async (groupId: string, meetingLogs: any, proofPhotoUrl?: string | null, lastProofUploadAt?: string) => {
  if (!db) throw new Error("Database not initialized");
  const groupRef = doc(db, 'cell_groups', groupId);
  const data: any = { meetingLogs };
  if (proofPhotoUrl !== undefined) data.proofPhotoUrl = proofPhotoUrl;
  if (lastProofUploadAt !== undefined) data.lastProofUploadAt = lastProofUploadAt;
  await setDoc(groupRef, data, { merge: true });
};

// LEADER TOOLS

export const fetchLeaderTools = async () => {
  if (!db) return [];
  const q = query(collection(db, 'leader_tools'), orderBy('dateValue', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const createLeaderTool = async (recordData: any) => {
  if (!db) throw new Error("Database not initialized");
  const docRef = await addDoc(collection(db, 'leader_tools'), {
    ...recordData,
    createdAt: serverTimestamp()
  });
  return docRef.id;
};

export const updateLeaderTool = async (recordId: string, recordData: any) => {
  if (!db) throw new Error("Database not initialized");
  const docRef = doc(db, 'leader_tools', recordId);
  await setDoc(docRef, recordData, { merge: true });
};

export const removeLeaderTool = async (recordId: string) => {
  if (!db) throw new Error("Database not initialized");
  await deleteDoc(doc(db, 'leader_tools', recordId));
};

// WEEKLY MEMORY VERSE

export interface MemoryVerseData {
  reference: string;
  text: string;
  translation: string;
  memorizedUserIds: string[];
  updatedBy?: string;
  updatedAt?: any;
}

export const subscribeToMemoryVerse = (callback: (data: MemoryVerseData) => void) => {
  if (!db) return () => {};
  const docRef = doc(db, 'cell_leader_tools', 'weekly_memory_verse');
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      callback({
        reference: data.reference || 'Philippians 4:6-7',
        text: data.text || 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.',
        translation: data.translation || 'NIV',
        memorizedUserIds: Array.isArray(data.memorizedUserIds) ? data.memorizedUserIds : [],
        updatedBy: data.updatedBy,
        updatedAt: data.updatedAt
      });
    } else {
      callback({
        reference: 'Philippians 4:6-7',
        text: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.',
        translation: 'NIV',
        memorizedUserIds: []
      });
    }
  }, (error) => {
    console.error("Error subscribing to memory verse:", error);
  });
};

export const updateMemoryVerse = async (data: Partial<MemoryVerseData>, updatedBy?: string) => {
  if (!db) throw new Error("Database not initialized");
  const docRef = doc(db, 'cell_leader_tools', 'weekly_memory_verse');
  await setDoc(docRef, {
    ...data,
    updatedBy: updatedBy || 'Leader Tools Admin',
    updatedAt: serverTimestamp()
  }, { merge: true });
};

export const toggleMemoryVerseMemorized = async (userId: string, isMemorized: boolean) => {
  if (!db) throw new Error("Database not initialized");
  const docRef = doc(db, 'cell_leader_tools', 'weekly_memory_verse');
  if (isMemorized) {
    await setDoc(docRef, {
      memorizedUserIds: arrayUnion(userId)
    }, { merge: true });
  } else {
    await setDoc(docRef, {
      memorizedUserIds: arrayRemove(userId)
    }, { merge: true });
  }
};

