import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";

import { registerGetQuoteOfTheDay } from "./tools/getQuoteOfTheDay.js";
import { registerGetRandomQuote } from "./tools/getRandomQuote.js";
import { registerSearchQuotes } from "./tools/searchQuotes.js";
import { registerGetQuoteByAuthor } from "./tools/getQuoteByAuthor.js";
import { registerListCategories } from "./tools/listCategories.js";

function createServer(): McpServer {
  const server = new McpServer({
    name: "first-mcp-server",
    version: "0.2.0",
  });

  registerGetQuoteOfTheDay(server);
  registerGetRandomQuote(server);
  registerSearchQuotes(server);
  registerGetQuoteByAuthor(server);
  registerListCategories(server);

  return server;
}

void serveStdio(createServer);
console.error("first-mcp-server MCP server running on stdio");