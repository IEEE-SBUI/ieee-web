import { client } from "@/src/sanity/client";
import { urlFor } from "@/src/sanity/imageUrl";
import { formatDate } from "@/src/lib/formatDate";
import { readTimeMinutes, type PortableTextBlock } from "@/src/lib/readTime";
import SectionHeading from "@/src/components/SectionHeading";
import Button from "@/src/components/Button";
import FeaturedArticleCard from "@/src/features/articles/components/FeaturedArticleCard";
import ArticlePreview from "@/src/features/articles/components/ArticlePreview";
import type { ArticleCategory } from "@/src/features/articles/components/ArticleCard";
import type { SanityImageSource } from "@sanity/image-url";

/** Fallback image used when an article has no `mainImage`. */
const FALLBACK_IMAGE = "/article-placeholder.svg";

/** Shape of an article row returned by the GROQ query below. */
interface SanityArticle {
  title?: string;
  slug?: { current?: string };
  publishedAt?: string;
  summary?: string;
  mainImage?: SanityImageSource | null;
  body?: PortableTextBlock[] | null;
  authorName?: string | null;
  categories?: (string | null)[] | null;
}

const ARTICLES_QUERY = `*[_type == "article"] | order(publishedAt desc)[0...4]{
  title, slug, publishedAt, summary, mainImage, body,
  "authorName": author->name,
  "categories": categories[]->title
}`;

/** Resolve an article's cover image to a URL, falling back to the placeholder. */
function imageUrlFor(mainImage?: SanityImageSource | null): string {
  // An image field can exist with only alt text and no uploaded asset, which
  // urlFor() cannot resolve. Require an asset reference before building a URL.
  const assetRef = (mainImage as { asset?: { _ref?: string } } | null | undefined)
    ?.asset?._ref;
  if (!mainImage || !assetRef) return FALLBACK_IMAGE;

  try {
    return urlFor(mainImage)
      .width(800)
      .height(500)
      .fit("crop")
      .auto("format")
      .url();
  } catch {
    return FALLBACK_IMAGE;
  }
}

/** Build the badge list, dropping any null category titles. */
function toCategories(categories?: (string | null)[] | null): ArticleCategory[] {
  return (categories ?? [])
    .filter((label): label is string => Boolean(label))
    .map((label) => ({ label }));
}

/** Article detail href, falling back to the index when the slug is missing. */
function articleHref(slug?: { current?: string }): string {
  return slug?.current ? `/articles/${slug.current}` : "/articles";
}

/**
 * Homepage "Featured Articles" section.
 *
 * Fetches the latest four articles from Sanity. The newest becomes the large
 * featured card on the right; the next three become compact preview rows on
 * the left. All Sanity-to-display mapping (image URLs, dates, read time,
 * categories) happens here so the card components stay presentational.
 *
 * @returns The featured articles section, or null when there are no articles.
 */
export default async function FeaturedArticlesSection() {
  const articles = await client.fetch<SanityArticle[]>(ARTICLES_QUERY);

  if (!articles || articles.length === 0) return null;

  const [featured, ...rest] = articles;
  const previews = rest.slice(0, 3);

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--theme-dark-gradient)" }}
      aria-labelledby="featured-heading"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-12 md:py-24 lg:px-[117px]">
        {/* Centered header + intro */}
        <div className="mx-auto max-w-3xl text-center">
          <div id="featured-heading">
            <SectionHeading heading="Featured Articles" />
          </div>
          <p className="text-base leading-relaxed text-[var(--color-text-muted)]">
            A mix of tutorials, project recaps, and updates from our divisions.
            Here are the latest pieces from the branch.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {/* Left: latest articles list */}
          <div>
            <h3 className="border-l-4 border-[var(--color-accent-teal)] pl-3 text-sm font-bold uppercase tracking-[0.15em] text-[var(--color-accent-teal)]">
              Latest Articles
            </h3>

            <div className="mt-4 flex flex-col divide-y divide-[color:var(--color-border)]">
              {previews.map((article) => (
                <ArticlePreview
                  key={article.slug?.current ?? article.title}
                  href={articleHref(article.slug)}
                  imageUrl={imageUrlFor(article.mainImage)}
                  categories={toCategories(article.categories)}
                  title={article.title ?? "Untitled"}
                  date={formatDate(article.publishedAt)}
                  author={article.authorName ?? "IEEE SBUI"}
                />
              ))}
            </div>
          </div>

          {/* Right: featured article */}
          <FeaturedArticleCard
            href={articleHref(featured.slug)}
            imageUrl={imageUrlFor(featured.mainImage)}
            categories={toCategories(featured.categories)}
            title={featured.title ?? "Untitled"}
            excerpt={featured.summary ?? ""}
            date={formatDate(featured.publishedAt)}
            author={featured.authorName ?? "IEEE SBUI"}
            readTimeMinutes={readTimeMinutes(featured.body)}
          />
        </div>

        {/* Link to all articles */}
        <div className="mt-12 text-center">
          <Button variant="secondary" href="/articles">
            View Other Articles
          </Button>
        </div>
      </div>
    </section>
  );
}
