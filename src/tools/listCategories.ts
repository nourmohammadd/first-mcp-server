import { McpServer } from "@modelcontextprotocol/server";
import { listCategoriesInputSchema } from "../schemas/index.js";
import { listCategories } from "../lib/quotes.js";

export function registerListCategories(server: McpServer) {
  server.registerTool(
    "list_categories",
    {
      description: "Lists all available quote categories",
      inputSchema: listCategoriesInputSchema,
    },
    async () => {
      const categories = listCategories();

      if (categories.length === 0) {
        console.error(`[list_categories] no categories found`);
        return {
          content: [
            {
              type: "text",
              text: "No categories found.",
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(categories, null, 2),
          },
        ],
      };
    }
  );
}