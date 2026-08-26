import { McpServer } from "@modelcontextprotocol/server";
import { updateQuoteInputSchema } from "../schemas/index.js";
import { updateQuote } from "../lib/quotes.js";

export function registerUpdateQuote(server: McpServer) {
  server.registerTool(
    "update_quote",
    {
      description: "Updates an existing quote by id",
      inputSchema: updateQuoteInputSchema,
    },
    async (input) => {
      const { id, ...updates } = input;
      const updated = updateQuote(id, updates);

      if (!updated) {
        console.error(`[update_quote] no quote found with id ${id}`);
        return {
          content: [{ type: "text", text: `No quote found with id ${id}.` }],
        };
      }

      return {
        content: [{ type: "text", text: JSON.stringify(updated, null, 2) }],
      };
    }
  );
}