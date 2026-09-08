import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface LanguageToggleProps {
  theme?: 'light' | 'dark' | 'auto';
  className?: string;
  id?: string;
}

/**
 * Uniform Language Switcher for Savior-King Commission Church
 * Synchronizes across Header, Hannah Usher, and Scripture Reflection Guide.
 * Displays clean labels: "English" and "Tagalog"
 */
export default function LanguageToggle({
  theme = 'light',
  className = '',
  id = 'language-toggle'
}: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();

  const isDark = theme === 'dark';

  return (
    <div
      id={id}
      role="group"
      aria-label="Language selection"
      className={`inline-flex items-center p-0.5 sm:p-1 rounded-xl transition-all select-none ${
        isDark
          ? 'bg-black/30 border border-white/15'
          : 'bg-gray-100 border border-gray-200/90 shadow-2xs'
      } ${className}`}
    >
      {/* English Option */}
      <button
        type="button"
        id={`${id}-en`}
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        title="English"
        className={`px-2 min-[420px]:px-2.5 py-1 text-xs rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
          language === 'en'
            ? isDark
              ? 'bg-white text-[#0F2C59] shadow-xs'
              : 'bg-white text-gray-900 shadow-xs border border-gray-200/60'
            : isDark
              ? 'text-gray-300 hover:text-white hover:bg-white/10'
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/60'
        }`}
      >
        <span className="hidden min-[420px]:inline">English</span>
        <span className="min-[420px]:hidden">EN</span>
      </button>

      {/* Tagalog Option */}
      <button
        type="button"
        id={`${id}-fil`}
        onClick={() => setLanguage('fil')}
        aria-pressed={language === 'fil'}
        title="Tagalog"
        className={`px-2 min-[420px]:px-2.5 py-1 text-xs rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
          language === 'fil'
            ? isDark
              ? 'bg-[#C82323] text-white shadow-xs font-bold'
              : 'bg-white text-[#C82323] shadow-xs border border-gray-200/60 font-bold'
            : isDark
              ? 'text-gray-300 hover:text-white hover:bg-white/10'
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/60'
        }`}
      >
        <span className="hidden min-[420px]:inline">Tagalog</span>
        <span className="min-[420px]:hidden">TL</span>
      </button>
    </div>
  );
}
