import React from "react";

/**
 * Shimmering skeleton loader for the Article Detail slug route page.
 * Displays matching layout skeletons during Server-Side Sanity CMS fetches of article slugs.
 */
export default function ArticleDetailLoading() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      
      {/* Page Header Shimmer */}
      <div className="w-full bg-gradient-to-r from-[#0A2B23] via-[#122938] to-[#1C1A36] py-16 md:py-24 border-b border-white/5 animate-pulse">
        <div className="mx-auto max-w-3xl px-6 flex flex-col items-start gap-4">
          <div className="h-5 w-32 bg-white/5 rounded-md" />
          <div className="h-4 w-20 bg-white/5 rounded-md mt-2" />
          <div className="h-10 w-4/5 bg-white/10 rounded-lg mt-4" />
          
          {/* Author/Date Meta Info */}
          <div className="flex items-center gap-4 w-full border-t border-white/10 pt-6 mt-2">
            <div className="h-8 w-8 rounded-full bg-white/10" />
            <div className="flex flex-col gap-2">
              <div className="h-3 w-24 bg-white/5 rounded-md" />
              <div className="h-2.5 w-36 bg-white/5 rounded-md" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area Shimmer */}
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-[117px] py-12 md:py-20 animate-pulse">
        <div className="mx-auto max-w-3xl flex flex-col gap-8">
          
          {/* Featured Image */}
          <div className="aspect-video w-full rounded-2xl bg-white/5 border border-white/5" />

          {/* Paragraph Skeletons */}
          <div className="flex flex-col gap-4">
            <div className="h-4 w-full bg-white/5 rounded-md" />
            <div className="h-4 w-11/12 bg-white/5 rounded-md" />
            <div className="h-4 w-4/5 bg-white/5 rounded-md" />
          </div>
          
          <div className="flex flex-col gap-4 mt-4">
            <div className="h-4 w-full bg-white/5 rounded-md" />
            <div className="h-4 w-5/6 bg-white/5 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
