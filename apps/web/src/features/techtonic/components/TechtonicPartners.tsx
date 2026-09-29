import Image from 'next/image';
import { TECHTONIC_CONFIG } from '../data/techtonicConfig';

export default function TechtonicPartners() {
  const { mediaPartnership } = TECHTONIC_CONFIG;

  return (
    <section
      className="relative overflow-hidden py-16 sm:py-24 border-b border-[var(--color-border)]"
      style={{ background: "var(--theme-dark-gradient)" }}
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-[117px]">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-semibold text-[var(--color-accent-teal)] uppercase tracking-wider block mb-1">
            Collaborating Organizations & Media
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Official Sponsors & Media Partners
          </h2>
        </div>

        {/* 1. Sponsor Grid */}
        <div className="p-8 border border-white/10 rounded-2xl bg-[#0C1517] shadow-xl mb-16">
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
        </div>

        {/* 2. Media Partner Package Table */}
        <div className="mb-16">
          <div className="mb-8 text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-2">
              Media Partner Package
            </h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              Comprehensive exposure packages for official media partners across IEEE SB UI digital channels and student communities.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0C1517] shadow-2xl">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-4 sm:p-6 text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                    Main Benefit
                  </th>
                  <th className="p-4 sm:p-6 text-xs sm:text-sm font-bold text-[#E5C158] uppercase tracking-wider text-center w-28 sm:w-36">
                    Gold
                  </th>
                  <th className="p-4 sm:p-6 text-xs sm:text-sm font-bold text-[#CBD5E1] uppercase tracking-wider text-center w-28 sm:w-36">
                    Silver
                  </th>
                  <th className="p-4 sm:p-6 text-xs sm:text-sm font-bold text-[#CD7F32] uppercase tracking-wider text-center w-28 sm:w-36">
                    Bronze
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {mediaPartnership.packages.map((pkg, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 sm:p-6 text-xs sm:text-sm font-semibold text-gray-200">
                      {pkg.feature}
                    </td>
                    <td className="p-4 sm:p-6 text-xs sm:text-sm font-bold text-center text-[#E5C158] bg-[#E5C158]/5">
                      {pkg.gold}
                    </td>
                    <td className="p-4 sm:p-6 text-xs sm:text-sm font-bold text-center text-[#CBD5E1] bg-[#CBD5E1]/5">
                      {pkg.silver}
                    </td>
                    <td className="p-4 sm:p-6 text-xs sm:text-sm font-bold text-center text-[#CD7F32] bg-[#CD7F32]/5">
                      {pkg.bronze}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Media Partnerships Benefits Cards */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6 text-center">
            Media Partnerships Benefits
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mediaPartnership.benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#0C1517] border border-white/10 flex items-center gap-4 hover:border-[var(--color-accent-teal)]/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-teal)]/10 text-[var(--color-accent-teal)] flex items-center justify-center font-bold text-base shrink-0">
                  0{idx + 1}
                </div>
                <span className="text-sm font-bold text-white">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center text-xs text-gray-300">
          For media partnership inquiries and collaboration proposals, reach out to our team at{' '}
          <a href={`mailto:${TECHTONIC_CONFIG.contact.email}`} className="text-[var(--color-accent-teal)] font-semibold underline">
            {TECHTONIC_CONFIG.contact.email}
          </a>
        </div>
      </div>
    </section>
  );
}
