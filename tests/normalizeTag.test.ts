import { describe, it, expect } from 'vitest'
import {isValidTag, normalizeTag, parseTags, removeDuplicateTags} from "../src"


describe('normalizeTag', () => {
  it('removes extra whitespace from a string', () => {
    expect(normalizeTag("extra   space")).toEqual("extra space")
  })

  it('makes all uppercase letters in a string lowercase', () => {
    expect(normalizeTag("HELLO")).toEqual("hello")
  })

  it("removes all punctation from a string", () => {
    expect(normalizeTag("hello!!!")).toEqual("hello")
  })

  it("will return empty string if input is only spaces", () => {
    expect(normalizeTag("     ")).toEqual("")
  })
})