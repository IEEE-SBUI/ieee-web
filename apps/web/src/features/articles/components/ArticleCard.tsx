import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Corridor, CORRIDOR_COLORS } from "@/src/lib/tokens";
import Image from "next/image";

/**
 * Article category metadata used for badge display.
 */
export interface ArticleCategory {
  /** Badge label shown on the article card (e.g. "IoT", "Tutorial"). */
  label: string;

  /** Optional corridor used to apply brand color styling. */
  corridor?: Corridor;
}

interface ArticleCardProps {
  /** Link to the full article page. */
  href: string;

  /** Cover image URL for the article. */
  imageUrl?: string;

  /** List of category badges shown above the title. */
  categories: ArticleCategory[];

  /** Main article title. */
  title: string;

  /** Short preview text shown in the card. */
  excerpt: string;

  /** Published date (already formatted for display). */
  date: string;

  /** Author name displayed in metadata. */
  author: string;

  /** Estimated reading time in minutes. */
  readTimeMinutes: number;

  /** Optional additional styling classes. */
  className?: string;
}

/**
 * Article preview card used in listing sections like "Latest Stories".
 *
 * Displays cover image, category badges, metadata, excerpt, and CTA link.
 *
 * @returns A clickable article card component.
 */
export default function ArticleCard({
  href,
  imageUrl,
  categories,
  title,
  excerpt,
  date,
  author,
  readTimeMinutes,
  className = "",
}: ArticleCardProps) {
  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-[12px] border border-[rgba(255,255,255,0.06)] bg-[#0c1517] ${className}`}
    >
      <Link
        href={href}
        className="block relative aspect-[16/10] w-full shrink-0 overflow-hidden"
      >
        <Image
          src={imageUrl || "/article-placeholder.svg"}
          alt={`${title} cover image`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          fill
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-6 sm:p-8">
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {categories.map(({ label, corridor }) => {
              // Fallback color ensures badge remains readable when no corridor is provided.
              const bg = corridor
                ? CORRIDOR_COLORS[corridor]
                : "rgba(255,255,255,0.1)";
              const textColor = corridor
                ? "text-black/80"
                : "text-white/80";

              return (
                <span
                  key={label}
                  className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide ${textColor}`}
                  style={{ background: bg }}
                >
                  {label}
                </span>
              );
            })}
          </div>
        )}

        <h3 className="text-xl font-bold leading-tight text-white sm:text-2xl">
          <Link
            href={href}
            className="transition-colors hover:text-[var(--color-accent-teal)]"
          >
            {title}
          </Link>
        </h3>

        <div className="flex flex-wrap items-center gap-1.5 text-[12px] text-[var(--color-text-muted)]">
          <span>{date}</span>
          <span className="opacity-50">&bull;</span>
          <span>By {author}</span>
        </div>

        <p className="text-[0.9rem] leading-relaxed text-white/80">
          {excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--color-accent-teal)] transition-colors hover:text-white"
          >
            <BookOpen size={16} aria-hidden="true" />
            Read Story
          </Link>

          <span className="text-[12px] text-[var(--color-text-muted)]">
            {readTimeMinutes} min read
          </span>
        </div>
      </div>
    </article>
  );
}