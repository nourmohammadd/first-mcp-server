# Data Plan — Week 3

| Tool | Source | Fixture Path | Auth | Failure Modes | Example Response |
|---|---|---|---|---|---|
| get_quote_of_the_day | Local fixture (deterministic pick based on day of year) | `./data/quotes.json` | none | empty file, malformed JSON | `{ "id": 3, "quote": "Don't watch the clock; do what it does. Keep going.", "author": "Sam Levenson", "category": "motivation" }` |
| get_random_quote | Local fixture, optional `category` filter | `./data/quotes.json` | none | empty file, no quotes match given category | `{ "id": 2, "quote": "Success is where preparation and opportunity meet.", "author": "Bobby Unser", "category": "success" }` |
| search_quotes | Local fixture, keyword match on quote text/author | `./data/quotes.json` | none | empty file, keyword matches zero quotes, limit out of range | `{ "results": [ { "id": 5, "quote": "The only way to do great work is to love what you do.", "author": "Steve Jobs", "category": "success" } ], "count": 1 }` |

## Notes
- No external API used this cohort — Quotable.io has a history of intermittent downtime, so all P0 tools read from `./data/quotes.json` to guarantee Demo Day works offline.
- Rate limits: N/A (local file read).
- get_quote_by_author / list_categories (P1) will also read the same fixture in a later pass.