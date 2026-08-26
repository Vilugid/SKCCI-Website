import { BiblePlanDay, GospelCard } from './types';

export const GOSPEL_CARDS: GospelCard[] = [
  { id: 'wages', word: 'Wages', explanation: 'Something we earn or deserve' },
  { id: 'sin', word: 'Sin', explanation: 'The nature of human, not just sinful actions' },
  { id: 'death', word: 'Death', explanation: 'In the Bible, it means separation' },
  { id: 'but', word: 'BUT', explanation: 'There is Hope' },
  { id: 'gift', word: 'Gift', explanation: 'Opposite of wages. Given freely out of love' },
  { id: 'god', word: 'GOD', explanation: 'The only One who can give this Gift' },
  { id: 'eternal_life', word: 'Eternal Life', explanation: 'To be with God in heaven forever' },
  { id: 'jesus_christ', word: 'JESUS CHRIST', explanation: 'The Son of God and the only One who can and is willing to pay for our sins' },
  { id: 'lord_confession', word: 'Lord by Confession', explanation: 'Proclaiming that we are sinners, we cannot save ourselves, and only JESUS can save us' },
  { id: 'lord_surrender', word: 'Lord by Surrender', explanation: 'Accepting JESUS as the primary authority in our lives' },
];

const generatePlan = (): BiblePlanDay[] => {
  const plan: BiblePlanDay[] = [];
  let day = 1;

  const addBooks = (book: string, chapters: number) => {
    for (let i = 1; i <= chapters; i++) {
      plan.push({ day, book, chapter: i });
      day++;
    }
  };

  addBooks('1 John', 5);
  addBooks('John', 21);
  addBooks('Matthew', 28);
  addBooks('Mark', 16);
  addBooks('Luke', 24);
  addBooks('Acts', 6);

  return plan;
};

export const BIBLE_PLAN = generatePlan();

const generate365Plan = (): BiblePlanDay[] => {
  const plan: BiblePlanDay[] = [];
  let day = 1;

  const addBooks = (book: string, chapters: number) => {
    for (let i = 1; i <= chapters; i++) {
      if (day > 365) break;
      plan.push({ day, book, chapter: i });
      day++;
    }
  };

  addBooks('Genesis', 50);
  addBooks('Exodus', 40);
  addBooks('Leviticus', 27);
  addBooks('Numbers', 36);
  addBooks('Deuteronomy', 34);
  addBooks('Joshua', 24);
  addBooks('Judges', 21);
  addBooks('Ruth', 4);
  addBooks('1 Samuel', 31);
  addBooks('2 Samuel', 24);
  addBooks('1 Kings', 22);
  addBooks('2 Kings', 25);
  addBooks('1 Chronicles', 29);
  
  // Pad with Psalms just in case we didn't hit 365 yet
  while (day <= 365) {
    plan.push({ day, book: 'Psalms', chapter: day - 365 + 150 });
    day++;
  }

  return plan;
};

export const BIBLE_PLAN_365 = generate365Plan();
