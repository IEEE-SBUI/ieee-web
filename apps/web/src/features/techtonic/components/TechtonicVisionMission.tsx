import { TECHTONIC_CONFIG } from '../data/techtonicConfig';

export default function TechtonicVisionMission() {
  return (
    <section
      className="relative overflow-hidden py-16 sm:py-24 border-b border-[var(--color-border)]"
      style={{ background: "var(--theme-dark-gradient)" }}
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-[117px] relative">
        
        {/* ================= VISION ================= */}
        <div className="max-w-4xl">
          <h2 className="text-sm font-bold text-[#1CE1A4] uppercase mb-3">
            Vision
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white leading-relaxed">
            {TECHTONIC_CONFIG.vision}
          </p>
        </div>

        {/* Separator */}
        <div className="my-12 sm:my-16 h-px bg-white/10" />

        {/* ================= MISSION ================= */}
        <div>
          <h2 className="text-sm font-bold text-[#46BCED] uppercase mb-8">
            Mission
          </h2>

          <div className="space-y-8">
            {TECHTONIC_CONFIG.missions.map((item) => (
              <div key={item.number} className="pt-6 first:pt-0 border-t border-white/10 first:border-0">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  <div className="md:col-span-1">
                    <span className="text-2xl font-bold text-[#1CE1A4]">
                      {item.number}
                    </span>
                  </div>

                  <div className="md:col-span-11">
                    <h3 className="text-lg font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-base text-[var(--color-text-muted)] leading-relaxed max-w-3xl">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
