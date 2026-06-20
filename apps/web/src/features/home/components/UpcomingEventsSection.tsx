import SectionHeading from "@/src/components/SectionHeading";
import EventCard from "@/src/features/events/components/EventCard";

// TODO: swap to a Sanity query when the event schema lands.
// Each event owns its imageUrl/imageAlt so the cards stay independent. They
// point to a branded placeholder for now; no real event photos are committed.
const EVENTS = [
  {
    title: "IEEElevate 1.0: IoT Smart Home Workshop",
    slug: "ieeelevate-iot-smart-home",
    date: "July 12, 2026",
    day: "12",
    month: "JUL",
    year: "2026",
    category: "Workshop",
    location: "Faculty of Engineering, Universitas Indonesia",
    description:
      "Build a small smart home setup with sensors and a microcontroller, then connect it to a simple dashboard you can control from your phone.",
    imageUrl: "/event-placeholder.svg",
    imageAlt: "IEEElevate IoT smart home workshop",
  },
  {
    title: "Technical Writing Night for Engineers",
    slug: "technical-writing-night",
    date: "July 26, 2026",
    day: "26",
    month: "JUL",
    year: "2026",
    category: "Seminar",
    location: "Online via Zoom",
    description:
      "Learn how to write clear lab reports and project documentation that other people can actually follow and reuse.",
    imageUrl: "/event-placeholder.svg",
    imageAlt: "Technical writing night for engineers",
  },
  {
    title: "RoboLine Competition 2026",
    slug: "roboline-competition-2026",
    date: "August 9, 2026",
    day: "09",
    month: "AUG",
    year: "2026",
    category: "Competition",
    location: "Engineering Center, Universitas Indonesia",
    description:
      "Teams design a line-following robot and race it through a timed course for prizes and certificates.",
    imageUrl: "/event-placeholder.svg",
    imageAlt: "RoboLine robotics competition",
  },
];

/**
 * Homepage "Upcoming Events" section.
 *
 * Renders three upcoming events through the shared EventCard. The event schema
 * does not exist yet, so the data below is realistic placeholder content.
 *
 * Purely presentational and rendered on the server (no props, no data).
 *
 * @returns The upcoming events section element.
 */
export default function UpcomingEventsSection() {
  return (
    <section aria-labelledby="events-heading">
      <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-12 md:py-24 lg:px-[117px]">
        {/* Centered header */}
        <div className="mx-auto max-w-3xl text-center" id="events-heading">
          <SectionHeading heading="Upcoming Events" />
        </div>

        {/* Event cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {EVENTS.map((event) => (
            <EventCard key={event.slug} {...event} />
          ))}
        </div>
      </div>
    </section>
  );
}
