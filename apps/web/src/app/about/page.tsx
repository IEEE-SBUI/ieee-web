import React from "react";
import PageHeader from "@/src/components/PageHeader";

export const metadata = {
  title: "About Us | IEEE Student Branch Universitas Indonesia",
  description: "Learn more about the IEEE Student Branch Universitas Indonesia, our mission, vision, and core values.",
};

/**
  * About Us placeholder page (route `/about`).
  */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <PageHeader
        title="About Us"
        description="Learn more about the IEEE Student Branch Universitas Indonesia, our mission, vision, and core values."
      />
      <main className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-[117px] py-16 text-center">
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-[#0C1517] border border-[rgba(255,255,255,0.06)] rounded-2xl">
          {/* TODO: Implement UI and replace with actual content. */}
          <p className="text-sm md:text-base leading-relaxed text-[var(--color-text-muted)]">
            This is a placeholder page for the About Us section. Full content coming soon!
          </p>
        </div>
      </main>
    </div>
  );
}
