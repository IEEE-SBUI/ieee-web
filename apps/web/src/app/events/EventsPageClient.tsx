"use client";

import React, { useState } from "react";
import PageHeader from "@/src/components/PageHeader";
import EventCard from "@/src/features/events/components/EventCard";
import DropdownFilter from "@/src/components/DropdownFilter";
import { Search, Calendar as CalendarIcon } from "lucide-react";

interface SanityEvent {
  title: string;
  slug: { current: string };
  date: string;
  location: string;
  description?: string;
  category?: string;
  imageUrl?: string;
}

interface EventsPageClientProps {
  events: SanityEvent[];
}

export default function EventsPageClient({ events }: EventsPageClientProps) {
  const [eventSearch, setEventSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Dynamically gather all unique categories present in the data
  const uniqueCategories = Array.from(
    new Set(events.map((e) => e.category).filter(Boolean))
  ) as string[];

  // A category can be selected and deselected without clearing other filters.
  const handleCategoryToggle = (categoryName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  // Perform combined dynamic filtering (Search AND Category checkboxes)
  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(event.category || "");
    const matchesSearch = event.title
      .toLowerCase()
      .includes(eventSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Separate list into upcoming and past events
  const upcomingEvents = filteredEvents
    .filter((e) => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastEvents = filteredEvents
    .filter((e) => new Date(e.date) < new Date())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Helper to map dynamic Sanity event format to exact EventCard props structure
  const renderEventCard = (e: SanityEvent) => {
    const dateObj = new Date(e.date);
    const dayStr = dateObj.getDate().toString().padStart(2, "0");
    const monthStr = dateObj.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
    const yearStr = dateObj.getFullYear().toString();
    const dateDisplay = dateObj.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    return (
      <EventCard
        key={e.slug.current}
        title={e.title}
        slug={e.slug.current}
        date={dateDisplay}
        day={dayStr}
        month={monthStr}
        year={yearStr}
        location={e.location || "TBA"}
        description={e.description || ""}
        imageUrl={e.imageUrl || "/event-placeholder.svg"}
      />
    );
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <PageHeader
        title="Events"
        description="Discover upcoming and past events hosted by the IEEE Student Branch Universitas Indonesia."
      />

      <main className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-[117px] py-16">
        
        {/* Search & Category Filters (Matches Article Archive Spacing & Components) */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-12">
          {/* Title search */}
          <div className="relative flex-1 max-w-xl">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search events by title..."
              value={eventSearch}
              onChange={(e) => setEventSearch(e.target.value)}
              className="w-full bg-[#121214] border border-white/10 rounded-lg py-3.5 pl-12 pr-4 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[var(--color-accent-teal)] transition-all duration-300"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="flex flex-col sm:flex-row items-stretch gap-4">
            <DropdownFilter
              label="Filter by category"
              title="Categories"
              items={uniqueCategories.map((cat) => ({
                id: cat,
                label: cat,
                count: events.filter(
                  (e) =>
                    e.category === cat &&
                    e.title.toLowerCase().includes(eventSearch.toLowerCase())
                ).length,
              }))}
              selectedItems={selectedCategories}
              onToggle={handleCategoryToggle}
              onClear={() => setSelectedCategories([])}
              searchPlaceholder="Search categories..."
              dropdownWidth="sm:w-[280px]"
            />
          </div>
        </div>

        {/* Results Grid Container */}
        <div className="flex flex-col gap-16">
          {/* 1. Upcoming Events Section */}
          {upcomingEvents.length > 0 && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-8 border-l-4 border-[var(--color-accent-teal)] pl-4">
                Upcoming Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map(renderEventCard)}
              </div>
            </div>
          )}

          {/* 2. Past Events Section */}
          {pastEvents.length > 0 && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-8 border-l-4 border-white/20 pl-4">
                Past Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map(renderEventCard)}
              </div>
            </div>
          )}

          {/* 3. Empty State */}
          {filteredEvents.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-[#0C1517] border border-white/5 rounded-2xl max-w-2xl mx-auto w-full">
              <span className="p-4 rounded-full bg-white/5 text-white/40 mb-4">
                <CalendarIcon size={36} />
              </span>
              <h3 className="text-lg font-bold text-white mb-2">No Events Found</h3>
              <p className="text-sm text-[var(--color-text-muted)] max-w-sm mb-6">
                We couldn&apos;t find any events matching your search query or selected categories. Try clearing filters or searching for something else.
              </p>
              {(eventSearch || selectedCategories.length > 0) && (
                <button
                  onClick={() => {
                    setEventSearch("");
                    setSelectedCategories([]);
                  }}
                  className="inline-flex items-center justify-center rounded-lg border border-[var(--color-accent-teal)] px-6 py-2.5 text-xs font-semibold text-[var(--color-accent-teal)] hover:bg-[var(--color-accent-teal)] hover:text-[var(--color-bg-primary)] transition-all cursor-pointer"
                >
                  Reset All Filters
                </button>
              )}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
