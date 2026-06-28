import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/src/components/SectionHeading";
import CorridorCard from "@/src/features/home/components/CorridorCard";
import { Corridor } from "@/src/lib/tokens";

/** The three corridors previewed on the homepage. */
const CORRIDORS: { corridor: Corridor; title: string; description: string }[] = [
  {
    corridor: "Internal Operations",
    title: "Internal Operations",
    description:
      "Keeps the branch running day to day. Indev looks after internal development and members, while RnD works on new projects and ideas.",
  },
  {
    corridor: "Education and Development",
    title: "Education & Development",
    description:
      "Helps members learn. Seminar runs talks, WnC handles workshops and competitions, and Curjour takes care of curriculum and journalism.",
  },
  {
    corridor: "Public Relations",
    title: "Public Relations",
    description:
      "Connects the branch with people outside it. Exaff manages external affairs, MaM handles marketing and media, and WebDev builds this website.",
  },
];

/**
 * Homepage "Corridor Overview" section.
 *
 * A centered heading and intro, three corridor preview cards built from the
 * homepage CorridorCard, and a link through to the full divisions page.
 *
 * Purely presentational and rendered on the server (no props, no data).
 *
 * @returns The corridor overview section element.
 */
export default function CorridorOverviewSection() {
  return (
    <section
      className="relative overflow-hidden content-visibility-auto intrinsic-corridor"
      style={{ background: "var(--theme-dark-gradient)" }}
      aria-labelledby="corridor-heading"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-12 md:py-24 lg:px-[117px]">
        {/* Centered header + intro */}
        <div className="mx-auto max-w-3xl text-center">
          <div id="corridor-heading">
            <SectionHeading heading="Corridor Overview" />
          </div>
          <p className="text-base leading-relaxed text-[var(--color-text-muted)]">
            Our work is organized into three corridors. Each corridor groups a
            few divisions that share a focus, from running the branch to
            education and public outreach.
          </p>
        </div>

        {/* Corridor cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CORRIDORS.map((item) => (
            <CorridorCard
              key={item.title}
              corridor={item.corridor}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>

        {/* Link to all divisions */}
        <div className="mt-12 text-center">
          <Link
            href="/divisions"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent-teal)] transition-colors hover:text-white"
          >
            View All Divisions
            <ArrowRight
              size={18}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
