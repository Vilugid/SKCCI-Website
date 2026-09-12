export type TabItem = 'Home' | 'Welcome Kit' | 'Gospel' | 'Manuals' | '100 Days Bible Plan' | '365 Bible Reading Guide' | 'Cell Group' | 'Leader Tools' | 'Formal Education' | 'Events' | 'Prayer Hub' | 'Giving' | 'Contact';

export interface GospelCard {
  id: string;
  word: string;
  explanation: string;
}

export interface BiblePlanDay {
  day: number;
  book: string;
  chapter: number;
}

export type ReadingPlanId = 'plan_100' | 'plan_365';

export interface StreakHistoryItem {
  date: string; // YYYY-MM-DD
  status: 'completed' | 'shield_used' | 'missed';
  dayNumber?: number;
}

export interface UserReadingStreak {
  userId: string;
  planId: ReadingPlanId;
  currentStreak: number;
  longestStreak: number;
  shieldsAvailable: number;
  lastCompletedDate: string | null;
  completedDays: number[];
  history: StreakHistoryItem[];
  updatedAt?: any;
}

export interface BibleStudyAnswers {
  whoIsGod: string;
  promises: string;
  commands: string;
  examples: string;
  warnings: string;
  sins: string;
  others: string;
}

export interface ScriptureReflection {
  userId: string;
  date: string;
  year: number;
  whoIsGod?: string;
  promises?: string;
  commands?: string;
  examples?: string;
  warnings?: string;
  sins?: string;
  others?: string;
  note?: string; // legacy support
  passageTitle: string;
  createdAt: number;
  updatedAt: number;
}

export interface HundredDaysReflection {
  userId: string;
  day: number;
  chapterScripture: string;
  whoIsGod?: string;
  promises?: string;
  commands?: string;
  examples?: string;
  warnings?: string;
  sins?: string;
  others?: string;
  note?: string; // legacy support
  dateCompleted?: string;
  createdAt: number;
  updatedAt: number;
}
