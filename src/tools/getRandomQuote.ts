import { McpServer } from "@modelcontextprotocol/server";
import { getRandomQuoteInputSchema } from "../schemas/index.js";

export function registerGetRandomQuote(server: McpServer) {
  server.registerTool(
    "get_random_quote",
    {
      description: "Returns a random quote, optionally filtered by category",
      inputSchema: getRandomQuoteInputSchema,
    },
    async (input) => {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              { ok: true, stub: true, tool: "get_random_quote" },
              null,
              2
            ),
          },
        ],
      };
    }
  );
}