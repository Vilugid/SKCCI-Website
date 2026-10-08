import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signInWithRedirect, getRedirectResult, signOut } from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '../firebase';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  isConfigured: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  logout: async () => {},
  isConfigured: false,
});

export const useAuth = () => useContext(AuthContext);

// Detect if current browser is an embedded in-app browser (Messenger, Instagram, Viber, etc.)
// which Google intentionally blocks for OAuth authentication (disallowed_useragent)
export const isEmbeddedBrowser = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  const ua = (navigator.userAgent || navigator.vendor || (window as any).opera || '').toLowerCase();
  return /fban|fbav|instagram|line\/|musical_ly|bytedancewebview|viber|twitter|snapchat/.test(ua);
};

export const getAuthErrorMessage = (error: any): string => {
  const code = error?.code || '';
  const message = error?.message || '';

  if (code === 'auth/popup-closed-by-user') {
    return 'Sign-in cancelled.';
  }
  if (code === 'auth/popup-blocked') {
    return 'Pop-up was blocked by your browser. Please allow pop-ups for this site, or open directly in Safari/Chrome.';
  }
  if (code === 'auth/cancelled-popup-request') {
    return 'A sign-in window was already open. Please try again.';
  }
  if (code === 'auth/network-request-failed') {
    return 'Network connection error. Please check your internet connection.';
  }
  if (code === 'auth/unauthorized-domain') {
    const host = typeof window !== 'undefined' ? window.location.hostname : 'current domain';
    return `Website domain (${host}) is not in Firebase Auth's Authorized Domains list. Please contact the administrator.`;
  }
  if (code === 'auth/operation-not-allowed') {
    return 'Google Sign-In is not enabled in Firebase Authentication.';
  }
  if (code === 'auth/user-disabled') {
    return 'This Google account has been disabled in the system.';
  }
  if (code === 'auth/web-storage-unsupported' || (code === 'auth/internal-error' && message.toLowerCase().includes('storage'))) {
    return 'Browser storage or cookies are blocked. Please disable Private/Incognito mode or allow cookies.';
  }
  if (message.includes('disallowed_useragent') || isEmbeddedBrowser()) {
    return 'Google Sign-In is blocked inside in-app browsers (Messenger/Viber). Tap ⋯ in the upper corner and choose "Open in Chrome" or "Open in Safari".';
  }

  // Include detailed error code or message so the exact reason is immediately actionable
  return error?.message ? `Sign-in error (${code || 'failed'}): ${error.message}` : 'Failed to sign in. Please try again.';
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured() || !auth) {
      setLoading(false);
      return;
    }

    // Process redirect result if returning from signInWithRedirect
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          toast.success("Signed in successfully!");
        }
      })
      .catch((redirectErr: any) => {
        if (redirectErr?.code && redirectErr.code !== 'auth/popup-closed-by-user') {
          console.error("Redirect sign-in error", redirectErr);
          toast.error(getAuthErrorMessage(redirectErr), { duration: 6000 });
        }
      });

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    if (!isFirebaseConfigured() || !auth || !googleProvider) {
      toast.error("Firebase is not configured. Cannot sign in.");
      console.warn("Firebase is not configured. Cannot sign in.");
      return;
    }

    // 1. Proactively detect embedded in-app browsers (e.g., Facebook Messenger, Viber, Instagram)
    if (isEmbeddedBrowser()) {
      toast.error(
        "Google Sign-In is blocked inside Messenger/Viber browsers. Please tap ⋯ and choose 'Open in Chrome' or 'Open in Safari'.",
        { duration: 8000 }
      );
      return;
    }

    // 2. Attempt standard popup sign-in
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed in successfully!");
    } catch (error: any) {
      console.error("Error signing in with Google", error);

      // If popup was blocked on a mobile device outside of an iframe, offer seamless redirect
      const isInIframe = typeof window !== 'undefined' && window.self !== window.top;
      if (error.code === 'auth/popup-blocked' && !isInIframe) {
        try {
          toast.loading("Pop-up blocked. Redirecting to Google Sign-In...", { duration: 3000 });
          await signInWithRedirect(auth, googleProvider);
          return;
        } catch (redirectError: any) {
          console.error("Redirect sign-in fallback error", redirectError);
          toast.error(getAuthErrorMessage(redirectError), { duration: 6000 });
          return;
        }
      }

      toast.error(getAuthErrorMessage(error), { duration: 6000 });
    }
  };

  const logout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      toast.success("Signed out successfully!");
    } catch (error) {
      console.error("Error signing out", error);
      toast.error("Failed to sign out. Please try again.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout, isConfigured: isFirebaseConfigured() }}>
      {children}
    </AuthContext.Provider>
  );
};
