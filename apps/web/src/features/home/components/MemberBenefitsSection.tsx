import SectionHeading from "@/src/components/SectionHeading";
import Card from "@/src/components/Card";

/** The four member benefits, shown as numbered cards. */
const BENEFITS = [
  {
    index: 1,
    title: "Professional Networking",
    description:
      "Meet students, alumni, and engineers from IEEE branches in Indonesia and abroad.",
  },
  {
    index: 2,
    title: "Technical Skill Development",
    description:
      "Join workshops and projects where you learn tools and methods used in real engineering work.",
  },
  {
    index: 3,
    title: "Leadership Experience",
    description:
      "Take on roles in divisions and events, and lead teams through real tasks and deadlines.",
  },
  {
    index: 4,
    title: "Access to IEEE Resources",
    description:
      "Use IEEE papers, courses, and member discounts to support your studies and career.",
  },
];

/**
 * Homepage "Member Benefits" section.
 *
 * A centered heading and four numbered cards (01-04) built from the shared
 * Card component, each describing a benefit of joining the branch.
 *
 * Purely presentational and rendered on the server (no props, no data).
 *
 * @returns The member benefits section element.
 */
export default function MemberBenefitsSection() {
  return (
    <section aria-labelledby="benefits-heading">
      <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-12 md:py-24 lg:px-[117px]">
        {/* Centered header */}
        <div className="mx-auto max-w-3xl text-center" id="benefits-heading">
          <SectionHeading heading="Member Benefits" />
        </div>

        {/* Numbered benefit cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit) => (
            <Card key={benefit.index} variant="numbered" index={benefit.index}>
              <h3 className="mb-2 text-lg font-bold leading-snug text-white">
                {benefit.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                {benefit.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
