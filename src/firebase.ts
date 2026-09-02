import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { 
  initializeFirestore, 
  persistentLocalCache, 
  persistentMultipleTabManager,
  getFirestore 
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import firebaseConfig from '../firebase-applet-config.json';

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
    // Initialize Firestore with multi-tab persistent local IndexedDB cache
    try {
      db = initializeFirestore(app, {
        localCache: persistentLocalCache({
          tabManager: persistentMultipleTabManager()
        })
      }, (firebaseConfig as any).firestoreDatabaseId);
    } catch (cacheErr) {
      console.warn("Persistent local cache initialization fallback:", cacheErr);
      db = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId);
    }
    storage = getStorage(app);
    googleProvider = new GoogleAuthProvider();
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
}

export { auth, db, storage, googleProvider, isFirebaseConfigured };
