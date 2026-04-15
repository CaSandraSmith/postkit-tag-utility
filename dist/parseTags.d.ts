/**
 * Splits raw input into usable tags
 * @param text - The text to split into tags
 * @returns an array of tag strings
 * @example
 * parseTags("javascript, web dev, coding") // ["javascript", "web dev", "coding"]
 * parseTags("javascript, ***, coding") // ["javascript", "coding"]
 */
export declare function parseTags(text: string): string[];
