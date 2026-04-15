import { normalizeTag } from "./normalizeTag"
import { isValidTag } from "./isValidTag"

export function parseTags(text: string): string[] {
    const tags = text.split(",")

    const filteredTags = tags
        .map((tag) => normalizeTag(tag))
        .filter((tag) => isValidTag(tag))

    return filteredTags
}