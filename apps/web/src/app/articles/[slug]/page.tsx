import { client, urlFor } from "@/src/sanity/client";
import { notFound } from "next/navigation";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { formatDate, calculateRichTextReadTime } from "@/src/lib/utils";
import Image from "next/image";

interface SanityArticle {
  title: string;
  publishedAt: string;
  summary: string;
  mainImage: any;
  body: any[];
  authorName: string;
  authorImage: any;
  categories: string[];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Defines how Sanity Portable Text content is rendered on the website.
 *
 * We override the default serializers so article content follows the
 * site's design system and supports custom elements such as captions,
 * code snippets, and styled blockquotes.
 */
const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      const imageUrl = urlFor(value);
      return (
        <figure className="my-8 flex flex-col items-center gap-3">
          <div className="relative overflow-hidden rounded-xl border border-white/5 bg-[#0C1517] w-full">
            <Image
              src={imageUrl}
              alt={value.alt || "Article image"}
              fill
              unoptimized
              className="w-full h-auto object-cover max-h-[500px]"
              loading="lazy"
            />
          </div>
          {value.caption && (
            <figcaption className="text-xs md:text-sm text-center text-[var(--color-text-muted)] italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || "#";
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-accent-teal)] underline hover:text-white transition-colors duration-200"
        >
          {children}
        </a>
      );
    },
    code: ({ children }) => {
      return (
        <code className="bg-[#121214] border border-white/10 px-1.5 py-0.5 rounded text-xs text-[var(--color-accent-teal)] font-mono">
          {children}
        </code>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold text-white mt-12 mb-4 tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-bold text-white mt-8 mb-3 tracking-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg md:text-xl font-bold text-white mt-6 mb-2 tracking-tight">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-base md:text-lg leading-relaxed text-white/80 mb-6">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[var(--color-accent-teal)] bg-[#0C1517] px-6 py-4 my-8 rounded-r-lg italic text-white/90 text-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 text-white/80 space-y-2 text-base md:text-lg">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 text-white/80 space-y-2 text-base md:text-lg">
        {children}
      </ol>
    ),
  },
};

/**
 * Displays a single article based on its slug.
 *
 * The article is fetched on the server to keep CMS queries out of the
 * client bundle and ensure the page is rendered with content on first load.
 *
 * @param params - Dynamic route parameters containing the article slug.
 * @returns The article detail page or a 404 page if the article does not exist.
 */

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Resolve author and category references in the same query to avoid
  // additional requests when rendering the article page.

  const query = `*[_type == "article" && slug.current == $slug][0]{
    title,
    publishedAt,
    summary,
    mainImage,
    body,
    "authorName": author->name,
    "authorImage": author->image,
    "categories": categories[]->title
  }`;

  const article = await client.fetch<SanityArticle | null>(query, { slug });

  // Use Next.js' built-in 404 page instead of rendering an empty article.
  if (!article) {
    notFound();
  }

  const { title, publishedAt, mainImage, body, authorName, authorImage, categories } = article;
  const readTime = calculateRichTextReadTime(body);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      
      {/* ── Full-Width Page Header Section ── */}
      <header className="w-full bg-gradient-to-r from-[#0A2B23] via-[#122938] to-[#1C1A36] py-16 md:py-24 border-b border-white/5">
        <div className="mx-auto max-w-3xl px-6 flex flex-col items-start">
          
          {/* Back to Archive Button */}
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-teal)] hover:text-white transition-colors duration-200 mb-8 group"
          >
            <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-1" />
            Back to Articles
          </Link>

          {/* Category Pills */}
          {categories && categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full bg-[var(--color-accent-teal)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-black/80"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* Article Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            {title}
          </h1>

          {/* Metadata Section - Medium Style */}
          <div className="flex items-center gap-4 text-sm border-t border-white/10 pt-6 w-full">
            
            {/* Author Avatar (left) */}
            {authorImage?.asset?._ref ? (
              <div className="relative h-10 w-10 rounded-full overflow-hidden border border-white/10 shrink-0">
                <Image
                  src={urlFor(authorImage)}
                  alt={authorName}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm text-[var(--color-accent-teal)] font-bold shrink-0">
                {authorName ? authorName.substring(0, 2).toUpperCase() : "AU"}
              </div>
            )}
            
            {/* Stacked Info (right) */}
            <div className="flex flex-col gap-1 text-xs text-[var(--color-text-muted)]">
              <span className="font-semibold text-white/95 text-sm leading-none">{authorName || "Unknown Author"}</span>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-[var(--color-accent-teal)] font-medium">{readTime} min read</span>
                <span className="opacity-45">&bull;</span>
                <span>{formatDate(publishedAt)}</span>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* ── Page Content Container ── */}
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-[117px] py-12 md:py-20">
        <div className="mx-auto max-w-3xl">
          
          {/* Main Featured Image */}
          {mainImage?.asset?._ref && (
            <figure className="mb-12">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/5 bg-black">
                <Image
                  src={urlFor(mainImage)}
                  alt={mainImage.alt || title}
                  fill
                  unoptimized
                  className="w-full h-full object-contain"
                />
              </div>
              {mainImage.caption && (
                <figcaption className="mt-3 text-xs md:text-sm text-center text-[var(--color-text-muted)] italic">
                  {mainImage.caption}
                </figcaption>
              )}
            </figure>
          )}

          {/* Portable Text Rich-Text Article Body */}
          <div className="prose prose-invert max-w-none">
            <PortableText value={body} components={components} />
          </div>

        </div>
      </div>
    </div>
  );
}
