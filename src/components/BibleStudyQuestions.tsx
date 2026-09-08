import React, { useState } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  Bookmark, 
  CheckSquare, 
  Footprints, 
  AlertTriangle, 
  ShieldAlert, 
  FileText,
  ChevronDown,
  ChevronUp,
  Languages,
  CheckCircle2,
  Info
} from 'lucide-react';
import { BibleStudyAnswers } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

export interface BibleStudyQuestionsProps {
  answers: BibleStudyAnswers;
  onChange: (key: keyof BibleStudyAnswers, value: string) => void;
  theme?: 'light' | 'dark';
  disabled?: boolean;
}

export const countWords = (text: string): number => {
  if (!text) return 0;
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
};

export const enforce250Words = (text: string): string => {
  if (!text) return '';
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length <= 250) return text;
  return words.slice(0, 250).join(' ');
};

interface QuestionConfig {
  key: keyof BibleStudyAnswers;
  icon: React.ElementType;
  colorClass: string;
  bgClassLight: string;
  bgClassDark: string;
  en: {
    title: string;
    sub: string;
    placeholder: string;
  };
  fil: {
    title: string;
    sub: string;
    placeholder: string;
  };
  isLegacyOthers?: boolean;
}

const QUESTIONS: QuestionConfig[] = [
  {
    key: 'whoIsGod',
    icon: Sparkles,
    colorClass: 'text-amber-600',
    bgClassLight: 'bg-amber-500/10 border-amber-500/20',
    bgClassDark: 'bg-amber-500/10 border-amber-500/30',
    en: {
      title: 'Who is GOD?',
      sub: "What does this passage reveal about God's character, holy nature, sovereignty, or works?",
      placeholder: 'Describe who God is, His names, His heart, or attributes revealed in today’s reading...'
    },
    fil: {
      title: 'Sino ang Diyos?',
      sub: 'Ano ang ipinapakita ng talata tungkol sa katangian, kalikasan, kadakilaan, o mga gawa ng Diyos?',
      placeholder: 'Ilarawan kung sino ang Diyos, Kanyang katangian, o Kanyang puso sa pagbasa ngayon...'
    }
  },
  {
    key: 'promises',
    icon: Bookmark,
    colorClass: 'text-emerald-600',
    bgClassLight: 'bg-emerald-500/10 border-emerald-500/20',
    bgClassDark: 'bg-emerald-500/10 border-emerald-500/30',
    en: {
      title: 'Are there promises to Claim?',
      sub: 'What divine promises, covenants, or assurances can you hold on to in faith today?',
      placeholder: 'List the promises God makes to His people that you can personally claim and stand on...'
    },
    fil: {
      title: 'May mga pangako bang dapat panghawakan?',
      sub: 'Anong mga banal na pangako o katiyakan ang maaari mong panghawakan nang may pananampalataya ngayon?',
      placeholder: 'Isulat ang mga pangako ng Diyos na maaari mong asahan at panghawakan...'
    }
  },
  {
    key: 'commands',
    icon: CheckSquare,
    colorClass: 'text-blue-600',
    bgClassLight: 'bg-blue-500/10 border-blue-500/20',
    bgClassDark: 'bg-blue-500/10 border-blue-500/30',
    en: {
      title: 'Are there Commands to Obey?',
      sub: 'What specific instructions, divine directives, or call to obedience does God give?',
      placeholder: 'Write down the clear commands or steps of obedience God is speaking to your heart...'
    },
    fil: {
      title: 'May mga utos bang dapat sundin?',
      sub: 'Anong partikular na tagubilin, utos, o hakbang ng pagsunod ang sinasabi ng Diyos?',
      placeholder: 'Isulat ang mga utos o tagubilin ng Diyos na dapat mong isabuhay at sundin...'
    }
  },
  {
    key: 'examples',
    icon: Footprints,
    colorClass: 'text-teal-600',
    bgClassLight: 'bg-teal-500/10 border-teal-500/20',
    bgClassDark: 'bg-teal-500/10 border-teal-500/30',
    en: {
      title: 'Are there Examples to follow?',
      sub: 'What godly examples of faith, love, courage, prayer, or humility can you imitate?',
      placeholder: 'Identify people, choices, or Christ-like actions worthy of emulation...'
    },
    fil: {
      title: 'May mga halimbawa bang dapat tularan?',
      sub: 'Anong mga banal na halimbawa ng pananampalataya, pag-ibig, o kababaang-loob ang dapat sundan?',
      placeholder: 'Tukuyin ang mga tao o gawaing karapat-dapat tularan sa iyong buhay...'
    }
  },
  {
    key: 'warnings',
    icon: AlertTriangle,
    colorClass: 'text-orange-600',
    bgClassLight: 'bg-orange-500/10 border-orange-500/20',
    bgClassDark: 'bg-orange-500/10 border-orange-500/30',
    en: {
      title: 'Are the Warnings to Heed?',
      sub: 'What spiritual pitfalls, deceptions, dangers, or consequences does God warn against?',
      placeholder: 'Reflect on cautionary lessons, judgment, or consequences to take seriously...'
    },
    fil: {
      title: 'May mga babala bang dapat pakinggan?',
      sub: 'Anong mga espirituwal na kapahamakan, panlilinlang, o babala ang sinasabi ng Panginoon?',
      placeholder: 'Isulat ang mga babala o aral na dapat bantayan at pakinggan...'
    }
  },
  {
    key: 'sins',
    icon: ShieldAlert,
    colorClass: 'text-rose-600',
    bgClassLight: 'bg-rose-500/10 border-rose-500/20',
    bgClassDark: 'bg-rose-500/10 border-rose-500/30',
    en: {
      title: 'Are There Sins to Avoid or Confess?',
      sub: 'What habits, selfish desires, doubts, or unconfessed sins need to be brought to the light?',
      placeholder: 'Name any sin to avoid, repent from, or surrender to Jesus Christ today...'
    },
    fil: {
      title: 'May mga kasalanan bang dapat iwasan o ipagtapat?',
      sub: 'Anong mga maling gawi, pagdududa, o kasalanan ang dapat ihingi ng tawad o iwasan?',
      placeholder: 'Isulat ang mga kasalanang dapat iwasan o ipagtapat at isuko sa Panginoong Hesus...'
    }
  },
  {
    key: 'others',
    icon: FileText,
    colorClass: 'text-indigo-600',
    bgClassLight: 'bg-indigo-500/10 border-indigo-500/20',
    bgClassDark: 'bg-indigo-500/10 border-indigo-500/30',
    isLegacyOthers: true,
    en: {
      title: 'Others (Notes & Reflections)',
      sub: 'Personal insights, prayer points, and any previous notes you created.',
      placeholder: 'Write any additional personal notes, prayer commitments, or reflections here...'
    },
    fil: {
      title: 'Iba pa (Mga Tala at Pagbubulay)',
      sub: 'Personal na natutunan, panalangin, at ang mga dati mong isinulat na tala.',
      placeholder: 'Isulat ang karagdagang personal na tala, panalangin, o dating repleksyon dito...'
    }
  }
];

