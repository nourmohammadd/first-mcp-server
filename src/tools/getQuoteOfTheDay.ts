import { McpServer } from "@modelcontextprotocol/server";
import { getQuoteOfTheDayInputSchema } from "../schemas/index.js";
import { getQuoteOfTheDay } from "../lib/quotes.js";

export function registerGetQuoteOfTheDay(server: McpServer) {
  server.registerTool(
    "get_quote_of_the_day",
    {
      description: "Returns today's featured quote",
      inputSchema: getQuoteOfTheDayInputSchema,
    },
    async () => {
      const quote = getQuoteOfTheDay();

      if (!quote) {
        console.error("[get_quote_of_the_day] no quotes available");
        return {
          content: [{ type: "text", text: "No quotes available right now." }],
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