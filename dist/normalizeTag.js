/**
 * Standardize case, whitespace, and special characters of a tag
 * @param tagStr - The tag string to normalize
 * @returns a cleaned tag string
 * @example
 * normalizeTag("  JavaScript  ") // "javascript"
 * normalizeTag("can't") // "cant"
 */
export function normalizeTag(tagStr) {
    let returnStrArr = tagStr.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(" ");
    return returnStrArr.reduce((accumulator, currentValue) => {
        if (!accumulator.length)
            return accumulator + currentValue;
        if (currentValue.length)
            return accumulator + " " + currentValue;
        else
            return accumulator;
    }, "");
}
