# First MCP Server

## Description

This project is my first **Model Context Protocol (MCP) server** built with TypeScript.

It demonstrates how to create and register a simple MCP tool using the MCP SDK and Zod for input validation. The server communicates over **stdio** and can be tested using **MCP Inspector**.

---

## Purpose

The purpose of this project is to learn the fundamentals of MCP servers, understand how tools are registered, validate user input using Zod, and connect the server with MCP Inspector.

---

## Features

- MCP server built with TypeScript
- One custom tool called `greet`
- Input validation using Zod
- Communication over stdio transport
- Compatible with MCP Inspector
- Managed using Git and GitHub

---

## Technologies

- Node.js
- TypeScript
- MCP SDK
- Zod
- MCP Inspector

---

## Project Structure

```
first-mcp-server/
│
├── src/
│   └── index.ts          # MCP server implementation
│
├── package.json
├── package-lock.json
├── tsconfig.json
├── .gitignore
└── README.md
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/nourmohammadd/first-mcp-server.git
```

Move into the project folder:

```bash
cd first-mcp-server
```

Install the required dependencies:

```bash
npm install
```

---

## Running the Project

Start the MCP server:

```bash
npx tsx src/index.ts
```

---

## Testing with MCP Inspector

Run the server using MCP Inspector:

```bash
npx @modelcontextprotocol/inspector npx tsx src/index.ts
```

Then open the provided URL in your browser.

Using MCP Inspector:

1. Open the **Tools** tab.
2. Select the `greet` tool.
3. Provide a valid input.
4. Run the tool and check the response.
5. Test invalid inputs to verify Zod schema validation.

---

## Available Tool

### greet(name)

A simple MCP tool that receives a name and returns a greeting message.

Example:

Input:

```text
Nour
```

Output:

```text
Hello Nour! Welcome to MCP.
```

The tool uses Zod validation to verify that the input format is correct before executing.

---

## Learning Outcomes

Through this project, I learned:

- The basics of Model Context Protocol (MCP).
- How MCP servers work.
- How to create and register MCP tools.
- How to validate inputs using Zod.
- How to test MCP servers using MCP Inspector.
- How to manage a project using Git and GitHub.

---

## Repository

GitHub Repository:

https://github.com/nourmohammadd/first-mcp-server

---

## Academy

MCP Academy:

https://nextflows.ai/

---

## Author

Nour Mohammad