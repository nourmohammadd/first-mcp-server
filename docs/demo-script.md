# Demo Script — first-mcp-server (Quote of the Day MCP)

## 0:00–0:40 — The Problem
"Every AI assistant needs external context — data it doesn't already know. This 
project is a small, real example of that: an MCP server that gives an AI model 
live access to a quote database — search, filter by author, filter by category — 
instead of the model guessing or hallucinating quotes from memory."

## 0:40–1:10 — Architecture (one slide)
- TypeScript MCP server, stdio transport
- 5 tools, each backed by a pure function in `src/lib/quotes.ts`
- Data source: local JSON fixture (`data/quotes.json`) — no external API, 
  works offline
- Every input validated with Zod; file reads restricted to `./data` (no path 
  traversal); host allowlist + timeout ready for future network tools

## 1:10–3:30 — Live tool calls (via Claude Desktop or Inspector)

**Prompt 1** (from `examples/conversations.md`, Conversation A):
> "Give me today's quote."
→ Calls `get_quote_of_the_day`, returns a real quote deterministically picked 
by date.

**Prompt 2** (from `examples/conversations.md`, Conversation B):
> "Find me a quote about success."
→ Calls `search_quotes` with `{ "keyword": "success" }`, returns matching quotes.

**Backup prompt** (if either above fails or Wi-Fi/host connection breaks):
> "List all the quote categories you have."
→ Calls `list_categories` — no arguments needed, smallest and most reliable call.

## 3:30–4:30 — What I'd build next
- Write operations (add/update/delete quotes) as new tools, with proper 
  validation and audit logging
- MCP Resources — expose `data/quotes.json` as a read-only resource so the 
  model can read it without a tool call (deferred from Week 3, noted in 
  `docs/design.md`)
- A real external API option (e.g. Quotable) with a cached fixture fallback, 
  using the existing `fetchJson` allowlist + timeout helper
- Larger, more diverse quote fixture for richer search results

## 4:30–5:00 — Questions
Open floor. Have `docs/threat-model.md` and `SECURITY.md` open in case of 
security questions.

## Backup plan if Wi-Fi fails
Everything runs entirely offline: the server reads only from the local file 
`data/quotes.json`, no external API calls in any P0 tool. Run via Inspector 
(`npx @modelcontextprotocol/inspector npx tsx src/index.ts`) instead of Claude 
Desktop if needed — it works over localhost with no internet dependency.