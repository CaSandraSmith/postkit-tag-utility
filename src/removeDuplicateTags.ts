import { normalizeTag } from "./normalizeTag"
import { isValidTag } from "./isValidTag"

export function removeDuplicateTags(tagArr: string[] = []): string[] {
    const tagSet = new Set<string>()
    tagArr.forEach((tag) => {
        const normalizedTag = normalizeTag(tag)
        if (isValidTag(normalizedTag)) {
            tagSet.add(normalizedTag)
        }
    })

    return Array.from(tagSet)
}