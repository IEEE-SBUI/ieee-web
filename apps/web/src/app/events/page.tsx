import { client } from "@/src/sanity/client";
import EventsPageClient from "./EventsPageClient";

export const revalidate = 60;

export const metadata = {
  title: "Events",
  description: "Discover upcoming and past events hosted by the IEEE Student Branch Universitas Indonesia.",
};

const EVENTS_QUERY = `*[_type == "event"] | order(date asc) {
  title,
  slug,
  date,
  location,
  description,
  category,
  "imageUrl": image.asset->url
}`;

export default async function EventsPage() {
  let events: any[] = [];

  try {
    events = await client.fetch(EVENTS_QUERY);
  } catch (error) {
    console.error("Failed to fetch events from Sanity:", error);
  }

  return <EventsPageClient events={events || []} />;
}
