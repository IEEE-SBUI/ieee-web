/** A single event as returned from Sanity for the event cards. */
export interface SanityEvent {
  title: string;
  slug: { current: string };
  date: string;
  location?: string;
  description?: string;
  category?: string;
  imageUrl?: string;
}

/** Display-ready props for the shared EventCard. */
export interface EventCardData {
  title: string;
  slug: string;
  date: string;
  day: string;
  month: string;
  year: string;
  category?: string;
  location: string;
  description: string;
  imageUrl: string;
}

/** Branded fallback used when an event has no cover image. */
const EVENT_PLACEHOLDER = "/event-placeholder.svg";

/**
 * Map a Sanity event to the display-ready props the shared EventCard expects.
 *
 * Used by both the events archive page and the homepage upcoming-events
 * section so the two stay in sync.
 *
 * @param event - An event row fetched from Sanity.
 * @returns Props ready to spread onto EventCard.
 */
export function toEventCardProps(event: SanityEvent): EventCardData {
  const dateObj = new Date(event.date);

  return {
    title: event.title,
    slug: event.slug.current,
    date: dateObj.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    day: dateObj.getDate().toString().padStart(2, "0"),
    month: dateObj.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    year: dateObj.getFullYear().toString(),
    category: event.category,
    location: event.location || "TBA",
    description: event.description || "",
    imageUrl: event.imageUrl || EVENT_PLACEHOLDER,
  };
}
