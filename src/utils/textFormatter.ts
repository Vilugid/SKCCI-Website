import type { LessonData } from '../lessonsData';

const ALWAYS_DIVINE_WORDS = [
  "Banal na Espiritu",
  "Espiritu Santo",
  "Holy Spirit(?:['\u2019]s)?",
  "Hesukristo",
  "Hesu-Kristo",
  "Jesucristo",
  "Jesus(?:['\u2019]s)?",
  "Christ(?:['\u2019]s)?",
  "Hesus",
  "Kristo",
  "Cristo",
  "Yahweh",
];
const ALWAYS_DIVINE_REGEX = new RegExp(`\\b(${ALWAYS_DIVINE_WORDS.join('|')})\\b`, 'gi');

// Capitalized divine titles (case-sensitive so lowercase common nouns like "false gods", "their gods", "kanilang mga diyos", or "willing spirit" are preserved)
const CAPITALIZED_DIVINE_WORDS = [
  "Savior-King",
  "Savior King",
  "God(?:['\u2019]s)?",
  "Lord(?:['\u2019]s)?",
  "Saviou?r(?:['\u2019]s)?",
  "Spirit(?:['\u2019]s)?",
  "Diyos(?!-[Dd]iyosan)",
  "Dios",
  "Panginoong",
  "Panginoon",
  "Tagapagligtas",
  "Espiritu",
];
const CAPITALIZED_DIVINE_REGEX = new RegExp(`\\b(${CAPITALIZED_DIVINE_WORDS.join('|')})\\b`, 'g');

export const formatDivineWords = (text: string): string => {
  if (!text) return text;
  return text
    .replace(ALWAYS_DIVINE_REGEX, (match) => match.toUpperCase())
    .replace(CAPITALIZED_DIVINE_REGEX, (match) => match.toUpperCase());
};

export function formatLessonDivineWords<T extends LessonData>(lesson: T): T {
  return {
    ...lesson,
    title: formatDivineWords(lesson.title),
    scriptureFocus: {
      ...lesson.scriptureFocus,
      text: formatDivineWords(lesson.scriptureFocus.text),
    },
    objectives: lesson.objectives.map(formatDivineWords),
    teachingSections: lesson.teachingSections.map((sec) => ({
      ...sec,
      title: formatDivineWords(sec.title),
      paragraphs: sec.paragraphs.map(formatDivineWords),
    })),
    reflectionQuestions: lesson.reflectionQuestions.map(formatDivineWords),
    prayer: formatDivineWords(lesson.prayer),
    challenge: formatDivineWords(lesson.challenge),
  };
}
