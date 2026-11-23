import { LessonData } from '../lessonsData';
import { TAGALOG_LESSONS_MAP } from '../lessonsDataFil';
import { StoredManualTranslation } from '../api/manualTranslations';
import { formatLessonDivineWords } from './textFormatter';

export type ManualLanguage = 'en' | 'fil';

/**
 * Bundled official Tagalog translations for all 29 SKCCI manual lessons
 * (mapped directly in the app from the church's official Tagalog manual).
 */
export const STATIC_TAGALOG_LESSONS: Record<string, LessonData> = TAGALOG_LESSONS_MAP;

export const MANUAL_CATEGORY_LABELS: Record<ManualLanguage, Record<string, string>> = {
  en: {
    Evangelism: 'Evangelism',
    Consolidation: 'Consolidation',
    Envisioning: 'Envisioning',
  },
  fil: {
    Evangelism: 'Ebanghelismo',
    Consolidation: 'Konsolidasyon',
    Envisioning: 'Pagbibigay-Paningin',
  },
};

export const MANUAL_UI_TEXT = {
  en: {
    manualsSuffix: 'Manuals',
    tableOfContents: 'Table of Contents',
    scriptureFocus: 'Scripture Focus',
    objectives: 'Objectives',
    lessonObjectives: 'Lesson Objectives',
    mainTeaching: 'Main Teaching',
    reflectionQuestions: 'Reflection Questions',
    prayerAndApplication: 'Prayer & Application',
    weeklyChallenge: 'Weekly Challenge',
    selectLesson: 'Select Lesson',
    markComplete: 'Mark Complete',
    completed: 'Completed',
    commitmentMade: 'Commitment Made',
    amenICommit: 'Amen, I Commit!',
    reflectionPlaceholder: 'Write your reflection here... (Notes are not saved)',
    smallText: 'Small text',
    mediumText: 'Medium text',
    largeText: 'Large text',
    toggleTheme: 'Toggle theme',
    printOrPdf: 'Print / PDF',
    manageTagalog: 'Manage Tagalog',
    saveToCloud: 'Save to Firestore',
    savingToCloud: 'Saving...',
    savedInCloudOfficial: 'Official Tagalog (Saved in Firestore)',
    savedInCloudAi: 'Tagalog Translation (Saved in Firestore)',
    officialBundledBadge: 'Official Tagalog Translation',
    syncingOfficialNotice: (done: number, total: number) =>
      `Saving official Tagalog lessons to Firestore (${done} / ${total})...`,
    translatingNotice: 'Translating lesson to Tagalog...',
    translatedBadge: 'Tagalog Translation (Preview — not yet in Firestore)',
    retryTranslation: 'Retry',
    translationFailed: 'Could not translate this lesson right now. Showing English text.',
    lessonLabel: 'Lesson',
    churchName: 'SAVIOR-KING Commission Church International',
    churchMotto: 'Your Church, Your Family',
    discipleshipManualsTitle: 'Discipleship Manuals',
    notesLinePrompt: 'My Notes / Reflection:',
    pageOf: (page: number, total: number) => `Page ${page} of ${total}`,
    printModal: {
      title: 'Print or Save Manual as PDF',
      subtitle: 'Prepare a clean, senior-friendly printable copy per lesson, per section, or as a complete manual.',
      chooseScope: '1. What would you like to print or save?',
      scopeLesson: 'This Lesson Only',
      scopeLessonDesc: 'Best for printing only what you need for today’s study',
      scopeSection: 'Entire Section',
      scopeSectionDesc: 'Includes cover page, section contents, and all lessons in this section',
      scopeAll: 'Complete Manual (All Sections)',
      scopeAllDesc: 'All Evangelism, Consolidation, and Envisioning lessons with master table of contents',
      selectSectionLabel: 'Choose Section to Export',
      lessonsCount: (n: number) => `${n} lessons`,
      optionsTitle: '2. Print & Readability Options',
      languageLabel: 'Language',
      textSizeLabel: 'Print Text Size',
      standardPrint: 'Standard (Paper-Saving)',
      largePrint: 'Large Print (Senior-Friendly)',
      includeLinesLabel: 'Include ruled writing lines under Reflection Questions (for pen & paper)',
      ecoNote: 'Eco Stewardship Tip: To help save paper and care for GOD’S creation, consider printing only the lesson you need or choosing double-sided printing on your printer.',
      downloadPdf: 'Download PDF',
      printNow: 'Print Page',
      cancel: 'Cancel',
      preparingTitle: 'Preparing your manual...',
      translatingProgress: (done: number, total: number, title: string) =>
        `Translating lesson ${done} of ${total} to Tagalog: ${title}`,
      generatingPdf: 'Building crisp PDF document...',
      pdfReady: 'PDF downloaded! You can now open, share, or print it.',
      printReady: 'Opening print dialog...',
      close: 'Close',
    },
  },
  fil: {
    manualsSuffix: '— Mga Gabay',
    tableOfContents: 'Talaan ng Nilalaman',
    scriptureFocus: 'Sentro ng Kasulatan',
    objectives: 'Mga Layunin',
    lessonObjectives: 'Mga Layunin ng Aralin',
    mainTeaching: 'Pangunahing Aral',
    reflectionQuestions: 'Mga Tanong sa Pagninilay',
    prayerAndApplication: 'Panalangin at Pagsasabuhay',
    weeklyChallenge: 'Hamon sa Linggong Ito',
    selectLesson: 'Pumili ng Aralin',
    markComplete: 'Markahang Tapos',
    completed: 'Natapos na',
    commitmentMade: 'Nangako Na',
    amenICommit: 'Amen, Nangangako Ako!',
    reflectionPlaceholder: 'Isulat ang iyong pagninilay dito... (Hindi sine-save ang mga tala)',
    smallText: 'Maliit na letra',
    mediumText: 'Katamtamang letra',
    largeText: 'Malaking letra',
    toggleTheme: 'Palitan ang tema',
    printOrPdf: 'I-print / PDF',
    manageTagalog: 'Pamahalaan ang Tagalog',
    saveToCloud: 'I-save sa Firestore',
    savingToCloud: 'Sine-save...',
    savedInCloudOfficial: 'Opisyal na Salin sa Tagalog (Naka-save sa Firestore)',
    savedInCloudAi: 'Salin sa Tagalog (Naka-save sa Firestore)',
    officialBundledBadge: 'Opisyal na Salin sa Tagalog',
    syncingOfficialNotice: (done: number, total: number) =>
      `Sine-save sa Firestore ang mga opisyal na araling Tagalog (${done} / ${total})...`,
    translatingNotice: 'Isinasalin ang aralin sa Tagalog...',
    translatedBadge: 'Salin sa Tagalog (Preview — hindi pa naka-save sa Firestore)',
    retryTranslation: 'Subukan Ulit',
    translationFailed: 'Hindi maisalin ang aralin sa ngayon. Ipinapakita muna ang Ingles.',
    lessonLabel: 'Aralin',
    churchName: 'SAVIOR-KING Commission Church International',
    churchMotto: 'Ang Iyong Simbahan, Ang Iyong Pamilya',
    discipleshipManualsTitle: 'Mga Gabay sa Pagdidisipulo',
    notesLinePrompt: 'Aking Tala / Pagninilay:',
    pageOf: (page: number, total: number) => `Pahina ${page} ng ${total}`,
    printModal: {
      title: 'I-print o I-save ang Gabay bilang PDF',
      subtitle: 'Gumawa ng malinaw at madaling basahing kopya bawat aralin, bawat seksyon, o ang buong manwal.',
      chooseScope: '1. Alin ang nais mong i-print o i-save?',
      scopeLesson: 'Kasalukuyang Aralin Lamang',
      scopeLessonDesc: 'Pinakamainam upang makatipid sa papel at i-print lamang ang aralin ngayon',
      scopeSection: 'Buong Seksyon',
      scopeSectionDesc: 'May pabalat, talaan ng nilalaman, at lahat ng aralin sa napiling seksyon',
      scopeAll: 'Buong Manwal (Lahat ng Seksyon)',
      scopeAllDesc: 'Lahat ng aralin sa Ebanghelismo, Konsolidasyon, at Pagbibigay-Paningin',
      selectSectionLabel: 'Pumili ng Seksyon',
      lessonsCount: (n: number) => `${n} aralin`,
      optionsTitle: '2. Mga Opsyon sa Pag-print at Laki ng Letra',
      languageLabel: 'Wika',
      textSizeLabel: 'Laki ng Letra sa Print',
      standardPrint: 'Karaniwan (Tipid sa Papel)',
      largePrint: 'Malaking Letra (Para sa Nakatatanda)',
      includeLinesLabel: 'Maglagay ng guhit na sulatan sa ilalim ng mga Tanong sa Pagninilay',
      ecoNote: 'Paalala sa Kalikasan: Upang makatulong sa pagtitipid ng papel at pangangalaga sa nilikha ng DIYOS, maaaring i-print lamang ang kailangang aralin o gumamit ng double-sided printing.',
      downloadPdf: 'I-download ang PDF',
      printNow: 'I-print Ngayon',
      cancel: 'Kanselahin',
      preparingTitle: 'Inihahanda ang iyong manwal...',
      translatingProgress: (done: number, total: number, title: string) =>
        `Isinasalin sa Tagalog ang aralin ${done} ng ${total}: ${title}`,
      generatingPdf: 'Ginagawa ang malinaw na PDF file...',
      pdfReady: 'Na-download na ang PDF! Maaari mo na itong buksan, ibahagi, o i-print.',
      printReady: 'Binubuksan ang print dialog...',
      close: 'Isara',
    },
  },
} as const;

