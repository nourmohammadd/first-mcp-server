# First MCP Server — Quote of the Day

## Description

This is a **Model Context Protocol (MCP) server** built with TypeScript that serves quotes 
through 5 registered tools. It reads from a local JSON fixture, validates all input with 
Zod, and communicates over **stdio**. Built and tested using **MCP Inspector**.

---

## Academy

This project is part of the MCP Academy training program:

https://nextflows.ai/

Mentor: Mohammad Jaradat

---

## Purpose

Learn the fundamentals of building a real MCP server: registering multiple tools, wiring 
them to real data, validating input with Zod, hardening against common risks (path 
traversal, SSRF, unvalidated input), and following a security-first development process.

---

## Features

- 5 MCP tools registered and fully implemented (see below)
- Real data served from a local fixture (`data/quotes.json`) — no external API dependency
- Input validation on every tool using Zod (min/max length, trim, type checks)
- Path traversal protection on all file reads (`resolveDataPath`)
- Host allowlist + timeout on the shared fetch helper (for future API-based tools)
- No secrets in the repo — `.gitignore` excludes `.env*`, `.env.example` documents expected variables
- Communication over stdio transport
- Compatible with MCP Inspector
- Managed using Git and GitHub, with peer-reviewed hardening PR

---

## Technologies

- Node.js
- TypeScript
- `@modelcontextprotocol/server` SDK
- Zod
- MCP Inspector

---

## Project Structure
first-mcp-server/
│
├── src/
│ ├── index.ts # createServer() factory + serveStdio entry point
│ ├── lib/
│ │ ├── quotes.ts # pure functions: load/filter/search quotes
│ │ └── http.ts # shared fetchJson helper (timeout + host allowlist)
│ ├── schemas/
│ │ └── index.ts # Zod input schemas for every tool
│ └── tools/
│ ├── getQuoteOfTheDay.ts
│ ├── getRandomQuote.ts
│ ├── searchQuotes.ts
│ ├── getQuoteByAuthor.ts
│ └── listCategories.ts
│
├── data/
│ └── quotes.json # local fixture — quote bank (source of truth)
│
├── docs/
│ ├── project-choice.md
│ ├── design.md # tool inventory, priorities (P0/P1)
│ ├── data-plan.md # per-tool data source, fixture path, failure modes
│ ├── threat-model.md # assets, trust boundaries, top risks, mitigations
│ └── review-checklist.md # peer review notes + action items
│
├── examples/ # one sample input JSON per tool
├── SECURITY.md # how to report issues, what's hardened
├── package.json
├── package-lock.json
├── tsconfig.json
├── .gitignore
├── .env.example
└── README.md

---

## Installation

Clone the repository:

```bash
git clone https://github.com/nourmohammadd/first-mcp-server.git
cd first-mcp-server
```

Check out the latest working branch (until merged to `main`):

```bash
git checkout week-4-harden
```

Install dependencies:

```bash
npm install
```

---

## Running the Project

Dev mode:

```bash
npm run dev
```

You should see: first-mcp-server MCP server running on stdio
---

## Testing with MCP Inspector

```bash
npx @modelcontextprotocol/inspector npx tsx src/index.ts
```

Then open the URL printed in the terminal, click **Connect**, and go to the **Tools** tab.

1. Select a tool from the list.
2. Fill in a valid sample input (see `examples/<tool_name>.json` for a starting point).
3. Click **Run Tool** and check the response.
4. Try an invalid input (e.g. empty `keyword`) to confirm Zod rejects it cleanly.

---

## Available Tools

### `get_quote_of_the_day()`
Returns a deterministic "quote of the day" based on the current date.

### `get_random_quote(category?)`
Returns a random quote, optionally filtered by category.

### `search_quotes(keyword, limit?)`
Returns quotes whose text or author matches the given keyword (max 20 results).

### `get_quote_by_author(author)`
Returns all quotes by a given author.

### `list_categories()`
Returns the list of all distinct quote categories in the fixture.

All tools read from `data/quotes.json` via pure functions in `src/lib/quotes.ts`, 
separated from tool registration in `src/tools/`.

---

## Security

See [`SECURITY.md`](./SECURITY.md) and [`docs/threat-model.md`](./docs/threat-model.md) 
for the full threat model and hardening details. Summary:

- File reads restricted to `./data` (path traversal protection)
- All tool inputs validated with Zod (length caps, trimming, type checks)
- Network calls (when used) go through an explicit host allowlist with an 8s timeout
- No secrets in the repo or git history
- Error messages returned to the model are short and generic; details are logged to stderr only

---

## Learning Outcomes

Through this project, I learned:

- The basics of Model Context Protocol (MCP) and how servers/tools are structured
- How to register multiple tools with `registerTool` and separate pure logic from registration
- How to validate inputs using Zod schemas
- How to wire real data (local fixtures) into tool handlers safely
- How to write a threat model and apply concrete mitigations (allowlists, path checks, timeouts)
- How to test MCP servers using MCP Inspector, including deliberately triggering failures
- How to manage a multi-week project using Git branches, PRs, and peer code review

---

## Project Progress

- **Week 2** — Registered all 5 planned tools as stubs; verified discoverability in Inspector.
- **Week 3** — Wired 3 P0 tools to real data from `data/quotes.json`; documented the data plan.
- **Week 4** — Wrote a threat model, added input validation hardening (trim, length caps), 
  a host allowlist for future network calls, `SECURITY.md`, and completed a peer code review.

Run in dev mode:
```bash
npm run dev
```

---

## Repository

https://github.com/nourmohammadd/first-mcp-server

---

## Author

Nour Mohammad