/**
 * Formats a date string into a human-readable format.
 *
 * @param dateString - ISO date string returned by the CMS.
 * @param options - Date formatting options passed to Intl.DateTimeFormat.
 * @returns The formatted date string, or an empty string if no date is provided.
 *
 * @example
 * formatDate("2026-06-20");
 * // "June 20, 2026"
 */
export function formatDate(
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
}

/**
 * Estimates reading time from a short text summary.
 *
 * This is mainly used for article preview cards where the full article
 * content is not available.
 *
 * @param summaryText - Article summary text.
 * @returns Estimated reading time in minutes.
 */
export function calculateReadTime(summaryText: string): number {
  if (!summaryText) return 3;

  const wordCount = summaryText.split(/\s+/).length;

  // Card previews should not display a 0–1 minute read time because most
  // summaries are short. We intentionally bias the estimate upward.
  return Math.max(2, Math.ceil(wordCount / 5));
}

/**
 * Estimates reading time from Portable Text article content.
 *
 * The calculation only includes text blocks because images, embeds, and
 * other content types do not contribute directly to word count.
 *
 * @param body - Portable Text content from Sanity.
 * @returns Estimated reading time in minutes.
 */
export function calculateRichTextReadTime(
  body: any[] | undefined | null
): number {
  if (!body) return 1;

  let wordCount = 0;
  for (const block of body) {
    if (block._type === "block" && block.children) {
      block.children.forEach((child: any) => {
        if (child.text) {
          wordCount += child.text.split(/\s+/).length;
        }
      });
    }
  };

  // Uses a common reading speed estimate of 200 words per minute.
  return Math.max(1, Math.ceil(wordCount / 200));
}

