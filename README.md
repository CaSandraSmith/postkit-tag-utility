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
// => ["can't", "won't"]

parseTags("coding,,typescript");
// => ["coding", "typescript"]

parseTags(123); 🤔 Seems like typescript will cantch this because your input type is string
// => []

parseTags(",coding, typescript,");
// => ["coding", "typescript"]

parseTags("***");
// => []
```

---

### `normalizeTag`
**Description:** Standardize case and whitespace.

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
// => "can't"

normalizeTag("***");
// => ""

normalizeTag("lot    of   space");
// => "lot of space"

normalizeTag("he,llo"); 🤔 This might cause problems. What if "Hi,mom!" we get Himom! bad user input creates a problem. 
// => "hello"

normalizeTag("HELLO");
// => "hello"

normalizeTag("hello");
// => "hello"

normalizeTag(123);
// => ""
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

removeDuplicateTags(["javascript", 123]);
// => ["javascript"]

removeDuplicateTags();
// => []

removeDuplicateTags(["JavaScript", "javascript"]);
// => ["javascript"]

removeDuplicateTags(["javascript", "javascript "]);
// => ["javascript"]
```

---

### `validateTag` 

🤔 This name sounds a little vague. removeDuplicateTags is very clear. Validate tag makes sense but, maybe could be clearer as something like: isValidTag?

**Description:** Return whether a tag follows your package rules.

**Input:**
- `tagStr` — a tag string

**Output:**
- A boolean

**Example:**
```js
validateTag("javascript");
// => true

validateTag("");
// => false
```

**Edge Cases**
```js
validateTag(123);
// => false

validateTag("this is tag");
// => true

validateTag("this is,tag");
// => false

validateTag("THIS IS TAG"); 🤔 If normalizing removes white space and lowercases this would pass. What are the rules here? Do we need to normalize before we validate or does validate nromalize? Thnk about and put that in the docs! 
// => false

validateTag("");
// => false

validateTag("   ");
// => false

validateTag("my tag!!");
// => false

validateTag("  tag "); 🤔 Same question, do we need to normalize first, or does normalize happen as part of validate? Make a decision and state it clearly! 
// => false
```

## Design Notes
**Strict type handling** — every function defensively handles non-string inputs like numbers, null, and undefined, returning a safe default like `[]`, `""`, or `false` instead of crashing.

**Comma as the standard delimiter** — `parseTags` uses commas to split input, and `normalizeTag` strips commas out of individual tags, so the two functions work consistently together.

**Lowercase as the standard** — normalization converts everything to lowercase, and validation rejects anything that isn't already lowercase, meaning the two functions are designed to be used together before storing or comparing tags.

**Whitespace is collapsed but spaces are allowed** — tags can contain spaces like `"web dev"`, but extra whitespace gets collapsed to a single space and trimmed, striking a balance between flexibility and cleanliness.

**Deduplication is case and whitespace aware** — `removeDuplicateTags` treats `"JavaScript"` and `"javascript"` as duplicates, and `"javascript"` and `"javascript "` as duplicates, meaning it expects normalized input or handles normalization itself.

**Special characters are stripped or rejected** — `normalizeTag` removes special characters silently, while `validateTag` rejects tags containing them, giving you flexibility depending on whether you want to clean input or enforce rules at the gate.
