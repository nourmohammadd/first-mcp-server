# First MCP Server — Quote of the Day

## What it does
An MCP server that serves quotes from a local fixture through 5 tools: get today's 
quote, get a random quote, search by keyword, get quotes by author, and list all 
categories. Built with TypeScript and the `@modelcontextprotocol/server` SDK. All 
input is validated with Zod, and the server communicates over stdio.

## Requirements
- Node.js 20+
- npm

## Install
```bash
git clone https://github.com/nourmohammadd/first-mcp-server.git
cd first-mcp-server
git checkout week-4-harden
npm install
```

## Run
```bash
npm run dev
```
You should see: first-mcp-server MCP server running on stdio
## Inspector command
```bash
npx @modelcontextprotocol/inspector npx tsx src/index.ts
```
Open the URL printed in the terminal, click **Connect**, then go to the **Tools** tab.

## Tools

| Tool | Description | Example input |
|---|---|---|
| `get_quote_of_the_day` | Returns a deterministic quote based on today's date | `{}` |
| `get_random_quote` | Returns a random quote, optionally filtered by category | `{ "category": "success" }` |
| `search_quotes` | Searches quotes by keyword in text or author (max 20 results) | `{ "keyword": "success", "limit": 5 }` |
| `get_quote_by_author` | Returns all quotes by a given author | `{ "author": "Maya Angelou" }` |
| `list_categories` | Returns all distinct categories in the fixture | `{}` |

## Example prompts
- "Give me today's quote."
- "Show me a random motivational quote."
- "Find quotes about success."

## Troubleshooting

**1. `ERR_MODULE_NOT_FOUND: @modelcontextprotocol/server`**
Run `npm install` before starting the server — dependencies aren't included in the repo.

**2. Inspector shows "Failed" / red connection status**
Make sure you ran `npm install` first, and that you're on the `week-4-harden` branch 
(`git branch` to check), since that's where `@modelcontextprotocol/server` was added.

**3. `search_quotes` or `get_quote_by_author` returns a validation error**
Required fields can't be empty or whitespace-only — `keyword` and `author` must be 
at least 1 character.

## License
MIT — student project, MCP Academy cohort (nextflows.ai).

---

## Additional Details

### Project Structure
first-mcp-server/
├── src/
│ ├── index.ts # createServer() factory + serveStdio entry point
│ ├── lib/
│ │ ├── quotes.ts # pure functions: load/filter/search quotes
│ │ └── http.ts # shared fetchJson helper (timeout + host allowlist)
│ ├── schemas/index.ts # Zod input schemas for every tool
│ └── tools/ # one file per tool (registration + handler)
├── data/quotes.json # local fixture — quote bank
├── docs/ # design, data-plan, threat-model, review-checklist
├── examples/ # sample input JSON per tool
├── SECURITY.md
└── README.md

### Testing
```bash
npm test
```
Runs smoke tests for the pure helper functions in `src/lib/quotes.ts`.

### Security
See [`SECURITY.md`](./SECURITY.md) and [`docs/threat-model.md`](./docs/threat-model.md) 
for the full threat model and hardening details.

### Academy
Part of the MCP Academy training program: https://nextflows.ai/
Mentor: Mohammad Jaradat

### Author
Nour Mohammad