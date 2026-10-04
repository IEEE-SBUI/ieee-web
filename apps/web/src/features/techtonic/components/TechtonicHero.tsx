import Image from 'next/image';
import { TECHTONIC_CONFIG, isArchived } from '../data/techtonicConfig';

export default function TechtonicHero() {
  return (
    <section className="hero-bg relative overflow-hidden flex min-h-[75vh] items-center py-16 sm:py-24 border-b border-[var(--color-border)]">
      {/* Abstract topographical lines matching homepage */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          fill="none"
        >
          {Array.from({ length: 18 }).map((_, i) => {
            const offset = i * 90 - 300;
            return (
              <path
                key={i}
                d={`M ${offset},-100 C ${offset + 300},200 ${offset + 100},600 ${offset + 800},1000`}
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1.2"
              />
            );
          })}
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-[117px] w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7">
            <h1 className="text-4xl sm:text-6xl font-bold text-white">
              Techtonic <span className="text-gradient">3.0</span>
            </h1>

            <p className="mt-3 text-xl sm:text-2xl font-medium text-[var(--color-accent-sky)]">
              {TECHTONIC_CONFIG.tagline}
            </p>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-[var(--color-text-muted)] max-w-2xl">
              {TECHTONIC_CONFIG.shortDescription}
            </p>

            {/* Status Note if Archived */}
            {isArchived && (
              <p className="mt-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 text-sm text-amber-300">
                This event has concluded. Information and guidebooks are preserved for archive.
              </p>
            )}

            {/* Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {!isArchived ? (
                <a
                  href={TECHTONIC_CONFIG.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[var(--color-accent-teal)] to-[var(--color-accent-sky)] px-6 py-3 text-sm font-bold text-[#080811] hover:opacity-90 transition-opacity"
                >
                  Register Now
                </a>
              ) : (
                <span className="inline-flex items-center justify-center rounded-lg bg-gray-800 px-6 py-3 text-sm font-semibold text-gray-400 cursor-not-allowed">
                  Registration Closed
                </span>
              )}

              <a
                href={TECHTONIC_CONFIG.guidebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:border-white/40 transition-colors"
              >
                View Guidebook
              </a>

              <a
                href="#competitions"
                className="inline-flex items-center text-sm font-medium text-[var(--color-text-muted)] hover:text-white transition-colors"
              >
                Explore Competitions ↓
              </a>
            </div>

            {/* Metadata Bar */}
            <div className="mt-12 pt-6 border-t border-[var(--color-border)] grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs text-[var(--color-text-muted)]">
              <div>
                <span className="text-gray-400 block">Event Edition</span>
                <span className="text-white font-semibold text-sm mt-0.5 block">Techtonic 3.0</span>
              </div>
              <div>
                <span className="text-gray-400 block">Tracks</span>
                <span className="text-white font-semibold text-sm mt-0.5 block">BPC • STASH • STEM</span>
              </div>
              <div>
                <span className="text-gray-400 block">Grand Finale</span>
                <span className="text-white font-semibold text-sm mt-0.5 block">21 November 2025</span>
              </div>
            </div>
          </div>

          {/* Right Column: Unboxed Intentional Hero Graphic with Warm Ambient Glow & Subtle Tilt */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            {/* Subtle soft radial glow behind logo sampled from warm orange/yellow logo tones */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] rounded-full blur-3xl opacity-35"
              style={{
                background: 'radial-gradient(circle, rgba(245, 124, 0, 0.4) 0%, rgba(25, 118, 210, 0.15) 60%, transparent 100%)',
              }}
              aria-hidden="true"
            />

            {/* Unboxed Crisp Hero Logo Graphic */}
            <div className="relative z-10 w-[260px] sm:w-[300px] lg:w-[340px] transform -rotate-[2.5deg] hover:rotate-0 transition-transform duration-500 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
              <Image
                src="/techtonic-logo.jpg"
                alt="Techtonic 3.0 Official Event Graphic"
                width={340}
                height={340}
                className="w-full h-auto object-contain rounded-2xl"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
