import { notFound } from 'next/navigation';
import { client } from '../../../sanity/client'; 
import { PortableText } from '@portabletext/react'; 

const query = `*[_type == "event" && slug.current == $slug][0]{
  title, slug, date, location, description, body, registrationUrl, category,
  "imageUrl": image.asset->url
}`;

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const event = await client.fetch(query, { slug: resolvedParams.slug });

  if (!event) {
    notFound();
  }

  const isPast = new Date(event.date) < new Date();

  return (
    <main className="bg-[#080811] text-white min-h-screen pt-16 pb-20 font-sans">
      
      {/* 1. TITLE (32px, Bold, Center, Light Blue to Green Gradient) */}
      <div className="px-5 text-center mb-10">
        <h1 className="text-[32px] font-bold text-center inline-block bg-gradient-to-r from-blue-300 to-green-400 text-transparent bg-clip-text">
          {event.title}
        </h1>
      </div>

      {/* 2. COVER IMAGE */}
      {event.imageUrl && (
        <div className="w-full max-w-[900px] mx-auto px-5 mb-10">
          <img 
            src={event.imageUrl} 
            alt={event.title} 
            className="w-full h-auto max-h-[450px] object-cover rounded-xl shadow-lg border border-gray-800"
          />
        </div>
      )}

      <div className="max-w-[720px] mx-auto px-5">
        
        {/* 3. EXPLANATION TEXT (15px, Semi-Bold, 120% Line Height, Center) */}
        {event.description && (
          <p className="text-[15px] font-semibold leading-[1.2] text-center text-gray-300 mb-8 mx-auto">
            {event.description}
          </p>
        )}

        {/* METADATA (Category, Date, Location) - Matching the 15px Semi-bold font */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-[15px] font-semibold text-gray-300 mb-12">
            {event.category && (
                <span className="bg-[#8280E5] text-white px-4 py-1.5 rounded-full uppercase tracking-wider text-xs font-bold">
                  {event.category}
                </span>
            )}
           <span className="flex items-center gap-2">📅 {new Date(event.date).toLocaleDateString()}</span>
           <span className="flex items-center gap-2">📍 {event.location}</span>
        </div>
        
        {/* REGISTRATION CTA */}
        <div className="mb-12 flex justify-center">
          {isPast ? (
            <div className="flex flex-col items-center gap-2">
              <span className="text-red-400 font-bold uppercase tracking-widest text-sm">Past Event</span>
              <button disabled className="bg-gray-800 text-gray-500 py-3 px-8 rounded-lg cursor-not-allowed text-[15px] font-semibold border border-gray-700">
                Registration Closed
              </button>
            </div>
          ) : (
            <a 
              href={event.registrationUrl} 
              className="bg-[#1CE1A4] text-[#080811] text-[15px] font-bold py-3 px-8 rounded-lg hover:scale-105 hover:bg-[#15c58f] transition-all shadow-[0_0_15px_rgba(28,225,164,0.2)]"
            >
              Register for Event
            </a>
          )}
        </div>

        {/* BODY CONTENT */}
        <div className="prose prose-invert max-w-none mx-auto text-center prose-p:text-center prose-p:text-gray-300 prose-p:text-[15px] prose-p:font-semibold prose-p:leading-[1.2] prose-headings:text-center prose-li:text-center prose-li:text-gray-300 prose-li:text-[15px] prose-li:font-semibold prose-ul:list-inside prose-ol:list-inside prose-strong:text-gray-200">
          <PortableText value={event.body} />
        </div>

        {/* BACK LINK */}
        <div className="mt-16 border-t border-gray-800 pt-8">
            <a href="/events" className="text-[#1CE1A4] hover:underline flex items-center gap-2 text-[15px] font-semibold">
                ← Back to Events
            </a>
        </div>

      </div>
    </main>
  );
}