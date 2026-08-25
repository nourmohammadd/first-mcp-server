# Final Reflection — first-mcp-server (Quote of the Day MCP)

## What I shipped
Over 6 weeks, I built a TypeScript MCP server with 5 fully working tools 
(`get_quote_of_the_day`, `get_random_quote`, `search_quotes`, `get_quote_by_author`, 
`list_categories`), all reading real data from a local JSON fixture. Along the way 
I wrote a threat model, hardened input validation with Zod, added path traversal 
protection and a host allowlist, wrote a full test plan (9/9 cases passing), 
rewrote the README so a stranger could set it up in ~5 minutes (verified by a 
peer), connected the server to Claude Desktop, tagged a public v1.0.0 release, 
and prepared a timed demo script and slide deck.

## What was genuinely hard
- **The SDK migration in Week 2** — moving from `@modelcontextprotocol/sdk` to 
  `@modelcontextprotocol/server` and rebuilding the server around `createServer()` 
  + `serveStdio` instead of the old transport pattern took real debugging.
- **Connecting to Claude Desktop in Week 5** — the server showed "failed / Server 
  disconnected" because `process.cwd()` resolved to `C:\Windows\System32` instead 
  of the repo root when launched by Claude Desktop's wrapped command on Windows. 
  I fixed it by resolving the data path from the module's own location 
  (`import.meta.url`) instead of `process.cwd()`.
- **Git branch discipline** — early on I accidentally branched Week 3 work off 
  `main` (which was still on Week 1 code) instead of the latest working branch, 
  and lost a session's worth of work until I re-branched correctly.

## Resume bullet
Built and shipped a TypeScript Model Context Protocol (MCP) server with 5 tools, 
Zod-validated inputs, and a documented threat model; connected it to Claude 
Desktop, tagged a public v1.0.0 release on GitHub, and passed a 9-case manual 
test plan with peer-reviewed hardening and a stranger-tested README.

## LinkedIn draft
ust wrapped up a 6-week MCP Academy cohort building a Model Context Protocol
(MCP) server from scratch in TypeScript — a "Quote of the Day" server with 5
tools (search, random quote, author lookup, category listing, and more).

Along the way I learned to write a threat model, harden input validation with
Zod, protect against path traversal, connect a local server to Claude Desktop,
and ship a tested, documented, publicly tagged v1.0.0 release.

Biggest lesson: the last 20% (real data, real hardening, real docs, a real
peer-tested README) takes as much care as the first 80% — and it's the part
that actually makes a project usable by someone other than you.

#MCP #TypeScript #AI #ModelContextProtocol


## One thing I'd improve in the next two weeks
Add write operations (add/update/delete quotes) as new MCP tools with proper 
validation and audit logging, and expose `data/quotes.json` as a read-only MCP 
Resource so the model can read it without a tool call — both were deferred from 
earlier weeks due to time constraints.