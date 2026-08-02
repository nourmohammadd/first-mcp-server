import { McpServer } from "@modelcontextprotocol/server";
import { searchQuotesInputSchema } from "../schemas/index.js";
import { searchQuotes } from "../lib/quotes.js";

export function registerSearchQuotes(server: McpServer) {
  server.registerTool(
    "search_quotes",
    {
      description: "Searches quotes using keywords",
      inputSchema: searchQuotesInputSchema,
    },
    async (input) => {
      const results = searchQuotes(input.keyword, input.limit ?? 10);

      if (results.length === 0) {
        console.error(`[search_quotes] no matches for keyword "${input.keyword}"`);
        return {
          content: [
            { type: "text", text: `No quotes found matching "${input.keyword}".` },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ results, count: results.length }, null, 2),
          },
        ],
      };
    }
  );
}