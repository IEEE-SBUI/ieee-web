import React from "react";
import PageHeader from "@/src/components/PageHeader";

interface PageProps {
  searchParams: Promise<{ year?: string }>;
}

/**
 * Generate metadata based on the dynamic year in the searchParams.
 */
export async function generateMetadata({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const yearVal = resolvedParams.year || "2026";
  const displayYear = yearVal.toLowerCase() === "others" ? "Archive" : yearVal;
  return {
    title: `Team ${displayYear} | IEEE Student Branch Universitas Indonesia`,
    description: `Meet the talented individuals making up the IEEE Student Branch Universitas Indonesia executive board and division members for ${displayYear === "Archive" ? "past years" : displayYear}.`,
  };
}

/**
  * Teams directory placeholder page (route `/teams`), rendering dynamic title
  * based on the `year` search parameter.
  */
export default async function TeamsPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const yearVal = resolvedParams.year || "2026";
  const displayYear = yearVal.toLowerCase() === "others" ? "Archive" : `Team ${yearVal}`;

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <PageHeader
        title={displayYear}
        description={`Meet the talented individuals making up the IEEE Student Branch Universitas Indonesia executive board and division members for ${yearVal.toLowerCase() === "others" ? "past years" : yearVal}.`}
      />
      <main className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-[117px] py-16 text-center">
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-[#0C1517] border border-[rgba(255,255,255,0.06)] rounded-2xl">
          {/* TODO: Implement UI and replace with actual team member cards. */}
          <p className="text-sm md:text-base leading-relaxed text-[var(--color-text-muted)]">
            This is a placeholder page for the {displayYear} directory. Full list of members coming soon!
          </p>
        </div>
      </main>
    </div>
  );
}
