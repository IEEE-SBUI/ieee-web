/**
 * Format an ISO date string for display, e.g. "June 11, 2026".
 *
 * Returns an empty string when the input is missing or unparseable so callers
 * can render gracefully.
 *
 * @param iso - ISO date string (such as Sanity's `publishedAt`).
 * @returns A long-form `en-US` date, or "" if the input is invalid.
 */
export function formatDate(iso?: string | null): string {
  if (!iso) return "";

  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
