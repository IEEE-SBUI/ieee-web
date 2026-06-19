import { Corridor, CORRIDOR_COLORS } from "@/src/lib/tokens";

/**
 * Labels for each corridor type.
 *
 * This is used to convert internal corridor keys into display text.
 */
const CORRIDOR_LABELS: Record<Corridor, string> = {
  "Internal Operations": "Corridor I",
  "Education and Development": "Corridor II",
  "Public Relations": "Corridor III",
};

interface DivisionCardProps {
  /** Name of the division (example: "Web Development"). */
  title: string;

  /** Short explanation of what the division does. */
  description: string;

  /**
   * The corridor this division belongs to.
   * This controls both label text and theme color.
   */
  corridor: Corridor;

  /** Optional extra CSS classes passed from parent components. */
  className?: string;
}

/**
 * DivisionCard component.
 *
 * Displays a division in a styled card format.
 * Each card has a colored top border based on its corridor.
 * Shows the corridor label, division title, and description.
 */
export default function DivisionCard({
  title,
  description,
  corridor,
  className = "",
}: DivisionCardProps) {
  // Get the theme color for this corridor
  const color = CORRIDOR_COLORS[corridor];

  // Convert corridor key into readable label (e.g. "Corridor I")
  const label = CORRIDOR_LABELS[corridor];

  return (
    <div
      className={`flex h-full flex-col rounded-[10px] border border-[rgba(255,255,255,0.06)] bg-[#0c1517] p-8 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[var(--hover-border-color)] ${className}`}
      style={
        {
          // Top border uses corridor color for branding consistency
          borderTop: `8px solid ${color}`,

          // CSS variable used for hover border transition
          "--hover-border-color": color,
        } as React.CSSProperties
      }
    >
      {/* Corridor label (e.g. Corridor I, II, III) */}
      <span className="text-[0.8rem] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
        {label}
      </span>

      {/* Division title */}
      <h3 className="text-[1.4rem] font-bold leading-snug text-white mb-4">
        {title}
      </h3>

      {/* Division description */}
      <p className="text-[0.9rem] leading-relaxed text-[var(--color-text-muted)]">
        {description}
      </p>
    </div>
  );
}