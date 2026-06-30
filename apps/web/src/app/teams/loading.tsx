import React from "react";

/**
 * Shimmering skeleton loader for the Teams page.
 * Uses a self-contained header skeleton to guarantee no hydration mismatch loop.
 */
export default function TeamsLoading() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      
      {/* Shimmering Header Placeholder */}
      <div className="w-full bg-gradient-to-br from-[#0A2B23] via-[#0E202B] to-[#1C1A36] py-16 md:py-20 border-b border-white/5 animate-pulse">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-[117px] flex flex-col items-center justify-center text-center gap-4">
          <div className="h-16 w-64 bg-white/10 rounded-full" />
          <div className="h-4 w-96 bg-white/5 rounded-md mt-2" />
        </div>
      </div>

      <main className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-[117px] py-16 animate-pulse">
        {/* Executive Board Title Shimmer */}
        <div className="text-center mb-12">
          <div className="h-8 w-64 bg-white/10 rounded-md mx-auto" />
        </div>

        {/* Shimmering Board Grid */}
        <div className="flex flex-col gap-12 items-center max-w-4xl mx-auto mb-24">
          {/* President & Vice President duo card skeleton */}
          <div className="w-full max-w-2xl h-60 bg-white/5 border border-white/10 rounded-2xl" />
          
          {/* Trio card skeleton (Sec/Treasury) */}
          <div className="w-full h-60 bg-white/5 border border-white/10 rounded-2xl" />
          
          {/* Directors card skeleton */}
          <div className="w-full h-60 bg-white/5 border border-white/10 rounded-2xl" />
        </div>

        {/* Divisions Section Title Shimmer */}
        <div className="text-center mb-12">
          <div className="h-8 w-48 bg-white/10 rounded-md mx-auto" />
        </div>

        {/* Division grids skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-48 bg-white/5 border border-white/10 rounded-2xl" />
          ))}
        </div>
      </main>
    </div>
  );
}
