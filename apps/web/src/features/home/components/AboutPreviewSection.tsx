import Image from "next/image";
import Button from "@/src/components/Button";
import StatItem from "@/src/features/home/components/StatItem";

/** Key chapter statistics shown beneath the about copy. */
const STATS = [
  { value: "1st", label: "Established in Indonesia" },
  { value: "8", label: "Divisions" },
  { value: "50+", label: "Members" },
];

/**
 * Homepage "About Preview" section.
 *
 * Left: a white left-aligned heading, two descriptive paragraphs, a row of
 * key statistics, and a link to the full About page.
 * Right: a Universitas Indonesia campus photo.
 *
 * Purely presentational and rendered on the server (no props, no data).
 *
 * @returns The about preview section element.
 */
export default function AboutPreviewSection() {
  return (
    <section aria-labelledby="about-heading" className="content-visibility-auto intrinsic-about-preview">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 py-16 sm:px-12 md:py-24 lg:grid-cols-2 lg:px-[117px]">
        {/* Left: copy + stats + CTA */}
        <div className="flex flex-col gap-6">
          <h2
            id="about-heading"
            className="text-3xl font-bold leading-tight text-white md:text-4xl"
          >
            The First IEEE Student Branch in Indonesia
          </h2>

          <p className="text-base leading-relaxed text-[var(--color-text-muted)]">
            IEEE Student Branch Universitas Indonesia was the first IEEE Student
            Branch in the country. Since then we have grown into eight divisions
            that cover engineering, research, events, and media.
          </p>

          <p className="text-base leading-relaxed text-[var(--color-text-muted)]">
            Each division runs its own projects through the year. Members join
            workshops and competitions, work on research, write for our
            publications, and take on roles that help them grow as engineers and
            leaders.
          </p>

          <div
            className="border-t border-[var(--color-border)]"
            aria-hidden="true"
          />

          <div className="flex flex-wrap gap-8 py-2">
            {STATS.map((stat) => (
              <StatItem key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>

          <div>
            <Button variant="secondary" href="/about">
              Learn More About Us
            </Button>
          </div>
        </div>

        {/* Right: Universitas Indonesia campus photo. */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[var(--color-border)]">
          <Image
            src="/ui-campus.jpg"
            alt="Universitas Indonesia campus"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
