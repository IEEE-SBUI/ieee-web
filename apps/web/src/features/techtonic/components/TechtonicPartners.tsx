import Image from 'next/image';
import { TECHTONIC_CONFIG } from '../data/techtonicConfig';

export default function TechtonicPartners() {
  return (
    <section
      className="relative overflow-hidden py-16 sm:py-24 border-b border-[var(--color-border)]"
      style={{ background: "var(--theme-dark-gradient)" }}
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-[117px]">
        <div className="max-w-3xl mb-12">
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
            Official Partners & Sponsors
          </h2>
        </div>

        {/* Sponsor Grid */}
        <div className="p-8 border border-white/10 rounded-2xl bg-[#0C1517] shadow-xl">
          <span className="text-xs font-semibold text-gray-400 block uppercase mb-6 text-center">
            Featured Official Sponsor
          </span>

          <div className="flex flex-wrap items-center justify-center gap-8">
            {/* Bank BRI Logo Container */}
            <div className="p-6 rounded-xl bg-white/95 border border-white/20 shadow-lg flex items-center justify-center transition-transform hover:scale-105">
              <Image
                src="/bri-logo.png"
                alt="Bank BRI Logo - Official Sponsor of Techtonic 3.0"
                width={180}
                height={60}
                className="h-12 w-auto object-contain"
                priority
              />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-gray-300">
            For partnership opportunities or sponsorship inquiries, reach out to our team at{' '}
            <a href={`mailto:${TECHTONIC_CONFIG.contact.email}`} className="text-[var(--color-accent-teal)] font-semibold underline">
              {TECHTONIC_CONFIG.contact.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
