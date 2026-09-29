import { TECHTONIC_CONFIG } from '../data/techtonicConfig';

export default function TechtonicWhyParticipate() {
  return (
    <section className="bg-[var(--color-bg-primary)] py-16 sm:py-24 border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-[117px]">
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Why Participate in Techtonic 3.0?
          </h2>
          <p className="mt-3 text-sm text-[var(--color-text-muted)] leading-relaxed">
            Gain hands-on competition experience, receive industry mentorship, and connect with peers nationwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TECHTONIC_CONFIG.whyParticipate.map((item, idx) => (
            <div key={idx} className="pt-4 border-t border-white/10">
              <span className="text-sm font-bold text-[#1CE1A4] block">
                0{idx + 1}.
              </span>
              <h3 className="mt-2 text-lg font-bold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
