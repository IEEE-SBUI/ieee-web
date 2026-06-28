import React from "react";
import PageHeader from "@/src/components/PageHeader";
import Card from "@/src/components/Card";
import SectionHeading from "@/src/components/SectionHeading";
import AnimatedStatItem from "@/src/features/about/components/AnimatedStatItem";
import { Starburst } from "@/src/components/DecorativeShapes";
import { Flag, Target } from "lucide-react";

/**
 * About Us page (route `/about`).
 */
const STATS = [
  { value: "1st", label: "Established in Indonesia" },
  { value: "8", label: "Divisions" },
  { value: "50+", label: "Members" },
];

const HISTORY = [
  {
    year: "2022",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae nisi non risus luctus interdum. Curabitur ut augue vel lorem dignissim tristique.",
  },
  {
    year: "2023",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae nisi non risus luctus interdum. Curabitur ut augue vel lorem dignissim tristique.",
  },
  {
    year: "2024",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae nisi non risus luctus interdum. Curabitur ut augue vel lorem dignissim tristique.",
  },
  {
    year: "2025",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae nisi non risus luctus interdum. Curabitur ut augue vel lorem dignissim tristique.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <PageHeader
        title="About IEEE SBUI"
        description="Discover the history, vision, and mission of the first IEEE Student Branch in Indonesia, and how we foster engineering excellence."
      />

      <main className="mx-auto max-w-[1440px] px-6 py-16 sm:px-12 lg:px-[117px]">
        {/* Who We Are Intro */}
        <section className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <span className="text-[var(--color-accent-teal)] font-bold text-xs uppercase tracking-widest block mb-2">
              Established 1993
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight uppercase">
              A Legacy of <br />
              <span className="text-gradient">Innovation</span>
            </h2>
            {/* Playful starburst sticker */}
            <div className="absolute -top-6 -right-6 md:-right-12">
              <Starburst text="1st SB" size="w-16 h-16 md:w-20 md:h-20" className="rotate-[15deg] hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div className="lg:col-span-7 bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-10 relative overflow-hidden backdrop-blur-sm shadow-md">
            {/* Subtle background blob */}
            <div className="absolute -right-20 -bottom-20 w-48 h-48 rounded-full bg-[var(--color-accent-teal)]/5 blur-3xl pointer-events-none" />
            <p className="text-lg md:text-xl leading-relaxed text-[var(--color-text-muted)] font-medium">
              IEEE Student Branch Universitas Indonesia was the first IEEE Student Branch in the country. Since then, we have grown into eight divisions covering engineering, research, events, and media.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-[rgba(200,205,211,0.8)] mt-4">
              Each division runs its own projects throughout the year, giving members opportunities to participate in workshops, competitions, research, publications, and leadership roles that help them grow as future engineers and leaders.
            </p>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="mb-24">
          <SectionHeading heading="Vision and Mission" />

          <div className="mt-12 grid items-start gap-12 md:grid-cols-2">
            {/* Vision */}
            <Card
              variant="icon"
              icon={Target}
              title="Our Vision"
              className="h-full pt-2 pb-5"
            >
              <div className="mt-1 text-left">
                <p className="text-sm leading-7 text-[rgba(200,205,211,0.8)]">
                  Ensure each member is driven by shared goals and ideas,
                  gathering together in the field of electrical and electronics
                  engineering to work in harmony for the betterment and
                  advancement of humanity.
                </p>
              </div>
            </Card>

            {/* Mission */}
            <Card
              variant="icon"
              icon={Flag}
              title="Our Mission"
              className="h-full pt-2 pb-5"
            >
              <div className="mt-1 space-y-3 text-left">
                <div className="flex items-start gap-2">
                  <span className="w-8 shrink-0 text-lg font-bold text-[var(--color-accent-teal)]">
                    01
                  </span>

                  <p className="text-sm leading-7 text-[rgba(200,205,211,0.8)]">
                    Unite collective goals and shared ideas in harmony, involve
                    in technological advancement, resolve challenges through
                    supportive teamwork, and evolve for the betterment of
                    humanity.
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-8 shrink-0 text-lg font-bold text-[var(--color-accent-teal)]">
                    02
                  </span>

                  <p className="text-sm leading-7 text-[rgba(200,205,211,0.8)]">
                    Strengthen internalization in all positions with a balanced
                    nuance of professionalism and togetherness in a healthy work
                    environment.
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-8 shrink-0 text-lg font-bold text-[var(--color-accent-teal)]">
                    03
                  </span>

                  <p className="text-sm leading-7 text-[rgba(200,205,211,0.8)]">
                    Advance members&apos; passion and understanding in the field of
                    electrical and electronic engineering and all IEEE
                    Societies.
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-8 shrink-0 text-lg font-bold text-[var(--color-accent-teal)]">
                    04
                  </span>

                  <p className="text-sm leading-7 text-[rgba(200,205,211,0.8)]">
                    Expand IEEE SBUI&apos;s influence as a passionate community and a
                    prominent student branch in IEEE Global.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Stats */}
        <section className="mx-auto mb-24 max-w-4xl">
          <div className="rounded-3xl border border-white/10 bg-[var(--color-bg-card)] px-10 py-12">

            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-accent-teal)]">
                  Student Branch
                </p>

                <h2 className="mt-2 text-gradient text-5xl font-black">
                  IEEE SBUI
                </h2>

                <span className="text-2xl font-semibold text-white/80">
                  2026
                </span>
              </div>

              <div className="grid grid-cols-3 gap-6 sm:gap-14">
                {STATS.map((stat) => (
                  <AnimatedStatItem
                    key={stat.label}
                    value={stat.value}
                    label={stat.label}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* History */}
        <section className="mb-24">
          <SectionHeading heading="Our Journey" />

          <div className="mx-auto max-w-4xl relative pl-8 border-l border-white/10 space-y-12">
            {/* Floating glowing timeline track indicator */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[var(--color-accent-teal)] via-[#46BCED] to-[#8280E5]" />

            {HISTORY.map((item, index) => (
              <div
                key={item.year}
                className="relative group transition-all duration-300 hover:translate-x-1"
              >
                {/* Timeline node */}
                <div className="absolute -left-[41px] top-1.5 z-10 h-6 w-6 rounded-full bg-[var(--color-bg-primary)] border-2 border-[var(--color-accent-teal)] flex items-center justify-center transition-all duration-300 group-hover:border-[#46BCED] group-hover:scale-110">
                  <div className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent-teal)] group-hover:bg-[#46BCED]" />
                </div>

                {/* Content card */}
                <div className="bg-white/[0.015] hover:bg-white/[0.035] border border-white/5 hover:border-white/10 rounded-2xl p-6 md:p-8 transition-all duration-300 shadow-md">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase text-black bg-[var(--color-accent-teal)] mb-3">
                    {item.year}
                  </span>
                  <p className="leading-relaxed text-[var(--color-text-muted)] text-sm md:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="mb-16">
          <SectionHeading heading="Contact Us" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div className="max-w-[400px] justify-self-center md:justify-self-start lg:pl-12">

              <div className="mb-10">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-accent-teal)]">
                  Email
                </p>

                <a
                  href="mailto:ieeesbui2026@gmail.com"
                  className="text-2xl font-semibold text-white transition hover:text-[var(--color-accent-teal)]"
                >
                  ieeesbui2026@gmail.com
                </a>
              </div>

              <div className="mb-10">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-accent-teal)]">
                  Address
                </p>

                <p className="leading-8 text-[var(--color-text-muted)]">
                  Faculty of Engineering
                  <br />
                  Universitas Indonesia
                  <br />
                  Depok, West Java, Indonesia
                </p>
              </div>

              <a
                href="https://maps.google.com/?q=Faculty+of+Engineering+Universitas+Indonesia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent-teal)] px-6 py-3 text-sm font-semibold text-[var(--color-accent-teal)] transition-all duration-300 hover:bg-[var(--color-accent-teal)] hover:text-black"
              >
                Open Google Maps →
              </a>

            </div>

            {/* Right */}
            <div className="flex justify-center">
            <div className="w-full max-w-[500px] overflow-hidden rounded-2xl border border-white/10 shadow-lg">
              <iframe
                title="IEEE SBUI Location"
                src="https://www.google.com/maps?q=Faculty+of+Engineering+Universitas+Indonesia&output=embed"
                loading="lazy"
                className="h-[300px] w-full"
              />
            </div>
          </div>
        </div>
      </section>
      </main>
    </div>
  );
}