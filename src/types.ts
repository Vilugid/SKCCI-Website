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