export function getCategoryLabel(category: string, lang: ManualLanguage): string {
  return MANUAL_CATEGORY_LABELS[lang][category] || category;
}

export function getSidebarLessonShortLabel(lesson: LessonData, lang: ManualLanguage): string {
  const prefix = lesson.title.split(':')[0] || lesson.title;
  if (lang === 'fil') {
    return prefix.replace(/^Lesson\b/i, 'Aralin');
  }
  return prefix;
}

// Fast deterministic content fingerprint so local AI cache invalidates if English text updates
function computeLessonFingerprint(lesson: LessonData): string {
  const str = `${lesson.title}|${lesson.scriptureFocus.text}|${lesson.teachingSections.length}|${lesson.prayer.length}`;
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) >>> 0;
  }
  return hash.toString(36);
}

const LEGACY_CACHE_PREFIX = 'skcci_manual_fil_';
const memoryCache = new Map<string, LessonData>();
const firestoreCache = new Map<string, StoredManualTranslation>();
const inFlightRequests = new Map<string, Promise<LessonData>>();

/**
 * Clears all legacy browser localStorage manual translation cache entries (`skcci_manual_fil_*`)
 * and in-memory caches since all 29 Tagalog lessons are bundled directly in the app.
 */
export function clearLegacyManualBrowserCache(): number {
  memoryCache.clear();
  firestoreCache.clear();
  if (typeof window === 'undefined' || !window.localStorage) return 0;

  let removedCount = 0;
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith(LEGACY_CACHE_PREFIX) && key !== 'skcci_manual_fil_firestore_purged_v1') {
        keysToRemove.push(key);
      }
    }
    for (const key of keysToRemove) {
      window.localStorage.removeItem(key);
      removedCount += 1;
    }
  } catch {
    // ignore storage access issues
  }
  return removedCount;
}

