import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ArticleCategory } from "./ArticleCard";

interface FeaturedArticleCardProps {
  /** Link to the full article page. */
  href: string;

  /** Cover image URL for the article. */
  imageUrl: string;

  /** Article categories; the first becomes the eyebrow, the rest become pills. */
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
 * Large featured article card for the homepage "Featured Articles" slot.
 *
 * Differs from the standard `ArticleCard`: the cover image bleeds into the
 * content via a gradient fade, the first category is shown as a green eyebrow
 * above the title, and the remaining categories render as pills below it.
 *
 * To avoid showing a category twice, the eyebrow uses `categories[0]` and the
 * pills use `categories.slice(1)`. With no categories, the eyebrow falls back
 * to "Article" and no pills are shown.
 *
 * Presentational only: it receives display-ready strings, never Sanity docs.
 *
 * @returns A featured article card.
 */
export default function FeaturedArticleCard({
  href,
  imageUrl,
  categories,
  title,
  excerpt,
  date,
  author,
  readTimeMinutes,
  className = "",
}: FeaturedArticleCardProps) {
  const eyebrow = categories[0]?.label ?? "Article";
  const pills = categories.slice(1);

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-[12px] border border-[var(--color-border)] bg-[var(--color-bg-card)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[var(--color-accent-teal)] ${className}`}
    >
      {/* Cover image bleeding into the content via a fade to the card color. */}
      <Link href={href} className="relative aspect-[16/10] w-full shrink-0">
        <img
          src={imageUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-bg-card)]"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-6 sm:p-8">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-teal)]">
          {eyebrow}
        </span>

        <h3 className="text-2xl font-bold leading-tight text-white">
          <Link
            href={href}
            className="transition-colors hover:text-[var(--color-accent-teal)]"
          >
            {title}
          </Link>
        </h3>

        {pills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {pills.map(({ label }) => (
              <span
                key={label}
                className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/80"
                style={{ background: "rgba(255,255,255,0.1)" }}
              >
                {label}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-1.5 text-[12px] text-[var(--color-text-muted)]">
          <span>{date}</span>
          <span className="opacity-50">&bull;</span>
          <span>By {author}</span>
        </div>

        {excerpt && (
          <p className="text-[0.95rem] leading-relaxed text-white/80">
            {excerpt}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-4">
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--color-accent-teal)] transition-colors hover:text-white"
          >
            Read Article
            <ArrowRight size={16} aria-hidden="true" />
          </Link>

          <span className="text-[12px] text-[var(--color-text-muted)]">
            {readTimeMinutes} min read
          </span>
        </div>
      </div>
    </article>
  );
}
