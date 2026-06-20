import React from "react";

interface PageHeaderProps {
  /** The primary heading text for the page. */
  title: string;
  /** A supportive paragraph or description text below the heading. */
  description: string;
  /** An optional uppercase tracking text rendered above the primary heading. */
  eyebrow?: string;
}

/**
 * A shared full-width page header component with a dark gradient background.
 *
 * Used across sub-pages (Divisions, Articles Archive, etc.) to maintain consistent
 * heights, styling tokens, and responsive paddings.
 *
 * @param props - Component configuration properties.
 */
export default function PageHeader({ title, description, eyebrow }: PageHeaderProps) {
  return (
  <header className="w-full min-h-[400px] bg-gradient-to-r from-[#0A2B23] via-[#122938] to-[#1C1A36] border-b border-[rgba(255,255,255,0.05)]">
    <div className="mx-auto min-h-[400px] max-w-[1440px] px-6 sm:px-12 lg:px-[117px] flex flex-col items-center justify-center text-center">
        {eyebrow && (
          <p className="text-[var(--color-accent-teal)] text-xs md:text-sm font-semibold tracking-widest uppercase mb-3">
            {eyebrow}
          </p>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gradient mb-6 tracking-tight">
          {title}
        </h1>
        <p className="max-w-2xl text-sm md:text-base leading-relaxed text-[var(--color-text-muted)]">
          {description}
        </p>
      </div>
    </header>
  );
}
