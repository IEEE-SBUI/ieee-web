import { Corridor, CORRIDOR_COLORS } from "@/src/lib/tokens";

interface CorridorCardProps {
  /** Corridor this card represents; drives the top-accent pill color. */
  corridor: Corridor;

  /** Display title for the corridor. */
  title: string;

  /** Short description of what the corridor does. */
  description: string;

  /** Optional extra CSS classes. */
  className?: string;
}

/**
 * Corridor preview card used in the homepage "Corridor Overview" section.
 *
 * Shows a short rounded top-accent pill colored by corridor, a title, and a
 * description. Distinct from `DivisionCard` (which has a full-width top border
 * and a "Corridor I/II/III" eyebrow) and intentionally kept separate so the
 * divisions page styling is unaffected.
 *
 * @returns A corridor preview card.
 */
export default function CorridorCard({
  corridor,
  title,
  description,
  className = "",
}: CorridorCardProps) {
  const color = CORRIDOR_COLORS[corridor];

  return (
    <div
      className={`flex h-full min-h-[240px] flex-col rounded-[12px] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-8 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[var(--hover-border-color)] ${className}`}
      style={{ "--hover-border-color": color } as React.CSSProperties}
    >
      {/* Short rounded top-accent pill, colored by corridor. */}
      <span
        className="mb-6 block h-1.5 w-12 rounded-full"
        style={{ background: color }}
        aria-hidden="true"
      />

      <h3 className="mb-4 text-xl font-bold leading-snug text-white">{title}</h3>

      <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
        {description}
      </p>
    </div>
  );
}
