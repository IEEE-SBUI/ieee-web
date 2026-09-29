'use client';

import { useState } from 'react';
import { TECHTONIC_CONFIG, TimelineMilestone } from '../data/techtonicConfig';

export default function TechtonicTimeline() {
  const milestones = TECHTONIC_CONFIG.overallTimeline;
  const [activeMilestone, setActiveMilestone] = useState<TimelineMilestone | null>(
    milestones[3] || null // Grand Opening default
  );

  const row1 = milestones.slice(0, 5);
  const row2 = milestones.slice(5, 10);

  return (
    <section
      id="timeline"
      className="relative overflow-hidden py-16 sm:py-24 border-b border-[var(--color-border)]"
      style={{ background: "var(--theme-dark-gradient)" }}
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-[117px]">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Event Timeline
          </h2>
          <p className="mt-3 text-sm text-[var(--color-text-muted)] leading-relaxed">
            Chronological schedule of Techtonic 3.0 milestones from registration opening to the final exhibition and Grand Closing.
          </p>
        </div>

        {/* ================= DESKTOP CONNECTED HORIZONTAL ROADMAP ================= */}
        <div className="hidden lg:block pt-10 pb-8 border-t border-b border-white/10">
          <div className="relative">
            {/* Chronological Axis Line Row 1 */}
            <div className="absolute top-10 left-6 right-6 h-0.5 bg-gradient-to-r from-[var(--color-accent-teal)] via-[var(--color-accent-sky)] to-[var(--color-accent-indigo)] z-0" />

            <div className="grid grid-cols-5 gap-4 relative z-10">
              {row1.map((item, idx) => {
                const isActive = activeMilestone?.title === item.title;
                const isMajor = item.title.includes('Grand Opening') || item.title.includes('Announcement');
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setActiveMilestone(item)}
                    className="flex flex-col items-center text-center cursor-pointer group"
                  >
                    {/* Date */}
                    <span className={`text-xs font-bold transition-colors ${isMajor || isActive ? 'text-[var(--color-accent-teal)]' : 'text-gray-400 group-hover:text-white'}`}>
                      {item.date}
                    </span>

                    {/* Node Dot */}
                    <div className="my-4 flex items-center justify-center">
                      <div className={`rounded-full border-2 transition-all ${
                        isMajor
                          ? 'w-5 h-5 bg-[var(--color-accent-teal)] border-white shadow-md shadow-[#1CE1A4]/30'
                          : isActive
                          ? 'w-4 h-4 bg-[var(--color-accent-sky)] border-white scale-125'
                          : 'w-3.5 h-3.5 bg-[#080811] border-gray-400 group-hover:border-[var(--color-accent-teal)]'
                      }`} />
                    </div>

                    {/* Title */}
                    <span className={`text-xs font-semibold leading-snug transition-colors ${isMajor ? 'text-white font-bold' : isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Row 2 (Oct - Nov) */}
          <div className="relative pt-12 mt-6">
            <div className="absolute top-10 left-6 right-6 h-0.5 bg-gradient-to-r from-[var(--color-accent-sky)] via-[var(--color-accent-indigo)] to-[var(--color-accent-teal)] z-0" />

            <div className="grid grid-cols-5 gap-4 relative z-10">
              {row2.map((item, idx) => {
                const isActive = activeMilestone?.title === item.title;
                const isFinal = idx === 4;
                const isMajor = item.title.includes('Announcement') || item.title.includes('Meeting') || isFinal;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setActiveMilestone(item)}
                    className="flex flex-col items-center text-center cursor-pointer group"
                  >
                    {/* Date */}
                    <span className={`text-xs font-bold transition-colors ${isFinal ? 'text-[var(--color-accent-teal)]' : isMajor || isActive ? 'text-[var(--color-accent-sky)]' : 'text-gray-400 group-hover:text-white'}`}>
                      {item.date}
                    </span>

                    {/* Node Dot */}
                    <div className="my-4 flex items-center justify-center">
                      <div className={`rounded-full border-2 transition-all ${
                        isFinal
                          ? 'w-5 h-5 bg-[var(--color-accent-teal)] border-white scale-125 shadow-lg shadow-[#1CE1A4]/40'
                          : isActive
                          ? 'w-4 h-4 bg-[var(--color-accent-sky)] border-white scale-125'
                          : 'w-3.5 h-3.5 bg-[#080811] border-gray-400 group-hover:border-[var(--color-accent-sky)]'
                      }`} />
                    </div>

                    {/* Title */}
                    <span className={`text-xs font-semibold leading-snug transition-colors ${isFinal ? 'text-[var(--color-accent-teal)] font-bold' : isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Milestone Highlight Footer */}
          {activeMilestone && (
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-300">
              <div className="flex items-center gap-3">
                <span className="text-[var(--color-accent-teal)] font-bold">{activeMilestone.date}</span>
                <span className="text-gray-500">—</span>
                <span className="text-white font-semibold">{activeMilestone.title}</span>
              </div>
              {activeMilestone.desc && <span className="text-gray-400">{activeMilestone.desc}</span>}
            </div>
          )}
        </div>

        {/* ================= MOBILE VERTICAL TIMELINE ================= */}
        <div className="lg:hidden space-y-6 pl-6 border-l-2 border-[var(--color-accent-teal)]/40 relative">
          {milestones.map((item, idx) => {
            const isMajor = item.title.includes('Opening') || item.title.includes('Announcement') || item.title.includes('Closing');
            return (
              <div key={idx} className="relative group">
                <div className={`absolute -left-[31px] top-1 rounded-full border-2 ${
                  isMajor
                    ? 'w-4 h-4 bg-[var(--color-accent-teal)] border-white'
                    : 'w-3 h-3 bg-[#080811] border-gray-400 group-hover:border-[var(--color-accent-teal)]'
                }`} />

                <div>
                  <span className="text-xs font-bold text-[var(--color-accent-teal)] block">
                    {item.date}
                  </span>
                  <h3 className={`text-sm font-bold mt-0.5 ${isMajor ? 'text-white' : 'text-gray-200'}`}>
                    {item.title}
                  </h3>
                  {item.desc && (
                    <p className="mt-1 text-xs text-[var(--color-text-muted)] leading-relaxed">
                      {item.desc}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
