import { client } from "@/src/sanity/client";
import { Corridor, CORRIDOR_COLORS } from "@/src/lib/tokens";
import DivisionCard from "@/src/features/divisions/components/DivisionCard";
import PageHeader from "@/src/components/PageHeader";

/**
 * Revalidate at most once a minute so divisions edited in Sanity appear
 * without a redeploy.
 */
export const revalidate = 60;

export const metadata = {
  title: "Divisions",
  description: "Explore the different operational corridors and student divisions that build projects and manage communities in IEEE SBUI.",
};

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

/** Display names for corridor headings (the corridor value stays the key). */
const CORRIDOR_DISPLAY_NAMES: Record<Corridor, string> = {
  "Internal Operations": "Internal Operations",
  "Education and Development": "Education Development",
  "Public Relations": "Public Relations",
};

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
  let divisions: Division[] = [];
  try {
    divisions = (await client.fetch<Division[]>(DIVISIONS_QUERY)) ?? [];
  } catch (error) {
    // Sanity is unreachable (e.g. network issue at build time or runtime).
    // Render the page with an empty state rather than crashing the build.
    console.error("Failed to fetch divisions from Sanity:", error);
  }
  
  return (
    <div>
      {/* Page header on the dark gradient strip */}
      <PageHeader
        title="Our Divisions"
        description="Discover the structure of our student branch and learn about the different teams working together."
      />

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
                {CORRIDOR_DISPLAY_NAMES[corridor]}
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