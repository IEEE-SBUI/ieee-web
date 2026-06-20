interface SectionHeadingProps {
  /** Main section title displayed with gradient styling. */
  heading: string;
}

/**
 * Standard section header used across the site.
 *
 * Keeps consistent spacing and typography for page sections,
 * matching the design system from Figma.
 *
 * @returns A section heading block with label and title.
 */
export default function SectionHeading({
  heading,
}: SectionHeadingProps) {
  return (
    <div className="mb-8">
      {/* leading-tight + pb-1 keep descenders (g, y, p, q) from clipping
          under background-clip: text. */}
      <h2 className="text-gradient pb-1 text-3xl font-bold leading-tight md:text-4xl">
        {heading}
      </h2>
    </div>
  );
}