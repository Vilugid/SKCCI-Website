import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { 
  initializeFirestore, 
  memoryLocalCache, 
  getFirestore 
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import firebaseConfig from '../firebase-applet-config.json';

// Immediately cleanup any leaked Firestore multi-tab client keys from localStorage
// that cause QuotaExceededError and fatal Firestore internal assertion failure (ID: b815)
try {
  if (typeof localStorage !== 'undefined') {
    const staleKeys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith('firestore_') || k.startsWith('firestore_clients_') || k.startsWith('firestore_zombie_'))) {
        staleKeys.push(k);
      }
    }
    staleKeys.forEach(k => {
      try {
        localStorage.removeItem(k);
      } catch (e) {
        // ignore
      }
    });
  }
} catch (e) {
  console.warn("Storage cleanup notice:", e);
}

const isFirebaseConfigured = () => {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
};

// Lazy initialization pattern to prevent crashing if config is missing
let app = null;
let auth: ReturnType<typeof getAuth> | null = null;
let db: ReturnType<typeof getFirestore> | null = null;
let storage: ReturnType<typeof getStorage> | null = null;
let googleProvider: GoogleAuthProvider | null = null;

if (isFirebaseConfigured()) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    // Initialize Firestore using memoryLocalCache to eliminate localStorage QuotaExceededError
    // and prevent client leader-election lock exhaustion while maintaining fast real-time listeners
    try {
      db = initializeFirestore(app, {
        localCache: memoryLocalCache()
      }, (firebaseConfig as any).firestoreDatabaseId);
    } catch (cacheErr) {
      console.warn("Firestore memory cache initialization fallback:", cacheErr);
      db = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId);
    }
    storage = getStorage(app);
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
}

export { auth, db, storage, googleProvider, isFirebaseConfigured };
