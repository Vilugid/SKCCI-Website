const DIVINE_WORDS = ["god", "christ", "holy spirit", "jesus", "lord", "savior", "yahweh"];
const REGEX = new RegExp(`\\b(${DIVINE_WORDS.join('|')})\\b`, 'gi');

export const formatDivineWords = (text: string): string => {
  return text.replace(REGEX, (match) => match.toUpperCase());
};
