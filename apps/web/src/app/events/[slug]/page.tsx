import { notFound } from 'next/navigation';
import { client, urlFor } from '@/src/sanity/client'; 
import { PortableText, PortableTextComponents } from '@portabletext/react'; 
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';
import EventActionsPanel from './EventActionsPanel';
import ShareButton from './ShareButton';

interface SanityEvent {
  title: string;
  slug: { current: string };
  date: string;
  location: string;
  description?: string;
  body: any[];
  registrationUrl?: string;
  category?: string;
  imageUrl?: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      const imageUrl = urlFor(value);
      return (
        <figure className="my-6 flex flex-col items-center gap-3">
          <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#0C1517] w-full aspect-video">
            <Image
              src={imageUrl}
              alt={value.alt || "Event image"}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
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
      <h2 className="text-xl md:text-2xl font-bold text-white mt-8 mb-4 tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg md:text-xl font-bold text-white mt-6 mb-3 tracking-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-base md:text-lg font-bold text-white mt-4 mb-2 tracking-tight">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-sm md:text-base leading-relaxed text-[var(--color-text-muted)] mb-4">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[var(--color-accent-teal)] bg-[#0C1517] px-5 py-4 my-6 rounded-r-xl italic text-white/90 text-sm md:text-base">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 text-[var(--color-text-muted)] space-y-2 text-sm md:text-base">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 text-[var(--color-text-muted)] space-y-2 text-sm md:text-base">
        {children}
      </ol>
    ),
  },
};

const query = `*[_type == "event" && slug.current == $slug][0]{
  title, slug, date, location, description, body, registrationUrl, category,
  "imageUrl": image.asset->url
}`;

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const event = await client.fetch<SanityEvent | null>(query, { slug });
  if (!event) return {};

  return {
    title: event.title,
    description: event.description || `Read about the event "${event.title}" hosted by IEEE Student Branch Universitas Indonesia.`,
    openGraph: {
      title: event.title,
      description: event.description,
      type: "article",
      images: event.imageUrl ? [{ url: event.imageUrl }] : [],
    },
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await client.fetch<SanityEvent | null>(query, { slug });

  if (!event) {
    notFound();
  }

  const { title, date, location, description, body, registrationUrl, category, imageUrl } = event;
  const isPast = new Date(date) < new Date();

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      
      {/* ── Full-Width Page Header Section ── */}
      <header className="w-full bg-gradient-to-r from-[#0A2B23] via-[#122938] to-[#1C1A36] py-16 md:py-24 border-b border-white/5">
        <div className="mx-auto max-w-3xl px-6 flex flex-col items-start">
          
          {/* Header Action Row */}
          <div className="flex w-full items-center justify-between mb-8">
            {/* Back to Events Button */}
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-teal)] hover:text-white transition-colors duration-200 group cursor-pointer"
            >
              <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-1" />
              Back to Events
            </Link>

            {/* Share Button */}
            <ShareButton />
          </div>

          {/* Category Pill */}
          {category && (
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="rounded-full bg-[var(--color-accent-teal)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-black/80">
                {category}
              </span>
            </div>
          )}

          {/* Event Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            {title}
          </h1>

          {/* Metadata Section */}
          <div className="flex flex-wrap items-center gap-6 text-sm border-t border-white/10 pt-6 w-full text-[var(--color-text-muted)]">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-[var(--color-accent-teal)]" />
              <span>
                {new Date(date).toLocaleDateString("en-US", { 
                  year: "numeric", 
                  month: "long", 
                  day: "numeric" 
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-[var(--color-accent-teal)]" />
              <span>{location}</span>
            </div>
            {isPast ? (
              <span className="text-red-400 font-semibold uppercase tracking-wider text-xs">Past Event</span>
            ) : (
              <span className="text-[var(--color-accent-teal)] font-semibold uppercase tracking-wider text-xs">Upcoming Event</span>
            )}
          </div>
        </div>
      </header>

      {/* ── Page Content Container ── */}
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-[117px] py-12 md:py-20">
        <div className="mx-auto max-w-3xl">
          
          {/* Main Featured Image */}
          {imageUrl && (
            <figure className="mb-12 flex justify-center">
              <div className="w-full overflow-hidden rounded-2xl border border-white/5 bg-black/40 shadow-lg">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-auto max-h-[600px] object-contain mx-auto"
                />
              </div>
            </figure>
          )}

          {/* Description Lead Text / Blockquote */}
          {description && (
            <p className="text-lg md:text-xl font-medium leading-relaxed text-white/90 border-l-4 border-[var(--color-accent-teal)] bg-[#0C1517] px-6 py-4 my-8 rounded-r-lg italic">
              {description}
            </p>
          )}

          {/* Rich-Text content */}
          {body && (
            <div className="prose prose-invert max-w-none text-left">
              <PortableText value={body} components={components} />
            </div>
          )}

          {/* Bottom Actions Row (Matches Mockup Footer Actions) */}
          <EventActionsPanel registrationUrl={registrationUrl} isPast={isPast} />

        </div>
      </div>
    </div>
  );
}