import { McpServer } from "@modelcontextprotocol/server";
import { addQuoteInputSchema } from "../schemas/index.js";
import { addQuote } from "../lib/quotes.js";

export function registerAddQuote(server: McpServer) {
  server.registerTool(
    "add_quote",
    {
      description: "Adds a new quote to the collection",
      inputSchema: addQuoteInputSchema,
    },
    async (input) => {
      const newQuote = addQuote(input.quote, input.author, input.category);
      return {
        content: [
          { type: "text", text: JSON.stringify(newQuote, null, 2) },
        ],
      };
    }
  );
}