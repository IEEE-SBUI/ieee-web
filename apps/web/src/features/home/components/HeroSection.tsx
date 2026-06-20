import Image from "next/image";
import Button from "@/src/components/Button";

/**
 * Homepage hero banner.
 *
 * Left: chapter subtitle, gradient "Instrumenting Harmony" headline,
 * a short description, and two call-to-action buttons.
 * Right: the brand artwork inside a circular graphic whose glow uses
 * the `--theme-radial-gradient` design token.
 *
 * Purely presentational and rendered on the server (no props, no data).
 *
 * @returns The hero section element.
 */
export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--theme-dark-gradient)" }}
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 py-16 sm:px-12 md:py-24 lg:grid-cols-2 lg:px-[117px]">
        {/* Left: copy + CTAs */}
        <div className="flex flex-col gap-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-teal)]">
            IEEE Student Branch Universitas Indonesia
          </p>

          <h1
            id="hero-heading"
            className="text-gradient text-5xl font-bold leading-tight md:text-6xl"
          >
            Instrumenting Harmony
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-[var(--color-text-muted)]">
            We are the first IEEE Student Branch in Indonesia. Our members
            build projects, run workshops and competitions, write technical
            articles, and meet engineers from around the world.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button variant="primary" href="/divisions">
              Explore Divisions
            </Button>
            <Button variant="secondary" href="/articles">
              Read Our Articles
            </Button>
          </div>
        </div>

        {/* Right: circular graphic with radial glow */}
        <div className="relative mx-auto aspect-square w-full max-w-[460px]">
          {/* Soft outer glow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full opacity-50 blur-3xl"
            style={{ background: "var(--theme-radial-gradient)" }}
          />

          {/* Circle face holding the brand artwork */}
          <div
            className="absolute inset-0 flex items-center justify-center rounded-full"
            style={{ background: "var(--theme-radial-gradient)" }}
          >
            <Image
              src="/theme-2026.png"
              alt="IEEE SBUI 2026 'Instrumenting Harmony' theme artwork"
              width={600}
              height={351}
              priority
              className="h-auto w-[72%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
