import type { Metadata } from 'next';
import TechtonicHero from '@/src/features/techtonic/components/TechtonicHero';
import TechtonicAbout from '@/src/features/techtonic/components/TechtonicAbout';
import TechtonicVisionMission from '@/src/features/techtonic/components/TechtonicVisionMission';
import TechtonicCompetitions from '@/src/features/techtonic/components/TechtonicCompetitions';
import TechtonicTimeline from '@/src/features/techtonic/components/TechtonicTimeline';
import TechtonicWhyParticipate from '@/src/features/techtonic/components/TechtonicWhyParticipate';
import TechtonicPartners from '@/src/features/techtonic/components/TechtonicPartners';
import TechtonicContact from '@/src/features/techtonic/components/TechtonicContact';

export const metadata: Metadata = {
  title: 'Techtonic 3.0',
  description: 'Techtonic 3.0 — Energizing Tomorrow through Secure Intelligence. National competitions in business planning, cybersecurity hackathon, and STEM innovation.',
};

export default function TechtonicPage() {
  return (
    <>
      <TechtonicHero />
      <TechtonicAbout />
      <TechtonicVisionMission />
      <TechtonicCompetitions />
      <TechtonicTimeline />
      <TechtonicWhyParticipate />
      <TechtonicPartners />
      <TechtonicContact />
    </>
  );
}
