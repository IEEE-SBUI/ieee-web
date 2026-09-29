import { TECHTONIC_CONFIG } from '../data/techtonicConfig';
import TechtonicCompetitionCard from './TechtonicCompetitionCard';

export default function TechtonicCompetitions() {
  const tracks = Object.values(TECHTONIC_CONFIG.competitions);

  return (
    <section id="competitions" className="bg-[var(--color-bg-primary)] py-16 sm:py-24 border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-[117px]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Competition Tracks
            </h2>
          </div>
          <p className="text-sm text-[var(--color-text-muted)] max-w-md leading-relaxed">
            Choose your track to compete, innovate, and present your solutions to academic experts and industry judges.
          </p>
        </div>

        {/* 3 Competition Cards Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tracks.map((track) => (
            <TechtonicCompetitionCard key={track.id} track={track} />
          ))}
        </div>
      </div>
    </section>
  );
}
