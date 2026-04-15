import { describe, it, expect } from 'vitest'
import {removeDuplicateTags} from "../src"

describe('removeDuplicateTags', () => {
  it('removes duplicate tags', () => {
    expect(removeDuplicateTags(["javascript", "coding", "javascript"])).toEqual(["javascript", "coding"])
  })

  it('removes duplicate tags - case insensitive', () => {
    expect(removeDuplicateTags(["JavaScript", "javascript"])).toEqual(["javascript"])
  })

  it("removes invalid tags", () => {
    expect(removeDuplicateTags(["javascript javascript javascript javascript"])).toEqual([])
  })
})