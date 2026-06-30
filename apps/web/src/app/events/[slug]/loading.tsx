import React from "react";

/**
 * Shimmering skeleton loader for the Event Detail slug route page.
 * Displays matching layout skeletons during Server-Side Sanity CMS fetches of event slugs.
 */
export default function EventDetailLoading() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      
      {/* Top Header Bar Shimmer */}
      <div className="w-full bg-gradient-to-r from-[#0A2B23] via-[#122938] to-[#1C1A36] py-16 md:py-24 border-b border-white/5 animate-pulse">
        <div className="mx-auto max-w-3xl px-6 flex flex-col items-start gap-4">
          <div className="h-5 w-32 bg-white/5 rounded-md" />
          <div className="h-4 w-16 bg-white/5 rounded-md mt-2" />
          <div className="h-10 w-3/4 bg-white/10 rounded-lg mt-4" />
          <div className="flex gap-6 w-full border-t border-white/10 pt-6 mt-2">
            <div className="h-4 w-28 bg-white/5 rounded-md" />
            <div className="h-4 w-32 bg-white/5 rounded-md" />
          </div>
        </div>
      </div>

      {/* Main Content Area Shimmer */}
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-[117px] py-12 md:py-20 animate-pulse">
        <div className="mx-auto max-w-3xl flex flex-col gap-8">
          
          {/* Main Image Banner Skeleton */}
          <div className="aspect-[16/9] w-full rounded-2xl bg-white/5 border border-white/5" />

          {/* Description Blockquote Shimmer */}
          <div className="h-20 w-full bg-white/5 border-l-4 border-white/10 rounded-r-lg" />

          {/* Content Body Paragraphs Shimmer */}
          <div className="flex flex-col gap-4">
            <div className="h-4 w-full bg-white/5 rounded-md" />
            <div className="h-4 w-5/6 bg-white/5 rounded-md" />
            <div className="h-4 w-4/5 bg-white/5 rounded-md" />
          </div>

          {/* Bottom actions skeleton */}
          <div className="h-14 w-full bg-white/5 border border-white/10 rounded-xl mt-4" />
        </div>
      </div>
    </div>
  );
}
