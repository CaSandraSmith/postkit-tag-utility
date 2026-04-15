import { normalizeTag } from "./normalizeTag";
/**
 * Return whether a tag follows package rules
 * @param tagStr - The tag string to check
 * @returns boolean that verifies if the tag passes the checks
 * @example
 * isValidTag("javascript") // true
 * isValidTag("") // false
 */
export function isValidTag(tagStr) {
    const normalizedTag = normalizeTag(tagStr);
    return normalizedTag.length > 0 && normalizedTag.length <= 20;
}
