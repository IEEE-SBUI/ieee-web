import HeroSection from "@/src/features/home/components/HeroSection";
import AboutPreviewSection from "@/src/features/home/components/AboutPreviewSection";
import CorridorOverviewSection from "@/src/features/home/components/CorridorOverviewSection";
import MemberBenefitsSection from "@/src/features/home/components/MemberBenefitsSection";

/**
 * Homepage (route `/`).
 *
 * Composition root for the homepage sections. Sections are added
 * incrementally; see issue #17.
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutPreviewSection />
      <CorridorOverviewSection />
      <MemberBenefitsSection />
    </>
  );
}
