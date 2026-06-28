import React from "react";
import Image from "next/image";
import PageHeader from "@/src/components/PageHeader";
import Card from "@/src/components/Card";
import SectionHeading from "@/src/components/SectionHeading";
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
        description="Discover the history, vision, and mission of the first IEEE Student Branch in Indonesia, and how we foster engineering excellence."
      />

      <main className="w-full">
        {/* Who We Are Intro */}
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-12 md:py-24 lg:px-[117px] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column (Text) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <h2 className="text-4xl md:text-5xl font-black leading-tight">
                <span className="text-gradient">Who We Are</span>
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-[var(--color-text-muted)] font-medium">
                IEEE Student Branch Universitas Indonesia is the first <strong className="text-white font-semibold">IEEE Student Branch</strong> in Indonesia. In the past years, we have organized programs for the developments of DTE UI students, such as: Webinar Series, Workshop, IEEE xTreme Selection, World Telecommunication Day with Telco Lab UI, IEEE Volunteers, and so much more.
              </p>
            </div>
            
            {/* Right Column (Image) */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="w-full max-w-[640px] aspect-[1.48/1] relative overflow-hidden rounded-2xl border border-white/10 shadow-xl bg-white/[0.02]">
                <Image
                  src="/ieee-group-photo.jpg"
                  alt="IEEE SBUI Group Photo"
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, 640px"
                  className="object-cover transition-transform duration-500 hover:scale-103"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="relative overflow-hidden" style={{ background: "var(--theme-dark-gradient)" }}>
          <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-12 md:py-24 lg:px-[117px]">
            <div className="text-center mb-12">
              <SectionHeading heading="IEEE SBUI in Numbers" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="relative overflow-hidden rounded-[20px] border-2 border-[rgba(130,128,229,0.15)] bg-[var(--color-bg-card)] px-6 py-10 text-center shadow-[0px_4px_2px_0px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-teal)]"
                >
                  {/* Subtle background glow */}
                  <div className="absolute -right-10 -bottom-10 w-24 h-24 rounded-full bg-[var(--color-accent-teal)]/[0.03] blur-2xl pointer-events-none" />

                  <AnimatedStatItem
                    key={stat.label}
                    value={stat.value}
                    label={stat.label}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-12 md:py-24 lg:px-[117px]">
            <div className="text-center">
              <SectionHeading heading="Vision and Mission" />
            </div>

            <div className="mt-16 grid gap-12 grid-cols-1 lg:grid-cols-[3fr_7fr]">
              {/* Vision */}
              <Card
                variant="icon"
                icon={Target}
                title="Our Vision"
                className="h-full"
              >
                <div className="mt-1 text-center">
                  <p className="text-sm leading-7 text-[rgba(200,205,211,0.8)] max-w-[280px] mx-auto">
                    After the journey of igniting the spark of brilliance in IEEE SBUI, we ensure each members are driven by shared goals and ideas, gather as instruments in the electrical and electronics engineering field of community that works in harmony for the better and advancement of IKM UI and humanity.
                  </p>
                </div>
              </Card>

              {/* Mission */}
              <Card
                variant="icon"
                icon={Flag}
                title="Our Mission"
                className="h-full"
              >
                <div className="mt-1 space-y-8 text-left w-full">
                  <div className="grid grid-cols-[1.5rem_1fr] gap-3 items-start">
                    <span className="text-lg font-bold text-[var(--color-accent-teal)] leading-7">
                      01
                    </span>

                    <p className="text-sm leading-7 text-[rgba(200,205,211,0.8)]">
                      Unite collective goals and shared ideas in harmony, involve in technological advancement, resolve challenges through supportive teamwork, and evolve for the better of humanity.
                    </p>
                  </div>

                  <div className="grid grid-cols-[1.5rem_1fr] gap-3 items-start">
                    <span className="text-lg font-bold text-[var(--color-accent-teal)] leading-7">
                      02
                    </span>

                    <p className="text-sm leading-7 text-[rgba(200,205,211,0.8)]">
                      Strengthen internalization in all positions with a balanced nuance of professionalism and togetherness in a healthy work environment.
                    </p>
                  </div>

                  <div className="grid grid-cols-[1.5rem_1fr] gap-3 items-start">
                    <span className="text-lg font-bold text-[var(--color-accent-teal)] leading-7">
                      03
                    </span>

                    <p className="text-sm leading-7 text-[rgba(200,205,211,0.8)]">
                      Advancing members&apos; passion and understanding in the field of electrical and electronic engineers and all IEEE Societies.
                    </p>
                  </div>

                  <div className="grid grid-cols-[1.5rem_1fr] gap-3 items-start">
                    <span className="text-lg font-bold text-[var(--color-accent-teal)] leading-7">
                      04
                    </span>

                    <p className="text-sm leading-7 text-[rgba(200,205,211,0.8)]">
                      Expand IEEE SBUI&apos;s influence as a passionate community and a prominent student branch in IEEE Global.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* History */}
        <section className="relative overflow-hidden" style={{ background: "var(--theme-dark-gradient)" }}>
          <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-12 md:py-24 lg:px-[117px]">
            <div className="text-center">
              <SectionHeading heading="Our Journey" />
            </div>

            <div className="mx-auto max-w-4xl mt-16">
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
          </div>
        </section>

        {/* Contact */}
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-12 md:py-24 lg:px-[117px]">
            <div className="text-center">
              <SectionHeading heading="Contact Us" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[3.5fr_6.5fr] gap-12 items-center mt-16">

              {/* Left */}
              <div className="max-w-[400px] justify-self-center lg:justify-self-start lg:pl-12">

                <div className="mb-8">
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

                <div className="my-8 border-t border-white/10" />

                <div className="mb-8">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-accent-teal)]">
                    Address
                  </p>

                  <p className="leading-8 text-[var(--color-text-muted)]">
                    Faculty of Engineering
                    <br />
                    Universitas Indonesia
                    <br />
                    <br />
                    Depok, West Java
                    <br />
                    Indonesia
                  </p>
                </div>

                <div className="mt-10">
                  <a
                    href="https://maps.google.com/?q=Faculty+of+Engineering+Universitas+Indonesia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent-teal)] px-6 py-3 text-sm font-semibold text-[var(--color-accent-teal)] transition-all duration-300 hover:bg-[var(--color-accent-teal)] hover:text-black"
                  >
                    Open Google Maps →
                  </a>
                </div>

              </div>

              {/* Right */}
              <div className="flex justify-center w-full">
                <div className="w-full max-w-[680px] overflow-hidden rounded-2xl border border-white/10 shadow-lg bg-white/[0.02]">
                  <iframe
                    title="IEEE SBUI Location"
                    src="https://www.google.com/maps?q=Faculty+of+Engineering+Universitas+Indonesia&output=embed"
                    loading="lazy"
                    className="h-[380px] w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}