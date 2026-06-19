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
      <h2 className="text-gradient text-3xl font-bold md:text-4xl">
        {heading}
      </h2>
    </div>
  );
}