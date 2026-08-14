# Manual Test Plan — first-mcp-server

| id | tool | setup | input | expected | result | evidence |
|---|---|---|---|---|---|---|
| T1 | get_quote_of_the_day | fixture has 16 quotes | `{}` | Returns one real quote (deterministic by date) | PASS | Screenshot 1 |
| T2 | get_random_quote | fixture has 16 quotes | `{ "category": "success" }` | Returns a real quote in the "success" category | PASS | — |
| T3 | get_random_quote | fixture has 16 quotes | `{ "category": "doesnotexist" }` | Returns "No quotes found for category..." message, not a crash | PASS | Screenshot 3 |
| T4 | search_quotes | fixture has 16 quotes | `{ "keyword": "success", "limit": 5 }` | Returns array of matching quotes, count ≤ 5 | PASS | — |
| T5 | search_quotes | fixture has 16 quotes | `{ "keyword": "   " }` | Rejected by Zod — "Too small: expected string to have >=1 characters" | PASS | Screenshot 2 |
| T6 | get_quote_by_author | fixture has 16 quotes | `{ "author": "Maya Angelou" }` | Returns quotes by that author, or "No quotes found" if none exist | PASS | — |
| T7 | get_quote_by_author | fixture has 16 quotes | `{ "author": "" }` | Rejected by Zod — empty string not allowed | PASS | — |
| T8 | list_categories | fixture has 16 quotes | `{}` | Returns sorted array of distinct categories | PASS | — |
| T9 | search_quotes | data/quotes.json temporarily emptied to `[]` | `{ "keyword": "success" }` | Returns "No quotes found matching..." — no crash on empty fixture | PASS | Screenshot 3 (or separate) |
| T10 | search_quotes (simulated timeout) | N/A — no network calls in current tools | N/A | Documented as N/A: no tool currently performs network I/O; `fetchJson`'s `AbortSignal.timeout(8000)` will be exercised once a network-based tool is added | N/A | — |

## Summary
All 9 applicable test cases passed on first run — no bugs found, no fixes required.
T10 is marked N/A (no network-based tool exists yet to exercise the timeout path).

## Notes
- T9 required temporarily backing up `data/quotes.json`, replacing its content with `[]`, 
  running the test, then restoring the original file before continuing.