import { McpServer } from "@modelcontextprotocol/server";
import { getRandomQuoteInputSchema } from "../schemas/index.js";
import { getRandomQuote } from "../lib/quotes.js";

export function registerGetRandomQuote(server: McpServer) {
  server.registerTool(
    "get_random_quote",
    {
      description: "Returns a random quote, optionally filtered by category",
      inputSchema: getRandomQuoteInputSchema,
    },
    async (input) => {
      const quote = getRandomQuote(input.category);

      if (!quote) {
        console.error(
          `[get_random_quote] no quotes found for category "${input.category ?? "any"}"`
        );
        return {
          content: [
            {
              type: "text",
              text: `No quotes found${input.category ? ` for category "${input.category}"` : ""}.`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(quote, null, 2),
          },
        ],
      };
    }
  );
}