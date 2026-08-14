# Manual Test Plan — first-mcp-server

| id | tool | setup | input | expected | result | evidence |
|---|---|---|---|---|---|---|
| T1 | get_quote_of_the_day | fixture has 16 quotes | `{}` | Returns one real quote (deterministic by date) | | |
| T2 | get_random_quote | fixture has 16 quotes | `{ "category": "success" }` | Returns a real quote in the "success" category | | |
| T3 | get_random_quote | fixture has 16 quotes | `{ "category": "doesnotexist" }` | Returns "No quotes found for category..." message, not a crash | | |
| T4 | search_quotes | fixture has 16 quotes | `{ "keyword": "success", "limit": 5 }` | Returns array of matching quotes, count ≤ 5 | | |
| T5 | search_quotes | fixture has 16 quotes | `{ "keyword": "   " }` | Rejected by Zod — "Too small: expected string to have >=1 characters" | | |
| T6 | get_quote_by_author | fixture has 16 quotes | `{ "author": "Maya Angelou" }` | Returns quotes by that author, or "No quotes found" if none exist | | |
| T7 | get_quote_by_author | fixture has 16 quotes | `{ "author": "" }` | Rejected by Zod — empty string not allowed | | |
| T8 | list_categories | fixture has 16 quotes | `{}` | Returns sorted array of distinct categories | | |
| T9 | search_quotes | data/quotes.json temporarily emptied to `[]` | `{ "keyword": "success" }` | Returns "No quotes found matching..." — no crash on empty fixture | | |
| T10 | search_quotes (simulated timeout) | N/A — no network calls in current tools | N/A | Documented as N/A: no tool currently performs network I/O; `fetchJson`'s `AbortSignal.timeout(8000)` will be exercised once a network-based tool is added | | |

## Notes
- T9 requires temporarily backing up `data/quotes.json`, replacing its content with `[]`, running the test, then restoring the original file before continuing.
- T10 is marked N/A because no P0 tool currently calls `fetchJson`; the timeout mechanism itself is implemented and covered by code review, not a live Inspector run.