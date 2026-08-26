import { collection, query, orderBy, getDocs, doc, setDoc, addDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
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
