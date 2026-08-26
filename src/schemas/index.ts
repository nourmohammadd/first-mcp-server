import * as z from "zod/v4";

/*
Tool: get_quote_of_the_day
*/
export const getQuoteOfTheDayInputSchema = z.object({});

/*
Tool: get_random_quote
*/
export const getRandomQuoteInputSchema = z.object({
  category: z
    .string()
    .min(1)
    .max(50)
    .optional()
    .describe("Optional quote category such as motivation, success, or happiness."),
});

/*
Tool: search_quotes
*/
export const searchQuotesInputSchema = z.object({
  keyword: z
    .string()
    .trim()
    .min(1)
    .max(100)
    .describe("Keyword used to search for matching quotes."),

  limit: z
    .number()
    .int()
    .positive()
    .max(20)
    .optional()
    .describe("Maximum number of quotes to return. Defaults to 10."),
});

/*
Tool: get_quote_by_author
*/
export const getQuoteByAuthorInputSchema = z.object({
  author: z
  .string()
  .trim()
  .min(1)
  .max(100)
  .describe("Author name to filter quotes by."),
});

/*
Tool: list_categories
*/
export const listCategoriesInputSchema = z.object({});


/*
Tool: add_quote
*/
export const addQuoteInputSchema = z.object({
  quote: z
    .string()
    .trim()
    .min(1)
    .max(500)
    .describe("The quote text."),
  author: z
    .string()
    .trim()
    .min(1)
    .max(100)
    .describe("The author of the quote."),
  category: z
    .string()
    .trim()
    .min(1)
    .max(50)
    .describe("The category this quote belongs to."),
});

/*
Tool: update_quote
*/
export const updateQuoteInputSchema = z.object({
  id: z.number().int().positive().describe("ID of the quote to update."),
  quote: z.string().trim().min(1).max(500).optional(),
  author: z.string().trim().min(1).max(100).optional(),
  category: z.string().trim().min(1).max(50).optional(),
});

/*
Tool: delete_quote
*/
export const deleteQuoteInputSchema = z.object({
  id: z.number().int().positive().describe("ID of the quote to delete."),
});