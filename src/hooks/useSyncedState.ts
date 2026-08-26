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
      return item ? JSON.parse(item) : initialValue;
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
          setState(remoteVal);
          localStorage.setItem(key, JSON.stringify(remoteVal));
        }
      }
    });

    return () => unsubscribe();
  }, [user, key]);

  // Update function that saves to both
  const setSyncedState = useCallback(async (value: T | ((val: T) => T)) => {
    try {
      const newValue = value instanceof Function ? value(state) : value;
      
      // 1. Update React state
      setState(newValue);
      
      // 2. Update Local Storage
      localStorage.setItem(key, JSON.stringify(newValue));
      
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
