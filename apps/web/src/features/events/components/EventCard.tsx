import Image from "next/image";
import Link from "next/link";

/**
 * Props for the EventCard component.
 * @property title - Event title.
 * @property slug - URL slug for the event detail page.
 * @property date - Event date display string (e.g. "May 11, 2026").
 * @property day - Day number to display in the floating badge (e.g. "22").
 * @property month - Short month label for the badge (e.g. "MAY").
 * @property year - Year string for the badge (e.g. "2026").
 * @property category - Category tag label (e.g. "Workshop", "Competition").
 * @property location - Event venue or location string.
 * @property description - Short event description.
 * @property imageUrl - Banner image URL.
 * @property imageAlt - Alt text for the banner image.
 */
interface EventCardProps {
  title: string;
  slug: string;
  date: string;
  day: string;
  month: string;
  year?: string;
  category?: string;
  location: string;
  description: string;
  imageUrl: string;
  imageAlt?: string;
}

/**
 * Renders event preview cards with a date badge at the top-right
 * of the banner image. Displays title, date/time, location, and description.
 */
export default function EventCard({
  title,
  slug,
  date,
  day,
  month,
  year,
  location,
  description,
  imageUrl,
  imageAlt = "",
}: EventCardProps) {
  return (
    <Link
      href={`/events/${slug}`}
      className="group block overflow-hidden rounded-2xl bg-[var(--color-bg-card)] border border-[rgba(130,128,229,0.15)] transition-transform duration-300 hover:-translate-y-0.5"
    >
      {/* Banner image with floating date badge (top-right) */}
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        <div className="absolute top-4 right-4 flex flex-col items-center justify-center rounded-xl bg-black px-4 py-2.5 shadow-lg border border-[rgba(255,255,255,0.05)]">
          <span className="text-xl font-bold leading-none text-[var(--color-accent-teal)]">{day}</span>
          <span className="mt-1 text-[9px] font-bold uppercase leading-tight tracking-wider text-white">
            {month} {year}
          </span>
        </div>
      </div>

      {/* Card content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-teal)] transition-colors">
          {title}
        </h3>
        <div className="mt-3 flex flex-col gap-1.5 text-xs text-[var(--color-text-muted)]">
          <div className="flex items-center gap-2">
            {/* Calendar icon */}
            <svg
              className="h-3.5 w-3.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Map pin icon */}
            <svg
              className="h-3.5 w-3.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{location}</span>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)] line-clamp-3">
          {description}
        </p>
      </div>
    </Link>
  );
}
