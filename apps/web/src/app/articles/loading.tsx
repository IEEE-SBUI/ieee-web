import React from "react";

/**
 * Shimmering skeleton loader for the Articles archive page.
 * Uses a self-contained header skeleton to guarantee no hydration mismatch loop.
 */
export default function ArticlesLoading() {
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
        {/* Search bar & Filter dropdowns skeleton */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-12">
          <div className="h-12 w-full max-w-xl bg-white/5 border border-white/10 rounded-lg" />
          <div className="flex flex-col sm:flex-row items-stretch gap-4">
            <div className="h-12 w-full sm:w-[280px] bg-white/5 border border-white/10 rounded-lg" />
            <div className="h-12 w-full sm:w-[220px] bg-white/5 border border-white/10 rounded-lg" />
          </div>
        </div>

        {/* Shimmering grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="overflow-hidden rounded-2xl bg-[var(--color-bg-card)] border border-[rgba(130,128,229,0.08)]"
            >
              {/* Banner image area */}
              <div className="aspect-video w-full bg-white/5" />
              
              {/* Content area */}
              <div className="p-6 flex flex-col gap-4">
                {/* Category pill shimmer */}
                <div className="h-4.5 w-20 bg-white/10 rounded-full" />
                {/* Title shimmer */}
                <div className="h-6 w-3/4 bg-white/10 rounded-md mt-2" />
                {/* Excerpt lines shimmer */}
                <div className="flex flex-col gap-2 mt-2">
                  <div className="h-3.5 w-full bg-white/5 rounded-md" />
                  <div className="h-3.5 w-11/12 bg-white/5 rounded-md" />
                </div>
                {/* Author footer shimmer */}
                <div className="flex items-center gap-3 border-t border-white/5 pt-5 mt-4">
                  <div className="h-6 w-6 rounded-full bg-white/10" />
                  <div className="h-3 w-24 bg-white/5 rounded-md" />
                  <div className="h-3 w-16 bg-white/5 rounded-md ml-auto" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
