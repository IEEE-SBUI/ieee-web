/** A single span of text within a Portable Text block. */
interface PortableTextSpan {
  _type?: string;
  text?: string;
}

/** A minimal Portable Text block (article `body` is an array of these). */
export interface PortableTextBlock {
  _type?: string;
  children?: PortableTextSpan[];
}

/** Average adult reading speed, in words per minute. */
const WORDS_PER_MINUTE = 200;

/**
 * Estimate reading time, in whole minutes, from a Portable Text body.
 *
 * Counts the words across all text blocks and divides by an average reading
 * speed. Always returns at least 1 minute, including for empty or missing
 * bodies (such as the placeholder test article).
 *
 * @param body - The article `body` (Portable Text), or null/undefined.
 * @returns Estimated reading time in minutes (minimum 1).
 */
export function readTimeMinutes(body?: PortableTextBlock[] | null): number {
  if (!body || body.length === 0) return 1;

  const words = body
    .filter((block) => block._type === "block")
    .flatMap((block) => block.children ?? [])
    .map((span) => span.text ?? "")
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
