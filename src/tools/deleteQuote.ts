import { McpServer } from "@modelcontextprotocol/server";
import { deleteQuoteInputSchema } from "../schemas/index.js";
import { deleteQuote } from "../lib/quotes.js";

export function registerDeleteQuote(server: McpServer) {
  server.registerTool(
    "delete_quote",
    {
      description: "Deletes a quote by id",
      inputSchema: deleteQuoteInputSchema,
    },
    async (input) => {
      const deleted = deleteQuote(input.id);

      if (!deleted) {
        console.error(`[delete_quote] no quote found with id ${input.id}`);
        return {
          content: [{ type: "text", text: `No quote found with id ${input.id}.` }],
        };
      }

      return {
        content: [{ type: "text", text: `Deleted quote with id ${input.id}.` }],
      };
    }
  );
}