export function hydrateFirestoreTranslations(
  records: Record<string, StoredManualTranslation>
): void {
  firestoreCache.clear();
  for (const [id, record] of Object.entries(records)) {
    firestoreCache.set(id, formatLessonDivineWords(record));
  }
}

export function setFirestoreTranslationInCache(record: StoredManualTranslation): void {
  firestoreCache.set(record.id, formatLessonDivineWords(record));
}

export function removeFirestoreTranslationFromCache(lessonId: string): void {
  firestoreCache.delete(lessonId);
}

export function getFirestoreTranslationEntry(
  lessonId: string
): StoredManualTranslation | null {
  return firestoreCache.get(lessonId) || null;
}

export function getCachedTagalogLesson(lesson: LessonData): LessonData | null {
  // 1. Bundled official Tagalog translation (all 29 mapped lessons in app)
  if (STATIC_TAGALOG_LESSONS[lesson.id]) {
    return formatLessonDivineWords(STATIC_TAGALOG_LESSONS[lesson.id]);
  }

  // 2. Session-only in-memory cache for any future unmapped lesson
  const fingerprint = computeLessonFingerprint(lesson);
  const memKey = `${lesson.id}:${fingerprint}`;
  const inMem = memoryCache.get(memKey);
  if (inMem) return formatLessonDivineWords(inMem);

  return null;
}

function saveCachedTagalogLesson(sourceLesson: LessonData, translated: LessonData): void {
  const fingerprint = computeLessonFingerprint(sourceLesson);
  const memKey = `${sourceLesson.id}:${fingerprint}`;
  memoryCache.set(memKey, translated);
}

export async function translateLessonToTagalog(
  lesson: LessonData,
  signal?: AbortSignal,
  bypassCache = false
): Promise<LessonData> {
  if (!bypassCache) {
    const cached = getCachedTagalogLesson(lesson);
    if (cached) return cached;
  }

  const existingPromise = inFlightRequests.get(lesson.id);
  if (existingPromise) {
    return existingPromise;
  }

  const requestPromise = (async () => {
    try {
      const response = await fetch('/api/translate-manual-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lesson }),
        signal,
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.lesson) {
        throw new Error(data?.error || 'Translation request failed');
      }

      const translated = formatLessonDivineWords(data.lesson as LessonData);
      saveCachedTagalogLesson(lesson, translated);
      return translated;
    } finally {
      inFlightRequests.delete(lesson.id);
    }
  })();

  inFlightRequests.set(lesson.id, requestPromise);
  return requestPromise;
}

