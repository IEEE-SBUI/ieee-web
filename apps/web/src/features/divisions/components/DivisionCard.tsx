import { Corridor, CORRIDOR_COLORS } from "@/src/lib/tokens";

interface DivisionCardProps {
  /** Short division name shown as the colored eyebrow (example: "WebDev"). */
  abbreviation: string;

  /** Full division name shown as the title (example: "Website Development"). */
  fullName: string;

  /** Short explanation of what the division does. */
  description: string;

  /**
   * The corridor this division belongs to.
   * Controls the pill accent, eyebrow, and hover border colors.
   */
  corridor: Corridor;

  /** Optional extra CSS classes passed from parent components. */
  className?: string;
}

/**
 * DivisionCard component.
 *
 * Matches the homepage CorridorCard style: a short rounded accent pill at the
 * top, then the abbreviation eyebrow, the full division name, and a short
 * description. The corridor drives the pill, eyebrow, and hover border colors.
 */
export default function DivisionCard({
  abbreviation,
  fullName,
  description,
  corridor,
  className = "",
}: DivisionCardProps) {
  // Theme color for this corridor (teal, indigo, or sky).
  const color = CORRIDOR_COLORS[corridor];

  return (
    <div
      className={`flex h-full min-h-[240px] flex-col rounded-[12px] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-8 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[var(--hover-border-color)] ${className}`}
      style={{ "--hover-border-color": color } as React.CSSProperties}
    >
      {/* Short rounded accent pill, colored by corridor. */}
      <span
        className="mb-5 block h-1.5 w-12 rounded-full"
        style={{ background: color }}
        aria-hidden="true"
      />

      {/* Abbreviation eyebrow, shown in the corridor color.
          Rendered as stored in Sanity to preserve mixed case (e.g. "WebDev"). */}
      <span
        className="mb-2 text-[0.8rem] font-semibold tracking-wider"
        style={{ color }}
      >
        {abbreviation}
      </span>

      {/* Full division name */}
      <h3 className="mb-3 text-xl font-bold leading-snug text-white">
        {fullName}
      </h3>

      {/* Division description */}
      <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
        {description}
      </p>
    </div>
  );
}
