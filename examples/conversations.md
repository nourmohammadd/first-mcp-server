# Example Conversations

## Conversation A — Daily quote

**User prompt:**
> "Give me today's quote."

**Expected tool calls:**
1. `get_quote_of_the_day` — no arguments (`{}`)

**Good final answer:**
> "Here's today's quote: 'In the middle of difficulty lies opportunity.' — Albert Einstein"

---

## Conversation B — Searching by topic

**User prompt:**
> "Find me a quote about success."

**Expected tool calls:**
1. `search_quotes` — `{ "keyword": "success", "limit": 5 }`

**Good final answer:**
> "Here are a couple of quotes about success:
> - 'Success is where preparation and opportunity meet.' — Bobby Unser
> - 'The only way to do great work is to love what you do.' — Steve Jobs"

---

## Conversation C — Author lookup with a follow-up

**User prompt:**
> "What categories of quotes do you have, and can you show me one from C.S. Lewis?"

**Expected tool calls:**
1. `list_categories` — no arguments (`{}`)
2. `get_quote_by_author` — `{ "author": "C.S. Lewis" }`

**Good final answer:**
> "I have quotes in these categories: happiness, love, motivation, success. 
> Here are two from C.S. Lewis:
> - 'Hardships often prepare ordinary people for an extraordinary destiny.'
> - 'You are never too old to set another goal or to dream a new dream.'"

---

## Coverage
This set of conversations exercises 4 of the 5 tools: `get_quote_of_the_day`, 
`search_quotes`, `list_categories`, and `get_quote_by_author`.