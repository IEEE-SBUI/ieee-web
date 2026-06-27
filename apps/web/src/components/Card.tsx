import { LucideIcon } from "lucide-react";

export type CardVariant = "numbered" | "icon";

/**
 * Props for the Card component.
 *
 * The component supports two layouts:
 * - "numbered": Displays a numbered card with custom content.
 * - "icon": Displays an icon, title, and description.
 */
export interface CardProps {
  /** Selects which card layout to render. */
  variant: CardVariant;

  /** Number displayed in the numbered card layout. */
  index?: number;

  /** Content rendered inside the numbered card layout. */
  children?: React.ReactNode;

  /** Icon displayed in the icon card layout. */
  icon?: LucideIcon;

  /** Heading displayed in the icon card layout. */
  title?: string;

  /** Supporting text displayed in the icon card layout. */
  description?: string;

  /** Optional classes for layout-specific styling. */
  className?: string;
}

/**
 * Reusable card component used across the site.
 *
 * The component supports two variants:
 * - "numbered" for ordered content sections. Left-justified with a large index number.
 * - "icon" for feature and value highlights. Centered with an icon, title, and description.
 *
 * @param variant - The card layout to render.
 * @param index - Number shown in numbered cards.
 * @param children - Custom content for numbered cards.
 * @param icon - Icon displayed in icon cards.
 * @param title - Heading displayed in icon cards.
 * @param description - Supporting text displayed in icon cards.
 * @param className - Additional CSS classes.
 * @returns A styled card component.
 */
export default function Card({
  variant,
  index,
  children,
  icon: Icon,
  title,
  description,
  className = "",
}: CardProps) {
  const sharedClasses = `
    relative overflow-hidden
    bg-[var(--color-bg-card)]
    transition-all duration-300 ease-out
    hover:-translate-y-0.5 hover:border-[var(--color-accent-teal)]
    ${className}
  `;

  if (variant === "numbered") {
    return (
      <div
        className={`
          rounded-2xl border border-[rgba(130,128,229,0.15)]
          ${sharedClasses}
        `}
      >
        <div className="p-6">
          {/* Leading zeros keep numbered cards visually aligned. */}
          {index !== undefined && (
            <p className="mb-4 text-4xl font-bold text-[var(--color-accent-teal)]">
              {String(index).padStart(2, "0")}
            </p>
          )}
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        group flex flex-col items-center rounded-[20px] border-2 border-[rgba(130,128,229,0.15)]
        px-[20px] pb-[43px] pt-[22px] text-center shadow-[0px_4px_2px_0px_rgba(0,0,0,0.25)]
        ${sharedClasses}
      `}
    >
      {/* SVG gradients cannot be applied through CSS to Lucide strokes. */}
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="brand-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1CE1A4" />
            <stop offset="50%" stopColor="#46BCED" />
            <stop offset="100%" stopColor="#8280E5" />
          </linearGradient>
        </defs>
      </svg>

      <div className={`flex flex-col items-center ${ children ? "gap-2 py-1" : "gap-[15px] py-[20px]"}`}
      >
        {Icon && (
          <Icon
            size={24}
            stroke="url(#brand-gradient)"
            strokeWidth={2}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:scale-110"
          />
        )}

        {title && (
          <h3 className="text-[20px] font-bold tracking-[-0.4px] text-white">
            {title}
          </h3>
        )}

        {children ? (
  <div className="w-full text-sm">
    {children}
  </div>
) : (
  description && (
    <p className="max-w-[207px] text-[13px] leading-relaxed tracking-[-0.26px] text-[rgba(200,205,211,0.8)]">
      {description}
    </p>
  )
)}
      </div>
    </div>
  );
}