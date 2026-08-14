import { test } from "node:test";
import assert from "node:assert/strict";
import { searchQuotes, getQuoteByAuthor, listCategories } from "./quotes.js";

test("searchQuotes finds a match by keyword", () => {
  const results = searchQuotes("success", 10);
  assert.ok(results.length > 0, "expected at least one match for 'success'");
  assert.ok(
    results.every(
      (q) =>
        q.quote.toLowerCase().includes("success") ||
        q.author.toLowerCase().includes("success")
    )
  );
});

test("searchQuotes returns empty array for a nonsense keyword", () => {
  const results = searchQuotes("zzzznotarealword", 10);
  assert.equal(results.length, 0);
});

test("searchQuotes respects the limit", () => {
  const results = searchQuotes("a", 2); // "a" should match many quotes
  assert.ok(results.length <= 2);
});

test("getQuoteByAuthor is case-insensitive", () => {
  const lower = getQuoteByAuthor("albert einstein");
  const proper = getQuoteByAuthor("Albert Einstein");
  assert.deepEqual(lower, proper);
});

test("listCategories returns a sorted, deduplicated array", () => {
  const categories = listCategories();
  const sorted = [...categories].sort();
  assert.deepEqual(categories, sorted);
  assert.equal(new Set(categories).size, categories.length);
});