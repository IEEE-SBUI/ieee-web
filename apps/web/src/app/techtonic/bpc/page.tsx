import type { Metadata } from 'next';
import CompetitionDetailLayout from '@/src/features/techtonic/components/CompetitionDetailLayout';
import { TECHTONIC_CONFIG } from '@/src/features/techtonic/data/techtonicConfig';

export const metadata: Metadata = {
  title: 'Business Plan Competition — Techtonic 3.0',
  description: TECHTONIC_CONFIG.competitions.bpc.summary,
};

export default function BpcPage() {
  return <CompetitionDetailLayout track={TECHTONIC_CONFIG.competitions.bpc} />;
}
