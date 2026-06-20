import HeroSection from "@/src/features/home/components/HeroSection";
import AboutPreviewSection from "@/src/features/home/components/AboutPreviewSection";
import CorridorOverviewSection from "@/src/features/home/components/CorridorOverviewSection";
import MemberBenefitsSection from "@/src/features/home/components/MemberBenefitsSection";
import FeaturedArticlesSection from "@/src/features/home/components/FeaturedArticlesSection";
import UpcomingEventsSection from "@/src/features/home/components/UpcomingEventsSection";

/**
 * Revalidate the homepage at most once a minute so newly published Sanity
 * articles (Featured Articles) appear without a redeploy.
 */
export const revalidate = 60;

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
      <FeaturedArticlesSection />
      <UpcomingEventsSection />
    </>
  );
}
