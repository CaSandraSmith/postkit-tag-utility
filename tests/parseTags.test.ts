import { describe, it, expect } from 'vitest'
import { parseTags } from "../src"

describe('parseTags', () => {
  it('turns string of valid tags into an array of tags', () => {
    expect(parseTags("hello, world")).toEqual(["hello", "world"])
  })

  it('correctly proccess tags with extra commas', () => {
    expect(parseTags("coding,,typescript")).toEqual(["coding", "typescript"])
  })

  it("removes invalid tags", () => {
    expect(parseTags("javascript, ***, coding")).toEqual(["javascript", "coding"])
  })
})