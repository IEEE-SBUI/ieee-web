interface SectionHeadingProps {
  // Section title text
  heading: string;
}

// Shared section header component used across pages.
export default function SectionHeading({
  heading,
}: SectionHeadingProps) {
  return (
    <div className="mb-8">
      {/* leading-tight + pb-1 keep descenders (g, y, p, q) from clipping
          under background-clip: text. */}
      <h2 className="text-white md:text-gradient pb-1 text-3xl font-bold leading-tight md:text-4xl">
        {heading}
      </h2>
    </div>
  );
}