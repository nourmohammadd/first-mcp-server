import { McpServer } from "@modelcontextprotocol/server";
import { searchQuotesInputSchema } from "../schemas/index.js";

export function registerSearchQuotes(server: McpServer) {
  server.registerTool(
    "search_quotes",
    {
      description: "Searches quotes using keywords",
      inputSchema: searchQuotesInputSchema,
    },
    async (input) => {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              { ok: true, stub: true, tool: "search_quotes" },
              null,
              2
            ),
          },
        ],
      };
    }
  );
}