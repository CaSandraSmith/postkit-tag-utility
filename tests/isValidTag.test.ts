import { describe, it, expect } from 'vitest'
import {isValidTag} from "../src"

describe('isValidTag', () => {
  it('returns true for valid string', () => {
    expect(isValidTag("hello world")).toEqual(true)
  })
  
  it('returns true for strings with valid content and punctuation', () => {
    expect(isValidTag("hello world!!!")).toEqual(true)
  })

  it('returns false for empty string', () => {
    expect(isValidTag("")).toEqual(false)
  })

  it("returns false for strings that are too long", () => {
    expect(isValidTag("hellohellohellohellohellohello")).toEqual(false)
  })

})