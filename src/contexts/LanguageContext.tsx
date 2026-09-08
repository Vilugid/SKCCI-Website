import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Language, Translations, translations } from '../translations';

export type { Language };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language | 'tl') => void;
  toggleLanguage: () => void;
  t: (path: string, fallback?: string) => string;
  dict: Translations;
  isTagalog: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (path: string, fallback?: string) => fallback || path,
  dict: translations.en,
  isTagalog: false,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('skcci_language');
      if (saved === 'fil' || saved === 'tl') return 'fil';
      if (saved === 'en') return 'en';
      // Also check if hannah had saved it previously
      const hannahSaved = localStorage.getItem('hannah_language');
      if (hannahSaved === 'tl') return 'fil';
      if (hannahSaved === 'en') return 'en';
    } catch {
      // ignore
    }
    return 'en';
  });

  const setLanguage = useCallback((langInput: Language | 'tl') => {
    const normalized: Language = (langInput === 'tl' || langInput === 'fil') ? 'fil' : 'en';
    setLanguageState(normalized);
    try {
      localStorage.setItem('skcci_language', normalized);
      localStorage.setItem('hannah_language', normalized === 'fil' ? 'tl' : 'en');
    } catch {
      // ignore localStorage errors
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'fil' : 'en');
  }, [language, setLanguage]);

  // Sync across tabs and listen for storage changes
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'skcci_language' && e.newValue) {
        const val: Language = (e.newValue === 'tl' || e.newValue === 'fil') ? 'fil' : 'en';
        setLanguageState(val);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const dict = useMemo(() => translations[language] || translations.en, [language]);

  const t = useCallback((path: string, fallback?: string): string => {
    const keys = path.split('.');
    let current: any = dict;
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        return fallback !== undefined ? fallback : path;
      }
    }
    return typeof current === 'string' ? current : (fallback !== undefined ? fallback : path);
  }, [dict]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, dict, isTagalog: language === 'fil' }}>
      {children}
    </LanguageContext.Provider>
  );
};

