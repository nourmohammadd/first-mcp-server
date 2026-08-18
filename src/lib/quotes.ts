import { readFileSync } from "node:fs";
import { resolve, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as z from "zod/v4";

const quoteSchema = z.object({
  id: z.number(),
  quote: z.string(),
  author: z.string(),
  category: z.string(),
});

const quotesFileSchema = z.array(quoteSchema);

export type Quote = z.infer<typeof quoteSchema>;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Only ever read files under ./data — reject any path escaping it.
// Resolved from this module's own location (not process.cwd()) so it works
// regardless of the working directory the process was launched from
// (e.g. when started by Claude Desktop via a wrapped command).
function resolveDataPath(filename: string): string {
  // src/lib/quotes.ts -> go up two levels to reach the repo root, then into data/
  const dataDir = resolve(__dirname, "..", "..", "data");
  const fullPath = resolve(join(dataDir, filename));
  if (!fullPath.startsWith(dataDir)) {
    throw new Error(`Invalid data path: ${filename}`);
  }
  return fullPath;
}

export function loadQuotes(): Quote[] {
  const path = resolveDataPath("quotes.json");

  let raw: string;
  try {
    raw = readFileSync(path, "utf-8");
  } catch (err) {
    console.error(`[quotes] failed to read ${path}:`, err);
    return [];
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    console.error(`[quotes] failed to parse JSON at ${path}:`, err);
    return [];
  }

  const result = quotesFileSchema.safeParse(parsed);
  if (!result.success) {
    console.error(`[quotes] fixture failed schema validation:`, result.error);
    return [];
  }

  return result.data;
}

export function getQuoteOfTheDay(): Quote | null {
  const quotes = loadQuotes();
  if (quotes.length === 0) return null;

  // Deterministic pick based on day of year, same quote all day.
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  const index = dayOfYear % quotes.length;
  return quotes[index];
}

export function getRandomQuote(category?: string): Quote | null {
  const quotes = loadQuotes();
  const pool = category
    ? quotes.filter((q) => q.category.toLowerCase() === category.toLowerCase())
    : quotes;

  if (pool.length === 0) return null;
  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}

export function searchQuotes(keyword: string, limit = 10): Quote[] {
  const quotes = loadQuotes();
  const lowerKeyword = keyword.toLowerCase();

  return quotes
    .filter(
      (q) =>
        q.quote.toLowerCase().includes(lowerKeyword) ||
        q.author.toLowerCase().includes(lowerKeyword)
    )
    .slice(0, limit);
}

export function getQuoteByAuthor(author: string): Quote[] {
  const quotes = loadQuotes();
  const lowerAuthor = author.toLowerCase();

  return quotes.filter((q) => q.author.toLowerCase() === lowerAuthor);
}

export function listCategories(): string[] {
  const quotes = loadQuotes();
  const categories = new Set(quotes.map((q) => q.category));
  return Array.from(categories).sort();
}