/**
 * Maps an uploaded/pasted human-translated Tagalog text document into structured LessonData fields
 * without rewriting the translator's Tagalog wording.
 */
export async function parseUploadedTagalogLesson(
  rawText: string,
  sourceLesson: LessonData
): Promise<LessonData> {
  const response = await fetch('/api/parse-uploaded-manual', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rawText, sourceLesson }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data?.lesson) {
    throw new Error(data?.error || 'Could not map uploaded text automatically.');
  }
  return formatLessonDivineWords(data.lesson as LessonData);
}

/**
 * Generates a clean, easy-to-translate plain-text template for offline human translation.
 */
export function buildTranslationTemplateText(lesson: LessonData): string {
  const lines: string[] = [
    `=== SKCCI MANUAL TRANSLATION TEMPLATE ===`,
    `LESSON ID: ${lesson.id}`,
    `CATEGORY: ${lesson.category}`,
    ``,
    `TITLE:`,
    lesson.title,
    ``,
    `READING TIME:`,
    lesson.readingTime,
    ``,
    `SCRIPTURE REFERENCE:`,
    lesson.scriptureFocus.reference,
    ``,
    `SCRIPTURE TEXT:`,
    lesson.scriptureFocus.text,
    ``,
    `OBJECTIVES:`,
    ...lesson.objectives.map((o, i) => `${i + 1}. ${o}`),
    ``,
    `MAIN TEACHING SECTIONS:`,
  ];

  lesson.teachingSections.forEach((sec) => {
    lines.push(``);
    lines.push(`[SECTION ${sec.number}] ${sec.title}`);
    sec.paragraphs.forEach((p) => {
      lines.push(p);
      lines.push(``);
    });
  });

  lines.push(`REFLECTION QUESTIONS:`);
  lesson.reflectionQuestions.forEach((q, i) => {
    lines.push(`${i + 1}. ${q}`);
  });
  lines.push(``);
  lines.push(`PRAYER:`);
  lines.push(lesson.prayer);
  lines.push(``);
  lines.push(`WEEKLY CHALLENGE:`);
  lines.push(lesson.challenge);

  return lines.join('\n');
}

/**
 * Resolves a list of lessons into the requested language.
 * Uses Firestore/local cache immediately and translates uncached lessons with bounded concurrency.
 */
export async function resolveLessonsForLanguage(
  lessons: LessonData[],
  lang: ManualLanguage,
  onProgress?: (completed: number, total: number, currentTitle: string) => void,
  signal?: AbortSignal
): Promise<{ lessons: LessonData[]; failedCount: number }> {
  if (lang === 'en') {
    return { lessons: lessons.map(formatLessonDivineWords), failedCount: 0 };
  }

  const results: LessonData[] = new Array(lessons.length);
  const uncachedIndices: number[] = [];
  let completed = 0;

  lessons.forEach((lesson, idx) => {
    const cached = getCachedTagalogLesson(lesson);
    if (cached) {
      results[idx] = cached;
      completed += 1;
    } else {
      uncachedIndices.push(idx);
    }
  });

  if (uncachedIndices.length === 0) {
    onProgress?.(lessons.length, lessons.length, '');
    return { lessons: results, failedCount: 0 };
  }

  let failedCount = 0;
  let pointer = 0;
  const concurrency = Math.min(3, uncachedIndices.length);

  const worker = async () => {
    while (pointer < uncachedIndices.length) {
      if (signal?.aborted) {
        throw new DOMException('Cancelled', 'AbortError');
      }
      const idx = uncachedIndices[pointer++];
      const sourceLesson = lessons[idx];
      onProgress?.(completed + 1, lessons.length, getSidebarLessonShortLabel(sourceLesson, 'fil'));
      try {
        results[idx] = await translateLessonToTagalog(sourceLesson, signal);
      } catch (err: any) {
        if (err?.name === 'AbortError' || signal?.aborted) {
          throw err;
        }
        failedCount += 1;
        results[idx] = sourceLesson;
      }
      completed += 1;
      onProgress?.(completed, lessons.length, getSidebarLessonShortLabel(sourceLesson, 'fil'));
    }
  };

  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  return { lessons: results, failedCount };
}
