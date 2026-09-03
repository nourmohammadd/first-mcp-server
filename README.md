# First MCP Server — Quote of the Day

Part of the [NextFlows MCP Academy](https://nextflows.ai/) training program.

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


See [`examples/conversations.md`](./examples/conversations.md) for example 
conversations showing how a user might interact with this server.

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

## Connect to Claude Desktop

Add this to your `claude_desktop_config.json` (Claude Desktop → Settings → 
Developer → Edit Config), replacing the paths with your own absolute repo path:

\`\`\`json
{
  "mcpServers": {
    "first-mcp-server": {
      "command": "npx.cmd",
      "args": ["-y", "tsx", "C:\\\\Users\\\\YOUR_USERNAME\\\\path\\\\to\\\\first-mcp-server\\\\src\\\\index.ts"],
      "cwd": "C:\\\\Users\\\\YOUR_USERNAME\\\\path\\\\to\\\\first-mcp-server"
    }
  }
}
\`\`\`

On macOS, use `"command": "npx"` and forward slashes in the paths instead.

**Windows note:** use an absolute path to `index.ts` in `args` rather than the 
relative `src/index.ts` — some Windows setups launch the process via a wrapped 
shell command where `cwd` isn't reliably applied to module resolution. 
`src/lib/quotes.ts` resolves the data folder from its own module location 
(not `process.cwd()`) for the same reason, so it works regardless of the 
working directory the process is launched from.

Fully quit and reopen Claude Desktop after saving (config is only read at 
startup). Your tools should then appear under the tools icon next to the 
message box in a new chat. Try asking: "List all the quote categories you have."

### Security
See [`SECURITY.md`](./SECURITY.md) and [`docs/threat-model.md`](./docs/threat-model.md) 
for the full threat model and hardening details.

### Academy
Part of the MCP Academy training program: https://nextflows.ai/
Mentor: Mohammad Jaradat

### Author
Nour Mohammad