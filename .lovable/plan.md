

# Fix Table Rendering in ProfessorMessage

## Problem Analysis

The AI is streaming tables with multiple rows "glued" together on single lines. Looking at your examples:

```
|---|---|---| | 1. Transaction Layer | Digital signatures & ownership chains | Proves who owns what...
```

The current preprocessing logic has two issues:

1. **The generic row fixer is too aggressive** — The regex `(\|)[ \t]+(\|)` matches any pipe-space-pipe pattern, which could incorrectly break content inside table cells
2. **Missing pattern for row endings** — We need to detect when a complete table row ends (closing `|`) and a new row begins (opening `|`)

## Solution

Rewrite the `preprocessContent` function with smarter regex patterns that:
- Detect complete row endings (content followed by `|`) before a new row starts (`| `)
- Handle the separator-to-data-row transition specifically
- Avoid breaking content within cells

## Technical Changes

### File: `src/components/professor-ai/ProfessorMessage.tsx`

Update the `preprocessContent` function (lines 43-62):

```typescript
const preprocessContent = (content: string): string => {
  let processed = content;
  
  // Step 1: Fix separator row glued to first data row
  // Pattern: |---|---|---| | Content | → split after separator
  // Matches: closing pipe of separator, spaces, opening pipe of data row
  processed = processed.replace(
    /(\|[-:\s]+\|)([ \t]+)(\|[^-])/g, 
    '$1\n$3'
  );
  
  // Step 2: Fix data rows glued together
  // Pattern: | Value1 | Value2 | | Next1 | Next2 |
  // Key insight: A row ends with "content |" and new row starts with "| content"
  // We need to find: | followed by space(s) followed by | followed by non-pipe content
  // This detects: "| | Next" where the middle part is row boundary
  processed = processed.replace(
    /(\|)([ \t]{2,})(\|[ \t]*[^|\-\s])/g,
    '$1\n$3'
  );
  
  // Step 3: More aggressive fix for remaining glued rows
  // Look for pattern: text | | text (row ending then row starting)
  // The double-space after closing pipe indicates row break
  processed = processed.replace(
    /([^|\n]\s*\|)([ \t]+)(\|[^|\-\n])/g,
    '$1\n$3'
  );
  
  // Step 4: Ensure blank line before table starts (for GFM parsing)
  processed = processed.replace(/([^\n])\n(\|[^\n]+\|)/g, '$1\n\n$2');
  processed = processed.replace(/(:)\n(\|)/g, '$1\n\n$2');
  
  return processed;
};
```

### Regex Breakdown

| Step | Pattern | Purpose |
|------|---------|---------|
| 1 | `(\|[-:\s]+\|)([ \t]+)(\|[^-])` | Splits separator `\|---\|` from data row `\| Content` |
| 2 | `(\|)([ \t]{2,})(\|[ \t]*[^|\-\s])` | Splits rows with 2+ spaces between them |
| 3 | `([^|\n]\s*\|)([ \t]+)(\|[^|\-\n])` | Catches "content \|  \| next" patterns |
| 4 | Existing | Ensures blank line before table for GFM |

### Why This Works

The key insight is that table rows have a specific pattern:
- **Row end**: `content |` (text followed by closing pipe)
- **Row start**: `| content` (opening pipe followed by text)

When rows are glued, we see: `content | | content` — the two pipes with spaces between them mark the boundary. The new regex looks for this specific pattern rather than any pipe-space-pipe sequence.

## Testing Strategy

After implementing, test with the exact examples you provided:
1. Tables with 4 columns where separator is glued to first row
2. Tables where multiple data rows are on the same line
3. Normal tables (should not be affected)

