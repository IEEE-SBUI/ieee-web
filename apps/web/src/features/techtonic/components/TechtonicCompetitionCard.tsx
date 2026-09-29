import Link from 'next/link';
import { CompetitionTrack } from '../data/techtonicConfig';

interface CompetitionCardProps {
  track: CompetitionTrack;
}

export default function TechtonicCompetitionCard({ track }: CompetitionCardProps) {
  const topPrize = track.prizes[0] ? track.prizes[0].prize : 'Prizes & Certificates';

  return (
    <div className="rounded-xl bg-[#0C1517] border border-white/10 p-6 sm:p-8 flex flex-col justify-between transition-colors hover:border-[#1CE1A4]/50">
      <div>
        {/* Category & Fee Metadata */}
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 text-xs">
          <span className="text-[#1CE1A4] font-semibold">{track.tag}</span>
          <span className="text-gray-300">Registration: <strong className="text-white font-bold">{track.registrationFee.amount}</strong></span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="mt-5 text-2xl font-bold text-white leading-tight">
          {track.title}
        </h3>
        <p className="mt-1 text-sm font-medium text-[#46BCED]">
          {track.subtitle}
        </p>

        {/* Summary */}
        <p className="mt-4 text-sm leading-relaxed text-gray-300">
          {track.summary}
        </p>

        {/* Theme Specification */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <span className="text-xs text-gray-400 font-semibold block">Theme</span>
          <span className="text-xs text-white font-medium mt-1 block leading-relaxed">{track.theme}</span>
        </div>

        {/* Metadata Details */}
        <div className="mt-6 grid grid-cols-2 gap-4 text-xs border-t border-white/10 pt-4">
          <div>
            <span className="text-gray-400 block">Top Award</span>
            <span className="text-white font-semibold mt-0.5 block">{topPrize}</span>
          </div>
          <div>
            <span className="text-gray-400 block">Team Size</span>
            <span className="text-white font-semibold mt-0.5 block">{track.teamSize}</span>
          </div>
        </div>
      </div>

      {/* Action Link */}
      <div className="mt-8 pt-5 border-t border-white/10">
        <Link
          href={track.href}
          className="inline-flex items-center justify-center w-full rounded-lg bg-[#1CE1A4] px-4 py-2.5 text-xs font-bold text-[#080811] hover:bg-[#1CE1A4]/90 transition-colors"
        >
          Explore Track Details →
        </Link>
      </div>
    </div>
  );
}
