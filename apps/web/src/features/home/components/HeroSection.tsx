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
      className="hero-bg relative overflow-hidden flex min-h-[calc(100vh-90px)] items-center"
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

          <div className="flex flex-col gap-4 sm:flex-row items-start">
            <div className="relative w-fit">
              <Button variant="primary" className="bg-gradient-to-r from-[var(--color-accent-teal)] to-[var(--color-accent-sky)] hover:opacity-90 !text-black border-none" href="/register">
                Register Now
              </Button>
            </div>
            <Button variant="secondary" href="/divisions">
              Explore Divisions
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

              {/* Floating Instrumental Notes */}
              {/* Note 1: Double note, top-right */}
              <g transform="translate(742, 360)">
                <g className="note-float-1">
                  <g transform="rotate(-15) scale(1.3)" stroke="rgba(70, 188, 237, 0.45)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </g>
                </g>
              </g>

              {/* Note 2: Single note, bottom-right */}
              <g transform="translate(610, 690)">
                <g className="note-float-2">
                  <g transform="rotate(25) scale(1.1)" stroke="rgba(28, 225, 164, 0.4)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="8" cy="18" r="4" />
                    <path d="M12 18V2l7 4" />
                  </g>
                </g>
              </g>

              {/* Note 3: Single note, top-left */}
              <g transform="translate(359, 359)">
                <g className="note-float-3">
                  <g transform="rotate(-40) scale(1.0)" stroke="rgba(130, 128, 229, 0.4)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="8" cy="18" r="4" />
                    <path d="M12 18V2l7 4" />
                  </g>
                </g>
              </g>

              {/* Note 4: Double note, bottom-left */}
              <g transform="translate(223, 660)">
                <g className="note-float-1">
                  <g transform="rotate(10) scale(1.4)" stroke="rgba(28, 225, 164, 0.45)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </g>
                </g>
              </g>

              {/* Note 5: Single note, top-right (far) */}
              <g transform="translate(700, 154)">
                <g className="note-float-2">
                  <g transform="rotate(15) scale(1.2)" stroke="rgba(70, 188, 237, 0.35)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="8" cy="18" r="4" />
                    <path d="M12 18V2l7 4" />
                  </g>
                </g>
              </g>

              {/* Note 6: Treble Clef, left */}
              <g transform="translate(260, 470)">
                <g className="note-float-3">
                  <g transform="rotate(-10) scale(0.6)" fill="rgba(130, 128, 229, 0.35)">
                    <path d="M32.108,45.02C31.428,42.709,30.78,40.425,30.195,38.209C34.229,34.433,37.429,29.413,37.5,21.283C37.536,17.06,37.032,12.006,33.025,6.535C31.843,4.922,29.604,4.519,27.934,5.621C23.985,8.227,20,14.457,20,22.5C20,22.5,20.699,30.663,21.782,35.411C20.949,36.021,20.077,36.63,19.177,37.259C12.86,41.667,5,47.153,5,60C5,74.084,16.44,82.5,27.5,82.5C29.658,82.5,31.729,82.271,33.677,81.841C33.684,82.066,33.688,82.285,33.688,82.5C33.688,85.257,31.445,87.5,28.688,87.5C27.352,87.5,26.096,86.98,25.153,86.036L19.848,91.339C22.209,93.7,25.348,95,28.688,95C35.581,95,41.188,89.393,41.188,82.5C41.188,81.387,41.118,80.206,40.986,78.964C46.528,75.615,50,70.154,50,63.75C50,53.699,42.05,45.47,32.108,45.02ZM29.244,15.311C29.86,17.224,30.017,19.139,30,21.218C29.973,24.421,29.287,26.889,28.125,28.943C27.729,26.582,27.5,24.41,27.5,22.5C27.5,19.607,28.264,17.158,29.244,15.311ZM27.5,75C20.229,75,12.5,69.743,12.5,60C12.5,51.065,17.341,47.686,23.469,43.409C23.573,43.337,23.677,43.264,23.781,43.192C24.103,44.346,24.438,45.509,24.78,46.677C19.873,49.271,16.188,54.53,16.188,60C16.188,63.338,17.488,66.477,19.848,68.838L25.153,63.535C24.209,62.59,23.688,61.335,23.688,59.999C23.688,57.909,25.121,55.645,27.027,54.157C27.096,54.384,27.166,54.611,27.234,54.838C29.303,61.627,31.419,68.566,32.64,74.372C31.05,74.78,29.322,75,27.5,75ZM39.503,70.664C38.239,65.243,36.406,59.209,34.508,52.981C39.128,54.381,42.5,58.679,42.5,63.75C42.5,63.75,42.5,63.75,42.5,63.75Z" />
                  </g>
                </g>
              </g>
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
