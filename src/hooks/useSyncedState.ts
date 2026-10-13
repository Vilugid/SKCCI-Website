import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

export function useSyncedState<T>(key: string, initialValue: T) {
  const { user } = useAuth();
  const userId = user?.uid;
  const isArrayExpected = useRef(Array.isArray(initialValue));
  
  // Initialize from local storage first for fast render
  const [state, setState] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return initialValue;
      const parsed = JSON.parse(item);
      if (isArrayExpected.current && !Array.isArray(parsed)) {
        return initialValue;
      }
      return (parsed !== null && parsed !== undefined) ? parsed : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage for ${key}`, error);
      return initialValue;
    }
  });

  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Sync from Firestore when user logs in
  useEffect(() => {
    if (!userId || !db) return;
    
    const docRef = doc(db, 'users', userId, 'bible_progress', 'data');
    
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        if (data && data[key] !== undefined) {
          const remoteVal = data[key];
          if (isArrayExpected.current && !Array.isArray(remoteVal)) {
            return;
          }
          // Only update state if remote value is actually different to prevent infinite update depth
          setState((prev) => {
            if (JSON.stringify(prev) === JSON.stringify(remoteVal)) {
              return prev;
            }
            return remoteVal;
          });
          try {
            localStorage.setItem(key, JSON.stringify(remoteVal));
          } catch (e) {
            console.warn(`Could not save synced value for ${key} to localStorage:`, e);
          }
        }
      }
    }, (error) => {
      console.warn(`Firestore sync note for ${key}:`, error);
    });

    return () => unsubscribe();
  }, [userId, key]);

  // Stable update function
  const setSyncedState = useCallback(async (value: T | ((val: T) => T)) => {
    try {
      const newValue = value instanceof Function ? value(stateRef.current) : value;
      
      // Avoid redundant state updates and duplicate Firestore writes if unchanged
      if (JSON.stringify(stateRef.current) === JSON.stringify(newValue)) {
        return;
      }

      // 1. Update React state
      setState(newValue);
      stateRef.current = newValue;
      
      // 2. Update Local Storage
      try {
        localStorage.setItem(key, JSON.stringify(newValue));
      } catch (e) {
        console.warn(`Could not update localStorage for ${key}:`, e);
      }
      
      // 3. Update Firestore if logged in
      if (userId && db) {
        const docRef = doc(db, 'users', userId, 'bible_progress', 'data');
        await setDoc(docRef, { [key]: newValue }, { merge: true });
      }
    } catch (error) {
      console.error(`Error updating synced state for ${key}`, error);
    }
  }, [userId, key]);

  return [state, setSyncedState] as const;
}
