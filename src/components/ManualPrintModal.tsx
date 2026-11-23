import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Printer,
  FileDown,
  FileText,
  FolderOpen,
  BookOpen,
  Leaf,
  Loader2,
  Check,
  Languages,
  Type,
} from 'lucide-react';
import { LessonData } from '../lessonsData';
import { generateManualPdf, PrintScope } from '../utils/manualPdfExport';
import {
  ManualLanguage,
  MANUAL_UI_TEXT,
  getCategoryLabel,
  resolveLessonsForLanguage,
} from '../utils/manualTranslation';
import { PrintPayload } from './ManualPrintDocument';
import toast from 'react-hot-toast';

interface ManualPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeLesson: LessonData;
  activeLessonDisplayTitle?: string;
  allLessons: LessonData[];
  categories: string[];
  defaultLanguage: ManualLanguage;
  onTriggerBrowserPrint: (payload: PrintPayload) => void;
}

export default function ManualPrintModal({
  isOpen,
  onClose,
  activeLesson,
  activeLessonDisplayTitle,
  allLessons,
  categories,
  defaultLanguage,
  onTriggerBrowserPrint,
}: ManualPrintModalProps) {
  const [scope, setScope] = useState<PrintScope>('lesson');
  const [selectedSection, setSelectedSection] = useState<string>(activeLesson.category);
  const [exportLang, setExportLang] = useState<ManualLanguage>(defaultLanguage);
  const [largePrint, setLargePrint] = useState<boolean>(true);
  const [includeWritingLines, setIncludeWritingLines] = useState<boolean>(true);

  const [isProcessing, setIsProcessing] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedSection(activeLesson.category);
      setExportLang(defaultLanguage);
      setIsProcessing(false);
      setProgressText('');
      setProgressPercent(0);
    }
  }, [isOpen, activeLesson.category, defaultLanguage]);

  if (!isOpen) return null;

  const ui = MANUAL_UI_TEXT[defaultLanguage];
  const m = ui.printModal;

  const getTargetLessons = (): LessonData[] => {
    if (scope === 'lesson') return [activeLesson];
    if (scope === 'section') {
      return allLessons.filter((l) => l.category === selectedSection);
    }
    return allLessons;
  };

  const handleCancelProcessing = () => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setIsProcessing(false);
    setProgressText('');
    setProgressPercent(0);
  };

  const handleExecute = async (mode: 'pdf' | 'print') => {
    const targetLessons = getTargetLessons();
    if (targetLessons.length === 0) return;

    const controller = new AbortController();
    abortControllerRef.current = controller;
    setIsProcessing(true);
    setProgressPercent(5);
    setProgressText(m.preparingTitle);

    try {
      const { lessons: resolvedLessons, failedCount } = await resolveLessonsForLanguage(
        targetLessons,
        exportLang,
        (completed, total, currentTitle) => {
          const pct = Math.min(90, Math.round((completed / Math.max(total, 1)) * 85) + 5);
          setProgressPercent(pct);
          if (exportLang === 'fil' && currentTitle) {
            setProgressText(m.translatingProgress(completed, total, currentTitle));
          }
        },
        controller.signal
      );

      if (controller.signal.aborted) return;

      if (failedCount > 0 && exportLang === 'fil') {
        toast.error(
          defaultLanguage === 'fil'
            ? `${failedCount} aralin ang hindi naisalin ngayon at ipinakita sa Ingles.`
            : `${failedCount} lesson(s) could not be translated right now and fell back to English.`
        );
      }

      if (mode === 'pdf') {
        setProgressPercent(95);
        setProgressText(m.generatingPdf);
        await generateManualPdf({
          lessons: resolvedLessons,
          scope,
          sectionCategory: scope === 'section' ? selectedSection : undefined,
          language: exportLang,
          largePrint,
          includeWritingLines,
        });
        toast.success(m.pdfReady);
        setIsProcessing(false);
        onClose();
      } else {
        setProgressPercent(100);
        setProgressText(m.printReady);
        onTriggerBrowserPrint({
          lessons: resolvedLessons,
          scope,
          sectionCategory: scope === 'section' ? selectedSection : undefined,
          language: exportLang,
          largePrint,
          includeWritingLines,
        });
        setIsProcessing(false);
        onClose();
      }
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        return;
      }
      console.error('[Manual Export] Error:', err);
      toast.error(
        err?.message ||
          (defaultLanguage === 'fil'
            ? 'Nagkaroon ng problema sa paghahanda ng manwal.'
            : 'Something went wrong while preparing your manual.')
      );
      setIsProcessing(false);
    } finally {
      abortControllerRef.current = null;
    }
  };

  const sectionCounts = categories.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] = allLessons.filter((l) => l.category === cat).length;
    return acc;
  }, {});

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4 print:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="manual-print-modal-title"
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-2xl max-h-[92vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-5 sm:px-6 py-4 flex items-start justify-between gap-4">
          <div>
            <h2
              id="manual-print-modal-title"
              className="text-xl sm:text-2xl font-serif font-bold text-[#0F2C59] flex items-center gap-2.5"
            >
              <Printer className="text-[#C82323] flex-shrink-0" size={24} />
              <span>{m.title}</span>
            </h2>
            <p className="text-sm text-gray-500 mt-1">{m.subtitle}</p>
          </div>
          <button
            onClick={() => {
              if (isProcessing) handleCancelProcessing();
              onClose();
            }}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label={m.close}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-6">
          {/* Step 1: Scope Selection */}
          <div>
            <p className="text-sm font-bold text-[#0F2C59] uppercase tracking-wider mb-3">
              {m.chooseScope}
            </p>
            <div className="grid grid-cols-1 gap-3">
              {/* Option 1: Per Lesson */}
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => setScope('lesson')}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3.5 cursor-pointer ${
                  scope === 'lesson'
                    ? 'border-[#C82323] bg-red-50/40 shadow-xs'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div
                  className={`p-2.5 rounded-lg flex-shrink-0 ${
                    scope === 'lesson' ? 'bg-[#C82323] text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <FileText size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-gray-900 text-base">{m.scopeLesson}</span>
                    {scope === 'lesson' && <Check size={18} className="text-[#C82323] flex-shrink-0" />}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5 truncate">
                    {activeLessonDisplayTitle || activeLesson.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{m.scopeLessonDesc}</p>
                </div>
              </button>

              {/* Option 2: Per Section */}
              <div
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  scope === 'section'
                    ? 'border-[#C82323] bg-red-50/40 shadow-xs'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => setScope('section')}
                  className="w-full text-left flex items-start gap-3.5 cursor-pointer"
                >
                  <div
                    className={`p-2.5 rounded-lg flex-shrink-0 ${
                      scope === 'section' ? 'bg-[#C82323] text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <FolderOpen size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-gray-900 text-base">{m.scopeSection}</span>
                      {scope === 'section' && <Check size={18} className="text-[#C82323] flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{m.scopeSectionDesc}</p>
                  </div>
                </button>

                {scope === 'section' && (
                  <div className="mt-3 pt-3 border-t border-red-100 pl-0 sm:pl-12">
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      {m.selectSectionLabel}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          disabled={isProcessing}
                          onClick={() => setSelectedSection(cat)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium border text-left transition-colors cursor-pointer ${
                            selectedSection === cat
                              ? 'bg-[#0F2C59] text-white border-[#0F2C59]'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-[#0F2C59]/50'
                          }`}
                        >
                          <div className="font-bold truncate">{getCategoryLabel(cat, defaultLanguage)}</div>
                          <div
                            className={`text-xs ${
                              selectedSection === cat ? 'text-blue-100' : 'text-gray-500'
                            }`}
                          >
                            {m.lessonsCount(sectionCounts[cat] || 0)}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Option 3: Complete Manual */}
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => setScope('all')}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3.5 cursor-pointer ${
                  scope === 'all'
                    ? 'border-[#C82323] bg-red-50/40 shadow-xs'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div
                  className={`p-2.5 rounded-lg flex-shrink-0 ${
                    scope === 'all' ? 'bg-[#C82323] text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <BookOpen size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-gray-900 text-base">
                      {m.scopeAll}{' '}
                      <span className="text-xs font-semibold text-[#0F2C59] ml-1">
                        ({m.lessonsCount(allLessons.length)})
                      </span>
                    </span>
                    {scope === 'all' && <Check size={18} className="text-[#C82323] flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{m.scopeAllDesc}</p>
                </div>
              </button>
            </div>
          </div>

          {/* Step 2: Language & Readability Options */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-4">
            <p className="text-sm font-bold text-[#0F2C59] uppercase tracking-wider">
              {m.optionsTitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Language Choice */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-2">
                  <Languages size={14} className="text-[#0F2C59]" />
                  {m.languageLabel}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => setExportLang('en')}
                    className={`py-2 px-3 rounded-lg text-sm font-semibold border transition-colors cursor-pointer ${
                      exportLang === 'en'
                        ? 'bg-[#0F2C59] text-white border-[#0F2C59]'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => setExportLang('fil')}
                    className={`py-2 px-3 rounded-lg text-sm font-semibold border transition-colors cursor-pointer ${
                      exportLang === 'fil'
                        ? 'bg-[#C82323] text-white border-[#C82323]'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    Tagalog
                  </button>
                </div>
              </div>

              {/* Font Size Choice */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 mb-2">
                  <Type size={14} className="text-[#0F2C59]" />
                  {m.textSizeLabel}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => setLargePrint(false)}
                    className={`py-2 px-2.5 rounded-lg text-xs sm:text-sm font-semibold border transition-colors cursor-pointer ${
                      !largePrint
                        ? 'bg-[#0F2C59] text-white border-[#0F2C59]'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {m.standardPrint}
                  </button>
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => setLargePrint(true)}
                    className={`py-2 px-2.5 rounded-lg text-xs sm:text-sm font-semibold border transition-colors cursor-pointer ${
                      largePrint
                        ? 'bg-[#0F2C59] text-white border-[#0F2C59]'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {m.largePrint}
                  </button>
                </div>
              </div>
            </div>

            {/* Pen & Paper Reflection Lines Toggle */}
            <label className="flex items-center gap-3 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={includeWritingLines}
                disabled={isProcessing}
                onChange={(e) => setIncludeWritingLines(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-[#C82323] focus:ring-[#C82323]"
              />
              <span className="text-sm text-gray-700 font-medium">{m.includeLinesLabel}</span>
            </label>
          </div>

          {/* Eco Stewardship Reminder */}
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
            <Leaf size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm leading-relaxed">{m.ecoNote}</p>
          </div>

          {/* Progress Bar when Translating / Building PDF */}
          {isProcessing && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-amber-900 min-w-0">
                  <Loader2 size={16} className="animate-spin text-[#C82323] flex-shrink-0" />
                  <span className="truncate">{progressText || m.preparingTitle}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCancelProcessing}
                  className="text-xs font-bold text-[#C82323] hover:underline flex-shrink-0 cursor-pointer"
                >
                  {m.cancel}
                </button>
              </div>
              <div className="w-full h-2 bg-amber-200/70 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C82323] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-5 sm:px-6 py-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
          <button
            type="button"
            disabled={isProcessing}
            onClick={() => handleExecute('print')}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-[#0F2C59] text-[#0F2C59] font-bold text-sm hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <Printer size={18} />
            <span>{m.printNow}</span>
          </button>

          <button
            type="button"
            disabled={isProcessing}
            onClick={() => handleExecute('pdf')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#C82323] hover:bg-[#a11b1b] text-white font-bold text-sm shadow-sm transition-colors disabled:opacity-50 cursor-pointer"
          >
            <FileDown size={18} />
            <span>{m.downloadPdf}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
