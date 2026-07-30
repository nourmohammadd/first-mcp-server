import { McpServer } from "@modelcontextprotocol/server";
import { getQuoteOfTheDayInputSchema } from "../schemas/index.js";

export function registerGetQuoteOfTheDay(server: McpServer) {
  server.registerTool(
    "get_quote_of_the_day",
    {
      description: "Returns today's featured quote",
      inputSchema: getQuoteOfTheDayInputSchema,
    },
    async () => {
      // Week 2: stub only — Week 3 replaces this with real data
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              { ok: true, stub: true, tool: "get_quote_of_the_day" },
              null,
              2
            ),
          },
        ],
      };
    }
  );
}