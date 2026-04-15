import { normalizeTag } from "./normalizeTag";
import { isValidTag } from "./isValidTag";
/**
 * Ensure that all tags are unique
 * @param tagArr - an array of tag strings
 * @returns an array of unique tag strings
 * @example
 * removeDuplicateTags(["javascript", "coding", "javascript"]) // ["javascript", "coding"]
 * removeDuplicateTags(["javascript", "coding"]) // ["javascript", "coding"]
 */
export function removeDuplicateTags(tagArr = []) {
    const tagSet = new Set();
    tagArr.forEach((tag) => {
        const normalizedTag = normalizeTag(tag);
        if (isValidTag(normalizedTag)) {
            tagSet.add(normalizedTag);
        }
    });
    return Array.from(tagSet);
}
