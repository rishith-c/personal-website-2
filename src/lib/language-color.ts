/**
 * GitHub-ish language colors. Used as a 6px dot beside each row's language.
 * Kept here so both the index list and any language filter stay in sync.
 */
export const LANGUAGE_COLOR: Record<string, string> = {
  Swift: "#F05138",
  TypeScript: "#3178C6",
  JavaScript: "#F1E05A",
  Python: "#3572A5",
  C: "#555555",
  "C++": "#F34B7D",
  Java: "#B07219",
  Kotlin: "#A97BFF",
  Go: "#00ADD8",
  Rust: "#DEA584",
  HTML: "#E34C26",
  CSS: "#563D7C",
  Shell: "#89E051",
  Vue: "#41B883",
  Dart: "#00B4AB",
  Ruby: "#CC342D",
  "Objective-C": "#438EFF",
  Lua: "#000080",
};

export const FALLBACK_LANG_COLOR = "#9CA3AF";

export function colorForLanguage(language: string | null): string {
  if (!language) return FALLBACK_LANG_COLOR;
  return LANGUAGE_COLOR[language] ?? FALLBACK_LANG_COLOR;
}
