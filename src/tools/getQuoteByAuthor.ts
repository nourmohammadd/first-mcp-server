import { McpServer } from "@modelcontextprotocol/server";
import { getQuoteByAuthorInputSchema } from "../schemas/index.js";

export function registerGetQuoteByAuthor(server: McpServer) {
  server.registerTool(
    "get_quote_by_author",
    {
      description: "Returns quotes from a specific author",
      inputSchema: getQuoteByAuthorInputSchema,
    },
    async (input) => {
      return {
        content: [{ type: "text", text: "not implemented yet" }],
      };
    }
  );
}

// P1 stub — not implemented yet