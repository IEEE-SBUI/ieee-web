import React from "react";
import PageHeader from "@/src/components/PageHeader";
import Card from "@/src/components/Card";
import AnimatedStatItem from "@/src/features/about/components/AnimatedStatItem";
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
        description="IEEE Student Branch Universitas Indonesia was the first IEEE Student Branch in the country. Since then, we have grown into eight divisions covering engineering, research, events, and media. Each division runs its own projects throughout the year, giving members opportunities to participate in workshops, competitions, research, publications, and leadership roles that help them grow as future engineers and leaders."
      />

      <main className="mx-auto max-w-[1440px] px-6 py-16 sm:px-12 lg:px-[117px]">
        {/* Vision & Mission */}
        <section className="mb-24">
          <div className="flex justify-center">
            <h2 className="text-gradient pb-1 text-3xl font-bold md:text-4xl">
              Vision and Mission
            </h2>
          </div>

          <div className="mt-12 grid items-start gap-12 lg:grid-cols-[1fr_1.4fr]">
            {/* Vision */}
            <div className="flex flex-col items-center justify-center px-6 text-center">
              <Target
                size={42}
                className="mb-6 text-[var(--color-accent-teal)]"
              />

              <h3 className="mb-6 text-3xl font-bold text-white">
                Our Vision
              </h3>

              <p className="max-w-sm text-lg leading-9 text-[var(--color-text-muted)]">
                Ensure each member is driven by shared goals and ideas,
                gathering together in the field of electrical and electronics
                engineering to work in harmony for the betterment and
                advancement of humanity.
              </p>
            </div>

            {/* Mission */}
            <Card
              variant="icon"
              icon={Flag}
              title="Our Mission"
              className="h-fit pt-2 pb-5"
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

              <div className="flex gap-14">
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
          <div className="mb-12 flex justify-center">
            <h2 className="text-gradient pb-1 text-3xl font-bold md:text-4xl">
              Our Journey
            </h2>
          </div>

          <div className="mx-auto max-w-4xl">
            {HISTORY.map((item, index) => (
              <div
                key={item.year}
                className="relative flex gap-8 pb-12 last:pb-0"
              >
                {/* Timeline */}
                <div className="relative flex w-6 justify-center">
                  <div className="z-10 h-4 w-4 rounded-full bg-[var(--color-accent-teal)] ring-4 ring-[var(--color-bg-primary)]" />

                  {index !== HISTORY.length - 1 && (
                    <div className="absolute top-4 h-full w-[2px] bg-white/10" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="mb-2 text-2xl font-bold text-white">
                    {item.year}
                  </h3>

                  <p className="leading-8 text-[var(--color-text-muted)]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="mb-16">
          <div className="mb-12 flex justify-center">
            <h2 className="text-gradient pb-1 text-3xl font-bold md:text-4xl">
              Contact Us
            </h2>
          </div>

          <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.75fr]">

            {/* Left */}
            <div className="max-w-[340px] lg:ml-32">

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
            <div className="w-full max-w-[500px] lg:-ml-32 overflow-hidden rounded-2xl border border-white/10 shadow-lg">
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