import { normalizeTag } from "./normalizeTag"

export function isValidTag(tagStr: string): boolean {
    const normalizedTag = normalizeTag(tagStr)
    return normalizedTag.length > 0 && normalizedTag.length <= 20
}