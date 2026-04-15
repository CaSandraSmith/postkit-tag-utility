import { normalizeTag } from "./normalizeTag";
import { isValidTag } from "./isValidTag";
/**
 * Splits raw input into usable tags
 * @param text - The text to split into tags
 * @returns an array of tag strings
 * @example
 * parseTags("javascript, web dev, coding") // ["javascript", "web dev", "coding"]
 * parseTags("javascript, ***, coding") // ["javascript", "coding"]
 */
export function parseTags(text) {
    const tags = text.split(",");
    const filteredTags = tags
        .map((tag) => normalizeTag(tag))
        .filter((tag) => isValidTag(tag));
    return filteredTags;
}
