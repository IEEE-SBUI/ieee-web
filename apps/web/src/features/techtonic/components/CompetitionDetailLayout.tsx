import Link from 'next/link';
import Image from 'next/image';
import { CompetitionTrack, isArchived, TECHTONIC_CONFIG } from '../data/techtonicConfig';
import { ArrowLeft } from 'lucide-react';

interface CompetitionDetailLayoutProps {
  track: CompetitionTrack;
}

export default function CompetitionDetailLayout({ track }: CompetitionDetailLayoutProps) {
  const { contact } = TECHTONIC_CONFIG;

  const firstPrize = track.prizes[0];
  const secondPrize = track.prizes[1];
  const thirdPrize = track.prizes[2];
  const specialPrizes = track.prizes.slice(3);

  return (
    <div className="bg-[var(--color-bg-primary)] min-h-screen text-white relative">
      {/* Background Decorative Sparkles derived from Techtonic Logo */}
      <div className="pointer-events-none absolute top-20 right-10 opacity-15" aria-hidden="true">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
          <path d="M50 0 L58 42 L100 50 L58 58 L50 100 L42 58 L0 50 L42 42 Z" fill="#F57C00" />
        </svg>
      </div>

      {/* ================= 1. COMPETITION HERO ================= */}
      <section className="hero-bg relative overflow-hidden py-16 sm:py-20 border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-[117px]">
          {/* Larger Breadcrumb */}
          <Link
            href="/techtonic"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-teal)] hover:text-white transition-colors duration-200 mb-8 group"
          >
            <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-1" />
            Back to Techtonic 3.0 Hub
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Competition Detail Copy */}
            <div className="lg:col-span-8">
              <span className="text-xs font-semibold text-[var(--color-accent-teal)] block uppercase mb-2">
                Track: {track.tag}
              </span>

              {/* Title & Subtitle */}
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
                {track.title}
              </h1>
              <p className="mt-3 text-xl sm:text-2xl font-medium text-[var(--color-accent-sky)]">
                {track.subtitle}
              </p>

              {/* Summary */}
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-[var(--color-text-muted)]">
                {track.summary}
              </p>

              {/* Top Action CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {!isArchived ? (
                  <a
                    href={TECHTONIC_CONFIG.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[var(--color-accent-teal)] to-[var(--color-accent-sky)] px-6 py-3 text-sm font-bold text-[#080811] hover:opacity-90 transition-opacity"
                  >
                    Register Now
                  </a>
                ) : (
                  <span className="inline-flex items-center justify-center rounded-lg bg-gray-800 px-6 py-3 text-sm font-semibold text-gray-400 cursor-not-allowed">
                    Registration Closed
                  </span>
                )}

                <a
                  href={TECHTONIC_CONFIG.guidebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:border-white/40 transition-colors"
                >
                  View Guidebook
                </a>
              </div>
            </div>

            {/* Right Column: Unboxed Logo Hero Graphic */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end relative">
              {/* Soft Warm Radial Glow */}
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full blur-3xl opacity-30"
                style={{
                  background: 'radial-gradient(circle, rgba(245, 124, 0, 0.4) 0%, rgba(25, 118, 210, 0.15) 60%, transparent 100%)',
                }}
                aria-hidden="true"
              />

              {/* Unboxed Logo */}
              <div className="relative z-10 w-[220px] sm:w-[260px] lg:w-[280px] transform -rotate-[2deg] hover:rotate-0 transition-transform duration-500 drop-shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
                <Image
                  src="/techtonic-logo.jpg"
                  alt="Techtonic 3.0 Event Logo"
                  width={280}
                  height={280}
                  className="w-full h-auto object-contain rounded-2xl"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Metadata Bar */}
          <div className="mt-12 pt-6 border-t border-[var(--color-border)] grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
            <div>
              <span className="text-gray-400 block">Registration Fee</span>
              <span className="text-white font-bold text-sm mt-0.5 block">{track.registrationFee.amount}</span>
            </div>
            <div>
              <span className="text-gray-400 block">Team Format</span>
              <span className="text-white font-bold text-sm mt-0.5 block">{track.teamSize}</span>
            </div>
            <div>
              <span className="text-gray-400 block">Top Award</span>
              <span className="text-[var(--color-accent-teal)] font-bold text-sm mt-0.5 block">{track.prizes[0]?.prize || 'Certificates'}</span>
            </div>
            {track.pocBudget ? (
              <div>
                <span className="text-gray-400 block">POC Budget Range</span>
                <span className="text-[var(--color-accent-indigo)] font-bold text-sm mt-0.5 block">{track.pocBudget}</span>
              </div>
            ) : (
              <div>
                <span className="text-gray-400 block">Organizer</span>
                <span className="text-white font-bold text-sm mt-0.5 block">IEEE SBUI</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= 2. THEME & OVERVIEW ================= */}
      <section
        className="py-16 border-b border-[var(--color-border)]"
        style={{ background: "var(--theme-dark-gradient)" }}
      >
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-[117px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Theme & Scope
              </h2>
              <p className="text-lg font-semibold text-[#1CE1A4]">
                {track.theme}
              </p>
              <p className="mt-4 text-sm text-[var(--color-text-muted)] leading-relaxed">
                {track.summary}
              </p>
            </div>

            <div className="lg:col-span-5 lg:pl-6 lg:border-l lg:border-white/10">
              <h3 className="text-lg font-bold text-white">
                Registration Fee
              </h3>
              <div className="mt-2 text-3xl font-bold text-white">
                {track.registrationFee.amount}
              </div>
              {track.registrationFee.note && (
                <p className="mt-3 text-xs text-[var(--color-text-muted)] leading-relaxed">
                  {track.registrationFee.note}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. PRIZE POOL PODIUM SECTION (FIXED CLEAN ALIGNMENT & MOBILE FRIENDLY) ================= */}
      <section className="py-16 bg-[var(--color-bg-primary)] border-b border-[var(--color-border)] relative overflow-hidden">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-[117px] relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-semibold text-[var(--color-accent-teal)] uppercase block mb-1">
                Official Track Recognition
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Prize Pool & Awards
              </h2>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] max-w-md">
              Winner cash awards and certificates presented at the Techtonic 3.0 Grand Finale.
            </p>
          </div>

          {/* ================= PODIUM DISPLAY (Desktop 2-1-3, Mobile 1-2-3 Stack) ================= */}
          <div className="mt-8 flex flex-col md:flex-row items-end justify-center gap-6">
            
            {/* 2nd Place Podium Block (Left on Desktop, 2nd on Mobile) */}
            {secondPrize && (
              <div className="w-full md:w-1/3 order-2 md:order-1 flex flex-col">
                <div className="p-6 rounded-2xl bg-[#0C1517] border-2 border-[#46BCED] shadow-xl text-center h-[210px] flex flex-col justify-between relative">
                  <div>
                    <div className="w-8 h-8 mx-auto rounded-full bg-[#46BCED]/20 text-[#46BCED] font-bold text-sm flex items-center justify-center border border-[#46BCED]/40">
                      2
                    </div>
                    <span className="text-xs font-bold uppercase text-[#46BCED] block mt-2">
                      2nd Winner
                    </span>
                    <div className="mt-3 text-2xl font-bold text-white">
                      {secondPrize.prize.split('+')[0]}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 text-xs text-gray-400 font-medium">
                    + Official Certificate
                  </div>
                </div>
              </div>
            )}

            {/* 1st Place Champion Podium Block (Center & Tallest on Desktop, 1st on Mobile) */}
            {firstPrize && (
              <div className="w-full md:w-1/3 order-1 md:order-2 flex flex-col">
                <div className="p-8 rounded-2xl bg-[#0C1517] border-2 border-[#1CE1A4] shadow-2xl text-center h-[270px] flex flex-col justify-between relative overflow-hidden">
                  <div>
                    <div className="w-10 h-10 mx-auto rounded-full bg-[#1CE1A4] text-[#080811] font-bold text-base flex items-center justify-center shadow-lg shadow-[#1CE1A4]/30">
                      1
                    </div>
                    <span className="text-xs font-bold uppercase text-[#1CE1A4] block mt-2">
                      1st Champion
                    </span>
                    <div className="mt-3 text-3xl sm:text-4xl font-bold text-[var(--color-accent-teal)]">
                      {firstPrize.prize.split('+')[0]}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 text-xs text-gray-200 font-semibold">
                    + Official Certificate
                  </div>
                </div>
              </div>
            )}

            {/* 3rd Place Podium Block (Right on Desktop, 3rd on Mobile) */}
            {thirdPrize && (
              <div className="w-full md:w-1/3 order-3 flex flex-col">
                <div className="p-6 rounded-2xl bg-[#0C1517] border-2 border-[#8280E5] shadow-xl text-center h-[180px] flex flex-col justify-between relative">
                  <div>
                    <div className="w-8 h-8 mx-auto rounded-full bg-[#8280E5]/20 text-[#8280E5] font-bold text-sm flex items-center justify-center border border-[#8280E5]/40">
                      3
                    </div>
                    <span className="text-xs font-bold uppercase text-[#8280E5] block mt-2">
                      3rd Winner
                    </span>
                    <div className="mt-3 text-2xl font-bold text-white">
                      {thirdPrize.prize.split('+')[0]}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 text-xs text-gray-400 font-medium">
                    + Official Certificate
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Special Category Awards List */}
          {specialPrizes.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                Special Track Awards
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {specialPrizes.map((special, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[#0C1517] border border-white/10 flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">{special.rank}</span>
                    <span className="text-sm font-bold text-[#1CE1A4]">{special.prize}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="mt-8 text-xs text-[var(--color-text-muted)] text-center">
            Note: Official certificates are provided for all qualified team participants and award winners.
          </p>
        </div>
      </section>

      {/* ================= 4. COMPETITION FLOW ================= */}
      <section
        className="py-16 border-b border-[var(--color-border)]"
        style={{ background: "var(--theme-dark-gradient)" }}
      >
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-[117px]">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Competition Flow
            </h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              What participants go through across the four sequential competition stages.
            </p>
          </div>

          {/* Connected Process Flow */}
          <div className="relative">
            <div className="hidden lg:block absolute top-6 left-8 right-8 h-0.5 bg-[var(--color-accent-teal)]/40 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {track.flow.map((stepItem, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-full bg-[var(--color-accent-teal)] text-[#080811] font-bold text-sm flex items-center justify-center">
                      {stepItem.step}
                    </span>
                    <span className="text-xs font-semibold text-[var(--color-accent-teal)] uppercase">
                      Stage 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white">
                    {stepItem.title}
                  </h3>

                  <p className="mt-2 text-xs text-[var(--color-text-muted)] leading-relaxed">
                    {stepItem.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. TIMELINE ================= */}
      <section className="py-16 bg-[var(--color-bg-primary)] border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-[117px]">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold text-white mb-3">
              Timeline
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-8">
              Official schedule and key submission milestones.
            </p>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-[var(--color-accent-sky)]/40 space-y-6">
              {track.timeline.map((item, idx) => {
                const isMajor = item.title.includes('Grand Opening') || item.title.includes('Announcement') || item.title.includes('Closing') || item.title.includes('Technical Meeting');
                return (
                  <div key={idx} className="relative">
                    <div className={`absolute -left-[31px] sm:-left-[39px] top-1 rounded-full border-2 ${
                      isMajor
                        ? 'w-4 h-4 bg-[var(--color-accent-sky)] border-white shadow-md'
                        : 'w-3 h-3 bg-[#080811] border-gray-400'
                    }`} />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-6">
                      <span className={`text-xs font-bold sm:w-36 shrink-0 ${isMajor ? 'text-[var(--color-accent-sky)]' : 'text-gray-400'}`}>
                        {item.date}
                      </span>
                      <div className="flex-1">
                        <span className={`text-sm font-semibold ${isMajor ? 'text-white font-bold' : 'text-gray-200'}`}>
                          {item.title}
                        </span>
                        {item.desc && (
                          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                            {item.desc}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 6. RULES & REQUIREMENTS ================= */}
      <section
        className="py-16 border-b border-[var(--color-border)]"
        style={{ background: "var(--theme-dark-gradient)" }}
      >
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-[117px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Eligibility & Rules */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Eligibility & Rules
              </h2>
              <p className="text-xs text-gray-400 mb-6">
                Team Format: {track.teamSize}
              </p>

              <div className="space-y-3">
                {track.rules.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs text-gray-300 pt-3 border-t border-white/10 first:border-0">
                    <span className="text-[#1CE1A4] font-bold">✓</span>
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Submission Requirements */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Requirements
              </h2>
              {track.pocBudget && (
                <p className="text-xs text-[#8280E5] mb-4 font-semibold">
                  POC / Bill of Materials Budget Range: {track.pocBudget}
                </p>
              )}

              <div className="space-y-3">
                {track.requirements.map((req, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs text-gray-300 pt-3 border-t border-white/10 first:border-0">
                    <span className="text-[#8280E5] font-bold">0{idx + 1}.</span>
                    <span>{req}</span>
                  </div>
                ))}
              </div>

              {/* Benefits if available */}
              {track.benefits && track.benefits.length > 0 && (
                <div className="mt-8 pt-6 border-t border-white/10">
                  <h3 className="text-sm font-bold text-white uppercase mb-3">
                    What You&apos;ll Gain
                  </h3>
                  <ul className="space-y-2 text-xs text-gray-300">
                    {track.benefits.map((b, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-[#1CE1A4]">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ================= 7. SINGLE BOTTOM CTA & CONTACT ================= */}
      <section className="py-16 bg-[var(--color-bg-primary)]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-[117px]">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-white">Ready to participate?</h2>
            <p className="mt-3 text-sm text-[var(--color-text-muted)]">
              Review the official specifications in the guidebook and submit your team&apos;s registration.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              {!isArchived ? (
                <a
                  href={TECHTONIC_CONFIG.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[var(--color-accent-teal)] to-[var(--color-accent-sky)] px-8 py-3.5 text-sm font-bold text-[#080811] hover:opacity-90 transition-opacity"
                >
                  Register Now
                </a>
              ) : (
                <span className="inline-flex items-center justify-center rounded-lg bg-gray-800 px-8 py-3.5 text-sm font-semibold text-gray-400 cursor-not-allowed">
                  Registration Closed
                </span>
              )}

              <a
                href={TECHTONIC_CONFIG.guidebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white hover:border-white/40 transition-colors"
              >
                View Guidebook
              </a>
            </div>

            {/* Contacts */}
            <div className="mt-10 pt-6 border-t border-white/10 text-xs text-gray-400 flex flex-wrap items-center gap-6">
              <span>Contact Persons:</span>
              {contact.contacts.map((c, i) => (
                <a
                  key={i}
                  href={`https://wa.me/${c.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#1CE1A4] font-semibold"
                >
                  {c.name} ({c.phone})
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
