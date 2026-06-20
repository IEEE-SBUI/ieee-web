import Link from "next/link";
import type { ArticleCategory } from "./ArticleCard";

interface ArticlePreviewProps {
  /** Link to the full article page. */
  href: string;

  /** Thumbnail image URL for the preview. */
  imageUrl: string;

  /** List of article categories displayed as a single inline string. */
  categories: ArticleCategory[];

  /** Article title displayed in the preview row. */
  title: string;

  /** Published date (already formatted for display). */
  date: string;

  /** Author name shown in metadata. */
  author: string;

  /** Short preview text/summary shown in the preview row. */
  summary?: string;

  /** Optional additional CSS classes. */
  className?: string;
}

/**
 * Compact horizontal article preview used in sidebar-style layouts.
 *
 * Designed for dense layouts where vertical space is limited,
 * showing a thumbnail, category labels, title, summary, and metadata.
 *
 * @returns A horizontal article preview component.
 */
export default function ArticlePreview({
  href,
  imageUrl,
  categories,
  title,
  date,
  author,
  summary,
  className = "",
}: ArticlePreviewProps) {
  return (
    <div className={`group flex flex-row gap-4 sm:gap-5 py-5 ${className}`}>
      <Link
        href={href}
        className="relative aspect-[16/11] w-[90px] min-[360px]:w-[110px] min-[400px]:w-[125px] sm:w-[140px] shrink-0 overflow-hidden rounded-[8px]"
      >
        <img
          src={imageUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </Link>

      <div className="flex min-w-0 flex-col justify-center">
        {categories.length > 0 && (
          <span className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-accent-teal)]">
            {categories.map((c) => c.label).join(" · ")}
          </span>
        )}

        <h4 className="mb-1.5 line-clamp-2 text-[0.95rem] font-bold leading-snug text-white">
          <Link
            href={href}
            className="transition-colors hover:text-[var(--color-accent-teal)]"
          >
            {title}
          </Link>
        </h4>

        {summary && (
          <p className="mb-1.5 line-clamp-1 text-xs text-[var(--color-text-muted)]">
            {summary}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[12px] text-[var(--color-text-muted)]">
          <span>{date}</span>
          <span className="opacity-50">&bull;</span>
          <span>By {author}</span>
        </div>
      </div>
    </div>
  );
}