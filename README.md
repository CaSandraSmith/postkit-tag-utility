# Package Name: postkit-tag-utility

## Purpose
This library takes raw text input and turns it into clean, consistent tags by handling all the parsing, normalizing, deduplication, and validation of data automatically.

## Exports

### `parseTags`
**Description:** Split raw input into usable tags.

**Input:**
- `text` — a text string

**Output:**
- An array of tag strings

**Example:**
```js
parseTags("javascript, web dev, coding");
// => ["javascript", "web dev", "coding"]
```

**Edge Cases**
```js
parseTags("  ");
// => []

parseTags("can't,won't");
// => ["cant", "wont"]

parseTags("coding,,typescript");
// => ["coding", "typescript"]

parseTags(",coding, typescript,");
// => ["coding", "typescript"]

parseTags("***");
// => []

parseTags("javascript, ***, coding");
// => ["javascript", "coding"]

parseTags("javascript, jffffffffffffffffffffffavascript")
// => ["javascript"]
```

---

### `normalizeTag`
**Description:** Standardize case, whitespace, and special characters

**Input:**
- `tagStr` — a tag string

**Output:**
- A cleaned tag string

**Example:**
```js
normalizeTag("  JavaScript  ");
// => "javascript"
```

**Edge Cases**
```js
normalizeTag("can't");
// => "cant"

normalizeTag("***");
// => ""

normalizeTag("lot    of   space");
// => "lot of space"

normalizeTag("HELLO");
// => "hello"

normalizeTag("hello");
// => "hello"
```

---

### `removeDuplicateTags`
**Description:** Keep tags unique while preserving usable order.

**Input:**
- `tagArr` — an array of tag strings

**Output:**
- An array of unique tag strings

**Example:**
```js
removeDuplicateTags(["javascript", "coding", "javascript"]);
// => ["javascript", "coding"]
```

**Edge Cases**
```js
removeDuplicateTags(["javascript", "coding"]);
// => ["javascript", "coding"]

removeDuplicateTags(["javascript"]);
// => ["javascript"]

removeDuplicateTags();
// => []

removeDuplicateTags(["JavaScript", "javascript"]);
// => ["javascript"]

removeDuplicateTags(["javascript", "javascript "]);
// => ["javascript"]

removeDuplicateTags(["javascript javascript javascript javascript"]);
// => []
```

---

### `isValidTag`
**Description:** Return whether a tag follows your package rules.

**Input:**
- `tagStr` — a tag string

**Output:**
- A boolean

**Example:**
```js
isValidTag("javascript");
// => true

isValidTag("");
// => false
```

**Edge Cases**
```js
isValidTag("this is tag");
// => true

isValidTag("this is,tag");
// => true

isValidTag("THIS IS TAG");
// => true

isValidTag("");
// => false

isValidTag("   ");
// => false

isValidTag("my tag!!");
// => true

isValidTag("  tag ");
// => true

isValidTag("123");
// => true

isValidTag("this is a very long tag that exceeds the limit");
// => false

isValidTag("a");
// => true
```

## Design Notes
**Strict type handling** — every function defensively handles non-string inputs like numbers, null, and undefined, returning a safe default like `[]`, `""`, or `false` instead of crashing.

**Comma as the standard delimiter** — `parseTags` uses commas to split input and is the only function that handles commas. By the time a tag reaches any other function, commas should already be gone.

**Lowercase as the standard** — all functions normalize to lowercase internally before doing their work, so input like `"THIS IS TAG"` is treated the same as `"this is tag"` across the entire library.

**Whitespace is collapsed but spaces are allowed** — tags can contain spaces like `"web dev"`, but extra whitespace gets collapsed to a single space and trimmed, striking a balance between flexibility and cleanliness.

**Deduplication is case and whitespace aware** — `removeDuplicateTags` normalizes each tag internally before comparing, so `"JavaScript"` and `"javascript"` and `"javascript "` are all treated as duplicates.

**Special characters including commas are always stripped** — all functions remove special characters internally before doing their work, so input like `"can't"` becomes `"cant"` and `"***"` becomes `""` consistently across the library.

**`parseTags` is the only entry point for raw user input** — `normalizeTag` expects an already-split tag and should never receive raw user input directly. Commas are handled exclusively by `parseTags` as a splitting character, so by the time a tag reaches `normalizeTag`, commas should already be gone.

**Tags have a 20 character limit** — `isValidTag` returns `false` for any tag exceeding 20 characters after normalization.

**`removeDuplicateTags` and `parseTags` uphold tag rules** - In addition to normalizing the tags, these functions uphold the character requirements of tags by calling `isValidTag` internally. Normalized tags that don't have any length or are over 20 characters are removed from the returned string arrays.