# Security Policy

## Supported Versions
This is a student project (single repo, no version branches). Only the latest 
commit on `main` is supported/maintained.

## Reporting a Vulnerability
If you find a security issue, please email [mentor's email here] with a 
description of the issue and steps to reproduce. Do not open a public issue 
for security reports.

## What This Project Hardens Against
- **Path traversal**: file reads are restricted to `./data` via `resolveDataPath()` 
  in `src/lib/quotes.ts`, which resolves the path and rejects anything that 
  escapes the data directory.
- **Malformed/oversized data**: all fixture data is validated with Zod schemas 
  before use; invalid data returns an empty result instead of crashing.
- **Unvalidated tool input**: every tool has a Zod input schema that rejects 
  missing, empty, or oversized arguments (e.g. `keyword` capped at 100 chars, 
  `limit` capped at 20).
- **SSRF (future-proofing)**: `src/lib/http.ts`'s `fetchJson` helper only allows 
  requests to an explicit host allowlist — no tool can be pointed at an 
  arbitrary URL.
- **Timeouts**: all network calls via `fetchJson` are capped at 8 seconds using 
  `AbortSignal.timeout()`.
- **No secrets in repo**: this project uses no API keys or tokens. `.gitignore` 
  excludes `.env` files, and `.env.example` documents the (currently empty) 
  expected variables.
- **Error messages**: tool handlers return short, generic messages to the model 
  (e.g. "No quotes found matching..."); detailed errors are logged to stderr 
  only, never returned to the caller.