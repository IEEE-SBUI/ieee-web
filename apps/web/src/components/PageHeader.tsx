import React from "react";
import { WobblyBlob, Starburst, GradientMusicNote, PlayfulTitle } from "@/src/components/DecorativeShapes";

interface PageHeaderProps {
  /** The primary heading text for the page. */
  title: string;
  /** A supportive paragraph or description text below the heading. */
  description: string;
  /** An optional uppercase tracking text rendered above the primary heading. */
  eyebrow?: string;
}

/**
 * A shared full-width page header component with a dark gradient background,
 * wobbly organic blob title, spiky starburst decal, concentric circular sound waves,
 * and floating instrumental music notes.
 *
 * @param props - Component configuration properties.
 */
export default function PageHeader({ title, description, eyebrow }: PageHeaderProps) {
  return (
    <header className="relative w-full min-h-[380px] bg-gradient-to-br from-[#0A2B23] via-[#0E202B] to-[#1C1A36] border-b border-white/5 overflow-hidden flex items-center py-16">
      {/* Concentric circular sound waves/ripples in background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        {/* Top-left ripples */}
        <svg className="absolute -top-40 -left-40 w-[600px] h-[600px] text-[var(--color-accent-teal)]" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="250" cy="250" r="100" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="250" cy="250" r="150" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="250" cy="250" r="200" stroke="currentColor" strokeWidth="1.2" strokeDasharray="6 6" />
          <circle cx="250" cy="250" r="250" stroke="currentColor" strokeWidth="1" />
          <circle cx="250" cy="250" r="300" stroke="currentColor" strokeWidth="1" />
        </svg>

        {/* Bottom-right ripples */}
        <svg className="absolute -bottom-40 -right-40 w-[600px] h-[600px] text-[#7B61FF]" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="250" cy="250" r="100" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="250" cy="250" r="150" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
          <circle cx="250" cy="250" r="200" stroke="currentColor" strokeWidth="1" />
          <circle cx="250" cy="250" r="250" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
          <circle cx="250" cy="250" r="300" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* Floating music notes with float animations */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <GradientMusicNote type="double" size="w-10 h-10" className="absolute top-12 left-[15%] note-float-1 opacity-70 rotate-[12deg]" />
        <GradientMusicNote type="single" size="w-8 h-8" className="absolute bottom-12 left-[25%] note-float-2 opacity-50 -rotate-[15deg]" />
        <GradientMusicNote type="double" size="w-9 h-9" className="absolute top-16 right-[20%] note-float-3 opacity-60 rotate-[-10deg]" />
        <GradientMusicNote type="single" size="w-8 h-8" className="absolute bottom-16 right-[12%] note-float-1 opacity-70 rotate-[20deg]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] w-full px-6 sm:px-12 lg:px-[117px] flex flex-col items-center justify-center text-center">
        {/* Eyebrow badge */}
        {eyebrow && (
          <p className="text-[var(--color-accent-teal)] text-xs md:text-sm font-semibold tracking-widest uppercase mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            {eyebrow}
          </p>
        )}

        {/* Title inside a Wobbly Blob shape from the reference */}
        <div className="relative mb-6">
          <WobblyBlob color="bg-[#1ce1a4]">
            <h1 aria-label={title} className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0B1A1E] tracking-tight uppercase px-5 py-5 font-sans">
              <PlayfulTitle text={title} />
            </h1>
          </WobblyBlob>

          {/* Spiky pink starburst decal overlapping the title wobbly shape */}
        </div>

        {/* Subtitle / description */}
        <p className="max-w-3xl text-sm md:text-base leading-relaxed text-[var(--color-text-muted)] font-medium rounded-xl px-4 py-2 border border-white/[0.02]">
          {description}
        </p>
      </div>
    </header>
  );
}

