import { McpServer } from "@modelcontextprotocol/server";
import { listCategoriesInputSchema } from "../schemas/index.js";

export function registerListCategories(server: McpServer) {
  server.registerTool(
    "list_categories",
    {
      description: "Lists all available quote categories",
      inputSchema: listCategoriesInputSchema,
    },
    async () => {
      return {
        content: [{ type: "text", text: "not implemented yet" }],
      };
    }
  );
}

// P1 stub — not implemented yet