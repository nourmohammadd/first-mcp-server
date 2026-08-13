import { McpServer } from "@modelcontextprotocol/server";
import { getQuoteByAuthorInputSchema } from "../schemas/index.js";
import { getQuoteByAuthor } from "../lib/quotes.js";

export function registerGetQuoteByAuthor(server: McpServer) {
  server.registerTool(
    "get_quote_by_author",
    {
      description: "Returns quotes from a specific author",
      inputSchema: getQuoteByAuthorInputSchema,
    },
    async (input) => {
      const quotes = getQuoteByAuthor(input.author);

      if (quotes.length === 0) {
        console.error(`[get_quote_by_author] no quotes found for author "${input.author}"`);
        return {
          content: [
            {
              type: "text",
              text: `No quotes found for author "${input.author}".`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(quotes, null, 2),
          },
        ],
      };
    }
  );
}