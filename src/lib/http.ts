// Only these hosts may be fetched — reject anything else before making the request.
const ALLOWED_HOSTS = [
  "api.quotable.io", // reserved for future use, not called by any tool yet
];

export async function fetchJson(
  url: string,
  { timeoutMs = 8000 }: { timeoutMs?: number } = {}
) {
  const parsed = new URL(url);

  if (!ALLOWED_HOSTS.includes(parsed.hostname)) {
    throw new Error(`Host not allowed: ${parsed.hostname}`);
  }

  const response = await fetch(url, {
    signal: AbortSignal.timeout(timeoutMs),
  });

  if (!response.ok) {
    throw new Error(`Request to ${url} failed with status ${response.status}`);
  }

  return response.json();
}