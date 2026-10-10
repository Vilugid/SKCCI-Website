import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

export function useSyncedState<T>(key: string, initialValue: T) {
  const { user } = useAuth();
  
  // Initialize from local storage first for fast render
  const [state, setState] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return initialValue;
      const parsed = JSON.parse(item);
      if (Array.isArray(initialValue) && !Array.isArray(parsed)) {
        return initialValue;
      }
      return (parsed !== null && parsed !== undefined) ? parsed : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage for ${key}`, error);
      return initialValue;
    }
  });

  // Sync from Firestore when user logs in
  useEffect(() => {
    if (!user || !db) return;
    
    const docRef = doc(db, 'users', user.uid, 'bible_progress', 'data');
    
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        if (data && data[key] !== undefined) {
          const remoteVal = data[key];
          if (Array.isArray(initialValue) && !Array.isArray(remoteVal)) {
            return;
          }
          setState(remoteVal);
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
  }, [user, key, initialValue]);

  // Update function that saves to both
  const setSyncedState = useCallback(async (value: T | ((val: T) => T)) => {
    try {
      const newValue = value instanceof Function ? value(state) : value;
      
      // 1. Update React state
      setState(newValue);
      
      // 2. Update Local Storage
      try {
        localStorage.setItem(key, JSON.stringify(newValue));
      } catch (e) {
        console.warn(`Could not update localStorage for ${key}:`, e);
      }
      
      // 3. Update Firestore if logged in
      if (user && db) {
        const docRef = doc(db, 'users', user.uid, 'bible_progress', 'data');
        await setDoc(docRef, { [key]: newValue }, { merge: true });
      }
    } catch (error) {
      console.error(`Error updating synced state for ${key}`, error);
    }
  }, [state, user, key]);

  return [state, setSyncedState] as const;
}
