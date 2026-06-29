import { notFound } from 'next/navigation';
import { client, urlFor } from '@/src/sanity/client'; 
import { PortableText, PortableTextComponents } from '@portabletext/react'; 
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, MapPin, Share2 } from 'lucide-react';

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

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await client.fetch<SanityEvent | null>(query, { slug });

  if (!event) {
    notFound();
  }

  const { title, date, location, description, body, registrationUrl, category, imageUrl } = event;
  const isPast = new Date(date) < new Date();

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] pb-16">
      
      {/* Sleek Top Bar (Matches Mobile Mockup Header) */}
      <div className="mx-auto max-w-3xl px-6 py-6 flex items-center justify-between border-b border-white/5">
        <Link 
          href="/events" 
          className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-[var(--color-accent-teal)] hover:bg-white/10 transition-all cursor-pointer"
        >
          <ArrowLeft size={16} />
        </Link>
        <span className="text-sm font-semibold uppercase tracking-[0.15em] text-white/60">Event Detail</span>
        <div className="w-10 h-10" aria-hidden="true" />
      </div>

      {/* Main Details Panel */}
      <div className="mx-auto max-w-3xl px-6 py-8 flex flex-col gap-6">
        
        {/* Large Rounded Event Image */}
        {imageUrl && (
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[24px] border border-white/10 bg-black/40 shadow-2xl">
            <Image
              src={imageUrl}
              alt={title}
              fill
              unoptimized
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white mt-2 leading-snug tracking-tight text-left">
          {title}
        </h1>

        {/* Metadata Details Row */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs md:text-sm text-[var(--color-text-muted)] pb-6 border-b border-white/5">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-white/40" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-white/40" />
            <span>
              {new Date(date).toLocaleDateString("en-US", { 
                year: "numeric", 
                month: "long", 
                day: "numeric" 
              })}
            </span>
          </div>
          {category && (
            <span className="rounded-full bg-[var(--color-accent-teal)]/[0.08] border border-[var(--color-accent-teal)]/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-accent-teal)]">
              {category}
            </span>
          )}
        </div>

        {/* Event Info Header */}
        <h2 className="text-lg sm:text-xl font-bold text-white mt-4 text-left">
          Event Info
        </h2>

        {/* Short Description */}
        {description && (
          <p className="text-sm sm:text-base leading-relaxed text-[var(--color-text-muted)] font-medium text-left">
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
        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between gap-4">
          <button 
            type="button"
            className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-[var(--color-accent-teal)] hover:bg-white/10 transition-all shrink-0 cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Event link copied to clipboard!");
            }}
            title="Share event link"
          >
            <Share2 size={18} />
          </button>

          {isPast ? (
            <button disabled className="flex-1 h-12 bg-white/5 border border-white/10 text-white/30 rounded-xl cursor-not-allowed text-xs font-bold uppercase tracking-wider">
              Registration Closed
            </button>
          ) : (
            <a
              href={registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-accent-teal)] px-8 text-xs font-bold text-[var(--color-bg-primary)] transition-all duration-300 hover:bg-[#15c58f] shadow-[0_0_15px_rgba(28,225,164,0.15)] uppercase tracking-wider"
            >
              Register for Event
            </a>
          )}
        </div>

      </div>
    </main>
  );
}