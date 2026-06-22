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
      className="relative overflow-hidden flex min-h-[calc(100vh-90px)] items-center"
      style={{ background: "radial-gradient(circle at 0% 0%, #084030 0%, #072228 50%, #050811 100%)" }}
      aria-labelledby="hero-heading"
    >
      {/* Abstract topographical wave background lines */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full opacity-35"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sweeping diagonal topographical curves */}
          {Array.from({ length: 22 }).map((_, i) => {
            const offset = i * 90 - 450;
            return (
              <path
                key={i}
                d={`M ${offset},-100 C ${offset + 300},200 ${offset + 100},600 ${offset + 800},1000`}
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="1.2"
              />
            );
          })}
        </svg>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1440px] items-center gap-12 px-6 py-16 sm:px-12 md:py-24 lg:grid-cols-2 lg:px-[117px]">
        {/* Left: copy + CTAs */}
        <div className="flex flex-col gap-6">

          <h1
            id="hero-heading"
            className="text-gradient md:text-gradient text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
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
            <Button variant="secondary" href="/teams?year=2026">
              View Our Current Team
            </Button>
          </div>
        </div>

        {/* Right: circular graphic with radial glow and propagating sound waves */}
        <div className="relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[460px] flex items-center justify-center">
          {/* Sound waves propagating outwards from the logo (drum) */}
          <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-visible">
            <svg
              className="w-[1000px] h-[1000px] sm:w-[1500px] sm:h-[1500px] lg:w-[2000px] lg:h-[2000px] shrink-0 overflow-visible opacity-45"
              viewBox="0 0 1000 1000"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Concentric sound wave circles centered at (500, 500) */}
              <circle cx="500" cy="500" r="140" stroke="rgba(28, 225, 164, 0.22)" strokeWidth="1.5" />
              <circle cx="500" cy="500" r="180" stroke="rgba(28, 225, 164, 0.20)" strokeWidth="1.5" />
              <circle cx="500" cy="500" r="230" stroke="rgba(28, 225, 164, 0.18)" strokeWidth="1.5" />
              <circle cx="500" cy="500" r="290" stroke="rgba(28, 225, 164, 0.15)" strokeWidth="1.2" />
              <circle cx="500" cy="500" r="360" stroke="rgba(28, 225, 164, 0.12)" strokeWidth="1.2" />
              <circle cx="500" cy="500" r="440" stroke="rgba(28, 225, 164, 0.09)" strokeWidth="1" />
              <circle cx="500" cy="500" r="530" stroke="rgba(28, 225, 164, 0.07)" strokeWidth="1" />
              <circle cx="500" cy="500" r="630" stroke="rgba(28, 225, 164, 0.05)" strokeWidth="1" />
              <circle cx="500" cy="500" r="740" stroke="rgba(28, 225, 164, 0.03)" strokeWidth="1" />
              <circle cx="500" cy="500" r="860" stroke="rgba(28, 225, 164, 0.01)" strokeWidth="1" />
            </svg>
          </div>

          {/* Soft outer glow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full opacity-50 blur-3xl z-10"
            style={{ background: "var(--theme-radial-gradient)" }}
          />

          {/* Circle face holding the brand artwork */}
          <div
            className="absolute inset-0 flex items-center justify-center rounded-full z-20"
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
