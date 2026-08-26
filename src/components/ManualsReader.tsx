import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle2, ChevronDown, ChevronUp, ChevronRight, Quote, Type, Moon, Sun, Check, Target, Flame } from 'lucide-react';
import { LESSONS, LessonData } from '../lessonsData';
import { useSyncedState } from '../hooks/useSyncedState';

type Theme = 'light' | 'dark';
type FontSize = 'sm' | 'md' | 'lg';

export default function ManualsReader() {
  const [activeLessonId, setActiveLessonId] = useState<string>(LESSONS[0].id);
  
  // Progress sets via useSyncedState
  const [completedLessonsArray, setCompletedLessonsArray] = useSyncedState<string[]>('sk_manuals_progress', []);
  const completedLessons = new Set(completedLessonsArray);

  const [theme, setTheme] = useState<Theme>('light');
  const [fontSize, setFontSize] = useState<FontSize>('md');
  
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());
  const [amenClicked, setAmenClicked] = useState(false);

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // Automatically open the category of the active lesson on initial load
  useEffect(() => {
    const activeLesson = LESSONS.find(l => l.id === activeLessonId);
    if (activeLesson) {
      setExpandedCategories(prev => new Set([...prev, activeLesson.category]));
    }
  }, [activeLessonId]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const categories = ["Evangelism", "Consolidation", "Envisioning"];
  const groupedLessons = categories.reduce((acc, cat) => {
    acc[cat] = LESSONS.filter(l => l.category === cat);
    return acc;
  }, {} as Record<string, typeof LESSONS>);

  // Reset states when lesson changes
  useEffect(() => {
    setExpandedQuestions(new Set());
    setAmenClicked(false);
    window.scrollTo(0, 0);
  }, [activeLessonId]);

  const markLessonComplete = (id: string) => {
    if (!completedLessons.has(id)) {
      setCompletedLessonsArray([...completedLessonsArray, id]);
    }
  };

  const toggleQuestion = (index: number) => {
    setExpandedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) newSet.delete(index);
      else newSet.add(index);
      return newSet;
    });
  };

  const lesson = LESSONS.find(l => l.id === activeLessonId) || LESSONS[0];
  const isCompleted = completedLessons.has(lesson.id);

  // Styling helpers
  const bgClass = theme === 'light' ? 'bg-[#FAFAFA]' : 'bg-gray-900';
  const textClass = theme === 'light' ? 'text-gray-800' : 'text-gray-100';
  const headingClass = theme === 'light' ? 'text-slate-900' : 'text-white';
  const cardBgClass = theme === 'light' ? 'bg-white' : 'bg-gray-800';
  const borderClass = theme === 'light' ? 'border-gray-200' : 'border-gray-700';
  const sidebarBg = theme === 'light' ? 'bg-white' : 'bg-gray-900';
  
  const fontSizeClasses = {
    sm: 'text-base leading-relaxed',
    md: 'text-lg leading-relaxed',
    lg: 'text-xl leading-relaxed'
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-[80vh] flex flex-col md:flex-row transition-colors duration-300 ${bgClass} ${textClass}`}>
      {/* Sidebar TOC */}
      <div className={`w-full md:w-80 flex-shrink-0 border-r ${borderClass} ${sidebarBg} sticky top-20 z-10 hidden md:block`}>
        <div className="p-6 h-[calc(100vh-5rem)] overflow-y-auto">
          
          {/* Lesson Selector */}
          <div className="mb-8 border-b pb-6 border-gray-100 dark:border-gray-700">
            {categories.map(category => {
              const isExpanded = expandedCategories.has(category);
              const categoryLessons = groupedLessons[category];
              if (!categoryLessons || categoryLessons.length === 0) return null;
              
              return (
                <div key={category} className="mb-4">
                  <button 
                    onClick={() => toggleCategory(category)}
                    className={`w-full flex items-center justify-between py-2 text-left transition-colors hover:text-[#C82323] dark:hover:text-amber-400 ${headingClass}`}
                  >
                    <h3 className="font-serif font-bold text-lg">{category} Manuals</h3>
                    {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </button>
                  
                  {isExpanded && (
                    <ul className="space-y-1 mt-2 pl-2 border-l-2 border-[#D4A373]/20 dark:border-amber-900/30">
                      {categoryLessons.map(l => (
                        <li key={l.id}>
                          <button 
                            onClick={() => setActiveLessonId(l.id)} 
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                              activeLessonId === l.id 
                                ? 'bg-[#D4A373]/20 text-amber-900 dark:bg-amber-900/30 dark:text-[#D4A373]' 
                                : 'text-gray-600 hover:bg-[#FAFAFA] dark:text-gray-400 dark:hover:bg-gray-800'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="truncate pr-2">{l.title.split(':')[0]}</span>
                              {completedLessons.has(l.id) && <CheckCircle2 size={14} className="text-green-600 flex-shrink-0" />}
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>

          <h3 className={`font-serif font-bold text-lg mb-4 ${headingClass}`}>Table of Contents</h3>
          <ul className="space-y-4 text-sm font-medium">
            <li>
              <button onClick={() => scrollToId('scripture-focus')} className="text-gray-500 hover:text-[#C82323] transition-colors flex items-center gap-2">
                <Quote size={16} /> Scripture Focus
              </button>
            </li>
            <li>
              <button onClick={() => scrollToId('objectives')} className="text-gray-500 hover:text-[#C82323] transition-colors flex items-center gap-2">
                <Target size={16} /> Objectives
              </button>
            </li>
            <li className="pt-2">
              <span className="text-gray-400 uppercase tracking-wider text-xs font-bold">Main Teaching</span>
              <ul className="mt-2 space-y-3 pl-4 border-l-2 border-gray-100 dark:border-gray-700">
                {lesson.teachingSections.map(sec => (
                  <li key={sec.id}>
                    <button onClick={() => scrollToId(sec.id)} className="text-gray-500 hover:text-[#C82323] transition-colors text-left">
                      {sec.number}. {sec.title}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <button onClick={() => scrollToId('reflection')} className="text-gray-500 hover:text-[#C82323] transition-colors flex items-center gap-2">
                <BookOpen size={16} /> Reflection Questions
              </button>
            </li>
            <li>
              <button onClick={() => scrollToId('prayer')} className="text-gray-500 hover:text-[#C82323] transition-colors flex items-center gap-2">
                <Flame size={16} /> Prayer & Application
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
        <div className="mb-8 flex justify-center md:justify-start">
          <img src="/logos/churchlogo4.png" alt="Savior-King Commission Church" onError={(e) => { e.currentTarget.style.display = 'none'; }} className="h-10 w-auto" />
        </div>
        
        {/* Mobile Lesson Selector */}
        <div className="md:hidden mb-6">
          <label className={`block text-sm font-bold font-serif mb-2 ${headingClass}`}>Select Lesson</label>
          <select 
            value={activeLessonId}
            onChange={(e) => setActiveLessonId(e.target.value)}
            className={`w-full rounded-xl border ${borderClass} ${cardBgClass} px-4 py-3 text-sm focus:ring-[#D4A373] focus:border-[#D4A373] outline-none`}
          >
            {categories.map(category => {
              const catLessons = groupedLessons[category];
              if (!catLessons || catLessons.length === 0) return null;
              return (
                <optgroup key={category} label={category}>
                  {catLessons.map(l => (
                    <option key={l.id} value={l.id}>
                      {l.title.split(':')[0]} {completedLessons.has(l.id) ? '✓' : ''}
                    </option>
                  ))}
                </optgroup>
              );
            })}
          </select>
        </div>

        {/* Controls Toolbar */}
        <div className={`flex flex-wrap items-center justify-between p-4 rounded-2xl mb-8 border ${borderClass} ${cardBgClass} shadow-sm`}>
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#D4A373]/20 text-[#0F2C59]">
              {lesson.category}
            </span>
            <span className="text-sm text-gray-500 font-medium">{lesson.readingTime}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button onClick={() => setFontSize('sm')} className={`p-1.5 rounded-md ${fontSize === 'sm' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`} title="Small text"><Type size={14} /></button>
              <button onClick={() => setFontSize('md')} className={`p-1.5 rounded-md ${fontSize === 'md' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`} title="Medium text"><Type size={18} /></button>
              <button onClick={() => setFontSize('lg')} className={`p-1.5 rounded-md ${fontSize === 'lg' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`} title="Large text"><Type size={22} /></button>
            </div>
            
            <button 
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} 
              className={`p-2 rounded-lg border ${borderClass} hover:bg-[#FAFAFA] dark:hover:bg-gray-700 transition-colors`}
              title="Toggle theme"
            >
              {theme === 'light' ? <Moon size={18} className="text-gray-600" /> : <Sun size={18} className="text-amber-400" />}
            </button>
            
            <button
              onClick={() => markLessonComplete(lesson.id)}
              disabled={isCompleted}
              className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isCompleted 
                  ? 'bg-green-100 text-green-800 cursor-default' 
                  : 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-[#C82323] dark:hover:bg-[#a11b1b]'
              }`}
            >
              {isCompleted ? <><CheckCircle2 size={16} className="mr-2" /> Completed</> : 'Mark Complete'}
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="mb-12">
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight mb-6 ${headingClass}`}>
            {lesson.title}
          </h1>
        </div>

        {/* Scripture Focus */}
        <div id="scripture-focus" className={`relative border-l-4 border-[#D4A373] rounded-r-2xl p-6 sm:p-10 mb-12 shadow-sm ${theme === 'light' ? 'bg-[#FFFBF0]' : 'bg-amber-900/10'}`}>
          <Quote className="absolute top-6 left-6 text-[#D4A373]/40 dark:text-amber-900/40 h-16 w-16 -z-10 transform -translate-x-4 -translate-y-4" />
          <h2 className="text-sm font-bold text-[#C82323] uppercase tracking-widest mb-4">Scripture Focus</h2>
          <p className={`text-2xl font-serif font-medium leading-relaxed ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'} mb-4`}>
            "{lesson.scriptureFocus.text}"
          </p>
          <p className="text-lg font-medium text-[#a11b1b]">— {lesson.scriptureFocus.reference}</p>
        </div>

        {/* Objectives */}
        <div id="objectives" className={`mb-16 p-6 rounded-2xl border ${borderClass} ${cardBgClass} shadow-sm`}>
          <h2 className={`text-xl font-bold font-serif mb-4 flex items-center gap-2 ${headingClass}`}>
            <Target className="text-[#D4A373]" /> Lesson Objectives
          </h2>
          <ul className={`space-y-3 ${fontSizeClasses[fontSize]}`}>
            {lesson.objectives.map((obj, i) => (
              <li key={i} className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-[#D4A373]/20 text-[#C82323] flex items-center justify-center text-xs font-bold mt-1 mr-3">
                  {i + 1}
                </span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Teaching */}
        <div className="space-y-12 mb-16">
          {lesson.teachingSections.map(sec => (
            <div key={sec.id} id={sec.id} className={`rounded-2xl border ${borderClass} ${cardBgClass} overflow-hidden shadow-sm`}>
              <div className={`px-6 py-4 border-b ${borderClass} flex items-center gap-4 ${theme === 'light' ? 'bg-slate-50' : 'bg-gray-800/50'}`}>
                <span className="flex-shrink-0 h-10 w-10 rounded-xl bg-[#D4A373] text-white flex items-center justify-center text-lg font-bold shadow-sm">
                  {sec.number}
                </span>
                <h2 className={`text-2xl font-bold font-serif ${headingClass}`}>
                  {sec.title}
                </h2>
              </div>
              <div className="p-6 sm:p-8 space-y-6">
                {sec.paragraphs.map((p, i) => (
                  <p key={i} className={`${fontSizeClasses[fontSize]} ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Reflection Questions */}
        <div id="reflection" className="mb-16">
          <h2 className={`text-2xl font-bold font-serif flex items-center gap-3 mb-6 ${headingClass}`}>
            <BookOpen className="text-[#D4A373]" /> Reflection Questions
          </h2>
          <div className="space-y-4">
            {lesson.reflectionQuestions.map((q, i) => {
              const isExpanded = expandedQuestions.has(i);
              return (
                <div key={i} className={`border ${borderClass} rounded-xl overflow-hidden ${cardBgClass} shadow-sm`}>
                  <button 
                    onClick={() => toggleQuestion(i)}
                    className={`w-full px-6 py-4 flex items-center justify-between text-left transition-colors ${theme === 'light' ? 'hover:bg-[#FAFAFA]' : 'hover:bg-gray-700/50'}`}
                  >
                    <span className={`font-medium ${fontSizeClasses[fontSize]}`}>{i + 1}. {q}</span>
                    {isExpanded ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                  </button>
                  {isExpanded && (
                    <div className={`px-6 pb-4 pt-2 border-t ${borderClass} ${theme === 'light' ? 'bg-[#FAFAFA]' : 'bg-gray-800/80'}`}>
                      <textarea 
                        className={`w-full bg-transparent border-none resize-none focus:ring-0 outline-none ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} ${fontSizeClasses[fontSize]}`} 
                        placeholder="Write your reflection here... (Notes are not saved)"
                        rows={3}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Prayer & Application */}
        <div id="prayer" className={`rounded-3xl p-8 sm:p-12 border text-center relative overflow-hidden shadow-sm ${theme === 'light' ? 'bg-gradient-to-br from-[#FAFAFA] to-orange-50 border-[#D4A373]/20' : 'bg-gradient-to-br from-amber-900/20 to-orange-900/20 border-amber-900/30'}`}>
          <Flame className="absolute top-0 right-0 h-64 w-64 text-[#D4A373]/10 transform translate-x-1/4 -translate-y-1/4" />
          
          <h2 className="text-2xl font-bold font-serif text-[#C82323] dark:text-[#D4A373] mb-6 relative z-10">
            Prayer & Application
          </h2>
          
          <div className={`backdrop-blur-sm rounded-2xl p-6 sm:p-8 mb-8 relative z-10 text-left ${theme === 'light' ? 'bg-white/60' : 'bg-black/20'}`}>
            <p className={`font-serif italic text-amber-900 dark:text-[#D4A373]/40 ${fontSizeClasses[fontSize]} leading-loose`}>
              "{lesson.prayer}"
            </p>
          </div>
          
          <div className={`inline-block rounded-xl px-6 py-4 shadow-sm border mb-8 relative z-10 ${theme === 'light' ? 'bg-white border-[#D4A373]/20' : 'bg-gray-800 border-amber-900'}`}>
            <h3 className="text-sm font-bold text-[#C82323] uppercase tracking-widest mb-2">Weekly Challenge</h3>
            <p className={`font-medium ${fontSizeClasses[fontSize]} ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>{lesson.challenge}</p>
          </div>
          
          <div className="relative z-10">
            <button 
              onClick={() => setAmenClicked(true)}
              disabled={amenClicked}
              className={`inline-flex items-center justify-center px-10 py-4 text-lg font-bold rounded-full shadow-lg transition-all ${
                amenClicked 
                  ? 'bg-[#D4A373]/20 text-[#0F2C59] cursor-default shadow-inner' 
                  : 'bg-[#C82323] hover:bg-[#a11b1b] text-white hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              {amenClicked ? (
                <><Check size={24} className="mr-2" /> Commitment Made</>
              ) : (
                'Amen, I Commit!'
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
