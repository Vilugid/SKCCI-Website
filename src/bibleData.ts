export const OT_BOOKS = [
  { name: 'Genesis', chapters: 50 },
  { name: 'Exodus', chapters: 40 },
  { name: 'Leviticus', chapters: 27 },
  { name: 'Numbers', chapters: 36 },
  { name: 'Deuteronomy', chapters: 34 },
  { name: 'Joshua', chapters: 24 },
  { name: 'Judges', chapters: 21 },
  { name: 'Ruth', chapters: 4 },
  { name: '1 Samuel', chapters: 31 },
  { name: '2 Samuel', chapters: 24 },
  { name: '1 Kings', chapters: 22 },
  { name: '2 Kings', chapters: 25 },
  { name: '1 Chronicles', chapters: 29 },
  { name: '2 Chronicles', chapters: 36 },
  { name: 'Ezra', chapters: 10 },
  { name: 'Nehemiah', chapters: 13 },
  { name: 'Esther', chapters: 10 },
  { name: 'Job', chapters: 42 },
  { name: 'Psalms', chapters: 150 },
  { name: 'Proverbs', chapters: 31 },
  { name: 'Ecclesiastes', chapters: 12 },
  { name: 'Song of Solomon', chapters: 8 },
  { name: 'Isaiah', chapters: 66 },
  { name: 'Jeremiah', chapters: 52 },
  { name: 'Lamentations', chapters: 5 },
  { name: 'Ezekiel', chapters: 48 },
  { name: 'Daniel', chapters: 12 },
  { name: 'Hosea', chapters: 14 },
  { name: 'Joel', chapters: 3 },
  { name: 'Amos', chapters: 9 },
  { name: 'Obadiah', chapters: 1 },
  { name: 'Jonah', chapters: 4 },
  { name: 'Micah', chapters: 7 },
  { name: 'Nahum', chapters: 3 },
  { name: 'Habakkuk', chapters: 3 },
  { name: 'Zephaniah', chapters: 3 },
  { name: 'Haggai', chapters: 2 },
  { name: 'Zechariah', chapters: 14 },
  { name: 'Malachi', chapters: 4 }
];

export const NT_BOOKS = [
  { name: 'Matthew', chapters: 28 },
  { name: 'Mark', chapters: 16 },
  { name: 'Luke', chapters: 24 },
  { name: 'John', chapters: 21 },
  { name: 'Acts', chapters: 28 },
  { name: 'Romans', chapters: 16 },
  { name: '1 Corinthians', chapters: 16 },
  { name: '2 Corinthians', chapters: 13 },
  { name: 'Galatians', chapters: 6 },
  { name: 'Ephesians', chapters: 6 },
  { name: 'Philippians', chapters: 4 },
  { name: 'Colossians', chapters: 4 },
  { name: '1 Thessalonians', chapters: 5 },
  { name: '2 Thessalonians', chapters: 3 },
  { name: '1 Timothy', chapters: 6 },
  { name: '2 Timothy', chapters: 4 },
  { name: 'Titus', chapters: 3 },
  { name: 'Philemon', chapters: 1 },
  { name: 'Hebrews', chapters: 13 },
  { name: 'James', chapters: 5 },
  { name: '1 Peter', chapters: 5 },
  { name: '2 Peter', chapters: 3 },
  { name: '1 John', chapters: 5 },
  { name: '2 John', chapters: 1 },
  { name: '3 John', chapters: 1 },
  { name: 'Jude', chapters: 1 },
  { name: 'Revelation', chapters: 22 }
];

export interface DailyReading {
  day: number;
  ot: string;
  nt: string;
}

export const generate365Plan = (): DailyReading[] => {
  const plan: DailyReading[] = [];
  
  // Flatten all chapters
  const allOT: string[] = [];
  OT_BOOKS.forEach(book => {
    for (let i = 1; i <= book.chapters; i++) {
      allOT.push(`${book.name} ${i}`);
    }
  }); // 929 chapters
  
  const allNT: string[] = [];
  NT_BOOKS.forEach(book => {
    for (let i = 1; i <= book.chapters; i++) {
      allNT.push(`${book.name} ${i}`);
    }
  }); // 260 chapters
  
  // Distribute OT: 929 / 365 = 2.54. 
  // We'll give 3 chapters to 199 days, 2 chapters to 166 days.
  let otIndex = 0;
  let ntIndex = 0;
  
  for (let day = 1; day <= 365; day++) {
    // OT
    const numOT = day <= 199 ? 3 : 2;
    const otChaptersForDay = [];
    for (let i = 0; i < numOT; i++) {
      if (otIndex < allOT.length) {
        otChaptersForDay.push(allOT[otIndex]);
        otIndex++;
      }
    }
    
    // Format OT string compactly e.g. "Genesis 1-3" or "Genesis 50, Exodus 1"
    let otStr = "";
    if (otChaptersForDay.length > 0) {
      // Very basic formatting
      const first = otChaptersForDay[0];
      const last = otChaptersForDay[otChaptersForDay.length - 1];
      const firstBook = first.substring(0, first.lastIndexOf(' '));
      const lastBook = last.substring(0, last.lastIndexOf(' '));
      if (firstBook === lastBook) {
        const firstCh = first.substring(first.lastIndexOf(' ') + 1);
        const lastCh = last.substring(last.lastIndexOf(' ') + 1);
        if (firstCh !== lastCh) {
          otStr = `${firstBook} ${firstCh}-${lastCh}`;
        } else {
          otStr = first;
        }
      } else {
        // spans books
        const firstCh = first.substring(first.lastIndexOf(' ') + 1);
        const lastCh = last.substring(last.lastIndexOf(' ') + 1);
        otStr = `${firstBook} ${firstCh} - ${lastBook} ${lastCh}`;
      }
    }
    
    // NT
    // We will just read 1 NT chapter per day. When we hit 260, we just loop back to Matthew!
    let ntStr = "";
    if (ntIndex >= allNT.length) {
      ntIndex = 0; // loop back
    }
    ntStr = allNT[ntIndex];
    ntIndex++;
    
    plan.push({
      day,
      ot: otStr,
      nt: ntStr
    });
  }
  
  return plan;
};

export const BIBLE_PLAN_365_FULL = generate365Plan();
