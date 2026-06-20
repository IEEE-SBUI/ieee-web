import { client } from "@/src/sanity/client";
import { Corridor, CORRIDOR_COLORS } from "@/src/lib/tokens";
import DivisionCard from "@/src/features/divisions/components/DivisionCard";

/**
 * Revalidate at most once a minute so divisions edited in Sanity appear
 * without a redeploy.
 */
export const revalidate = 60;

/** Shape of a division row returned by the GROQ query below. */
interface Division {
  abbreviation: string;
  fullName: string;
  corridor: Corridor;
  description: string;
}

const DIVISIONS_QUERY = `*[_type == "division"] | order(order asc){
  abbreviation, fullName, corridor, description
}`;

/** Corridors in their fixed display order. */
const CORRIDORS: Corridor[] = [
  "Internal Operations",
  "Education and Development",
  "Public Relations",
];

/**
 * Divisions page (route `/divisions`).
 *
 * Fetches all divisions from Sanity, groups them by corridor, and renders each
 * group with the shared DivisionCard. The Navbar and Footer come from the root
 * layout, so this page only renders its own content.
 *
 * @returns The divisions page.
 */
export default async function DivisionsPage() {
  const divisions = (await client.fetch<Division[]>(DIVISIONS_QUERY)) ?? [];

  return (
    <div>
      {/* Page header on the dark gradient strip */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--theme-dark-gradient)" }}
      >
        <div className="mx-auto max-w-[1440px] px-6 py-20 text-center sm:px-12 md:py-28 lg:px-[117px]">
          <h1 className="text-gradient pb-1 text-4xl font-bold leading-tight md:text-5xl">
            Our Divisions
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-text-muted)]">
            Discover the structure of our student branch and learn about the
            different teams working together.
          </p>
        </div>
      </section>

      {/* Corridor groups */}
      <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-12 md:py-24 lg:px-[117px]">
        {CORRIDORS.map((corridor) => {
          const items = divisions.filter((d) => d.corridor === corridor);
          if (items.length === 0) return null;

          // Two-division corridor grows to 2 columns; larger ones to 3.
          const gridColumns =
            items.length <= 2
              ? "md:grid-cols-2"
              : "md:grid-cols-2 lg:grid-cols-3";

          return (
            <section key={corridor} className="mb-16 last:mb-0">
              <h2
                className="mb-8 text-2xl font-bold md:text-3xl"
                style={{ color: CORRIDOR_COLORS[corridor] }}
              >
                {corridor}
              </h2>

              <div className={`grid grid-cols-1 gap-6 ${gridColumns}`}>
                {items.map((division) => (
                  <DivisionCard
                    key={division.abbreviation}
                    abbreviation={division.abbreviation}
                    fullName={division.fullName}
                    description={division.description}
                    corridor={division.corridor}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
