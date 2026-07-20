import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "first-mcp-server",
  version: "1.0.0",
});

server.tool(
  "greet",
  "Generate a greeting message",
  {
    name: z.string(),
  },
  async ({ name }) => {
    return {
      content: [
        {
          type: "text",
          text: `Hello ${name}! Welcome to MCP.`,
        },
      ],
    };
  }
);

console.error("MCP server running");

const transport = new StdioServerTransport();

await server.connect(transport);