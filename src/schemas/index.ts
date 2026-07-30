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