export default function BibleStudyQuestions({
  answers,
  onChange,
  theme = 'light',
  disabled = false
}: BibleStudyQuestionsProps) {
  const { language } = useLanguage();
  const lang = language;
  
  // Track section-level collapse so users can collapse the entire 7-question guide
  // Defaults to collapsed on page refresh / app open
  const [isSectionCollapsed, setIsSectionCollapsed] = useState<boolean>(true);

  // Track collapsed/expanded questions to keep mobile screen neat
  // Initially, all questions are expanded so users can easily see and scroll through them
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const isDarkMode = theme === 'dark';

  const toggleCollapse = (key: string) => {
    setCollapsed(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTextChange = (key: keyof BibleStudyAnswers, text: string) => {
    if (disabled) return;
    const words = text.trim().split(/\s+/).filter(Boolean);
    if (words.length > 250) {
      const trimmed = words.slice(0, 250).join(' ');
      onChange(key, trimmed);
    } else {
      onChange(key, text);
    }
  };

  // Calculate overall completion count (how many questions have notes)
  const answeredCount = QUESTIONS.filter(q => {
    const val = answers[q.key];
    return val && val.trim().length > 0;
  }).length;

  return (
    <div className="w-full space-y-4">
      {/* Header with Title, Single Expand Guide Button, and Language Switcher */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2.5 border-b ${
        isDarkMode ? 'border-gray-800' : 'border-gray-200'
      }`}>
        <div className="flex-1 pr-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#D4A373]">
              {lang === 'fil' ? 'PAGBUBULAY SA BANAL NA KASULATAN' : 'SCRIPTURE REFLECTION GUIDE'}
            </h4>
            <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold bg-[#D4A373]/15 text-[#D4A373]">
              {answeredCount}/7 {lang === 'fil' ? 'nasagutan' : 'completed'}
            </span>
          </div>
          <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {lang === 'fil' 
              ? 'Sagutin ang mga tanong sa ibaba (hanggang 250 salita bawat isa)'
              : 'Reflect on today’s passage with the questions below (up to 250 words each)'}
          </p>
        </div>

        {/* Action Controls: The Only Expand Guide Button & Synchronized Language Switcher */}
        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <button
            type="button"
            onClick={() => setIsSectionCollapsed(prev => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              isDarkMode
                ? 'bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700 hover:text-white'
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 shadow-2xs'
            }`}
            title={isSectionCollapsed ? (lang === 'fil' ? 'Ipakita ang gabay' : 'Expand reflection guide') : (lang === 'fil' ? 'Itago ang gabay' : 'Collapse reflection guide')}
          >
            {isSectionCollapsed ? (
              <>
                <ChevronDown size={14} className="text-[#D4A373]" />
                <span>{lang === 'fil' ? 'Buksan ang Gabay' : 'Expand Guide'}</span>
              </>
            ) : (
              <>
                <ChevronUp size={14} className="text-[#D4A373]" />
                <span>{lang === 'fil' ? 'Itago ang Gabay' : 'Collapse Guide'}</span>
              </>
            )}
          </button>

          {/* Synchronized English / Tagalog Switcher */}
          <LanguageToggle 
            theme={isDarkMode ? 'dark' : 'light'} 
            id="reflection-lang-toggle" 
          />
        </div>
      </div>

      {isSectionCollapsed ? (
        /* Sleek Collapsed Placeholder Card without redundant Expand button */
        <div
          className={`w-full p-4 rounded-xl border border-dashed flex items-center gap-3 transition-all ${
            isDarkMode 
              ? 'bg-gray-900/60 border-gray-800 text-gray-300' 
              : 'bg-amber-50/40 border-amber-200/90 text-gray-700 shadow-2xs'
          }`}
        >
          <div className="w-8 h-8 rounded-lg bg-[#D4A373]/15 flex items-center justify-center text-[#D4A373] flex-shrink-0">
            <FileText size={18} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-[#0F2C59] dark:text-gray-100">
              {lang === 'fil' ? 'Nakatago ang Gabay sa Pagbubulay' : 'Reflection Guide Collapsed'}
            </p>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {answeredCount > 0 
                ? (lang === 'fil' ? `${answeredCount} sa 7 tanong ang nasagutan` : `${answeredCount} of 7 questions answered`)
                : (lang === 'fil' ? '7 gabay na tanong sa pagbubulay' : '7 reflection questions available')}
            </p>
          </div>
        </div>
      ) : (
        /* 7 Questions Cards */
        <div className="space-y-3.5">
        {QUESTIONS.map((q, idx) => {
          const content = answers[q.key] || '';
          const wordCount = countWords(content);
          const isAtLimit = wordCount >= 250;
          const isAnswered = content.trim().length > 0;
          const isFieldCollapsed = collapsed[q.key] || false;
          const texts = lang === 'fil' ? q.fil : q.en;
          const Icon = q.icon;

          return (
            <div
              key={q.key}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isAnswered
                  ? isDarkMode
                    ? 'bg-gray-900 border-[#D4A373]/50 shadow-sm'
                    : 'bg-white border-[#D4A373]/40 shadow-xs'
                  : isDarkMode
                    ? 'bg-gray-900 border-gray-700 shadow-sm'
                    : 'bg-white border-gray-200 shadow-xs'
              }`}
            >
              {/* Question Card Header */}
              <div 
                className={`px-3.5 py-3 sm:px-4 sm:py-3.5 flex items-center justify-between gap-3 cursor-pointer select-none transition-colors ${
                  isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-100/60'
                }`}
                onClick={() => toggleCollapse(q.key)}
              >
                <div className="flex items-start sm:items-center gap-2.5 min-w-0 flex-1">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border ${
                    isDarkMode ? q.bgClassDark : q.bgClassLight
                  }`}>
                    <Icon size={16} className={q.colorClass} />
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-bold text-[#D4A373]">
                        #{idx + 1}
                      </span>
                      <h5 className={`text-xs sm:text-sm font-bold ${
                        isDarkMode ? 'text-white' : 'text-[#0F2C59]'
                      }`}>
                        {texts.title}
                      </h5>
                      {q.isLegacyOthers && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold border ${
                          isDarkMode 
                            ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' 
                            : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                        }`}>
                          {lang === 'fil' ? 'Naglalaman ng dating tala' : 'Includes previous notes'}
                        </span>
                      )}
                      {isAnswered && (
                        <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className={`text-[11px] line-clamp-1 mt-0.5 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {texts.sub}
                    </p>
                  </div>
                </div>

                {/* Right: Word Count Badge & Collapse Chevron */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded-md font-semibold ${
                    isAtLimit 
                      ? isDarkMode
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-red-50 text-red-700 border border-red-200'
                      : isAnswered
                        ? isDarkMode
                          ? 'bg-[#D4A373]/20 text-[#D4A373]'
                          : 'bg-[#D4A373]/15 text-[#9C6634]'
                        : isDarkMode
                          ? 'text-gray-400'
                          : 'text-gray-500'
                  }`}>
                    {wordCount}/250 {lang === 'fil' ? 'salita' : 'words'}
                  </span>

                  <button
                    type="button"
                    aria-label={isFieldCollapsed ? 'Expand Question' : 'Collapse Question'}
                    className={`p-1 transition-colors ${
                      isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-[#0F2C59]'
                    }`}
                  >
                    {isFieldCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                  </button>
                </div>
              </div>

              {/* Question Textarea (if not collapsed) */}
              {!isFieldCollapsed && (
                <div className={`p-3.5 sm:p-4 pt-1 sm:pt-1 border-t ${
                  isDarkMode ? 'border-gray-800' : 'border-gray-100'
                }`}>
                  <textarea
                    value={content}
                    onChange={(e) => handleTextChange(q.key, e.target.value)}
                    disabled={disabled}
                    placeholder={texts.placeholder}
                    rows={3}
                    className={`w-full p-3 sm:p-3.5 rounded-xl resize-none text-xs sm:text-sm leading-relaxed transition-all border outline-none ${
                      isDarkMode
                        ? 'bg-gray-900/90 border-gray-700/80 text-gray-100 placeholder:text-gray-500 focus:border-[#D4A373] focus:ring-1 focus:ring-[#D4A373]'
                        : 'bg-white border-gray-200 text-[#0F2C59] placeholder:text-gray-400 focus:border-[#0F2C59] focus:ring-1 focus:ring-[#0F2C59]'
                    } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                  />

                  {/* Word Limit Notice if user is typing near or at 250 words */}
                  {isAtLimit && (
                    <div className={`mt-1.5 flex items-center gap-1 text-[11px] ${
                      isDarkMode ? 'text-amber-400' : 'text-amber-700'
                    }`}>
                      <Info size={12} />
                      <span>
                        {lang === 'fil'
                          ? 'Naabot na ang maximum limit na 250 salita para sa tanong na ito.'
                          : 'Maximum 250-word limit reached for this question.'}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
        </div>
      )}
    </div>
  );
}
