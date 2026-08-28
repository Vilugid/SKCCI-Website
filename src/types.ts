export type TabItem = 'Home' | 'Welcome Kit' | 'Gospel' | 'Manuals' | '100 Days Bible Plan' | '365 Bible Reading Guide' | 'Cell Group' | 'Leader Tools' | 'Events' | 'Prayer Hub' | 'Giving' | 'Contact';

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
