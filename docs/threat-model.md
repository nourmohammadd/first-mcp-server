# Threat Model — first-mcp-server (Quote MCP)

## Assets
- `./data/quotes.json` — the only data file the server reads. No user data, no PII.
- Filesystem of the host machine running the server (via Node's `fs` module).
- No API keys or tokens exist in this project — all data is local, no external auth.

## Trust Boundaries
- **Model → tool arguments**: every tool call (`category`, `keyword`, `limit`, `author`) comes from the model, not a human. Treated as untrusted input.
- **Tool → filesystem**: `src/lib/quotes.ts` reads `data/quotes.json` using a filename passed to `resolveDataPath()`.
- **Tool → network**: not used yet by any P0 tool (all data is local). `src/lib/http.ts` exists as a shared helper for future API tools, but no tool calls it currently.

## Top 5 Risks
1. **Path traversal on file reads** — if a filename ever became attacker-influenced, a value like `../../etc/passwd` could escape `./data`.
2. **Malformed or oversized fixture data** — a corrupted or huge `quotes.json` could crash the server or flood the model's context with output.
3. **Unvalidated tool arguments** — a keyword, category, or limit value that isn't checked could cause unexpected filtering behavior or errors.
4. **Future SSRF if `fetchJson` is wired to an external API** — without a domain allowlist, a tool could be pointed at an internal/unexpected URL.
5. **Verbose error messages leaking internal details** — a stack trace or full file path returned to the model could expose server internals unnecessarily.

## Mitigations This Week
1. Path traversal → `resolveDataPath()` in `src/lib/quotes.ts` resolves the path and rejects anything that escapes the `./data` directory.
2. Malformed/oversized data → Zod schema (`quotesFileSchema`) validates the fixture on every read; invalid data returns `[]` instead of crashing. `search_quotes` already caps `limit` at 20 via the input schema.
3. Unvalidated arguments → every tool has a Zod `inputSchema` (`src/schemas/index.ts`) that rejects bad input (missing/short strings, out-of-range numbers) before the handler runs.
4. Future SSRF → add a domain allowlist check inside `fetchJson` (`src/lib/http.ts`) before any tool is wired to use it, so only approved hosts can be requested.
5. Error message leakage → keep detailed errors in `console.error` (stderr) only; return short, generic user-facing strings from tool handlers (e.g. "No quotes found matching...") with no file paths or stack traces.

## Out of Scope
- Authentication/authorization — not applicable, single-user local MCP server for a class project, no multi-tenant access.
- Rate limiting — not needed since there's no external API and no shared server exposure.
- Encryption at rest — the only data is public quote text, no sensitive data to protect.