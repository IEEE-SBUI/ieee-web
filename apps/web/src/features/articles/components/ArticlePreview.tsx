import Image from "next/image";
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

  /** Optional additional CSS classes. */
  className?: string;
}

/**
 * Compact horizontal article preview used in sidebar-style layouts.
 *
 * Designed for dense layouts where vertical space is limited,
 * showing a thumbnail, category labels, title, and metadata.
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
  className = "",
}: ArticlePreviewProps) {
  return (
    <div className={`group flex flex-row gap-4 sm:gap-5 py-5 ${className}`}>
      <Link
        href={href}
        className="relative aspect-[16/11] w-[120px] sm:w-[140px] shrink-0 overflow-hidden rounded-[8px]"
      >
        <Image
          src={imageUrl}
          alt=""
          fill
          sizes="140px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
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

        <div className="flex items-center gap-1.5 text-[12px] text-[var(--color-text-muted)]">
          <span>{date}</span>
          <span className="opacity-50">&bull;</span>
          <span>By {author}</span>
        </div>
      </div>
    </div>
  );
}