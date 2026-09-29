import { TECHTONIC_CONFIG } from '../data/techtonicConfig';

export default function TechtonicAbout() {
  return (
    <section id="about" className="bg-[var(--color-bg-primary)] py-16 sm:py-24 border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-[117px]">
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            About Techtonic 3.0
          </h2>
          <p className="mt-3 text-base text-[var(--color-text-muted)] leading-relaxed">
            {TECHTONIC_CONFIG.shortDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-xl font-bold text-white">
              Energizing Tomorrow through Secure Intelligence
            </h3>
            <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
              Organized by IEEE Student Branch Universitas Indonesia, Techtonic 3.0 provides a national platform for students to tackle real-world technological challenges across energy transition, cybersecurity resilience, and IoT hardware integration.
            </p>
          </div>

          <div className="lg:col-span-6 space-y-6 lg:pl-6 lg:border-l lg:border-white/10">
            <div className="pt-4 first:pt-0 border-t border-white/10 first:border-0">
              <h4 className="text-base font-bold text-[#1CE1A4]">
                Sustainable Energy & Electrification
              </h4>
              <p className="mt-1 text-sm text-[var(--color-text-muted)] leading-relaxed">
                Addressing renewable energy adoption, efficiency, and business models in the Business Plan Competition.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <h4 className="text-base font-bold text-[#46BCED]">
                Secure-by-Design Smart Technology
              </h4>
              <p className="mt-1 text-sm text-[var(--color-text-muted)] leading-relaxed">
                Fostering practical cybersecurity, data privacy, and resilient digital architectures in the STASH Hackathon.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <h4 className="text-base font-bold text-[#8280E5]">
                IoT & Physical Engineering
              </h4>
              <p className="mt-1 text-sm text-[var(--color-text-muted)] leading-relaxed">
                Connecting everyday devices through IoT schematics and hardware prototypes in the STEM Innovation Exhibition.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
