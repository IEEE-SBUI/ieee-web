import { client } from "@/src/sanity/client";
import SectionHeading from "@/src/components/SectionHeading";
import EventCard from "@/src/features/events/components/EventCard";
import {
  toEventCardProps,
  type SanityEvent,
} from "@/src/features/events/lib/toEventCardProps";

/** Upcoming events only, soonest first, capped at three for the homepage. */
const UPCOMING_EVENTS_QUERY = `*[_type == "event" && date >= now()] | order(date asc)[0...3]{
  title,
  slug,
  date,
  location,
  description,
  category,
  "imageUrl": image.asset->url
}`;

/**
 * Homepage "Upcoming Events" section.
 *
 * Fetches the next few upcoming events from Sanity (the same source as the
 * events archive) and renders them with the shared EventCard.
 *
 * @returns The upcoming events section element.
 */
export default async function UpcomingEventsSection() {
  let events: SanityEvent[] = [];
  try {
    events = (await client.fetch<SanityEvent[]>(UPCOMING_EVENTS_QUERY)) ?? [];
  } catch (error) {
    // Render the section with an empty state rather than crashing the page.
    console.error("Failed to fetch upcoming events from Sanity:", error);
  }

  return (
    <section
      aria-labelledby="events-heading"
      className="content-visibility-auto intrinsic-events"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-12 md:py-24 lg:px-[117px]">
        {/* Centered header */}
        <div className="mx-auto max-w-3xl text-center" id="events-heading">
          <SectionHeading heading="Upcoming Events" />
        </div>

        {/* Event cards */}
        {events.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.slug.current} {...toEventCardProps(event)} />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center text-[var(--color-text-muted)]">
            No upcoming events right now. Check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
